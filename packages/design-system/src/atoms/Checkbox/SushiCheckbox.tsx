/**
 * SushiCheckbox - Checkbox Component
 *
 * A theme-aware checkbox component.
 *
 * @platform android
 * @platform ios
 * @platform web
 */

import React from 'react';
import { View, Pressable, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../theme';
import { SushiText } from '../Text/SushiText';
import { spacing, borderRadius, borderWidth } from '../../tokens/dimensions';

/**
 * Checkbox sizes
 */
export type CheckboxSize = 'sm' | 'md' | 'lg';

/**
 * SushiCheckbox Props
 */
export interface SushiCheckboxProps {
  /** Checked state */
  checked: boolean;
  /** Change handler */
  onChange: (checked: boolean) => void;
  /** Checkbox label */
  label?: string;
  /** Checkbox size */
  size?: CheckboxSize;
  /** Disabled state */
  disabled?: boolean;
  /** Indeterminate state */
  indeterminate?: boolean;
  /** Error state */
  error?: boolean;
  /** Container style */
  style?: ViewStyle;
}

/**
 * Size configurations
 */
const sizeConfig: Record<CheckboxSize, { box: number; icon: number }> = {
  sm: { box: 16, icon: 10 },
  md: { box: 20, icon: 14 },
  lg: { box: 24, icon: 18 },
};

/**
 * SushiCheckbox Component
 *
 * @example
 * ```tsx
 * const [checked, setChecked] = useState(false);
 *
 * <SushiCheckbox
 *   checked={checked}
 *   onChange={setChecked}
 *   label="Accept terms and conditions"
 * />
 * ```
 */
export const SushiCheckbox: React.FC<SushiCheckboxProps> = ({
  checked,
  onChange,
  label,
  size = 'md',
  disabled = false,
  indeterminate = false,
  error = false,
  style,
}) => {
  const { theme } = useTheme();
  const config = sizeConfig[size];

  const handlePress = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  // Get box colors
  const getBoxStyle = (): ViewStyle => {
    const isActive = checked || indeterminate;

    if (disabled) {
      return {
        backgroundColor: isActive ? theme.colors.interactive.primaryDisabled : theme.colors.surface.disabled,
        borderColor: theme.colors.border.default,
      };
    }

    if (error) {
      return {
        backgroundColor: isActive ? theme.colors.background.error : 'transparent',
        borderColor: theme.colors.border.error,
      };
    }

    return {
      backgroundColor: isActive ? theme.colors.interactive.primary : 'transparent',
      borderColor: isActive ? theme.colors.interactive.primary : theme.colors.border.default,
    };
  };

  // Checkmark icon
  const renderIcon = () => {
    if (!checked && !indeterminate) return null;

    const iconColor = disabled ? theme.colors.text.disabled : theme.colors.text.inverse;

    if (indeterminate) {
      // Minus icon for indeterminate
      return (
        <View
          style={[
            styles.indeterminateLine,
            {
              width: config.icon,
              backgroundColor: iconColor,
            },
          ]}
        />
      );
    }

    // Checkmark
    return (
      <View style={styles.checkmark}>
        <View
          style={[
            styles.checkmarkShort,
            {
              backgroundColor: iconColor,
              width: config.icon * 0.3,
              height: 2,
            },
          ]}
        />
        <View
          style={[
            styles.checkmarkLong,
            {
              backgroundColor: iconColor,
              width: config.icon * 0.7,
              height: 2,
            },
          ]}
        />
      </View>
    );
  };

  return (
    <Pressable
      style={[styles.container, style]}
      onPress={handlePress}
      disabled={disabled}
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled }}
    >
      <View
        style={[
          styles.box,
          {
            width: config.box,
            height: config.box,
            borderRadius: borderRadius.xs,
            borderWidth: borderWidth.medium,
          },
          getBoxStyle(),
        ]}
      >
        {renderIcon()}
      </View>

      {label && (
        <SushiText
          variant={size === 'sm' ? 'bodySmall' : 'body'}
          color={disabled ? 'disabled' : error ? 'error' : 'primary'}
          style={styles.label}
        >
          {label}
        </SushiText>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  box: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginLeft: spacing.sm,
  },
  checkmark: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkShort: {
    position: 'absolute',
    transform: [{ rotate: '45deg' }, { translateX: -2 }, { translateY: 2 }],
  },
  checkmarkLong: {
    position: 'absolute',
    transform: [{ rotate: '-45deg' }, { translateX: 2 }],
  },
  indeterminateLine: {
    height: 2,
    borderRadius: 1,
  },
});

SushiCheckbox.displayName = 'SushiCheckbox';
