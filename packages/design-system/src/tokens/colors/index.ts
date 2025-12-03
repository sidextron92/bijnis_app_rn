/**
 * Colors Index - Sushi Design System
 */

export * from './rawTokens';
export * from './colorScheme';

// Re-export commonly used items for convenience
export { lightColorScheme, darkColorScheme, createColorScheme } from './colorScheme';
export type { ColorScheme, TextColors, BackgroundColors, BorderColors, IconColors, InteractiveColors, SurfaceColors } from './colorScheme';

// Legacy compatibility: export colors object for old components
import { neutral, gray, brandGreen, red, green, blue, yellow } from './rawTokens';

export const colors = {
  // Brand Colors
  primary: {
    50: brandGreen[50],
    100: brandGreen[100],
    200: brandGreen[200],
    300: brandGreen[300],
    400: brandGreen[400],
    500: brandGreen[500],
    600: brandGreen[600],
    700: brandGreen[700],
    800: brandGreen[800],
    900: brandGreen[900],
  },
  secondary: {
    50: green[50],
    100: green[100],
    200: green[200],
    300: green[300],
    400: green[400],
    500: green[500],
    600: green[600],
    700: green[700],
    800: green[800],
    900: green[900],
  },
  success: {
    light: green[100],
    main: green[500],
    dark: green[700],
  },
  error: {
    light: red[100],
    main: red[500],
    dark: red[700],
  },
  warning: {
    light: yellow[100],
    main: yellow[500],
    dark: yellow[700],
  },
  info: {
    light: blue[100],
    main: blue[500],
    dark: blue[700],
  },
  gray: {
    50: gray[50],
    100: gray[100],
    200: gray[200],
    300: gray[300],
    400: gray[400],
    500: gray[500],
    600: gray[600],
    700: gray[700],
    800: gray[800],
    900: gray[900],
  },
  background: {
    primary: '#FFFFFF',
    secondary: gray[100],
    tertiary: gray[200],
    overlay: 'rgba(0, 0, 0, 0.5)',
  },
  text: {
    primary: neutral[900],
    secondary: neutral[600],
    disabled: neutral[400],
    inverse: '#FFFFFF',
    hint: neutral[500],
  },
  border: {
    light: gray[200],
    medium: gray[400],
    dark: gray[600],
  },
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
} as const;
