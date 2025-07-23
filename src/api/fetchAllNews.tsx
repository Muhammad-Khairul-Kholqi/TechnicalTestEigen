export type Article = {
  url: string;
  urlToImage?: string;
  publishedAt: string;
  title: string;
  description?: string;
  author?: string;
};

export const fetchAllNews = async (): Promise<Article[]> => {
  const API_KEY = import.meta.env?.VITE_NEWS_API_KEY || process.env.VITE_NEWS_API_KEY;

  const response = await fetch(
    `https://newsapi.org/v2/everything?q=Apple&from=2025-07-21&sortBy=publishedAt&apiKey=${API_KEY}`
  );

  const data = await response.json();

  if (data.status !== "ok") {
    throw new Error("Failed to fetch latest news");
  }

  return data.articles;
};