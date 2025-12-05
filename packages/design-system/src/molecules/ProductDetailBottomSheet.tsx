/**
 * ProductDetailBottomSheet - Complete Product Detail Bottom Sheet
 *
 * A complete implementation combining all product detail components:
 * - Product Selection Card (image, color, size, price)
 * - Size Guide Table
 * - Delivery Option Cards with Size Set Selectors
 * - Sticky ADD ITEMS button at the bottom
 *
 * @platform android
 * @platform ios
 * @platform web
 */

import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useTheme } from '../theme';
import { SushiBottomSheet, SushiBottomSheetProps } from '../atoms/BottomSheet/SushiBottomSheet';
import { ProductSelectionCard, ProductSelectionCardProps } from '../atoms/Card/ProductSelectionCard';
import { SizeGuideTable, SizeGuideTableProps } from '../atoms/Table/SizeGuideTable';
import { DeliveryOptionCard, SizeSetItem } from '../atoms/Card/DeliveryOptionCard';
import { SizeSetSelector } from '../atoms/Input/SizeSetSelector';
import { SushiText } from '../atoms/Text/SushiText';
import { spacing } from '../tokens/spacing';

/**
 * Delivery option data
 */
export interface DeliveryOption {
  /** Unique ID */
  id: string;
  /** Variant type */
  variant: 'express' | 'prebook';
  /** Delivery title */
  deliveryTitle: string;
  /** Icon emoji */
  icon?: string;
  /** Size sets available for this delivery option */
  sizeSets: SizeSetItem[];
}

/**
 * ProductDetailBottomSheet Props
 */
export interface ProductDetailBottomSheetProps
  extends Omit<SushiBottomSheetProps, 'children' | 'footer'> {
  /** Product selection card data */
  productInfo: ProductSelectionCardProps;
  /** Size guide table data (optional) */
  sizeGuide?: SizeGuideTableProps;
  /** Delivery options */
  deliveryOptions: DeliveryOption[];
  /** Add items button label */
  addItemsLabel?: string;
  /** Callback when Add Items button is pressed */
  onAddItems?: (selections: Record<string, number>) => void;
  /** Show size guide section */
  showSizeGuide?: boolean;
}

/**
 * ProductDetailBottomSheet Component
 *
 * A complete bottom sheet implementation for product details with scrollable content
 * and a sticky ADD ITEMS button at the bottom.
 *
 * @example
 * ```tsx
 * const [visible, setVisible] = useState(false);
 *
 * <ProductDetailBottomSheet
 *   visible={visible}
 *   onDismissRequest={() => setVisible(false)}
 *   productInfo={{
 *     imageSource: require('./shoe.png'),
 *     colorIndicator: "#23c417",
 *     colorName: "Green",
 *     sizeInfo: "UK Sizes- Adult",
 *     price: "₹ 200/Pair",
 *     priceNote: "(Including GST)",
 *   }}
 *   sizeGuide={{
 *     rowLabels: ["Length (Inch)", "Chest (Inch)"],
 *     sizeColumns: [
 *       { size: "S", values: ["24", "34"] },
 *       { size: "M", values: ["24", "34"] },
 *     ],
 *     footerNote: "**0.75 +/- inches may vary**",
 *   }}
 *   deliveryOptions={[
 *     {
 *       id: "express",
 *       variant: "express",
 *       deliveryTitle: "60 Min Delivery",
 *       icon: "🚀",
 *       sizeSets: [...],
 *     },
 *   ]}
 *   onAddItems={(selections) => console.log(selections)}
 * />
 * ```
 */
