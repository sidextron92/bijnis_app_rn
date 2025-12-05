import { SDUIPageLayout } from 'shared-types';
import { mockCategories } from './categories';
import { mockProducts } from './products';
import { mockProductGridItems } from './productGrid';

export const mockHomeLayout: SDUIPageLayout = {
  id: 'home-page',
  widgets: [
    {
      id: 'banner-carousel',
      type: 'banner_carousel',
      data: {
        banners: [
          {
            id: 'banner-1',
            image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800',
            title: 'Fresh Groceries',
            subtitle: 'Delivered in 10 minutes',
            action: { type: 'navigate', destination: '/categories' },
          },
          {
            id: 'banner-2',
            image: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=800',
            title: '50% OFF on Fruits',
            subtitle: 'Limited time offer',
            action: { type: 'navigate', destination: '/category/cat-1' },
          },
          {
            id: 'banner-3',
            image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800',
            title: 'Home Essentials',
            subtitle: 'Stock up on daily needs',
            action: { type: 'navigate', destination: '/category/cat-6' },
          },
        ],
        autoPlay: true,
        interval: 4000,
      },
    },
    {
      id: 'category-grid',
      type: 'category_grid',
      data: {
        title: 'Shop by Category',
        categories: mockCategories.slice(0, 8).map(cat => ({
          id: cat.id,
          name: cat.name,
          image: cat.image,
          action: { type: 'navigate', destination: `/category/${cat.id}` },
        })),
        columns: 4,
      },
    },
    {
      id: 'spacer-1',
      type: 'spacer',
      data: {
        height: 16,
      },
    },
    {
      id: 'deals-rail',
      type: 'product_rail',
      data: {
        title: 'Deals of the Day',
        subtitle: 'Up to 30% off',
        products: mockProductGridItems.slice(0, 6).map(p => ({
          id: p.id,
          name: p.title,
          price: parseInt(p.price),
          mrp: p.mrp ? parseInt(p.mrp) : parseInt(p.price),
          image: p.imageUrl || 'https://via.placeholder.com/150',
          unit: '',
          // Full product details for ProductCard
          category: p.category,
          categoryColorScheme: p.categoryColorScheme,
          productType: p.productType,
          location: p.location,
          moq: p.moq,
          stockWarning: p.stockWarning,
          deliveryTime: p.deliveryTime,
          margin: p.margin,
          variants: p.variants,
        })),
        seeAllLink: '/deals',
      },
    },
    {
      id: 'divider-1',
      type: 'divider',
      data: {
        thickness: 8,
      },
    },
    {
      id: 'snacks-rail',
      type: 'product_rail',
      data: {
        title: 'Snacks & Beverages',
        subtitle: 'Party time!',
        products: mockProductGridItems.slice(6, 12).map(p => ({
          id: p.id,
          name: p.title,
          price: parseInt(p.price),
          mrp: p.mrp ? parseInt(p.mrp) : parseInt(p.price),
          image: p.imageUrl || 'https://via.placeholder.com/150',
          unit: '',
          // Full product details for ProductCard
          category: p.category,
          categoryColorScheme: p.categoryColorScheme,
          productType: p.productType,
          location: p.location,
          moq: p.moq,
          stockWarning: p.stockWarning,
          deliveryTime: p.deliveryTime,
          margin: p.margin,
          variants: p.variants,
        })),
        seeAllLink: '/category/snacks',
      },
    },
    {
      id: 'spacer-2',
      type: 'spacer',
      data: {
        height: 8,
      },
    },
    {
      id: 'fruits-rail',
      type: 'product_rail',
      data: {
        title: 'Fruits & Vegetables',
        subtitle: 'Farm fresh',
        products: mockProductGridItems.slice(0, 6).map(p => ({
          id: p.id,
          name: p.title,
          price: parseInt(p.price),
          mrp: p.mrp ? parseInt(p.mrp) : parseInt(p.price),
          image: p.imageUrl || 'https://via.placeholder.com/150',
          unit: '',
          // Full product details for ProductCard
          category: p.category,
          categoryColorScheme: p.categoryColorScheme,
          productType: p.productType,
          location: p.location,
          moq: p.moq,
          stockWarning: p.stockWarning,
          deliveryTime: p.deliveryTime,
          margin: p.margin,
          variants: p.variants,
        })),
        seeAllLink: '/category/fruits',
      },
    },

    // Spacer before product grid
    {
      type: 'spacer',
      data: {
        height: 16,
      },
    },

    // Product Grid Section
    {
      type: 'product_grid',
      data: {
        title: 'Popular Products',
        columns: 2,
        gap: 16,
      },
    },

    // Bottom spacer
    {
      type: 'spacer',
      data: {
        height: 32,
      },
    },
  ],
};
