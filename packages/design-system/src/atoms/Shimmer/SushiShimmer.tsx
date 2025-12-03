/**
 * SushiShimmer - Shimmer Loading Component
 *
 * A theme-aware shimmer animation component for displaying loading states.
 * Provides animated placeholder content while data is being loaded.
 *
 * @platform android
 * @platform ios
 * @platform web
 */

import React, { useEffect, useRef, ReactNode } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  ViewStyle,
  Easing,
  LayoutChangeEvent,
} from 'react-native';
import { useTheme } from '../../theme';
import { spacing, borderRadius } from '../../tokens/dimensions';

/**
 * Shimmer animation configuration
 */
export interface ShimmerAnimationConfig {
  /** Background color of shimmer */
  bgColor?: string;
  /** Highlight color that traverses the shimmer */
  animationColor?: string;
  /** Width of the highlight gradient */
  animationWidth?: number;
  /** Angle offset for diagonal effect (degrees) */
  angleOffset?: number;
  /** Duration of one animation cycle (ms) */
  animationDuration?: number;
  /** Delay between animation cycles (ms) */
  animationDelay?: number;
}

/**
 * Props for SushiShimmer
 */
export interface SushiShimmerProps extends ShimmerAnimationConfig {
  /** Whether shimmer is visible/active */
  visible?: boolean;
  /** Custom container style */
  style?: ViewStyle;
  /** Children to render shimmer over */
  children?: ReactNode;
}

/**
 * Props for ShimmerItem
 */
export interface ShimmerItemProps {
  /** Width of the item */
  width?: number | string;
  /** Height of the item */
  height?: number;
  /** Border radius */
  radius?: number;
  /** Whether to make it circular */
  circular?: boolean;
  /** Custom style */
  style?: ViewStyle;
}

/**
 * Props for ShimmerText
 */
export interface ShimmerTextProps {
  /** Width of the text line */
  width?: number | string;
  /** Line height */
  lineHeight?: number;
  /** Number of lines */
  lines?: number;
  /** Gap between lines */
  lineGap?: number;
  /** Custom style */
  style?: ViewStyle;
}

/**
 * Context for shimmer scope
 */
const ShimmerContext = React.createContext<{
  animatedValue: Animated.Value;
  config: ShimmerAnimationConfig;
  containerWidth: number;
}>({
  animatedValue: new Animated.Value(0),
  config: {},
  containerWidth: 0,
});

/**
 * ShimmerItem - Individual shimmer placeholder shape
 */
export const ShimmerItem: React.FC<ShimmerItemProps> = ({
  width = '100%',
  height = 16,
  radius = borderRadius.sm,
  circular = false,
  style,
}) => {
  const { theme } = useTheme();
  const { animatedValue, config, containerWidth } = React.useContext(ShimmerContext);

  const bgColor = config.bgColor || theme.colors.background.tertiary;
  const animationColor = config.animationColor || theme.colors.background.secondary;
  const animationWidth = config.animationWidth || 100;

  const finalRadius = circular ? (typeof height === 'number' ? height / 2 : radius) : radius;
  const finalWidth = circular ? height : width;

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-animationWidth, containerWidth + animationWidth],
  });

  return (
    <View
      style={[
        styles.shimmerItem,
        {
          width: finalWidth,
          height,
          borderRadius: finalRadius,
          backgroundColor: bgColor,
          overflow: 'hidden',
        },
        style,
      ]}
    >
      <Animated.View
        style={[
          styles.shimmerHighlight,
          {
            width: animationWidth,
            backgroundColor: animationColor,
            transform: [{ translateX }],
          },
        ]}
      />
    </View>
  );
};

/**
 * ShimmerText - Shimmer effect for text lines
 */
export const ShimmerText: React.FC<ShimmerTextProps> = ({
  width = '100%',
  lineHeight = 14,
  lines = 1,
  lineGap = spacing.sm,
  style,
}) => {
  return (
    <View style={[styles.shimmerTextContainer, style]}>
      {Array.from({ length: lines }).map((_, index) => (
        <ShimmerItem
          key={index}
          width={
            index === lines - 1 && lines > 1
              ? typeof width === 'number'
                ? width * 0.6
                : '60%'
              : width
          }
          height={lineHeight}
          style={index > 0 ? { marginTop: lineGap } : undefined}
        />
      ))}
    </View>
  );
};

/**
 * ShimmerAvatar - Circular avatar placeholder
 */
export const ShimmerAvatar: React.FC<{ size?: number; style?: ViewStyle }> = ({
  size = 40,
  style,
}) => {
  return <ShimmerItem width={size} height={size} circular style={style} />;
};

/**
 * ShimmerCard - Card-like placeholder
 */
