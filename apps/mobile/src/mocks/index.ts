export { mockApi, authApi, productsApi, categoriesApi, cartApi, ordersApi, addressApi, homeApi } from './api';
export { mockCategories } from './data/categories';
export { mockProducts } from './data/products';
export { mockUser, mockAddresses, validTestPhones, TEST_OTP } from './data/users';
export { mockOrders } from './data/orders';
export { mockHomeLayout } from './data/homeLayout';

// Home Header API
export {
  fetchHomeHeader,
  fetchHomeHeaderScenario,
  mockScenarios,
} from './api/homeHeader';

export type {
  HomeHeaderApiResponse,
  BackgroundConfig,
  BackgroundType,
  DeliveryInfo,
  LocationInfo,
  SearchConfig,
  UserInfo,
  TabsConfig,
  TabItem,
  TabIcon,
  TabBadge,
  PromotionalBanner,
  BannerContent,
  BannerCTA,
  NavigationTarget,
  AnalyticsData,
  SolidConfig,
  GradientConfig,
  ImageConfig,
  AnimationConfig,
} from './types/homeHeader';

export {
  isSolidBackground,
  isGradientBackground,
  isImageBackground,
  isAnimationBackground,
  isVideoBackground,
  isScreenNavigation,
  isWebviewNavigation,
  isDeeplinkNavigation,
  isModalNavigation,
} from './types/homeHeader';

export { useHomeHeaderData, useHomeHeaderDataSync } from './hooks/useHomeHeaderData';

export {
  transformHomeHeaderData,
  getSortedBanners,
  getActiveBanner,
  isFastDelivery,
  getFormattedDeliveryTime,
  getVisibleTabsCount,
  getNotificationCount,
  hasUserAvatar,
} from './utils/homeHeaderTransform';
