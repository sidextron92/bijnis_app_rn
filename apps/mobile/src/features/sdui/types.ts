export type WidgetType =
  | 'banner_carousel'
  | 'category_grid'
  | 'product_rail'
  | 'product_grid'
  | 'offer_banner'
  | 'countdown_timer'
  | 'brand_strip'
  | 'spacer'
  | 'divider';

export interface SDUIWidget {
  type: WidgetType;
  data: Record<string, any>;
  height?: number;
  style?: Record<string, any>;
}

export interface BannerData {
  id: string;
  image: string;
  title?: string;
  deepLink?: string;
}

export interface CategoryData {
  id: string;
  name: string;
  image: string;
  slug: string;
}

export interface ProductRailData {
  title: string;
  products: Array<{
    id: string;
    name: string;
    image: string;
    price: number;
    mrp: number;
    unit: string;
    // Full product details
    category?: string;
    categoryColorScheme?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
    productType?: string;
    location?: string;
    moq?: string;
    stockWarning?: string;
    deliveryTime?: string;
    margin?: string;
    variants?: Array<{ id: string; color: string }>;
  }>;
  seeAllLink?: string;
}

// Widget Props
export interface BannerCarouselProps {
  banners: BannerData[];
}

export interface CategoryGridProps {
  categories: CategoryData[];
  columns?: number;
}

export interface ProductRailProps {
  title: string;
  products: ProductRailData['products'];
  seeAllLink?: string;
}
