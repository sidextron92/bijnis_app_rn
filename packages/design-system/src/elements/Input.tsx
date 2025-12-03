import React, { useState } from 'react';
import {
  View,
  TextInput,
  TextInputProps,
  StyleSheet,
  ViewStyle,
  Pressable,
} from 'react-native';
import { Text } from '../primitives/Text';
import { colors } from '../tokens/colors';
import { spacing } from '../tokens/spacing';
import { borderRadius } from '../tokens/borderRadius';
import { fontSize, fontFamily } from '../tokens/typography';

/**
 * Supported platforms for this component
 * @platform android
 * @platform ios
 * @platform web
 */

type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends TextInputProps {
  /** Input label */
  label?: string;
  /** Helper text below input */
  helperText?: string;
  /** Error message */
  error?: string;
  /** Input size */
  size?: InputSize;
  /** Left icon component */
  leftIcon?: React.ReactNode;
  /** Right icon component */
  rightIcon?: React.ReactNode;
  /** Disable input */
  disabled?: boolean;
  /** Full width input */
  fullWidth?: boolean;
  /** Container style */
  containerStyle?: ViewStyle;
}

const sizeStyles: Record<InputSize, { container: ViewStyle; input: { height: number; fontSize: number } }> = {
  sm: {
    container: { minHeight: 36 },
    input: { height: 36, fontSize: fontSize.sm },
  },
  md: {
    container: { minHeight: 44 },
    input: { height: 44, fontSize: fontSize.md },
  },
  lg: {
    container: { minHeight: 52 },
    input: { height: 52, fontSize: fontSize.lg },
  },
};

export const Input: React.FC<InputProps> = ({
  label,
  helperText,
  error,
  size = 'md',
  leftIcon,
  rightIcon,
  disabled = false,
  fullWidth = false,
  containerStyle,
  style,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const sizeStyle = sizeStyles[size];

  const getBorderColor = () => {
    if (error) return colors.error.main;
    if (isFocused) return colors.primary[500];
    return colors.border.light;
  };

  return (
    <View style={[fullWidth && styles.fullWidth, containerStyle]}>
      {label && (
        <Text variant="label" style={styles.label}>
          {label}
        </Text>
      )}

      <View
        style={[
          styles.inputContainer,
          sizeStyle.container,
          { borderColor: getBorderColor() },
          isFocused && styles.focused,
          disabled && styles.disabled,
        ]}
      >
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}

        <TextInput
          style={[
            styles.input,
            { fontSize: sizeStyle.input.fontSize },
            leftIcon && styles.inputWithLeftIcon,
            rightIcon && styles.inputWithRightIcon,
            style,
          ]}
          placeholderTextColor={colors.text.hint}
          editable={!disabled}
          onFocus={e => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={e => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          {...props}
        />

        {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
      </View>

      {(error || helperText) && (
        <Text
          variant="caption"
          color={error ? 'error' : 'secondary'}
          style={styles.helperText}
        >
          {error || helperText}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  fullWidth: {
    width: '100%',
  },
  label: {
    marginBottom: spacing.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: borderRadius.md,
    backgroundColor: colors.white,
    paddingHorizontal: spacing.md,
  },
  focused: {
    borderWidth: 2,
  },
  disabled: {
    backgroundColor: colors.gray[100],
    opacity: 0.7,
  },
  input: {
    flex: 1,
    fontFamily: fontFamily.regular,
    color: colors.text.primary,
    paddingVertical: spacing.sm,
  },
  inputWithLeftIcon: {
    paddingLeft: spacing.xs,
  },
  inputWithRightIcon: {
    paddingRight: spacing.xs,
  },
  leftIcon: {
    marginRight: spacing.xs,
  },
  rightIcon: {
    marginLeft: spacing.xs,
  },
  helperText: {
    marginTop: spacing.xs,
  },
});

Input.displayName = 'Input';
