import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet, TextStyle } from 'react-native';
import { colors } from '../tokens/colors';
import { textVariants, fontFamily, fontWeight as fontWeights, TextVariant } from '../tokens/typography';

/**
 * Supported platforms for this component
 * @platform android
 * @platform ios
 * @platform web
 */

type TextColor = 'primary' | 'secondary' | 'disabled' | 'inverse' | 'error' | 'success' | 'warning';

export interface TextProps extends RNTextProps {
  /** Text variant from design system */
  variant?: TextVariant;
  /** Text color */
  color?: TextColor;
  /** Font weight override */
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
  /** Children content */
  children: React.ReactNode;
}

const colorMap: Record<TextColor, string> = {
  primary: colors.text.primary,
  secondary: colors.text.secondary,
  disabled: colors.text.disabled,
  inverse: colors.text.inverse,
  error: colors.error.main,
  success: colors.success.main,
  warning: colors.warning.main,
};

export const Text: React.FC<TextProps> = ({
  variant = 'body',
  color = 'primary',
  weight,
  align,
  style,
  children,
  ...props
}) => {
  const variantStyle = textVariants[variant];

  const textStyle: TextStyle = {
    ...variantStyle,
    color: colorMap[color],
    fontFamily: weight ? fontFamily[weight] : fontFamily.regular,
    fontWeight: weight ? fontWeights[weight] : variantStyle.fontWeight,
    textAlign: align,
  };

  return (
    <RNText style={[styles.base, textStyle, style]} {...props}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  base: {
    fontFamily: fontFamily.regular,
  },
});

Text.displayName = 'Text';
