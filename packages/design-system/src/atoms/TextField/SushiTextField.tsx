/**
 * SushiTextField - Text Input Component
 *
 * A theme-aware text input component matching the Compose Sushi design system.
 * Wraps React Native's TextInput to maintain consistency with the design system.
 *
 * @platform android
 * @platform ios
 * @platform web
 */

import React, { useState, forwardRef, useCallback, useEffect, useRef } from 'react';
import {
  View,
  TextInput,
  TextInputProps,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Pressable,
  Animated,
} from 'react-native';
import { useTheme } from '../../theme';
import { SushiText } from '../Text/SushiText';
import { spacing, borderRadius, borderWidth, componentHeight } from '../../tokens/dimensions';

/**
 * TextField sizes
 */
export type TextFieldSize = 'sm' | 'md' | 'lg';

/**
 * TextField variants
 */
export type TextFieldVariant = 'outlined' | 'filled' | 'underline';

/**
 * Label behavior types
 */
export type LabelBehavior = 'static' | 'floating';

/**
 * SushiTextField Colors - customizable color scheme for different states
 */
export interface SushiTextFieldColors {
  /** Border color when focused */
  focusedBorder?: string;
  /** Border color when unfocused */
  unfocusedBorder?: string;
  /** Border color in error state */
  errorBorder?: string;
  /** Border color when disabled */
  disabledBorder?: string;
  /** Text color for input */
  textColor?: string;
  /** Text color when disabled */
  disabledTextColor?: string;
  /** Label color when focused */
  focusedLabelColor?: string;
  /** Label color when unfocused */
  unfocusedLabelColor?: string;
  /** Label color in error state */
  errorLabelColor?: string;
  /** Placeholder text color */
  placeholderColor?: string;
  /** Container background color */
  containerColor?: string;
  /** Container background color in error state */
  errorContainerColor?: string;
  /** Container background color when disabled */
  disabledContainerColor?: string;
  /** Support/helper text color */
  supportTextColor?: string;
  /** Support text color in error state */
  errorSupportTextColor?: string;
  /** Icon color */
  iconColor?: string;
  /** Icon color in error state */
  errorIconColor?: string;
  /** Icon color when disabled */
  disabledIconColor?: string;
  /** Floating label background color (for notch effect) */
  floatingLabelBackgroundColor?: string;
}

/**
 * SushiTextField Props
 */
export interface SushiTextFieldProps extends Omit<TextInputProps, 'style'> {
  /** Current text value */
  text?: string;
  /** Callback when text changes */
  onTextChange?: (text: string) => void;
  /** Input label (displayed above the field or as floating label) */
  label?: string;
  /** Support/helper text below input */
  supportText?: string;
  /** @deprecated Use supportText instead */
  helperText?: string;
  /** Error state */
  isError?: boolean;
  /** @deprecated Use isError instead */
  error?: string;
  /** Input size */
  size?: TextFieldSize;
  /** Input variant */
  variant?: TextFieldVariant;
  /** Label behavior - 'static' shows label above, 'floating' animates placeholder to label */
  labelBehavior?: LabelBehavior;
  /** Disabled state */
  disabled?: boolean;
  /** Read-only state */
  readOnly?: boolean;
  /** Required field indicator */
  required?: boolean;
  /** Prefix icon - shown only when input is focused or has value */
  prefixIcon?: React.ReactNode;
  /** Suffix icon - shown only when input is focused or has value */
  suffixIcon?: React.ReactNode;
  /** Leading icon - always visible at the start */
  leadingIcon?: React.ReactNode;
  /** Trailing icon - always visible at the end */
  trailingIcon?: React.ReactNode;
  /** Prefix text - shown before the input value */
  prefixText?: string;
  /** Suffix text - shown after the input value */
  suffixText?: string;
  /** @deprecated Use leadingIcon instead */
  leftElement?: React.ReactNode;
  /** @deprecated Use trailingIcon instead */
  rightElement?: React.ReactNode;
  /** Show reset/clear button when input has value */
  showResetButton?: boolean;
  /** Callback when reset button is pressed */
  onReset?: () => void;
  /** Custom color scheme */
  colors?: SushiTextFieldColors;
  /** Container style */
  containerStyle?: ViewStyle;
  /** Input container style */
  inputContainerStyle?: ViewStyle;
  /** Input text style */
  inputStyle?: TextStyle;
}

