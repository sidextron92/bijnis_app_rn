import React from 'react';
import { View, Pressable, StyleSheet, ViewStyle, PressableProps } from 'react-native';
import { SquircleView } from '../primitives/SquircleView';
import { colors } from '../tokens/colors';
import { spacing } from '../tokens/spacing';
import { borderRadius } from '../tokens/borderRadius';
import { shadows } from '../tokens/shadows';
import type { CornerStyle } from '../tokens/cornerStyle';

/**
 * Supported platforms for this component
 * @platform android
 * @platform ios
 * @platform web
 */

type CardVariant = 'elevated' | 'outlined' | 'filled';

export interface CardProps extends Omit<PressableProps, 'style'> {
  /** Card variant */
  variant?: CardVariant;
  /** Card padding */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Corner style: rectangle, rounded, or squircle */
  cornerStyle?: CornerStyle;
  /** Pressable card (adds touch feedback) */
  pressable?: boolean;
  /** Custom style */
  style?: ViewStyle;
  /** Children content */
  children: React.ReactNode;
}

const paddingMap = {
  none: 0,
  sm: spacing.sm,
  md: spacing.md,
  lg: spacing.lg,
};

const getCornerRadius = (cornerStyle: CornerStyle): number => {
  return cornerStyle === 'rectangle' ? 0 : borderRadius.lg;
};

export const Card: React.FC<CardProps> = ({
  variant = 'elevated',
  padding = 'md',
  cornerStyle = 'rounded',
  pressable = false,
  style,
  children,
  ...props
}) => {
  const getVariantStyle = (): { backgroundColor: string; borderWidth: number; borderColor: string } => {
    switch (variant) {
      case 'elevated':
        return {
          backgroundColor: colors.white,
          borderWidth: 0,
          borderColor: 'transparent',
        };
      case 'outlined':
        return {
          backgroundColor: colors.white,
          borderWidth: 1,
          borderColor: colors.border.light,
        };
      case 'filled':
        return {
          backgroundColor: colors.background.secondary,
          borderWidth: 0,
          borderColor: 'transparent',
        };
      default:
        return {
          backgroundColor: colors.white,
          borderWidth: 0,
          borderColor: 'transparent',
        };
    }
  };

  const variantStyle = getVariantStyle();
  const cornerRadiusValue = getCornerRadius(cornerStyle);

  // Common content wrapper with padding
  const contentStyle: ViewStyle = {
    padding: paddingMap[padding],
  };

  // Squircle style - use SquircleView
  if (cornerStyle === 'squircle') {
    if (pressable) {
      return (
        <Pressable
          style={({ pressed }) => [pressed && styles.pressed]}
          {...props}
        >
          <SquircleView
            cornerStyle="squircle"
            cornerRadius={borderRadius.lg}
            backgroundColor={variantStyle.backgroundColor}
            borderWidth={variantStyle.borderWidth}
            borderColor={variantStyle.borderColor}
            style={[
              contentStyle,
              variant === 'elevated' ? shadows.sm : {},
              style,
            ]}
          >
            {children}
          </SquircleView>
        </Pressable>
      );
    }

    return (
      <SquircleView
        cornerStyle="squircle"
        cornerRadius={borderRadius.xl}
        backgroundColor={variantStyle.backgroundColor}
        borderWidth={variantStyle.borderWidth}
        borderColor={variantStyle.borderColor}
        style={[
          contentStyle,
          variant === 'elevated' ? shadows.sm : {},
          style,
        ]}
      >
        {children}
      </SquircleView>
    );
  }

  // Rectangle or Rounded style - use standard View
  const cardStyle: ViewStyle = {
    ...styles.base,
    borderRadius: cornerRadiusValue,
    backgroundColor: variantStyle.backgroundColor,
    borderWidth: variantStyle.borderWidth,
    borderColor: variantStyle.borderColor,
    padding: paddingMap[padding],
    ...(variant === 'elevated' ? shadows.sm : {}),
  };

  if (pressable) {
    return (
      <Pressable
        style={({ pressed }) => [cardStyle, pressed && styles.pressed, style]}
        {...props}
      >
        {children}
      </Pressable>
    );
  }

  return <View style={[cardStyle, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  base: {
    overflow: 'hidden',
  },
  pressed: {
    opacity: 0.9,
  },
});

Card.displayName = 'Card';
