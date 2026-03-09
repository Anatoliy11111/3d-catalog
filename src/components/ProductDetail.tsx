import { Modal, Typography, Space, Tag } from 'antd';
import type { Product } from '../types/product';
import { ProductCarousel } from './ProductCarousel';

const { Title, Paragraph, Text } = Typography;

interface ProductDetailProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product, open, onClose }) => {
  if (!product) return null;

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={600}
      className="product-detail-modal"
      centered
    >
      <div className="product-detail-content">
        <ProductCarousel product={product} autoplay={false} showArrows={true} />
        <div className="product-detail-info">
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <div className="product-detail-header">
              <Title level={3} style={{ margin: 0 }}>{product.name}</Title>
              <Tag className="detail-category-tag">{product.category}</Tag>
            </div>
            <Text className="detail-price">{product.price.toLocaleString('ru-RU')} ₽</Text>
            <Paragraph className="detail-description">{product.description}</Paragraph>
            <div className="detail-material">
              <Text strong>Материал:</Text>
              <Text>{product.material}</Text>
            </div>
          </Space>
        </div>
      </div>
    </Modal>
  );
};
