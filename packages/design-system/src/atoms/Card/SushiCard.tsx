/**
 * SushiCard - Card Component
 *
 * A theme-aware card container component.
 *
 * @platform android
 * @platform ios
 * @platform web
 */

import React from 'react';
import { View, Pressable, StyleSheet, ViewStyle, PressableProps } from 'react-native';
import { useTheme } from '../../theme';
import { spacing, borderRadius, borderWidth } from '../../tokens/dimensions';

/**
 * Card variants
 */
export type CardVariant = 'elevated' | 'outlined' | 'filled';

/**
 * Card padding options
 */
export type CardPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * SushiCard Props
 */
export interface SushiCardProps extends Omit<PressableProps, 'style' | 'children'> {
  /** Card variant */
  variant?: CardVariant;
  /** Card padding */
  padding?: CardPadding;
  /** Border radius */
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  /** Makes card pressable */
  pressable?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Custom style */
  style?: ViewStyle;
  /** Children content */
  children: React.ReactNode;
}

/**
 * Padding map
 */
const paddingMap: Record<CardPadding, number> = {
  none: 0,
  sm: spacing.sm,
  md: spacing.md,
  lg: spacing.lg,
  xl: spacing.xl,
};

/**
 * Radius map
 */
const radiusMap = {
  none: borderRadius.none,
  sm: borderRadius.sm,
  md: borderRadius.md,
  lg: borderRadius.lg,
  xl: borderRadius.xl,
};

/**
 * SushiCard Component
 *
 * @example
 * ```tsx
 * // Elevated card (default)
 * <SushiCard>
 *   <Text>Card content</Text>
 * </SushiCard>
 *
 * // Outlined card
 * <SushiCard variant="outlined" padding="lg">
 *   <Text>Outlined card</Text>
 * </SushiCard>
 *
 * // Pressable card
 * <SushiCard pressable onPress={handlePress}>
 *   <Text>Tap me</Text>
 * </SushiCard>
 * ```
 */
export const SushiCard: React.FC<SushiCardProps> = ({
  variant = 'elevated',
  padding = 'md',
  radius = 'lg',
  pressable = false,
  disabled = false,
  style,
  children,
  ...props
}) => {
  const { theme } = useTheme();

  // Get variant styles
  const getVariantStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      backgroundColor: theme.colors.surface.default,
      borderRadius: radiusMap[radius],
      padding: paddingMap[padding],
      overflow: 'hidden',
    };

    switch (variant) {
      case 'elevated':
        return {
          ...baseStyle,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        };
      case 'outlined':
        return {
          ...baseStyle,
          borderWidth: borderWidth.thin,
          borderColor: theme.colors.border.default,
        };
      case 'filled':
        return {
          ...baseStyle,
          backgroundColor: theme.colors.surface.sunken,
        };
      default:
        return baseStyle;
    }
  };

  if (pressable) {
    return (
      <Pressable
        style={({ pressed }) => [
          getVariantStyle(),
          pressed && styles.pressed,
          disabled && styles.disabled,
          style,
        ]}
        disabled={disabled}
        {...props}
      >
        {children}
      </Pressable>
    );
  }

  return <View style={[getVariantStyle(), style]}>{children}</View>;
};

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.95,
    transform: [{ scale: 0.99 }],
  },
  disabled: {
    opacity: 0.6,
  },
});

SushiCard.displayName = 'SushiCard';

/**
 * Card Header
 */
export interface SushiCardHeaderProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const SushiCardHeader: React.FC<SushiCardHeaderProps> = ({ children, style }) => (
  <View style={[cardStyles.header, style]}>{children}</View>
);

SushiCardHeader.displayName = 'SushiCardHeader';

/**
 * Card Content
 */
export interface SushiCardContentProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const SushiCardContent: React.FC<SushiCardContentProps> = ({ children, style }) => (
  <View style={[cardStyles.content, style]}>{children}</View>
);

SushiCardContent.displayName = 'SushiCardContent';

/**
 * Card Footer
 */
export interface SushiCardFooterProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const SushiCardFooter: React.FC<SushiCardFooterProps> = ({ children, style }) => (
  <View style={[cardStyles.footer, style]}>{children}</View>
);

SushiCardFooter.displayName = 'SushiCardFooter';

const cardStyles = StyleSheet.create({
  header: {
    padding: spacing.md,
    paddingBottom: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  content: {
    padding: spacing.md,
  },
  footer: {
    padding: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
});
