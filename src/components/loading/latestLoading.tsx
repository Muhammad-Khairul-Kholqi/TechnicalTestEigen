import React from "react";
import { Card, Col, Row, Skeleton } from "antd";

const LatestLoading: React.FC = () => {
    const loadingCards = [1, 2, 3, 4];

    return (
        <div>
            <div 
                style={{ 
                    display: "flex", 
                    flexDirection: "column", 
                    gap: 12, 
                    marginTop: 0 
                }}
            >
                {loadingCards.map((index) => (
                    <Card
                    key={index}
                    style={{
                        border: "none",
                        borderRadius: 10,
                        backgroundColor: "#212121",
                    }}
                    bodyStyle={{ padding: 0 }}
                    >
                    <Row gutter={12} align="middle">
                        <Col span={8} style={{ padding: 16 }}>
                            <div 
                                style={{ 
                                    backgroundColor: "#111",
                                    width: "100%",
                                    height: 120,
                                    borderRadius: 8,
                                }}
                            />
                        </Col>
                        <Col span={16}>
                            <Skeleton
                                active
                                title={{ width: "60%" }}
                                paragraph={{
                                    rows: 2,
                                    width: ["90%", "80%"],
                                }}
                            />
                        </Col>
                    </Row>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default LatestLoading;
