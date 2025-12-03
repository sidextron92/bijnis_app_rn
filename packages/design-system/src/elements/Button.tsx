import React from 'react';
import {
  Pressable,
  PressableProps,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { SquircleView } from '../primitives/SquircleView';
import { Text } from '../primitives/Text';
import { colors } from '../tokens/colors';
import { spacing } from '../tokens/spacing';
import { borderRadius } from '../tokens/borderRadius';
import type { CornerStyle } from '../tokens/cornerStyle';

/**
 * Supported platforms for this component
 * @platform android
 * @platform ios
 * @platform web
 */

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<PressableProps, 'style'> {
  /** Button text */
  title: string;
  /** Button style variant */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Corner style: rectangle, rounded, or squircle */
  cornerStyle?: CornerStyle;
  /** Show loading spinner */
  loading?: boolean;
  /** Disable button */
  disabled?: boolean;
  /** Full width button */
  fullWidth?: boolean;
  /** Left icon component */
  leftIcon?: React.ReactNode;
  /** Right icon component */
  rightIcon?: React.ReactNode;
  /** Custom style */
  style?: ViewStyle;
}

// Variant styles
const variantStyles: Record<ButtonVariant, { container: ViewStyle; text: TextStyle }> = {
  primary: {
    container: { backgroundColor: colors.primary[500] },
    text: { color: colors.text.inverse },
  },
  secondary: {
    container: { backgroundColor: colors.gray[100] },
    text: { color: colors.text.primary },
  },
  outline: {
    container: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: colors.primary[500],
    },
    text: { color: colors.primary[500] },
  },
  ghost: {
    container: { backgroundColor: 'transparent' },
    text: { color: colors.primary[500] },
  },
  destructive: {
    container: { backgroundColor: colors.error.main },
    text: { color: colors.text.inverse },
  },
};

// Size styles
const sizeStyles: Record<ButtonSize, { container: ViewStyle; text: TextStyle }> = {
  sm: {
    container: {
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.md,
      minHeight: 32,
    },
    text: { fontSize: 12 },
  },
  md: {
    container: {
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.lg,
      minHeight: 44,
    },
    text: { fontSize: 14 },
  },
  lg: {
    container: {
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.xl,
      minHeight: 52,
    },
    text: { fontSize: 16 },
  },
};

const getCornerRadius = (cornerStyle: CornerStyle): number => {
  return cornerStyle === 'rectangle' ? 0 : borderRadius.md;
};

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'md',
  cornerStyle = 'rounded',
  loading = false,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  style,
  ...props
}) => {
  const isDisabled = disabled || loading;
  const variantStyle = variantStyles[variant];
  const sizeStyle = sizeStyles[size];
  const cornerRadiusValue = getCornerRadius(cornerStyle);

  const getLoadingColor = () => {
    if (variant === 'primary' || variant === 'destructive') {
      return colors.text.inverse;
    }
    return colors.primary[500];
  };

  const buttonContent = loading ? (
    <ActivityIndicator color={getLoadingColor()} size="small" />
  ) : (
    <>
      {leftIcon && <>{leftIcon}</>}
      <Text
        variant="button"
        style={[
          variantStyle.text,
          sizeStyle.text,
          leftIcon ? styles.textWithLeftIcon : null,
          rightIcon ? styles.textWithRightIcon : null,
        ]}
      >
        {title}
      </Text>
      {rightIcon && <>{rightIcon}</>}
    </>
  );

  // Squircle style - use SquircleView
  if (cornerStyle === 'squircle') {
    const bgColor = (variantStyle.container.backgroundColor as string) || 'transparent';
    const bw = (variantStyle.container.borderWidth as number) || 0;
    const bc = (variantStyle.container.borderColor as string) || 'transparent';

    return (
      <Pressable
        style={({ pressed }) => [
          pressed && !isDisabled && styles.pressed,
          isDisabled && styles.disabled,
          fullWidth && styles.fullWidth,
        ]}
        disabled={isDisabled}
        {...props}
      >
        <SquircleView
          cornerStyle="squircle"
          cornerRadius={borderRadius.md}
          backgroundColor={bgColor}
          borderWidth={bw}
          borderColor={bc}
          style={[
            styles.base,
            sizeStyle.container,
            fullWidth && styles.fullWidth,
            style,
          ]}
        >
          {buttonContent}
        </SquircleView>
      </Pressable>
    );
  }

  // Rectangle or Rounded style - use standard Pressable
  return (
    <Pressable
      style={({ pressed }) => [
        styles.base,
        { borderRadius: cornerRadiusValue },
        variantStyle.container,
        sizeStyle.container,
        pressed && !isDisabled && styles.pressed,
        isDisabled && styles.disabled,
        fullWidth && styles.fullWidth,
        style,
      ]}
      disabled={isDisabled}
      {...props}
    >
      {buttonContent}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    opacity: 0.5,
  },
  fullWidth: {
    width: '100%',
  },
  textWithLeftIcon: {
    marginLeft: spacing.xs,
  },
  textWithRightIcon: {
    marginRight: spacing.xs,
  },
});

Button.displayName = 'Button';
