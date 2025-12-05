/**
 * Mock Product Grid Data
 * 12 products for the Popular Products grid section
 */

export interface ProductGridItem {
  id: string;
  category?: string;
  categoryColorScheme?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
  productType?: string;
  title: string;
  location?: string;
  moq?: string;
  stockWarning?: string;
  deliveryTime?: string;
  margin?: string;
  price: string;
  mrp?: string;
  imageUrl?: string;
  variants?: Array<{
    id: string;
    color: string;
  }>;
  isFavorite?: boolean;
}

const categories = ['Men', 'Women', 'Kids', 'Electronics', 'Fashion', 'Home', 'Sports', 'Beauty'];
const productTypes = [
  'Rubberized PVC Sports',
  'Premium Cotton',
  'Designer Wear',
  'Premium Quality',
  'Professional Grade',
  'Natural Ingredients',
  'Luxury Leather',
  'Cotton Blend',
  'Stainless Steel',
  'Organic Material',
];
const locations = [
  'Made in Delhi NCR',
  'Made in Mumbai',
  'Made in Bangalore',
  'Made in Jaipur',
  'Made in Kolkata',
  'Made in Chennai',
  'Made in Italy',
  'Made in China',
  'Made in India',
];

const deliveryTimes = [
  'Delivery in 2 hours',
  'Delivery in 4 hours',
  'Delivery in 6 hours',
  'Delivery in 1 day',
  'Delivery in 24 hours',
];

const variantColors = [
  ['#FF5C5C', '#5C8AFF', '#5CFF8A', '#FFB85C', '#B85CFF'],
  ['#FF1744', '#2979FF', '#00E676'],
  ['#000000', '#FFFFFF', '#FF0000', '#0000FF'],
  ['#F06292', '#BA68C8', '#9575CD'],
  ['#4DD0E1', '#4DB6AC', '#81C784'],
];

// Helper to get random item from array
const random = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// Helper to generate MOQ
const generateMOQ = (): string => {
  const qty = [2, 4, 5, 10, 12, 20][Math.floor(Math.random() * 6)];
  const unit = ['Pairs', 'Pieces', 'Sets', 'Units'][Math.floor(Math.random() * 4)];
  return `MOQ : ${qty} ${unit}`;
};

// Helper to generate margin
const generateMargin = (): string => {
  const margin = [35, 40, 45, 50, 56, 60, 65, 70, 75][Math.floor(Math.random() * 9)];
  return `${margin}% Margin`;
};

// Helper to generate stock warning (50% chance)
const generateStockWarning = (): string | undefined => {
  if (Math.random() > 0.5) {
    const qty = [1, 2, 3, 5][Math.floor(Math.random() * 4)];
    return `Only ${qty} Left`;
  }
  return undefined;
};

// Helper to generate price
const generatePrice = (): { price: string; mrp: string } => {
  const basePrice = Math.floor(Math.random() * 3000) + 100;
  const discountPercent = [10, 15, 20, 25, 30, 40, 50][Math.floor(Math.random() * 7)];
  const sellingPrice = basePrice - Math.floor((basePrice * discountPercent) / 100);

  return {
    price: sellingPrice.toString(),
    mrp: basePrice.toString(),
  };
};

