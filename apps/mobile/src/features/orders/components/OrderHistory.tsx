import React, { useEffect, useMemo } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchOrders,
  selectActiveOrders,
  selectPastOrders,
  selectOrdersLoading,
} from '../store/ordersSlice';
import { OrderCard } from './OrderCard';
import { H1, H3, Body, SushiButton, SushiLoader, useTheme } from 'design-system';
import { spacing } from '@/theme/spacing';

export function OrderHistory() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { theme } = useTheme();
  const colors = theme.colors;
  const styles = useMemo(() => createStyles(colors), [colors]);

  const activeOrders = useAppSelector(selectActiveOrders);
  const pastOrders = useAppSelector(selectPastOrders);
  const isLoading = useAppSelector(selectOrdersLoading);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (isLoading && activeOrders.length === 0 && pastOrders.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <SushiLoader size="large" />
      </View>
    );
  }

  const allOrders = [...activeOrders, ...pastOrders];

  if (allOrders.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <H3>No orders yet</H3>
        <Body color="secondary" style={styles.emptySubtitle}>
          Your order history will appear here
        </Body>
        <SushiButton onPress={() => router.push('/(main)/(tabs)/home')}>
          Start Shopping
        </SushiButton>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <H1>My Orders</H1>
      </View>

      <FlatList
        data={allOrders}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <OrderCard
            order={item}
            onPress={() => router.push(`/(main)/order/${item.id}`)}
          />
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          activeOrders.length > 0 ? (
            <H3 style={styles.sectionTitle}>Active Orders</H3>
          ) : null
        }
      />
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
    header: {
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: colors.border.default,
    },
    list: {
      padding: spacing.lg,
    },
    sectionTitle: {
      marginBottom: spacing.md,
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
      textAlign: 'center',
    },
  });
