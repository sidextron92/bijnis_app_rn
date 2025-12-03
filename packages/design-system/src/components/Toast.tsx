import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Text } from '../primitives/Text';
import { colors } from '../tokens/colors';
import { spacing } from '../tokens/spacing';
import { borderRadius } from '../tokens/borderRadius';
import { shadows } from '../tokens/shadows';

/**
 * Supported platforms for this component
 * @platform android
 * @platform ios
 * @platform web
 */

type ToastVariant = 'info' | 'success' | 'warning' | 'error';

export interface ToastProps {
  /** Toast message */
  message: string;
  /** Toast variant */
  variant?: ToastVariant;
  /** Action button text */
  actionText?: string;
  /** Action button handler */
  onAction?: () => void;
  /** Custom style */
  style?: ViewStyle;
}

const variantStyles: Record<ToastVariant, { bg: string; text: string; icon: string }> = {
  info: {
    bg: colors.gray[800],
    text: colors.white,
    icon: colors.info.main,
  },
  success: {
    bg: colors.success.dark,
    text: colors.white,
    icon: colors.success.light,
  },
  warning: {
    bg: colors.warning.dark,
    text: colors.text.primary,
    icon: colors.warning.light,
  },
  error: {
    bg: colors.error.dark,
    text: colors.white,
    icon: colors.error.light,
  },
};

export const Toast: React.FC<ToastProps> = ({
  message,
  variant = 'info',
  actionText,
  onAction,
  style,
}) => {
  const variantStyle = variantStyles[variant];

  return (
    <View style={[styles.container, { backgroundColor: variantStyle.bg }, style]}>
      <Text
        variant="body"
        style={[styles.message, { color: variantStyle.text }]}
        numberOfLines={2}
      >
        {message}
      </Text>

      {actionText && onAction && (
        <Text
          variant="button"
          style={styles.action}
          onPress={onAction}
        >
          {actionText}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    ...shadows.lg,
    marginHorizontal: spacing.lg,
  },
  message: {
    flex: 1,
  },
  action: {
    color: colors.primary[300],
    marginLeft: spacing.md,
  },
});

Toast.displayName = 'Toast';
