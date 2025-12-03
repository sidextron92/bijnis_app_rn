import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { productsApi } from '@/features/products/services/productsApi';
import { useTheme } from 'design-system';
import { spacing } from '@/theme/spacing';

interface SearchResult {
  id: string;
  name: string;
  image: string;
  price: number;
  unit: string;
}

export function SearchContent() {
  const router = useRouter();
  const { theme } = useTheme();
  const colors = theme.colors;
  const styles = useMemo(() => createStyles(colors), [colors]);

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches] = useState<string[]>([
    'Milk',
    'Bread',
    'Eggs',
    'Rice',
    'Vegetables',
  ]);

  const handleSearch = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await productsApi.searchProducts(searchQuery);
      setResults(response.data);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleQueryChange = (text: string) => {
    setQuery(text);
    // Debounce search
    const timeoutId = setTimeout(() => handleSearch(text), 300);
    return () => clearTimeout(timeoutId);
  };

  const handleResultPress = (productId: string) => {
    router.push(`/(main)/product/${productId}`);
  };

  const handleRecentSearchPress = (search: string) => {
    setQuery(search);
    handleSearch(search);
  };

  return (
    <View style={styles.container}>
      {/* Search Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
        </Pressable>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={20} color={colors.icon.tertiary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for products..."
            placeholderTextColor={colors.text.tertiary}
            value={query}
            onChangeText={handleQueryChange}
            autoFocus
          />
          {query.length > 0 && (
            <Pressable onPress={() => setQuery('')}>
              <Ionicons name="close-circle" size={20} color={colors.icon.tertiary} />
            </Pressable>
          )}
        </View>
      </View>

      {/* Content */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.interactive.primary} />
        </View>
      ) : query.length === 0 ? (
        // Recent Searches
        <View style={styles.recentContainer}>
          <Text style={styles.sectionTitle}>Recent Searches</Text>
          {recentSearches.map((search, index) => (
            <Pressable
              key={index}
              style={styles.recentItem}
              onPress={() => handleRecentSearchPress(search)}
            >
              <Ionicons name="time-outline" size={20} color={colors.icon.tertiary} />
              <Text style={styles.recentText}>{search}</Text>
            </Pressable>
          ))}
        </View>
      ) : results.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No results found for "{query}"</Text>
        </View>
      ) : (
        // Search Results
        <FlatList
          data={results}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Pressable
              style={styles.resultItem}
              onPress={() => handleResultPress(item.id)}
            >
              <Ionicons name="search-outline" size={18} color={colors.icon.tertiary} />
              <Text style={styles.resultText} numberOfLines={1}>
                {item.name}
              </Text>
              <Ionicons name="arrow-forward" size={18} color={colors.icon.tertiary} />
            </Pressable>
          )}
          contentContainerStyle={styles.resultsList}
        />
      )}
    </View>
  );
}

const createStyles = (colors: ReturnType<typeof useTheme>['theme']['colors']) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.primary,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: colors.border.default,
    },
    backButton: {
      padding: spacing.sm,
      marginRight: spacing.sm,
    },
    searchInputContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.background.tertiary,
      borderRadius: 8,
      paddingHorizontal: spacing.md,
      height: 44,
    },
    searchInput: {
      flex: 1,
      marginLeft: spacing.sm,
      fontSize: 16,
      color: colors.text.primary,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    recentContainer: {
      padding: spacing.lg,
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text.secondary,
      marginBottom: spacing.md,
    },
    recentItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: colors.border.subtle,
    },
    recentText: {
      flex: 1,
      marginLeft: spacing.md,
      fontSize: 14,
      color: colors.text.primary,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: spacing.xl,
    },
    emptyText: {
      fontSize: 14,
      color: colors.text.secondary,
      textAlign: 'center',
    },
    resultsList: {
      padding: spacing.lg,
    },
    resultItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: colors.border.subtle,
    },
    resultText: {
      flex: 1,
      marginLeft: spacing.md,
      fontSize: 14,
      color: colors.text.primary,
    },
  });
