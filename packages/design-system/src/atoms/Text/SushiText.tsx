/**
 * SushiText - Text Component
 *
 * A theme-aware text component that supports all typography variants.
 *
 * @platform android
 * @platform ios
 * @platform web
 */

import React from 'react';
import { Text as RNText, TextProps as RNTextProps, TextStyle } from 'react-native';
import { useTheme } from '../../theme';
import { TextStyleKey, TypographyMatrixKey, textStyles, typographyMatrix } from '../../tokens/typography';

/**
 * Text color options
 */
type TextColorToken =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'disabled'
  | 'inverse'
  | 'brand'
  | 'success'
  | 'error'
  | 'warning'
  | 'info'
  | 'link';

/**
 * SushiText Props
 */
export interface SushiTextProps extends Omit<RNTextProps, 'style'> {
  /** Pre-defined text style variant */
  variant?: TextStyleKey;
  /** Typography matrix style (e.g., 'bold700', 'regular400') */
  typography?: TypographyMatrixKey;
  /** Text color from theme */
  color?: TextColorToken;
  /** Custom color override (hex or theme color) */
  customColor?: string;
  /** Text alignment */
  align?: 'left' | 'center' | 'right' | 'justify';
  /** Number of lines before truncating */
  numberOfLines?: number;
  /** Selectable text */
  selectable?: boolean;
  /** Additional style overrides */
  style?: TextStyle;
  /** Children content */
  children: React.ReactNode;
}

/**
 * SushiText Component
 *
 * @example
 * ```tsx
 * // Using semantic variants
 * <SushiText variant="h1">Heading</SushiText>
 * <SushiText variant="body" color="secondary">Body text</SushiText>
 *
 * // Using typography matrix
 * <SushiText typography="bold700">Bold Large</SushiText>
 *
 * // Custom styling
 * <SushiText variant="label" color="brand" align="center">
 *   Centered Label
 * </SushiText>
 * ```
 */
export const SushiText: React.FC<SushiTextProps> = ({
  variant = 'body',
  typography,
  color = 'primary',
  customColor,
  align,
  numberOfLines,
  selectable = false,
  style,
  children,
  ...props
}) => {
  const { theme } = useTheme();

  // Get base typography style
  const baseTypographyStyle: TextStyle = typography
    ? typographyMatrix[typography]
    : textStyles[variant];

  // Get color from theme
  const textColor = customColor || theme.colors.text[color];

  // Compose final style
  const composedStyle: TextStyle = {
    ...baseTypographyStyle,
    color: textColor,
    textAlign: align,
  };

  return (
    <RNText
      style={[composedStyle, style]}
      numberOfLines={numberOfLines}
      selectable={selectable}
      {...props}
    >
      {children}
    </RNText>
  );
};

SushiText.displayName = 'SushiText';

/**
 * Preset text components for common use cases
 */

// Headings
export const H1: React.FC<Omit<SushiTextProps, 'variant'>> = (props) => (
  <SushiText variant="h1" {...props} />
);
H1.displayName = 'H1';

export const H2: React.FC<Omit<SushiTextProps, 'variant'>> = (props) => (
  <SushiText variant="h2" {...props} />
);
H2.displayName = 'H2';

export const H3: React.FC<Omit<SushiTextProps, 'variant'>> = (props) => (
  <SushiText variant="h3" {...props} />
);
H3.displayName = 'H3';

export const H4: React.FC<Omit<SushiTextProps, 'variant'>> = (props) => (
  <SushiText variant="h4" {...props} />
);
H4.displayName = 'H4';

// Body
export const Body: React.FC<Omit<SushiTextProps, 'variant'>> = (props) => (
  <SushiText variant="body" {...props} />
);
Body.displayName = 'Body';

export const BodySmall: React.FC<Omit<SushiTextProps, 'variant'>> = (props) => (
  <SushiText variant="bodySmall" {...props} />
);
BodySmall.displayName = 'BodySmall';

// Labels
export const Label: React.FC<Omit<SushiTextProps, 'variant'>> = (props) => (
  <SushiText variant="label" {...props} />
);
Label.displayName = 'Label';

// Caption
export const Caption: React.FC<Omit<SushiTextProps, 'variant'>> = (props) => (
  <SushiText variant="caption" color="secondary" {...props} />
);
Caption.displayName = 'Caption';
