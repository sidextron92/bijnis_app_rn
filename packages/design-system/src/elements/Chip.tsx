import React from 'react';
import { Pressable, StyleSheet, ViewStyle, PressableProps } from 'react-native';
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

type ChipVariant = 'filled' | 'outlined';

export interface ChipProps extends Omit<PressableProps, 'style'> {
  /** Chip label */
  label: string;
  /** Chip variant */
  variant?: ChipVariant;
  /** Selected state */
  selected?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Left icon */
  leftIcon?: React.ReactNode;
  /** Right icon (usually close) */
  rightIcon?: React.ReactNode;
  /** Custom style */
  style?: ViewStyle;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  variant = 'outlined',
  selected = false,
  disabled = false,
  leftIcon,
  rightIcon,
  style,
  ...props
}) => {
  const getContainerStyle = (): ViewStyle => {
    if (selected) {
      return {
        backgroundColor: colors.primary[500],
        borderColor: colors.primary[500],
      };
    }

    if (variant === 'filled') {
      return {
        backgroundColor: colors.gray[100],
        borderColor: colors.gray[100],
      };
    }

    return {
      backgroundColor: 'transparent',
      borderColor: colors.border.medium,
    };
  };

  const getTextColor = () => {
    if (selected) return 'inverse';
    return 'primary';
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        getContainerStyle(),
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
      disabled={disabled}
      {...props}
    >
      {leftIcon && <>{leftIcon}</>}
      <Text
        variant="labelSmall"
        color={getTextColor()}
        style={[leftIcon && styles.textWithLeftIcon, rightIcon && styles.textWithRightIcon]}
      >
        {label}
      </Text>
      {rightIcon && <>{rightIcon}</>}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius['2xl'],
    borderWidth: 1,
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    opacity: 0.5,
  },
  textWithLeftIcon: {
    marginLeft: spacing.xs,
  },
  textWithRightIcon: {
    marginRight: spacing.xs,
  },
});

Chip.displayName = 'Chip';
