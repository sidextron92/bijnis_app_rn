/**
 * Semantic Color Scheme - Sushi-inspired Design System
 *
 * Defines semantic color mappings for light and dark themes.
 * Access colors via: theme.colors.text.primary, theme.colors.background.primary, etc.
 */

import { gray, brandGreen, red, green, blue, yellow, neutral, slate, purple, teal, pink } from './rawTokens';

// Type definitions for color scheme
export interface TextColors {
  primary: string;
  secondary: string;
  tertiary: string;
  disabled: string;
  inverse: string;
  brand: string;
  success: string;
  error: string;
  warning: string;
  info: string;
  link: string;
}

export interface BackgroundColors {
  primary: string;
  secondary: string;
  tertiary: string;
  elevated: string;
  overlay: string;
  brand: string;
  brandSubtle: string;
  success: string;
  successSubtle: string;
  error: string;
  errorSubtle: string;
  warning: string;
  warningSubtle: string;
  info: string;
  infoSubtle: string;
}

export interface BorderColors {
  default: string;
  subtle: string;
  strong: string;
  brand: string;
  success: string;
  error: string;
  warning: string;
  info: string;
  focused: string;
}

export interface IconColors {
  primary: string;
  secondary: string;
  tertiary: string;
  disabled: string;
  inverse: string;
  brand: string;
  success: string;
  error: string;
  warning: string;
  info: string;
}

export interface InteractiveColors {
  primary: string;
  primaryHover: string;
  primaryActive: string;
  primaryDisabled: string;
  secondary: string;
  secondaryHover: string;
  secondaryActive: string;
  destructive: string;
  destructiveHover: string;
  destructiveActive: string;
}

export interface SurfaceColors {
  default: string;
  raised: string;
  overlay: string;
  sunken: string;
  disabled: string;
}

export interface ColorScheme {
  mode: 'light' | 'dark';
  text: TextColors;
  background: BackgroundColors;
  border: BorderColors;
  icon: IconColors;
  interactive: InteractiveColors;
  surface: SurfaceColors;
  // Raw palette access (for custom usage)
  palette: {
    gray: typeof gray;
    brandGreen: typeof brandGreen;
    red: typeof red;
    green: typeof green;
    blue: typeof blue;
    yellow: typeof yellow;
    purple: typeof purple;
    teal: typeof teal;
    pink: typeof pink;
  };
}

/**
 * Light Color Scheme
 */
export const lightColorScheme: ColorScheme = {
  mode: 'light',

  text: {
    primary: gray[900],
    secondary: gray[600],
    tertiary: gray[500],
    disabled: gray[400],
    inverse: neutral.white,
    brand: brandGreen[500],
    success: green[600],
    error: red[600],
    warning: yellow[700],
    info: blue[600],
    link: blue[500],
  },

  background: {
    primary: neutral.white,
    secondary: gray[50],
    tertiary: gray[100],
    elevated: neutral.white,
    overlay: 'rgba(28, 28, 28, 0.5)',
    brand: brandGreen[500],
    brandSubtle: brandGreen[50],
    success: green[500],
    successSubtle: green[50],
    error: red[500],
    errorSubtle: red[50],
    warning: yellow[500],
    warningSubtle: yellow[50],
    info: blue[500],
    infoSubtle: blue[50],
  },

  border: {
    default: gray[200],
    subtle: gray[100],
    strong: gray[300],
    brand: brandGreen[500],
    success: green[500],
    error: red[500],
    warning: yellow[500],
    info: blue[500],
    focused: blue[500],
  },

  icon: {
    primary: gray[900],
    secondary: gray[600],
    tertiary: gray[400],
    disabled: gray[300],
    inverse: neutral.white,
    brand: brandGreen[500],
    success: green[500],
    error: red[500],
    warning: yellow[500],
    info: blue[500],
  },

  interactive: {
    primary: brandGreen[500],
    primaryHover: brandGreen[600],
    primaryActive: brandGreen[700],
    primaryDisabled: brandGreen[200],
    secondary: gray[100],
    secondaryHover: gray[200],
    secondaryActive: gray[300],
    destructive: red[500],
    destructiveHover: red[600],
    destructiveActive: red[700],
  },

  surface: {
    default: neutral.white,
    raised: neutral.white,
    overlay: 'rgba(28, 28, 28, 0.5)',
    sunken: gray[50],
    disabled: gray[100],
  },

  palette: {
    gray,
    brandGreen,
    red,
    green,
    blue,
    yellow,
    purple,
    teal,
    pink,
  },
};

/**
 * Dark Color Scheme
 */
export const darkColorScheme: ColorScheme = {
  mode: 'dark',

  text: {
    primary: gray[50],
    secondary: gray[300],
    tertiary: gray[400],
    disabled: gray[600],
    inverse: gray[900],
    brand: brandGreen[400],
    success: green[400],
    error: red[400],
    warning: yellow[400],
    info: blue[400],
    link: blue[400],
  },

  background: {
    primary: gray[900],
    secondary: gray[800],
    tertiary: gray[700],
    elevated: slate[800],
    overlay: 'rgba(0, 0, 0, 0.7)',
    brand: brandGreen[500],
    brandSubtle: brandGreen[900],
    success: green[500],
    successSubtle: green[900],
    error: red[500],
    errorSubtle: red[900],
    warning: yellow[500],
    warningSubtle: yellow[900],
    info: blue[500],
    infoSubtle: blue[900],
  },

  border: {
    default: gray[700],
    subtle: gray[800],
    strong: gray[600],
    brand: brandGreen[400],
    success: green[400],
    error: red[400],
    warning: yellow[400],
    info: blue[400],
    focused: blue[400],
  },

  icon: {
    primary: gray[50],
    secondary: gray[300],
    tertiary: gray[500],
    disabled: gray[600],
    inverse: gray[900],
    brand: brandGreen[400],
    success: green[400],
    error: red[400],
    warning: yellow[400],
    info: blue[400],
  },

  interactive: {
    primary: brandGreen[500],
    primaryHover: brandGreen[400],
    primaryActive: brandGreen[300],
    primaryDisabled: brandGreen[800],
    secondary: gray[700],
    secondaryHover: gray[600],
    secondaryActive: gray[500],
    destructive: red[500],
    destructiveHover: red[400],
    destructiveActive: red[300],
  },

  surface: {
    default: gray[900],
    raised: gray[800],
    overlay: 'rgba(0, 0, 0, 0.7)',
    sunken: slate[900],
    disabled: gray[800],
  },

  palette: {
    gray,
    brandGreen,
    red,
    green,
    blue,
    yellow,
    purple,
    teal,
    pink,
  },
};

/**
 * Create custom color scheme by extending light or dark base
 */
export const createColorScheme = (
  base: 'light' | 'dark',
  overrides: Partial<Omit<ColorScheme, 'mode' | 'palette'>>
): ColorScheme => {
  const baseScheme = base === 'light' ? lightColorScheme : darkColorScheme;
  return {
    ...baseScheme,
    ...overrides,
    text: { ...baseScheme.text, ...overrides.text },
    background: { ...baseScheme.background, ...overrides.background },
    border: { ...baseScheme.border, ...overrides.border },
    icon: { ...baseScheme.icon, ...overrides.icon },
    interactive: { ...baseScheme.interactive, ...overrides.interactive },
    surface: { ...baseScheme.surface, ...overrides.surface },
  };
};
