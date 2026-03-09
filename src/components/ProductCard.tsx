import { Card, Typography, Checkbox } from 'antd';
import type { Product } from '../types/product';
import { ProductCarousel } from './ProductCarousel';

const { Text } = Typography;

interface ProductCardProps {
  product: Product;
  isSelected: boolean;
  onSelectionChange: (productId: number, selected: boolean) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isSelected,
  onSelectionChange,
}) => {
  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.no-nav, .card-checkbox')) {
      return;
    }
    window.location.hash = `product-${product.id}`;
  };

  const handleCheckboxChange = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Card
      hoverable
      className={`product-card ${isSelected ? 'selected' : ''}`}
      onClick={handleCardClick}
      bodyStyle={{ padding: '8px 12px' }}
    >
      <div className="product-card-inner">
        <div className="product-image-wrapper">
          <ProductCarousel product={product} />
          <div className="card-checkbox-wrapper">
            <Checkbox
              checked={isSelected}
              onChange={(e) => onSelectionChange(product.id, e.target.checked)}
              className="card-checkbox"
              onClick={handleCheckboxChange}
            />
          </div>
        </div>
        <div className="product-info">
          <Text strong className="product-name">{product.name}</Text>
          <Text className="product-price">{product.price.toLocaleString('ru-RU')} ₽</Text>
        </div>
      </div>
    </Card>
  );
};
