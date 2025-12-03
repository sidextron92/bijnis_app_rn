/**
 * Tokens Index - Sushi Design System
 *
 * Design tokens are the foundational values of the design system.
 */

// Colors (new Sushi structure)
export * from './colors';

// Typography (new Sushi structure)
export * from './typography';

// Dimensions (spacing, radius, etc.)
export * from './dimensions';

// Legacy tokens (backward compatibility)
export * from './legacyColors';
export * from './legacyTypography';

// Legacy re-exports for backward compatibility
export { lightColorScheme as colors } from './colors';
export { spacing, borderRadius, getSpacing, getBorderRadius } from './dimensions';
export {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  textStyles as textVariants,
} from './typography';
