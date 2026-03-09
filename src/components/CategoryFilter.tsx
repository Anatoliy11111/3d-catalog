import { useState } from 'react';
import { Select } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import { useToken } from '../hooks/useToken';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  const { token } = useToken();
  const [open, setOpen] = useState(false);

  const handleChange = (value: string) => {
    onCategoryChange(value);
    setOpen(false);
  };

  return (
    <div className="category-filter">
      <FilterOutlined style={{ marginRight: 8, color: token.colorPrimary }} />
      <Select
        value={selectedCategory}
        onChange={handleChange}
        open={open}
        onOpenChange={setOpen}
        options={[
          { label: 'Все категории', value: 'all' },
          ...categories.map((cat) => ({ label: cat, value: cat })),
        ]}
        style={{ width: 200 }}
        size="large"
      />
    </div>
  );
};
