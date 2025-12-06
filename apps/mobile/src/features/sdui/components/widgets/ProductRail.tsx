import React, { useMemo, useState } from 'react';
import { View, StyleSheet, FlatList, Pressable, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import type { ProductRailProps } from '../../types';
import {
  useTheme,
  ProductCard,
  SushiText,
  ProductDetailBottomSheet,
} from 'design-system';
import { spacing } from '@/theme/spacing';
import { useSnackbar } from '@/contexts/SnackbarContext';

const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_MARGIN = 12;
const HORIZONTAL_PADDING = 16;
// Calculate card width: (screenWidth - 2*padding - 2*margin) / 2.25 (to show 2 full cards + 1/4 of 3rd)
const CARD_WIDTH = (SCREEN_WIDTH - HORIZONTAL_PADDING * 2 - CARD_MARGIN * 2) / 2.25;

export function ProductRail({ title, products, seeAllLink }: ProductRailProps) {
  const router = useRouter();
  const { theme } = useTheme();
  const snackbarHostState = useSnackbar();
  const styles = useMemo(() => createStyles(theme.colors), [theme.colors]);
  const [selectedProduct, setSelectedProduct] = useState<ProductRailProps['products'][0] | null>(null);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  if (!products || products.length === 0) {
    return null;
  }

  const handleAddPress = (product: ProductRailProps['products'][0]) => {
    setSelectedProduct(product);
    setBottomSheetVisible(true);
  };

  const handleAddItems = (selections: Record<string, number>) => {
    console.log('Add to cart:', {
      product: selectedProduct,
      selections,
    });
    // TODO: Implement add to cart logic
    setBottomSheetVisible(false);
  };

  const handleFavoritePress = (productId: string) => {
    const isCurrentlyFavorite = favorites.has(productId);
    const isAdding = !isCurrentlyFavorite;

    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });

    // Show snackbar feedback after state update
    setTimeout(() => {
      if (isAdding) {
        snackbarHostState.showSnackbar({
          message: 'Product marked as favorite',
          variant: 'success',
          duration: 'short',
          actionText: 'Close',
          onAction: () => {
            // Snackbar will auto-dismiss
          },
        });
      } else {
        snackbarHostState.showSnackbar({
          message: 'Product removed from favorites',
          variant: 'default',
          duration: 'short',
          actionText: 'Close',
          onAction: () => {
            // Snackbar will auto-dismiss
          },
        });
      }
    }, 0);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SushiText variant="heading3" customColor={theme.colors.text.primary}>
          {title}
        </SushiText>
        {seeAllLink && (
          <Pressable onPress={() => router.push(seeAllLink as any)}>
            <SushiText variant="body" customColor={theme.colors.interactive.primary} style={styles.seeAll}>
              See All
            </SushiText>
          </Pressable>
        )}
      </View>

      <FlatList
        horizontal
        data={products}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ProductCardWrapper
            product={item}
            onAddPress={() => handleAddPress(item)}
            isFavorite={favorites.has(item.id)}
            onFavoritePress={() => handleFavoritePress(item.id)}
          />
        )}
      />

      {/* Product Detail Bottom Sheet */}
      {selectedProduct && (
        <ProductDetailBottomSheet
          visible={bottomSheetVisible}
          onDismissRequest={() => setBottomSheetVisible(false)}
          productInfo={{
            imageSource: { uri: selectedProduct.image },
            colorIndicator: selectedProduct.variants?.[0]?.color,
            colorName: selectedProduct.variants?.[0]?.id,
            sizeInfo: selectedProduct.category || 'Standard Sizes',
            price: `₹${selectedProduct.price}`,
            priceNote: selectedProduct.mrp > selectedProduct.price ? `MRP ₹${selectedProduct.mrp}` : undefined,
          }}
          sizeGuide={{
            rowLabels: ['Length (Inch)', 'Chest (Inch)'],
            sizeColumns: [
              { size: 'S', values: ['24', '34'] },
              { size: 'M', values: ['24', '34'] },
              { size: 'L', values: ['24', '34'] },
              { size: 'XL', values: ['24', '34'] },
              { size: 'XXL', values: ['24', '34'] },
              { size: 'XXXL', values: ['24', '34'] },
            ],
            footerNote: '**0.75 +/- inches may vary on physical product due to wash/shrinkage**',
          }}
          deliveryOptions={[
            {
              id: 'express',
              variant: 'express',
              deliveryTitle: '60 Min Delivery',
              icon: '🚀',
              sizeSets: [
                {
                  sizeSet: '7/2, 8/1, 9/1',
                  description: '4 Pairs per size set',
                  quantity: 0,
                },
                {
                  sizeSet: '7/2, 8/2',
                  description: '4 Pairs per size set',
                  extraPrice: 'Extra price: ₹ 5/pair',
                  quantity: 0,
                },
              ],
            },
            {
              id: 'prebook',
              variant: 'prebook',
              deliveryTitle: 'Pre Book: Delivery by 15 Oct',
              icon: '🕐',
              sizeSets: [
                {
                  sizeSet: '7/2, 8/1, 9/1',
                  description: '4 Pairs per size set',
                  quantity: 0,
                },
                {
                  sizeSet: '7/2, 8/2',
                  description: '4 Pairs per size set',
                  extraPrice: 'Extra price: ₹ 5/pair',
                  quantity: 0,
                },
              ],
            },
          ]}
          showSizeGuide={true}
          onAddItems={handleAddItems}
        />
      )}
    </View>
  );
}

interface ProductCardWrapperProps {
  product: ProductRailProps['products'][0];
  onAddPress: () => void;
  isFavorite: boolean;
  onFavoritePress: () => void;
}

function ProductCardWrapper({ product, onAddPress, isFavorite, onFavoritePress }: ProductCardWrapperProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/(main)/product/${product.id}`);
  };

  // Pass all product details to ProductCard
  return (
    <View style={{ marginRight: CARD_MARGIN }}>
      <ProductCard
        category={product.category}
        categoryColorScheme={product.categoryColorScheme}
        productType={product.productType}
        title={product.name}
        location={product.location}
        moq={product.moq}
        stockWarning={product.stockWarning}
        deliveryTime={product.deliveryTime}
        margin={product.margin}
        price={String(product.price)}
        mrp={product.mrp > product.price ? String(product.mrp) : undefined}
        imageSource={{ uri: product.image }}
        variants={product.variants}
        isFavorite={isFavorite}
        onFavoritePress={onFavoritePress}
        onPress={handlePress}
        onAddPress={onAddPress}
        width={CARD_WIDTH}
      />
    </View>
  );
}

const createStyles = (colors: ReturnType<typeof useTheme>['theme']['colors']) =>
  StyleSheet.create({
    container: {
      paddingVertical: spacing.md,
      backgroundColor: colors.background.primary,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: HORIZONTAL_PADDING,
      marginBottom: spacing.md,
    },
    seeAll: {
      fontWeight: '500',
    },
    list: {
      paddingHorizontal: HORIZONTAL_PADDING,
    },
    bottomSheetContent: {
      flex: 1,
    },
    bottomSheetSpacing: {
      height: spacing.md,
    },
  });
