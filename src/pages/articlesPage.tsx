import React from "react";
import MainLayout from "../layouts/mainLayout";
import MainSection from "../components/sections/articles/mainSection";
import AllNewsSection from "../components/sections/articles/allNewsSection";

const ArticlesPage: React.FC = () => {
  return (
    <MainLayout>
      <MainSection />
      <AllNewsSection />
    </MainLayout>
  );
};

export default ArticlesPage;
