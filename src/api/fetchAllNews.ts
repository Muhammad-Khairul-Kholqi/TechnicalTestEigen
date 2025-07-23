import { NEWS_API_KEY } from '../config/apiKey';

export type Article = {
  url: string;
  urlToImage?: string;
  publishedAt: string;
  title: string;
  description?: string;
  author?: string;
};


export const fetchAllNews = async (): Promise<Article[]> => {
  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&pageSize=100&apiKey=${NEWS_API_KEY}`
  );

  const data = await response.json();

  if (data.status !== "ok") {
    throw new Error("Failed to fetch latest news");
  }

  return data.articles;
};

