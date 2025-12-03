/**
 * Mock API for Home Header
 *
 * This mock API returns configuration data for the HomeHeader component
 * including delivery info, backgrounds, tabs, and promotional banners.
 */

import { HomeHeaderApiResponse } from '../types/homeHeader';

/**
 * Simulates API delay
 */
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Mock Home Header Data
 */
const mockHomeHeaderData: HomeHeaderApiResponse = {
  delivery: {
    label: 'Delivery In',
    value: '22 Minutes',
    location: {
      addressLine: 'Home - Sector 12',
      city: 'Agra',
      pincode: '226010',
      formatted: 'Agra - 226010',
    },
    estimatedRange: {
      min: 15,
      max: 20,
      unit: 'minutes',
    },
  },

  background: {
    type: 'gradient',
    config: {
      colors: ['#058234', '#03A64A', '#00C853'],
      start: { x: 0, y: 0 },
      end: { x: 0, y: 1 },
      type: 'linear',
    },
  },

  sectionBackgrounds: {
    toolbar: null,
    searchBar: null,
    tabNavigation: null,
  },

  search: {
    placeholders: [
      'Search "ice-cream"',
      'Search "vegetables"',
      'Search "snacks"',
      'Search "dairy products"',
      'Search "fresh fruits"',
    ],
    voiceEnabled: true,
  },

  user: {
    name: 'Sujal Dave',
    initials: 'SU',
    avatarUrl: null,
    notificationCount: 0,
  },

  tabs: {
    background: null,
    selectedTabId: 'footwear',
    items: [
      {
        id: 'footwear',
        label: 'Footwear',
        icon: {
          default: 'https://github.com/sidextron92/random_assets/blob/main/footwear_unpressed.png?raw=true',
          pressed: 'https://github.com/sidextron92/random_assets/blob/main/footwear_pressed.png?raw=true',
        },
        badge: null,
        enabled: true,
        visible: true,
        analytics: {
          category: 'navigation',
          action: 'tab_click_footwear',
        },
      },
      {
        id: 'apparel',
        label: 'Apparel',
        icon: {
          default: 'https://github.com/sidextron92/random_assets/blob/main/apparels_unpressed.png?raw=true',
          pressed: 'https://github.com/sidextron92/random_assets/blob/main/apparels_pressed.png?raw=true',
        },
        badge: null,
        enabled: true,
        visible: true,
        analytics: {
          category: 'navigation',
          action: 'tab_click_snacks',
        },
      },
      {
        id: 'accessories',
        label: 'ACCESSORIES',
        icon: {
          default: 'https://github.com/sidextron92/random_assets/blob/main/accessory_unpressed.png?raw=true',
          pressed: 'https://github.com/sidextron92/random_assets/blob/main/accessory_pressed.png?raw=true',
        },
        badge: null,
        enabled: true,
        visible: true,
        analytics: {
          category: 'navigation',
          action: 'tab_click_household',
        },
      },
      {
        id: 'beauty',
        label: 'Beauty & Personal Care',
        icon: {
          default: 'https://cdn.example.com/icons/beauty-inactive.png',
          pressed: 'https://cdn.example.com/icons/beauty-active.png',
        },
        badge: {
          count: 3,
          color: '#FF0000',
        },
        enabled: true,
        visible: true,
        analytics: {
          category: 'navigation',
          action: 'tab_click_beauty',
        },
      },
      {
        id: 'electronics',
        label: 'Electronics',
        icon: {
          default: 'https://cdn.example.com/icons/electronics-inactive.png',
          pressed: 'https://cdn.example.com/icons/electronics-active.png',
        },
        badge: null,
        enabled: true,
        visible: true,
        analytics: {
          category: 'navigation',
          action: 'tab_click_electronics',
        },
      },
    ],
  },

  banners: [
    /**
     * Banner Background Options:
     *
     * 1. Transparent (shows main gradient):
     *    color: 'transparent'
     *
     * 2. Semi-transparent overlay:
     *    color: 'rgba(0, 0, 0, 0.2)'  // 20% dark overlay
     *
     * 3. Glassmorphism:
     *    color: 'rgba(255, 255, 255, 0.15)'  // Frosted glass
     *
     * 4. Solid color:
     *    color: '#EC0505'  // Red background
     */
    {
      id: 'housefull-deals',
      priority: 1,
      background: {
        type: 'solid',
        config: {
          color: 'transparent',  // Transparent - shows main gradient
        },
      },
      content: {
        title: 'Housefull Deals',
        subtitle: '20th Nov, 2024 - 7th Dec, 2024',
        imageUrl: 'https://via.placeholder.com/120x60/058234/FFFFFF?text=Deals',
      },
      cta: {
        text: 'Shop Now',
        style: 'primary',
      },
      target: {
        type: 'screen',
        config: {
          screen: 'CategoryScreen',
          params: {
            category: 'special-offers',
            campaign: 'housefull-deals',
          },
        },
      },
      analytics: {
        impressionTrackingId: 'banner_housefull_impression',
        clickTrackingId: 'banner_housefull_click',
      },
    },
    {
      id: 'winter-collection',
      priority: 2,
      background: {
        type: 'gradient',
        config: {
          colors: ['#1E3A8A', '#3B82F6'],
          start: { x: 0, y: 0 },
          end: { x: 1, y: 1 },
          type: 'linear',
        },
      },
      content: {
        title: 'Winter Collection',
        subtitle: 'Stay warm this season',
        imageUrl: 'https://via.placeholder.com/120x60/1E3A8A/FFFFFF?text=Winter',
      },
      cta: {
        text: 'Explore',
        style: 'secondary',
      },
      target: {
        type: 'screen',
        config: {
          screen: 'CategoryScreen',
          params: {
            category: 'winter-wear',
            season: 'winter-2024',
          },
        },
      },
      analytics: {
        impressionTrackingId: 'banner_winter_impression',
        clickTrackingId: 'banner_winter_click',
      },
    },
    {
      id: 'fresh-arrivals',
      priority: 3,
      background: {
        type: 'image',
        config: {
          url: 'https://via.placeholder.com/600x200/4CAF50/FFFFFF?text=Fresh+Arrivals',
          resizeMode: 'cover',
          opacity: 0.9,
        },
      },
      content: {
        title: 'Fresh Arrivals',
        subtitle: 'New products every day',
        imageUrl: null,
      },
      cta: {
        text: 'View All',
        style: 'ghost',
      },
      target: {
        type: 'screen',
        config: {
          screen: 'CategoryScreen',
          params: {
            category: 'new-arrivals',
            sortBy: 'newest',
          },
        },
      },
      analytics: {
        impressionTrackingId: 'banner_fresh_impression',
        clickTrackingId: 'banner_fresh_click',
      },
    },
  ],

  metadata: {
    lastUpdated: new Date().toISOString(),
    version: '1.0.0',
    trackingId: `home_header_${Date.now()}`,
  },
};

