import React from "react"; 
import { Layout } from "antd"; 
import LinkList from "../components/molecules/linkLists";
import { Link } from "react-router-dom"; 
 
const { Header } = Layout; 
 
const styles = { 
  header: { 
    background: "#fff", 
    padding: "0 24px", 
    position: "fixed" as const, 
    zIndex: 1000, 
    width: "100%", 
    borderBottom: "1px solid #e8e8e8", 
    height: 64, 
    display: "flex", 
    justifyContent: "center", 
  }, 
  inner: { 
    width: "100%", 
    maxWidth: 1200, 
    display: "flex", 
    alignItems: "center", 
  }, 
  logo: { 
    fontWeight: "bold", 
    fontSize: 20, 
    color: "#000", 
    fontFamily: "'Roboto Slab', serif", 
    flex: 1,
    textDecoration: "none",
    outline: "none",
  }, 
}; 
 
const AppHeader: React.FC = () => { 
  return ( 
    <Header style={styles.header}> 
      <div style={styles.inner}> 
        <Link to="/" style={styles.logo}>News24</Link> 
        <LinkList /> 
      </div> 
    </Header> 
  ); 
}; 
 
export default AppHeader;
