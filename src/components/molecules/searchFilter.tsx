import React from "react";
import { Input, Button, Dropdown, Space } from "antd";
import { 
  SearchOutlined, 
  DownOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined
} from "@ant-design/icons";

type SortType = 'newest' | 'oldest';

interface SearchFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  sortType: SortType;
  onSortChange: (type: SortType) => void;
  dropdownOpen: boolean;
  onDropdownOpenChange: (open: boolean) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  searchTerm,
  onSearchChange,
  sortType,
  onSortChange,
  dropdownOpen,
  onDropdownOpenChange
}) => {
  const handleSortChange = (type: SortType) => {
    onSortChange(type);
    onDropdownOpenChange(false);
  };

  const sortMenuItems = [
    {
      key: 'newest',
      label: (
        <div onClick={() => handleSortChange('newest')} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <SortDescendingOutlined />
          Newest First
        </div>
      ),
    },
    {
      key: 'oldest',
      label: (
        <div onClick={() => handleSortChange('oldest')} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <SortAscendingOutlined />
          Oldest First
        </div>
      ),
    },
  ];

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      marginBottom: 24,
      gap: 16,
      flexWrap: 'wrap'
    }}>
      <Input
        placeholder="Search news by title..."
        prefix={<SearchOutlined style={{ color: '#999' }} />}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        style={{
          width: 300,
          backgroundColor: '#1a1a1a',
          borderColor: '#333',
          color: '#fff'
        }}
        size="large"
      />

      <Dropdown
        menu={{ items: sortMenuItems }}
        placement="bottomRight"
        open={dropdownOpen}
        onOpenChange={onDropdownOpenChange}
        trigger={['click']}
      >
        <Button
          style={{
            backgroundColor: '#1a1a1a',
            borderColor: '#333',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}
          size="large"
        >
          <Space>
            {sortType === 'newest' ? <SortDescendingOutlined /> : <SortAscendingOutlined />}
            {sortType === 'newest' ? 'Newest First' : 'Oldest First'}
            <DownOutlined 
              style={{ 
                transition: 'transform 0.3s ease',
                transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)'
              }} 
            />
          </Space>
        </Button>
      </Dropdown>

      <style>
        {`
          .ant-input {
            background-color: #1a1a1a !important;
            border-color: #333 !important;
            color: #fff !important;
          }

          .ant-input::placeholder {
            color: #666 !important;
          }

          .ant-input:focus {
            border-color: #1890ff !important;
            box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2) !important;
          }

          .ant-btn:hover {
            background-color: #444 !important;
            border-color: #555 !important;
          }

          .ant-dropdown {
            background-color: #1a1a1a !important;
          }

          .ant-dropdown-menu {
            background-color: #1a1a1a !important;
            border: 1px solid #333 !important;
          }

          .ant-dropdown-menu-item {
            color: #fff !important;
          }

          .ant-dropdown-menu-item:hover {
            background-color: #333 !important;
          }
        `}
      </style>
    </div>
  );
};

export default SearchFilter;