export const ShimmerCard: React.FC<{
  width?: number | string;
  height?: number;
  style?: ViewStyle;
}> = ({ width = '100%', height = 120, style }) => {
  return <ShimmerItem width={width} height={height} radius={borderRadius.lg} style={style} />;
};

/**
 * SushiShimmer Component
 *
 * @example
 * ```tsx
 * // Basic usage with built-in components
 * <SushiShimmer visible={isLoading}>
 *   <ShimmerAvatar size={48} />
 *   <ShimmerText lines={2} width="80%" />
 * </SushiShimmer>
 *
 * // Custom shimmer item
 * <SushiShimmer animationDuration={1500}>
 *   <ShimmerItem width={200} height={20} />
 *   <ShimmerItem width={150} height={16} style={{ marginTop: 8 }} />
 * </SushiShimmer>
 *
 * // Loading card skeleton
 * <SushiShimmer>
 *   <View style={{ flexDirection: 'row' }}>
 *     <ShimmerAvatar size={56} />
 *     <View style={{ flex: 1, marginLeft: 12 }}>
 *       <ShimmerText lines={1} width="60%" />
 *       <ShimmerText lines={2} width="100%" style={{ marginTop: 8 }} />
 *     </View>
 *   </View>
 * </SushiShimmer>
 * ```
 */
export const SushiShimmer: React.FC<SushiShimmerProps> = ({
  visible = true,
  bgColor,
  animationColor,
  animationWidth = 100,
  angleOffset = 0,
  animationDuration = 1200,
  animationDelay = 0,
  style,
  children,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [containerWidth, setContainerWidth] = React.useState(300);

  useEffect(() => {
    if (visible) {
      const startAnimation = () => {
        animatedValue.setValue(0);
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: animationDuration,
          delay: animationDelay,
          easing: Easing.linear,
          useNativeDriver: true,
        }).start(({ finished }) => {
          if (finished && visible) {
            startAnimation();
          }
        });
      };

      startAnimation();
    }

    return () => {
      animatedValue.stopAnimation();
    };
  }, [visible, animatedValue, animationDuration, animationDelay]);

  const handleLayout = (event: LayoutChangeEvent) => {
    setContainerWidth(event.nativeEvent.layout.width);
  };

  if (!visible) {
    return null;
  }

  const config: ShimmerAnimationConfig = {
    bgColor,
    animationColor,
    animationWidth,
    angleOffset,
    animationDuration,
    animationDelay,
  };

  return (
    <ShimmerContext.Provider value={{ animatedValue, config, containerWidth }}>
      <View style={[styles.container, style]} onLayout={handleLayout}>
        {children}
      </View>
    </ShimmerContext.Provider>
  );
};

/**
 * Hook to use shimmer context
 */
export const useShimmerContext = () => React.useContext(ShimmerContext);

/**
 * Preset shimmer layouts
 */
export const ShimmerPresets = {
  /** List item with avatar and two lines of text */
  ListItem: () => (
    <View style={styles.presetListItem}>
      <ShimmerAvatar size={48} />
      <View style={styles.presetListItemContent}>
        <ShimmerText lines={1} width="70%" />
        <ShimmerText lines={1} width="40%" style={{ marginTop: spacing.xs }} />
      </View>
    </View>
  ),

  /** Card with image and content */
  Card: () => (
    <View style={styles.presetCard}>
      <ShimmerItem width="100%" height={160} radius={borderRadius.lg} />
      <View style={styles.presetCardContent}>
        <ShimmerText lines={1} width="80%" />
        <ShimmerText lines={2} width="100%" style={{ marginTop: spacing.sm }} />
      </View>
    </View>
  ),

  /** Profile header */
  Profile: () => (
    <View style={styles.presetProfile}>
      <ShimmerAvatar size={80} />
      <ShimmerText lines={1} width={120} style={{ marginTop: spacing.md }} />
      <ShimmerText lines={1} width={180} style={{ marginTop: spacing.xs }} />
    </View>
  ),
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  shimmerItem: {
    overflow: 'hidden',
  },
  shimmerHighlight: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    opacity: 0.4,
  },
  shimmerTextContainer: {
    flexDirection: 'column',
  },
  presetListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  presetListItemContent: {
    flex: 1,
    marginLeft: spacing.md,
  },
  presetCard: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  presetCardContent: {
    padding: spacing.md,
  },
  presetProfile: {
    alignItems: 'center',
    padding: spacing.lg,
  },
});

SushiShimmer.displayName = 'SushiShimmer';
ShimmerItem.displayName = 'ShimmerItem';
ShimmerText.displayName = 'ShimmerText';
ShimmerAvatar.displayName = 'ShimmerAvatar';
ShimmerCard.displayName = 'ShimmerCard';

// Aliases for backward compatibility
export const Shimmer = SushiShimmer;
