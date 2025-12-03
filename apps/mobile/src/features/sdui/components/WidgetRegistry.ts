import type { ComponentType } from 'react';
import type { WidgetType } from '../types';
import { BannerCarousel } from './widgets/BannerCarousel';
import { CategoryGrid } from './widgets/CategoryGrid';
import { ProductRail } from './widgets/ProductRail';
import { Spacer } from './widgets/Spacer';
import { Divider } from './widgets/Divider';

export const WidgetRegistry: Record<WidgetType, ComponentType<any>> = {
  banner_carousel: BannerCarousel,
  category_grid: CategoryGrid,
  product_rail: ProductRail,
  product_grid: ProductRail, // Can be same or different implementation
  offer_banner: BannerCarousel, // Can reuse or create separate
  countdown_timer: Spacer, // Placeholder - implement later
  brand_strip: CategoryGrid, // Can reuse or create separate
  spacer: Spacer,
  divider: Divider,
};
