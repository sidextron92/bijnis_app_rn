/**
 * ProductCard - Product Card Component
 *
 * A specialized card component for displaying product information with squircle shapes.
 * Features: Image placeholder, category tags, favorite button, pricing, delivery info, and variants.
 *
 * @platform android
 * @platform ios
 * @platform web
 */

import React from 'react';
import { View, Pressable, StyleSheet, ViewStyle, Image, ImageSourcePropType } from 'react-native';
import { useTheme } from '../../theme';
import { SushiText } from '../Text/SushiText';
import { SushiTag } from '../Tag/SushiTag';
import { SquircleView } from '../../primitives/SquircleView';
import { spacing } from '../../tokens/spacing';
import { borderRadius } from '../../tokens/dimensions';

/**
 * Product variant color
 */
export interface ProductVariant {
  /** Variant color */
  color: string;
  /** Variant ID */
  id: string;
}

/**
 * ProductCard Props
 */
export interface ProductCardProps {
  /** Product category (shown as tag, e.g., "Men", "Women") */
  category?: string;
  /** Category tag color scheme */
  categoryColorScheme?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
  /** Product type/material (e.g., "Rubberized PVC Sports") */
  productType?: string;
  /** Product title/name */
  title: string;
  /** Product location/origin (e.g., "Made in Delhi NCR") */
  location?: string;
  /** Minimum order quantity text (e.g., "MOQ : 4 Pairs") */
  moq?: string;
  /** Stock warning text (e.g., "Only 2 Left") */
  stockWarning?: string;
  /** Delivery time text (e.g., "Delivery in 2 hours") */
  deliveryTime?: string;
  /** Profit margin percentage (e.g., "56% Margin") */
  margin?: string;
  /** Current price (e.g., "434") */
  price: string;
  /** Original MRP for strikethrough (e.g., "999") */
  mrp?: string;
  /** Product image source (placeholder if not provided) */
  imageSource?: ImageSourcePropType;
  /** Product variants (color dots) */
  variants?: ProductVariant[];
  /** Maximum variants to show before "+N" */
  maxVisibleVariants?: number;
  /** Is product favorited */
  isFavorite?: boolean;
  /** Favorite button press handler */
  onFavoritePress?: () => void;
  /** Card press handler */
  onPress?: () => void;
  /** Disabled state */
  disabled?: boolean;
  /** Custom style */
  style?: ViewStyle;
  /** Image aspect ratio (width:height) - default 3.5:4 */
  imageAspectRatio?: number;
}

/**
 * ProductCard Component
 *
 * Displays product information with squircle shapes for image, tags, and variant dots.
 * Height is dynamic based on content.
 *
 * @example
 * ```tsx
 * <ProductCard
 *   category="Men"
 *   categoryColorScheme="info"
 *   productType="Rubberized PVC Sports"
 *   title="Loafers LAND AD -1372"
 *   location="Made in Delhi NCR"
 *   moq="MOQ : 4 Pairs"
 *   stockWarning="Only 2 Left"
 *   deliveryTime="Delivery in 2 hours"
 *   margin="56% Margin"
 *   price="434"
 *   mrp="999"
 *   variants={[
 *     { id: '1', color: '#FF0000' },
 *     { id: '2', color: '#00FF00' },
 *   ]}
 *   isFavorite={false}
 *   onFavoritePress={() => {}}
 *   onPress={() => {}}
 * />
 * ```
 */
