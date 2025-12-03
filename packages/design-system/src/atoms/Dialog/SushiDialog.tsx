/**
 * SushiDialog - Alert Dialog Component
 *
 * A theme-aware customizable alert dialog component for displaying
 * information and requesting user decisions.
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
  Image,
  ImageSourcePropType,
  ViewStyle,
  Dimensions,
} from 'react-native';
import { useTheme } from '../../theme';
import { SushiText } from '../Text/SushiText';
import { SushiButton } from '../Button/SushiButton';
import { spacing, borderRadius } from '../../tokens/dimensions';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

/**
 * Button alignment options
 */
export type DialogButtonAlignment = 'vertical' | 'horizontal';

/**
 * Dialog button props
 */
export interface DialogButtonProps {
  /** Button text */
  text: string;
  /** Button handler */
  onPress?: () => void;
  /** Button variant */
  variant?: 'solid' | 'outline' | 'text';
  /** Button color scheme */
  colorScheme?: 'primary' | 'secondary' | 'destructive';
  /** Whether button is disabled */
  disabled?: boolean;
  /** Whether button shows loading state */
  loading?: boolean;
}

/**
 * Props for SushiDialog
 */
export interface SushiDialogProps {
  /** Whether the dialog is visible */
  visible: boolean;
  /** Callback when dismiss is requested */
  onDismissRequest: () => void;
  /** Optional dialog identifier */
  id?: string;
  /** Optional header image */
  image?: ImageSourcePropType | React.ReactNode;
  /** Image height (for ImageSourcePropType images) */
  imageHeight?: number;
  /** Dialog title */
  title?: string;
  /** Dialog subtitle/description */
  subtitle?: string;
  /** Primary/positive button */
  positiveButton?: DialogButtonProps;
  /** Secondary/negative button */
  negativeButton?: DialogButtonProps;
  /** Tertiary/neutral button */
  neutralButton?: DialogButtonProps;
  /** Button arrangement */
  alignment?: DialogButtonAlignment;
  /** Whether dismissible by back button (Android) */
  dismissOnBackPress?: boolean;
  /** Whether dismissible by clicking outside */
  dismissOnClickOutside?: boolean;
  /** Custom content (rendered below subtitle) */
  children?: React.ReactNode;
  /** Custom container style */
  style?: ViewStyle;
  /** Custom content container style */
  contentStyle?: ViewStyle;
}

/**
 * SushiDialog Component
 */
