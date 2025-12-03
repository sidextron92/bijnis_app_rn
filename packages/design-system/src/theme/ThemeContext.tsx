/**
 * Theme Context - Sushi-inspired Design System
 *
 * Provides theme values throughout the React Native component tree.
 * Similar to Jetpack Compose's CompositionLocal pattern.
 */

import React, { createContext, useContext, useMemo, useState, useCallback } from 'react';
import { useColorScheme } from 'react-native';
import { ColorScheme, lightColorScheme, darkColorScheme } from '../tokens/colors';
import { textStyles, typographyMatrix } from '../tokens/typography';
import {
  spacing,
  borderRadius,
  borderWidth,
  iconSize,
  avatarSize,
  componentHeight,
  zIndex,
  opacity,
  duration,
  easing,
} from '../tokens/dimensions';

/**
 * Theme Dimensions (layout-related tokens)
 */
export interface ThemeDimensions {
  spacing: typeof spacing;
  borderRadius: typeof borderRadius;
  borderWidth: typeof borderWidth;
  iconSize: typeof iconSize;
  avatarSize: typeof avatarSize;
  componentHeight: typeof componentHeight;
  zIndex: typeof zIndex;
  opacity: typeof opacity;
}

/**
 * Theme Animation tokens
 */
export interface ThemeAnimation {
  duration: typeof duration;
  easing: typeof easing;
}

/**
 * Theme Typography
 */
export interface ThemeTypography {
  styles: typeof textStyles;
  matrix: typeof typographyMatrix;
}

/**
 * Complete Theme object
 */
export interface Theme {
  mode: 'light' | 'dark';
  colors: ColorScheme;
  typography: ThemeTypography;
  dimensions: ThemeDimensions;
  animation: ThemeAnimation;
}

/**
 * Theme Context value
 */
export interface ThemeContextValue {
  theme: Theme;
  isDark: boolean;
  setThemeMode: (mode: 'light' | 'dark' | 'system') => void;
  toggleTheme: () => void;
}

// Create the default theme
const createTheme = (colorScheme: ColorScheme): Theme => ({
  mode: colorScheme.mode,
  colors: colorScheme,
  typography: {
    styles: textStyles,
    matrix: typographyMatrix,
  },
  dimensions: {
    spacing,
    borderRadius,
    borderWidth,
    iconSize,
    avatarSize,
    componentHeight,
    zIndex,
    opacity,
  },
  animation: {
    duration,
    easing,
  },
});

// Default themes
export const lightTheme = createTheme(lightColorScheme);
export const darkTheme = createTheme(darkColorScheme);

// Context
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

/**
 * Theme Provider Props
 */
export interface ThemeProviderProps {
  children: React.ReactNode;
  /** Initial theme mode - defaults to 'system' */
  initialMode?: 'light' | 'dark' | 'system';
  /** Custom light color scheme */
  lightColors?: ColorScheme;
  /** Custom dark color scheme */
  darkColors?: ColorScheme;
}

/**
 * Theme Provider
 *
 * Wraps your app to provide theme values to all components.
 *
 * @example
 * ```tsx
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 * ```
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  initialMode = 'system',
  lightColors = lightColorScheme,
  darkColors = darkColorScheme,
}) => {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeModeState] = useState<'light' | 'dark' | 'system'>(initialMode);

  // Determine actual theme mode
  const resolvedMode = useMemo(() => {
    if (themeMode === 'system') {
      return systemColorScheme === 'dark' ? 'dark' : 'light';
    }
    return themeMode;
  }, [themeMode, systemColorScheme]);

  // Create theme based on resolved mode
  const theme = useMemo(() => {
    const colorScheme = resolvedMode === 'dark' ? darkColors : lightColors;
    return createTheme(colorScheme);
  }, [resolvedMode, lightColors, darkColors]);

  const setThemeMode = useCallback((mode: 'light' | 'dark' | 'system') => {
    setThemeModeState(mode);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeModeState((current) => {
      if (current === 'light') return 'dark';
      if (current === 'dark') return 'light';
      // If system, toggle to opposite of current system preference
      return systemColorScheme === 'dark' ? 'light' : 'dark';
    });
  }, [systemColorScheme]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      isDark: resolvedMode === 'dark',
      setThemeMode,
      toggleTheme,
    }),
    [theme, resolvedMode, setThemeMode, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

/**
 * Hook to access the theme
 *
 * @example
 * ```tsx
 * const { theme, isDark, toggleTheme } = useTheme();
 *
 * return (
 *   <View style={{ backgroundColor: theme.colors.background.primary }}>
 *     <Text style={theme.typography.styles.body}>Hello</Text>
 *   </View>
 * );
 * ```
 */
export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

/**
 * Hook to access only colors (lighter weight)
 */
export const useColors = () => {
  const { theme } = useTheme();
  return theme.colors;
};

/**
 * Hook to access only typography
 */
export const useTypography = () => {
  const { theme } = useTheme();
  return theme.typography;
};

/**
 * Hook to access only dimensions
 */
export const useDimensions = () => {
  const { theme } = useTheme();
  return theme.dimensions;
};

/**
 * SushiTheme - Static accessor for theme values (like Sushi's SushiTheme object)
 * Note: For dynamic theming, use hooks instead.
 */
export const SushiTheme = {
  light: lightTheme,
  dark: darkTheme,
};

export { ThemeContext };
