import React, { useEffect, useState, useRef } from "react";
import { fetchAllNews } from "../../api/fetchAllNews";
import { Card, Typography, Row, Col } from "antd";
import { CalendarOutlined, SearchOutlined } from "@ant-design/icons";
import CardNewsLoading from "../loading/cardNewsLoading";
import SearchFilter from "./searchFilter";
import Pagination from "./pagination";
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

type SortType = 'newest' | 'oldest';

const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-EN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
};

const AllCardNewsLists: React.FC = () => {
    const [allArticles, setAllArticles] = useState<Article[]>([]);
    const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortType, setSortType] = useState<SortType>('newest');
    const [currentPage, setCurrentPage] = useState(1);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const newsGridRef = useRef<HTMLDivElement>(null);
    const [error, setError] = useState(false);
    
    const articlesPerPage = 8;

    useEffect(() => {
        let isMounted = true; 
        
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(false);
                const data = await fetchAllNews();
                if (isMounted) {
                    setAllArticles(data.slice(0, 8));
                }
            } catch (error) {
                if (isMounted) {
                    console.error(error);
                    setError(true);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        let filtered = allArticles.filter(article =>
            article.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        filtered.sort((a, b) => {
            const dateA = new Date(a.publishedAt).getTime();
            const dateB = new Date(b.publishedAt).getTime();
            return sortType === 'newest' ? dateB - dateA : dateA - dateB;
        });

        setFilteredArticles(filtered);
        setCurrentPage(1); 
    }, [allArticles, searchTerm, sortType]);

    const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
    const startIndex = (currentPage - 1) * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;
    const currentArticles = filteredArticles.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        if (newsGridRef.current) {
            newsGridRef.current.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    const handleSortChange = (type: SortType) => {
        setSortType(type);
    };

    const handleSearchChange = (value: string) => {
        setSearchTerm(value);
    };

    const handleDropdownOpenChange = (open: boolean) => {
        setDropdownOpen(open);
    };

    if (loading) {
        return <CardNewsLoading />;
    }

    if (error) {
        return (
            <div style={{ textAlign: 'center', padding: '40px' }}>
                <Text strong style={{ color: 'white' }}>Gagal memuat berita. Silakan coba lagi.</Text>
            </div>
        );
    }

    return (
        <div>
            <SearchFilter
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
                sortType={sortType}
                onSortChange={handleSortChange}
                dropdownOpen={dropdownOpen}
                onDropdownOpenChange={handleDropdownOpenChange}
            />

            <div style={{ marginBottom: 16 }}>
                <Text style={{ color: '#999' }}>
                    Showing {currentArticles.length} of {filteredArticles.length} articles
                    {searchTerm && ` for "${searchTerm}"`}
                </Text>
            </div>

            <div ref={newsGridRef}>
                <Row gutter={[16, 16]}>
                    {currentArticles.map((article, idx) => (
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
                </Row>
            </div>

            {filteredArticles.length === 0 && !loading && (
                <div style={{ 
                    textAlign: 'center', 
                    padding: '60px 20px',
                    color: '#999'
                }}>
                    <SearchOutlined style={{ fontSize: 48, marginBottom: 16 }} />
                    <h3 style={{ color: '#999', marginBottom: 8 }}>No articles found</h3>
                    <p>Try adjusting your search terms or filters</p>
                </div>
            )}

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />

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
        </div>
    );
};

export default AllCardNewsLists;