export const mockProductGridItems: ProductGridItem[] = [
  {
    id: 'grid-prod-1',
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
    imageUrl: 'https://picsum.photos/seed/shoe1/400/533',
    variants: [
      { id: 'v1', color: '#FF5C5C' },
      { id: 'v2', color: '#5C8AFF' },
      { id: 'v3', color: '#5CFF8A' },
      { id: 'v4', color: '#FFB85C' },
      { id: 'v5', color: '#B85CFF' },
    ],
    isFavorite: false,
  },
  {
    id: 'grid-prod-2',
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
    imageUrl: 'https://picsum.photos/seed/dress1/400/533',
    variants: [
      { id: 'v1', color: '#FF1744' },
      { id: 'v2', color: '#2979FF' },
      { id: 'v3', color: '#00E676' },
    ],
    isFavorite: true,
  },
  {
    id: 'grid-prod-3',
    category: 'Electronics',
    categoryColorScheme: 'primary',
    productType: 'Professional Grade',
    title: 'Wireless Headphones Pro',
    location: 'Made in China',
    moq: 'MOQ : 5 Units',
    stockWarning: 'Only 3 Left',
    deliveryTime: 'Delivery in 6 hours',
    margin: '40% Margin',
    price: '2499',
    mrp: '4999',
    imageUrl: 'https://picsum.photos/seed/headphone1/400/533',
    isFavorite: false,
  },
  {
    id: 'grid-prod-4',
    category: 'Home',
    categoryColorScheme: 'success',
    productType: 'Premium Ceramic',
    title: 'Dinner Set - 24 Pieces',
    location: 'Made in Jaipur',
    moq: 'MOQ : 2 Sets',
    stockWarning: 'Only 1 Left',
    deliveryTime: 'Delivery in 4 hours',
    margin: '60% Margin',
    price: '1299',
    mrp: '2999',
    imageUrl: 'https://picsum.photos/seed/dinner1/400/533',
    variants: [
      { id: 'v1', color: '#FFFFFF' },
      { id: 'v2', color: '#F5F5DC' },
    ],
    isFavorite: false,
  },
  {
    id: 'grid-prod-5',
    category: 'Fashion',
    categoryColorScheme: 'warning',
    productType: 'Luxury Leather',
    title: 'Premium Leather Wallet',
    location: 'Made in Italy',
    moq: 'MOQ : 5 Pieces',
    deliveryTime: 'Delivery in 1 day',
    margin: '75% Margin',
    price: '499',
    mrp: '1999',
    imageUrl: 'https://picsum.photos/seed/wallet1/400/533',
    isFavorite: true,
  },
  {
    id: 'grid-prod-6',
    category: 'Kids',
    categoryColorScheme: 'success',
    productType: 'Cotton Blend',
    title: 'Kids T-Shirt Collection',
    location: 'Made in Bangalore',
    moq: 'MOQ : 12 Pieces',
    deliveryTime: 'Delivery in 2 hours',
    margin: '50% Margin',
    price: '199',
    mrp: '499',
    imageUrl: 'https://picsum.photos/seed/tshirt1/400/533',
    variants: [
      { id: 'v1', color: '#000000' },
      { id: 'v2', color: '#FFFFFF' },
      { id: 'v3', color: '#FF0000' },
      { id: 'v4', color: '#0000FF' },
      { id: 'v5', color: '#00FF00' },
    ],
    isFavorite: false,
  },
  {
    id: 'grid-prod-7',
    category: 'Sports',
    categoryColorScheme: 'primary',
    productType: 'Professional Grade',
    title: 'Cricket Bat Premium',
    location: 'Made in India',
    moq: 'MOQ : 2 Pieces',
    stockWarning: 'Only 5 Left',
    deliveryTime: 'Delivery in 4 hours',
    margin: '55% Margin',
    price: '1999',
    mrp: '3999',
    imageUrl: 'https://picsum.photos/seed/cricket1/400/533',
    isFavorite: false,
  },
  {
    id: 'grid-prod-8',
    category: 'Beauty',
    categoryColorScheme: 'error',
    productType: 'Natural Ingredients',
    title: 'Skincare Kit Complete',
    location: 'Made in Korea',
    moq: 'MOQ : 3 Sets',
    deliveryTime: 'Delivery in 2 hours',
    margin: '65% Margin',
    price: '1499',
    mrp: '2999',
    imageUrl: 'https://picsum.photos/seed/skincare1/400/533',
    variants: [
      { id: 'v1', color: '#F06292' },
      { id: 'v2', color: '#BA68C8' },
      { id: 'v3', color: '#9575CD' },
    ],
    isFavorite: true,
  },
  {
    id: 'grid-prod-9',
    category: 'Men',
    categoryColorScheme: 'info',
    productType: 'Cotton Blend',
    title: 'Formal Shirt Collection',
    location: 'Made in Chennai',
    moq: 'MOQ : 6 Pieces',
    deliveryTime: 'Delivery in 6 hours',
    margin: '48% Margin',
    price: '599',
    mrp: '1199',
    imageUrl: 'https://picsum.photos/seed/shirt1/400/533',
    variants: [
      { id: 'v1', color: '#4DD0E1' },
      { id: 'v2', color: '#4DB6AC' },
      { id: 'v3', color: '#81C784' },
    ],
    isFavorite: false,
  },
  {
    id: 'grid-prod-10',
    category: 'Electronics',
    categoryColorScheme: 'primary',
    productType: 'Smart Technology',
    title: 'Smart Watch Series 5',
    location: 'Made in China',
    moq: 'MOQ : 3 Units',
    stockWarning: 'Only 4 Left',
    deliveryTime: 'Delivery in 1 day',
    margin: '42% Margin',
    price: '2999',
    mrp: '5999',
    imageUrl: 'https://picsum.photos/seed/watch1/400/533',
    isFavorite: false,
  },
  {
    id: 'grid-prod-11',
    category: 'Home',
    categoryColorScheme: 'success',
    productType: 'Stainless Steel',
    title: 'Kitchen Utensils Set',
    location: 'Made in Kolkata',
    moq: 'MOQ : 4 Sets',
    deliveryTime: 'Delivery in 4 hours',
    margin: '58% Margin',
    price: '899',
    mrp: '1799',
    imageUrl: 'https://picsum.photos/seed/kitchen1/400/533',
    isFavorite: false,
  },
  {
    id: 'grid-prod-12',
    category: 'Women',
    categoryColorScheme: 'error',
    productType: 'Designer Wear',
    title: 'Ethnic Kurta Set',
    location: 'Made in Jaipur',
    moq: 'MOQ : 8 Pieces',
    stockWarning: 'Only 2 Left',
    deliveryTime: 'Delivery in 2 hours',
    margin: '52% Margin',
    price: '899',
    mrp: '1799',
    imageUrl: 'https://picsum.photos/seed/kurta1/400/533',
    variants: [
      { id: 'v1', color: '#FF6B6B' },
      { id: 'v2', color: '#4ECDC4' },
      { id: 'v3', color: '#FFE66D' },
      { id: 'v4', color: '#95E1D3' },
    ],
    isFavorite: true,
  },
];

// API Function
export const getProductList = (): ProductGridItem[] => {
  return mockProductGridItems;
};
