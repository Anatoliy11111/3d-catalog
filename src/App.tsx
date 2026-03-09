import { useState, useMemo, useEffect } from 'react';
import { Layout, ConfigProvider, message } from 'antd';
import type { ThemeConfig } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import { Header } from './components/Header';
import { CategoryFilter } from './components/CategoryFilter';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetail } from './components/ProductDetail';
import { FloatingCart } from './components/FloatingCart';
import { products } from './data/products';
import type { Product } from './types/product';
import './App.css';

const { Content } = Layout;

const TELEGRAM_USERNAME = import.meta.env.VITE_TELEGRAM_USERNAME;

// Apple-style Theme Configuration
const appleTheme: ThemeConfig = {
  token: {
    colorPrimary: '#0071e3',
    colorSuccess: '#34c759',
    colorBgLayout: '#ffffff',
    colorBgContainer: '#ffffff',
    colorText: '#1d1d1f',
    colorTextSecondary: '#86868b',
    borderRadius: 12,
    fontSize: 15,
    colorLink: '#0071e3',
    colorLinkHover: '#0077ed',
    colorLinkActive: '#005bb5',
    colorBorder: '#d2d2d7',
    colorFillSecondary: '#f5f5f7',
  },
  components: {
    Card: {
      colorBgContainer: '#ffffff',
      colorBorderSecondary: '#d2d2d7',
    },
    Button: {
      colorPrimary: '#0071e3',
      colorPrimaryHover: '#0077ed',
      colorPrimaryActive: '#005bb5',
      algorithm: true,
    },
    Select: {
      colorBgContainer: '#ffffff',
      colorBorder: '#d2d2d7',
    },
    Checkbox: {
      colorPrimary: '#0071e3',
    },
    Badge: {
      colorPrimary: '#0071e3',
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
    <ConfigProvider locale={ruRU} theme={appleTheme}>
      <Layout className="app-layout">
        <Header />
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
        <FloatingCart
          selectedCount={selectedProductIds.length}
          selectedProducts={selectedProducts}
          onOrder={handleOrder}
          onClear={handleClearSelection}
        />
      </Layout>
    </ConfigProvider>
  );
}

export default App;
