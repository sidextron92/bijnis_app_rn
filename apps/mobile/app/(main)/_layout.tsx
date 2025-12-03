import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useAppDispatch } from '@/store/hooks';
import { fetchCategories, fetchProducts } from '@/features/products/store/productsSlice';
import { useTheme } from 'design-system';

export default function MainLayout() {
  const dispatch = useAppDispatch();
  const { theme } = useTheme();
  const colors = theme.colors;

  useEffect(() => {
    // Fetch initial data when entering main layout
    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: colors.background.primary,
        },
        headerTintColor: colors.text.primary,
        headerTitleStyle: {
          color: colors.text.primary,
        },
        contentStyle: {
          backgroundColor: colors.background.primary,
        },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="product/[id]"
        options={{
          headerShown: true,
          headerTitle: '',
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen
        name="checkout"
        options={{
          headerShown: true,
          headerTitle: 'Checkout',
        }}
      />
      <Stack.Screen
        name="order/[id]"
        options={{
          headerShown: true,
          headerTitle: 'Order Details',
        }}
      />
      <Stack.Screen
        name="search"
        options={{
          headerShown: false,
          animation: 'fade',
        }}
      />
    </Stack>
  );
}
