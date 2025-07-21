import React from "react";
import { Row } from "antd";
import MainLayout from "../layouts/mainLayout";
import SlidderSection from "../components/sections/home/slidderSection";
import LatestNewsSection from "../components/sections/home/latestNewsSection";

const HomePage: React.FC = () => {
  return (
    <MainLayout>
      <Row gutter={24}>
        <SlidderSection />
        <LatestNewsSection />
      </Row>
    </MainLayout>
  );
};

export default HomePage;