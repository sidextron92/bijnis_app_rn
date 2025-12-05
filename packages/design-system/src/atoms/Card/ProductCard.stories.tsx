import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { ProductCard } from './ProductCard';
import { ThemeProvider } from '../../theme';

const meta: Meta<typeof ProductCard> = {
  title: 'Sushi/Atoms/Card/ProductCard',
  component: ProductCard,
  tags: ['autodocs'],
  argTypes: {
    category: {
      control: 'text',
      description: 'Product category tag',
    },
    categoryColorScheme: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'error', 'info'],
      description: 'Category tag color',
    },
    productType: {
      control: 'text',
      description: 'Product type/material label',
    },
    title: {
      control: 'text',
      description: 'Product title',
    },
    location: {
      control: 'text',
      description: 'Product location/origin',
    },
    moq: {
      control: 'text',
      description: 'Minimum order quantity text',
    },
    stockWarning: {
      control: 'text',
      description: 'Stock warning text',
    },
    deliveryTime: {
      control: 'text',
      description: 'Delivery time text',
    },
    margin: {
      control: 'text',
      description: 'Profit margin percentage',
    },
    price: {
      control: 'text',
      description: 'Current price',
    },
    mrp: {
      control: 'text',
      description: 'Original MRP',
    },
    isFavorite: {
      control: 'boolean',
      description: 'Is product favorited',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
  },
  args: {
    title: 'Product Name',
    price: '434',
    isFavorite: false,
    disabled: false,
  },
  decorators: [
    (Story) => (
      <ThemeProvider initialMode="light">
        <View style={{ padding: 16, backgroundColor: '#000' }}>
          <Story />
        </View>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ProductCard>;

// Default - Minimal Props
export const Default: Story = {
  args: {
    title: 'Loafers LAND AD -1372',
    price: '434',
  },
};

// Complete Product Card (Figma Design)
export const Complete: Story = {
  args: {
    category: 'Men',
    categoryColorScheme: 'info',
    productType: 'Rubberized PVC Sports',
    title: 'Loafers LAND AD -1372',
    location: 'Made in Delhi NCR',
    moq: 'MOQ : 4 Pairs',
    stockWarning: 'Only 2 Left',
    deliveryTime: 'Delivery in 2 hours',
    margin: '56% Margin',
    price: '434',
    mrp: '999',
    variants: [
      { id: '1', color: '#FF5C5C' },
      { id: '2', color: '#5C8AFF' },
      { id: '3', color: '#5CFF8A' },
      { id: '4', color: '#FFB85C' },
      { id: '5', color: '#B85CFF' },
    ],
    isFavorite: false,
    onFavoritePress: () => console.log('Favorite pressed'),
    onPress: () => console.log('Card pressed'),
  },
};

// With Favorite
export const Favorited: Story = {
  args: {
    category: 'Women',
    categoryColorScheme: 'error',
    productType: 'Premium Cotton',
    title: 'Designer Dress Collection',
    location: 'Made in Mumbai',
    moq: 'MOQ : 10 Pieces',
    deliveryTime: 'Delivery in 4 hours',
    margin: '45% Margin',
    price: '799',
    mrp: '1499',
    variants: [
      { id: '1', color: '#FF1744' },
      { id: '2', color: '#2979FF' },
      { id: '3', color: '#00E676' },
    ],
    isFavorite: true,
    onFavoritePress: () => console.log('Favorite pressed'),
    onPress: () => console.log('Card pressed'),
  },
};

// Minimal - Without Optional Fields
export const Minimal: Story = {
  args: {
    title: 'Basic Product',
    price: '299',
    onPress: () => console.log('Card pressed'),
  },
};

// With Long Title
export const LongTitle: Story = {
  args: {
    category: 'Electronics',
    categoryColorScheme: 'primary',
    title: 'Professional Wireless Bluetooth Headphones with Active Noise Cancellation and Premium Sound Quality',
    location: 'Made in China',
    price: '2499',
    mrp: '4999',
    onPress: () => console.log('Card pressed'),
  },
};

// Low Stock Warning
export const LowStock: Story = {
  args: {
    category: 'Home',
    productType: 'Premium Ceramic',
    title: 'Dinner Set - 24 Pieces',
    location: 'Made in Jaipur',
    moq: 'MOQ : 2 Sets',
    stockWarning: 'Only 1 Left',
    deliveryTime: 'Delivery in 3 hours',
    margin: '60% Margin',
    price: '1299',
    mrp: '2999',
    variants: [
      { id: '1', color: '#FFFFFF' },
      { id: '2', color: '#F5F5DC' },
    ],
    onPress: () => console.log('Card pressed'),
  },
};

// High Margin
export const HighMargin: Story = {
  args: {
    category: 'Fashion',
    categoryColorScheme: 'success',
    productType: 'Luxury Leather',
    title: 'Premium Leather Wallet',
    location: 'Made in Italy',
    moq: 'MOQ : 5 Pieces',
    deliveryTime: 'Delivery in 24 hours',
    margin: '75% Margin',
    price: '499',
    mrp: '1999',
    onPress: () => console.log('Card pressed'),
  },
};

// Many Variants
export const ManyVariants: Story = {
  args: {
    category: 'Apparel',
    productType: 'Cotton Blend',
    title: 'T-Shirt Collection',
    moq: 'MOQ : 12 Pieces',
    price: '199',
    mrp: '499',
    variants: [
      { id: '1', color: '#000000' },
      { id: '2', color: '#FFFFFF' },
      { id: '3', color: '#FF0000' },
      { id: '4', color: '#0000FF' },
      { id: '5', color: '#00FF00' },
      { id: '6', color: '#FFFF00' },
      { id: '7', color: '#FF00FF' },
      { id: '8', color: '#00FFFF' },
    ],
    maxVisibleVariants: 3,
    onPress: () => console.log('Card pressed'),
  },
};

// Without Image (Placeholder)
export const WithoutImage: Story = {
  args: {
    category: 'Accessories',
    categoryColorScheme: 'warning',
    productType: 'Stainless Steel',
    title: 'Watch Collection',
    location: 'Made in Switzerland',
    price: '3499',
    mrp: '7999',
    onPress: () => console.log('Card pressed'),
  },
};

// Disabled State
export const Disabled: Story = {
  args: {
    category: 'Sports',
    title: 'Out of Stock Product',
    price: '599',
    mrp: '1199',
    disabled: true,
  },
};

// Different Categories
export const DifferentCategories: Story = {
  render: () => (
    <View style={{ gap: 24 }}>
      <ProductCard
        category="Men"
        categoryColorScheme="info"
        title="Men's Shoes"
        price="499"
        onPress={() => {}}
      />
      <ProductCard
        category="Women"
        categoryColorScheme="error"
        title="Women's Dress"
        price="799"
        onPress={() => {}}
      />
      <ProductCard
        category="Kids"
        categoryColorScheme="success"
        title="Kids Toy Set"
        price="299"
        onPress={() => {}}
      />
      <ProductCard
        category="Electronics"
        categoryColorScheme="primary"
        title="Smart Watch"
        price="2499"
        onPress={() => {}}
      />
    </View>
  ),
};

// Grid Layout
export const GridLayout: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>
      <ProductCard
        category="Fashion"
        productType="Designer Wear"
        title="Ethnic Kurta Set"
        price="899"
        mrp="1799"
        variants={[
          { id: '1', color: '#FF6B6B' },
          { id: '2', color: '#4ECDC4' },
          { id: '3', color: '#FFE66D' },
        ]}
        onPress={() => {}}
      />
      <ProductCard
        category="Home"
        productType="Premium Quality"
        title="Bed Sheet Set"
        price="649"
        mrp="1299"
        stockWarning="Only 3 Left"
        onPress={() => {}}
      />
      <ProductCard
        category="Sports"
        productType="Professional Grade"
        title="Cricket Bat"
        price="1999"
        mrp="3999"
        margin="50% Margin"
        onPress={() => {}}
      />
      <ProductCard
        category="Beauty"
        productType="Natural Ingredients"
        title="Skincare Kit"
        price="1499"
        mrp="2999"
        deliveryTime="Delivery in 2 hours"
        onPress={() => {}}
      />
    </View>
  ),
};

// Interactive Demo
export const InteractiveDemo: Story = {
  render: () => {
    const [favorite, setFavorite] = React.useState(false);

    return (
      <ProductCard
        category="Demo"
        categoryColorScheme="primary"
        productType="Interactive Example"
        title="Click to Test Interactions"
        location="Made with Love"
        moq="MOQ : 1 Piece"
        stockWarning="Limited Stock"
        deliveryTime="Instant Delivery"
        margin="100% Margin"
        price="0"
        mrp="999"
        variants={[
          { id: '1', color: '#FF6B6B' },
          { id: '2', color: '#4ECDC4' },
          { id: '3', color: '#FFE66D' },
          { id: '4', color: '#95E1D3' },
        ]}
        isFavorite={favorite}
        onFavoritePress={() => {
          setFavorite(!favorite);
          console.log('Favorite toggled:', !favorite);
        }}
        onPress={() => console.log('Card pressed')}
      />
    );
  },
};
