export type Article = {
  url: string;
  urlToImage?: string;
  publishedAt: string;
  title: string;
};

export const fetchLatestNews = async (): Promise<Article[]> => {
  const API_KEY = import.meta.env?.VITE_NEWS_API_KEY || process.env.VITE_NEWS_API_KEY;

  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?sources=the-verge&pageSize=5&apiKey=${API_KEY}`
  );

  const data = await response.json();

  if (data.status !== "ok") {
    throw new Error("Failed to fetch latest news");
  }

  return data.articles;
};
