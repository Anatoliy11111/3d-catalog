import { useState } from 'react';
import { Modal, Button, Typography, Space, Empty } from 'antd';
import { ShoppingCartOutlined, SendOutlined } from '@ant-design/icons';
import type { Product } from '../types/product';

const { Text, Title } = Typography;

interface FloatingCartProps {
  selectedCount: number;
  selectedProducts: Product[];
  onOrder: () => void;
  onClear: () => void;
}

export const FloatingCart: React.FC<FloatingCartProps> = ({
  selectedCount,
  selectedProducts,
  onOrder,
  onClear,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const totalPrice = selectedProducts.reduce((sum, p) => sum + p.price, 0);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOrderClick = () => {
    onOrder();
    setIsModalOpen(false);
  };

  return (
    <>
      {selectedCount > 0 && (
        <div className="floating-cart" onClick={handleOpenModal}>
          <div className="floating-cart-icon">
            <ShoppingCartOutlined />
            <span className="floating-cart-count">{selectedCount}</span>
          </div>
          <div className="floating-cart-total">
            <Text className="floating-cart-label">Итого:</Text>
            <Text className="floating-cart-price">{totalPrice.toLocaleString('ru-RU')} ₽</Text>
          </div>
        </div>
      )}

      <Modal
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
        centered
        className="cart-modal"
        title={
          <Title level={4} style={{ margin: 0 }}>
            Ваш заказ
          </Title>
        }
      >
        <div className="cart-modal-content">
          {selectedProducts.length === 0 ? (
            <Empty description="Корзина пуста" />
          ) : (
            <>
              <div className="cart-items">
                {selectedProducts.map((product) => (
                  <div key={product.id} className="cart-item">
                    <div className="cart-item-image">
                      <img src={product.images[0]} alt={product.name} />
                    </div>
                    <div className="cart-item-info">
                      <Text className="cart-item-name">{product.name}</Text>
                      <Text className="cart-item-price">
                        {product.price.toLocaleString('ru-RU')} ₽
                      </Text>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-summary">
                <div className="cart-summary-row">
                  <Text className="cart-summary-label">Товаров:</Text>
                  <Text className="cart-summary-value">{selectedCount} шт.</Text>
                </div>
                <div className="cart-summary-row cart-summary-total">
                  <Text className="cart-summary-label">Итого:</Text>
                  <Text className="cart-summary-price">
                    {totalPrice.toLocaleString('ru-RU')} ₽
                  </Text>
                </div>
              </div>

              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <Button
                  type="primary"
                  size="large"
                  icon={<SendOutlined />}
                  onClick={handleOrderClick}
                  className="order-btn"
                  block
                >
                  Оформить заказ
                </Button>
                <Button
                  size="large"
                  onClick={() => {
                    onClear();
                    handleCloseModal();
                  }}
                  block
                >
                  Очистить корзину
                </Button>
              </Space>
            </>
          )}
        </div>
      </Modal>
    </>
  );
};
