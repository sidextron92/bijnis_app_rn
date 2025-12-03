/**
 * SushiDivider - Divider/Separator Component
 *
 * A theme-aware divider component.
 *
 * @platform android
 * @platform ios
 * @platform web
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../theme';
import { SushiText } from '../Text/SushiText';
import { spacing } from '../../tokens/dimensions';

/**
 * Divider orientation
 */
export type DividerOrientation = 'horizontal' | 'vertical';

/**
 * Divider variants
 */
export type DividerVariant = 'solid' | 'dashed' | 'dotted';

/**
 * SushiDivider Props
 */
export interface SushiDividerProps {
  /** Orientation */
  orientation?: DividerOrientation;
  /** Variant */
  variant?: DividerVariant;
  /** Thickness */
  thickness?: number;
  /** Color */
  color?: 'default' | 'subtle' | 'strong';
  /** Custom color */
  customColor?: string;
  /** Spacing above/below or left/right */
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  /** Center text/content */
  children?: React.ReactNode;
  /** Text position (when children provided) */
  textPosition?: 'start' | 'center' | 'end';
  /** Container style */
  style?: ViewStyle;
}

/**
 * Spacing map
 */
const spacingMap = {
  none: 0,
  sm: spacing.sm,
  md: spacing.md,
  lg: spacing.lg,
};

/**
 * SushiDivider Component
 *
 * @example
 * ```tsx
 * // Simple divider
 * <SushiDivider />
 *
 * // With spacing
 * <SushiDivider spacing="md" />
 *
 * // Vertical divider
 * <SushiDivider orientation="vertical" />
 *
 * // With text
 * <SushiDivider>OR</SushiDivider>
 * ```
 */
export const SushiDivider: React.FC<SushiDividerProps> = ({
  orientation = 'horizontal',
  variant = 'solid',
  thickness = 1,
  color = 'default',
  customColor,
  spacing: dividerSpacing = 'none',
  children,
  textPosition = 'center',
  style,
}) => {
  const { theme } = useTheme();

  // Get border color
  const getBorderColor = () => {
    if (customColor) return customColor;
    switch (color) {
      case 'default':
        return theme.colors.border.default;
      case 'subtle':
        return theme.colors.border.subtle;
      case 'strong':
        return theme.colors.border.strong;
      default:
        return theme.colors.border.default;
    }
  };

  // Get border style
  const getBorderStyle = () => {
    switch (variant) {
      case 'solid':
        return 'solid';
      case 'dashed':
        return 'dashed';
      case 'dotted':
        return 'dotted';
      default:
        return 'solid';
    }
  };

  const borderColor = getBorderColor();
  const borderStyle = getBorderStyle();
  const spacingValue = spacingMap[dividerSpacing];

  // Horizontal divider
  if (orientation === 'horizontal') {
    // With children (text divider)
    if (children) {
      return (
        <View
          style={[
            styles.container,
            {
              marginVertical: spacingValue,
            },
            style,
          ]}
        >
          {textPosition !== 'start' && (
            <View
              style={[
                styles.line,
                {
                  height: thickness,
                  backgroundColor: borderColor,
                  borderStyle,
                  flex: textPosition === 'center' ? 1 : undefined,
                  width: textPosition === 'end' ? '100%' : undefined,
                },
              ]}
            />
          )}
          <View style={styles.content}>
            {typeof children === 'string' ? (
              <SushiText variant="caption" color="secondary">
                {children}
              </SushiText>
            ) : (
              children
            )}
          </View>
          {textPosition !== 'end' && (
            <View
              style={[
                styles.line,
                {
                  height: thickness,
                  backgroundColor: borderColor,
                  borderStyle,
                  flex: textPosition === 'center' ? 1 : undefined,
                  width: textPosition === 'start' ? '100%' : undefined,
                },
              ]}
            />
          )}
        </View>
      );
    }

    // Simple horizontal line
    return (
      <View
        style={[
          styles.horizontal,
          {
            height: thickness,
            backgroundColor: borderColor,
            borderStyle,
            marginVertical: spacingValue,
          },
          style,
        ]}
      />
    );
  }

  // Vertical divider
  return (
    <View
      style={[
        styles.vertical,
        {
          width: thickness,
          backgroundColor: borderColor,
          borderStyle,
          marginHorizontal: spacingValue,
        },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  line: {
    // Styles applied inline
  },
  content: {
    paddingHorizontal: spacing.md,
  },
  horizontal: {
    width: '100%',
  },
  vertical: {
    height: '100%',
  },
});

SushiDivider.displayName = 'SushiDivider';
