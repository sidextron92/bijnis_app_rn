// Legacy exports for backward compatibility
export * from './colors';
export * from './spacing';
export * from './typography';

// Re-export design-system theme hooks and utilities
export {
  useTheme,
  useColors,
  useTypography,
  useDimensions,
  ThemeProvider,
  lightTheme,
  darkTheme,
  SushiTheme,
} from 'design-system';

import { colors } from './colors';
import { spacing } from './spacing';
import { fontFamily, fontSize, lineHeight, fontWeight } from './typography';

// Legacy theme object for backward compatibility
export const theme = {
  colors,
  spacing,
  typography: {
    fontFamily,
    fontSize,
    lineHeight,
    fontWeight,
  },
  borderRadius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 5,
    },
  },
} as const;

export type Theme = typeof theme;
