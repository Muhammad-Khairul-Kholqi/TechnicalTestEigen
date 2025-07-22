import React from "react";
import { Skeleton, Col, Row } from "antd";

const PopularLoading: React.FC = () => {
  return (
    <div>
        <div
            style={{
                width: "100%",
                height: "350px",
                borderRadius: 12,
                position: "relative",
                backgroundColor: "#212121",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        />

        <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
            <Col xs={24} sm={12} md={12}>
                <div
                style={{
                    padding: 16,
                    backgroundColor: "#212121",
                    borderRadius: 12,
                }}
                >
                <div
                    style={{
                    width: "100%",
                    height: 150,
                    borderRadius: 12,
                    backgroundColor: "#111",
                    }}
                />
                <Skeleton
                    active
                    title={{ width: "60%" }}
                    paragraph={{ rows: 2, width: ["90%", "80%"] }}
                    style={{ marginTop: 5 }}
                />
                </div>
            </Col>

            <Col xs={24} sm={12} md={12}>
                <div
                style={{
                    padding: 16,
                    backgroundColor: "#212121",
                    borderRadius: 12,
                }}
                >
                <div
                    style={{
                    width: "100%",
                    height: 150,
                    borderRadius: 12,
                    backgroundColor: "#111",
                    }}
                />
                <Skeleton
                    active
                    title={{ width: "60%" }}
                    paragraph={{ rows: 2, width: ["90%", "80%"] }}
                    style={{ marginTop: 5 }}
                />
                </div>
            </Col>
        </Row>
    </div>
  );
};

export default PopularLoading;
