import React from "react"; 
import LinkItem from "../atoms/linkItem"; 
import { useLocation } from "react-router-dom"; 
 
const menuItems = [ 
  { key: "/", label: "Home" }, 
  { key: "/articles", label: "Articles" }, 
]; 
 
const styles = { 
  nav: { 
    display: "flex", 
    gap: "24px",
    alignItems: "center",
  }, 
}; 
 
const LinkList: React.FC = () => { 
  const location = useLocation(); 

  console.log("LinkList rendering with items:", menuItems);
  console.log("Current location:", location.pathname);
 
  return ( 
    <nav style={styles.nav}> 
      {menuItems.map((item) => {
        console.log("Rendering link:", item);
        return (
          <LinkItem key={item.key} to={item.key} label={item.label} />
        );
      })} 
    </nav> 
  ); 
}; 
 
export default LinkList;
