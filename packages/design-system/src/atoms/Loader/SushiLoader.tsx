/**
 * SushiLoader - Loading Indicator Component
 *
 * A theme-aware loading indicator component.
 *
 * @platform android
 * @platform ios
 * @platform web
 */

import React, { useRef, useEffect } from 'react';
import { View, Animated, StyleSheet, ViewStyle, Easing } from 'react-native';
import { useTheme } from '../../theme';
import { SushiText } from '../Text/SushiText';
import { spacing } from '../../tokens/dimensions';

/**
 * Loader sizes
 */
export type LoaderSize = 'sm' | 'md' | 'lg' | 'xl';

/**
 * Loader variants
 */
export type LoaderVariant = 'spinner' | 'dots' | 'pulse';

/**
 * SushiLoader Props
 */
export interface SushiLoaderProps {
  /** Loader variant */
  variant?: LoaderVariant;
  /** Loader size */
  size?: LoaderSize;
  /** Color (defaults to brand) */
  color?: 'brand' | 'primary' | 'secondary' | 'inverse';
  /** Custom color */
  customColor?: string;
  /** Loading text */
  text?: string;
  /** Text position */
  textPosition?: 'bottom' | 'right';
  /** Container style */
  style?: ViewStyle;
}

/**
 * Size configurations
 */
const sizeConfig: Record<LoaderSize, number> = {
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
};

/**
 * SushiLoader Component
 *
 * @example
 * ```tsx
 * // Basic spinner
 * <SushiLoader />
 *
 * // Large spinner with text
 * <SushiLoader size="lg" text="Loading..." />
 *
 * // Dots loader
 * <SushiLoader variant="dots" />
 *
 * // Pulse loader
 * <SushiLoader variant="pulse" />
 * ```
 */
export const SushiLoader: React.FC<SushiLoaderProps> = ({
  variant = 'spinner',
  size = 'md',
  color = 'brand',
  customColor,
  text,
  textPosition = 'bottom',
  style,
}) => {
  const { theme } = useTheme();
  const spinValue = useRef(new Animated.Value(0)).current;
  const dotValues = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;
  const pulseValue = useRef(new Animated.Value(1)).current;

  const loaderSize = sizeConfig[size];

  // Get color
  const getColor = () => {
    if (customColor) return customColor;
    switch (color) {
      case 'brand':
        return theme.colors.interactive.primary;
      case 'primary':
        return theme.colors.text.primary;
      case 'secondary':
        return theme.colors.text.secondary;
      case 'inverse':
        return theme.colors.text.inverse;
      default:
        return theme.colors.interactive.primary;
    }
  };

  const loaderColor = getColor();

  // Spinner animation
  useEffect(() => {
    if (variant === 'spinner') {
      const animation = Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      );
      animation.start();
      return () => animation.stop();
    }
  }, [variant, spinValue]);

  // Dots animation
  useEffect(() => {
    if (variant === 'dots') {
      const animations = dotValues.map((value, index) =>
        Animated.loop(
          Animated.sequence([
            Animated.delay(index * 150),
            Animated.timing(value, {
              toValue: 1,
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(value, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            }),
          ])
        )
      );
      animations.forEach((anim) => anim.start());
      return () => animations.forEach((anim) => anim.stop());
    }
  }, [variant, dotValues]);

  // Pulse animation
  useEffect(() => {
    if (variant === 'pulse') {
      const animation = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseValue, {
            toValue: 0.4,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(pulseValue, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
        ])
      );
      animation.start();
      return () => animation.stop();
    }
  }, [variant, pulseValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // Render spinner
  const renderSpinner = () => (
    <Animated.View
      style={[
        styles.spinner,
        {
          width: loaderSize,
          height: loaderSize,
          borderRadius: loaderSize / 2,
          borderWidth: loaderSize * 0.1,
          borderColor: `${loaderColor}30`,
          borderTopColor: loaderColor,
          transform: [{ rotate: spin }],
        },
      ]}
    />
  );

  // Render dots
  const renderDots = () => (
    <View style={styles.dotsContainer}>
      {dotValues.map((value, index) => (
        <Animated.View
          key={index}
          style={[
            styles.dot,
            {
              width: loaderSize * 0.3,
              height: loaderSize * 0.3,
              borderRadius: loaderSize * 0.15,
              backgroundColor: loaderColor,
              marginHorizontal: loaderSize * 0.1,
              transform: [
                {
                  scale: value.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.6, 1],
                  }),
                },
              ],
              opacity: value.interpolate({
                inputRange: [0, 1],
                outputRange: [0.4, 1],
              }),
            },
          ]}
        />
      ))}
    </View>
  );

  // Render pulse
  const renderPulse = () => (
    <Animated.View
      style={[
        styles.pulse,
        {
          width: loaderSize,
          height: loaderSize,
          borderRadius: loaderSize / 2,
          backgroundColor: loaderColor,
          opacity: pulseValue,
        },
      ]}
    />
  );

  const renderLoader = () => {
    switch (variant) {
      case 'spinner':
        return renderSpinner();
      case 'dots':
        return renderDots();
      case 'pulse':
        return renderPulse();
      default:
        return renderSpinner();
    }
  };

  return (
    <View
      style={[
        styles.container,
        textPosition === 'right' && styles.horizontal,
        style,
      ]}
    >
      {renderLoader()}
      {text && (
        <SushiText
          variant="bodySmall"
          color="secondary"
          style={[
            styles.text,
            textPosition === 'right' ? styles.textRight : styles.textBottom,
          ]}
        >
          {text}
        </SushiText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
  },
  spinner: {
    // Styles applied inline
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    // Styles applied inline
  },
  pulse: {
    // Styles applied inline
  },
  text: {
    // Common text styles
  },
  textBottom: {
    marginTop: spacing.sm,
  },
  textRight: {
    marginLeft: spacing.sm,
  },
});

SushiLoader.displayName = 'SushiLoader';