export const ProductDetailBottomSheet: React.FC<ProductDetailBottomSheetProps> = ({
  productInfo,
  sizeGuide,
  deliveryOptions: initialDeliveryOptions,
  addItemsLabel = 'ADD ITEMS',
  onAddItems,
  showSizeGuide = true,
  ...bottomSheetProps
}) => {
  const { theme } = useTheme();

  // State for managing quantities
  const [deliveryOptions, setDeliveryOptions] = useState(initialDeliveryOptions);

  // Handle quantity change for a specific size set
  const handleQuantityChange = (
    deliveryId: string,
    sizeSetIndex: number,
    newQuantity: number
  ) => {
    setDeliveryOptions((prev) =>
      prev.map((option) => {
        if (option.id === deliveryId) {
          const updatedSizeSets = [...option.sizeSets];
          updatedSizeSets[sizeSetIndex] = {
            ...updatedSizeSets[sizeSetIndex],
            quantity: newQuantity,
          };
          return { ...option, sizeSets: updatedSizeSets };
        }
        return option;
      })
    );
  };

  // Handle Add Items button press
  const handleAddItems = () => {
    const selections: Record<string, number> = {};
    deliveryOptions.forEach((option) => {
      option.sizeSets.forEach((sizeSet, index) => {
        if (sizeSet.quantity > 0) {
          const key = `${option.id}-${index}`;
          selections[key] = sizeSet.quantity;
        }
      });
    });
    onAddItems?.(selections);
  };

  // Check if any items are selected
  const hasSelection = deliveryOptions.some((option) =>
    option.sizeSets.some((sizeSet) => sizeSet.quantity > 0)
  );

  return (
    <SushiBottomSheet
      {...bottomSheetProps}
      size="large"
      scrollable={false}
      footer={
        <Pressable
          onPress={handleAddItems}
          disabled={!hasSelection}
          style={({ pressed }) => [
            styles.addItemsButton,
            { backgroundColor: theme.colors.interactive.primary },
            !hasSelection && styles.addItemsButtonDisabled,
            pressed && styles.pressed,
          ]}
        >
          <SushiText
            variant="body"
            customColor="#FFFFFF"
            style={styles.addItemsButtonText}
          >
            {addItemsLabel}
          </SushiText>
        </Pressable>
      }
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
        bounces={true}
      >
        {/* Product Selection Card */}
        <View style={styles.section}>
          <SushiText
            variant="body"
            customColor={theme.colors.text.primary}
            style={styles.sectionTitle}
          >
            Select Size Set for
          </SushiText>
          <ProductSelectionCard {...productInfo} />
        </View>

        {/* Size Guide Table */}
        {showSizeGuide && sizeGuide && (
          <View style={styles.section}>
            <SushiText
              variant="caption"
              customColor={theme.colors.text.primary}
              style={styles.sectionTitle}
            >
              Size Guide:
            </SushiText>
            <SizeGuideTable {...sizeGuide} />
          </View>
        )}

        {/* Delivery Options */}
        <View style={styles.deliveryOptionsContainer}>
          {deliveryOptions.map((option) => (
            <DeliveryOptionCard
              key={option.id}
              variant={option.variant}
              deliveryTitle={option.deliveryTitle}
              icon={option.icon}
              sizeSets={option.sizeSets}
            >
              {/* Custom size set list with selectors */}
              <View style={styles.sizeSetsList}>
                {option.sizeSets.map((sizeSet, index) => (
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

                      {/* Size Set Selector */}
                      <SizeSetSelector
                        value={sizeSet.quantity}
                        onChange={(qty) =>
                          handleQuantityChange(option.id, index, qty)
                        }
                        min={0}
                        max={99}
                      />
                    </View>
                  </View>
                ))}
              </View>
            </DeliveryOptionCard>
          ))}
        </View>

        {/* Bottom spacing for scroll */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SushiBottomSheet>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.md,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: spacing.sm,
  },
  deliveryOptionsContainer: {
    gap: spacing.sm,
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
    alignItems: 'center',
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
  bottomSpacer: {
    height: spacing.xl,
  },
  addItemsButton: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addItemsButtonDisabled: {
    opacity: 0.5,
  },
  addItemsButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.8,
  },
});

ProductDetailBottomSheet.displayName = 'ProductDetailBottomSheet';
