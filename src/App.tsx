import { useState, useMemo, useEffect } from 'react';
import { Layout, ConfigProvider, message } from 'antd';
import type { ThemeConfig } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import { Header } from './components/Header';
import { CategoryFilter } from './components/CategoryFilter';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetail } from './components/ProductDetail';
import { products } from './data/products';
import type { Product } from './types/product';
import './App.css';

const { Content } = Layout;

const TELEGRAM_USERNAME = import.meta.env.VITE_TELEGRAM_USERNAME;

// Midnight Purple Theme Configuration
const goldenPurpleTheme: ThemeConfig = {
  token: {
    colorPrimary: '#6366f1',
    colorSuccess: '#8b5cf6',
    colorBgLayout: '#f5f3ff',
    colorBgContainer: '#ffffff',
    colorText: '#1f2937',
    colorTextSecondary: '#6b7280',
    borderRadius: 12,
    fontSize: 14,
    colorLink: '#6366f1',
    colorLinkHover: '#8b5cf6',
    colorLinkActive: '#4f46e5',
  },
  components: {
    Card: {
      colorBgContainer: '#ffffff',
      colorBorderSecondary: '#ddd6fe',
    },
    Button: {
      colorPrimary: '#6366f1',
      colorPrimaryHover: '#8b5cf6',
      colorPrimaryActive: '#4f46e5',
    },
    Select: {
      colorBgContainer: '#ffffff',
      colorBorder: '#ddd6fe',
    },
    Checkbox: {
      colorPrimary: '#6366f1',
    },
    Badge: {
      colorPrimary: '#8b5cf6',
    },
    Modal: {
      colorBgContainer: '#ffffff',
      colorBgMask: 'rgba(0, 0, 0, 0.45)',
    },
  },
};

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);

  const categories = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.category)));
  }, []);

  // Handle hash-based navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#product-')) {
        const productId = parseInt(hash.replace('#product-', ''), 10);
        const product = products.find((p) => p.id === productId);
        if (product) {
          setDetailProduct(product);
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') {
      return products;
    }
    return products.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const selectedProducts = useMemo(() => {
    return products.filter((p) => selectedProductIds.includes(p.id));
  }, [selectedProductIds]);

  const handleSelectionChange = (productId: number, selected: boolean) => {
    setSelectedProductIds((prev) => {
      if (selected) {
        return [...prev, productId];
      }
      return prev.filter((id) => id !== productId);
    });
  };

  const handleOrder = () => {
    const orderText = `Здравствуйте! Хочу заказать:

${selectedProducts.map((p, i) => `${i + 1}. ${p.name} — ${p.price.toLocaleString('ru-RU')} ₽`).join('\n')}

━━━━━━━━━━━━━━━━━━━━
Итого: ${selectedProducts.reduce((sum, p) => sum + p.price, 0).toLocaleString('ru-RU')} ₽
Товаров: ${selectedProducts.length} шт.`;

    navigator.clipboard.writeText(orderText).then(() => {
      message.success('Данные заказа скопированы в буфер обмена!');

      const telegramUrl = `https://t.me/${TELEGRAM_USERNAME}?text=${encodeURIComponent(orderText)}`;
      window.open(telegramUrl, '_blank');
    }).catch(() => {
      message.error('Не удалось скопировать данные');
    });
  };

  const handleClearSelection = () => {
    setSelectedProductIds([]);
  };

  const handleCloseDetail = () => {
    setDetailProduct(null);
    window.location.hash = '';
  };

  return (
    <ConfigProvider locale={ruRU} theme={goldenPurpleTheme}>
      <Layout className="app-layout">
        <Header
          selectedCount={selectedProductIds.length}
          selectedProducts={selectedProducts}
          onOrder={handleOrder}
          onClear={handleClearSelection}
        />
        <Content className="app-content">
          <div className="content-wrapper">
            <div className="filters-section">
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
            </div>
            <ProductGrid
              products={filteredProducts}
              selectedProducts={selectedProductIds}
              onSelectionChange={handleSelectionChange}
            />
          </div>
        </Content>
        <ProductDetail
          product={detailProduct}
          open={!!detailProduct}
          onClose={handleCloseDetail}
        />
      </Layout>
    </ConfigProvider>
  );
}

export default App;
