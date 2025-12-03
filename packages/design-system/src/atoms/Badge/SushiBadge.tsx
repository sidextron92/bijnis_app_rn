/**
 * SushiBadge - Badge Component
 *
 * A theme-aware badge/indicator component.
 *
 * @platform android
 * @platform ios
 * @platform web
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../theme';
import { SushiText } from '../Text/SushiText';
import { spacing, borderRadius } from '../../tokens/dimensions';

/**
 * Badge variants
 */
export type BadgeVariant = 'solid' | 'outline' | 'subtle';

/**
 * Badge sizes
 */
export type BadgeSize = 'sm' | 'md' | 'lg';

/**
 * Badge color schemes
 */
export type BadgeColorScheme =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';

/**
 * SushiBadge Props
 */
export interface SushiBadgeProps {
  /** Badge content (number or text) */
  content?: string | number;
  /** Badge variant */
  variant?: BadgeVariant;
  /** Badge size */
  size?: BadgeSize;
  /** Color scheme */
  colorScheme?: BadgeColorScheme;
  /** Show as dot (no content) */
  dot?: boolean;
  /** Maximum number (shows 99+ if exceeded) */
  max?: number;
  /** Hide badge */
  hidden?: boolean;
  /** Standalone badge (not positioned) */
  standalone?: boolean;
  /** Children to wrap (for positioned badge) */
  children?: React.ReactNode;
  /** Position when wrapping children */
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  /** Offset from edge */
  offset?: number;
  /** Container style */
  style?: ViewStyle;
}

/**
 * Size configurations
 */
const sizeConfig: Record<BadgeSize, { height: number; minWidth: number; fontSize: number; dotSize: number }> = {
  sm: { height: 16, minWidth: 16, fontSize: 10, dotSize: 6 },
  md: { height: 20, minWidth: 20, fontSize: 11, dotSize: 8 },
  lg: { height: 24, minWidth: 24, fontSize: 12, dotSize: 10 },
};

/**
 * SushiBadge Component
 *
 * @example
 * ```tsx
 * // Standalone badge
 * <SushiBadge content="New" colorScheme="primary" />
 *
 * // Numeric badge
 * <SushiBadge content={5} colorScheme="error" />
 *
 * // Badge wrapping an icon
 * <SushiBadge content={3}>
 *   <BellIcon />
 * </SushiBadge>
 *
 * // Dot indicator
 * <SushiBadge dot colorScheme="success">
 *   <Avatar />
 * </SushiBadge>
 * ```
 */
export const SushiBadge: React.FC<SushiBadgeProps> = ({
  content,
  variant = 'solid',
  size = 'md',
  colorScheme = 'error',
  dot = false,
  max = 99,
  hidden = false,
  standalone = false,
  children,
  position = 'top-right',
  offset = 0,
  style,
}) => {
  const { theme } = useTheme();
  const config = sizeConfig[size];

  // Don't render if hidden
  if (hidden) {
    return children ? <>{children}</> : null;
  }

  // Get colors based on variant and color scheme
  const getColors = () => {
    const colors = theme.colors;
    const palette = colors.palette;

    const schemeColors: Record<BadgeColorScheme, { bg: string; border: string; text: string }> = {
      default: {
        bg: colors.background.secondary,
        border: colors.border.default,
        text: colors.text.primary,
      },
      primary: {
        bg: colors.interactive.primary,
        border: colors.interactive.primary,
        text: colors.text.inverse,
      },
      success: {
        bg: colors.background.success,
        border: colors.background.success,
        text: colors.text.inverse,
      },
      warning: {
        bg: colors.background.warning,
        border: colors.background.warning,
        text: palette.yellow[900],
      },
      error: {
        bg: colors.background.error,
        border: colors.background.error,
        text: colors.text.inverse,
      },
      info: {
        bg: colors.background.info,
        border: colors.background.info,
        text: colors.text.inverse,
      },
    };

    return schemeColors[colorScheme];
  };

  const schemeColors = getColors();

  // Get badge style
  const getBadgeStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: borderRadius.full,
    };

    if (dot) {
      return {
        ...baseStyle,
        width: config.dotSize,
        height: config.dotSize,
        backgroundColor: schemeColors.bg,
      };
    }

    switch (variant) {
      case 'solid':
        return {
          ...baseStyle,
          height: config.height,
          minWidth: config.minWidth,
          paddingHorizontal: spacing.xs,
          backgroundColor: schemeColors.bg,
        };
      case 'outline':
        return {
          ...baseStyle,
          height: config.height,
          minWidth: config.minWidth,
          paddingHorizontal: spacing.xs,
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: schemeColors.border,
        };
      case 'subtle':
        return {
          ...baseStyle,
          height: config.height,
          minWidth: config.minWidth,
          paddingHorizontal: spacing.xs,
          backgroundColor: schemeColors.bg,
          opacity: 0.8,
        };
      default:
        return baseStyle;
    }
  };

  // Format content
  const getContent = () => {
    if (dot || content === undefined) return null;
    if (typeof content === 'number' && content > max) {
      return `${max}+`;
    }
    return String(content);
  };

  const displayContent = getContent();

  // Badge element
  const badge = (
    <View style={[getBadgeStyle(), style]}>
      {displayContent && (
        <SushiText
          variant="caption"
          customColor={variant === 'outline' ? schemeColors.border : schemeColors.text}
          style={{ fontSize: config.fontSize, lineHeight: config.fontSize * 1.2 }}
        >
          {displayContent}
        </SushiText>
      )}
    </View>
  );

  // Standalone badge
  if (standalone || !children) {
    return badge;
  }

  // Get position style
  const getPositionStyle = (): ViewStyle => {
    const positionStyles: Record<string, ViewStyle> = {
      'top-right': { top: -config.height / 2 + offset, right: -config.minWidth / 2 + offset },
      'top-left': { top: -config.height / 2 + offset, left: -config.minWidth / 2 + offset },
      'bottom-right': { bottom: -config.height / 2 + offset, right: -config.minWidth / 2 + offset },
      'bottom-left': { bottom: -config.height / 2 + offset, left: -config.minWidth / 2 + offset },
    };
    return positionStyles[position];
  };

  // Positioned badge wrapping children
  return (
    <View style={styles.wrapper}>
      {children}
      <View style={[styles.positioned, getPositionStyle()]}>{badge}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
  },
  positioned: {
    position: 'absolute',
    zIndex: 1,
  },
});

SushiBadge.displayName = 'SushiBadge';
