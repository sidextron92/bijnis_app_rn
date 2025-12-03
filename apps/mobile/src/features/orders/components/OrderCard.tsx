import React, { useMemo } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { Order } from 'shared-types';
import { Body, Caption, H3, useTheme } from 'design-system';
import { spacing } from '@/theme/spacing';

interface OrderCardProps {
  order: Order;
  onPress: () => void;
}

export function OrderCard({ order, onPress }: OrderCardProps) {
  const { theme } = useTheme();
  const colors = theme.colors;
  const styles = useMemo(() => createStyles(colors), [colors]);

  const statusConfig: Record<Order['status'], { label: string; color: string; bgColor: string }> = {
    PENDING: { label: 'Pending', color: colors.text.warning, bgColor: colors.background.warningSubtle },
    CONFIRMED: { label: 'Confirmed', color: colors.text.info, bgColor: colors.background.infoSubtle },
    PREPARING: { label: 'Preparing', color: colors.text.info, bgColor: colors.background.infoSubtle },
    OUT_FOR_DELIVERY: { label: 'Out for Delivery', color: colors.text.brand, bgColor: colors.background.brandSubtle },
    DELIVERED: { label: 'Delivered', color: colors.text.success, bgColor: colors.background.successSubtle },
    CANCELLED: { label: 'Cancelled', color: colors.text.error, bgColor: colors.background.errorSubtle },
  };

  const defaultStatus = { label: 'Unknown', color: colors.text.secondary, bgColor: colors.background.tertiary };
  const status = statusConfig[order.status] || defaultStatus;
  const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <View>
          <Body weight="semibold">{order.orderNumber}</Body>
          <Caption color="secondary" style={styles.date}>
            {new Date(order.createdAt).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </Caption>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: status.bgColor }]}>
          <Caption weight="semibold" style={{ color: status.color }}>{status.label}</Caption>
        </View>
      </View>

      <View style={styles.details}>
        <Body color="secondary">{itemCount} items</Body>
        <H3>₹{order.total}</H3>
      </View>

      <View style={styles.footer}>
        <View style={styles.itemsPreview}>
          {order.items.slice(0, 3).map((item, index) => (
            <Caption key={index} color="secondary" numberOfLines={1}>
              {item.productName}
              {index < Math.min(order.items.length, 3) - 1 ? ', ' : ''}
            </Caption>
          ))}
          {order.items.length > 3 && (
            <Caption style={styles.moreItems}>+{order.items.length - 3} more</Caption>
          )}
        </View>
        <Ionicons name="chevron-forward" size={20} color={colors.icon.tertiary} />
      </View>
    </Pressable>
  );
}

const createStyles = (colors: ReturnType<typeof useTheme>['theme']['colors']) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.surface.default,
      borderRadius: 12,
      padding: spacing.lg,
      marginBottom: spacing.md,
      borderWidth: 1,
      borderColor: colors.border.default,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: spacing.md,
    },
    date: {
      marginTop: spacing.xs,
    },
    statusBadge: {
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      borderRadius: 4,
    },
    details: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing.md,
    },
    footer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop: spacing.md,
      borderTopWidth: 1,
      borderTopColor: colors.border.subtle,
    },
    itemsPreview: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    moreItems: {
      color: colors.interactive.primary,
    },
  });
