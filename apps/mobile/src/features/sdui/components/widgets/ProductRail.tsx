import React, { useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addToCart, selectItemQuantity, incrementQuantity, decrementQuantity } from '@/features/cart/store/cartSlice';
import type { ProductRailProps } from '../../types';
import { useTheme } from 'design-system';
import { spacing } from '@/theme/spacing';

export function ProductRail({ title, products, seeAllLink }: ProductRailProps) {
  const router = useRouter();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme.colors), [theme.colors]);

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {seeAllLink && (
          <Pressable onPress={() => router.push(seeAllLink as any)}>
            <Text style={styles.seeAll}>See All</Text>
          </Pressable>
        )}
      </View>

      <FlatList
        horizontal
        data={products}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <ProductCard product={item} styles={styles} colors={theme.colors} />}
      />
    </View>
  );
}

interface ProductCardProps {
  product: ProductRailProps['products'][0];
  styles: ReturnType<typeof createStyles>;
  colors: ReturnType<typeof useTheme>['theme']['colors'];
}

function ProductCard({ product, styles, colors }: ProductCardProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const quantity = useAppSelector(selectItemQuantity(product.id));

  const discount = product.mrp > product.price
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0;

  const handlePress = () => {
    router.push(`/(main)/product/${product.id}`);
  };

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      images: [product.image],
      sellingPrice: product.price,
      mrp: product.mrp,
      unit: product.unit,
    } as any));
  };

  const handleIncrement = () => {
    dispatch(incrementQuantity(product.id));
  };

  const handleDecrement = () => {
    dispatch(decrementQuantity(product.id));
  };

  return (
    <Pressable style={styles.card} onPress={handlePress}>
      {discount > 0 && (
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>{discount}% OFF</Text>
        </View>
      )}

      <Image source={{ uri: product.image }} style={styles.image} />

      <View style={styles.cardContent}>
        <Text style={styles.productName} numberOfLines={2}>
          {product.name}
        </Text>
        <Text style={styles.unit}>{product.unit}</Text>

        <View style={styles.priceRow}>
          <Text style={styles.price}>₹{product.price}</Text>
          {product.mrp > product.price && (
            <Text style={styles.mrp}>₹{product.mrp}</Text>
          )}
        </View>

        {quantity === 0 ? (
          <Pressable style={styles.addButton} onPress={handleAddToCart}>
            <Text style={styles.addButtonText}>ADD</Text>
          </Pressable>
        ) : (
          <View style={styles.quantityContainer}>
            <Pressable style={styles.qtyButton} onPress={handleDecrement}>
              <Text style={styles.qtyButtonText}>-</Text>
            </Pressable>
            <Text style={styles.qty}>{quantity}</Text>
            <Pressable style={styles.qtyButton} onPress={handleIncrement}>
              <Text style={styles.qtyButtonText}>+</Text>
            </Pressable>
          </View>
        )}
      </View>
    </Pressable>
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
      paddingHorizontal: spacing.lg,
      marginBottom: spacing.md,
    },
    title: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text.primary,
    },
    seeAll: {
      fontSize: 14,
      color: colors.interactive.primary,
      fontWeight: '500',
    },
    list: {
      paddingHorizontal: spacing.lg,
    },
    card: {
      width: 140,
      marginRight: spacing.md,
      backgroundColor: colors.surface.default,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.border.default,
      overflow: 'hidden',
    },
    discountBadge: {
      position: 'absolute',
      top: 8,
      left: 8,
      backgroundColor: colors.background.success,
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 4,
      zIndex: 1,
    },
    discountText: {
      color: colors.text.inverse,
      fontSize: 10,
      fontWeight: '600',
    },
    image: {
      width: '100%',
      height: 120,
      backgroundColor: colors.background.tertiary,
    },
    cardContent: {
      padding: spacing.sm,
    },
    productName: {
      fontSize: 12,
      color: colors.text.primary,
      marginBottom: spacing.xs,
      height: 32,
    },
    unit: {
      fontSize: 10,
      color: colors.text.secondary,
      marginBottom: spacing.xs,
    },
    priceRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing.sm,
    },
    price: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text.primary,
    },
    mrp: {
      fontSize: 11,
      color: colors.text.secondary,
      textDecorationLine: 'line-through',
      marginLeft: spacing.xs,
    },
    addButton: {
      backgroundColor: colors.surface.default,
      borderWidth: 1,
      borderColor: colors.interactive.primary,
      borderRadius: 6,
      paddingVertical: spacing.xs,
      alignItems: 'center',
    },
    addButtonText: {
      color: colors.interactive.primary,
      fontSize: 12,
      fontWeight: '600',
    },
    quantityContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.interactive.primary,
      borderRadius: 6,
      paddingVertical: 2,
    },
    qtyButton: {
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
    },
    qtyButtonText: {
      color: colors.text.inverse,
      fontSize: 14,
      fontWeight: '600',
    },
    qty: {
      color: colors.text.inverse,
      fontSize: 12,
      fontWeight: '600',
    },
  });
