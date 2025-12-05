/**
 * SizeSetSelector - Size Set Selector Component
 *
 * A quantity selector component with increment/decrement buttons for selecting
 * the number of size sets. Features rounded square buttons with +/- controls.
 *
 * @platform android
 * @platform ios
 * @platform web
 */

import React from 'react';
import { View, Pressable, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../theme';
import { SushiText } from '../Text/SushiText';
import { spacing } from '../../tokens/spacing';

/**
 * SizeSetSelector Props
 */
export interface SizeSetSelectorProps {
  /** Current quantity value */
  value: number;
  /** Callback when value changes */
  onChange?: (value: number) => void;
  /** Minimum value (default: 0) */
  min?: number;
  /** Maximum value (default: undefined - no limit) */
  max?: number;
  /** Step increment (default: 1) */
  step?: number;
  /** Disabled state */
  disabled?: boolean;
  /** Custom style */
  style?: ViewStyle;
}

/**
 * SizeSetSelector Component
 *
 * Displays a quantity selector with minus, value display, and plus buttons.
 * Buttons are disabled when reaching min/max limits.
 *
 * @example
 * ```tsx
 * <SizeSetSelector
 *   value={4}
 *   onChange={(value) => console.log(value)}
 *   min={0}
 *   max={99}
 * />
 * ```
 */
export const SizeSetSelector: React.FC<SizeSetSelectorProps> = ({
  value,
  onChange,
  min = 0,
  max,
  step = 1,
  disabled = false,
  style,
}) => {
  const { theme } = useTheme();

  const canDecrement = !disabled && value > min;
  const canIncrement = !disabled && (max === undefined || value < max);

  const handleDecrement = () => {
    if (canDecrement && onChange) {
      onChange(Math.max(min, value - step));
    }
  };

  const handleIncrement = () => {
    if (canIncrement && onChange) {
      onChange(max !== undefined ? Math.min(max, value + step) : value + step);
    }
  };

  const getButtonStyle = (isActive: boolean, hasValue: boolean) => {
    if (!isActive) {
      return {
        backgroundColor: '#FFFFFF',
        borderColor: '#E5E9F4',
      };
    }
    if (hasValue) {
      return {
        backgroundColor: '#FFFFFF',
        borderColor: theme.colors.interactive.primary,
      };
    }
    return {
      backgroundColor: '#FFFFFF',
      borderColor: '#E5E9F4',
    };
  };

  const getTextColor = (isActive: boolean, hasValue: boolean) => {
    if (!isActive) {
      return '#E5E9F4';
    }
    if (hasValue) {
      return theme.colors.interactive.primary;
    }
    return theme.colors.interactive.primary;
  };

  const hasValue = value > 0;

  return (
    <View style={[styles.container, style]}>
      {/* Decrement Button */}
      <Pressable
        onPress={handleDecrement}
        disabled={!canDecrement}
        style={({ pressed }) => [
          styles.button,
          getButtonStyle(canDecrement, hasValue),
          pressed && styles.pressed,
        ]}
      >
        <SushiText
          variant="h3"
          customColor={getTextColor(canDecrement, hasValue)}
          style={styles.buttonText}
        >
          −
        </SushiText>
      </Pressable>

      {/* Value Display */}
      <View
        style={[
          styles.valueContainer,
          getButtonStyle(true, hasValue),
        ]}
      >
        <SushiText
          variant="body"
          customColor={theme.colors.interactive.primary}
          style={styles.valueText}
        >
          {value}
        </SushiText>
      </View>

      {/* Increment Button */}
      <Pressable
        onPress={handleIncrement}
        disabled={!canIncrement}
        style={({ pressed }) => [
          styles.button,
          getButtonStyle(canIncrement, true),
          pressed && styles.pressed,
        ]}
      >
        <SushiText
          variant="h3"
          customColor={getTextColor(canIncrement, true)}
          style={styles.buttonText}
        >
          +
        </SushiText>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  button: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 24,
  },
  valueContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  valueText: {
    fontSize: 14,
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.7,
  },
});

SizeSetSelector.displayName = 'SizeSetSelector';
