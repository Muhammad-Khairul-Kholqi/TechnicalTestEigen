import React from "react";
import MainLayout from "../layouts/mainLayout";
import MainSection from "../components/sections/home/mainSection";
import NewsSection from "../components/sections/home/newsSection";

const HomePage: React.FC = () => {
  return (
    <MainLayout>
      <MainSection />
      <NewsSection />
    </MainLayout>
  );
};

export default HomePage;
