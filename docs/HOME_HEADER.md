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
- [Search Placeholders](#search-placeholders)
- [Promotional Banner](#promotional-banner)
- [Animation Libraries](#animation-libraries)
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

#### 2. Typewriter Effect Search Placeholders
- **Custom typewriter animation** with character-by-character typing
- Keeps "Search " constant while animating words
- Fully compatible with iOS, Android, and Web
- Smooth deletion and cycling through multiple search terms

#### 3. Animated Tab Navigation
- **Smooth sliding indicator** with spring animation
- Indicator slides and resizes dynamically when switching tabs
- 60fps performance using React Native's Animated API
- Spring physics with configurable friction and tension
- Automatic layout measurement for different tab widths

#### 4. Simplified Full-Width Banner
- Single promotional banner (no carousel complexity)
- Supports static images, Rive animations, or Lottie animations
- Full-width design with customizable aspect ratio
- No text overlays or CTAs - pure visual content
- Tappable with navigation support

#### 5. Component Structure

```
HomeHeader
├── Toolbar Section
│   ├── Delivery time display
│   ├── Location with dropdown
│   └── User avatar
├── Search Bar
│   ├── Search icon
│   ├── Typewriter placeholders (custom animation)
│   └── Voice search icon
├── Category Tab Navigation
│   ├── Horizontal scrollable tabs with icons
│   ├── Animated sliding indicator (spring animation)
│   └── Separator line
└── Promotional Banner (optional)
    └── Full-width image or animation
```

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
| `searchPlaceholders` | `string[]` | `['ice-cream', 'vegetables', 'snacks']` | Array of words to animate (without "Search" prefix) |

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

#### Promotional Banner (Simplified)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `promotionalBanner` | `object` | `undefined` | Single promotional banner configuration |

**Promotional Banner Interface:**
```typescript
interface PromotionalBanner {
  imageUri?: string;              // Static image URL
  animationUri?: string;          // Animation file URL (Rive/Lottie)
  animationType?: 'rive' | 'lottie';  // Animation type
  aspectRatio?: number;           // Width/height ratio (default: 16/9)
  onPress?: () => void;           // Tap handler
}
```

#### Callbacks

| Prop | Type | Description |
|------|------|-------------|
| `onLocationPress` | `() => void` | Called when location is pressed |
| `onAvatarPress` | `() => void` | Called when avatar is pressed (defaults to navigate to account) |
| `onTabSelect` | `(tabId: string) => void` | Called when a tab is selected |

### Usage Examples

#### Basic Usage with Typewriter Placeholders

```tsx
import { HomeHeader } from '@/features/home';

<HomeHeader
  deliveryTime="22 minutes"
  location="Agra - 226010"
  backgroundColor="#058234"
  userInitials="SU"
  searchPlaceholders={['ice-cream', 'vegetables', 'snacks']}  // Just words, no "Search" prefix
  categoryTabs={[
    { id: 'footwear', label: 'Footwear' },
    { id: 'apparel', label: 'Apparel' },
  ]}
/>
```

#### With Full-Width Image Banner

```tsx
<HomeHeader
  deliveryTime="22 minutes"
  location="Agra - 226010"
  backgroundGradient={['#058234', '#00C853']}
  promotionalBanner={{
    imageUri: 'https://example.com/banner.png',
    aspectRatio: 2.5,  // 2.5:1 aspect ratio
    onPress: () => router.push('/offers'),
  }}
/>
```

#### With Rive Animation Banner

```tsx
<HomeHeader
  deliveryTime="22 minutes"
  location="Agra - 226010"
  backgroundGradient={['#058234', '#00C853']}
  promotionalBanner={{
    animationUri: 'https://example.com/banner.riv',
    animationType: 'rive',
    aspectRatio: 16 / 9,
    onPress: () => router.push('/special-offers'),
  }}
/>
```

---

## Search Placeholders

### Typewriter Effect

The search bar uses a **custom typewriter animation** that keeps "Search " constant and animates the changing words.

#### Format

Pass **just the words** (without "Search" prefix or quotes):

```typescript
searchPlaceholders={['ice-cream', 'vegetables', 'snacks', 'dairy products']}
```

#### How It Works

The component automatically:
1. Displays "Search " (constant)
2. Types out the word character by character: `"ice-cream"`
3. Wraps it in quotes: `"Search "ice-cream""`
4. Pauses for 2 seconds
5. Deletes back to "Search "
6. Types the next word
7. Loops infinitely

#### Customization

The TypewriterText component supports customization:
- **Typing speed**: 100ms per character
- **Delete speed**: 50ms per character
- **Delay between words**: 2000ms (2 seconds)
- **Cross-platform**: Works on iOS, Android, and Web

#### Migration from ViewFlipper

**Old format (deprecated):**
```typescript
searchPlaceholders={[
  'Search "ice-cream"',    // ❌ Don't include "Search" prefix
  'Search "vegetables"',   // ❌ Don't include quotes
]}
```

**New format:**
```typescript
searchPlaceholders={[
  'ice-cream',      // ✅ Just the word
  'vegetables',     // ✅ Just the word
]}
```

---

## Promotional Banner

### Simplified Banner Design

The banner has been **simplified** to focus on visual impact:

**Removed:**
- ❌ Multiple banners (carousel)
- ❌ Title and subtitle text
- ❌ CTA buttons
- ❌ Complex background configurations
- ❌ Priority sorting

**New Features:**
- ✅ Single full-width banner
- ✅ Image OR animation support
- ✅ Clean, modern design
- ✅ Customizable aspect ratio
- ✅ Tappable for navigation

### Banner Types

#### 1. Static Image Banner

```typescript
banner: {
  type: 'image',
  url: 'https://example.com/banner.png',
  aspectRatio: 16 / 9,  // Optional, defaults to 16:9
  target: {
    type: 'screen',
    config: {
      screen: 'CategoryScreen',
      params: { category: 'offers' }
    }
  }
}
```

#### 2. Rive Animation Banner (Recommended)

```typescript
banner: {
  type: 'rive',
  url: 'https://example.com/banner.riv',
  aspectRatio: 2.5,  // Wider aspect ratio
  target: {
    type: 'screen',
    config: {
      screen: 'OffersScreen'
    }
  }
}
```

#### 3. Lottie Animation Banner

```typescript
banner: {
  type: 'lottie',
  url: 'https://example.com/banner.json',
  aspectRatio: 16 / 9
}
```

### Aspect Ratios

Common aspect ratios:
- **16:9** = `16 / 9` = 1.778 (widescreen, default)
- **2.5:1** = `2.5` (ultra-wide, Swiggy/Blinkit style)
- **4:3** = `4 / 3` = 1.333 (more square)
- **21:9** = `21 / 9` = 2.333 (cinematic)

### Image Guidelines

**Recommended Sizes:**
- 16:9 format: 1920x1080 px
- 2.5:1 format: 2500x1000 px

**Optimization:**
- Use WebP format for better compression
- Keep file sizes under 200 KB
- Export at 2x for Retina displays

---

## Animation Libraries

### RIVE vs Lottie Comparison

| Feature | **Rive** (Recommended) | Lottie |
|---------|----------------------|--------|
| **Performance** | ✅ ~60 FPS | ⚠️ ~17 FPS |
| **File Size** | ✅ 2 KB (avg) | ⚠️ 24 KB (avg) |
| **CPU Usage** | ✅ 31.8% | ⚠️ 91.8% |
| **GPU Memory** | ✅ 2.6 MB | ⚠️ 149-190 MB |
| **Interactivity** | ✅ State machines | ❌ Limited |
| **Web Support** | ✅ Yes | ✅ Yes |
| **React Native** | ✅ Excellent | ✅ Good |
| **Battery Impact** | ✅ Low | ⚠️ Higher |

### Why RIVE is Recommended

**Performance Benefits:**
- 3.5x faster frame rate (60 vs 17 FPS)
- 12x smaller file sizes
- 3x lower CPU usage
- Better battery efficiency

**Interactive Capabilities:**
- Real-time state machines
- User interaction support
- Dynamic parameter changes
- Perfect for loading states

**Modern Workflow:**
- Native Rive editor (no After Effects)
- Export once, works everywhere
- Built-in state management
- Version control friendly

### When to Use Each

**Use RIVE if:**
- ✅ Interactive banner content
- ✅ Performance is critical
- ✅ File size matters
- ✅ You need state machines

**Use Lottie if:**
- ✅ Design team uses After Effects
- ✅ Simple playback animations
- ✅ Quick marketing campaigns
- ✅ Legacy integration

### Installation

**For RIVE:**
```bash
pnpm add rive-react-native
```

**For Lottie:**
```bash
pnpm add lottie-react-native
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
  banner?: SimpleBanner;        // NEW: Single banner
  banners?: PromotionalBanner[]; // DEPRECATED
  metadata?: ApiMetadata;
}
```

#### SimpleBanner Interface (New)

```typescript
export interface SimpleBanner {
  type: 'image' | 'rive' | 'lottie';
  url: string;
  aspectRatio?: number;
  target?: NavigationTarget;
  analytics?: AnalyticsData;
}
```

### Complete Example Response

```json
{
  "delivery": {
    "label": "Delivery In",
    "value": "22 Minutes",
    "location": {
      "city": "Agra",
      "pincode": "226010",
      "formatted": "Agra - 226010"
    }
  },
  "background": {
    "type": "gradient",
    "config": {
      "colors": ["#058234", "#03A64A", "#00C853"],
      "start": { "x": 0, "y": 0 },
      "end": { "x": 0, "y": 1 }
    }
  },
  "search": {
    "placeholders": [
      "ice-cream",
      "vegetables",
      "snacks"
    ],
    "voiceEnabled": true
  },
  "banner": {
    "type": "image",
    "url": "https://example.com/banner.png",
    "aspectRatio": 2.5,
    "target": {
      "type": "screen",
      "config": {
        "screen": "OffersScreen"
      }
    }
  }
}
```

---

## Mock Scenarios

Pre-configured scenarios for testing:

### Available Scenarios

| Scenario | Description |
|----------|-------------|
| `solidBackground` | Solid green background |
| `imageBackground` | Background image |
| `longDelivery` | "Tomorrow 11 PM" delivery |
| `noBanner` | No promotional banner |
| `riveBanner` | Rive animation banner example |
| `lottieBanner` | Lottie animation banner example |
| `userWithAvatar` | User with avatar and notifications |

### Usage

```typescript
import { fetchHomeHeaderScenario } from '@/mocks';

const data = await fetchHomeHeaderScenario('riveBanner');
```

---

## Best Practices

1. **Search Placeholders**: Use 3-5 words for optimal cycling
2. **Banner Images**: Optimize to under 200 KB
3. **Aspect Ratios**: Use 2.5:1 for Swiggy/Blinkit style banners
4. **Animations**: Prefer RIVE for performance-critical banners
5. **Error Handling**: Always handle loading and error states
6. **Type Safety**: Use TypeScript types for type checking
7. **Analytics**: Track banner impressions and clicks
8. **Testing**: Test on all platforms (iOS, Android, Web)

---

## Quick Reference

### Banner Format Cheat Sheet

```typescript
// ✅ Static image banner
banner: {
  type: 'image',
  url: 'https://example.com/banner.png',
  aspectRatio: 2.5
}

// ✅ Rive animation (recommended)
banner: {
  type: 'rive',
  url: 'https://example.com/banner.riv',
  aspectRatio: 16 / 9
}

// ✅ Lottie animation
banner: {
  type: 'lottie',
  url: 'https://example.com/banner.json'
}

// ❌ Old format (deprecated)
banners: [
  {
    id: 'banner1',
    content: { title: 'Title', ... },
    // ... complex structure
  }
]
```

### Search Placeholders Format

```typescript
// ✅ Correct format
searchPlaceholders: ['ice-cream', 'vegetables', 'snacks']

// ❌ Old format (deprecated)
searchPlaceholders: ['Search "ice-cream"', 'Search "vegetables"']
```

---

## Troubleshooting

### Banner not showing

**Solution**: Ensure you're using the new `banner` (singular) field, not `banners` (array).

### Typewriter animation not working

**Solution**: Check that placeholders are just words without "Search" prefix or quotes.

### Animation placeholder showing

**Solution**: Rive/Lottie integration is pending. Currently shows placeholder text for animation types.

### Performance issues with banner

**Solution**: Switch from Lottie to Rive for 3.5x better performance.

---

## Dependencies

- `expo-linear-gradient`: ^13.x.x
- `@expo/vector-icons`: ^15.x.x
- `design-system`: workspace package
- `expo-router`: ^6.x.x
- `react-native-safe-area-context`: ^4.x.x

**Optional (for animations):**
- `rive-react-native`: For Rive animations
- `lottie-react-native`: For Lottie animations

---

## Changelog

### v1.3.0 (2024-12-04)
- **BREAKING**: Simplified banner from array to single object
- **BREAKING**: Changed API field from `banners[]` to `banner`
- **NEW**: Support for Rive and Lottie animations in banner
- **NEW**: Customizable aspect ratio for banner
- **REMOVED**: Banner title, subtitle, and CTA buttons
- **REMOVED**: Multiple banners and priority system

### v1.2.0 (2024-12-04)
- **BREAKING**: Changed search placeholder format (no "Search" prefix)
- **NEW**: Custom typewriter effect for search placeholders
- **REMOVED**: ViewFlipper dependency
- **IMPROVED**: Cross-platform compatibility (iOS, Android, Web)
- **IMPROVED**: Search placeholder animation smoothness

### v1.1.0 (2024-12-03)
- **NEW**: Animated sliding tab indicator with spring physics
- **NEW**: Dynamic indicator width adjustment

### v1.0.0 (2024-12-03)
- Initial implementation

---

**Last Updated**: December 4, 2024
**Component Version**: 1.3.0
**API Version**: 2.0.0
**Status**: Production Ready (Mock API)
