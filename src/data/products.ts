import type { Product } from '../types/product';

export const products: Product[] = [
  {
    id: 1,
    name: 'Посуда для фисташек/семечек',
    description: 'Дизайнерская посуда для порядка во время наслаждения любимыми видами орешек или семечек',
    price: 1500,
    material: 'PLA пластик',
    images: [
      '/images/p-cup-1.jpg',
      '/images/p-cup-1.jpg',
      '/images/p-cup-1.jpg',
      '/images/p-cup-1.jpg',
      '/images/p-cup-1.jpg',
    ],
    category: 'Посуда',
  },
];