/**
 * Fetches home header configuration
 *
 * @param params - Optional parameters for personalization
 * @returns Promise with home header data
 */
export async function fetchHomeHeader(params?: {
  userId?: string;
  location?: { lat: number; lng: number };
}): Promise<HomeHeaderApiResponse> {
  // Simulate network delay
  await delay(500);

  // In a real implementation, this would:
  // 1. Fetch data from the backend API
  // 2. Apply personalization based on user preferences
  // 3. Filter banners based on scheduling/targeting
  // 4. Apply A/B testing variants

  // For now, return mock data
  return mockHomeHeaderData;
}

/**
 * Alternative mock data scenarios for testing
 */
export const mockScenarios = {
  /**
   * Solid color background scenario
   */
  solidBackground: {
    ...mockHomeHeaderData,
    background: {
      type: 'solid' as const,
      config: {
        color: '#058234',
      },
    },
  },

  /**
   * Image background scenario
   */
  imageBackground: {
    ...mockHomeHeaderData,
    background: {
      type: 'image' as const,
      config: {
        url: 'https://via.placeholder.com/800x400/058234/FFFFFF?text=Background',
        resizeMode: 'cover' as const,
        opacity: 0.95,
      },
    },
  },

  /**
   * Long delivery time scenario
   */
  longDelivery: {
    ...mockHomeHeaderData,
    delivery: {
      ...mockHomeHeaderData.delivery,
      label: 'Delivery By',
      value: 'Tomorrow 11 PM',
      estimatedRange: {
        min: 18,
        max: 24,
        unit: 'hours' as const,
      },
    },
  },

  /**
   * No promotional banners
   */
  noBanners: {
    ...mockHomeHeaderData,
    banners: [],
  },

  /**
   * User with avatar
   */
  userWithAvatar: {
    ...mockHomeHeaderData,
    user: {
      ...mockHomeHeaderData.user,
      avatarUrl: 'https://i.pravatar.cc/150?img=12',
      notificationCount: 5,
    },
  },

  /**
   * Section-specific backgrounds
   */
  sectionBackgrounds: {
    ...mockHomeHeaderData,
    sectionBackgrounds: {
      toolbar: {
        type: 'solid' as const,
        config: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      searchBar: null,
      tabNavigation: {
        type: 'solid' as const,
        config: {
          color: 'rgba(255, 255, 255, 0.05)',
        },
      },
    },
  },
};

/**
 * Get specific mock scenario
 */
export function fetchHomeHeaderScenario(
  scenario: keyof typeof mockScenarios
): Promise<HomeHeaderApiResponse> {
  return delay(500).then(() => mockScenarios[scenario]);
}
