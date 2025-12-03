import React from 'react';
import { View, StyleSheet, Pressable, Image, ScrollView, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SushiText, SushiViewFlipper } from 'design-system';
import { CategoryTab } from './HomeHeader';

interface StickySearchTabsProps {
  /** Search placeholder items to cycle through */
  searchPlaceholders?: string[];
  /** Category tabs for navigation */
  categoryTabs?: CategoryTab[];
  /** Selected tab ID */
  selectedTab?: string;
  /** Callback when a tab is selected */
  onTabSelect?: (tabId: string) => void;
  /** Tab layouts for animation */
  tabLayouts?: React.MutableRefObject<{ [key: string]: { x: number; width: number } }>;
  /** Indicator position animated value */
  indicatorPosition: Animated.Value;
  /** Indicator width animated value */
  indicatorWidth: Animated.Value;
  /** Handler for tab layout */
  handleTabLayout: (tabId: string, event: any) => void;
  /** Content opacity (for showing/hiding) */
  contentOpacity?: Animated.AnimatedInterpolation<number>;
  /** Color scheme for theme-aware colors */
  colorScheme?: 'light' | 'dark' | null;
}

export function StickySearchTabs({
  searchPlaceholders = [],
  categoryTabs = [],
  selectedTab,
  onTabSelect,
  indicatorPosition,
  indicatorWidth,
  handleTabLayout,
  contentOpacity,
  colorScheme = 'light',
}: StickySearchTabsProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleSearchPress = () => {
    router.push('/(main)/search');
  };

  const handleTabPress = (tabId: string) => {
    onTabSelect?.(tabId);
  };

  return (
    <Animated.View style={[styles.container, contentOpacity && { opacity: contentOpacity }]}>
      {/* Search Bar */}
      <View style={[styles.searchBarContainer, { paddingTop: insets.top + 12 }]}>
        <Pressable style={styles.searchBar} onPress={handleSearchPress}>
          <Ionicons name="search" size={16} color="#9C9C9C" />
          <View style={styles.searchPlaceholderContainer}>
            <SushiViewFlipper
              count={searchPlaceholders.length}
              flipInterval={3000}
              animationDuration={600}
              renderItem={(index) => (
                <SushiText
                  variant="body"
                  customColor="#9C9C9C"
                  style={styles.searchPlaceholder}
                >
                  {searchPlaceholders[index]}
                </SushiText>
              )}
            />
          </View>
          <View style={styles.searchDivider} />
          <Ionicons name="mic" size={16} color="#9C9C9C" />
        </Pressable>
      </View>

      {/* Category Tab Navigation */}
      {categoryTabs && categoryTabs.length > 0 && (
        <View style={styles.tabNavigationContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabScrollContent}
          >
            {categoryTabs.map((tab, index) => {
              const isSelected = selectedTab === tab.id;
              const isFirst = index === 0;

              // Render icon from URL or custom component
              const renderIcon = () => {
                if (tab.iconUrls) {
                  // Always use pressed icon for sticky header to ensure visibility on white bg
                  const iconUri = tab.iconUrls.pressed;
                  return (
                    <Image
                      source={{ uri: iconUri }}
                      style={[
                        styles.tabIconImage,
                        !isSelected && styles.tabIconUnselected
                      ]}
                      resizeMode="contain"
                    />
                  );
                }
                if (tab.icon) {
                  return <View style={styles.tabIcon}>{tab.icon}</View>;
                }
                return null;
              };

              return (
                <Pressable
                  key={tab.id}
                  onPress={() => handleTabPress(tab.id)}
                  onLayout={(event) => handleTabLayout(tab.id, event)}
                  style={[
                    styles.tabItem,
                    isFirst && styles.tabItemFirst,
                  ]}
                >
                  {renderIcon()}
                  <SushiText
                    variant="body"
                    customColor={
                      isSelected
                        ? '#058234'
                        : (colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)')
                    }
                    style={{
                      ...styles.tabLabel,
                      ...(isSelected && styles.tabLabelSelected),
                    }}
                  >
                    {tab.label}
                  </SushiText>
                </Pressable>
              );
            })}

            {/* Animated sliding indicator */}
            <Animated.View
              style={[
                styles.tabIndicatorAnimated,
                {
                  width: indicatorWidth,
                  transform: [{ translateX: indicatorPosition }],
                  backgroundColor: '#058234',
                },
              ]}
            />
          </ScrollView>
          {/* Separator line right under the tab indicators */}
          <View style={styles.tabSeparator} />
        </View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  searchBarContainer: {
    paddingHorizontal: 16,
    paddingBottom: 0,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#058234',
    gap: 8,
  },
  searchPlaceholderContainer: {
    flex: 1,
    height: 20,
  },
  searchPlaceholder: {
    fontSize: 12,
    lineHeight: 18,
  },
  searchDivider: {
    width: 1,
    height: 20,
    backgroundColor: '#E0E0E0',
  },
  tabNavigationContainer: {
    position: 'relative',
  },
  tabScrollContent: {
    paddingTop: 8,
    paddingBottom: 0,
    gap: 24,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  tabItemFirst: {
    marginLeft: 16,
  },
  tabIcon: {
    marginBottom: 4,
  },
  tabIconImage: {
    width: 24,
    height: 24,
    marginBottom: 4,
  },
  tabIconUnselected: {
    opacity: 0.5,
  },
  tabLabel: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '500',
  },
  tabLabelSelected: {
    fontWeight: '700',
  },
  tabIndicatorAnimated: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 3,
    backgroundColor: '#058234',
    borderRadius: 2,
  },
  tabSeparator: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    width: '100%',
  },
});
