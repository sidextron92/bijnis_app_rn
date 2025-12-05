/**
 * ProductSelectionCard - Product Selection Card Component
 *
 * A card component for displaying product selection details including image,
 * color, size information, and pricing. Used in bottom sheets for product details.
 *
 * @platform android
 * @platform ios
 * @platform web
 */

import React from 'react';
import { View, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import { useTheme } from '../../theme';
import { SushiText } from '../Text/SushiText';
import { SquircleView } from '../../primitives/SquircleView';
import { spacing } from '../../tokens/spacing';

/**
 * ProductSelectionCard Props
 */
export interface ProductSelectionCardProps {
  /** Product image source */
  imageSource?: ImageSourcePropType;
  /** Color indicator circle color (e.g., "#23c417") */
  colorIndicator?: string;
  /** Color name (e.g., "Green") */
  colorName?: string;
  /** Size information (e.g., "UK Sizes- Adult") */
  sizeInfo?: string;
  /** Price with unit (e.g., "₹ 200/Pair") */
  price?: string;
  /** Additional price information (e.g., "(Including GST)") */
  priceNote?: string;
}

/**
 * ProductSelectionCard Component
 *
 * Displays a compact horizontal card showing product image, color selection,
 * and pricing information. Typically used at the top of product detail bottom sheets.
 *
 * @example
 * ```tsx
 * <ProductSelectionCard
 *   imageSource={require('./shoe.png')}
 *   colorIndicator="#23c417"
 *   colorName="Green"
 *   sizeInfo="UK Sizes- Adult"
 *   price="₹ 200/Pair"
 *   priceNote="(Including GST)"
 * />
 * ```
 */
export const ProductSelectionCard: React.FC<ProductSelectionCardProps> = ({
  imageSource,
  colorIndicator,
  colorName,
  sizeInfo,
  price,
  priceNote,
}) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      {/* Product Image */}
      <SquircleView
        cornerStyle="squircle"
        cornerRadius={8}
        backgroundColor={theme.colors.surface.sunken}
        borderWidth={2}
        borderColor={theme.colors.interactive.primary}
        style={styles.imageContainer}
      >
        {imageSource ? (
          <Image source={imageSource} style={styles.productImage} resizeMode="cover" />
        ) : (
          <View style={styles.imagePlaceholder} />
        )}
      </SquircleView>

      {/* Product Details */}
      <View style={styles.detailsContainer}>
        {/* Color Selection */}
        {(colorIndicator || colorName) && (
          <View style={styles.colorRow}>
            {colorIndicator && (
              <View
                style={[
                  styles.colorIndicator,
                  { backgroundColor: colorIndicator },
                ]}
              />
            )}
            {colorName && (
              <SushiText
                variant="body"
                customColor={theme.colors.text.primary}
                style={styles.colorName}
              >
                {colorName}
              </SushiText>
            )}
          </View>
        )}

        {/* Size Info */}
        {sizeInfo && (
          <SushiText
            variant="caption"
            customColor={theme.colors.text.secondary}
            style={styles.sizeInfo}
          >
            {sizeInfo}
          </SushiText>
        )}

        {/* Price */}
        {price && (
          <View style={styles.priceRow}>
            <SushiText
              variant="body"
              customColor={theme.colors.text.primary}
              style={styles.price}
            >
              {price}
            </SushiText>
            {priceNote && (
              <SushiText
                variant="caption"
                customColor={theme.colors.text.secondary}
                style={styles.priceNote}
              >
                {priceNote}
              </SushiText>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingVertical: spacing.sm,
  },
  imageContainer: {
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: spacing.xs,
  },
  colorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  colorIndicator: {
    width: 12,
    height: 12,
    borderRadius: 2,
    borderWidth: 0.2,
    borderColor: '#000000',
  },
  colorName: {
    fontSize: 14,
    fontWeight: '600',
  },
  sizeInfo: {
    fontSize: 12,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.xs,
  },
  price: {
    fontSize: 12,
    fontWeight: '600',
  },
  priceNote: {
    fontSize: 12,
  },
});

ProductSelectionCard.displayName = 'ProductSelectionCard';
