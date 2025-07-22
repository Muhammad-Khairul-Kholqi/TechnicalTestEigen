import React from "react"; 
import { Link } from "react-router-dom"; 
 
interface LinkItemProps { 
  to: string; 
  label: string; 
} 
 
const LinkItem: React.FC<LinkItemProps> = ({ to, label }) => { 

  return ( 
    <Link 
      to={to} 
      style={{ 
        fontWeight: "500",
        textDecoration: "none", 
        color: "#fff", 
        outline: "none", 
        border: "none", 
      }} 
    > 
      {label} 
    </Link> 
  ); 
}; 
 
export default LinkItem;