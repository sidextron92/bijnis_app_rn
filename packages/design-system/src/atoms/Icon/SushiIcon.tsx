/**
 * SushiIcon - Icon Component
 *
 * A theme-aware icon wrapper component.
 *
 * @platform android
 * @platform ios
 * @platform web
 */

import React from 'react';
import { View, ViewStyle, StyleSheet, Pressable, PressableProps, Platform } from 'react-native';
import * as FeatherIcons from 'react-feather';
import { useTheme } from '../../theme';
import { iconSize, IconSizeKey } from '../../tokens/dimensions';

/**
 * Icon color options
 */
type IconColorToken =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'disabled'
  | 'inverse'
  | 'brand'
  | 'success'
  | 'error'
  | 'warning'
  | 'info';

/**
 * Common Feather icon names
 */
export type FeatherIconName = keyof typeof FeatherIcons;

/**
 * SushiIcon Props
 */
export interface SushiIconProps {
  /** Icon name from Feather icons (for web/storybook) */
  name?: string;
  /** Icon component or element to render (for native apps) */
  icon?: React.ReactElement;
  /** Icon size */
  size?: IconSizeKey | number;
  /** Icon color from theme */
  color?: IconColorToken | string;
  /** Custom color override */
  customColor?: string;
  /** Additional style */
  style?: ViewStyle;
  /** Accessible label */
  accessibilityLabel?: string;
}

/**
 * Convert kebab-case to PascalCase for Feather icon lookup
 */
const toPascalCase = (str: string): string => {
  return str
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
};

/**
 * Get Feather icon component by name
 */
const getFeatherIcon = (name: string): React.ComponentType<{ size?: number; color?: string }> | null => {
  const pascalName = toPascalCase(name);
  const IconComponent = (FeatherIcons as Record<string, React.ComponentType<{ size?: number; color?: string }>>)[pascalName];
  return IconComponent || null;
};

/**
 * SushiIcon Component
 *
 * Wraps icon components with theme-aware sizing and coloring.
 *
 * @example
 * ```tsx
 * // Using name prop (web/storybook)
 * <SushiIcon name="home" size="md" color="primary" />
 *
 * // Using icon prop (native with @expo/vector-icons)
 * import { Feather } from '@expo/vector-icons';
 * <SushiIcon
 *   icon={<Feather name="home" />}
 *   size="md"
 *   color="primary"
 * />
 *
 * // Custom size
 * <SushiIcon name="settings" size={28} color="secondary" />
 * ```
 */
