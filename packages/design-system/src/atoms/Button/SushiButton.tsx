/**
 * SushiButton - Button Component
 *
 * A theme-aware button component with multiple variants and sizes.
 * Follows Sushi's button pattern: Solid, Outline, Text, Underline.
 *
 * @platform android
 * @platform ios
 * @platform web
 */

import React from 'react';
import {
  Pressable,
  PressableProps,
  StyleSheet,
  ActivityIndicator,
  View,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useTheme } from '../../theme';
import { SushiText } from '../Text/SushiText';
import { SushiIcon } from '../Icon/SushiIcon';
import { SquircleView } from '../../primitives/SquircleView';
import { spacing, borderRadius, componentHeight } from '../../tokens/dimensions';
import type { CornerStyle } from '../../tokens/cornerStyle';

/**
 * Button variants
 */
export type ButtonVariant = 'solid' | 'outline' | 'text' | 'underline';

/**
 * Button sizes
 */
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Button color schemes
 */
export type ButtonColorScheme = 'primary' | 'secondary' | 'destructive' | 'success';

/**
 * SushiButton Props
 */
export interface SushiButtonProps extends Omit<PressableProps, 'style' | 'children'> {
  /** Button text */
  title: string;
  /** Button variant style */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Color scheme */
  colorScheme?: ButtonColorScheme;
  /** Show loading spinner */
  loading?: boolean;
  /** Disable button */
  disabled?: boolean;
  /** Full width button */
  fullWidth?: boolean;
  /** Left icon - can be icon name string or React node */
  leftIcon?: string | React.ReactNode;
  /** Right icon - can be icon name string or React node */
  rightIcon?: string | React.ReactNode;
  /** Corner style: rectangle, rounded, or squircle */
  cornerStyle?: CornerStyle;
  /** Custom style */
  style?: ViewStyle;
}

/**
 * Size configurations
 */
const sizeConfig: Record<ButtonSize, { height: number; paddingHorizontal: number; fontSize: number }> = {
  sm: {
    height: componentHeight.sm,
    paddingHorizontal: spacing.md,
    fontSize: 13,
  },
  md: {
    height: componentHeight.md,
    paddingHorizontal: spacing.lg,
    fontSize: 14,
  },
  lg: {
    height: componentHeight.lg,
    paddingHorizontal: spacing.xl,
    fontSize: 16,
  },
};

/**
 * SushiButton Component
 *
 * @example
 * ```tsx
 * // Solid button (default)
 * <SushiButton title="Submit" onPress={handlePress} />
 *
 * // Outline button
 * <SushiButton title="Cancel" variant="outline" />
 *
 * // Text button
 * <SushiButton title="Learn More" variant="text" />
 *
 * // With icon
 * <SushiButton title="Add" leftIcon={<PlusIcon />} />
 *
 * // Loading state
 * <SushiButton title="Saving..." loading />
 * ```
 */
