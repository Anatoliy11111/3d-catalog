import { Button, Space, Typography, Badge } from 'antd';
import { ShoppingCartOutlined, SendOutlined } from '@ant-design/icons';
import type { Product } from '../types/product';
import { useToken } from '../hooks/useToken';

const { Text } = Typography;

interface OrderBarProps {
  selectedProducts: Product[];
  onOrder: () => void;
  onClear: () => void;
}

export const OrderBar: React.FC<OrderBarProps> = ({
  selectedProducts,
  onOrder,
  onClear,
}) => {
  const { token } = useToken();
  const totalPrice = selectedProducts.reduce((sum, p) => sum + p.price, 0);

  if (selectedProducts.length === 0) {
    return null;
  }

  return (
    <div className="order-bar" style={{ background: `linear-gradient(135deg, ${token.colorPrimary} 0%, ${token.colorPrimaryHover} 100%)` }}>
      <div className="order-bar-content">
        <Space size="large" align="center">
          <div className="selected-info">
            <Badge count={selectedProducts.length} size="small" className="badge-count">
              <ShoppingCartOutlined style={{ fontSize: 20, marginRight: 8, color: token.colorSuccess }} />
            </Badge>
            <Text strong style={{ color: '#ffffff' }}>
              Выбрано товаров: {selectedProducts.length}
            </Text>
          </div>
          <Text className="total-price" style={{ color: '#ffffff' }}>
            Итого: <strong>{totalPrice.toLocaleString('ru-RU')} ₽</strong>
          </Text>
          <Space size="middle">
            <Button onClick={onClear} size="large">
              Очистить
            </Button>
            <Button
              type="primary"
              size="large"
              icon={<SendOutlined />}
              onClick={onOrder}
              className="order-button"
              style={{ background: token.colorSuccess, borderColor: token.colorSuccess, color: '#ffffff' }}
            >
              Заказать в Telegram
            </Button>
          </Space>
        </Space>
      </div>
    </div>
  );
};
