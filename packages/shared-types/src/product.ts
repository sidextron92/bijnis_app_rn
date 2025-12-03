/**
 * Product entity types
 */

export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  mrp: number;
  sellingPrice: number;
  unit: string; // "1 kg", "500 ml", "6 pcs", etc.
  images: string[];
  stockQuantity: number;
  isAvailable: boolean;
  categoryId: string;
  brandId?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductDetail extends Product {
  category: CategoryBase;
  brand?: Brand;
  relatedProducts?: Product[];
  nutritionInfo?: NutritionInfo;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo?: string;
}

export interface NutritionInfo {
  servingSize: string;
  calories?: number;
  protein?: string;
  carbohydrates?: string;
  fat?: string;
  fiber?: string;
  sodium?: string;
}

export interface ProductListResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface ProductFilters {
  categoryId?: string;
  brandId?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sortBy?: 'popularity' | 'price_low' | 'price_high' | 'newest';
  inStock?: boolean;
}

export interface CategoryBase {
  id: string;
  name: string;
  slug: string;
  image?: string;
}
