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

  search: {
    placeholders: [
      'ice-cream',
      'vegetables',
      'snacks',
      'dairy products',
      'fresh fruits',
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
        banner: {
          type: 'image',
          url: 'https://github.com/sidextron92/random_assets/blob/main/bijnis_mascot.png?raw=true',
          aspectRatio: 16 / 9,
          target: {
            type: 'screen',
            config: {
              screen: 'CategoryScreen',
              params: {
                category: 'footwear',
                campaign: 'summer-collection',
              },
            },
          },
          analytics: {
            impressionTrackingId: 'banner_footwear_impression',
            clickTrackingId: 'banner_footwear_click',
          },
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
          action: 'tab_click_apparel',
        },
        background: {
          type: 'gradient',
          config: {
            colors: ['#D32F2F', '#F44336', '#E91E63'],
            start: { x: 0, y: 0 },
            end: { x: 1, y: 1 },
            type: 'linear',
          },
        },
        sectionBackgrounds: {
          toolbar: null,
          searchBar: null,
          tabNavigation: null,
        },
        banner: {
          type: 'image',
          url: 'https://via.placeholder.com/800x450/D32F2F/FFFFFF?text=Apparel+Sale',
          aspectRatio: 16 / 9,
          target: {
            type: 'screen',
            config: {
              screen: 'CategoryScreen',
              params: {
                category: 'apparel',
                campaign: 'fashion-week',
              },
            },
          },
          analytics: {
            impressionTrackingId: 'banner_apparel_impression',
            clickTrackingId: 'banner_apparel_click',
          },
        },
      },
      {
        id: 'accessories',
        label: 'Accessories',
        icon: {
          default: 'https://github.com/sidextron92/random_assets/blob/main/accessory_unpressed.png?raw=true',
          pressed: 'https://github.com/sidextron92/random_assets/blob/main/accessory_pressed.png?raw=true',
        },
        badge: null,
        enabled: true,
        visible: true,
        analytics: {
          category: 'navigation',
          action: 'tab_click_accessories',
        },
        background: {
          type: 'gradient',
          config: {
            colors: ['#F57C00', '#FF9800', '#FFB74D'],
            start: { x: 0, y: 0 },
            end: { x: 1, y: 0 },
            type: 'linear',
          },
        },
        sectionBackgrounds: {
          toolbar: null,
          searchBar: null,
          tabNavigation: null,
        },
        banner: {
          type: 'image',
          url: 'https://via.placeholder.com/800x450/F57C00/FFFFFF?text=Accessories+Collection',
          aspectRatio: 16 / 9,
          target: {
            type: 'screen',
            config: {
              screen: 'CategoryScreen',
              params: {
                category: 'accessories',
                campaign: 'trending-accessories',
              },
            },
          },
          analytics: {
            impressionTrackingId: 'banner_accessories_impression',
            clickTrackingId: 'banner_accessories_click',
          },
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
        background: {
          type: 'gradient',
          config: {
            colors: ['#8E24AA', '#AB47BC', '#CE93D8'],
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
        banner: {
          type: 'image',
          url: 'https://via.placeholder.com/800x450/8E24AA/FFFFFF?text=Beauty+Products',
          aspectRatio: 16 / 9,
          target: {
            type: 'screen',
            config: {
              screen: 'CategoryScreen',
              params: {
                category: 'beauty',
                campaign: 'skincare-essentials',
              },
            },
          },
          analytics: {
            impressionTrackingId: 'banner_beauty_impression',
            clickTrackingId: 'banner_beauty_click',
          },
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
        background: {
          type: 'gradient',
          config: {
            colors: ['#1565C0', '#1E88E5', '#42A5F5'],
            start: { x: 0, y: 0 },
            end: { x: 1, y: 1 },
            type: 'linear',
          },
        },
        sectionBackgrounds: {
          toolbar: null,
          searchBar: null,
          tabNavigation: null,
        },
        banner: {
          type: 'image',
          url: 'https://via.placeholder.com/800x450/1565C0/FFFFFF?text=Electronics+Deals',
          aspectRatio: 16 / 9,
          target: {
            type: 'screen',
            config: {
              screen: 'CategoryScreen',
              params: {
                category: 'electronics',
                campaign: 'tech-sale',
              },
            },
          },
          analytics: {
            impressionTrackingId: 'banner_electronics_impression',
            clickTrackingId: 'banner_electronics_click',
          },
        },
      },
    ],
  },

  metadata: {
    lastUpdated: new Date().toISOString(),
    version: '1.3.0',
    trackingId: `home_header_${Date.now()}`,
  },
};

/**
 * Fetches home header configuration
 *
 * @param params - Optional parameters for personalization
 * @returns Promise with home header data
 */
export async function fetchHomeHeader(_params?: {
  userId?: string;
  location?: { lat: number; lng: number };
}): Promise<HomeHeaderApiResponse> {
  // Simulate network delay
  await delay(500);

  // In a real implementation, this would:
  // 1. Fetch data from the backend API
  // 2. Apply personalization based on user preferences
  // 3. Apply A/B testing variants
  // 4. Dynamically serve appropriate banner content

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
   * No promotional banner
   */
  noBanner: {
    ...mockHomeHeaderData,
    banner: undefined,
  },

  /**
   * Rive animation banner example
   */
  riveBanner: {
    ...mockHomeHeaderData,
    banner: {
      type: 'rive' as const,
      url: 'https://example.com/banner-animation.riv',
      aspectRatio: 2.5,
      target: {
        type: 'screen' as const,
        config: {
          screen: 'CategoryScreen',
          params: { category: 'offers' },
        },
      },
    },
  },

  /**
   * Lottie animation banner example
   */
  lottieBanner: {
    ...mockHomeHeaderData,
    banner: {
      type: 'lottie' as const,
      url: 'https://example.com/banner-animation.json',
      aspectRatio: 16 / 9,
    },
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
