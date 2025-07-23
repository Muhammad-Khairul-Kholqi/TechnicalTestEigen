import React from "react";
import { Button, Typography } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const { Text } = Typography;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange
}) => {
  if (totalPages <= 1) return null;

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      marginTop: 32,
      gap: 16
    }}>
      <Button
        icon={<LeftOutlined />}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        style={{
          backgroundColor: currentPage === 1 ? '#1a1a1a' : '#333',
          borderColor: '#444',
          color: currentPage === 1 ? '#666' : '#fff'
        }}
      >
        Previous
      </Button>

      <div style={{ 
        display: 'flex', 
        alignItems: 'center',
        gap: 8,
        padding: '0 16px'
      }}>
        <Text style={{ color: '#fff', fontSize: 16 }}>
          Page {currentPage} of {totalPages}
        </Text>
      </div>

      <Button
        icon={<RightOutlined />}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        style={{
          backgroundColor: currentPage === totalPages ? '#1a1a1a' : '#333',
          borderColor: '#444',
          color: currentPage === totalPages ? '#666' : '#fff'
        }}
      >
        Next
      </Button>

      <style>
        {`
          .ant-btn:hover {
            background-color: #444 !important;
            border-color: #555 !important;
          }
        `}
      </style>
    </div>
  );
};

export default Pagination;