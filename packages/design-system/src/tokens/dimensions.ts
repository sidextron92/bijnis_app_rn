/**
 * Dimension Tokens - Sushi-inspired Design System
 *
 * Defines spacing, sizing, and layout-related tokens.
 */

/**
 * Spacing Scale (in px)
 * Base unit: 4px
 */
export const spacing = {
  /** 0px */
  none: 0,
  /** 2px - Micro spacing */
  '2xs': 2,
  /** 4px - Extra small */
  xs: 4,
  /** 8px - Small */
  sm: 8,
  /** 12px - Medium-small */
  md: 12,
  /** 16px - Medium */
  lg: 16,
  /** 20px - Medium-large */
  xl: 20,
  /** 24px - Large */
  '2xl': 24,
  /** 32px - Extra large */
  '3xl': 32,
  /** 40px - 2X large */
  '4xl': 40,
  /** 48px - 3X large */
  '5xl': 48,
  /** 64px - 4X large */
  '6xl': 64,
  /** 80px - 5X large */
  '7xl': 80,
  /** 96px - 6X large */
  '8xl': 96,
  /** 128px - 7X large */
  '9xl': 128,
} as const;

/**
 * Border Radius Scale (in px)
 */
export const borderRadius = {
  /** 0px - Sharp corners */
  none: 0,
  /** 2px - Minimal rounding */
  '2xs': 2,
  /** 4px - Subtle rounding */
  xs: 4,
  /** 6px - Small rounding */
  sm: 6,
  /** 8px - Default rounding */
  md: 8,
  /** 12px - Medium rounding */
  lg: 12,
  /** 16px - Large rounding */
  xl: 16,
  /** 20px - Extra large rounding */
  '2xl': 20,
  /** 24px - Pill-like */
  '3xl': 24,
  /** 9999px - Full circle */
  full: 9999,
} as const;

/**
 * Border Width Scale (in px)
 */
export const borderWidth = {
  /** 0px */
  none: 0,
  /** 1px - Hairline */
  hairline: 0.5,
  /** 1px - Default */
  thin: 1,
  /** 2px - Medium */
  medium: 2,
  /** 3px - Thick */
  thick: 3,
  /** 4px - Extra thick */
  extraThick: 4,
} as const;

/**
 * Icon Sizes (in px)
 */
export const iconSize = {
  /** 12px - Tiny */
  '2xs': 12,
  /** 14px - Extra small */
  xs: 14,
  /** 16px - Small */
  sm: 16,
  /** 20px - Medium (default) */
  md: 20,
  /** 24px - Large */
  lg: 24,
  /** 28px - Extra large */
  xl: 28,
  /** 32px - 2X large */
  '2xl': 32,
  /** 40px - 3X large */
  '3xl': 40,
  /** 48px - 4X large */
  '4xl': 48,
} as const;

/**
 * Avatar Sizes (in px)
 */
export const avatarSize = {
  /** 24px - Extra small */
  xs: 24,
  /** 32px - Small */
  sm: 32,
  /** 40px - Medium (default) */
  md: 40,
  /** 48px - Large */
  lg: 48,
  /** 56px - Extra large */
  xl: 56,
  /** 64px - 2X large */
  '2xl': 64,
  /** 80px - 3X large */
  '3xl': 80,
  /** 96px - 4X large */
  '4xl': 96,
  /** 128px - 5X large */
  '5xl': 128,
} as const;

/**
 * Component Heights (in px)
 */
export const componentHeight = {
  /** 24px - Compact */
  xs: 24,
  /** 32px - Small */
  sm: 32,
  /** 40px - Medium (default for buttons) */
  md: 40,
  /** 44px - Touch target minimum */
  touch: 44,
  /** 48px - Large */
  lg: 48,
  /** 56px - Extra large */
  xl: 56,
} as const;

/**
 * Z-Index Scale
 */
export const zIndex = {
  /** Behind everything */
  hide: -1,
  /** Default level */
  base: 0,
  /** Dropdowns, selects */
  dropdown: 1000,
  /** Sticky headers */
  sticky: 1100,
  /** Fixed elements */
  fixed: 1200,
  /** Backdrop/overlay */
  backdrop: 1300,
  /** Modal dialogs */
  modal: 1400,
  /** Popovers */
  popover: 1500,
  /** Tooltips */
  tooltip: 1600,
  /** Toast notifications */
  toast: 1700,
  /** Max level */
  max: 9999,
} as const;

/**
 * Opacity Scale
 */
export const opacity = {
  /** Invisible */
  0: 0,
  /** Very faint */
  5: 0.05,
  /** Faint */
  10: 0.1,
  /** Light */
  20: 0.2,
  /** Quarter */
  25: 0.25,
  /** Third */
  30: 0.3,
  /** Half visible */
  50: 0.5,
  /** Mostly visible */
  70: 0.7,
  /** Almost opaque */
  80: 0.8,
  /** Nearly opaque */
  90: 0.9,
  /** Opaque */
  100: 1,
} as const;

/**
 * Duration Scale (in ms) - for animations
 */
export const duration = {
  /** Instant */
  instant: 0,
  /** 75ms - Very fast */
  faster: 75,
  /** 100ms - Fast */
  fast: 100,
  /** 150ms - Normal */
  normal: 150,
  /** 200ms - Slow */
  slow: 200,
  /** 300ms - Slower */
  slower: 300,
  /** 500ms - Very slow */
  slowest: 500,
} as const;

/**
 * Easing Functions
 */
export const easing = {
  linear: 'linear',
  easeIn: 'ease-in',
  easeOut: 'ease-out',
  easeInOut: 'ease-in-out',
  // Custom bezier curves
  easeInQuad: 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
  easeOutQuad: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  easeInOutQuad: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
  easeInCubic: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
  easeOutCubic: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
  easeInOutCubic: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
  spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
} as const;

// Type exports
export type Spacing = typeof spacing;
export type SpacingKey = keyof Spacing;
export type BorderRadius = typeof borderRadius;
export type BorderRadiusKey = keyof BorderRadius;
export type BorderWidth = typeof borderWidth;
export type IconSize = typeof iconSize;
export type IconSizeKey = keyof IconSize;
export type AvatarSize = typeof avatarSize;
export type AvatarSizeKey = keyof AvatarSize;
export type ComponentHeight = typeof componentHeight;
export type ZIndex = typeof zIndex;
export type Opacity = typeof opacity;
export type Duration = typeof duration;
export type Easing = typeof easing;

// Helper functions
export const getSpacing = (key: SpacingKey | number): number => {
  if (typeof key === 'number') return key;
  return spacing[key];
};

export const getBorderRadius = (key: BorderRadiusKey | number): number => {
  if (typeof key === 'number') return key;
  return borderRadius[key];
};

export const getIconSize = (key: IconSizeKey | number): number => {
  if (typeof key === 'number') return key;
  return iconSize[key];
};
