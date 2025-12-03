/**
 * SushiTooltip - Tooltip Component
 *
 * A theme-aware tooltip component that displays contextual information
 * when users interact with UI elements.
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
  Modal,
  StyleSheet,
  Animated,
  Pressable,
  ViewStyle,
  LayoutRectangle,
  Dimensions,
  Image,
  ImageSourcePropType,
} from 'react-native';
import { useTheme } from '../../theme';
import { SushiText, SushiTextProps } from '../Text/SushiText';
import { spacing, borderRadius, zIndex } from '../../tokens/dimensions';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

/**
 * Tooltip position relative to anchor
 */
export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

/**
 * Caret (pointer) size
 */
export interface CaretSize {
  width: number;
  height: number;
}

/**
 * Tooltip state ref methods
 */
export interface SushiTooltipRef {
  show: () => void;
  hide: () => void;
  toggle: () => void;
}

/**
 * Props for SushiTooltip content
 */
export interface SushiTooltipContentProps {
  /** Text content */
  text?: string;
  /** Text props for styling */
  textProps?: Partial<SushiTextProps>;
  /** Prefix image */
  prefixImage?: ImageSourcePropType | ReactNode;
  /** Suffix image */
  suffixImage?: ImageSourcePropType | ReactNode;
  /** Custom content */
  children?: ReactNode;
}

/**
 * Props for SushiTooltip
 */
export interface SushiTooltipProps extends SushiTooltipContentProps {
  /** Whether tooltip is visible */
  visible: boolean;
  /** Callback when visibility changes */
  onVisibilityChange?: (visible: boolean) => void;
  /** Position relative to anchor */
  position?: TooltipPosition;
  /** Container background color */
  containerColor?: string;
  /** Caret/pointer size */
  caretSize?: CaretSize;
  /** Container shape (border radius) */
  shape?: number;
  /** Shadow elevation */
  shadowElevation?: number;
  /** Whether tooltip is focusable */
  focusable?: boolean;
  /** Enable user input while shown */
  enableUserInput?: boolean;
  /** Auto-dismiss delay (ms, 0 = no auto-dismiss) */
  autoDismissDelay?: number;
  /** Custom container style */
  style?: ViewStyle;
  /** Anchor layout rectangle */
  anchorLayout?: LayoutRectangle;
}

/**
 * Props for SushiTooltipBox (wrapper component)
 */
export interface SushiTooltipBoxProps extends Omit<SushiTooltipProps, 'visible' | 'anchorLayout'> {
  /** Tooltip content or render function */
  tooltip: ReactNode | ((props: { hide: () => void }) => ReactNode);
  /** Initial visibility */
  initialVisible?: boolean;
  /** Trigger on press */
  triggerOnPress?: boolean;
  /** Trigger on long press */
  triggerOnLongPress?: boolean;
  /** Children (anchor element) */
  children: ReactNode;
}

/**
 * SushiTooltip Component
 *
 * @example
 * ```tsx
 * // Basic tooltip
 * <SushiTooltip
 *   visible={isVisible}
 *   text="This is a tooltip"
 *   position="top"
 *   onVisibilityChange={setIsVisible}
 *   anchorLayout={anchorLayout}
 * />
 *
 * // With prefix/suffix images
 * <SushiTooltip
 *   visible={isVisible}
 *   text="Helpful tip"
 *   prefixImage={<InfoIcon />}
 *   position="bottom"
 * />
 * ```
 */
