import { useState } from 'react';
import { Carousel, Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import type { Product } from '../types/product';

interface ProductCarouselProps {
  product: Product;
  onImageClick?: () => void;
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({ product, onImageClick }) => {
  const [carouselRef, setCarouselRef] = useState<any>(null);

  return (
    <div className="product-carousel">
      <Carousel ref={setCarouselRef} dots={{ className: 'carousel-dots' }} autoplay autoplaySpeed={3000}>
        {product.images.map((image, index) => (
          <div key={index} className="carousel-slide" onClick={onImageClick}>
            <img src={image} alt={`${product.name} - ${index + 1}`} className="carousel-image" />
          </div>
        ))}
      </Carousel>
      <div className="carousel-arrows">
        <Button
          size="small"
          shape="circle"
          icon={<LeftOutlined />}
          onClick={() => carouselRef?.prev()}
          className="carousel-arrow"
        />
        <Button
          size="small"
          shape="circle"
          icon={<RightOutlined />}
          onClick={() => carouselRef?.next()}
          className="carousel-arrow"
        />
      </div>
    </div>
  );
};