export const SushiButton: React.FC<SushiButtonProps> = ({
  title,
  variant = 'solid',
  size = 'md',
  colorScheme = 'primary',
  loading = false,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  cornerStyle = 'squircle',
  style,
  ...props
}) => {
  const { theme } = useTheme();
  const isDisabled = disabled || loading;
  const config = sizeConfig[size];

  // Get colors based on variant and color scheme
  const getColors = () => {
    const colors = theme.colors;
    const interactive = colors.interactive;

    const schemeColors = {
      primary: {
        bg: interactive.primary,
        bgHover: interactive.primaryHover,
        bgActive: interactive.primaryActive,
        text: colors.text.inverse,
        border: interactive.primary,
      },
      secondary: {
        bg: interactive.secondary,
        bgHover: interactive.secondaryHover,
        bgActive: interactive.secondaryActive,
        text: colors.text.primary,
        border: colors.border.default,
      },
      destructive: {
        bg: interactive.destructive,
        bgHover: interactive.destructiveHover,
        bgActive: interactive.destructiveActive,
        text: colors.text.inverse,
        border: interactive.destructive,
      },
      success: {
        bg: colors.background.success,
        bgHover: colors.palette.green[600],
        bgActive: colors.palette.green[700],
        text: colors.text.inverse,
        border: colors.background.success,
      },
    };

    return schemeColors[colorScheme];
  };

  const schemeColors = getColors();

  // Get corner radius based on corner style
  const getCornerRadius = () => {
    if (cornerStyle === 'rectangle') return 0;
    return borderRadius.md;
  };

  // Get variant styles
  const getVariantStyles = (pressed: boolean): { container: ViewStyle; text: TextStyle } => {
    const baseContainer: ViewStyle = {
      height: config.height,
      paddingHorizontal: config.paddingHorizontal,
      borderRadius: cornerStyle === 'squircle' ? 0 : getCornerRadius(),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    };

    switch (variant) {
      case 'solid':
        return {
          container: {
            ...baseContainer,
            backgroundColor: pressed ? schemeColors.bgActive : schemeColors.bg,
          },
          text: {
            color: schemeColors.text,
            fontSize: config.fontSize,
            fontWeight: '600',
          },
        };
      case 'outline':
        return {
          container: {
            ...baseContainer,
            backgroundColor: pressed ? theme.colors.background.secondary : 'transparent',
            borderWidth: 1,
            borderColor: schemeColors.border,
          },
          text: {
            color: colorScheme === 'secondary' ? theme.colors.text.primary : schemeColors.bg,
            fontSize: config.fontSize,
            fontWeight: '600',
          },
        };
      case 'text':
        return {
          container: {
            ...baseContainer,
            backgroundColor: pressed ? theme.colors.background.secondary : 'transparent',
          },
          text: {
            color: colorScheme === 'secondary' ? theme.colors.text.primary : schemeColors.bg,
            fontSize: config.fontSize,
            fontWeight: '600',
          },
        };
      case 'underline':
        return {
          container: {
            ...baseContainer,
            backgroundColor: pressed ? theme.colors.background.secondary : 'transparent',
          },
          text: {
            color: colorScheme === 'secondary' ? theme.colors.text.primary : schemeColors.bg,
            fontSize: config.fontSize,
            fontWeight: '600',
            textDecorationLine: 'underline',
          },
        };
      default:
        return {
          container: baseContainer,
          text: { fontSize: config.fontSize },
        };
    }
  };

  // Loading color
  const getLoadingColor = () => {
    if (variant === 'solid') {
      return schemeColors.text;
    }
    return colorScheme === 'secondary' ? theme.colors.text.primary : schemeColors.bg;
  };

  // Get icon color based on variant
  const getIconColor = () => {
    if (variant === 'solid') {
      return schemeColors.text;
    }
    return colorScheme === 'secondary' ? theme.colors.text.primary : schemeColors.bg;
  };

  // Render icon - handles both string names and React nodes
  const renderIcon = (icon: string | React.ReactNode, iconColor: string) => {
    if (typeof icon === 'string') {
      return <SushiIcon name={icon} size="sm" color={iconColor} />;
    }
    return icon;
  };

  // Render button content
  const renderContent = (pressed: boolean) => {
    const variantStyles = getVariantStyles(pressed);

    if (loading) {
      return <ActivityIndicator color={getLoadingColor()} size="small" />;
    }

    const iconColor = getIconColor();

    return (
      <View style={styles.content}>
        {leftIcon && <View style={styles.leftIcon}>{renderIcon(leftIcon, iconColor)}</View>}
        {title ? (
          <SushiText
            variant="button"
            style={variantStyles.text}
          >
            {title}
          </SushiText>
        ) : null}
        {rightIcon && <View style={styles.rightIcon}>{renderIcon(rightIcon, iconColor)}</View>}
      </View>
    );
  };

  // Squircle style - wrap with SquircleView
  if (cornerStyle === 'squircle') {
    return (
      <Pressable
        disabled={isDisabled}
        {...props}
      >
        {({ pressed }) => {
          const variantStyles = getVariantStyles(pressed);
          const bgColor = variant === 'solid'
            ? (pressed ? schemeColors.bgActive : schemeColors.bg)
            : (pressed ? theme.colors.background.secondary : 'transparent');
          const borderW = variant === 'outline' ? 1 : 0;
          const borderC = variant === 'outline' ? schemeColors.border : 'transparent';

          return (
            <SquircleView
              cornerStyle="squircle"
              cornerRadius={borderRadius.md}
              backgroundColor={bgColor}
              borderWidth={borderW}
              borderColor={borderC}
              style={[
                {
                  height: config.height,
                  paddingHorizontal: config.paddingHorizontal,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
                isDisabled && styles.disabled,
                fullWidth && styles.fullWidth,
                style,
              ]}
            >
              {renderContent(pressed)}
            </SquircleView>
          );
        }}
      </Pressable>
    );
  }

  // Regular rounded or rectangle style
  return (
    <Pressable
      style={({ pressed }) => {
        const variantStyles = getVariantStyles(pressed);
        return [
          variantStyles.container,
          isDisabled && styles.disabled,
          fullWidth && styles.fullWidth,
          style,
        ];
      }}
      disabled={isDisabled}
      {...props}
    >
      {({ pressed }) => renderContent(pressed)}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  fullWidth: {
    width: '100%',
  },
  leftIcon: {
    marginRight: spacing.xs,
  },
  rightIcon: {
    marginLeft: spacing.xs,
  },
});

SushiButton.displayName = 'SushiButton';
