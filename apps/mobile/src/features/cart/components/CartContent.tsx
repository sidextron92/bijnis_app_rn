import React, { useMemo } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppSelector } from '@/store/hooks';
import {
  selectCartItems,
  selectCartTotal,
  selectCartSavings,
  selectCartItemCount,
} from '../store/cartSlice';
import { CartItem } from './CartItem';
import { H1, H2, Body, Caption, SushiButton, useTheme } from 'design-system';
import { spacing } from '@/theme/spacing';

export function CartContent() {
  const router = useRouter();
  const { theme } = useTheme();
  const colors = theme.colors;
  const styles = useMemo(() => createStyles(colors), [colors]);

  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);
  const savings = useAppSelector(selectCartSavings);
  const itemCount = useAppSelector(selectCartItemCount);

  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <H2>Your cart is empty</H2>
        <Body color="secondary" style={styles.emptySubtitle}>Add items to start shopping</Body>
        <SushiButton onPress={() => router.push('/(main)/(tabs)/home')}>
          Browse Products
        </SushiButton>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <H1>Cart</H1>
        <Caption color="secondary" style={styles.headerSubtitle}>{itemCount} items</Caption>
      </View>

      <FlatList
        data={items}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <CartItem item={item} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.footer}>
        {savings > 0 && (
          <View style={styles.savingsBar}>
            <Body style={styles.savingsText}>
              You're saving ₹{savings.toFixed(2)} on this order!
            </Body>
          </View>
        )}

        <View style={styles.totalContainer}>
          <View>
            <Caption color="secondary">Total</Caption>
            <H2>₹{total.toFixed(2)}</H2>
          </View>
          <SushiButton onPress={() => router.push('/(main)/checkout')}>
            Proceed to Checkout
          </SushiButton>
        </View>
      </View>
    </View>
  );
}

const createStyles = (colors: ReturnType<typeof useTheme>['theme']['colors']) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: colors.border.default,
    },
    headerSubtitle: {
      marginTop: spacing.xs,
    },
    list: {
      padding: spacing.lg,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: spacing.xl,
    },
    emptySubtitle: {
      marginTop: spacing.sm,
      marginBottom: spacing.xl,
    },
    footer: {
      borderTopWidth: 1,
      borderTopColor: colors.border.default,
    },
    savingsBar: {
      backgroundColor: colors.background.successSubtle,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.lg,
    },
    savingsText: {
      color: colors.text.success,
      textAlign: 'center',
    },
    totalContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: spacing.lg,
    },
  });
