import { Article, createNewsSlug, cleanText, FALLBACK_ARTICLES } from '@/lib/news';
import { NextResponse } from 'next/server';

function parseRssXml(xml: string, sourceName: string): Article[] {
  const items: Article[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
  let match: RegExpExecArray | null;

  while ((match = itemRegex.exec(xml)) !== null) {
    const itemXml = match[1];

    const getTag = (tag: string): string => {
      const reg = new RegExp(`<${tag}[^>]*>(?:<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>|([\\s\\S]*?))<\\/${tag}>`, 'i');
      const m = itemXml.match(reg);
      return m ? (m[1] !== undefined ? m[1] : m[2] || '').trim() : '';
    };

    const getAttr = (tag: string, attr: string): string => {
      const reg = new RegExp(`<${tag}[^>]*\\b${attr}=["']([^"']+)["']`, 'i');
      const m = itemXml.match(reg);
      return m ? m[1].trim() : '';
    };

    const rawTitle = getTag('title');
    const title = cleanText(rawTitle);
    const link = getTag('link') || getTag('guid');
    const pubDate = getTag('pubDate');
    const rawDesc = getTag('description');
    const description = cleanText(
      rawDesc
        .replace(/<br\s*\/?>/gi, ' ')
        .replace(/<a\b[^>]*>.*?<\/a>/gi, '')
        .replace(/Read Also:[\s\S]*?(?:Keep reading|$)/gi, '')
    );
    const author = cleanText(getTag('dc:creator') || getTag('author')) || sourceName;

    // Extract image from enclosure, media:content, or img tag inside description
    let image = getAttr('enclosure', 'url') || getAttr('media:content', 'url') || getAttr('media:thumbnail', 'url');
    if (!image) {
      const imgMatch = rawDesc.match(/<img[^>]+src=["']([^"']+)["']/i);
      if (imgMatch) {
        image = imgMatch[1];
      }
    }

    if (title && image && !title.includes('[Removed]')) {
      items.push({
        title,
        author,
        publishedAt: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
        urlToImage: image,
        url: link,
        description: description || title,
        content: description || title,
        source: {
          name: sourceName,
        },
      });
    }
  }

  return items;
}

async function fetchRssFeed(url: string, sourceName: string): Promise<Article[]> {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/rss+xml, application/xml, text/xml, */*',
      },
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(6000),
    });

    if (!res.ok) {
      console.warn(`RSS feed returned status ${res.status} for ${sourceName}`);
      return [];
    }

    const xml = await res.text();
    return parseRssXml(xml, sourceName);
  } catch (err) {
    console.warn(`Failed to fetch RSS from ${sourceName}:`, err);
    return [];
  }
}

export async function GET() {
  const apiKey = process.env.NEWS_API_KEY;

  // 1. Try NewsAPI if API key is provided
  if (apiKey) {
    const newsApiUrl = `https://newsapi.org/v2/everything?q="Formula 1" OR "F1"&domains=motorsport.com,planetf1.com,racingnews365.com,autosport.com,f1i.com,crash.net,the-race.com,gpfans.com&language=en&sortBy=publishedAt&pageSize=100&apiKey=${apiKey}`;

    try {
      const response = await fetch(newsApiUrl, {
        next: { revalidate: 300 },
        signal: AbortSignal.timeout(6000),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.status === 'ok' && Array.isArray(data.articles) && data.articles.length > 0) {
          const validArticles: Article[] = data.articles
            .filter((a: any) => a.title && a.urlToImage && !a.title.includes('[Removed]'))
            .map((a: any) => ({
              title: cleanText(a.title),
              author: cleanText(a.author) || 'F1 Staff',
              publishedAt: a.publishedAt,
              urlToImage: a.urlToImage,
              url: a.url,
              description: cleanText(a.description),
              content: cleanText(a.content || a.description),
              source: {
                name: a.source?.name || 'F1 News',
              },
            }))
            .sort((a: Article, b: Article) =>
              new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
            );

          if (validArticles.length > 0) {
            return NextResponse.json({ status: 'ok', totalResults: validArticles.length, articles: validArticles });
          }
        }
      } else {
        console.warn(`NewsAPI responded with status ${response.status}. Falling back to RSS feeds.`);
      }
    } catch (err) {
      console.warn('Error fetching from NewsAPI, falling back to RSS feeds:', err);
    }
  }

  // 2. Fetch directly from verified Formula 1 RSS feeds (Motorsport.com + Crash.net + Autosport.com)
  try {
    const [motorsport, crash, autosport] = await Promise.all([
      fetchRssFeed('https://www.motorsport.com/rss/f1/news/', 'Motorsport.com'),
      fetchRssFeed('https://www.crash.net/rss/f1', 'Crash.net'),
      fetchRssFeed('https://www.autosport.com/rss/f1/news/', 'Autosport.com'),
    ]);

    const seenSlugs = new Set<string>();
    const allRssArticles = [...motorsport, ...crash, ...autosport]
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .filter((article) => {
        const slug = createNewsSlug(article.title);
        if (!slug || seenSlugs.has(slug)) return false;
        seenSlugs.add(slug);
        return true;
      });

    if (allRssArticles.length > 0) {
      return NextResponse.json({
        status: 'ok',
        totalResults: allRssArticles.length,
        articles: allRssArticles,
      });
    }
  } catch (err) {
    console.error('Error fetching RSS feeds:', err);
  }

  // 3. Last fallback: curated backup articles so news NEVER fails
  return NextResponse.json({
    status: 'ok',
    totalResults: FALLBACK_ARTICLES.length,
    articles: FALLBACK_ARTICLES,
  });
}
