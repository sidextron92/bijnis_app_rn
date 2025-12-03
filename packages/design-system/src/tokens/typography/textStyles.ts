/**
 * Text Styles - Sushi-inspired Design System
 *
 * Pre-defined text styles combining font size, weight, and line height.
 * Follows Sushi's weight × size matrix pattern.
 */

import { TextStyle } from 'react-native';
import { fontFamily, fontSize, fontWeight, lineHeight, letterSpacing } from './fontTokens';

// Helper to create text style
const createTextStyle = (
  size: number,
  weight: TextStyle['fontWeight'],
  lh: number = lineHeight.normal,
  ls: number = letterSpacing.normal
): TextStyle => ({
  fontSize: size,
  fontWeight: weight,
  lineHeight: size * lh,
  letterSpacing: ls,
  fontFamily: fontFamily.regular,
});

/**
 * Typography Matrix - Weight × Size combinations
 * Pattern: {weight}{size} e.g., regular400, bold700
 */
export const typographyMatrix = {
  // Light weight (300)
  light050: createTextStyle(fontSize['050'], fontWeight.light, lineHeight.normal),
  light100: createTextStyle(fontSize['100'], fontWeight.light, lineHeight.normal),
  light200: createTextStyle(fontSize['200'], fontWeight.light, lineHeight.normal),
  light300: createTextStyle(fontSize['300'], fontWeight.light, lineHeight.normal),
  light400: createTextStyle(fontSize['400'], fontWeight.light, lineHeight.normal),
  light500: createTextStyle(fontSize['500'], fontWeight.light, lineHeight.normal),
  light600: createTextStyle(fontSize['600'], fontWeight.light, lineHeight.snug),
  light700: createTextStyle(fontSize['700'], fontWeight.light, lineHeight.snug),
  light800: createTextStyle(fontSize['800'], fontWeight.light, lineHeight.tight),
  light900: createTextStyle(fontSize['900'], fontWeight.light, lineHeight.tight),

  // Regular weight (400)
  regular050: createTextStyle(fontSize['050'], fontWeight.regular, lineHeight.normal),
  regular100: createTextStyle(fontSize['100'], fontWeight.regular, lineHeight.normal),
  regular200: createTextStyle(fontSize['200'], fontWeight.regular, lineHeight.normal),
  regular300: createTextStyle(fontSize['300'], fontWeight.regular, lineHeight.normal),
  regular400: createTextStyle(fontSize['400'], fontWeight.regular, lineHeight.normal),
  regular500: createTextStyle(fontSize['500'], fontWeight.regular, lineHeight.normal),
  regular600: createTextStyle(fontSize['600'], fontWeight.regular, lineHeight.snug),
  regular700: createTextStyle(fontSize['700'], fontWeight.regular, lineHeight.snug),
  regular800: createTextStyle(fontSize['800'], fontWeight.regular, lineHeight.tight),
  regular900: createTextStyle(fontSize['900'], fontWeight.regular, lineHeight.tight),

  // Medium weight (500)
  medium050: createTextStyle(fontSize['050'], fontWeight.medium, lineHeight.normal),
  medium100: createTextStyle(fontSize['100'], fontWeight.medium, lineHeight.normal),
  medium200: createTextStyle(fontSize['200'], fontWeight.medium, lineHeight.normal),
  medium300: createTextStyle(fontSize['300'], fontWeight.medium, lineHeight.normal),
  medium400: createTextStyle(fontSize['400'], fontWeight.medium, lineHeight.normal),
  medium500: createTextStyle(fontSize['500'], fontWeight.medium, lineHeight.normal),
  medium600: createTextStyle(fontSize['600'], fontWeight.medium, lineHeight.snug),
  medium700: createTextStyle(fontSize['700'], fontWeight.medium, lineHeight.snug),
  medium800: createTextStyle(fontSize['800'], fontWeight.medium, lineHeight.tight),
  medium900: createTextStyle(fontSize['900'], fontWeight.medium, lineHeight.tight),

  // Semibold weight (600)
  semibold050: createTextStyle(fontSize['050'], fontWeight.semibold, lineHeight.normal),
  semibold100: createTextStyle(fontSize['100'], fontWeight.semibold, lineHeight.normal),
  semibold200: createTextStyle(fontSize['200'], fontWeight.semibold, lineHeight.normal),
  semibold300: createTextStyle(fontSize['300'], fontWeight.semibold, lineHeight.normal),
  semibold400: createTextStyle(fontSize['400'], fontWeight.semibold, lineHeight.normal),
  semibold500: createTextStyle(fontSize['500'], fontWeight.semibold, lineHeight.normal),
  semibold600: createTextStyle(fontSize['600'], fontWeight.semibold, lineHeight.snug),
  semibold700: createTextStyle(fontSize['700'], fontWeight.semibold, lineHeight.snug),
  semibold800: createTextStyle(fontSize['800'], fontWeight.semibold, lineHeight.tight),
  semibold900: createTextStyle(fontSize['900'], fontWeight.semibold, lineHeight.tight),

  // Bold weight (700)
  bold050: createTextStyle(fontSize['050'], fontWeight.bold, lineHeight.normal),
  bold100: createTextStyle(fontSize['100'], fontWeight.bold, lineHeight.normal),
  bold200: createTextStyle(fontSize['200'], fontWeight.bold, lineHeight.normal),
  bold300: createTextStyle(fontSize['300'], fontWeight.bold, lineHeight.normal),
  bold400: createTextStyle(fontSize['400'], fontWeight.bold, lineHeight.normal),
  bold500: createTextStyle(fontSize['500'], fontWeight.bold, lineHeight.normal),
  bold600: createTextStyle(fontSize['600'], fontWeight.bold, lineHeight.snug),
  bold700: createTextStyle(fontSize['700'], fontWeight.bold, lineHeight.snug),
  bold800: createTextStyle(fontSize['800'], fontWeight.bold, lineHeight.tight),
  bold900: createTextStyle(fontSize['900'], fontWeight.bold, lineHeight.tight),

  // Extrabold weight (800)
  extrabold050: createTextStyle(fontSize['050'], fontWeight.extrabold, lineHeight.normal),
  extrabold100: createTextStyle(fontSize['100'], fontWeight.extrabold, lineHeight.normal),
  extrabold200: createTextStyle(fontSize['200'], fontWeight.extrabold, lineHeight.normal),
  extrabold300: createTextStyle(fontSize['300'], fontWeight.extrabold, lineHeight.normal),
  extrabold400: createTextStyle(fontSize['400'], fontWeight.extrabold, lineHeight.normal),
  extrabold500: createTextStyle(fontSize['500'], fontWeight.extrabold, lineHeight.normal),
  extrabold600: createTextStyle(fontSize['600'], fontWeight.extrabold, lineHeight.snug),
  extrabold700: createTextStyle(fontSize['700'], fontWeight.extrabold, lineHeight.snug),
  extrabold800: createTextStyle(fontSize['800'], fontWeight.extrabold, lineHeight.tight),
  extrabold900: createTextStyle(fontSize['900'], fontWeight.extrabold, lineHeight.tight),
} as const;

