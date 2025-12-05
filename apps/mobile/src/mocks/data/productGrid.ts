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
  'PVC 1st Grade Sports',
  'PVC Sports',
  'EVA TPR Sole SPorts',
  'Natural Ingredients',
  'PVC Sole',
  'Cotton Blend Printed Accessories',
  'Russian Fleet Sweatshirt',
  'Sap 2 Thread Fleece',
];
const locations = [
  'Made in Delhi NCR',
  'Made in Agra',
  'Made in Delhi NCR',
  'Made in Jaipur',
  'Made in Agra',
  'Made in Agra',
  'Made in Tirupur',
  'Made in Ludhiana',
  'Made in Ludhiana',
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
    productType: 'Sap 2 Thread Fleece',
    title: 'Loafers LAND AD -1372',
    location: 'Made in Tirupur',
    moq: 'MOQ : 4 Pairs',
    stockWarning: 'Only 2 Left',
    deliveryTime: 'Delivery in 1 day',
    margin: '56% Margin',
    price: '434',
    mrp: '999',
    imageUrl: 'https://bijnis.s3.ap-south-1.amazonaws.com/prod/product_images/1640327219/05-12-2025/1764922929182_624_1_1.jpg',
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
    productType: 'Cotton Blend Printed Accessories',
    title: 'Geek Boys Tees 224',
    location: 'Made in Delhi NCR',
    moq: 'MOQ : 10 Pieces',
    deliveryTime: 'Delivery in 2 hours',
    margin: '45% Margin',
    price: '799',
    mrp: '1499',
    imageUrl: 'https://bijnis.s3.amazonaws.com/PRODUCTION/uploads/uploadfile_1-5681f701-5d55-430b-b33f-28f59ede3c13.jpeg',
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
    productType: 'PVC Sports',
    title: 'JAMES HAMILTON 255',
    location: 'Made in Ludhiana',
    moq: 'MOQ : 5 Units',
    stockWarning: 'Only 3 Left',
    deliveryTime: 'Delivery in 4 hours',
    margin: '40% Margin',
    price: '2499',
    mrp: '4999',
    imageUrl: 'https://bijnis.s3.amazonaws.com/PRODUCTION/uploads/uploadfile_1-5756f321-77a8-47aa-924e-80775198ce36.jpeg',
    isFavorite: false,
  },
  {
    id: 'grid-prod-4',
    category: 'Home',
    categoryColorScheme: 'success',
    productType: 'Premium Cotton',
    title: 'LUX 3172',
    location: 'Made in Agra',
    moq: 'MOQ : 2 Sets',
    stockWarning: 'Only 1 Left',
    deliveryTime: 'Delivery in 2 hours',
    margin: '60% Margin',
    price: '1299',
    mrp: '2999',
    imageUrl: 'https://bijnis.s3.amazonaws.com/PRODUCTION/uploads/uploadfile_1-41da7598-a45a-42c9-9016-348e9cb52792.jpeg',
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
    productType: 'PVC Sole',
    title: 'FORTEXO 853',
    location: 'Made in Ludhiana',
    moq: 'MOQ : 5 Pieces',
    deliveryTime: 'Delivery in 2 hours',
    margin: '75% Margin',
    price: '499',
    mrp: '1999',
    imageUrl: 'https://bijnis.s3.ap-south-1.amazonaws.com/prod/product_images/1651211296/05-12-2025/1764922748386_530_5_1.jpg',
    isFavorite: true,
  },
  {
    id: 'grid-prod-6',
    category: 'Kids',
    categoryColorScheme: 'success',
    productType: 'EVA TPR Sole SPorts',
    title: 'ZIPLITE 3166',
    location: 'Made in Delhi NCR',
    moq: 'MOQ : 12 Pieces',
    deliveryTime: 'Delivery in 6 hours',
    margin: '50% Margin',
    price: '199',
    mrp: '499',
    imageUrl: 'https://bijnis.s3.ap-south-1.amazonaws.com/prod/product_images/1640327219/05-12-2025/1764922419154_442_1_1.jpg',
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
    productType: 'Rubberized PVC Sports',
    title: 'ASIAN 7710',
    location: 'Made in Agra',
    moq: 'MOQ : 2 Pieces',
    stockWarning: 'Only 5 Left',
    deliveryTime: 'Delivery in 24 hours',
    margin: '55% Margin',
    price: '1999',
    mrp: '3999',
    imageUrl: 'https://bijnis.s3.ap-south-1.amazonaws.com/prod/product_images/1640327219/05-12-2025/1764922308078_386_1_1.jpg',
    isFavorite: false,
  },
  {
    id: 'grid-prod-8',
    category: 'Beauty',
    categoryColorScheme: 'error',
    productType: 'PVC 1st Grade Sports',
    title: 'PU STAY 057',
    location: 'Made in Agra',
    moq: 'MOQ : 3 Sets',
    deliveryTime: 'Delivery in 4 hours',
    margin: '65% Margin',
    price: '1499',
    mrp: '2999',
    imageUrl: 'https://bijnis.s3.amazonaws.com/PRODUCTION/uploads/uploadfile_1-6a6b6956-687f-4b42-a481-853c5cf6cb49.jpeg',
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
    productType: 'Russian Fleet Sweatshirt',
    title: 'PU-ROADIES 6740',
    location: 'Made in Jaipur',
    moq: 'MOQ : 6 Pieces',
    deliveryTime: 'Delivery in 24 hours',
    margin: '48% Margin',
    price: '599',
    mrp: '1199',
    imageUrl: 'https://bijnis.s3.ap-south-1.amazonaws.com/prod/product_images/1651211296/05-12-2025/1764920024494_772_2_1.jpg',
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
    productType: 'Rubberized PVC Sports',
    title: 'DRIVE 2425',
    location: 'Made in Delhi NCR',
    moq: 'MOQ : 3 Units',
    stockWarning: 'Only 4 Left',
    deliveryTime: 'Delivery in 6 hours',
    margin: '42% Margin',
    price: '2999',
    mrp: '5999',
    imageUrl: 'https://bijnis.s3.amazonaws.com/PRODUCTION/uploads/uploadfile_1-242d7f61-8a11-4f99-ad43-81b942409588.jpeg',
    isFavorite: false,
  },
  {
    id: 'grid-prod-11',
    category: 'Home',
    categoryColorScheme: 'success',
    productType: 'Natural Ingredients',
    title: 'Ortho+Rest 033',
    location: 'Made in Agra',
    moq: 'MOQ : 4 Sets',
    deliveryTime: 'Delivery in 4 hours',
    margin: '58% Margin',
    price: '899',
    mrp: '1799',
    imageUrl: 'https://bijnis.s3.amazonaws.com/PRODUCTION/uploads/uploadfile_1-7a0db57e-a331-4e77-b6f8-8d21b2fdd02b.jpeg',
    isFavorite: false,
  },
  {
    id: 'grid-prod-12',
    category: 'Women',
    categoryColorScheme: 'error',
    productType: 'Premium Cotton',
    title: 'AXON 432',
    location: 'Made in Delhi NCR',
    moq: 'MOQ : 8 Pieces',
    stockWarning: 'Only 2 Left',
    deliveryTime: 'Delivery in 1 day',
    margin: '52% Margin',
    price: '899',
    mrp: '1799',
    imageUrl: 'https://bijnis.s3.ap-south-1.amazonaws.com/prod/product_images/1640327219/05-12-2025/1764920387573_607_1_1.jpg',
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
