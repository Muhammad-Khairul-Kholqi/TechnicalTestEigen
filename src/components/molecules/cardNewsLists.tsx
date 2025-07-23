import React, { useEffect, useState } from "react";
import { fetchAllNews } from "../../api/fetchAllNews";
import { Card, Typography, Row, Col } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import CardNewsLoading from "../loading/cardNewsLoading";
import { Link } from "react-router-dom";

const { Text, Paragraph } = Typography;

type Article = {
  url: string;
  urlToImage?: string;
  publishedAt: string;
  title: string;
  description?: string;
  author?: string;
};

const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-EN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
};

const CardNewsLists: React.FC = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchAllNews();
                setArticles(data.slice(0, 8));
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

  if (loading) return <CardNewsLoading />;

  return (
    <Row gutter={[16, 16]}>
        {articles.map((article, idx) => (
            <Col xs={24} sm={12} md={8} lg={6} key={idx}>
                <Link to={article.url} target="_blank" rel="noopener noreferrer">
                    <Card
                        className="news-card"
                        hoverable
                        style={{
                            border: "none",
                            borderRadius: 10,
                            backgroundColor: "#222222",
                            padding: 16,
                        }}
                        cover={
                        <div style={{ position: "relative" }}>
                            <img
                            src={article.urlToImage || "https://placehold.co/400"}
                            alt="News"
                            style={{
                                width: "100%",
                                height: "180px",
                                objectFit: "cover",
                                borderRadius: "8px",
                            }}
                            />
                        </div>
                        }
                        bodyStyle={{ padding: 0, paddingTop: 12 }}
                    >
                        <div style={{ marginTop: 0 }}>
                        <Paragraph ellipsis={{ rows: 2 }} style={{ fontSize: 15, marginBottom: 4, color: "#fff" }}>
                            <strong>{article.title}</strong>
                        </Paragraph>

                        <Text type="secondary" style={{ fontSize: 12, marginTop: 0, color: "#fff" }}>
                            <CalendarOutlined style={{ marginRight: 6 }} />
                            {formatDate(article.publishedAt)}
                        </Text>
                        </div>
                    </Card>
                </Link>
            </Col>
        ))}

        <style>
            {`
                .news-card {
                    transition: transform 0.3s ease;
                }

                .news-card:hover {
                    transform: scale(1.05);
                    text-decoration: none;
                }

                .news-card:hover strong {
                    text-decoration: underline;
                    text-decoration-color: white;
                }
            `}
        </style>
    </Row>
  );
};

export default CardNewsLists;