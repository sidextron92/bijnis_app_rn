/**
 * Theme Index - Sushi Design System
 */

export * from './ThemeContext';

// Re-export commonly used items
export {
  ThemeProvider,
  useTheme,
  useColors,
  useTypography,
  useDimensions,
  lightTheme,
  darkTheme,
  SushiTheme,
} from './ThemeContext';

export type {
  Theme,
  ThemeContextValue,
  ThemeProviderProps,
  ThemeDimensions,
  ThemeTypography,
  ThemeAnimation,
} from './ThemeContext';
