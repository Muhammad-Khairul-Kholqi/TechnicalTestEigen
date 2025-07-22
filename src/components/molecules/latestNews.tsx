import { useEffect, useState } from "react";
import { Row, Col, Card, Typography } from "antd";
import { Link } from "react-router-dom";
import { fetchLatestNews } from "../../api/fetchLatestNews";
import LatestLoading from "../loading/latestLoading";

const { Text, Paragraph } = Typography;

type Article = {
  url: string;
  urlToImage?: string;
  publishedAt: string;
  title: string;
  description?: string;
};

const LatestNews = () => {
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
      {loading ? (
        <LatestLoading />
      ) : (
        <div>
          <div style={{ 
            display: "flex", 
            flexDirection: "column", 
            gap: 12, 
            marginTop: 0 
          }}>
            {articles.map((item: Article) => (
              <Link to={item.url} target="_blank" rel="noopener noreferrer" key={item.url}>
                <Card
                  className="news-card"
                  style={{
                    border: "none",
                    borderRadius: 10,
                    backgroundColor: "#000",
                  }}
                  styles={{ body: { padding: 0 } }} 
                >
                  <Row gutter={12} align="middle">
                    <Col span={8}>
                      <img
                        src={item.urlToImage}
                        alt="news"
                        style={{ 
                          width: "100%", 
                          borderRadius: 8, 
                          height: 127, 
                          objectFit: "cover",  
                        }}
                      />
                    </Col>

                    <Col span={16}>
                      <Paragraph
                        ellipsis={{ rows: 1 }}
                        className="hover-title"
                        style={{
                          margin: 0,
                          marginBottom: 8,
                          fontWeight: 700,
                          transition: "color 0.3s, textDecoration 0.3s",
                          fontSize: 15,
                          color: "#fff"
                        }}
                      >
                        {item.title}
                      </Paragraph>

                      <Paragraph 
                        ellipsis={{ rows: 2 }} 
                        style={{ 
                          fontSize: 13, 
                          color: "#fff",
                          marginBottom: 8 
                        }} 
                        type="secondary"
                      >
                        {item.description}
                      </Paragraph>

                      <Text type="secondary" style={{ fontSize: 14, color: "#fff", fontWeight: 500 }}>
                        {new Date(item.publishedAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </Text>
                    </Col>
                  </Row>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

      <style>
        {`
          .hover-title:hover {
            text-decoration: underline;
          }
          
          @media (max-width: 768px) {
            .news-card {
              margin-bottom: 8px;
            }
          }
        `}
      </style>
    </Col>
  );
};

export default LatestNews;
