import { Layout, Typography, Space, Badge, Button } from 'antd';
import { ShoppingOutlined, SendOutlined } from '@ant-design/icons';
import { useToken } from '../hooks/useToken';
import type { Product } from '../types/product';

const { Header: AntHeader } = Layout;
const { Title, Text } = Typography;

interface HeaderProps {
  selectedCount: number;
  selectedProducts: Product[];
  onOrder: () => void;
  onClear: () => void;
}

export const Header: React.FC<HeaderProps> = ({ selectedCount, selectedProducts, onOrder, onClear }) => {
  const { token } = useToken();
  const totalPrice = selectedProducts.reduce((sum, p) => sum + p.price, 0);

  return (
    <AntHeader className="app-header" style={{ background: token.colorPrimary, borderRadius: '16px' }}>
      <div className="header-content">
        <div className="header-brand">
          <ShoppingOutlined className="header-icon" />
          <Title level={2} className="header-title">
            3D Catalog
          </Title>
          {selectedCount > 0 && (
            <Badge
              count={selectedCount}
              size="small"
              className="header-badge"
              style={{ backgroundColor: token.colorSuccess }}
            />
          )}
        </div>
        {selectedCount > 0 && (
          <div className="header-order" style={{lineHeight: 0}}>
            <Text className="header-order-text">
              {totalPrice.toLocaleString('ru-RU')} ₽
            </Text>
            <Space size="small" wrap>
              <Button size="large" onClick={onClear}>
                Очистить
              </Button>
              <Button
                type="primary"
                size="large"
                icon={<SendOutlined />}
                onClick={onOrder}
                className="order-btn"
              >
                Заказать
              </Button>
            </Space>
          </div>
        )}
      </div>
    </AntHeader>
  );
};
