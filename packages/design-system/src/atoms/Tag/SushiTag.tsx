/**
 * SushiTag - Tag/Chip Component
 *
 * A theme-aware tag/chip component for labels, filters, and selections.
 *
 * @platform android
 * @platform ios
 * @platform web
 */

import React from 'react';
import { View, Pressable, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../theme';
import { SushiText } from '../Text/SushiText';
import { spacing, borderRadius, borderWidth } from '../../tokens/dimensions';

/**
 * Tag variants
 */
export type TagVariant = 'filled' | 'outlined' | 'subtle';

/**
 * Tag sizes
 */
export type TagSize = 'sm' | 'md' | 'lg';

/**
 * Tag color schemes
 */
export type TagColorScheme =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';

/**
 * SushiTag Props
 */
export interface SushiTagProps {
  /** Tag text */
  label: string;
  /** Tag variant */
  variant?: TagVariant;
  /** Tag size */
  size?: TagSize;
  /** Color scheme */
  colorScheme?: TagColorScheme;
  /** Left icon */
  leftIcon?: React.ReactNode;
  /** Right icon (often close button) */
  rightIcon?: React.ReactNode;
  /** Press handler (makes tag interactive) */
  onPress?: () => void;
  /** Close handler */
  onClose?: () => void;
  /** Selected state */
  selected?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Container style */
  style?: ViewStyle;
}

/**
 * Size configurations
 */
const sizeConfig: Record<TagSize, { height: number; paddingHorizontal: number; fontSize: number }> = {
  sm: { height: 24, paddingHorizontal: spacing.sm, fontSize: 11 },
  md: { height: 28, paddingHorizontal: spacing.md, fontSize: 12 },
  lg: { height: 32, paddingHorizontal: spacing.lg, fontSize: 13 },
};

/**
 * SushiTag Component
 *
 * @example
 * ```tsx
 * // Basic tag
 * <SushiTag label="New" colorScheme="primary" />
 *
 * // Outlined tag
 * <SushiTag label="Filter" variant="outlined" />
 *
 * // With close button
 * <SushiTag
 *   label="Selected"
 *   onClose={() => handleRemove()}
 *   rightIcon={<CloseIcon />}
 * />
 *
 * // Selectable tag
 * <SushiTag
 *   label="Option"
 *   selected={isSelected}
 *   onPress={() => setSelected(!isSelected)}
 * />
 * ```
 */
export const SushiTag: React.FC<SushiTagProps> = ({
  label,
  variant = 'filled',
  size = 'md',
  colorScheme = 'default',
  leftIcon,
  rightIcon,
  onPress,
  onClose,
  selected = false,
  disabled = false,
  style,
}) => {
  const { theme } = useTheme();
  const config = sizeConfig[size];

  // Get colors based on variant and color scheme
  const getColors = () => {
    const colors = theme.colors;
    const palette = colors.palette;

    const schemeColors: Record<TagColorScheme, { bg: string; border: string; text: string }> = {
      default: {
        bg: colors.background.secondary,
        border: colors.border.default,
        text: colors.text.primary,
      },
      primary: {
        bg: colors.background.brandSubtle,
        border: palette.brandGreen[300],
        text: palette.brandGreen[700],
      },
      success: {
        bg: colors.background.successSubtle,
        border: palette.green[300],
        text: palette.green[700],
      },
      warning: {
        bg: colors.background.warningSubtle,
        border: palette.yellow[400],
        text: palette.yellow[800],
      },
      error: {
        bg: colors.background.errorSubtle,
        border: palette.red[300],
        text: palette.red[700],
      },
      info: {
        bg: colors.background.infoSubtle,
        border: palette.blue[300],
        text: palette.blue[700],
      },
    };

    return schemeColors[colorScheme];
  };

  const schemeColors = getColors();

  // Get variant styles
  const getVariantStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      height: config.height,
      paddingHorizontal: config.paddingHorizontal,
      borderRadius: borderRadius.full,
      flexDirection: 'row',
      alignItems: 'center',
    };

    if (selected) {
      return {
        ...baseStyle,
        backgroundColor: theme.colors.interactive.primary,
        borderWidth: borderWidth.thin,
        borderColor: theme.colors.interactive.primary,
      };
    }

    switch (variant) {
      case 'filled':
        return {
          ...baseStyle,
          backgroundColor: schemeColors.bg,
        };
      case 'outlined':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderWidth: borderWidth.thin,
          borderColor: schemeColors.border,
        };
      case 'subtle':
        return {
          ...baseStyle,
          backgroundColor: schemeColors.bg,
          opacity: 0.8,
        };
      default:
        return baseStyle;
    }
  };

  // Get text color
  const getTextColor = () => {
    if (disabled) return theme.colors.text.disabled;
    if (selected) return theme.colors.text.inverse;
    return schemeColors.text;
  };

  const content = (
    <>
      {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
      <SushiText
        variant="labelSmall"
        customColor={getTextColor()}
        style={{ fontSize: config.fontSize }}
      >
        {label}
      </SushiText>
      {(rightIcon || onClose) && (
        <Pressable
          onPress={onClose}
          disabled={disabled}
          style={styles.rightIcon}
          hitSlop={{ top: 8, bottom: 8, left: 4, right: 8 }}
        >
          {rightIcon}
        </Pressable>
      )}
    </>
  );

  if (onPress) {
    return (
      <Pressable
        style={({ pressed }) => [
          getVariantStyle(),
          pressed && styles.pressed,
          disabled && styles.disabled,
          style,
        ]}
        onPress={onPress}
        disabled={disabled}
        accessibilityRole="button"
      >
        {content}
      </Pressable>
    );
  }

  return (
    <View style={[getVariantStyle(), disabled && styles.disabled, style]}>
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  leftIcon: {
    marginRight: spacing.xs,
  },
  rightIcon: {
    marginLeft: spacing.xs,
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    opacity: 0.5,
  },
});

SushiTag.displayName = 'SushiTag';