/**
 * Size configurations
 */
const sizeConfig: Record<TextFieldSize, { height: number; fontSize: number; paddingHorizontal: number; labelFontSize: number }> = {
  sm: {
    height: componentHeight.sm,
    fontSize: 13,
    paddingHorizontal: spacing.md,
    labelFontSize: 11,
  },
  md: {
    height: componentHeight.md,
    fontSize: 14,
    paddingHorizontal: spacing.lg,
    labelFontSize: 12,
  },
  lg: {
    height: componentHeight.lg,
    fontSize: 16,
    paddingHorizontal: spacing.lg,
    labelFontSize: 12,
  },
};

/**
 * Clear/Reset Icon Component
 */
const ClearIcon: React.FC<{ color: string; size: number }> = ({ color, size }) => (
  <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.6,
      }}
    >
      <SushiText style={{ fontSize: size * 0.6, color: '#fff', fontWeight: '600' }}>×</SushiText>
    </View>
  </View>
);

/**
 * SushiTextField Component
 *
 * A customizable text input component following the Sushi design system.
 * Supports labels, error states, prefix/suffix icons, helper text, and more.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <SushiTextField
 *   label="Email"
 *   placeholder="Enter your email"
 *   text={email}
 *   onTextChange={setEmail}
 * />
 *
 * // Floating label (Material Design style)
 * <SushiTextField
 *   label="Receiver's Name"
 *   labelBehavior="floating"
 *   text={name}
 *   onTextChange={setName}
 * />
 *
 * // With error state
 * <SushiTextField
 *   label="Password"
 *   isError={hasError}
 *   supportText="Password is required"
 *   secureTextEntry
 * />
 *
 * // With icons and reset button
 * <SushiTextField
 *   label="Search"
 *   leadingIcon={<SearchIcon />}
 *   showResetButton
 *   onReset={() => setText('')}
 * />
 * ```
 */
