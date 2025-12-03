import React, { useState, useMemo } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { selectCartItems, selectCartTotal, clearCart } from '@/features/cart/store/cartSlice';
import { createOrder } from '@/features/orders/store/ordersSlice';
import { H2, H3, Body, Caption, SushiButton, SushiLoader, useTheme } from 'design-system';
import { spacing } from '@/theme/spacing';

export function CheckoutContent() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { theme } = useTheme();
  const colors = theme.colors;
  const styles = useMemo(() => createStyles(colors), [colors]);

  const cartItems = useAppSelector(selectCartItems);
  const cartTotal = useAppSelector(selectCartTotal);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<string>('COD');

  const deliveryFee = cartTotal > 199 ? 0 : 25;
  const total = cartTotal + deliveryFee;

  const handlePlaceOrder = async () => {
    setIsLoading(true);
    try {
      const result = await dispatch(
        createOrder({
          addressId: 'default-address', // TODO: Implement address selection
          paymentMethod: selectedPayment,
        })
      );

      if (createOrder.fulfilled.match(result)) {
        dispatch(clearCart());
        router.replace(`/(main)/order/${result.payload.id}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Address Section */}
      <View style={styles.section}>
        <H3>Delivery Address</H3>
        <Pressable style={styles.addressCard}>
          <Body weight="semibold">Home</Body>
          <Body color="secondary" style={styles.addressText}>
            Select your delivery address
          </Body>
          <Body style={styles.changeText}>Change</Body>
        </Pressable>
      </View>

      {/* Payment Method */}
      <View style={styles.section}>
        <H3>Payment Method</H3>
        {['COD', 'UPI', 'CARD'].map(method => (
          <Pressable
            key={method}
            style={[
              styles.paymentOption,
              selectedPayment === method && styles.paymentOptionSelected,
            ]}
            onPress={() => setSelectedPayment(method)}
          >
            <View style={styles.radio}>
              {selectedPayment === method && <View style={styles.radioInner} />}
            </View>
            <Body>
              {method === 'COD' ? 'Cash on Delivery' : method}
            </Body>
          </Pressable>
        ))}
      </View>

      {/* Order Summary */}
      <View style={styles.section}>
        <H3>Order Summary</H3>
        <View style={styles.summaryRow}>
          <Body color="secondary">
            Items ({cartItems.length})
          </Body>
          <Body>₹{cartTotal.toFixed(2)}</Body>
        </View>
        <View style={styles.summaryRow}>
          <Body color="secondary">Delivery Fee</Body>
          <Body style={deliveryFee === 0 ? styles.freeDelivery : undefined}>
            {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
          </Body>
        </View>
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Body weight="semibold">Total</Body>
          <H2>₹{total.toFixed(2)}</H2>
        </View>
      </View>

      {/* Place Order Button */}
      <View style={styles.footer}>
        <SushiButton
          onPress={handlePlaceOrder}
          disabled={isLoading}
          loading={isLoading}
          fullWidth
        >
          Place Order • ₹{total.toFixed(2)}
        </SushiButton>
      </View>
    </View>
  );
}

const createStyles = (colors: ReturnType<typeof useTheme>['theme']['colors']) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    section: {
      padding: spacing.lg,
      borderBottomWidth: 8,
      borderBottomColor: colors.background.tertiary,
    },
    addressCard: {
      backgroundColor: colors.background.secondary,
      padding: spacing.md,
      borderRadius: 8,
      marginTop: spacing.md,
    },
    addressText: {
      marginVertical: spacing.sm,
    },
    changeText: {
      color: colors.interactive.primary,
    },
    paymentOption: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: colors.border.subtle,
      marginTop: spacing.md,
    },
    paymentOptionSelected: {
      backgroundColor: colors.background.brandSubtle,
      marginHorizontal: -spacing.lg,
      paddingHorizontal: spacing.lg,
    },
    radio: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: colors.interactive.primary,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: spacing.md,
    },
    radioInner: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: colors.interactive.primary,
    },
    summaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: spacing.sm,
      marginTop: spacing.md,
    },
    freeDelivery: {
      color: colors.text.success,
    },
    totalRow: {
      paddingTop: spacing.md,
      borderTopWidth: 1,
      borderTopColor: colors.border.default,
      marginTop: spacing.sm,
    },
    footer: {
      padding: spacing.lg,
    },
  });
