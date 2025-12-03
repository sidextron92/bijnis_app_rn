/**
 * Font Tokens - Sushi-inspired Design System
 *
 * Defines font families, sizes, weights, line heights, and letter spacing.
 */

import { Platform, TextStyle } from 'react-native';

/**
 * Font Families
 */
export const fontFamily = {
  // Primary font family for body text
  regular: Platform.select({
    ios: 'System',
    android: 'Roboto',
    web: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    default: 'System',
  }) as string,

  // Medium weight
  medium: Platform.select({
    ios: 'System',
    android: 'Roboto-Medium',
    web: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    default: 'System',
  }) as string,

  // Semi-bold weight
  semibold: Platform.select({
    ios: 'System',
    android: 'Roboto-Medium',
    web: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    default: 'System',
  }) as string,

  // Bold weight
  bold: Platform.select({
    ios: 'System',
    android: 'Roboto-Bold',
    web: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    default: 'System',
  }) as string,

  // Monospace for code
  mono: Platform.select({
    ios: 'Menlo',
    android: 'monospace',
    web: '"SF Mono", "Fira Code", "Fira Mono", Consolas, "Liberation Mono", Menlo, Courier, monospace',
    default: 'monospace',
  }) as string,
} as const;

/**
 * Font Sizes (in px)
 * Following Sushi's 050-900 scale
 */
export const fontSize = {
  /** 10px - Micro text */
  '050': 10,
  /** 11px - Tiny labels */
  '100': 11,
  /** 12px - Small text, captions */
  '200': 12,
  /** 13px - Compact body */
  '300': 13,
  /** 14px - Body text (default) */
  '400': 14,
  /** 16px - Large body */
  '500': 16,
  /** 18px - Subheadings */
  '600': 18,
  /** 20px - Small headings */
  '700': 20,
  /** 24px - Section titles */
  '800': 24,
  /** 32px - Page titles */
  '900': 32,
} as const;

/**
 * Font Weights
 */
export const fontWeight = {
  light: '300' as TextStyle['fontWeight'],
  regular: '400' as TextStyle['fontWeight'],
  medium: '500' as TextStyle['fontWeight'],
  semibold: '600' as TextStyle['fontWeight'],
  bold: '700' as TextStyle['fontWeight'],
  extrabold: '800' as TextStyle['fontWeight'],
} as const;

/**
 * Line Heights (multipliers)
 */
export const lineHeight = {
  /** 1.0 - None */
  none: 1.0,
  /** 1.2 - Tight (headings) */
  tight: 1.2,
  /** 1.4 - Snug */
  snug: 1.4,
  /** 1.5 - Normal (body) */
  normal: 1.5,
  /** 1.6 - Relaxed */
  relaxed: 1.6,
  /** 1.75 - Loose */
  loose: 1.75,
  /** 2.0 - Extra loose */
  extraLoose: 2.0,
} as const;

/**
 * Letter Spacing (in px)
 */
export const letterSpacing = {
  /** -0.8px - Tighter */
  tighter: -0.8,
  /** -0.4px - Tight */
  tight: -0.4,
  /** 0 - Normal */
  normal: 0,
  /** 0.4px - Wide */
  wide: 0.4,
  /** 0.8px - Wider */
  wider: 0.8,
  /** 1.6px - Widest */
  widest: 1.6,
} as const;

// Type exports
export type FontFamily = typeof fontFamily;
export type FontSize = typeof fontSize;
export type FontSizeKey = keyof typeof fontSize;
export type FontWeight = typeof fontWeight;
export type FontWeightKey = keyof typeof fontWeight;
export type LineHeight = typeof lineHeight;
export type LetterSpacing = typeof letterSpacing;