export const SushiTextField = forwardRef<TextInput, SushiTextFieldProps>(
  (
    {
      text,
      onTextChange,
      label,
      supportText,
      helperText,
      isError = false,
      error,
      size = 'md',
      variant = 'outlined',
      labelBehavior = 'static',
      disabled = false,
      readOnly = false,
      required = false,
      prefixIcon,
      suffixIcon,
      leadingIcon,
      trailingIcon,
      prefixText,
      suffixText,
      leftElement,
      rightElement,
      showResetButton = false,
      onReset,
      colors,
      containerStyle,
      inputContainerStyle,
      inputStyle,
      onFocus,
      onBlur,
      value,
      onChangeText,
      placeholder,
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();
    const [isFocused, setIsFocused] = useState(false);
    const config = sizeConfig[size];

    // Animation for floating label
    const labelAnimation = useRef(new Animated.Value(0)).current;

    // Support both old and new prop naming
    const hasError = isError || !!error;
    const displaySupportText = supportText || helperText || (error && typeof error === 'string' ? error : undefined);
    const currentValue = text ?? value ?? '';
    const hasValue = currentValue.length > 0;

    // Support legacy props
    const startIcon = leadingIcon || leftElement;
    const endIcon = trailingIcon || rightElement;

    // Determine if label should be in "up" position (for floating label)
    const isLabelFloated = labelBehavior === 'floating' && (isFocused || hasValue);

    // Animate label position
    useEffect(() => {
      if (labelBehavior === 'floating') {
        Animated.timing(labelAnimation, {
          toValue: isLabelFloated ? 1 : 0,
          duration: 150,
          useNativeDriver: false,
        }).start();
      }
    }, [isLabelFloated, labelBehavior, labelAnimation]);

    // Handle text changes
    const handleTextChange = useCallback((newText: string) => {
      onTextChange?.(newText);
      onChangeText?.(newText);
    }, [onTextChange, onChangeText]);

    // Handle focus
    const handleFocus = useCallback((e: any) => {
      setIsFocused(true);
      onFocus?.(e);
    }, [onFocus]);

    const handleBlur = useCallback((e: any) => {
      setIsFocused(false);
      onBlur?.(e);
    }, [onBlur]);

    // Handle reset
    const handleReset = useCallback(() => {
      handleTextChange('');
      onReset?.();
    }, [handleTextChange, onReset]);

    // Get colors with custom overrides
    const getColor = (key: keyof SushiTextFieldColors, fallback: string): string => {
      return colors?.[key] ?? fallback;
    };

    // Get border color
    const getBorderColor = () => {
      if (disabled) return getColor('disabledBorder', theme.colors.border.subtle);
      if (hasError) return getColor('errorBorder', theme.colors.border.error);
      if (isFocused) return getColor('focusedBorder', theme.colors.border.focused);
      return getColor('unfocusedBorder', theme.colors.border.default);
    };

    // Get background color based on variant
    const getBackgroundColor = () => {
      if (disabled) return getColor('disabledContainerColor', theme.colors.surface.disabled);
      if (hasError) return getColor('errorContainerColor', theme.colors.background.primary);
      switch (variant) {
        case 'filled':
          return getColor('containerColor', theme.colors.background.secondary);
        case 'outlined':
        case 'underline':
        default:
          return getColor('containerColor', theme.colors.background.primary);
      }
    };

    // Get label color
    const getLabelColor = () => {
      if (hasError) return theme.colors.text.error;
      if (isFocused) return theme.colors.text.brand;
      return theme.colors.text.tertiary;
    };

    // Get label color for SushiText component
    const getLabelColorProp = () => {
      if (hasError) return 'error' as const;
      if (isFocused) return 'brand' as const;
      return 'secondary' as const;
    };

    // Get icon color
    const getIconColor = () => {
      if (disabled) return getColor('disabledIconColor', theme.colors.icon.disabled);
      if (hasError) return getColor('errorIconColor', theme.colors.icon.error);
      return getColor('iconColor', theme.colors.icon.secondary);
    };

    // Get input container styles based on variant
    const getInputContainerStyle = (): ViewStyle => {
      const baseStyle: ViewStyle = {
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: config.height,
        backgroundColor: getBackgroundColor(),
      };

      switch (variant) {
        case 'outlined':
          return {
            ...baseStyle,
            borderWidth: isFocused ? borderWidth.medium : borderWidth.thin,
            borderColor: getBorderColor(),
            borderRadius: borderRadius.md,
          };
        case 'filled':
          return {
            ...baseStyle,
            borderBottomWidth: isFocused ? borderWidth.medium : borderWidth.thin,
            borderBottomColor: getBorderColor(),
            borderTopLeftRadius: borderRadius.md,
            borderTopRightRadius: borderRadius.md,
          };
        case 'underline':
          return {
            ...baseStyle,
            borderBottomWidth: isFocused ? borderWidth.medium : borderWidth.thin,
            borderBottomColor: getBorderColor(),
          };
        default:
          return baseStyle;
      }
    };

    // Determine if conditional icons should show
    const showConditionalIcons = isFocused || hasValue;

    // Render reset button
    const renderResetButton = () => {
      if (!showResetButton || !hasValue || disabled || readOnly) return null;

      return (
        <Pressable
          onPress={handleReset}
          style={styles.iconContainer}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <ClearIcon color={getIconColor()} size={18} />
        </Pressable>
      );
    };

    // Render floating label
    const renderFloatingLabel = () => {
      if (!label || labelBehavior !== 'floating') return null;

      const floatingLabelBgColor = getColor('floatingLabelBackgroundColor', getBackgroundColor());

      // Animated styles for floating label
      const labelTop = labelAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [config.height / 2 - config.fontSize / 2, -config.labelFontSize / 2],
      });

      const labelLeft = labelAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [startIcon ? spacing.xl + spacing.md : config.paddingHorizontal, config.paddingHorizontal - spacing.xs],
      });

      const labelFontSize = labelAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [config.fontSize, config.labelFontSize],
      });

      return (
        <Animated.View
          style={[
            styles.floatingLabelContainer,
            {
              top: labelTop,
              left: labelLeft,
              backgroundColor: isLabelFloated ? floatingLabelBgColor : 'transparent',
              paddingHorizontal: isLabelFloated ? spacing.xs : 0,
              pointerEvents: 'none',
            },
          ]}
        >
          <Animated.Text
            style={[
              styles.floatingLabel,
              {
                fontSize: labelFontSize,
                color: getLabelColor(),
              },
            ]}
          >
            {label}
            {required && <Animated.Text style={{ color: theme.colors.text.error }}> *</Animated.Text>}
          </Animated.Text>
        </Animated.View>
      );
    };

    // Static label rendering (original behavior)
    const renderStaticLabel = () => {
      if (!label || labelBehavior !== 'static') return null;

      return (
        <View style={styles.labelContainer}>
          <SushiText
            variant="label"
            color={getLabelColorProp()}
            style={styles.label}
          >
            {label}
            {required && (
              <SushiText color="error"> *</SushiText>
            )}
          </SushiText>
        </View>
      );
    };

    return (
      <View style={[styles.container, containerStyle]}>
        {/* Static Label (above field) */}
        {renderStaticLabel()}

        {/* Input Container */}
        <View style={[getInputContainerStyle(), inputContainerStyle]}>
          {/* Floating Label */}
          {renderFloatingLabel()}

          {/* Leading Icon (always visible) */}
          {startIcon && <View style={styles.iconContainer}>{startIcon}</View>}

          {/* Prefix Icon (conditionally visible) */}
          {prefixIcon && showConditionalIcons && (
            <View style={styles.iconContainer}>{prefixIcon}</View>
          )}

          {/* Prefix Text */}
          {prefixText && (
            <SushiText
              variant="body"
              color="secondary"
              style={styles.prefixSuffixText}
            >
              {prefixText}
            </SushiText>
          )}

          {/* Text Input */}
          <TextInput
            ref={ref}
            style={[
              styles.input,
              {
                fontSize: config.fontSize,
                paddingHorizontal: (startIcon || prefixIcon) ? spacing.sm : config.paddingHorizontal,
                color: disabled
                  ? getColor('disabledTextColor', theme.colors.text.disabled)
                  : getColor('textColor', theme.colors.text.primary),
                // Add top padding for floating label when floated to make room
                paddingTop: labelBehavior === 'floating' ? spacing.sm : 0,
              },
              inputStyle,
            ]}
            value={currentValue}
            onChangeText={handleTextChange}
            // Only show placeholder when label is not floating or when floating label is in "up" position
            placeholder={labelBehavior === 'floating' ? (isLabelFloated ? undefined : undefined) : placeholder}
            placeholderTextColor={getColor('placeholderColor', theme.colors.text.tertiary)}
            editable={!disabled && !readOnly}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />

          {/* Suffix Text */}
          {suffixText && (
            <SushiText
              variant="body"
              color="secondary"
              style={styles.prefixSuffixText}
            >
              {suffixText}
            </SushiText>
          )}

          {/* Reset Button */}
          {renderResetButton()}

          {/* Suffix Icon (conditionally visible) */}
          {suffixIcon && showConditionalIcons && (
            <View style={styles.iconContainer}>{suffixIcon}</View>
          )}

          {/* Trailing Icon (always visible) */}
          {endIcon && <View style={styles.iconContainer}>{endIcon}</View>}
        </View>

        {/* Support/Helper Text */}
        {displaySupportText && (
          <SushiText
            variant="caption"
            color={hasError ? 'error' : 'secondary'}
            style={styles.supportText}
          >
            {displaySupportText}
          </SushiText>
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  labelContainer: {
    marginBottom: spacing.xs,
  },
  label: {
    // Style handled by SushiText
  },
  input: {
    flex: 1,
    height: '100%',
    minHeight: 40,
  },
  iconContainer: {
    paddingHorizontal: spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  prefixSuffixText: {
    paddingHorizontal: spacing.xs,
  },
  supportText: {
    marginTop: spacing.xs,
    marginLeft: spacing.xs,
  },
  floatingLabelContainer: {
    position: 'absolute',
    zIndex: 1,
  },
  floatingLabel: {
    // Styles applied dynamically via animation
  },
});

SushiTextField.displayName = 'SushiTextField';
