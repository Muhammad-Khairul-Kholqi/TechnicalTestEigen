import React from "react";
import { Layout } from "antd";
import AppHeader from "../partials/appHeader";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Layout>
      <AppHeader />
      <div>{children}</div>
    </Layout>
  );
};

export default MainLayout;
