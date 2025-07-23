import { Card, Row, Col, Skeleton } from 'antd';

const CardNewsLoading = () => {
  // Generate 8 loading cards
  const loadingCards = Array.from({ length: 8 }, (_, index) => (
    <Col xs={24} sm={12} md={8} lg={6} key={index}>
      <Card
        style={{
          border: "none",
          borderRadius: 10,
          backgroundColor: "#222222",
          padding: 16,
        }}
        cover={
          <Skeleton.Image
            style={{
              width: "100%",
              height: "180px",
              borderRadius: "8px",
            }}
            active
          />
        }
        bodyStyle={{ padding: 0, paddingTop: 12 }}
      >
        <div style={{ marginTop: 0 }}>
          <Skeleton
            active
            paragraph={{ rows: 2, width: ['100%', '60%'] }}
            title={false}
            style={{ marginBottom: 4 }}
          />
          <Skeleton
            active
            paragraph={{ rows: 1, width: '40%' }}
            title={false}
          />
        </div>
      </Card>
    </Col>
  ));

  return (
    <Row gutter={[16, 16]}>
      {loadingCards}
    </Row>
  );
};

export default CardNewsLoading;