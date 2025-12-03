import React, { useMemo } from 'react';
import { View, StyleSheet, Image, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppDispatch } from '@/store/hooks';
import { incrementQuantity, decrementQuantity, removeFromCart } from '../store/cartSlice';
import type { CartItem as CartItemType } from 'shared-types';
import { Body, Caption, useTheme } from 'design-system';
import { spacing } from '@/theme/spacing';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const dispatch = useAppDispatch();
  const { theme } = useTheme();
  const colors = theme.colors;
  const styles = useMemo(() => createStyles(colors), [colors]);

  const handleIncrement = () => {
    dispatch(incrementQuantity(item.productId));
  };

  const handleDecrement = () => {
    dispatch(decrementQuantity(item.productId));
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item.productId));
  };

  const discount = item.mrp > item.price ? Math.round(((item.mrp - item.price) / item.mrp) * 100) : 0;

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={styles.details}>
        <Body numberOfLines={2} style={styles.name}>
          {item.name}
        </Body>
        <Caption color="secondary">{item.unit}</Caption>

        <View style={styles.priceRow}>
          <Body weight="semibold">₹{item.price}</Body>
          {item.mrp > item.price && (
            <>
              <Caption color="secondary" style={styles.mrp}>₹{item.mrp}</Caption>
              <Caption style={styles.discount}>{discount}% OFF</Caption>
            </>
          )}
        </View>
      </View>

      <View style={styles.actions}>
        <Pressable style={styles.removeButton} onPress={handleRemove}>
          <Ionicons name="trash-outline" size={18} color={colors.text.error} />
        </Pressable>

        <View style={styles.quantityContainer}>
          <Pressable style={styles.quantityButton} onPress={handleDecrement}>
            <Ionicons name="remove" size={18} color={colors.interactive.primary} />
          </Pressable>
          <Body weight="semibold" style={styles.quantity}>{item.quantity}</Body>
          <Pressable style={styles.quantityButton} onPress={handleIncrement}>
            <Ionicons name="add" size={18} color={colors.interactive.primary} />
          </Pressable>
        </View>

        <Body weight="semibold" style={styles.itemTotal}>₹{(item.price * item.quantity).toFixed(2)}</Body>
      </View>
    </View>
  );
}

const createStyles = (colors: ReturnType<typeof useTheme>['theme']['colors']) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      paddingVertical: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: colors.border.default,
    },
    image: {
      width: 80,
      height: 80,
      borderRadius: 8,
      backgroundColor: colors.background.tertiary,
    },
    details: {
      flex: 1,
      marginLeft: spacing.md,
    },
    name: {
      marginBottom: spacing.xs,
    },
    priceRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: spacing.xs,
    },
    mrp: {
      textDecorationLine: 'line-through',
      marginLeft: spacing.xs,
    },
    discount: {
      color: colors.text.success,
      marginLeft: spacing.xs,
    },
    actions: {
      alignItems: 'flex-end',
      justifyContent: 'space-between',
    },
    removeButton: {
      padding: spacing.xs,
    },
    quantityContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.interactive.primary,
      borderRadius: 6,
    },
    quantityButton: {
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
    },
    quantity: {
      color: colors.interactive.primary,
      minWidth: 24,
      textAlign: 'center',
    },
    itemTotal: {
      marginTop: spacing.xs,
    },
  });