export const SushiTooltip: React.FC<SushiTooltipProps> = ({
  visible,
  onVisibilityChange,
  position = 'top',
  text,
  textProps,
  prefixImage,
  suffixImage,
  containerColor,
  caretSize = { width: 12, height: 8 },
  shape = borderRadius.md,
  shadowElevation = 4,
  focusable = true,
  enableUserInput = false,
  autoDismissDelay = 0,
  style,
  anchorLayout,
  children,
}) => {
  const { theme } = useTheme();
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.95)).current;
  const autoDismissTimer = useRef<NodeJS.Timeout | null>(null);

  const bgColor = containerColor || theme.colors.background.inverse;
  const textColor = theme.colors.text.inverse;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start();

      // Auto-dismiss
      if (autoDismissDelay > 0) {
        autoDismissTimer.current = setTimeout(() => {
          onVisibilityChange?.(false);
        }, autoDismissDelay);
      }
    } else {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 0.95,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    }

    return () => {
      if (autoDismissTimer.current) {
        clearTimeout(autoDismissTimer.current);
      }
    };
  }, [visible, opacity, scale, autoDismissDelay, onVisibilityChange]);

  const handleDismiss = useCallback(() => {
    if (enableUserInput) return;
    onVisibilityChange?.(false);
  }, [enableUserInput, onVisibilityChange]);

  // Calculate tooltip position
  const getTooltipPosition = (): ViewStyle => {
    if (!anchorLayout) {
      return { top: SCREEN_HEIGHT / 2, left: SCREEN_WIDTH / 2 };
    }

    const { x, y, width, height } = anchorLayout;
    const tooltipOffset = caretSize.height + 4;

    switch (position) {
      case 'top':
        return {
          bottom: SCREEN_HEIGHT - y + tooltipOffset,
          left: x + width / 2,
          transform: [{ translateX: -50 }],
        };
      case 'bottom':
        return {
          top: y + height + tooltipOffset,
          left: x + width / 2,
          transform: [{ translateX: -50 }],
        };
      case 'left':
        return {
          top: y + height / 2,
          right: SCREEN_WIDTH - x + tooltipOffset,
          transform: [{ translateY: -50 }],
        };
      case 'right':
        return {
          top: y + height / 2,
          left: x + width + tooltipOffset,
          transform: [{ translateY: -50 }],
        };
      default:
        return {};
    }
  };

  // Get caret position and rotation
  const getCaretStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      width: 0,
      height: 0,
      backgroundColor: 'transparent',
      borderStyle: 'solid',
      position: 'absolute',
    };

    const caretColor = bgColor;

    switch (position) {
      case 'top':
        return {
          ...baseStyle,
          bottom: -caretSize.height,
          alignSelf: 'center',
          borderLeftWidth: caretSize.width / 2,
          borderRightWidth: caretSize.width / 2,
          borderTopWidth: caretSize.height,
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderTopColor: caretColor,
        };
      case 'bottom':
        return {
          ...baseStyle,
          top: -caretSize.height,
          alignSelf: 'center',
          borderLeftWidth: caretSize.width / 2,
          borderRightWidth: caretSize.width / 2,
          borderBottomWidth: caretSize.height,
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderBottomColor: caretColor,
        };
      case 'left':
        return {
          ...baseStyle,
          right: -caretSize.height,
          alignSelf: 'center',
          borderTopWidth: caretSize.width / 2,
          borderBottomWidth: caretSize.width / 2,
          borderLeftWidth: caretSize.height,
          borderTopColor: 'transparent',
          borderBottomColor: 'transparent',
          borderLeftColor: caretColor,
        };
      case 'right':
        return {
          ...baseStyle,
          left: -caretSize.height,
          alignSelf: 'center',
          borderTopWidth: caretSize.width / 2,
          borderBottomWidth: caretSize.width / 2,
          borderRightWidth: caretSize.height,
          borderTopColor: 'transparent',
          borderBottomColor: 'transparent',
          borderRightColor: caretColor,
        };
      default:
        return baseStyle;
    }
  };

  const renderImage = (image: ImageSourcePropType | ReactNode, imageStyle: ViewStyle) => {
    if (React.isValidElement(image)) {
      return <View style={imageStyle}>{image}</View>;
    }
    return (
      <Image
        source={image as ImageSourcePropType}
        style={[styles.image, imageStyle]}
        resizeMode="contain"
      />
    );
  };

  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={handleDismiss}>
      <Pressable style={styles.backdrop} onPress={handleDismiss}>
        <Animated.View
          style={[
            styles.tooltip,
            {
              backgroundColor: bgColor,
              borderRadius: shape,
              opacity,
              transform: [{ scale }],
              elevation: shadowElevation,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: shadowElevation / 2 },
              shadowOpacity: 0.15,
              shadowRadius: shadowElevation,
              zIndex: zIndex.tooltip,
            },
            getTooltipPosition(),
            style,
          ]}
        >
          <View style={styles.content}>
            {prefixImage && renderImage(prefixImage, styles.prefixImage)}
            {text && (
              <SushiText
                variant="caption"
                style={{ color: textColor }}
                {...textProps}
              >
                {text}
              </SushiText>
            )}
            {children}
            {suffixImage && renderImage(suffixImage, styles.suffixImage)}
          </View>
          <View style={getCaretStyle()} />
        </Animated.View>
      </Pressable>
    </Modal>
  );
};