/**
 * Semantic Text Styles - Named styles for common use cases
 */
export const textStyles = {
  // Display styles (large headlines)
  displayLarge: {
    ...typographyMatrix.bold900,
    letterSpacing: letterSpacing.tight,
  },
  displayMedium: {
    ...typographyMatrix.bold800,
    letterSpacing: letterSpacing.tight,
  },
  displaySmall: {
    ...typographyMatrix.bold700,
    letterSpacing: letterSpacing.tight,
  },

  // Headings
  h1: typographyMatrix.bold800,
  h2: typographyMatrix.bold700,
  h3: typographyMatrix.semibold600,
  h4: typographyMatrix.semibold500,
  h5: typographyMatrix.semibold400,
  h6: typographyMatrix.semibold300,

  // Body text
  bodyLarge: typographyMatrix.regular500,
  body: typographyMatrix.regular400,
  bodySmall: typographyMatrix.regular300,

  // Labels
  labelLarge: typographyMatrix.medium500,
  label: typographyMatrix.medium400,
  labelSmall: typographyMatrix.medium300,

  // Captions
  caption: typographyMatrix.regular200,
  captionSmall: typographyMatrix.regular100,

  // Buttons
  buttonLarge: {
    ...typographyMatrix.semibold500,
    letterSpacing: letterSpacing.wide,
  },
  button: {
    ...typographyMatrix.semibold400,
    letterSpacing: letterSpacing.wide,
  },
  buttonSmall: {
    ...typographyMatrix.semibold300,
    letterSpacing: letterSpacing.wide,
  },

  // Links
  link: {
    ...typographyMatrix.regular400,
    textDecorationLine: 'underline' as const,
  },
  linkSmall: {
    ...typographyMatrix.regular300,
    textDecorationLine: 'underline' as const,
  },

  // Code/Monospace
  code: {
    ...typographyMatrix.regular400,
    fontFamily: fontFamily.mono,
  },
  codeSmall: {
    ...typographyMatrix.regular300,
    fontFamily: fontFamily.mono,
  },

  // Overline (small caps style)
  overline: {
    ...typographyMatrix.semibold100,
    letterSpacing: letterSpacing.wider,
    textTransform: 'uppercase' as const,
  },
} as const;

export type TypographyMatrixKey = keyof typeof typographyMatrix;
export type TextStyleKey = keyof typeof textStyles;
