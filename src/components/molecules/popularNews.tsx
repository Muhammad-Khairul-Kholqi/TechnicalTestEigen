import React, { useEffect, useState } from "react";
import { Col, Row, Typography, Card } from "antd";
import { FetchPopularNews } from "../../api/fetchPopularNews";
import PopularLoading from "../loading/pouplarLoading";
import { Link } from "react-router-dom"; 

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

  useEffect(() => {
    const loadNews = async () => {
      try {
        const articles = await FetchPopularNews();
        setFeaturedPosts(articles.slice(0, 3)); 
      } catch (err) {
        console.error("Failed to load popular news:", err);
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

  const [firstPost, secondPost, thirdPost] = featuredPosts;

  return (
    <Col xs={24} md={16}>
      <Row gutter={[16, 16]}> 
        <Col span={24}>
          <Link to={firstPost?.url} target="_blank" rel="noopener noreferrer">
            <div style={{ position: "relative", borderRadius: 12, overflow: "hidden", height: 350 }}>
              <img
                  src={firstPost?.urlToImage}
                  alt={firstPost?.title}
                  style={{
                    width: "100%",
                    height: "350px",
                    objectFit: "cover",
                    display: "block",
                }}
              />
            
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
                <Title level={3} style={{ color: "#fff", margin: 0 }}>{firstPost?.title}</Title>
                <Paragraph style={{ color: "#ddd", marginTop: 8 }} ellipsis={{ rows: 2 }}>
                  {firstPost?.description}
                </Paragraph>
              </div>
            </div>
          </Link>
        </Col>

        <Col xs={24} sm={12} md={12}>
          <Link to={secondPost?.url} target="_blank" rel="noopener noreferrer">
            <Card
              style={{ borderRadius: 12, overflow: "hidden", border: "none", backgroundColor: "#000" }}
              bodyStyle={{ padding: 16 }}
              cover={
                <img
                  src={secondPost?.urlToImage}
                  alt={secondPost?.title}
                  style={{ height: "180px", objectFit: "cover", borderRadius: 12 }}
                />
            }
            >
              <div>
                <Title level={5} style={{ fontSize: 18, marginBottom: 8, color: "#fff" }}>{secondPost?.title}</Title>
                <Paragraph type="secondary" ellipsis={{ rows: 2 }} style={{ fontSize: 15, margin: 0, color: "#fff" }}>
                  {secondPost?.description}
                </Paragraph>
              </div>
            </Card>
          </Link>
        </Col>

        <Col xs={24} sm={12} md={12}>
          <Link to={thirdPost?.url} target="_blank" rel="noopener noreferrer">
            <Card
              style={{ borderRadius: 12, overflow: "hidden", border: "none", backgroundColor: "#000" }}
              bodyStyle={{ padding: 16 }} 
              cover={
                <img
                  src={thirdPost?.urlToImage}
                  alt={thirdPost?.title}
                  style={{ height: "180px", objectFit: "cover", borderRadius: 12 }}
                />
            }
            >
              <div>
                <Title level={5} style={{ fontSize: 18, marginBottom: 8, color: "#fff" }}>{thirdPost?.title}</Title>
                <Paragraph type="secondary" ellipsis={{ rows: 2 }} style={{ fontSize: 15, margin: 0, color: "#fff" }}>
                  {thirdPost?.description}
                </Paragraph>
              </div>
            </Card>
          </Link>
        </Col>
      </Row>
    </Col>
  );
};

export default PopularNews;
