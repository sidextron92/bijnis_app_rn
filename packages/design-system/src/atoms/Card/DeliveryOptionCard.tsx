/**
 * DeliveryOptionCard - Delivery Option Card Component
 *
 * A card component for displaying delivery options with size set selections.
 * Supports two variants: "express" (60 Min Delivery) and "prebook" (Pre Book).
 *
 * @platform android
 * @platform ios
 * @platform web
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../theme';
import { SushiText } from '../Text/SushiText';
import { spacing } from '../../tokens/spacing';

/**
 * Size set item
 */
export interface SizeSetItem {
  /** Size set label (e.g., "7/2, 8/1, 9/1") */
  sizeSet: string;
  /** Description (e.g., "4 Pairs per size set") */
  description?: string;
  /** Extra price note (e.g., "Extra price: ₹ 5/pair") */
  extraPrice?: string;
  /** Current quantity */
  quantity: number;
  /** Callback when quantity changes */
  onQuantityChange?: (quantity: number) => void;
}

/**
 * DeliveryOptionCard Props
 */
export interface DeliveryOptionCardProps {
  /** Delivery type variant */
  variant: 'express' | 'prebook';
  /** Delivery title (e.g., "60 Min Delivery" or "Pre Book: Delivery by 15 Oct") */
  deliveryTitle: string;
  /** Icon/emoji to display (e.g., "🚀" for express, "🕐" for prebook) */
  icon?: string;
  /** Size set items */
  sizeSets: SizeSetItem[];
  /** Custom style */
  style?: ViewStyle;
  /** Children content (for size set selectors) */
  children?: React.ReactNode;
}

/**
 * DeliveryOptionCard Component
 *
 * Displays a delivery option with a header showing the delivery type and icon,
 * followed by a list of available size sets with quantity selectors.
 *
 * @example
 * ```tsx
 * <DeliveryOptionCard
 *   variant="express"
 *   deliveryTitle="60 Min Delivery"
 *   icon="🚀"
 *   sizeSets={[
 *     {
 *       sizeSet: "7/2, 8/1, 9/1",
 *       description: "4 Pairs per size set",
 *       quantity: 0,
 *       onQuantityChange: (qty) => console.log(qty),
 *     },
 *     {
 *       sizeSet: "7/2, 8/2",
 *       description: "4 Pairs per size set",
 *       extraPrice: "Extra price: ₹ 5/pair",
 *       quantity: 4,
 *       onQuantityChange: (qty) => console.log(qty),
 *     },
 *   ]}
 * />
 * ```
 */
export const DeliveryOptionCard: React.FC<DeliveryOptionCardProps> = ({
  variant,
  deliveryTitle,
  icon,
  sizeSets,
  style,
  children,
}) => {
  const { theme, isDark } = useTheme();

  // Theme-aware colors for express variant (orange theme)
  const expressColors = {
    border: isDark ? '#7A3900' : '#FFD297',
    background: isDark ? '#1F1108' : '#FFFAF3',
    title: isDark ? '#FF8A3D' : '#FF4800',
  };

  // Theme-aware colors for prebook variant (blue theme)
  const prebookColors = {
    border: isDark ? '#003580' : '#B8D8FF',
    background: isDark ? '#001429' : '#F8FCFF',
    title: isDark ? '#5C9FFF' : '#004DDD',
  };

  const colors = variant === 'express' ? expressColors : prebookColors;
  const borderColor = colors.border;
  const backgroundColor = colors.background;
  const titleColor = colors.title;

  return (
    <View style={[styles.container, { borderColor, backgroundColor }, style]}>
      {/* Header */}
      <View style={styles.header}>
        {/* Icon Circle */}
        {icon && (
          <View style={[styles.iconCircle, { backgroundColor: 'transparent' }]}>
            <View style={[styles.iconBackground, { backgroundColor: theme.colors.surface.default }]}>
              <SushiText variant="body" style={styles.icon}>
                {icon}
              </SushiText>
            </View>
          </View>
        )}

        {/* Delivery Title */}
        <View style={styles.titleContainer}>
          <SushiText
            variant="body"
            customColor={titleColor}
            style={styles.deliveryTitle}
          >
            {deliveryTitle.split(':')[0]}
            {deliveryTitle.includes(':') && (
              <>
                {': '}
                <SushiText
                  variant="body"
                  customColor={theme.colors.text.primary}
                  style={styles.deliveryTitleBold}
                >
                  {deliveryTitle.split(':')[1].trim()}
                </SushiText>
              </>
            )}
          </SushiText>
        </View>
      </View>

      {/* Size Sets List */}
      {children || (
        <View style={styles.sizeSetsList}>
          {sizeSets.map((sizeSet, index) => (
            <View key={index}>
              {index > 0 && (
                <View
                  style={[
                    styles.divider,
                    { backgroundColor: theme.colors.border.default },
                  ]}
                />
              )}
              <View style={styles.sizeSetItem}>
                <View style={styles.sizeSetInfo}>
                  <SushiText
                    variant="body"
                    customColor={theme.colors.text.primary}
                    style={styles.sizeSetLabel}
                  >
                    {sizeSet.sizeSet}
                  </SushiText>
                  {sizeSet.description && (
                    <SushiText
                      variant="caption"
                      customColor={theme.colors.text.secondary}
                      style={styles.sizeSetDescription}
                    >
                      {sizeSet.description}
                    </SushiText>
                  )}
                  {sizeSet.extraPrice && (
                    <SushiText
                      variant="caption"
                      customColor="#E0720C"
                      style={styles.extraPrice}
                    >
                      {sizeSet.extraPrice}
                    </SushiText>
                  )}
                </View>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    borderWidth: 4,
    overflow: 'hidden',
    marginVertical: spacing.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  iconCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBackground: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 24,
  },
  titleContainer: {
    flex: 1,
  },
  deliveryTitle: {
    fontSize: 16,
    fontWeight: '400',
  },
  deliveryTitleBold: {
    fontSize: 16,
    fontWeight: '700',
  },
  sizeSetsList: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
  divider: {
    height: 0.5,
    marginVertical: spacing.sm,
  },
  sizeSetItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  sizeSetInfo: {
    flex: 1,
    gap: spacing.xs / 2,
  },
  sizeSetLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  sizeSetDescription: {
    fontSize: 12,
  },
  extraPrice: {
    fontSize: 12,
    fontWeight: '600',
  },
});

DeliveryOptionCard.displayName = 'DeliveryOptionCard';