export const SushiDialog: React.FC<SushiDialogProps> = ({
  visible,
  onDismissRequest,
  id,
  image,
  imageHeight = 120,
  title,
  subtitle,
  positiveButton,
  negativeButton,
  neutralButton,
  alignment = 'horizontal',
  dismissOnBackPress = true,
  dismissOnClickOutside = true,
  children,
  style,
  contentStyle,
}) => {
  const { theme } = useTheme();
  // id can be used for testing or analytics
  void id;
  const scale = useRef(new Animated.Value(0.9)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  const dismiss = useCallback(() => {
    Animated.parallel([
      Animated.timing(scale, {
        toValue: 0.9,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDismissRequest();
    });
  }, [scale, opacity, backdropOpacity, onDismissRequest]);

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scale, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0.5,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, scale, opacity, backdropOpacity]);

  const handleBackdropPress = () => {
    if (dismissOnClickOutside) {
      dismiss();
    }
  };

  const handlePositivePress = () => {
    positiveButton?.onPress?.();
    if (!positiveButton?.loading) {
      dismiss();
    }
  };

  const handleNegativePress = () => {
    negativeButton?.onPress?.();
    if (!negativeButton?.loading) {
      dismiss();
    }
  };

  const handleNeutralPress = () => {
    neutralButton?.onPress?.();
    if (!neutralButton?.loading) {
      dismiss();
    }
  };

  const renderImage = () => {
    if (!image) return null;

    if (React.isValidElement(image)) {
      return <View style={styles.imageContainer}>{image}</View>;
    }

    return (
      <Image
        source={image as ImageSourcePropType}
        style={[styles.image, { height: imageHeight }]}
        resizeMode="cover"
      />
    );
  };

  const renderButtons = () => {
    const buttons: React.ReactNode[] = [];

    // For horizontal alignment: negative, neutral, positive (right-most)
    // For vertical alignment: positive (top), negative, neutral (bottom)
    const buttonOrder = alignment === 'horizontal'
      ? [negativeButton, neutralButton, positiveButton]
      : [positiveButton, negativeButton, neutralButton];

    const handlers = alignment === 'horizontal'
      ? [handleNegativePress, handleNeutralPress, handlePositivePress]
      : [handlePositivePress, handleNegativePress, handleNeutralPress];

    const defaults = alignment === 'horizontal'
      ? [
          { variant: 'text' as const, colorScheme: 'secondary' as const },
          { variant: 'text' as const, colorScheme: 'secondary' as const },
          { variant: 'solid' as const, colorScheme: 'primary' as const },
        ]
      : [
          { variant: 'solid' as const, colorScheme: 'primary' as const },
          { variant: 'outline' as const, colorScheme: 'secondary' as const },
          { variant: 'text' as const, colorScheme: 'secondary' as const },
        ];

    buttonOrder.forEach((button, index) => {
      if (button) {
        buttons.push(
          <SushiButton
            key={index}
            title={button.text}
            variant={button.variant || defaults[index].variant}
            colorScheme={button.colorScheme || defaults[index].colorScheme}
            disabled={button.disabled}
            loading={button.loading}
            onPress={handlers[index]}
            fullWidth={alignment === 'vertical'}
            style={alignment === 'horizontal' ? styles.horizontalButton : styles.verticalButton}
          />
        );
      }
    });

    if (buttons.length === 0) return null;

    return (
      <View
        style={[
          styles.buttonContainer,
          alignment === 'horizontal' ? styles.horizontalButtons : styles.verticalButtons,
        ]}
      >
        {buttons}
      </View>
    );
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={dismissOnBackPress ? dismiss : undefined}
      statusBarTranslucent
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

      {/* Dialog */}
      <View style={styles.dialogWrapper}>
        <Animated.View
          style={[
            styles.dialog,
            {
              backgroundColor: theme.colors.background.primary,
              transform: [{ scale }],
              opacity,
            },
            style,
          ]}
        >
          {/* Image */}
          {renderImage()}

          {/* Content */}
          <View style={[styles.content, contentStyle]}>
            {title && (
              <SushiText
                variant="h3"
                style={{ ...styles.title, color: theme.colors.text.primary }}
              >
                {title}
              </SushiText>
            )}

            {subtitle && (
              <SushiText
                variant="body"
                style={{ ...styles.subtitle, color: theme.colors.text.secondary }}
              >
                {subtitle}
              </SushiText>
            )}

            {children}
          </View>

          {/* Buttons */}
          {renderButtons()}
        </Animated.View>
      </View>
    </Modal>
  );
};

/**
 * Simplified dialog component for common use cases
 */
export interface SushiAlertDialogProps {
  visible: boolean;
  onDismiss: () => void;
  title: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  destructive?: boolean;
}

export const SushiAlertDialog: React.FC<SushiAlertDialogProps> = ({
  visible,
  onDismiss,
  title,
  message,
  confirmText = 'OK',
  cancelText,
  onConfirm,
  onCancel,
  destructive = false,
}) => {
  return (
    <SushiDialog
      visible={visible}
      onDismissRequest={onDismiss}
      title={title}
      subtitle={message}
      positiveButton={{
        text: confirmText,
        onPress: onConfirm,
        colorScheme: destructive ? 'destructive' : 'primary',
      }}
      negativeButton={
        cancelText
          ? {
              text: cancelText,
              onPress: onCancel,
            }
          : undefined
      }
    />
  );
};

/**
 * Hook to manage dialog state
 */
export const useSushiDialogState = () => {
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
 * Dialog state type
 */
export type SushiDialogState = ReturnType<typeof useSushiDialogState>;

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
  },
  backdropPressable: {
    flex: 1,
  },
  dialogWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  dialog: {
    width: Math.min(SCREEN_WIDTH - spacing.lg * 2, 320),
    maxWidth: 400,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    elevation: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
  },
  content: {
    padding: spacing.lg,
  },
  title: {
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  buttonContainer: {
    padding: spacing.lg,
    paddingTop: 0,
  },
  horizontalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  verticalButtons: {
    flexDirection: 'column',
  },
  horizontalButton: {
    marginLeft: spacing.sm,
  },
  verticalButton: {
    marginTop: spacing.sm,
  },
});

SushiDialog.displayName = 'SushiDialog';
SushiAlertDialog.displayName = 'SushiAlertDialog';
