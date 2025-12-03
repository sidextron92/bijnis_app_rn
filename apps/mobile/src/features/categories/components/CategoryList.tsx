import React, { useMemo } from 'react';
import { View, StyleSheet, FlatList, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppSelector } from '@/store/hooks';
import { selectCategories } from '@/features/products/store/productsSlice';
import { H1, Body, Caption, useTheme } from 'design-system';
import { spacing } from '@/theme/spacing';

export function CategoryList() {
  const router = useRouter();
  const categories = useAppSelector(selectCategories);
  const { theme } = useTheme();
  const colors = theme.colors;
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <H1>Categories</H1>
      </View>

      <FlatList
        data={categories}
        numColumns={3}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable
            style={styles.item}
            onPress={() => router.push(`/(main)/(tabs)/categories?id=${item.id}`)}
          >
            <View style={styles.imageContainer}>
              <Image source={{ uri: item.image }} style={styles.image} />
            </View>
            <Caption numberOfLines={2} style={styles.name}>
              {item.name}
            </Caption>
          </Pressable>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Body color="secondary">No categories available</Body>
          </View>
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
    header: {
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: colors.border.default,
    },
    list: {
      padding: spacing.md,
    },
    item: {
      flex: 1 / 3,
      alignItems: 'center',
      padding: spacing.sm,
      marginBottom: spacing.md,
    },
    imageContainer: {
      width: 80,
      height: 80,
      borderRadius: 12,
      backgroundColor: colors.background.tertiary,
      overflow: 'hidden',
      marginBottom: spacing.sm,
    },
    image: {
      width: '100%',
      height: '100%',
    },
    name: {
      textAlign: 'center',
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: spacing['3xl'],
    },
  });
