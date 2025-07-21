import React, { useEffect, useState } from "react";
import { Col, Typography, Carousel, Spin } from "antd";
import { FetchPopularNews } from "../../../api/fetchPopularNews";

const { Title, Text, Paragraph } = Typography;

interface Post {
  title?: string;
  description?: string;
  urlToImage?: string;
}

const SlidderSection: React.FC = () => {
  const [featuredPosts, setFeaturedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const articles = await FetchPopularNews();
        setFeaturedPosts(articles);
      } catch (err) {
        console.error("Failed to load popular news:", err);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  return (
    <Col xs={24} md={16}>
      {loading ? (
        <Spin />
      ) : (
        <Carousel autoplay dots={true} effect="fade">
          {featuredPosts.map((post, index) => (
            <div key={index}>
              <div
                style={{
                  position: "relative",
                  borderRadius: 12,
                  overflow: "hidden",
                }}
              >
                <img
                  src={post.urlToImage}
                  alt={post.title}
                  style={{
                    width: "100%",
                    height: "450px",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    background: "rgba(0, 0, 0, 0.6)",
                    color: "#fff",
                    padding: 20,
                  }}
                >
                  <Text type="secondary" style={{ color: "#bbb" }}>
                    Popular Post
                  </Text>
                  <Title level={3} style={{ color: "#fff", marginTop: 5 }}>
                    {post.title}
                  </Title>
                  <Paragraph style={{ color: "#ddd" }}>
                    {post.description}
                  </Paragraph>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      )}
    </Col>
  );
};

export default SlidderSection;
