/**
 * SushiBottomSheet - Bottom Sheet Component
 *
 * A theme-aware modal bottom sheet component that slides up from the bottom
 * of the screen to display additional content.
 *
 * @platform android
 * @platform ios
 * @platform web
 */

import React, { useEffect, useRef, useCallback } from 'react';
import {
  View,
  Modal,
  StyleSheet,
  Animated,
  Pressable,
  PanResponder,
  Dimensions,
  ViewStyle,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useTheme } from '../../theme';
import { spacing, borderRadius } from '../../tokens/dimensions';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

/**
 * Bottom sheet size presets
 */
export type BottomSheetSize = 'auto' | 'small' | 'medium' | 'large' | 'full';

/**
 * Props for SushiBottomSheet
 */
export interface SushiBottomSheetProps {
  /** Whether the bottom sheet is visible */
  visible: boolean;
  /** Callback when dismiss is requested */
  onDismissRequest: () => void;
  /** Children content */
  children: React.ReactNode;
  /** Size preset or custom height */
  size?: BottomSheetSize;
  /** Custom height (overrides size) */
  height?: number | string;
  /** Custom background color */
  containerColor?: string;
  /** Content text color */
  contentColor?: string;
  /** Corner radius for top corners */
  cornerRadius?: number;
  /** Whether to show the drag handle */
  showHandle?: boolean;
  /** Whether dismissible by tapping outside */
  dismissOnClickOutside?: boolean;
  /** Whether dismissible by dragging down */
  dismissOnDrag?: boolean;
  /** Whether dismissible by back button (Android) */
  dismissOnBackPress?: boolean;
  /** Scrim/backdrop opacity (0-1) */
  scrimOpacity?: number;
  /** Custom container style */
  style?: ViewStyle;
  /** Enable scrollable content */
  scrollable?: boolean;
  /** Header component */
  header?: React.ReactNode;
  /** Footer component */
  footer?: React.ReactNode;
}

/**
 * Size to height percentage mapping
 */
const SIZE_HEIGHTS: Record<BottomSheetSize, number> = {
  auto: 0, // Will be calculated based on content
  small: 0.25,
  medium: 0.5,
  large: 0.75,
  full: 0.95,
};

/**
 * SushiBottomSheet Component
 */
export const SushiBottomSheet: React.FC<SushiBottomSheetProps> = ({
  visible,
  onDismissRequest,
  children,
  size = 'medium',
  height,
  containerColor,
  contentColor,
  cornerRadius,
  showHandle = true,
  dismissOnClickOutside = true,
  dismissOnDrag = true,
  dismissOnBackPress = true,
  scrimOpacity = 0.5,
  style,
  scrollable = false,
  header,
  footer,
}) => {
  const { theme } = useTheme();
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const contentHeight = useRef(0);

  const bgColor = containerColor || theme.colors.background.primary;
  // contentColor can be used by children via context if needed
  void contentColor;
  const radius = cornerRadius ?? borderRadius['2xl'];

  // Calculate sheet height
  const getSheetHeight = useCallback(() => {
    if (height) {
      if (typeof height === 'number') return height;
      // Percentage string like '60%'
      const percentage = parseFloat(height) / 100;
      return SCREEN_HEIGHT * percentage;
    }
    if (size === 'auto') {
      return Math.min(contentHeight.current || SCREEN_HEIGHT * 0.5, SCREEN_HEIGHT * 0.9);
    }
    return SCREEN_HEIGHT * SIZE_HEIGHTS[size];
  }, [height, size]);

  const sheetHeight = getSheetHeight();

  // Pan responder for drag to dismiss
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => dismissOnDrag,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return dismissOnDrag && gestureState.dy > 10;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100 || gestureState.vy > 0.5) {
          dismiss();
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            friction: 8,
            tension: 40,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const dismiss = useCallback(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: SCREEN_HEIGHT,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDismissRequest();
    });
  }, [translateY, backdropOpacity, onDismissRequest]);

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: scrimOpacity,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, translateY, backdropOpacity, scrimOpacity]);

  const handleBackdropPress = () => {
    if (dismissOnClickOutside) {
      dismiss();
    }
  };

  const handleContentLayout = (event: { nativeEvent: { layout: { height: number } } }) => {
    if (size === 'auto') {
      contentHeight.current = event.nativeEvent.layout.height;
    }
  };

  const ContentWrapper = scrollable ? ScrollView : View;
  const contentWrapperProps = scrollable
    ? {
        showsVerticalScrollIndicator: true,
        bounces: true,
        contentContainerStyle: { flexGrow: 1 },
      }
    : {};

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={dismissOnBackPress ? dismiss : undefined}
      statusBarTranslucent
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.modalContainer}
      >
        {/* Backdrop */}
        <Animated.View
          style={[
            styles.backdrop,
            {
              opacity: backdropOpacity,
            },
          ]}
        >
          <Pressable style={styles.backdropPressable} onPress={handleBackdropPress} />
        </Animated.View>

        {/* Sheet */}
        <Animated.View
          style={[
            styles.sheet,
            {
              backgroundColor: bgColor,
              borderTopLeftRadius: radius,
              borderTopRightRadius: radius,
              height: size === 'auto' ? undefined : sheetHeight,
              maxHeight: SCREEN_HEIGHT * 0.95,
              transform: [{ translateY }],
            },
            style,
          ]}
          onLayout={size === 'auto' ? handleContentLayout : undefined}
        >
          {/* Handle */}
          {showHandle && (
            <View style={styles.handleContainer} {...panResponder.panHandlers}>
              <View
                style={[
                  styles.handle,
                  { backgroundColor: theme.colors.border.default },
                ]}
              />
            </View>
          )}

          {/* Header */}
          {header && (
            <View style={styles.header}>
              {header}
            </View>
          )}

          {/* Content */}
          <ContentWrapper
            style={styles.content}
            {...contentWrapperProps}
          >
            {children}
          </ContentWrapper>

          {/* Footer */}
          {footer && (
            <View style={styles.footer}>
              {footer}
            </View>
          )}
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

/**
 * Hook to manage bottom sheet state
 */
export const useSushiBottomSheetState = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  const show = useCallback(() => setIsVisible(true), []);
  const hide = useCallback(() => setIsVisible(false), []);
  const toggle = useCallback(() => setIsVisible((v) => !v), []);

  return {
    isVisible,
    show,
    hide,
    toggle,
  };
};

/**
 * Bottom sheet state type
 */
export type SushiBottomSheetState = ReturnType<typeof useSushiBottomSheetState>;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
  },
  backdropPressable: {
    flex: 1,
  },
  sheet: {
    overflow: 'hidden',
    elevation: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
  },
  handleContainer: {
    alignItems: 'center',
    paddingTop: spacing.sm,
    paddingBottom: spacing.xs,
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
});

SushiBottomSheet.displayName = 'SushiBottomSheet';
