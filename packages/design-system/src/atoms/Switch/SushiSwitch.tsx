/**
 * SushiSwitch - Toggle Switch Component
 *
 * A theme-aware toggle switch component.
 *
 * @platform android
 * @platform ios
 * @platform web
 */

import React, { useRef, useEffect } from 'react';
import { View, Pressable, StyleSheet, Animated, ViewStyle } from 'react-native';
import { useTheme } from '../../theme';
import { SushiText } from '../Text/SushiText';
import { spacing, borderRadius } from '../../tokens/dimensions';

/**
 * Switch sizes
 */
export type SwitchSize = 'sm' | 'md' | 'lg';

/**
 * SushiSwitch Props
 */
export interface SushiSwitchProps {
  /** Switch value */
  value: boolean;
  /** Change handler */
  onValueChange: (value: boolean) => void;
  /** Switch label */
  label?: string;
  /** Description text */
  description?: string;
  /** Switch size */
  size?: SwitchSize;
  /** Disabled state */
  disabled?: boolean;
  /** Label position */
  labelPosition?: 'left' | 'right';
  /** Container style */
  style?: ViewStyle;
}

/**
 * Size configurations
 */
const sizeConfig: Record<SwitchSize, { track: { width: number; height: number }; thumb: number }> = {
  sm: { track: { width: 36, height: 20 }, thumb: 16 },
  md: { track: { width: 44, height: 24 }, thumb: 20 },
  lg: { track: { width: 52, height: 28 }, thumb: 24 },
};

/**
 * SushiSwitch Component
 *
 * @example
 * ```tsx
 * const [enabled, setEnabled] = useState(false);
 *
 * <SushiSwitch
 *   value={enabled}
 *   onValueChange={setEnabled}
 *   label="Enable notifications"
 * />
 * ```
 */
export const SushiSwitch: React.FC<SushiSwitchProps> = ({
  value,
  onValueChange,
  label,
  description,
  size = 'md',
  disabled = false,
  labelPosition = 'right',
  style,
}) => {
  const { theme } = useTheme();
  const config = sizeConfig[size];
  const translateX = useRef(new Animated.Value(value ? 1 : 0)).current;

  // Animate thumb position
  useEffect(() => {
    Animated.spring(translateX, {
      toValue: value ? 1 : 0,
      useNativeDriver: true,
      tension: 50,
      friction: 8,
    }).start();
  }, [value, translateX]);

  const handlePress = () => {
    if (!disabled) {
      onValueChange(!value);
    }
  };

  // Calculate thumb translation
  const thumbOffset = config.track.width - config.thumb - 4; // 4px padding
  const thumbTranslate = translateX.interpolate({
    inputRange: [0, 1],
    outputRange: [2, thumbOffset],
  });

  // Get track colors
  const getTrackColor = () => {
    if (disabled) {
      return value ? theme.colors.interactive.primaryDisabled : theme.colors.surface.disabled;
    }
    return value ? theme.colors.interactive.primary : theme.colors.border.default;
  };

  // Get thumb color
  const getThumbColor = () => {
    if (disabled) {
      return theme.colors.text.disabled;
    }
    return theme.colors.text.inverse;
  };

  // Render label content
  const renderLabel = () => {
    if (!label && !description) return null;

    return (
      <View
        style={[
          styles.labelContainer,
          labelPosition === 'left' ? styles.labelLeft : styles.labelRight,
        ]}
      >
        {label && (
          <SushiText
            variant={size === 'sm' ? 'bodySmall' : 'body'}
            color={disabled ? 'disabled' : 'primary'}
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
    );
  };

  return (
    <Pressable
      style={[styles.container, style]}
      onPress={handlePress}
      disabled={disabled}
      accessibilityRole="switch"
      accessibilityState={{ checked: value, disabled }}
    >
      {labelPosition === 'left' && renderLabel()}

      <View
        style={[
          styles.track,
          {
            width: config.track.width,
            height: config.track.height,
            borderRadius: config.track.height / 2,
            backgroundColor: getTrackColor(),
          },
        ]}
      >
        <Animated.View
          style={[
            styles.thumb,
            {
              width: config.thumb,
              height: config.thumb,
              borderRadius: config.thumb / 2,
              backgroundColor: getThumbColor(),
              transform: [{ translateX: thumbTranslate }],
            },
          ]}
        />
      </View>

      {labelPosition === 'right' && renderLabel()}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  track: {
    justifyContent: 'center',
  },
  thumb: {
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  labelContainer: {
    flex: 1,
  },
  labelLeft: {
    marginRight: spacing.md,
  },
  labelRight: {
    marginLeft: spacing.md,
  },
  description: {
    marginTop: spacing['2xs'],
  },
});

SushiSwitch.displayName = 'SushiSwitch';
