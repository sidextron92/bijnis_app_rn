/**
 * Server-Driven UI types
 */

export type WidgetType =
  | 'banner_carousel'
  | 'category_grid'
  | 'product_rail'
  | 'product_grid'
  | 'offer_banner'
  | 'countdown_timer'
  | 'brand_strip'
  | 'spacer'
  | 'divider'
  | 'custom';

export interface SDUIWidget {
  type: WidgetType;
  data: Record<string, any>;
  height?: number;
  style?: Record<string, any>;
  id?: string;
  priority?: number;
}

export interface SDUIPageLayout {
  pageType: string;
  version: number;
  widgets: SDUIWidget[];
  metadata?: {
    title?: string;
    refreshInterval?: number;
  };
}

// Widget Data Types

export interface BannerData {
  id: string;
  image: string;
  title?: string;
  subtitle?: string;
  deepLink?: string;
  backgroundColor?: string;
}

export interface CategoryGridData {
  categories: Array<{
    id: string;
    name: string;
    image: string;
    slug: string;
  }>;
  columns?: number;
}

export interface ProductRailData {
  title: string;
  subtitle?: string;
  products: Array<{
    id: string;
    name: string;
    image: string;
    price: number;
    mrp: number;
    unit: string;
    discount?: number;
  }>;
  seeAllLink?: string;
}

export interface CountdownTimerData {
  title: string;
  endTime: string; // ISO date string
  backgroundColor?: string;
  deepLink?: string;
}

export interface OfferBannerData {
  image: string;
  title: string;
  description?: string;
  couponCode?: string;
  deepLink?: string;
  expiresAt?: string;
}

export interface SpacerData {
  height: number;
  backgroundColor?: string;
}

export interface DividerData {
  height?: number;
  color?: string;
  margin?: number;
}

// SDUI API Response
export interface SDUIResponse {
  layout: SDUIPageLayout;
  lastUpdated: string;
  cacheControl?: {
    maxAge: number;
    staleWhileRevalidate?: number;
  };
}
