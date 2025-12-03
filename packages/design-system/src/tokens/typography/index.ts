/**
 * Typography Index - Sushi Design System
 */

export * from './fontTokens';
export * from './textStyles';

// Re-export commonly used items
export { fontFamily, fontSize, fontWeight, lineHeight, letterSpacing } from './fontTokens';
export { typographyMatrix, textStyles } from './textStyles';
export type { FontSizeKey, FontWeightKey, TypographyMatrixKey, TextStyleKey } from './textStyles';

// Legacy compatibility: export textVariants (alias for textStyles)
export { textStyles as textVariants } from './textStyles';
export type { TextStyleKey as TextVariant } from './textStyles';
