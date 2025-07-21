import { useEffect, useState } from "react";
import { Row, Col, Card, Typography, Space, Spin } from "antd";
import { Link } from "react-router-dom";
import { fetchLatestNews } from "../../../api/fetchLatestNews";

const { Text, Paragraph } = Typography;

type Article = {
  url: string;
  urlToImage?: string;
  publishedAt: string;
  title: string;
};

const LatestNewsSection = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLatest = async () => {
      try {
        const data = await fetchLatestNews();
        setArticles(data);
      } catch (error) {
        console.error("Failed to fetch news:", error);
      } finally {
        setLoading(false);
      }
    };

    getLatest();
  }, []);

  return (
    <Col xs={24} md={8}>
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        {loading ? (
          <Spin />
        ) : (
          articles.map((item: Article) => (
            <Link to={item.url} target="_blank" rel="noopener noreferrer" key={item.url}>
              <Card
                className="news-card"
                style={{ borderRadius: 10 }}
                styles={{ body: { padding: 10 } }}
              >
                <Row gutter={12} align="middle">
                  <Col span={8}>
                    <img
                      src={item.urlToImage}
                      alt="news"
                      style={{ width: "100%", borderRadius: 8, height: 80, objectFit: "cover" }}
                    />
                  </Col>
                  <Col span={16}>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {new Date(item.publishedAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </Text>
                    <Paragraph
                      ellipsis={{ rows: 2 }}
                      className="hover-title"
                      style={{
                        margin: 0,
                        fontWeight: 500,
                        transition: "color 0.3s, textDecoration 0.3s",
                      }}
                    >
                      {item.title}
                    </Paragraph>
                  </Col>
                </Row>
              </Card>
            </Link>
          ))
        )}
      </Space>

      <style>
        {`
          .hover-title:hover {
            color: #1890ff;
            text-decoration: underline;
          }
        `}
      </style>
    </Col>
  );
};

export default LatestNewsSection;
