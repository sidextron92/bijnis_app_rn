import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../tokens/colors';

/**
 * Supported platforms for this component
 * @platform android
 * @platform ios
 * @platform web
 *
 * Note: This is a placeholder component.
 * In actual implementation, use @expo/vector-icons or react-native-vector-icons
 */

type IconColor = 'primary' | 'secondary' | 'disabled' | 'error' | 'success' | 'white';
type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface IconProps {
  /** Icon name (to be used with icon library) */
  name: string;
  /** Icon color */
  color?: IconColor;
  /** Icon size */
  size?: IconSize;
  /** Custom style */
  style?: ViewStyle;
}

const colorMap: Record<IconColor, string> = {
  primary: colors.text.primary,
  secondary: colors.text.secondary,
  disabled: colors.text.disabled,
  error: colors.error.main,
  success: colors.success.main,
  white: colors.white,
};

const sizeMap: Record<IconSize, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
};

export const Icon: React.FC<IconProps> = ({
  name,
  color = 'primary',
  size = 'md',
  style,
}) => {
  const iconSize = sizeMap[size];
  const iconColor = colorMap[color];

  // Placeholder implementation
  // Replace with actual icon library integration
  return (
    <View
      style={[
        styles.placeholder,
        {
          width: iconSize,
          height: iconSize,
          backgroundColor: iconColor,
        },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  placeholder: {
    borderRadius: 2,
    opacity: 0.3,
  },
});

Icon.displayName = 'Icon';

/**
 * Icon sizes for reference:
 * xs: 12px - Very small icons (indicators)
 * sm: 16px - Small icons (inline text)
 * md: 20px - Default size
 * lg: 24px - Large icons (buttons)
 * xl: 32px - Extra large (feature icons)
 */
