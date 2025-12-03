import { Platform, ViewStyle } from 'react-native';

/**
 * Design System Shadow Tokens
 *
 * Shadows create depth and visual hierarchy in the UI.
 */

type ShadowStyle = Pick<
  ViewStyle,
  'shadowColor' | 'shadowOffset' | 'shadowOpacity' | 'shadowRadius' | 'elevation'
>;

export const shadows: Record<string, ShadowStyle> = {
  /** No shadow */
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },

  /** Extra small shadow - subtle depth */
  xs: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },

  /** Small shadow - cards, buttons */
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },

  /** Medium shadow - dropdowns, tooltips */
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },

  /** Large shadow - modals, dialogs */
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 8,
  },

  /** Extra large shadow - floating elements */
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 12,
  },

  /** 2XL shadow - prominent elements */
  '2xl': {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 16,
  },
} as const;

export type Shadows = typeof shadows;
export type ShadowKey = keyof Shadows;

/**
 * Get shadow style by key
 */
export const getShadow = (key: ShadowKey): ShadowStyle => shadows[key];

/**
 * Platform-specific shadow (for web compatibility)
 */
export const getBoxShadow = (key: ShadowKey): ViewStyle => {
  if (Platform.OS === 'web') {
    const shadow = shadows[key];
    return {
      // @ts-ignore - Web-specific property
      boxShadow: `${shadow.shadowOffset.width}px ${shadow.shadowOffset.height}px ${shadow.shadowRadius}px rgba(0,0,0,${shadow.shadowOpacity})`,
    };
  }
  return shadows[key];
};