export const SushiIcon: React.FC<SushiIconProps> = ({
  name,
  icon,
  size = 'md',
  color = 'primary',
  customColor,
  style,
  accessibilityLabel,
}) => {
  const { theme } = useTheme();

  // Get size value
  const sizeValue = typeof size === 'number' ? size : iconSize[size];

  // Get color from theme or use custom/direct color
  const themeColorTokens = ['primary', 'secondary', 'tertiary', 'disabled', 'inverse', 'brand', 'success', 'error', 'warning', 'info'];
  const isThemeColor = themeColorTokens.includes(color);

  // Priority: customColor > direct color string (like #FF5722) > theme token
  let iconColor: string;
  if (customColor) {
    iconColor = customColor;
  } else if (isThemeColor) {
    iconColor = theme.colors.icon[color as IconColorToken];
  } else {
    // Direct color string (e.g., "#FF5722", "rgb(255,0,0)", etc.)
    iconColor = color;
  }

  // Fallback to primary color if iconColor is undefined
  if (!iconColor) {
    iconColor = theme.colors.icon.primary;
  }

  // Render icon based on prop type
  const renderIcon = () => {
    // If name prop is provided, use Feather icons (web)
    if (name) {
      const FeatherIcon = getFeatherIcon(name);
      if (FeatherIcon) {
        return <FeatherIcon size={sizeValue} color={iconColor} />;
      }
      // Fallback: render a placeholder
      return (
        <View
          style={{
            width: sizeValue,
            height: sizeValue,
            backgroundColor: iconColor,
            opacity: 0.3,
            borderRadius: 2,
          }}
        />
      );
    }

    // If icon prop is provided, clone with size and color
    if (icon) {
      return React.cloneElement(icon, {
        size: sizeValue,
        color: iconColor,
      });
    }

    // No icon provided
    return null;
  };

  return (
    <View
      style={[styles.container, { width: sizeValue, height: sizeValue }, style]}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="image"
    >
      {renderIcon()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
  disabled: {
    opacity: 0.5,
  },
});

SushiIcon.displayName = 'SushiIcon';

/**
 * Icon Button Variant
 */
type IconButtonVariant = 'ghost' | 'filled' | 'outlined';

/**
 * Icon Button Color Scheme
 */
type IconButtonColorScheme = 'primary' | 'secondary' | 'success' | 'warning' | 'error';

/**
 * Icon Button - Pressable icon wrapper
 */
export interface SushiIconButtonProps extends Omit<PressableProps, 'style' | 'children'> {
  /** Icon name from Feather icons (for web/storybook) */
  name?: string;
  /** Icon component (for native apps) */
  icon?: React.ReactElement;
  /** Icon size */
  size?: IconSizeKey | number;
  /** Icon color */
  color?: IconColorToken;
  /** Custom color */
  customColor?: string;
  /** Button variant */
  variant?: IconButtonVariant;
  /** Color scheme for filled/outlined variants */
  colorScheme?: IconButtonColorScheme;
  /** Disabled state */
  disabled?: boolean;
  /** Additional style */
  style?: ViewStyle;
  /** Accessible label */
  accessibilityLabel?: string;
}

export const SushiIconButton: React.FC<SushiIconButtonProps> = ({
  name,
  icon,
  size = 'md',
  color = 'primary',
  customColor,
  variant = 'ghost',
  colorScheme = 'primary',
  disabled = false,
  style,
  accessibilityLabel,
  ...props
}) => {
  const { theme } = useTheme();
  const sizeValue = typeof size === 'number' ? size : iconSize[size];

  // Add padding for touch target
  const touchPadding = Math.max(0, (44 - sizeValue) / 2);

  // Get variant styles
  const getVariantStyle = (pressed: boolean): ViewStyle => {
    const schemeColors: Record<IconButtonColorScheme, string> = {
      primary: theme.colors.interactive.primary,
      secondary: theme.colors.interactive.secondary,
      success: theme.colors.status?.success || '#4CAF50',
      warning: theme.colors.status?.warning || '#FF9800',
      error: theme.colors.status?.error || '#F44336',
    };

    const baseColor = schemeColors[colorScheme];

    switch (variant) {
      case 'filled':
        return {
          backgroundColor: pressed ? `${baseColor}CC` : baseColor,
          borderRadius: sizeValue / 2 + touchPadding,
        };
      case 'outlined':
        return {
          borderWidth: 1,
          borderColor: baseColor,
          borderRadius: sizeValue / 2 + touchPadding,
          backgroundColor: pressed ? `${baseColor}20` : 'transparent',
        };
      case 'ghost':
      default:
        return {
          backgroundColor: pressed ? 'rgba(0, 0, 0, 0.05)' : 'transparent',
          borderRadius: sizeValue / 2 + touchPadding,
        };
    }
  };

  // Get icon color based on variant
  const getIconColor = (): IconColorToken | string => {
    if (disabled) return 'disabled';
    if (variant === 'filled') return 'inverse';
    return color;
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.iconButton,
        { padding: touchPadding },
        getVariantStyle(pressed),
        disabled && styles.disabled,
        style,
      ]}
      disabled={disabled}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      {...props}
    >
      {({ pressed }) => (
        <SushiIcon
          name={name}
          icon={icon}
          size={size}
          color={getIconColor()}
          customColor={customColor}
        />
      )}
    </Pressable>
  );
};

SushiIconButton.displayName = 'SushiIconButton';
