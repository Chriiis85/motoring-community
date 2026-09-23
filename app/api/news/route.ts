import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.NEWS_API_KEY || 'ee0dd026874d4a01b73386a3cc365885';
  // Use specific domains and sortBy=publishedAt to ensure latest F1 news in chronological order, and fetch 100 articles
  const url = `https://newsapi.org/v2/everything?q="Formula 1" OR "F1"&domains=motorsport.com,planetf1.com,racingnews365.com,autosport.com,f1i.com,crash.net,the-race.com,gpfans.com&language=en&sortBy=publishedAt&pageSize=100&apiKey=${apiKey}`;

  try {
    const response = await fetch(url, { next: { revalidate: 300 } });
    const data = await response.json();
    if (data.articles && Array.isArray(data.articles)) {
      data.articles.sort((a: { publishedAt: string }, b: { publishedAt: string }) => 
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    }
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json({ articles: [] }, { status: 500 });
  }
}