export const ProductCard: React.FC<ProductCardProps> = ({
  category,
  categoryColorScheme = 'info',
  productType,
  title,
  location,
  moq,
  stockWarning,
  deliveryTime,
  margin,
  price,
  mrp,
  imageSource,
  variants = [],
  maxVisibleVariants = 3,
  isFavorite = false,
  onFavoritePress,
  onPress,
  disabled = false,
  style,
  imageAspectRatio = 3.5 / 4, // width:height = 3.5:4
}) => {
  const { theme } = useTheme();

  const visibleVariants = variants.slice(0, maxVisibleVariants);
  const remainingVariants = variants.length - maxVisibleVariants;

  const content = (
    <View style={styles.container}>
      {/* Image Container with 3.5:4 aspect ratio */}
      <View style={styles.imageContainer}>
        <SquircleView
          cornerStyle="squircle"
          cornerRadius={12}
          backgroundColor={theme.colors.surface.sunken}
          style={{
            width: '100%',
            aspectRatio: imageAspectRatio,
            overflow: 'hidden',
          }}
        >
          {imageSource ? (
            <Image source={imageSource} style={styles.productImage} resizeMode="cover" />
          ) : (
            <View style={styles.imagePlaceholder} />
          )}
        </SquircleView>

        {/* Category Tag - Bottom Left */}
        {category && (
          <View style={styles.categoryTag}>
            <SquircleView
              cornerStyle="squircle"
              cornerRadius={7}
              backgroundColor="rgba(120, 154, 233, 0.78)"
              borderWidth={1}
              borderColor="#789ae9"
              style={styles.categoryTagInner}
            >
              <SushiText
                variant="labelSmall"
                customColor="#FFFFFF"
                style={styles.categoryText}
              >
                {category}
              </SushiText>
            </SquircleView>
          </View>
        )}

        {/* Favorite Button - Top Right */}
        <View style={styles.favoriteButton}>
          <Pressable
            onPress={onFavoritePress}
            disabled={!onFavoritePress || disabled}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <SquircleView
              cornerStyle="squircle"
              cornerRadius={10}
              backgroundColor="#FFFFFF"
              style={styles.favoriteIconContainer}
            >
              <View style={styles.favoriteIcon}>
                <SushiText variant="body" customColor={isFavorite ? '#FF0000' : '#9C9C9C'}>
                  {isFavorite ? '❤' : '♡'}
                </SushiText>
              </View>
            </SquircleView>
          </Pressable>
        </View>

        {/* Product Variants - Bottom Right */}
        {variants.length > 0 && (
          <View style={styles.variantsContainer}>
            <SquircleView
              cornerStyle="squircle"
              cornerRadius={10}
              backgroundColor="#FFFFFF"
              borderWidth={1}
              borderColor="#3D3D46"
              style={styles.variantsInner}
            >
              <View style={styles.variantDots}>
                {visibleVariants.map((variant, index) => (
                  <View
                    key={variant.id}
                    style={[
                      styles.variantDot,
                      { backgroundColor: variant.color },
                      index > 0 && styles.variantDotOverlap,
                    ]}
                  />
                ))}
                {remainingVariants > 0 && (
                  <SushiText
                    variant="caption"
                    customColor="#FFFFFF"
                    style={styles.variantCount}
                  >
                    +{remainingVariants}
                  </SushiText>
                )}
              </View>
            </SquircleView>
          </View>
        )}
      </View>

      {/* Content Section */}
      <View style={styles.contentSection}>
        {/* Product Type Tag */}
        {productType && (
          <SquircleView
            cornerStyle="squircle"
            cornerRadius={7}
            backgroundColor={theme.mode === 'light' ? '#FFFFFF' : '#2F2F38'}
            borderWidth={theme.mode === 'dark' ? 1 : 0}
            borderColor={theme.mode === 'dark' ? '#3D3D46' : 'transparent'}
            style={styles.productTypeTag}
          >
            <SushiText
              variant="labelSmall"
              customColor={theme.mode === 'light' ? '#00006F' : '#FFFFFF'}
              style={styles.productTypeText}
            >
              {productType}
            </SushiText>
          </SquircleView>
        )}

        {/* Product Title */}
        <SushiText
          variant="body"
          customColor={theme.colors.text.primary}
          style={styles.title}
          numberOfLines={2}
        >
          {title}
        </SushiText>

        {/* Location */}
        {location && (
          <SushiText
            variant="caption"
            customColor={theme.colors.text.secondary}
            style={styles.location}
          >
            {location}
          </SushiText>
        )}

        {/* MOQ and Stock Warning */}
        {(moq || stockWarning) && (
          <View style={styles.moqRow}>
            {moq && (
              <SushiText
                variant="labelSmall"
                customColor={theme.colors.text.primary}
                style={styles.moqText}
              >
                {moq}
              </SushiText>
            )}
            {stockWarning && (
              <SushiText
                variant="labelSmall"
                customColor="#F96220"
                style={styles.stockWarning}
              >
                {stockWarning}
              </SushiText>
            )}
          </View>
        )}

        {/* Delivery Info */}
        {deliveryTime && (
          <View style={styles.deliveryContainer}>
            <View style={[
              styles.deliveryIconCircle,
              {
                backgroundColor: theme.colors.surface.raised,
                borderWidth: 1,
                borderColor: theme.colors.border.default,
              }
            ]}>
              <SushiText variant="caption">🚚</SushiText>
            </View>
            <SquircleView
              cornerStyle="squircle"
              cornerRadius={7}
              backgroundColor={theme.colors.surface.raised}
              borderWidth={1}
              borderColor={theme.colors.border.default}
              style={styles.deliveryTag}
            >
              <SushiText
                variant="labelSmall"
                customColor={theme.colors.text.primary}
                style={styles.deliveryText}
              >
                {deliveryTime}
              </SushiText>
            </SquircleView>
          </View>
        )}

        {/* Margin */}
        {margin && (
          <SushiText
            variant="labelSmall"
            customColor="#3B8EF5"
            style={styles.marginText}
          >
            {margin}
          </SushiText>
        )}

        {/* Pricing */}
        <View style={styles.pricingRow}>
          <SushiText
            variant="body"
            customColor={theme.colors.text.primary}
            style={styles.priceText}
          >
            ₹ {price}
          </SushiText>
          {mrp && (
            <SushiText
              variant="body"
              customColor={theme.colors.text.tertiary}
              style={styles.mrp}
            >
              MRP ₹{mrp}
            </SushiText>
          )}
        </View>
      </View>
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        style={({ pressed }) => [
          styles.card,
          pressed && styles.pressed,
          disabled && styles.disabled,
          style,
        ]}
        onPress={onPress}
        disabled={disabled}
        accessibilityRole="button"
      >
        {content}
      </Pressable>
    );
  }

  return <View style={[styles.card, disabled && styles.disabled, style]}>{content}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    minHeight: 200,
  },
  categoryTag: {
    position: 'absolute',
    bottom: spacing.sm,
    left: spacing.sm,
  },
  categoryTagInner: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
   
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
  },
  favoriteButton: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
  },
  favoriteIconContainer: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  variantsContainer: {
    position: 'absolute',
    bottom: spacing.sm,
    right: spacing.sm,
  },
  variantsInner: {
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xs,
    minHeight: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#3D3D46',
  },
  variantDots: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  variantDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  variantDotOverlap: {
    marginLeft: -6,
  },
  variantCount: {
    fontSize: 8,
    marginLeft: 4,
  },
  contentSection: {
    paddingTop: spacing.sm,
  },
  productTypeTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs/2,
    marginBottom: spacing.xs,
  },
  productTypeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  title: {
    fontSize: 14,
   // marginBottom: spacing.xs / 10,
    fontWeight: '600',
  },
  location: {
    fontSize: 10,
    marginBottom: spacing.xs,
  },
  moqRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  moqText: {
    fontSize: 12,
    marginRight: spacing.sm,
    fontWeight: '600',
  },
  stockWarning: {
    fontSize: 12,
    fontWeight: '600',
  },
  deliveryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  deliveryIconCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: -spacing.md,
    zIndex: 1,
  },
  deliveryTag: {
    paddingLeft: spacing.lg,
    paddingRight: spacing.md,
    paddingVertical: spacing.xs,
  },
  deliveryText: {
    fontSize: 12,
    fontWeight: '600',
  },
  marginText: {
    fontSize: 12,
   // marginBottom: spacing.xs,
    fontWeight: '600',
  },
  pricingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  priceText: {
    fontSize: 16,
    fontWeight: '600',
  },
  mrp: {
    fontSize: 14,
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    opacity: 0.5,
  },
});

ProductCard.displayName = 'ProductCard';
