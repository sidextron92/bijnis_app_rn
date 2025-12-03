/**
 * SushiViewFlipper - View Flipper Component
 *
 * A theme-aware component that automatically cycles through multiple
 * content items with animated transitions.
 *
 * @platform android
 * @platform ios
 * @platform web
 */

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  ReactNode,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {
  View,
  StyleSheet,
  Animated,
  ViewStyle,
  Easing,
  LayoutChangeEvent,
} from 'react-native';
import { spacing } from '../../tokens/dimensions';

/**
 * Animation direction for flip transitions
 */
export type FlipDirection = 'flipToTop' | 'flipToBottom';

/**
 * Ref methods for SushiViewFlipper
 */
export interface SushiViewFlipperRef {
  play: () => void;
  pause: () => void;
  next: () => void;
  previous: () => void;
  goTo: (index: number) => void;
  getCurrentIndex: () => number;
}

/**
 * Props for SushiViewFlipper
 */
export interface SushiViewFlipperProps {
  /** Number of items to cycle through */
  count: number;
  /** Time between transitions (ms) */
  flipInterval?: number;
  /** Animation duration (ms) */
  animationDuration?: number;
  /** Animation direction */
  animationDirection?: FlipDirection;
  /** Whether cycling is active */
  isPlaying?: boolean;
  /** Initial index */
  initialIndex?: number;
  /** Callback when item changes */
  onFlip?: (index: number) => void;
  /** Custom container style */
  style?: ViewStyle;
  /** Render function for each item */
  renderItem: (index: number) => ReactNode;
}

/**
 * SushiViewFlipper Component
 *
 * @example
 * ```tsx
 * // Basic usage
 * <SushiViewFlipper
 *   count={3}
 *   flipInterval={3000}
 *   renderItem={(index) => (
 *     <Text>Item {index + 1}</Text>
 *   )}
 * />
 *
 * // With control ref
 * const flipperRef = useRef<SushiViewFlipperRef>(null);
 *
 * <SushiViewFlipper
 *   ref={flipperRef}
 *   count={5}
 *   isPlaying={false}
 *   renderItem={(index) => <PromoCard data={promos[index]} />}
 * />
 *
 * // Manual control
 * <Button title="Next" onPress={() => flipperRef.current?.next()} />
 * <Button title="Play" onPress={() => flipperRef.current?.play()} />
 *
 * // Different animation directions
 * <SushiViewFlipper
 *   count={3}
 *   animationDirection="flipToBottom"
 *   renderItem={(index) => <Content index={index} />}
 * />
 * ```
 */
