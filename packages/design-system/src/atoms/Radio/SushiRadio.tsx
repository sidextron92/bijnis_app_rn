/**
 * SushiRadio - Radio Button Component
 *
 * A theme-aware radio button component.
 *
 * @platform android
 * @platform ios
 * @platform web
 */

import React from 'react';
import { View, Pressable, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../theme';
import { SushiText } from '../Text/SushiText';
import { spacing, borderWidth } from '../../tokens/dimensions';

/**
 * Radio sizes
 */
export type RadioSize = 'sm' | 'md' | 'lg';

/**
 * SushiRadio Props
 */
export interface SushiRadioProps {
  /** Selected state */
  selected: boolean;
  /** Change handler */
  onSelect: () => void;
  /** Radio label */
  label?: string;
  /** Description text */
  description?: string;
  /** Radio size */
  size?: RadioSize;
  /** Disabled state */
  disabled?: boolean;
  /** Error state */
  error?: boolean;
  /** Container style */
  style?: ViewStyle;
}

/**
 * Size configurations
 */
const sizeConfig: Record<RadioSize, { outer: number; inner: number }> = {
  sm: { outer: 16, inner: 8 },
  md: { outer: 20, inner: 10 },
  lg: { outer: 24, inner: 12 },
};

/**
 * SushiRadio Component
 *
 * @example
 * ```tsx
 * const [selected, setSelected] = useState('option1');
 *
 * <SushiRadio
 *   selected={selected === 'option1'}
 *   onSelect={() => setSelected('option1')}
 *   label="Option 1"
 * />
 * <SushiRadio
 *   selected={selected === 'option2'}
 *   onSelect={() => setSelected('option2')}
 *   label="Option 2"
 * />
 * ```
 */
export const SushiRadio: React.FC<SushiRadioProps> = ({
  selected,
  onSelect,
  label,
  description,
  size = 'md',
  disabled = false,
  error = false,
  style,
}) => {
  const { theme } = useTheme();
  const config = sizeConfig[size];

  const handlePress = () => {
    if (!disabled) {
      onSelect();
    }
  };

  // Get outer circle colors
  const getOuterStyle = (): ViewStyle => {
    if (disabled) {
      return {
        borderColor: theme.colors.border.default,
        backgroundColor: theme.colors.surface.disabled,
      };
    }

    if (error) {
      return {
        borderColor: theme.colors.border.error,
        backgroundColor: 'transparent',
      };
    }

    return {
      borderColor: selected ? theme.colors.interactive.primary : theme.colors.border.default,
      backgroundColor: 'transparent',
    };
  };

  // Get inner circle color
  const getInnerColor = () => {
    if (disabled) return theme.colors.interactive.primaryDisabled;
    if (error) return theme.colors.background.error;
    return theme.colors.interactive.primary;
  };

  return (
    <Pressable
      style={[styles.container, style]}
      onPress={handlePress}
      disabled={disabled}
      accessibilityRole="radio"
      accessibilityState={{ checked: selected, disabled }}
    >
      <View
        style={[
          styles.outer,
          {
            width: config.outer,
            height: config.outer,
            borderRadius: config.outer / 2,
            borderWidth: borderWidth.medium,
          },
          getOuterStyle(),
        ]}
      >
        {selected && (
          <View
            style={[
              styles.inner,
              {
                width: config.inner,
                height: config.inner,
                borderRadius: config.inner / 2,
                backgroundColor: getInnerColor(),
              },
            ]}
          />
        )}
      </View>

      {(label || description) && (
        <View style={styles.textContainer}>
          {label && (
            <SushiText
              variant={size === 'sm' ? 'bodySmall' : 'body'}
              color={disabled ? 'disabled' : error ? 'error' : 'primary'}
            >
              {label}
            </SushiText>
          )}
          {description && (
            <SushiText
              variant="caption"
              color="secondary"
              style={styles.description}
            >
              {description}
            </SushiText>
          )}
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  outer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    // Styles applied inline
  },
  textContainer: {
    marginLeft: spacing.sm,
    flex: 1,
  },
  description: {
    marginTop: spacing['2xs'],
  },
});

SushiRadio.displayName = 'SushiRadio';

/**
 * RadioGroup - Group of radio buttons
 */
export interface RadioGroupProps<T extends string> {
  /** Current value */
  value: T;
  /** Change handler */
  onChange: (value: T) => void;
  /** Radio options */
  options: Array<{
    value: T;
    label: string;
    description?: string;
    disabled?: boolean;
  }>;
  /** Radio size */
  size?: RadioSize;
  /** Disabled state for entire group */
  disabled?: boolean;
  /** Error state */
  error?: boolean;
  /** Container style */
  style?: ViewStyle;
}

export function SushiRadioGroup<T extends string>({
  value,
  onChange,
  options = [],
  size = 'md',
  disabled = false,
  error = false,
  style,
}: RadioGroupProps<T>) {
  const safeOptions = options || [];
  return (
    <View style={[styles.group, style]}>
      {safeOptions.map((option) => (
        <SushiRadio
          key={option.value}
          selected={value === option.value}
          onSelect={() => onChange(option.value)}
          label={option.label}
          description={option.description}
          size={size}
          disabled={disabled || option.disabled}
          error={error}
          style={styles.groupItem}
        />
      ))}
    </View>
  );
}

const groupStyles = StyleSheet.create({
  group: {
    // Container for radio group
  },
  groupItem: {
    marginBottom: spacing.md,
  },
});

Object.assign(styles, groupStyles);

SushiRadioGroup.displayName = 'SushiRadioGroup';