/**
 * SushiTooltipBox - Wrapper component with anchor
 *
 * @example
 * ```tsx
 * <SushiTooltipBox
 *   tooltip="Click for more info"
 *   position="top"
 *   triggerOnPress
 * >
 *   <Button title="Help" />
 * </SushiTooltipBox>
 * ```
 */
export const SushiTooltipBox = forwardRef<SushiTooltipRef, SushiTooltipBoxProps>(
  (
    {
      tooltip,
      initialVisible = false,
      triggerOnPress = true,
      triggerOnLongPress = false,
      children,
      ...tooltipProps
    },
    ref
  ) => {
    const [visible, setVisible] = useState(initialVisible);
    const [anchorLayout, setAnchorLayout] = useState<LayoutRectangle | null>(null);
    const anchorRef = useRef<View>(null);

    const show = useCallback(() => setVisible(true), []);
    const hide = useCallback(() => setVisible(false), []);
    const toggle = useCallback(() => setVisible((v) => !v), []);

    useImperativeHandle(ref, () => ({ show, hide, toggle }), [show, hide, toggle]);

    const measureAnchor = useCallback(() => {
      anchorRef.current?.measureInWindow((x, y, width, height) => {
        setAnchorLayout({ x, y, width, height });
      });
    }, []);

    const handlePress = useCallback(() => {
      if (triggerOnPress) {
        measureAnchor();
        toggle();
      }
    }, [triggerOnPress, measureAnchor, toggle]);

    const handleLongPress = useCallback(() => {
      if (triggerOnLongPress) {
        measureAnchor();
        show();
      }
    }, [triggerOnLongPress, measureAnchor, show]);

    const tooltipContent =
      typeof tooltip === 'function' ? tooltip({ hide }) : tooltip;

    return (
      <>
        <Pressable
          ref={anchorRef}
          onPress={handlePress}
          onLongPress={handleLongPress}
        >
          {children}
        </Pressable>
        <SushiTooltip
          visible={visible}
          onVisibilityChange={setVisible}
          anchorLayout={anchorLayout || undefined}
          {...tooltipProps}
        >
          {typeof tooltipContent === 'string' ? null : tooltipContent}
          {typeof tooltipContent === 'string' && (
            <SushiText variant="caption">
              {tooltipContent}
            </SushiText>
          )}
        </SushiTooltip>
      </>
    );
  }
);

/**
 * Hook to manage tooltip state
 */
export const useSushiTooltipState = (initialVisible = false) => {
  const [isVisible, setIsVisible] = useState(initialVisible);

  const show = useCallback(() => setIsVisible(true), []);
  const hide = useCallback(() => setIsVisible(false), []);
  const toggle = useCallback(() => setIsVisible((v) => !v), []);

  return {
    isVisible,
    show,
    hide,
    toggle,
    setIsVisible,
  };
};

export type SushiTooltipState = ReturnType<typeof useSushiTooltipState>;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
  },
  tooltip: {
    position: 'absolute',
    maxWidth: SCREEN_WIDTH - spacing.lg * 2,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  image: {
    width: 16,
    height: 16,
  },
  prefixImage: {
    marginRight: spacing.xs,
  },
  suffixImage: {
    marginLeft: spacing.xs,
  },
});

SushiTooltip.displayName = 'SushiTooltip';
SushiTooltipBox.displayName = 'SushiTooltipBox';

// Aliases for backward compatibility
export const Tooltip = SushiTooltip;
export const TooltipBox = SushiTooltipBox;
