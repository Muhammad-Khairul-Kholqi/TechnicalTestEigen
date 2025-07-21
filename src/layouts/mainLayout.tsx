import React from "react";
import { Layout } from "antd";
import AppHeader from "../partials/appHeader";

const { Content } = Layout;

const styles = {
  contentWrapper: {
    display: "flex",
    justifyContent: "center",
    padding: "100px 24px 24px",
    background: "#fff",
  },
  contentInner: {
    width: "100%",
    maxWidth: 1200,
  },
};

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Layout>
      <AppHeader />
      <Content style={styles.contentWrapper}>
        <div style={styles.contentInner}>{children}</div>
      </Content>
    </Layout>
  );
};

export default MainLayout;
