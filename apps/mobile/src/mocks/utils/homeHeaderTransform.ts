/**
 * Utility functions to transform API data to HomeHeader component props
 */

import { HomeHeaderProps } from '@/features/home/components/HomeHeader';
import {
  HomeHeaderApiResponse,
  BackgroundConfig,
  isGradientBackground,
  isImageBackground,
  GradientConfig,
} from '../types/homeHeader';

/**
 * Transform API response to HomeHeader component props
 *
 * @param apiData - API response data
 * @param callbacks - Optional callback handlers
 * @returns Props object for HomeHeader component
 */
export function transformHomeHeaderData(
  apiData: HomeHeaderApiResponse,
  callbacks?: {
    onLocationPress?: () => void;
    onAvatarPress?: () => void;
    onTabSelect?: (tabId: string) => void;
    onBannerClick?: (bannerId: string, target: any) => void;
  }
): HomeHeaderProps {
  return {
    // Delivery information
    deliveryTime: apiData.delivery.value,
    location: apiData.delivery.location.formatted,

    // Main background
    ...transformBackground(apiData.background),

    // Section backgrounds
    ...(apiData.sectionBackgrounds && {
      toolbarBackgroundColor: apiData.sectionBackgrounds.toolbar
        ? extractBackgroundColor(apiData.sectionBackgrounds.toolbar)
        : 'transparent',
      searchBarBackgroundColor: apiData.sectionBackgrounds.searchBar
        ? extractBackgroundColor(apiData.sectionBackgrounds.searchBar)
        : 'transparent',
      tabNavigationBackgroundColor: apiData.sectionBackgrounds.tabNavigation
        ? extractBackgroundColor(apiData.sectionBackgrounds.tabNavigation)
        : 'transparent',
    }),

    // User information
    userInitials: apiData.user.initials,
    userAvatarUri: apiData.user.avatarUrl || undefined,

    // Search placeholders
    searchPlaceholders: apiData.search.placeholders,

    // Category tabs
    categoryTabs: apiData.tabs.items
      .filter(item => item.visible && item.enabled)
      .map(item => ({
        id: item.id,
        label: item.label,
        iconUrls: {
          default: item.icon.default,
          pressed: item.icon.pressed,
        },
      })),
    initialSelectedTab: apiData.tabs.selectedTabId,

    // Promotional banner (use first banner for now, carousel support later)
    promotionalBanner: apiData.banners.length > 0
      ? {
          ...transformBackground(apiData.banners[0].background),
          title: apiData.banners[0].content.title,
          subtitle: apiData.banners[0].content.subtitle,
          imageUri: apiData.banners[0].content.imageUrl || undefined,
        }
      : undefined,

    // Callbacks
    onLocationPress: callbacks?.onLocationPress,
    onAvatarPress: callbacks?.onAvatarPress,
    onTabSelect: callbacks?.onTabSelect,
  };
}

/**
 * Transform background configuration to component props
 */
function transformBackground(
  background: BackgroundConfig
): Pick<
  HomeHeaderProps,
  'backgroundColor' | 'backgroundGradient' | 'gradientLocations' | 'backgroundImageUri'
> {
  if (isGradientBackground(background)) {
    return {
      backgroundGradient: background.config.colors,
      gradientLocations: {
        start: background.config.start,
        end: background.config.end,
      },
    };
  }

  if (isImageBackground(background)) {
    return {
      backgroundImageUri: background.config.url,
    };
  }

  // Solid color or default
  return {
    backgroundColor: background.type === 'solid' ? background.config.color : '#058234',
  };
}

/**
 * Extract background color from BackgroundConfig
 * Used for section overlays
 */
function extractBackgroundColor(background: BackgroundConfig): string {
  if (background.type === 'solid') {
    return background.config.color;
  }

  if (isGradientBackground(background)) {
    // For gradients used as overlays, return the first color
    return background.config.colors[0] || 'transparent';
  }

  return 'transparent';
}

/**
 * Get all available banners sorted by priority
 */
export function getSortedBanners(apiData: HomeHeaderApiResponse) {
  return [...apiData.banners].sort((a, b) => a.priority - b.priority);
}

/**
 * Get active banner (currently showing)
 * For carousel implementation
 */
export function getActiveBanner(
  apiData: HomeHeaderApiResponse,
  currentIndex: number = 0
) {
  const sortedBanners = getSortedBanners(apiData);
  return sortedBanners[currentIndex] || sortedBanners[0];
}

/**
 * Check if delivery is fast (< 30 minutes)
 */
export function isFastDelivery(apiData: HomeHeaderApiResponse): boolean {
  const range = apiData.delivery.estimatedRange;
  if (!range) return false;

  if (range.unit === 'minutes') {
    return range.max <= 30;
  }

  return false;
}

/**
 * Get formatted delivery time with label
 */
export function getFormattedDeliveryTime(apiData: HomeHeaderApiResponse): string {
  return `${apiData.delivery.label}: ${apiData.delivery.value}`;
}

/**
 * Get tabs count excluding hidden/disabled
 */
export function getVisibleTabsCount(apiData: HomeHeaderApiResponse): number {
  return apiData.tabs.items.filter(item => item.visible && item.enabled).length;
}

/**
 * Get notification count from user data
 */
export function getNotificationCount(apiData: HomeHeaderApiResponse): number {
  return apiData.user.notificationCount || 0;
}

/**
 * Check if user has avatar image
 */
export function hasUserAvatar(apiData: HomeHeaderApiResponse): boolean {
  return !!apiData.user.avatarUrl;
}
