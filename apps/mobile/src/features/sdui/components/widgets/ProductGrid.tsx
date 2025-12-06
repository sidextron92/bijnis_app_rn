import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { SushiText } from 'design-system';
import { ProductCard } from 'design-system';
import { spacing } from '@/theme/spacing';
import { homeApi } from '@/mocks/api';
import type { ProductGridItem } from '@/mocks/data/productGrid';
import { useSnackbar } from '@/contexts/SnackbarContext';

interface ProductGridProps {
  title?: string;
  columns?: number;
  gap?: number;
}

// Calculate card width based on screen width to maintain 2-column grid
const COLUMNS = 2;
const HORIZONTAL_PADDING = spacing.sm * 2; // Left + right padding
const GAP_WIDTH = 16; // Gap between cards

export function ProductGrid({ title = 'Popular Products', columns = 2, gap = 16 }: ProductGridProps) {
  const router = useRouter();
  const { width: screenWidth } = useWindowDimensions();
  const snackbarHostState = useSnackbar();
  const [products, setProducts] = useState<ProductGridItem[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  // Calculate card width dynamically to ensure 2-column grid
  const availableWidth = screenWidth - HORIZONTAL_PADDING;
  const cardWidth = (availableWidth - GAP_WIDTH * (COLUMNS - 1)) / COLUMNS;

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await homeApi.getProductList();
      if (response.success && response.data) {
        setProducts(response.data);
        // Initialize favorites from data
        const initialFavorites = new Set(
          response.data.filter(p => p.isFavorite).map(p => p.id)
        );
        setFavorites(initialFavorites);
      }
    } catch (error) {
      console.error('Error loading product grid:', error);
    } finally {
      setLoading(false);
    }
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

  const handleProductPress = (productId: string) => {
    router.push(`/product/${productId}` as any);
  };

  if (loading) {
    return null; // Or show skeleton
  }

  return (
    <View style={styles.container}>
      {title && (
        <View style={styles.header}>
          <SushiText variant="h3">
            {title}
          </SushiText>
        </View>
      )}

      <View style={styles.grid}>
        {products.map((product) => (
          <View key={product.id} style={[styles.cardWrapper, { width: cardWidth }]}>
            <ProductCard
              category={product.category}
              categoryColorScheme={product.categoryColorScheme}
              productType={product.productType}
              title={product.title}
              location={product.location}
              moq={product.moq}
              stockWarning={product.stockWarning}
              deliveryTime={product.deliveryTime}
              margin={product.margin}
              price={product.price}
              mrp={product.mrp}
              imageSource={product.imageUrl ? { uri: product.imageUrl } : undefined}
              variants={product.variants}
              isFavorite={favorites.has(product.id)}
              onFavoritePress={() => handleFavoritePress(product.id)}
              onPress={() => handleProductPress(product.id)}
              style={{ width: cardWidth }}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.sm,
  },
  header: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.sm,
    gap: 10,
  },
  cardWrapper: {
    marginBottom: spacing.lg,
  },
});
