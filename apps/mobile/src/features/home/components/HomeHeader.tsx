import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Pressable, Image, ScrollView, ImageBackground, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SushiText, SushiAvatar, SushiViewFlipper } from 'design-system';
import { LinearGradient } from 'expo-linear-gradient';

export interface CategoryTab {
  /** Tab ID */
  id: string;
  /** Tab label */
  label: string;
  /** Tab icon (optional) */
  icon?: React.ReactNode;
  /** Tab icon URLs from API */
  iconUrls?: {
    default: string;
    pressed: string;
  };
}

export interface HomeHeaderProps {
  /** Delivery time text (e.g., "16 minutes") */
  deliveryTime: string;
  /** Location text (e.g., "AGRA - 226011") */
  location: string;
  /** Main container background color (solid color, or use backgroundGradient/backgroundImage) */
  backgroundColor?: string;
  /** Linear gradient colors for main container [startColor, endColor, ...] */
  backgroundGradient?: string[];
  /** Gradient start and end positions {x, y} from 0 to 1 */
  gradientLocations?: { start: { x: number; y: number }; end: { x: number; y: number } };
  /** Background image URI for main container */
  backgroundImageUri?: string;
  /** Custom background component (for animations, etc.) */
  backgroundComponent?: React.ReactNode;
  /** Toolbar section background color (transparent by default) */
  toolbarBackgroundColor?: string;
  /** Search bar section background color (transparent by default) */
  searchBarBackgroundColor?: string;
  /** Tab navigation section background color (transparent by default) */
  tabNavigationBackgroundColor?: string;
  /** User initials for avatar */
  userInitials?: string;
  /** User avatar image URI */
  userAvatarUri?: string;
  /** Search placeholder items to cycle through */
  searchPlaceholders?: string[];
  /** Promotional banner data */
  promotionalBanner?: {
    /** Banner background color (transparent by default, overlays main background) */
    backgroundColor?: string;
    /** Banner title */
    title?: string;
    /** Banner subtitle/date */
    subtitle?: string;
    /** Banner image URI */
    imageUri?: string;
  };
  /** Category tabs for navigation */
  categoryTabs?: CategoryTab[];
  /** Initial selected tab ID */
  initialSelectedTab?: string;
  /** Callback when location is pressed */
  onLocationPress?: () => void;
  /** Callback when avatar is pressed */
  onAvatarPress?: () => void;
  /** Callback when a tab is selected */
  onTabSelect?: (tabId: string) => void;
  /** Animated value for toolbar height (for parallax scroll) */
  toolbarAnimatedHeight?: Animated.AnimatedInterpolation<number>;
  /** Animated value for toolbar opacity (for parallax scroll) */
  toolbarAnimatedOpacity?: Animated.AnimatedInterpolation<number>;
  /** Animated value for banner height (for parallax scroll) */
  bannerAnimatedHeight?: Animated.AnimatedInterpolation<number>;
  /** Animated value for banner opacity (for parallax scroll) */
  bannerAnimatedOpacity?: Animated.AnimatedInterpolation<number>;
  /** Animated value for search bar and tabs opacity (hide when sticky version appears) */
  searchTabsAnimatedOpacity?: Animated.AnimatedInterpolation<number>;
}

const DEFAULT_SEARCH_PLACEHOLDERS = [
  'Search "ice-cream"',
  'Search "vegetables"',
  'Search "snacks"',
];

/**
 * HomeHeader Component
 *
 * Renders the top section of the Blinkit home screen including:
 * - Delivery info toolbar (time, location, avatar)
 * - Search bar with animated placeholders
 * - Promotional banner
 */
