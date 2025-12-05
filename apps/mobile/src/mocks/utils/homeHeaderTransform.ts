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
 * @param selectedTabId - Currently selected tab ID (for dynamic background updates)
 * @returns Props object for HomeHeader component
 */
export function transformHomeHeaderData(
  apiData: HomeHeaderApiResponse,
  callbacks?: {
    onLocationPress?: () => void;
    onAvatarPress?: () => void;
    onTabSelect?: (tabId: string) => void;
    onBannerClick?: (bannerId: string, target: any) => void;
  },
  selectedTabId?: string
): HomeHeaderProps {
  // Get the selected tab or first visible tab
  const tabId = selectedTabId || apiData.tabs.selectedTabId || apiData.tabs.items.find(item => item.visible && item.enabled)?.id;
  const selectedTab = apiData.tabs.items.find(item => item.id === tabId);

  // Use selected tab's background, or fallback to deprecated root-level background
  const backgroundToUse = selectedTab?.background || apiData.background;
  const sectionBackgroundsToUse = selectedTab?.sectionBackgrounds || apiData.sectionBackgrounds;
  const bannerToUse = selectedTab?.banner || apiData.banner;

  return {
    // Delivery information
    deliveryTime: apiData.delivery.value,
    location: apiData.delivery.location.formatted,

    // Main background from selected tab
    ...(backgroundToUse ? transformBackground(backgroundToUse) : { backgroundColor: '#058234' }),

    // Section backgrounds from selected tab
    ...(sectionBackgroundsToUse && {
      toolbarBackgroundColor: sectionBackgroundsToUse.toolbar
        ? extractBackgroundColor(sectionBackgroundsToUse.toolbar)
        : 'transparent',
      searchBarBackgroundColor: sectionBackgroundsToUse.searchBar
        ? extractBackgroundColor(sectionBackgroundsToUse.searchBar)
        : 'transparent',
      tabNavigationBackgroundColor: sectionBackgroundsToUse.tabNavigation
        ? extractBackgroundColor(sectionBackgroundsToUse.tabNavigation)
        : 'transparent',
    }),

    // User information
    userInitials: apiData.user.initials,
    userAvatarUri: apiData.user.avatarUrl || undefined,

    // Search placeholders (global)
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

    // Promotional banner from selected tab (single simplified format)
    promotionalBanner: bannerToUse
      ? {
          imageUri: bannerToUse.type === 'image' ? bannerToUse.url : undefined,
          animationUri: bannerToUse.type !== 'image' ? bannerToUse.url : undefined,
          animationType: bannerToUse.type !== 'image' ? bannerToUse.type : undefined,
          aspectRatio: bannerToUse.aspectRatio,
          onPress: bannerToUse.target
            ? () => callbacks?.onBannerClick?.(bannerToUse!.url, bannerToUse!.target)
            : undefined,
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

/**
 * Get background configuration for a specific tab
 */
export function getTabBackground(apiData: HomeHeaderApiResponse, tabId: string) {
  const tab = apiData.tabs.items.find(item => item.id === tabId);
  return tab?.background;
}

/**
 * Get banner configuration for a specific tab
 */
export function getTabBanner(apiData: HomeHeaderApiResponse, tabId: string) {
  const tab = apiData.tabs.items.find(item => item.id === tabId);
  return tab?.banner;
}

/**
 * Get section backgrounds for a specific tab
 */
export function getTabSectionBackgrounds(apiData: HomeHeaderApiResponse, tabId: string) {
  const tab = apiData.tabs.items.find(item => item.id === tabId);
  return tab?.sectionBackgrounds;
}
