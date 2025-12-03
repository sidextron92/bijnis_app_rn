/**
 * Sushi Design System for React Native
 *
 * A comprehensive, theme-aware design system inspired by Zomato's Sushi.
 *
 * @example
 * ```tsx
 * import { ThemeProvider, Button, Text, useTheme } from '@repo/design-system';
 *
 * function App() {
 *   return (
 *     <ThemeProvider>
 *       <MyApp />
 *     </ThemeProvider>
 *   );
 * }
 *
 * function MyApp() {
 *   const { theme, toggleTheme } = useTheme();
 *   return (
 *     <View style={{ backgroundColor: theme.colors.background.primary }}>
 *       <Text variant="h1">Hello Sushi!</Text>
 *       <Button title="Toggle Theme" onPress={toggleTheme} />
 *     </View>
 *   );
 * }
 * ```
 */

// ============================================
// Theme
// ============================================
export * from './theme';

// ============================================
// Tokens
// ============================================
export * from './tokens';

// ============================================
// Atoms (Basic Components)
// ============================================
export * from './atoms';

// ============================================
// Legacy Primitives (for backward compatibility)
// ============================================
export * from './primitives';

// ============================================
// Legacy Elements (for backward compatibility)
// ============================================
export * from './elements';

// ============================================
// Legacy Components (for backward compatibility)
// ============================================
export * from './components';
