import React, { useEffect, useState } from "react";
import { Col, Row, Typography, Card } from "antd";
import { FetchPopularNews } from "../../api/fetchPopularNews";
import PopularLoading from "../loading/pouplarLoading";

const { Title, Paragraph } = Typography;

type Article = {
  url: string;
  urlToImage?: string;
  publishedAt: string;
  title: string;
  description?: string;
};

const PopularNews: React.FC = () => {
  const [featuredPosts, setFeaturedPosts] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const data = await FetchPopularNews();

        const articles: Article[] = data.slice(0, 3).map((post: any) => ({
          url: post.url || "#",
          urlToImage: post.urlToImage,
          publishedAt: post.publishedAt,
          title: post.title || "No title",
          description: post.description || "",
        }));

        setFeaturedPosts(articles);
      } catch (err) {
        console.error("Failed to load popular news:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  if (loading) {
    return (
      <Col xs={24} md={16}>
        <PopularLoading />
      </Col>
    );
  }

  if (error) {
    return <div>Terjadi kesalahan saat mengambil data.</div>;
  }

  if (!featuredPosts.length) {
    return <PopularLoading />;
  }

  const [firstPost, ...remainingPosts] = featuredPosts;
  if (!firstPost) return null;

  return (
    <Col xs={24} md={16}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <a href={firstPost.url} target="_blank" rel="noopener noreferrer">
            <div
              style={{
                position: "relative",
                borderRadius: 12,
                overflow: "hidden",
                height: 350,
              }}
            >
              {firstPost.urlToImage && (
                <img
                  src={firstPost.urlToImage}
                  alt={firstPost.title || "News Image"}
                  style={{
                    width: "100%",
                    height: "350px",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              )}

              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "24px",
                  background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                  color: "#fff",
                }}
              >
                <Title level={3} style={{ color: "#fff", margin: 0 }}>
                  {firstPost.title}
                </Title>
                <Paragraph style={{ color: "#ddd", marginTop: 8 }} ellipsis={{ rows: 2 }}>
                  {firstPost.description}
                </Paragraph>
              </div>
            </div>
          </a>
        </Col>

        {remainingPosts.map((post, index) => 
          post ? (
            <Col key={index} xs={24} sm={12} md={12}>
              <a href={post.url} target="_blank" rel="noopener noreferrer">
                <Card
                  role="article"
                  className="card-popular"
                  style={{
                    borderRadius: 12,
                    overflow: "hidden",
                    border: "none",
                    backgroundColor: "#000",
                  }}
                  cover={
                    post.urlToImage ? (
                      <img
                        src={post.urlToImage}
                        alt={post.title || "News Image"}
                        style={{ height: "180px", objectFit: "cover", borderRadius: 12 }}
                      />
                    ) : null
                  }
                >
                  <div>
                    <Title
                      className="title"
                      level={5}
                      style={{ fontSize: 18, marginBottom: 8, color: "#fff" }}
                    >
                      {post.title}
                    </Title>
                    <Paragraph
                      type="secondary"
                      ellipsis={{ rows: 2 }}
                      style={{ fontSize: 15, margin: 0, color: "#fff" }}
                    >
                      {post.description}
                    </Paragraph>
                  </div>
                </Card>
              </a>
            </Col>
          ) : null
        )}
      </Row>

      <style>
        {`
          .card-popular {
            transition: transform 0.3s ease;
          }

          .card-popular:hover .title {
            text-decoration: underline;
            text-decoration-color: white;
          }

          .card-popular:hover {
            transform: scale(1.05);
          }
        `}
      </style>
    </Col>
  );
};

export default PopularNews;