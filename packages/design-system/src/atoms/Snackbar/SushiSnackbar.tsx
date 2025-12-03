/**
 * SushiSnackbar - Snackbar/Toast Component
 *
 * A theme-aware snackbar component that displays brief messages at the bottom
 * of the screen with optional action buttons.
 *
 * @platform android
 * @platform ios
 * @platform web
 */

import React, { useEffect, useRef, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Pressable,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme';
import { SushiText } from '../Text/SushiText';
import { spacing, borderRadius, zIndex } from '../../tokens/dimensions';

/**
 * Snackbar duration options
 */
export type SnackbarDuration = 'short' | 'long' | 'indefinite';

/**
 * Snackbar variant for different contexts
 */
export type SnackbarVariant = 'default' | 'success' | 'error' | 'warning' | 'info';

/**
 * Snackbar position
 */
export type SnackbarPosition = 'bottom' | 'top';

/**
 * Duration values in milliseconds
 */
const DURATION_VALUES: Record<SnackbarDuration, number> = {
  short: 1500,
  long: 3500,
  indefinite: -1,
};

/**
 * Props for showing a snackbar
 */
export interface SushiSnackbarProps {
  /** Primary message text */
  message: string;
  /** Background color (overrides variant) */
  containerColor?: string;
  /** Text/content color */
  contentColor?: string;
  /** Optional action button text */
  actionText?: string;
  /** Action button handler */
  onAction?: () => void;
  /** Duration the snackbar is visible */
  duration?: SnackbarDuration;
  /** Snackbar variant for semantic styling */
  variant?: SnackbarVariant;
  /** Position on screen */
  position?: SnackbarPosition;
  /** Custom style */
  style?: ViewStyle;
}

/**
 * Internal snackbar data with callbacks
 */
interface SnackbarData extends SushiSnackbarProps {
  id: string;
  onDismiss?: () => void;
}

/**
 * SushiSnackbarHostState - Manages snackbar queue and display
 */
export class SushiSnackbarHostState {
  private listeners: Set<(snackbar: SnackbarData | null) => void> = new Set();
  private currentSnackbar: SnackbarData | null = null;
  private queue: SnackbarData[] = [];

  /**
   * Show a snackbar with the specified props
   */
  showSnackbar = (props: SushiSnackbarProps): Promise<void> => {
    return new Promise((resolve) => {
      const id = Math.random().toString(36).substring(7);
      const snackbarData: SnackbarData = {
        ...props,
        id,
        onDismiss: resolve,
      };

      if (this.currentSnackbar) {
        this.queue.push(snackbarData);
      } else {
        this.currentSnackbar = snackbarData;
        this.notifyListeners();
      }
    });
  };

  /**
   * Cancel the current snackbar
   */
  cancelSnackbar = () => {
    if (this.currentSnackbar) {
      this.currentSnackbar.onDismiss?.();
      this.currentSnackbar = null;
      this.processQueue();
    }
  };

  private processQueue = () => {
    if (this.queue.length > 0) {
      this.currentSnackbar = this.queue.shift()!;
    } else {
      this.currentSnackbar = null;
    }
    this.notifyListeners();
  };

  private notifyListeners = () => {
    this.listeners.forEach((listener) => listener(this.currentSnackbar));
  };

  subscribe = (listener: (snackbar: SnackbarData | null) => void) => {
    this.listeners.add(listener);
    listener(this.currentSnackbar);
    return () => {
      this.listeners.delete(listener);
    };
  };

  /** Internal: Called when snackbar animation completes */
  _onDismissComplete = () => {
    if (this.currentSnackbar) {
      this.currentSnackbar.onDismiss?.();
    }
    this.processQueue();
  };
}

/**
 * Hook to create a snackbar host state
 */
export const useSushiSnackbarHostState = (): SushiSnackbarHostState => {
  const stateRef = useRef<SushiSnackbarHostState>();
  if (!stateRef.current) {
    stateRef.current = new SushiSnackbarHostState();
  }
  return stateRef.current;
};

/**
 * Props for SushiSnackbarHost
 */
export interface SushiSnackbarHostProps {
  /** The snackbar host state */
  hostState: SushiSnackbarHostState;
  /** Children to render (your app content) */
  children?: React.ReactNode;
  /** Default position for snackbars */
  position?: SnackbarPosition;
  /** Bottom offset (useful for bottom navigation) */
  bottomOffset?: number;
  /** Top offset (useful for status bar) */
  topOffset?: number;
}

/**
 * SushiSnackbarHost - Container that renders snackbars
 */
export const SushiSnackbarHost: React.FC<SushiSnackbarHostProps> = ({
  hostState,
  children,
  position = 'bottom',
  bottomOffset = 0,
  topOffset = 0,
}) => {
  const [snackbar, setSnackbar] = React.useState<SnackbarData | null>(null);

  useEffect(() => {
    return hostState.subscribe(setSnackbar);
  }, [hostState]);

  return (
    <View style={styles.host}>
      {children}
      {snackbar && (
        <SushiSnackbarInternal
          {...snackbar}
          position={snackbar.position || position}
          bottomOffset={bottomOffset}
          topOffset={topOffset}
          onDismiss={hostState._onDismissComplete}
        />
      )}
    </View>
  );
};

/**
 * Internal snackbar component with animations
 */
interface SushiSnackbarInternalProps extends SnackbarData {
  position: SnackbarPosition;
  bottomOffset: number;
  topOffset: number;
  onDismiss: () => void;
}

const SushiSnackbarInternal: React.FC<SushiSnackbarInternalProps> = ({
  message,
  containerColor,
  contentColor,
  actionText,
  onAction,
  duration = 'short',
  variant = 'default',
  position,
  bottomOffset,
  topOffset,
  style,
  onDismiss,
}) => {
  const { theme } = useTheme();
  const translateY = useRef(new Animated.Value(position === 'bottom' ? 100 : -100)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  // Get variant colors
  const getVariantColors = useCallback(() => {
    const colors = theme.colors;
    switch (variant) {
      case 'success':
        return {
          bg: colors.background.success,
          text: colors.text.inverse,
        };
      case 'error':
        return {
          bg: colors.background.error,
          text: colors.text.inverse,
        };
      case 'warning':
        return {
          bg: colors.background.warning,
          text: colors.text.primary,
        };
      case 'info':
        return {
          bg: colors.background.info,
          text: colors.text.inverse,
        };
      default:
        return {
          bg: colors.palette.gray[800],
          text: colors.text.inverse,
        };
    }
  }, [theme, variant]);

  const variantColors = getVariantColors();
  const bgColor = containerColor || variantColors.bg;
  const textColor = contentColor || variantColors.text;

  const dismiss = useCallback(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: position === 'bottom' ? 100 : -100,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDismiss();
    });
  }, [translateY, opacity, position, onDismiss]);

  useEffect(() => {
    // Animate in
    Animated.parallel([
      Animated.spring(translateY, {
        toValue: 0,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    // Auto-dismiss
    const durationMs = DURATION_VALUES[duration];
    if (durationMs > 0) {
      timerRef.current = setTimeout(dismiss, durationMs);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [duration, dismiss, translateY, opacity]);

  const handleAction = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    onAction?.();
    dismiss();
  };

  const positionStyle: ViewStyle = position === 'bottom'
    ? { bottom: spacing.lg + bottomOffset }
    : { top: spacing.lg + topOffset };

  return (
    <Animated.View
      style={[
        styles.container,
        positionStyle,
        {
          backgroundColor: bgColor,
          transform: [{ translateY }],
          opacity,
        },
        style,
      ]}
    >
      <SushiText
        variant="body"
        style={{ ...styles.message, color: textColor }}
        numberOfLines={2}
      >
        {message}
      </SushiText>

      {actionText && (
        <Pressable onPress={handleAction} style={styles.actionButton}>
          <SushiText
            variant="button"
            style={{ ...styles.actionText, color: theme.colors.interactive.primary }}
          >
            {actionText}
          </SushiText>
        </Pressable>
      )}
    </Animated.View>
  );
};

/**
 * Standalone SushiSnackbar component (for controlled usage)
 */
export const SushiSnackbar: React.FC<SushiSnackbarProps & { visible: boolean; onDismiss: () => void }> = ({
  visible,
  onDismiss,
  message,
  containerColor,
  contentColor,
  actionText,
  onAction,
  duration = 'short',
  variant = 'default',
  position = 'bottom',
  style,
}) => {
  const { theme } = useTheme();
  const translateY = useRef(new Animated.Value(position === 'bottom' ? 100 : -100)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const getVariantColors = useCallback(() => {
    const colors = theme.colors;
    switch (variant) {
      case 'success':
        return { bg: colors.background.success, text: colors.text.inverse };
      case 'error':
        return { bg: colors.background.error, text: colors.text.inverse };
      case 'warning':
        return { bg: colors.background.warning, text: colors.text.primary };
      case 'info':
        return { bg: colors.background.info, text: colors.text.inverse };
      default:
        return { bg: colors.palette.gray[800], text: colors.text.inverse };
    }
  }, [theme, variant]);

  const variantColors = getVariantColors();
  const bgColor = containerColor || variantColors.bg;
  const textColor = contentColor || variantColors.text;

  const dismiss = useCallback(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: position === 'bottom' ? 100 : -100,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDismiss();
    });
  }, [translateY, opacity, position, onDismiss]);

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      const durationMs = DURATION_VALUES[duration];
      if (durationMs > 0) {
        timerRef.current = setTimeout(dismiss, durationMs);
      }
    } else {
      translateY.setValue(position === 'bottom' ? 100 : -100);
      opacity.setValue(0);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [visible, duration, dismiss, translateY, opacity, position]);

  const handleAction = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    onAction?.();
    dismiss();
  };

  if (!visible) return null;

  const positionStyle: ViewStyle = position === 'bottom'
    ? { bottom: spacing.lg }
    : { top: spacing.lg };

  return (
    <Animated.View
      style={[
        styles.container,
        positionStyle,
        {
          backgroundColor: bgColor,
          transform: [{ translateY }],
          opacity,
        },
        style,
      ]}
    >
      <SushiText
        variant="body"
        style={{ ...styles.message, color: textColor }}
        numberOfLines={2}
      >
        {message}
      </SushiText>

      {actionText && (
        <Pressable onPress={handleAction} style={styles.actionButton}>
          <SushiText
            variant="button"
            style={{ ...styles.actionText, color: theme.colors.interactive.primary }}
          >
            {actionText}
          </SushiText>
        </Pressable>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  host: {
    flex: 1,
  },
  container: {
    position: 'absolute',
    left: spacing.lg,
    right: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    zIndex: zIndex.toast,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },
  message: {
    flex: 1,
  },
  actionButton: {
    marginLeft: spacing.md,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  actionText: {
    fontWeight: '600',
  },
});

SushiSnackbar.displayName = 'SushiSnackbar';
SushiSnackbarHost.displayName = 'SushiSnackbarHost';
