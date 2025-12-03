# HomeHeader Component & API Documentation

## Table of Contents

- [Overview](#overview)
- [Component Usage](#component-usage)
  - [Props Interface](#props-interface)
  - [Usage Examples](#usage-examples)
- [Mock API](#mock-api)
  - [API Structure](#api-structure)
  - [TypeScript Types](#typescript-types)
  - [Mock Endpoints](#mock-endpoints)
  - [Integration Guide](#integration-guide)
- [Transparent Backgrounds](#transparent-backgrounds)
- [Mock Scenarios](#mock-scenarios)
- [Utility Functions](#utility-functions)
- [Best Practices](#best-practices)
- [Testing](#testing)
- [Quick Reference](#quick-reference)
- [Troubleshooting](#troubleshooting)

---

## Overview

The `HomeHeader` component is a highly flexible, API-driven header component for the mobile app's home screen. It features a unified background container that supports gradients, images, and animations, with transparent overlay sections for maximum customization.

**Location**: `apps/mobile/src/features/home/components/HomeHeader.tsx`

### Features

#### 1. Unified Background Container
- Single container wrapping all header sections
- Supports solid colors, gradients, images, and custom components
- Enables seamless visual flow from toolbar to promotional banner

#### 2. Animated Tab Navigation
- **Smooth sliding indicator** with spring animation
- Indicator slides and resizes dynamically when switching tabs
- 60fps performance using React Native's Animated API
- Spring physics with configurable friction and tension
- Automatic layout measurement for different tab widths

#### 3. Component Structure

```
HomeHeader
├── Toolbar Section
│   ├── Delivery time display
│   ├── Location with dropdown
│   └── User avatar
├── Search Bar
│   ├── Search icon
│   ├── Animated placeholders (ViewFlipper)
│   └── Voice search icon
├── Category Tab Navigation
│   ├── Horizontal scrollable tabs with icons
│   ├── Animated sliding indicator (spring animation)
│   └── Separator line
└── Promotional Banner (optional)
    ├── Title and subtitle
    ├── Banner image
    └── CTA button
```

#### 4. Section Backgrounds
Each section has an independent, optional background color that overlays the main container background:
- Toolbar background
- Search bar background
- Tab navigation background
- Promotional banner background

All sections default to `transparent`, allowing the main background to show through.

---

## Component Usage

### Props Interface

#### Main Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `deliveryTime` | `string` | **Required** | Delivery time text (e.g., "22 minutes") |
| `location` | `string` | **Required** | Location text (e.g., "Agra - 226010") |

#### Background Configuration

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `backgroundColor` | `string` | `'#058234'` | Main container solid background color |
| `backgroundGradient` | `string[]` | `undefined` | Array of gradient colors (minimum 2 colors) |
| `gradientLocations` | `{ start: {x, y}, end: {x, y} }` | `{ start: {x:0, y:0}, end: {x:0, y:1} }` | Gradient direction coordinates (0-1) |
| `backgroundImageUri` | `string` | `undefined` | URI for background image |
| `backgroundComponent` | `React.ReactNode` | `undefined` | Custom background component (animations, etc.) |

#### Section Background Overrides

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `toolbarBackgroundColor` | `string` | `'transparent'` | Toolbar section background overlay |
| `searchBarBackgroundColor` | `string` | `'transparent'` | Search bar section background overlay |
| `tabNavigationBackgroundColor` | `string` | `'transparent'` | Tab navigation section background overlay |

#### User & Content

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `userInitials` | `string` | `undefined` | User initials for avatar (e.g., "SU") |
| `userAvatarUri` | `string` | `undefined` | User avatar image URI |
| `searchPlaceholders` | `string[]` | `['Search "ice-cream"', ...]` | Array of search placeholders to cycle through |

#### Category Tabs

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `categoryTabs` | `CategoryTab[]` | `undefined` | Array of category tab objects |
| `initialSelectedTab` | `string` | First tab ID | ID of initially selected tab |

**CategoryTab Interface:**
```typescript
interface CategoryTab {
  id: string;              // Unique tab identifier
  label: string;           // Display label
  icon?: React.ReactNode;  // Optional icon component
  iconUrls?: {             // Optional icon URLs from API
    default: string;       // Unpressed icon URL
    pressed: string;       // Pressed icon URL
  };
}
```

#### Promotional Banner

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `promotionalBanner` | `object` | `undefined` | Promotional banner configuration |

**Promotional Banner Interface:**
```typescript
interface PromotionalBanner {
  backgroundColor?: string;  // Overlay background (transparent by default)
  backgroundGradient?: string[];  // Gradient colors
  gradientLocations?: { start: {x, y}, end: {x, y} };
  backgroundImageUri?: string;  // Background image
  title?: string;           // Banner title
  subtitle?: string;        // Banner subtitle/date
  imageUri?: string;        // Banner image URI
}
```

#### Callbacks

| Prop | Type | Description |
|------|------|-------------|
| `onLocationPress` | `() => void` | Called when location is pressed |
| `onAvatarPress` | `() => void` | Called when avatar is pressed (defaults to navigate to account) |
| `onTabSelect` | `(tabId: string) => void` | Called when a tab is selected |

### Usage Examples

#### Basic Usage (Solid Color)

```tsx
import { HomeHeader } from '@/features/home';

<HomeHeader
  deliveryTime="22 minutes"
  location="Agra - 226010"
  backgroundColor="#058234"
  userInitials="SU"
  categoryTabs={[
    { id: 'footwear', label: 'Footwear' },
    { id: 'apparel', label: 'Apparel' },
  ]}
/>
```

#### Linear Gradient Background

```tsx
<HomeHeader
  deliveryTime="22 minutes"
  location="Agra - 226010"
  backgroundGradient={['#058234', '#03A64A', '#00C853']}
  gradientLocations={{
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 }
  }}
  userInitials="SU"
/>
```

#### With Tabs and Icons

```tsx
<HomeHeader
  deliveryTime="22 minutes"
  location="Agra - 226010"
  backgroundGradient={['#058234', '#00C853']}
  categoryTabs={[
    {
      id: 'footwear',
      label: 'Footwear',
      iconUrls: {
        default: 'https://example.com/footwear-inactive.png',
        pressed: 'https://example.com/footwear-active.png',
      }
    },
    {
      id: 'apparel',
      label: 'Apparel',
      iconUrls: {
        default: 'https://example.com/apparel-inactive.png',
        pressed: 'https://example.com/apparel-active.png',
      }
    },
  ]}
  initialSelectedTab="footwear"
/>
```

#### With Transparent Banner

```tsx
<HomeHeader
  deliveryTime="22 minutes"
  location="Agra - 226010"
  backgroundGradient={['#058234', '#00C853']}
  promotionalBanner={{
    backgroundColor: 'transparent',  // Shows main gradient
    title: 'Housefull Deals',
    subtitle: '20th Nov, 2024 - 7th Dec, 2024',
    imageUri: 'https://example.com/banner.png'
  }}
/>
```

#### Full Example with Mock API

```tsx
import { useHomeHeaderData, transformHomeHeaderData } from '@/mocks';

function HomeScreen() {
  const { data, isLoading, error } = useHomeHeaderData();

  if (isLoading) return <ActivityIndicator />;
  if (error || !data) return <ErrorView />;

  const headerProps = transformHomeHeaderData(data, {
    onLocationPress: () => {
      console.log('Location pressed');
    },
    onTabSelect: (tabId) => {
      console.log('Tab selected:', tabId);
    },
  });

  return <HomeHeader {...headerProps} />;
}
```

---

## Mock API

### API Structure

#### Response Format

```typescript
interface HomeHeaderApiResponse {
  delivery: DeliveryInfo;
  background: BackgroundConfig;
  sectionBackgrounds?: SectionBackgrounds;
  search: SearchConfig;
  user: UserInfo;
  tabs: TabsConfig;
  banners: PromotionalBanner[];
  metadata?: ApiMetadata;
}
```

#### Complete Example Response

```json
{
  "delivery": {
    "label": "Delivery In",
    "value": "22 Minutes",
    "location": {
      "addressLine": "Home - Sector 12",
      "city": "Agra",
      "pincode": "226010",
      "formatted": "Agra - 226010"
    },
    "estimatedRange": {
      "min": 15,
      "max": 20,
      "unit": "minutes"
    }
  },
  "background": {
    "type": "gradient",
    "config": {
      "colors": ["#058234", "#03A64A", "#00C853"],
      "start": { "x": 0, "y": 0 },
      "end": { "x": 0, "y": 1 },
      "type": "linear"
    }
  },
  "sectionBackgrounds": {
    "toolbar": null,
    "searchBar": null,
    "tabNavigation": null
  },
  "search": {
    "placeholders": [
      "Search \"ice-cream\"",
      "Search \"vegetables\"",
      "Search \"snacks\""
    ],
    "voiceEnabled": true
  },
  "user": {
    "name": "Sujal Dave",
    "initials": "SU",
    "avatarUrl": null,
    "notificationCount": 0
  },
  "tabs": {
    "background": null,
    "selectedTabId": "footwear",
    "items": [
      {
        "id": "footwear",
        "label": "Footwear",
        "icon": {
          "default": "https://example.com/icons/footwear-inactive.png",
          "pressed": "https://example.com/icons/footwear-active.png"
        },
        "badge": null,
        "enabled": true,
        "visible": true,
        "analytics": {
          "category": "navigation",
          "action": "tab_click_footwear"
        }
      }
    ]
  },
  "banners": [
    {
      "id": "housefull-deals",
      "priority": 1,
      "background": {
        "type": "solid",
        "config": {
          "color": "transparent"
        }
      },
      "content": {
        "title": "Housefull Deals",
        "subtitle": "20th Nov, 2024 - 7th Dec, 2024",
        "imageUrl": "https://example.com/banners/deals.png"
      },
      "cta": {
        "text": "Shop Now",
        "style": "primary"
      },
      "target": {
        "type": "screen",
        "config": {
          "screen": "CategoryScreen",
          "params": {
            "category": "special-offers"
          }
        }
      },
      "analytics": {
        "impressionTrackingId": "banner_housefull_impression",
        "clickTrackingId": "banner_housefull_click"
      }
    }
  ],
  "metadata": {
    "lastUpdated": "2024-12-03T15:30:00Z",
    "version": "1.0.0",
    "trackingId": "home_header_123456"
  }
}
```

### TypeScript Types

#### Core Types

```typescript
// Background Configuration
export type BackgroundType = 'solid' | 'gradient' | 'image' | 'animation' | 'video';

export interface BackgroundConfig {
  type: BackgroundType;
  config: SolidConfig | GradientConfig | ImageConfig | AnimationConfig | VideoConfig;
}

export interface SolidConfig {
  color: string;  // Hex color (use 'transparent' or rgba for transparency)
}

export interface GradientConfig {
  colors: string[];
  start: { x: number; y: number };  // 0-1 range
  end: { x: number; y: number };    // 0-1 range
  type?: 'linear' | 'radial';
}

export interface ImageConfig {
  url: string;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat';
  opacity?: number;  // 0-1
}

// Delivery Types
export interface DeliveryInfo {
  label: string;
  value: string;
  location: LocationInfo;
  estimatedRange?: EstimatedRange;
}

export interface LocationInfo {
  addressLine?: string;
  city: string;
  pincode: string;
  formatted: string;
}

export interface EstimatedRange {
  min: number;
  max: number;
  unit: 'minutes' | 'hours' | 'days';
}

// Tab Navigation Types
export interface TabsConfig {
  background?: BackgroundConfig | null;
  selectedTabId?: string;
  items: TabItem[];
}

export interface TabItem {
  id: string;
  label: string;
  icon: TabIcon;
  badge?: TabBadge | null;
  enabled: boolean;
  visible: boolean;
  analytics?: AnalyticsData;
}

export interface TabIcon {
  default: string;  // Unpressed icon URL
  pressed: string;  // Pressed icon URL
}

export interface TabBadge {
  count: number;
  color?: string;
}

// Promotional Banner Types
export interface PromotionalBanner {
  id: string;
  priority: number;
  background: BackgroundConfig;
  content: BannerContent;
  cta?: BannerCTA;
  target: NavigationTarget;
  analytics?: AnalyticsData;
}

export interface BannerContent {
  title?: string;
  subtitle?: string;
  imageUrl?: string | null;
}

export interface BannerCTA {
  text: string;
  style: 'primary' | 'secondary' | 'ghost';
}

// Navigation Target Types
export interface NavigationTarget {
  type: 'screen' | 'webview' | 'deeplink' | 'modal';
  config: ScreenConfig | WebviewConfig | DeeplinkConfig | ModalConfig;
}

export interface ScreenConfig {
  screen: string;
  params?: Record<string, any>;
}

// Section Backgrounds
export interface SectionBackgrounds {
  toolbar?: BackgroundConfig | null;
  searchBar?: BackgroundConfig | null;
  tabNavigation?: BackgroundConfig | null;
}
```

### Mock Endpoints

#### Primary Endpoint

```typescript
import { fetchHomeHeader } from '@/mocks';

async function fetchHomeHeader(params?: {
  userId?: string;
  location?: { lat: number; lng: number };
}): Promise<HomeHeaderApiResponse>
```

**Parameters:**
- `userId` (optional): User ID for personalization
- `location` (optional): User's location for delivery estimation

**Example:**
```typescript
const data = await fetchHomeHeader({
  userId: 'user123',
  location: { lat: 28.6139, lng: 77.2090 }
});
```

#### Using the Hook

```typescript
import { useHomeHeaderData } from '@/mocks';

function HomeScreen() {
  const { data, isLoading, error, refetch } = useHomeHeaderData({
    userId: 'user123',
    autoRefresh: true,
    refreshInterval: 60000, // Refresh every minute
  });

  if (isLoading) return <Skeleton />;
  if (error) return <ErrorView error={error} onRetry={refetch} />;
  if (!data) return null;

  const headerProps = transformHomeHeaderData(data);
  return <HomeHeader {...headerProps} />;
}
```

### Integration Guide

#### Step 1: Import Required Modules

```typescript
import {
  useHomeHeaderData,
  transformHomeHeaderData,
  type HomeHeaderApiResponse,
} from '@/mocks';
import { HomeHeader } from '@/features/home';
```

#### Step 2: Fetch Data

```typescript
const { data, isLoading, error, refetch } = useHomeHeaderData({
  userId: currentUser.id,
  location: userLocation,
});
```

#### Step 3: Transform and Render

```typescript
if (isLoading) return <LoadingSkeleton />;
if (error) return <ErrorView error={error} onRetry={refetch} />;
if (!data) return null;

const headerProps = transformHomeHeaderData(data, {
  onLocationPress: handleLocationPress,
  onAvatarPress: handleAvatarPress,
  onTabSelect: handleTabSelect,
});

return <HomeHeader {...headerProps} />;
```

#### Step 4: Handle Navigation

```typescript
const handleTabSelect = (tabId: string) => {
  // Update selected category
  setSelectedCategory(tabId);

  // Fetch products for category
  fetchProductsByCategory(tabId);

  // Track analytics
  analytics.track('tab_selected', { tabId });
};
```

---

## Transparent Backgrounds

### Making Backgrounds Transparent

To make any background transparent, use one of these approaches:

1. **Using 'transparent' keyword:**
   ```typescript
   background: {
     type: 'solid',
     config: {
       color: 'transparent'
     }
   }
   ```

2. **Using rgba with alpha channel:**
   ```typescript
   background: {
     type: 'solid',
     config: {
       color: 'rgba(0, 0, 0, 0)'  // Fully transparent
     }
   }
   ```

3. **Semi-transparent overlay:**
   ```typescript
   background: {
     type: 'solid',
     config: {
       color: 'rgba(0, 0, 0, 0.3)'  // 30% opacity black overlay
     }
   }
   ```

### Promotional Banner Examples

**1. Fully Transparent Banner (inherits main gradient):**
```typescript
{
  id: 'transparent-banner',
  priority: 1,
  background: {
    type: 'solid',
    config: {
      color: 'transparent'  // Banner will show main header gradient
    }
  },
  content: {
    title: 'Special Offer',
    subtitle: 'Limited time only',
  },
}
```

**2. Semi-Transparent Overlay:**
```typescript
{
  id: 'overlay-banner',
  priority: 1,
  background: {
    type: 'solid',
    config: {
      color: 'rgba(0, 0, 0, 0.2)'  // 20% dark overlay over gradient
    }
  },
  content: {
    title: 'New Arrivals',
  },
}
```

**3. Glassmorphism Effect:**
```typescript
{
  id: 'glass-banner',
  priority: 1,
  background: {
    type: 'solid',
    config: {
      color: 'rgba(255, 255, 255, 0.15)'  // Frosted glass effect
    }
  },
  content: {
    title: 'Premium Collection',
  },
}
```

### Section Background Examples

**Transparent toolbar (shows gradient):**
```typescript
sectionBackgrounds: {
  toolbar: null,  // or use transparent config
  searchBar: null,
  tabNavigation: null,
}
```

**Toolbar with subtle overlay:**
```typescript
sectionBackgrounds: {
  toolbar: {
    type: 'solid',
    config: {
      color: 'rgba(0, 0, 0, 0.1)'  // Subtle darkening
    }
  },
  searchBar: null,
  tabNavigation: null,
}
```

### Common Use Cases

- **Transparent promotional banner:** Lets the main header gradient show through
- **Section backgrounds:** Add subtle overlays while preserving main background
- **Glassmorphism effect:** Use semi-transparent white/black for modern UI

---

## Mock Scenarios

Pre-configured scenarios for testing different states:

### Available Scenarios

| Scenario | Description |
|----------|-------------|
| `solidBackground` | Solid green background instead of gradient |
| `imageBackground` | Background image instead of gradient |
| `longDelivery` | "Delivery By Tomorrow 11 PM" |
| `noBanners` | No promotional banners |
| `userWithAvatar` | User with avatar image and notifications |
| `sectionBackgrounds` | Individual section background overlays |

### Usage

```typescript
import { fetchHomeHeaderScenario } from '@/mocks';

const data = await fetchHomeHeaderScenario('userWithAvatar');
```

Or with hook:

```typescript
const { data } = useHomeHeaderData({ scenario: 'longDelivery' });
```

---

## Utility Functions

### Transform API to Component Props

```typescript
import { transformHomeHeaderData } from '@/mocks';

const headerProps = transformHomeHeaderData(apiData, callbacks);
```

### Check Delivery Speed

```typescript
import { isFastDelivery } from '@/mocks';

if (isFastDelivery(data)) {
  // Show fast delivery badge
}
```

### Get Sorted Banners

```typescript
import { getSortedBanners } from '@/mocks';

const sortedBanners = getSortedBanners(data);
// Returns banners sorted by priority
```

### Get Active Banner

```typescript
import { getActiveBanner } from '@/mocks';

const activeBanner = getActiveBanner(data, currentIndex);
// For carousel implementation
```

### Helper Functions

```typescript
import {
  getFormattedDeliveryTime,
  getVisibleTabsCount,
  getNotificationCount,
  hasUserAvatar,
} from '@/mocks';

const deliveryText = getFormattedDeliveryTime(data);
// "Delivery In: 22 Minutes"

const tabCount = getVisibleTabsCount(data);
// Number of visible tabs

const notifications = getNotificationCount(data);
// User notification count

const hasAvatar = hasUserAvatar(data);
// Boolean: user has avatar image
```

### Type Guards

Use type guards to safely handle different background types:

```typescript
import {
  isSolidBackground,
  isGradientBackground,
  isImageBackground,
} from '@/mocks';

if (isGradientBackground(background)) {
  // TypeScript knows background.config is GradientConfig
  const colors = background.config.colors;
}
```

---

## Best Practices

1. **Error Handling**: Always handle loading and error states
2. **Type Safety**: Use TypeScript types for type checking
3. **Memoization**: Memoize transformed props to avoid re-renders
4. **Analytics**: Track user interactions with tabs and banners
5. **Personalization**: Pass user context for personalized content
6. **Performance**: Use auto-refresh sparingly
7. **Testing**: Use mock scenarios for different test cases
8. **Images**: Optimize banner and background images before uploading
9. **Gradients**: Limit to 2-3 colors for best performance
10. **Contrast**: Test custom backgrounds for WCAG contrast compliance

---

## Testing

### Unit Tests

```typescript
import { fetchHomeHeader, transformHomeHeaderData } from '@/mocks';

describe('Home Header API', () => {
  it('fetches data successfully', async () => {
    const data = await fetchHomeHeader();
    expect(data).toBeDefined();
    expect(data.delivery).toBeDefined();
    expect(data.tabs.items.length).toBeGreaterThan(0);
  });

  it('transforms API data to component props', () => {
    const apiData = await fetchHomeHeader();
    const props = transformHomeHeaderData(apiData);

    expect(props.deliveryTime).toBe('22 Minutes');
    expect(props.location).toBe('Agra - 226010');
    expect(props.categoryTabs).toBeDefined();
  });
});
```

### Test Cases
- [ ] Renders with minimum required props
- [ ] Displays correct delivery time and location
- [ ] Calls callbacks when interactive elements are pressed
- [ ] Renders tabs correctly and shows active state
- [ ] ViewFlipper cycles through search placeholders
- [ ] Applies gradient backgrounds correctly
- [ ] Section backgrounds overlay main background
- [ ] Promotional banner shows/hides based on data
- [ ] Icons load from URLs correctly
- [ ] Selected tab shows pressed icon state

---

## Quick Reference

### Transparent Banner Cheat Sheet

```typescript
// ✅ Fully transparent (shows gradient)
background: { type: 'solid', config: { color: 'transparent' } }

// ✅ Semi-transparent dark overlay
background: { type: 'solid', config: { color: 'rgba(0, 0, 0, 0.2)' } }

// ✅ Semi-transparent white (glassmorphism)
background: { type: 'solid', config: { color: 'rgba(255, 255, 255, 0.15)' } }

// ✅ Fully transparent (alternative)
background: { type: 'solid', config: { color: 'rgba(0, 0, 0, 0)' } }

// ❌ Wrong - this will show as solid red
background: { type: 'solid', config: { color: '#EC0505' } }
```

### Common Color Values

| Use Case | Color Value | Effect |
|----------|-------------|--------|
| Fully transparent | `'transparent'` | Shows main gradient |
| Fully transparent (alt) | `'rgba(0, 0, 0, 0)'` | Shows main gradient |
| Subtle dark overlay | `'rgba(0, 0, 0, 0.1)'` | 10% black tint |
| Medium dark overlay | `'rgba(0, 0, 0, 0.3)'` | 30% black tint |
| Frosted glass (dark) | `'rgba(0, 0, 0, 0.15)'` | Glassmorphism effect |
| Frosted glass (light) | `'rgba(255, 255, 255, 0.15)'` | Light glass effect |
| White overlay | `'rgba(255, 255, 255, 0.2)'` | 20% white tint |

### Section Backgrounds

```typescript
// All sections transparent (show main gradient)
sectionBackgrounds: {
  toolbar: null,
  searchBar: null,
  tabNavigation: null,
}

// Toolbar with overlay, others transparent
sectionBackgrounds: {
  toolbar: { type: 'solid', config: { color: 'rgba(0, 0, 0, 0.1)' } },
  searchBar: null,
  tabNavigation: null,
}
```

---

## Troubleshooting

### Issue: Gradient not showing
**Solution**: Ensure `expo-linear-gradient` is installed and `backgroundGradient` has at least 2 colors.

### Issue: Section backgrounds not transparent
**Solution**: Explicitly set section background colors to `'transparent'` or omit them entirely (they default to transparent).

### Issue: Tab separator has gap
**Solution**: Check that `tabScrollContent.paddingBottom` is `0` and tab indicator is positioned at `bottom: 0`.

### Issue: Custom background component not visible
**Solution**: Ensure the custom component has `position: 'absolute'` and covers the full area with `StyleSheet.absoluteFillObject`.

### Issue: Icons not showing in tabs
**Solution**: Verify that icon URLs are valid and accessible. Check network tab for failed image requests.

### Issue: Changes to mock data not reflecting in app
**Solution**:
1. Clear Metro bundler cache: Kill the dev server and restart
2. Reload the app (shake device → Reload, or press 'r' in terminal)
3. Verify you're editing the correct file in `src/mocks/api/homeHeader.ts`

### Issue: Banner background showing solid color instead of transparent
**Solution**: Use `color: 'transparent'` instead of a hex color. See [Transparent Backgrounds](#transparent-backgrounds) section.

---

## Dependencies

- `expo-linear-gradient`: ^13.x.x
- `@expo/vector-icons`: ^15.x.x
- `design-system`: workspace package
- `expo-router`: ^6.x.x
- `react-native-safe-area-context`: ^4.x.x

---

## Migration to Real API

When transitioning to a real backend API:

1. **Update the fetch function:**

```typescript
// Before (mock)
import { fetchHomeHeader } from '@/mocks';

// After (real API)
import { fetchHomeHeader } from '@/api/homeHeader';
```

2. **Keep the same interface:**

Your real API should return the same `HomeHeaderApiResponse` structure.

3. **No component changes needed:**

The `transformHomeHeaderData` utility and component integration remain the same.

### Example Real API Implementation

```typescript
// api/homeHeader.ts
export async function fetchHomeHeader(params?: {
  userId?: string;
  location?: { lat: number; lng: number };
}): Promise<HomeHeaderApiResponse> {
  const response = await fetch('/api/v1/home/header', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`,
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch home header');
  }

  return response.json();
}
```

---

## Related Documentation

- [Sushi Design System](./DESIGN_SYSTEM.md)
- [Architecture Overview](./ARCHITECTURE.md)
- [API Integration Guide](./API_INTEGRATION.md)

---

## Changelog

### v1.1.0 (2024-12-03)
- **NEW**: Animated sliding tab indicator with spring physics
- **NEW**: Smooth tab transitions using React Native Animated API
- **NEW**: Dynamic indicator width adjustment for different tab sizes
- **IMPROVED**: Tab icon size reduced by 40% for better proportions

### v1.0.0 (2024-12-03)
- Initial implementation with unified background container
- Gradient, image, and animation support
- Section-specific background overlays
- Tab navigation with icons and active indicator
- Animated search placeholders with ViewFlipper
- Promotional banner integration with transparent support
- Mock API with comprehensive types and hooks
- Transform utilities for API-to-props conversion
- Multiple mock scenarios for testing

---

**Last Updated**: December 3, 2024
**Component Version**: 1.1.0
**API Version**: 1.0.0
**Status**: Production Ready (Mock API)