export function HomeHeader({
  deliveryTime,
  location,
  backgroundColor = '#058234',
  backgroundGradient,
  gradientLocations,
  backgroundImageUri,
  backgroundComponent,
  toolbarBackgroundColor = 'transparent',
  searchBarBackgroundColor = 'transparent',
  tabNavigationBackgroundColor = 'transparent',
  userInitials,
  userAvatarUri,
  searchPlaceholders = DEFAULT_SEARCH_PLACEHOLDERS,
  promotionalBanner,
  categoryTabs,
  initialSelectedTab,
  onLocationPress,
  onAvatarPress,
  onTabSelect,
  toolbarAnimatedHeight,
  toolbarAnimatedOpacity,
  bannerAnimatedHeight,
  bannerAnimatedOpacity,
  searchTabsAnimatedOpacity,
}: HomeHeaderProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selectedTab, setSelectedTab] = useState<string | undefined>(
    initialSelectedTab || categoryTabs?.[0]?.id
  );

  // Animation values for sliding indicator
  const indicatorPosition = useRef(new Animated.Value(0)).current;
  const indicatorWidth = useRef(new Animated.Value(0)).current;
  const tabLayouts = useRef<{ [key: string]: { x: number; width: number } }>({});

  // Animate indicator when selected tab changes
  useEffect(() => {
    if (selectedTab && tabLayouts.current[selectedTab]) {
      const layout = tabLayouts.current[selectedTab];

      Animated.parallel([
        Animated.spring(indicatorPosition, {
          toValue: layout.x,
          useNativeDriver: false, // must match indicatorWidth driver setting
          friction: 8,
          tension: 40,
        }),
        Animated.spring(indicatorWidth, {
          toValue: layout.width,
          useNativeDriver: false, // width doesn't support native driver
          friction: 8,
          tension: 40,
        }),
      ]).start();
    }
  }, [selectedTab]);

  const handleSearchPress = () => {
    router.push('/(main)/search');
  };

  const handleAvatarPress = () => {
    if (onAvatarPress) {
      onAvatarPress();
    } else {
      router.push('/(main)/(tabs)/account');
    }
  };

  const handleTabPress = (tabId: string) => {
    setSelectedTab(tabId);
    onTabSelect?.(tabId);
  };

  // Store tab layout for animation
  const handleTabLayout = (tabId: string, event: any) => {
    const { x, width } = event.nativeEvent.layout;
    const wasFirstLayout = Object.keys(tabLayouts.current).length === 0;
    tabLayouts.current[tabId] = { x, width };

    // Initialize indicator position on first layout
    if (wasFirstLayout && tabId === selectedTab) {
      indicatorPosition.setValue(x);
      indicatorWidth.setValue(width);
    }
  };

  // Render the background wrapper based on the type
  const renderBackgroundWrapper = (children: React.ReactNode) => {
    // Custom background component (for animations, Lottie, etc.)
    if (backgroundComponent) {
      return (
        <View style={styles.mainContainer}>
          {backgroundComponent}
          <View style={styles.contentOverlay}>
            {children}
          </View>
        </View>
      );
    }

    // Background image
    if (backgroundImageUri) {
      return (
        <ImageBackground
          source={{ uri: backgroundImageUri }}
          style={styles.mainContainer}
          resizeMode="cover"
        >
          {children}
        </ImageBackground>
      );
    }

    // Linear gradient
    if (backgroundGradient && backgroundGradient.length >= 2) {
      const startPos = gradientLocations?.start || { x: 0, y: 0 };
      const endPos = gradientLocations?.end || { x: 0, y: 1 };

      return (
        <LinearGradient
          colors={backgroundGradient as [string, string, ...string[]]}
          start={startPos}
          end={endPos}
          style={styles.mainContainer}
        >
          {children}
        </LinearGradient>
      );
    }

    // Solid color (default)
    return (
      <View style={[styles.mainContainer, { backgroundColor }]}>
        {children}
      </View>
    );
  };

  return renderBackgroundWrapper(
    <View style={styles.container}>
      {/* Top Toolbar Section */}
      <Animated.View
        style={[
          styles.toolbar,
          { backgroundColor: toolbarBackgroundColor, paddingTop: insets.top + 8 },
          toolbarAnimatedHeight && { height: toolbarAnimatedHeight },
          toolbarAnimatedOpacity && { opacity: toolbarAnimatedOpacity },
        ]}
      >
        <View style={styles.deliverySection}>
          {/* Delivery Time */}
          <View style={styles.deliveryInfo}>
            <SushiText
              variant="caption"
              customColor="#FFFFFF"
              style={styles.deliveryLabel}
            >
              Delivery in
            </SushiText>
            <SushiText
              variant="h3"
              customColor="#FFFFFF"
              style={styles.deliveryTime}
            >
              {deliveryTime}
            </SushiText>
          </View>

          {/* Location */}
          <Pressable
            style={styles.locationContainer}
            onPress={onLocationPress}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <SushiText
              variant="caption"
              customColor="#FFFFFF"
              style={styles.locationText}
            >
              {location}
            </SushiText>
            <Ionicons name="chevron-down" size={12} color="#FFFFFF" />
          </Pressable>
        </View>

        {/* User Avatar */}
        <Pressable onPress={handleAvatarPress} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <SushiAvatar
            name={userInitials}
            uri={userAvatarUri}
            size={32}
            shape="circle"
            bordered
            borderColor="#FFFFFF"
          />
        </Pressable>
      </Animated.View>

      {/* Search Bar */}
      <Animated.View
        style={[
          styles.searchBarContainer,
          { backgroundColor: searchBarBackgroundColor },
          searchTabsAnimatedOpacity && { opacity: searchTabsAnimatedOpacity },
        ]}
      >
        <Pressable
          style={styles.searchBar}
          onPress={handleSearchPress}
        >
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
      </Animated.View>

      {/* Category Tab Navigation */}
      {categoryTabs && categoryTabs.length > 0 && (
        <Animated.View
          style={[
            styles.tabNavigationContainer,
            { backgroundColor: tabNavigationBackgroundColor },
            searchTabsAnimatedOpacity && { opacity: searchTabsAnimatedOpacity },
          ]}
        >
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
                  const iconUri = isSelected ? tab.iconUrls.pressed : tab.iconUrls.default;
                  return (
                    <Image
                      source={{ uri: iconUri }}
                      style={styles.tabIconImage}
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
                    customColor={isSelected ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)'}
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
                },
              ]}
            />
          </ScrollView>
          {/* Separator line right under the tab indicators */}
          <View style={styles.tabSeparator} />
        </Animated.View>
      )}

      {/* Promotional Banner */}
      {promotionalBanner && (
        <Animated.View
          style={[
            styles.promotionalBanner,
            { backgroundColor: promotionalBanner.backgroundColor || 'transparent' },
            bannerAnimatedHeight && { height: bannerAnimatedHeight },
            bannerAnimatedOpacity && { opacity: bannerAnimatedOpacity },
          ]}
        >
          <View style={styles.bannerContent}>
            {promotionalBanner.title && (
              <SushiText
                variant="h2"
                customColor="#FFFFFF"
                style={styles.bannerTitle}
              >
                {promotionalBanner.title}
              </SushiText>
            )}
            {promotionalBanner.subtitle && (
              <SushiText
                variant="caption"
                customColor="#FFFFFF"
                style={styles.bannerSubtitle}
              >
                {promotionalBanner.subtitle}
              </SushiText>
            )}
          </View>
          {promotionalBanner.imageUri && (
            <Image
              source={{ uri: promotionalBanner.imageUri }}
              style={styles.bannerImage}
              resizeMode="contain"
            />
          )}
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
  },
  contentOverlay: {
    width: '100%',
  },
  container: {
    width: '100%',
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  deliverySection: {
    flex: 1,
  },
  deliveryInfo: {
    marginBottom: 0,
  },
  deliveryLabel: {
    fontSize: 12,
    lineHeight: 12,
    marginBottom: 0,
  },
  deliveryTime: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 25,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom:0,
    marginTop:6
  },
  locationText: {
    fontSize: 14,
    lineHeight: 18
  },
  searchBarContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
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
    borderColor: '#C5C5C5',
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
  promotionalBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    minHeight: 80,
  },
  bannerContent: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
    marginBottom: 4,
  },
  bannerSubtitle: {
    fontSize: 11,
    lineHeight: 16,
    opacity: 0.9,
  },
  bannerImage: {
    width: 120,
    height: 60,
    marginLeft: 16,
  },
  tabNavigationContainer: {
    position: 'relative',
  },
  tabScrollContent: {
    paddingTop: 12,
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
    width: 28.8,  // 40% reduction from 48px
    height: 28.8,
    marginBottom: 4,
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
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  tabSeparator: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    width: '100%',
  },
});