export const SushiViewFlipper = forwardRef<SushiViewFlipperRef, SushiViewFlipperProps>(
  (
    {
      count,
      flipInterval = 3000,
      animationDuration = 600,
      animationDirection = 'flipToTop',
      isPlaying = true,
      initialIndex = 0,
      onFlip,
      style,
      renderItem,
    },
    ref
  ) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [nextIndex, setNextIndex] = useState<number | null>(null);
    const [containerHeight, setContainerHeight] = useState(0);
    const [playing, setPlaying] = useState(isPlaying);

    const currentAnim = useRef(new Animated.Value(0)).current;
    const nextAnim = useRef(new Animated.Value(1)).current;
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const currentIndexRef = useRef(initialIndex);

    // Sync playing state with prop
    useEffect(() => {
      setPlaying(isPlaying);
    }, [isPlaying]);

    // Get animation values based on direction
    const getAnimationTransform = useCallback(
      (isEntering: boolean, animValue: Animated.Value) => {
        const direction = animationDirection === 'flipToTop' ? -1 : 1;

        if (isEntering) {
          // New content entering
          return animValue.interpolate({
            inputRange: [0, 1],
            outputRange: [direction * containerHeight, 0],
          });
        } else {
          // Current content exiting
          return animValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -direction * containerHeight],
          });
        }
      },
      [animationDirection, containerHeight]
    );

    // Animate to next item
    const animateToNext = useCallback(
      (targetIndex: number) => {
        if (count <= 1 || containerHeight === 0) return;

        setNextIndex(targetIndex);
        currentAnim.setValue(0);
        nextAnim.setValue(1);

        Animated.parallel([
          Animated.timing(currentAnim, {
            toValue: 1,
            duration: animationDuration,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(nextAnim, {
            toValue: 0,
            duration: animationDuration,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
        ]).start(({ finished }) => {
          if (finished) {
            setCurrentIndex(targetIndex);
            currentIndexRef.current = targetIndex;
            setNextIndex(null);
            currentAnim.setValue(0);
            onFlip?.(targetIndex);
          }
        });
      },
      [count, containerHeight, currentAnim, nextAnim, animationDuration, onFlip]
    );

    // Go to next item
    const next = useCallback(() => {
      const targetIndex = (currentIndexRef.current + 1) % count;
      animateToNext(targetIndex);
    }, [count, animateToNext]);

    // Go to previous item
    const previous = useCallback(() => {
      const targetIndex = (currentIndexRef.current - 1 + count) % count;
      animateToNext(targetIndex);
    }, [count, animateToNext]);

    // Go to specific index
    const goTo = useCallback(
      (index: number) => {
        if (index >= 0 && index < count && index !== currentIndexRef.current) {
          animateToNext(index);
        }
      },
      [count, animateToNext]
    );

    // Play control
    const play = useCallback(() => setPlaying(true), []);
    const pause = useCallback(() => setPlaying(false), []);

    // Get current index
    const getCurrentIndex = useCallback(() => currentIndexRef.current, []);

    // Expose ref methods
    useImperativeHandle(
      ref,
      () => ({
        play,
        pause,
        next,
        previous,
        goTo,
        getCurrentIndex,
      }),
      [play, pause, next, previous, goTo, getCurrentIndex]
    );

    // Auto-flip timer
    useEffect(() => {
      if (playing && count > 1 && containerHeight > 0) {
        timerRef.current = setInterval(() => {
          next();
        }, flipInterval);
      }

      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      };
    }, [playing, count, flipInterval, containerHeight, next]);

    // Handle layout
    const handleLayout = (event: LayoutChangeEvent) => {
      setContainerHeight(event.nativeEvent.layout.height);
    };

    if (count === 0) return null;

    return (
      <View style={[styles.container, style]} onLayout={handleLayout}>
        {/* Current item */}
        <Animated.View
          style={[
            styles.item,
            {
              transform: [
                { translateY: getAnimationTransform(false, currentAnim) },
              ],
              opacity: currentAnim.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [1, 0.5, 0],
              }),
            },
          ]}
        >
          {renderItem(currentIndex)}
        </Animated.View>

        {/* Next item (during animation) */}
        {nextIndex !== null && (
          <Animated.View
            style={[
              styles.item,
              styles.nextItem,
              {
                transform: [
                  { translateY: getAnimationTransform(true, nextAnim) },
                ],
                opacity: nextAnim.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [1, 0.5, 0],
                }),
              },
            ]}
          >
            {renderItem(nextIndex)}
          </Animated.View>
        )}
      </View>
    );
  }
);

/**
 * Hook to manage ViewFlipper state externally
 */
export const useSushiViewFlipperState = (
  count: number,
  initialIndex = 0,
  autoPlay = true
) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const flipperRef = useRef<SushiViewFlipperRef>(null);

  const play = useCallback(() => {
    setIsPlaying(true);
    flipperRef.current?.play();
  }, []);

  const pause = useCallback(() => {
    setIsPlaying(false);
    flipperRef.current?.pause();
  }, []);

  const next = useCallback(() => {
    flipperRef.current?.next();
  }, []);

  const previous = useCallback(() => {
    flipperRef.current?.previous();
  }, []);

  const goTo = useCallback((index: number) => {
    flipperRef.current?.goTo(index);
  }, []);

  const onFlip = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  return {
    flipperRef,
    currentIndex,
    isPlaying,
    play,
    pause,
    next,
    previous,
    goTo,
    onFlip,
    count,
  };
};

export type SushiViewFlipperState = ReturnType<typeof useSushiViewFlipperState>;

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    position: 'relative',
  },
  item: {
    width: '100%',
  },
  nextItem: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
});

SushiViewFlipper.displayName = 'SushiViewFlipper';

// Aliases for backward compatibility
export const ViewFlipper = SushiViewFlipper;
