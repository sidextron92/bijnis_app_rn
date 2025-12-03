import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../tokens/colors';
import { borderRadius } from '../tokens/borderRadius';

/**
 * Supported platforms for this component
 * @platform android
 * @platform ios
 * @platform web
 */

type SkeletonVariant = 'text' | 'circular' | 'rectangular' | 'rounded';

export interface SkeletonProps {
  /** Skeleton variant */
  variant?: SkeletonVariant;
  /** Width */
  width?: number | string;
  /** Height */
  height?: number | string;
  /** Enable animation */
  animation?: boolean;
  /** Custom style */
  style?: ViewStyle;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  width,
  height,
  animation = true,
  style,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (animation) {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(animatedValue, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      );
      pulse.start();
      return () => pulse.stop();
    }
  }, [animation, animatedValue]);

  const getVariantStyle = (): ViewStyle => {
    switch (variant) {
      case 'text':
        return {
          width: width ?? '100%',
          height: height ?? 16,
          borderRadius: borderRadius.sm,
        };
      case 'circular':
        const size = width ?? 40;
        return {
          width: size,
          height: size,
          borderRadius: typeof size === 'number' ? size / 2 : borderRadius.full,
        };
      case 'rectangular':
        return {
          width: width ?? '100%',
          height: height ?? 100,
          borderRadius: 0,
        };
      case 'rounded':
        return {
          width: width ?? '100%',
          height: height ?? 100,
          borderRadius: borderRadius.md,
        };
      default:
        return {};
    }
  };

  const opacity = animation
    ? animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0.3, 0.7],
      })
    : 0.5;

  return (
    <Animated.View
      style={[
        styles.base,
        getVariantStyle(),
        { opacity },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: colors.gray[300],
  },
});

Skeleton.displayName = 'Skeleton';
