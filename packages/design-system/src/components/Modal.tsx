import React from 'react';
import {
  Modal as RNModal,
  ModalProps as RNModalProps,
  View,
  Pressable,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { colors } from '../tokens/colors';
import { spacing } from '../tokens/spacing';
import { borderRadius } from '../tokens/borderRadius';
import { shadows } from '../tokens/shadows';

/**
 * Supported platforms for this component
 * @platform android
 * @platform ios
 * @platform web
 */

type ModalSize = 'sm' | 'md' | 'lg' | 'full';

export interface ModalProps extends Omit<RNModalProps, 'animationType'> {
  /** Modal visibility */
  visible: boolean;
  /** Close handler */
  onClose: () => void;
  /** Modal size */
  size?: ModalSize;
  /** Animation type */
  animation?: 'fade' | 'slide' | 'none';
  /** Close on backdrop press */
  closeOnBackdrop?: boolean;
  /** Custom container style */
  containerStyle?: ViewStyle;
  /** Children content */
  children: React.ReactNode;
}

const sizeStyles: Record<ModalSize, ViewStyle> = {
  sm: { width: '70%', maxWidth: 300 },
  md: { width: '85%', maxWidth: 400 },
  lg: { width: '90%', maxWidth: 500 },
  full: { width: '100%', height: '100%', borderRadius: 0 },
};

export const Modal: React.FC<ModalProps> = ({
  visible,
  onClose,
  size = 'md',
  animation = 'fade',
  closeOnBackdrop = true,
  containerStyle,
  children,
  ...props
}) => {
  const handleBackdropPress = () => {
    if (closeOnBackdrop) {
      onClose();
    }
  };

  return (
    <RNModal
      visible={visible}
      transparent
      animationType={animation}
      onRequestClose={onClose}
      {...props}
    >
      <Pressable style={styles.backdrop} onPress={handleBackdropPress}>
        <Pressable
          style={[styles.container, sizeStyles[size], containerStyle]}
          onPress={e => e.stopPropagation()}
        >
          {children}
        </Pressable>
      </Pressable>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: colors.background.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    ...shadows.xl,
  },
});

Modal.displayName = 'Modal';
