import { NEWS_API_KEY } from '../config/apiKey';

export type Article = {
  url: string;
  urlToImage?: string;
  publishedAt: string;
  title: string;
};

export const fetchLatestNews = async (): Promise<Article[]> => {
  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?category=technology&country=us&pageSize=5&apiKey=${NEWS_API_KEY}`
  );

  const data = await response.json();

  if (data.status !== "ok") {
    throw new Error("Failed to fetch latest news");
  }

  return data.articles;
};
