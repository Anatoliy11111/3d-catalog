import { Empty } from 'antd';
import type { Product } from '../types/product';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  selectedProducts: number[];
  onSelectionChange: (productId: number, selected: boolean) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  selectedProducts,
  onSelectionChange,
}) => {
  if (products.length === 0) {
    return <Empty description="Товары не найдены" />;
  }

  return (
    <div className="product-grid-container">
      {products.map((product) => (
        <div key={product.id} className="product-grid-item">
          <ProductCard
            product={product}
            isSelected={selectedProducts.includes(product.id)}
            onSelectionChange={onSelectionChange}
          />
        </div>
      ))}
    </div>
  );
};
