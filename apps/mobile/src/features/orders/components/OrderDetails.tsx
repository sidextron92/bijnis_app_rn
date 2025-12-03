import React, { useEffect, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchOrderById, selectSelectedOrder, selectOrdersLoading } from '../store/ordersSlice';
import { H2, H3, Body, Caption, SushiLoader, useTheme } from 'design-system';
import { spacing } from '@/theme/spacing';

interface OrderDetailsProps {
  orderId: string;
}

export function OrderDetails({ orderId }: OrderDetailsProps) {
  const dispatch = useAppDispatch();
  const { theme } = useTheme();
  const colors = theme.colors;
  const styles = useMemo(() => createStyles(colors), [colors]);

  const order = useAppSelector(selectSelectedOrder);
  const isLoading = useAppSelector(selectOrdersLoading);

  useEffect(() => {
    dispatch(fetchOrderById(orderId));
  }, [orderId, dispatch]);

  if (isLoading || !order) {
    return (
      <View style={styles.loadingContainer}>
        <SushiLoader size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <H2>Order #{order.orderNumber}</H2>
        <Caption color="secondary" style={styles.date}>
          {new Date(order.createdAt).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Caption>
      </View>

      <View style={styles.section}>
        <H3>Items</H3>
        {order.items.map((item, index) => (
          <View key={index} style={styles.item}>
            <View style={styles.itemInfo}>
              <Body>{item.productName}</Body>
              <Caption color="secondary">x{item.quantity}</Caption>
            </View>
            <Body weight="medium">₹{item.totalPrice}</Body>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <H3>Payment Summary</H3>
        <View style={styles.summaryRow}>
          <Body color="secondary">Subtotal</Body>
          <Body>₹{order.subtotal}</Body>
        </View>
        <View style={styles.summaryRow}>
          <Body color="secondary">Delivery Fee</Body>
          <Body>₹{order.deliveryFee}</Body>
        </View>
        {order.discount > 0 && (
          <View style={styles.summaryRow}>
            <Body color="secondary">Discount</Body>
            <Body style={styles.discount}>-₹{order.discount}</Body>
          </View>
        )}
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Body weight="semibold">Total</Body>
          <H2>₹{order.total}</H2>
        </View>
      </View>
    </View>
  );
}

const createStyles = (colors: ReturnType<typeof useTheme>['theme']['colors']) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: spacing.lg,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    section: {
      marginBottom: spacing.xl,
    },
    date: {
      marginTop: spacing.sm,
    },
    item: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: colors.border.subtle,
      marginTop: spacing.md,
    },
    itemInfo: {
      flex: 1,
    },
    summaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: spacing.sm,
      marginTop: spacing.md,
    },
    discount: {
      color: colors.text.success,
    },
    totalRow: {
      paddingTop: spacing.md,
      borderTopWidth: 1,
      borderTopColor: colors.border.default,
      marginTop: spacing.sm,
    },
  });
