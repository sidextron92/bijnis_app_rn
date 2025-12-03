import React, { useMemo } from 'react';
import { View, StyleSheet, Image, Pressable, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import type { CategoryGridProps } from '../../types';
import { Caption, useTheme } from 'design-system';
import { spacing } from '@/theme/spacing';

export function CategoryGrid({ categories, columns = 4 }: CategoryGridProps) {
  const router = useRouter();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme.colors), [theme.colors]);

  const handleCategoryPress = (categoryId: string) => {
    router.push(`/(main)/(tabs)/categories?id=${categoryId}`);
  };

  if (!categories || categories.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.placeholder}>
          {[...Array(8)].map((_, i) => (
            <View key={i} style={styles.placeholderItem}>
              <View style={styles.placeholderImage} />
              <View style={styles.placeholderText} />
            </View>
          ))}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        numColumns={columns}
        scrollEnabled={false}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => (
          <Pressable
            style={[styles.item, { width: `${100 / columns}%` }]}
            onPress={() => handleCategoryPress(item.id)}
          >
            <View style={styles.imageContainer}>
              <Image source={{ uri: item.image }} style={styles.image} />
            </View>
            <Caption numberOfLines={2} style={styles.name}>
              {item.name}
            </Caption>
          </Pressable>
        )}
      />
    </View>
  );
}

const createStyles = (colors: ReturnType<typeof useTheme>['theme']['colors']) =>
  StyleSheet.create({
    container: {
      paddingVertical: spacing.md,
      backgroundColor: colors.background.primary,
    },
    grid: {
      paddingHorizontal: spacing.sm,
    },
    item: {
      alignItems: 'center',
      padding: spacing.sm,
    },
    imageContainer: {
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: colors.background.tertiary,
      overflow: 'hidden',
      marginBottom: spacing.xs,
    },
    image: {
      width: '100%',
      height: '100%',
    },
    name: {
      textAlign: 'center',
      lineHeight: 14,
    },
    placeholder: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingHorizontal: spacing.sm,
    },
    placeholderItem: {
      width: '25%',
      alignItems: 'center',
      padding: spacing.sm,
    },
    placeholderImage: {
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: colors.background.secondary,
      marginBottom: spacing.xs,
    },
    placeholderText: {
      width: 50,
      height: 12,
      backgroundColor: colors.background.secondary,
      borderRadius: 4,
    },
  });
