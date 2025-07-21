export type Post = {
  urlToImage?: string;
  title?: string;
  description?: string;
};

export const FetchPopularNews = async (): Promise<Post[]> => {
  const apiKey = import.meta.env.VITE_NEWS_API_KEY;

  const response = await fetch(
    `https://newsapi.org/v2/everything?q=trending&sortBy=popularity&pageSize=5&apiKey=${apiKey}`
  );

  const data = await response.json();

  if (data.status !== "ok") {
    throw new Error("Failed to fetch popular news");
  }

  return data.articles;
};
