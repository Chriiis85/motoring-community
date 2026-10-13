export interface Article {
  title: string;
  author: string;
  publishedAt: string;
  urlToImage: string;
  url: string;
  description: string;
  content?: string;
  source?: {
    name: string;
  };
}

export function cleanText(text: string): string {
  if (!text) return '';
  return text
    // Replace HTML entities
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    // Fix garbled quotation mojibake
    .replace(/\?\?/g, '"')
    .replace(/\?{2}/g, '')
    // Strip HTML tags
    .replace(/<[^>]+>/g, ' ')
    // Normalize extra whitespace
    .replace(/\s+/g, ' ')
    .trim();
}

export function createNewsSlug(title: string): string {
  if (!title) return '';
  return title
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove accent diacritics (e.g. é -> e)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export const FALLBACK_ARTICLES: Article[] = [
  {
    title: "Five key takeaways from F1's big African Grand Prix reveal in Rwanda",
    author: "Motorsport.com",
    publishedAt: new Date(Date.now() - 3600000).toISOString(),
    urlToImage: "https://cdn-1.motorsport.com/images/amp/0o5AoeaY/s6/stefano-domenicali-at-african-.jpg",
    url: "https://www.motorsport.com/f1/news/five-key-takeaways-from-f1s-big-african-grand-prix-reveal-in-rwanda/10865012/",
    description: "Tuesday's launch of the new African Grand Prix at Kigali's BK Arena in Rwanda was attended by Rwandan president Paul Kagame and both F1 boss Stefano Domenicali and FIA president Mohammed Ben Sulayem.",
    content: "Tuesday's launch of the new African Grand Prix at Kigali's BK Arena in Rwanda was attended by Rwandan president Paul Kagame and both F1 boss Stefano Domenicali and FIA president Mohammed Ben Sulayem.",
    source: {
      name: "Motorsport.com"
    }
  },
  {
    title: "Cadillac's F1 brakes are still a problem: 'I had to lift and coast on lap two'",
    author: "Motorsport.com",
    publishedAt: new Date(Date.now() - 7200000).toISOString(),
    urlToImage: "https://cdn-8.motorsport.com/images/amp/0qgKoQQY/s6/sergio-perez-cadillac-racing.jpg",
    url: "https://www.motorsport.com/f1/news/cadillacs-f1-brakes-are-still-a-problem-i-had-to-lift-and-coast-on-lap-two/10864720/",
    description: "Valtteri Bottas was again hindered by Cadillac's well-documented brake issues in Formula 1's Singapore Grand Prix, although the veteran has described the problem as 'almost solved'.",
    content: "Valtteri Bottas was again hindered by Cadillac's well-documented brake issues in Formula 1's Singapore Grand Prix, although the veteran has described the problem as 'almost solved'.",
    source: {
      name: "Motorsport.com"
    }
  },
  {
    title: "Why McLaren cannot fix its F1 car handling until 2027",
    author: "Motorsport.com",
    publishedAt: new Date(Date.now() - 10800000).toISOString(),
    urlToImage: "https://cdn-5.motorsport.com/images/amp/2GdKNrKY/s6/oscar-piastri-mclaren.jpg",
    url: "https://www.motorsport.com/f1/news/why-mclaren-cannot-fix-its-f1-car-handling-for-its-driver-until-2027/10864907/",
    description: "McLaren team principal Andrea Stella has conceded it cannot improve its Formula 1 car handling characteristics 'without fundamental changes' that will not be possible until 2027.",
    content: "McLaren team principal Andrea Stella has conceded it cannot improve its Formula 1 car handling characteristics 'without fundamental changes' that will not be possible until 2027.",
    source: {
      name: "Motorsport.com"
    }
  },
  {
    title: "F1 announces African Grand Prix in Rwanda after Lewis Hamilton plea",
    author: "Crash.net",
    publishedAt: new Date(Date.now() - 14400000).toISOString(),
    urlToImage: "https://www.crash.net/sites/default/files/2026-10/xpb_1442411_hires_0.jpg?width=1200",
    url: "https://www.crash.net/f1/news/1107538/1/f1-announces-african-grand-prix-rwanda-after-lewis-hamilton-plea",
    description: "Formula 1 has officially announced a new African Grand Prix in Rwanda after years of campaigning by seven-time world champion Lewis Hamilton.",
    content: "Formula 1 has officially announced a new African Grand Prix in Rwanda after years of campaigning by seven-time world champion Lewis Hamilton.",
    source: {
      name: "Crash.net"
    }
  }
];
