import { NEWS_API_KEY } from '../config/apiKey';

export type Post = {
  urlToImage?: string;
  title?: string;
  description?: string;
};

export const FetchPopularNews = async (): Promise<Post[]> => {
  const response = await fetch(
    `https://newsapi.org/v2/everything?q=trending&sortBy=popularity&pageSize=5&apiKey=${NEWS_API_KEY}`
  );

  const data = await response.json();

  if (data.status !== "ok") {
    throw new Error("Failed to fetch popular news");
  }

  return data.articles;
};
