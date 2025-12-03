/**
 * Raw Color Tokens - Sushi-inspired Design System
 *
 * Full color palette with 050-900 shades for each color family.
 * Inspired by Zomato's Sushi design system.
 */

// Neutral Colors
export const neutral = {
  black: '#1C1C1C',
  white: '#FFFFFF',
  transparent: 'transparent',
} as const;

// Gray Scale (050-900)
export const gray = {
  50: '#F8F9FC',
  100: '#F2F4F7',
  200: '#E6E9EF',
  300: '#D0D4DC',
  400: '#AFB4C0',
  500: '#9197A6',
  600: '#767C8F',
  700: '#596378',
  800: '#414A5D',
  900: '#293142',
} as const;

// Primary - Brand Green (Brand color)
export const brandGreen = {
  50: '#E6F4E9',
  100: '#C2E4C9',
  200: '#9AD3A5',
  300: '#71C281',
  400: '#48B15D',
  500: '#058234', // Main brand color
  600: '#04762E',
  700: '#036125',
  800: '#024C1D',
  900: '#013714',
} as const;

// Red
export const red = {
  50: '#FFF6F7',
  100: '#FFE5E7',
  200: '#FFCCD0',
  300: '#FFA3AA',
  400: '#FF7A85',
  500: '#E63946', // Main red
  600: '#CF4A57',
  700: '#B8303D',
  800: '#8B2530',
  900: '#2E191B',
} as const;

// Green
export const green = {
  50: '#EDFAF1',
  100: '#D1F2DC',
  200: '#A3E5B9',
  300: '#75D896',
  400: '#47CB73',
  500: '#2E9E53', // Main green
  600: '#258544',
  700: '#1C6B35',
  800: '#165229',
  900: '#15281D',
} as const;

// Blue
export const blue = {
  50: '#EFF4FE',
  100: '#D9E5FC',
  200: '#B3CBF9',
  300: '#8DB1F6',
  400: '#6797F3',
  500: '#2563EB', // Main blue
  600: '#1D4FBF',
  700: '#163B93',
  800: '#0F2867',
  900: '#122340',
} as const;

// Yellow
export const yellow = {
  50: '#FFF9E5',
  100: '#FFF0BF',
  200: '#FFE699',
  300: '#FFD966',
  400: '#FFCC33',
  500: '#F5B800', // Main yellow
  600: '#D6A600',
  700: '#A68100',
  800: '#705700',
  900: '#393218',
} as const;

// Purple
export const purple = {
  50: '#F5F3FF',
  100: '#EDE9FE',
  200: '#DDD6FE',
  300: '#C4B5FD',
  400: '#A78BFA',
  500: '#8B5CF6', // Main purple
  600: '#7C3AED',
  700: '#6D28D9',
  800: '#5B21B6',
  900: '#4C1D95',
} as const;

// Teal
export const teal = {
  50: '#F0FDFA',
  100: '#CCFBF1',
  200: '#99F6E4',
  300: '#5EEAD4',
  400: '#2DD4BF',
  500: '#14B8A6', // Main teal
  600: '#0D9488',
  700: '#0F766E',
  800: '#115E59',
  900: '#134E4A',
} as const;

// Pink
export const pink = {
  50: '#FDF2F8',
  100: '#FCE7F3',
  200: '#FBCFE8',
  300: '#F9A8D4',
  400: '#F472B6',
  500: '#EC4899', // Main pink
  600: '#DB2777',
  700: '#BE185D',
  800: '#9D174D',
  900: '#831843',
} as const;

// Indigo
export const indigo = {
  50: '#EEF2FF',
  100: '#E0E7FF',
  200: '#C7D2FE',
  300: '#A5B4FC',
  400: '#818CF8',
  500: '#6366F1', // Main indigo
  600: '#4F46E5',
  700: '#4338CA',
  800: '#3730A3',
  900: '#312E81',
} as const;

// Lime
export const lime = {
  50: '#F7FEE7',
  100: '#ECFCCB',
  200: '#D9F99D',
  300: '#BEF264',
  400: '#A3E635',
  500: '#97C24E', // Main lime
  600: '#5E7A2C',
  700: '#4D7C0F',
  800: '#3F6212',
  900: '#2A331B',
} as const;

// Amber
export const amber = {
  50: '#FFFBEB',
  100: '#FEF3C7',
  200: '#FDE68A',
  300: '#FCD34D',
  400: '#FBBF24',
  500: '#F59E0B', // Main amber
  600: '#D97706',
  700: '#B45309',
  800: '#92400E',
  900: '#78350F',
} as const;

// Slate (for backgrounds and surfaces)
export const slate = {
  50: '#F8FAFC',
  100: '#F1F5F9',
  200: '#E2E8F0',
  300: '#CBD5E1',
  400: '#94A3B8',
  500: '#64748B',
  600: '#475569',
  700: '#334155',
  800: '#1E293B',
  900: '#0F172A',
} as const;

// Rating colors (Sushi-specific)
export const rating = {
  1: '#CF4A57', // Red 600
  2: '#D6A600', // Yellow 500
  3: '#97C24E', // Lime 500
  4: '#5E7A2C', // Lime 700
  5: '#2A331B', // Lime 900
  unchecked: '#9197A6', // Gray 500
} as const;

// Export all raw color tokens
export const rawColorTokens = {
  neutral,
  gray,
  brandGreen,
  red,
  green,
  blue,
  yellow,
  purple,
  teal,
  pink,
  indigo,
  lime,
  amber,
  slate,
  rating,
} as const;

export type RawColorTokens = typeof rawColorTokens;
