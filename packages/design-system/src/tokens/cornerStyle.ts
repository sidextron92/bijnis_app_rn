/**
 * Design System Corner Style Tokens
 *
 * Defines the available corner styles for components:
 * - rectangle: Sharp 90° corners (no border radius)
 * - rounded: Standard CSS border-radius (circular arc)
 * - squircle: Continuous corner curves (like Apple's iOS icons)
 *
 * Squircles use a superellipse formula to create smoother, more organic
 * corners compared to standard rounded corners.
 */

export type CornerStyle = 'rectangle' | 'rounded' | 'squircle';

export const cornerStyleConfig = {
  /** Sharp corners with no radius */
  rectangle: {
    cornerSmoothing: 0,
    useSquircle: false,
  },
  /** Standard rounded corners using CSS border-radius */
  rounded: {
    cornerSmoothing: 0,
    useSquircle: false,
  },
  /** Continuous corner curves (iOS-style squircle) */
  squircle: {
    cornerSmoothing: 0.6, // Figma's default corner smoothing
    useSquircle: true,
  },
} as const;

export const DEFAULT_CORNER_STYLE: CornerStyle = 'rounded';
