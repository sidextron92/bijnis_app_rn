/**
 * Design System Border Radius Tokens
 *
 * Consistent border radius creates visual harmony.
 */
export const borderRadius = {
  /** 0px - No radius */
  none: 0,
  /** 2px - Subtle rounding */
  xs: 2,
  /** 4px - Small elements */
  sm: 4,
  /** 8px - Default rounding */
  md: 8,
  /** 12px - Cards, containers */
  lg: 12,
  /** 16px - Large elements */
  xl: 16,
  /** 24px - Pills, tags */
  '2xl': 24,
  /** 9999px - Full circle */
  full: 9999,
} as const;

export type BorderRadius = typeof borderRadius;
export type BorderRadiusKey = keyof BorderRadius;

/**
 * Get border radius value by key or number
 */
export const getBorderRadius = (key: BorderRadiusKey | number): number => {
  if (typeof key === 'number') return key;
  return borderRadius[key];
};
