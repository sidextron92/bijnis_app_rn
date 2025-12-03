import React, { useEffect, useMemo } from 'react';
import { View, StyleSheet, Image, Pressable, ScrollView } from 'react-native';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchProductById, selectSelectedProduct, selectProductsLoading } from '../store/productsSlice';
import { addToCart, selectItemQuantity, incrementQuantity, decrementQuantity } from '@/features/cart/store/cartSlice';
import { H2, H3, Body, Caption, Badge, SushiButton, SushiLoader, useTheme } from 'design-system';
import { spacing } from '@/theme/spacing';

interface ProductDetailProps {
  productId: string;
}

export function ProductDetail({ productId }: ProductDetailProps) {
  const dispatch = useAppDispatch();
  const { theme } = useTheme();
  const colors = theme.colors;
  const styles = useMemo(() => createStyles(colors), [colors]);

  const product = useAppSelector(selectSelectedProduct);
  const isLoading = useAppSelector(selectProductsLoading);
  const quantity = useAppSelector(selectItemQuantity(productId));

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [productId, dispatch]);

  if (isLoading || !product) {
    return (
      <View style={styles.loadingContainer}>
        <SushiLoader size="large" />
      </View>
    );
  }

  const discount = product.mrp > product.sellingPrice
    ? Math.round(((product.mrp - product.sellingPrice) / product.mrp) * 100)
    : 0;

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const handleIncrement = () => {
    dispatch(incrementQuantity(product.id));
  };

  const handleDecrement = () => {
    dispatch(decrementQuantity(product.id));
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{ uri: product.images[0] }} style={styles.image} />

        <View style={styles.content}>
          <H2>{product.name}</H2>
          <Caption color="secondary" style={styles.unit}>{product.unit}</Caption>

          <View style={styles.priceContainer}>
            <H2>₹{product.sellingPrice}</H2>
            {discount > 0 && (
              <>
                <Body color="secondary" style={styles.mrp}>₹{product.mrp}</Body>
                <Badge variant="success">{discount}% OFF</Badge>
              </>
            )}
          </View>

          {product.description && (
            <View style={styles.section}>
              <H3>Description</H3>
              <Body color="secondary" style={styles.description}>{product.description}</Body>
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        {quantity === 0 ? (
          <SushiButton onPress={handleAddToCart} fullWidth>
            Add to Cart
          </SushiButton>
        ) : (
          <View style={styles.quantityContainer}>
            <Pressable style={styles.quantityButton} onPress={handleDecrement}>
              <Body style={styles.quantityButtonText}>-</Body>
            </Pressable>
            <Body style={styles.quantity}>{quantity}</Body>
            <Pressable style={styles.quantityButton} onPress={handleIncrement}>
              <Body style={styles.quantityButtonText}>+</Body>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
}

const createStyles = (colors: ReturnType<typeof useTheme>['theme']['colors']) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: '100%',
      height: 300,
      backgroundColor: colors.background.tertiary,
    },
    content: {
      padding: spacing.lg,
    },
    unit: {
      marginBottom: spacing.md,
    },
    priceContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing.lg,
      gap: spacing.sm,
    },
    mrp: {
      textDecorationLine: 'line-through',
    },
    section: {
      marginTop: spacing.lg,
    },
    description: {
      lineHeight: 22,
      marginTop: spacing.sm,
    },
    footer: {
      padding: spacing.lg,
      borderTopWidth: 1,
      borderTopColor: colors.border.default,
    },
    quantityContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.interactive.primary,
      borderRadius: 8,
      paddingVertical: spacing.sm,
    },
    quantityButton: {
      paddingHorizontal: spacing.xl,
      paddingVertical: spacing.sm,
    },
    quantityButtonText: {
      color: colors.text.inverse,
    },
    quantity: {
      color: colors.text.inverse,
      minWidth: 40,
      textAlign: 'center',
    },
  });
