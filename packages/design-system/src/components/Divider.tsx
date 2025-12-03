import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../tokens/colors';
import { spacing } from '../tokens/spacing';

/**
 * Supported platforms for this component
 * @platform android
 * @platform ios
 * @platform web
 */

type DividerVariant = 'fullWidth' | 'inset' | 'middle';

export interface DividerProps {
  /** Divider variant */
  variant?: DividerVariant;
  /** Vertical divider */
  vertical?: boolean;
  /** Divider color */
  color?: string;
  /** Divider thickness */
  thickness?: number;
  /** Custom style */
  style?: ViewStyle;
}

export const Divider: React.FC<DividerProps> = ({
  variant = 'fullWidth',
  vertical = false,
  color = colors.border.light,
  thickness = 1,
  style,
}) => {
  const getVariantStyle = (): ViewStyle => {
    if (vertical) {
      return {
        width: thickness,
        height: '100%',
      };
    }

    switch (variant) {
      case 'inset':
        return {
          marginLeft: spacing.lg,
        };
      case 'middle':
        return {
          marginHorizontal: spacing.lg,
        };
      default:
        return {};
    }
  };

  return (
    <View
      style={[
        vertical ? styles.vertical : styles.horizontal,
        { backgroundColor: color },
        vertical ? { width: thickness } : { height: thickness },
        getVariantStyle(),
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  horizontal: {
    width: '100%',
  },
  vertical: {
    height: '100%',
  },
});

Divider.displayName = 'Divider';
