import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Text } from '../primitives/Text';
import { colors } from '../tokens/colors';
import { spacing } from '../tokens/spacing';
import { borderRadius } from '../tokens/borderRadius';

/**
 * Supported platforms for this component
 * @platform android
 * @platform ios
 * @platform web
 */

type BadgeVariant = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
type BadgeSize = 'sm' | 'md';

export interface BadgeProps {
  /** Badge text */
  label: string;
  /** Badge variant */
  variant?: BadgeVariant;
  /** Badge size */
  size?: BadgeSize;
  /** Custom style */
  style?: ViewStyle;
}

const variantStyles: Record<BadgeVariant, { bg: string; text: string }> = {
  primary: { bg: colors.primary[100], text: colors.primary[700] },
  secondary: { bg: colors.gray[200], text: colors.gray[700] },
  success: { bg: colors.success.light, text: colors.success.dark },
  error: { bg: colors.error.light, text: colors.error.dark },
  warning: { bg: colors.warning.light, text: colors.warning.dark },
  info: { bg: colors.info.light, text: colors.info.dark },
};

const sizeStyles: Record<BadgeSize, ViewStyle & { fontSize: number }> = {
  sm: {
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    fontSize: 10,
  },
  md: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    fontSize: 12,
  },
};

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'primary',
  size = 'md',
  style,
}) => {
  const variantStyle = variantStyles[variant];
  const sizeStyle = sizeStyles[size];

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: variantStyle.bg },
        {
          paddingHorizontal: sizeStyle.paddingHorizontal,
          paddingVertical: sizeStyle.paddingVertical,
        },
        style,
      ]}
    >
      <Text
        variant="labelSmall"
        style={{ color: variantStyle.text, fontSize: sizeStyle.fontSize }}
      >
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    borderRadius: borderRadius.sm,
  },
});

Badge.displayName = 'Badge';
