/**
 * Design System Color Tokens
 *
 * These colors form the foundation of the app's visual identity.
 * Use semantic colors (success, error, etc.) for their intended purpose.
 */
export const colors = {
  // Brand Colors
  primary: {
    50: '#E6F4E9',
    100: '#C2E4C9',
    200: '#9AD3A5',
    300: '#71C281',
    400: '#48B15D',
    500: '#058234', // Main brand color (Green)
    600: '#04762E',
    700: '#036125',
    800: '#024C1D',
    900: '#013714',
  },

  // Secondary Brand
  secondary: {
    50: '#E8F5E9',
    100: '#C8E6C9',
    200: '#A5D6A7',
    300: '#81C784',
    400: '#66BB6A',
    500: '#4CAF50', // Secondary color (Green)
    600: '#43A047',
    700: '#388E3C',
    800: '#2E7D32',
    900: '#1B5E20',
  },

  // Semantic Colors
  success: {
    light: '#E8F5E9',
    main: '#4CAF50',
    dark: '#2E7D32',
  },

  error: {
    light: '#FFEBEE',
    main: '#F44336',
    dark: '#C62828',
  },

  warning: {
    light: '#FFF8E1',
    main: '#FFC107',
    dark: '#F57F17',
  },

  info: {
    light: '#E3F2FD',
    main: '#2196F3',
    dark: '#1565C0',
  },

  // Neutral Colors (Gray scale)
  gray: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },

  // Background Colors
  background: {
    primary: '#FFFFFF',
    secondary: '#F5F5F5',
    tertiary: '#EEEEEE',
    overlay: 'rgba(0, 0, 0, 0.5)',
  },

  // Text Colors
  text: {
    primary: '#212121',
    secondary: '#757575',
    disabled: '#BDBDBD',
    inverse: '#FFFFFF',
    hint: '#9E9E9E',
  },

  // Border Colors
  border: {
    light: '#E0E0E0',
    medium: '#BDBDBD',
    dark: '#9E9E9E',
  },

  // Common Colors
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
} as const;

export type Colors = typeof colors;
export type ColorKey = keyof Colors;
