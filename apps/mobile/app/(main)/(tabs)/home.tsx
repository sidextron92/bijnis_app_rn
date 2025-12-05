import { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { StyleSheet, Animated, ActivityIndicator, View, useColorScheme } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeHeader } from '@/features/home/components/HomeHeader';
import { StickySearchTabs } from '@/features/home/components/StickySearchTabs';
import { SDUIRenderer } from '@/features/sdui/renderer/SDUIRenderer';
import { useHomeLayout } from '@/features/home/hooks/useHomeLayout';
import { useTheme, SushiText } from 'design-system';
import { useHomeHeaderData, transformHomeHeaderData } from '@/mocks';

// Parallax scroll configuration
const TOOLBAR_CONTENT_HEIGHT = 70; // Height of toolbar content (paddingBottom:16 + content:~50 + extra padding:8)
const BANNER_HEIGHT = 80; // Min height of promotional banner

export default function HomeScreen() {
  const { layout, isLoading } = useHomeLayout();
  const { theme } = useTheme();
  const { data: headerData, isLoading: headerLoading, error: headerError } = useHomeHeaderData();
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();

  // Calculate dynamic toolbar height based on safe area
  const TOOLBAR_HEIGHT = insets.top + TOOLBAR_CONTENT_HEIGHT;
  const COLLAPSE_DISTANCE = TOOLBAR_HEIGHT + BANNER_HEIGHT;

  // Tab state and animation
  const [selectedTab, setSelectedTab] = useState<string | undefined>();
  const [displayedTab, setDisplayedTab] = useState<string | undefined>(); // Tab used for rendering background
  const indicatorPosition = useRef(new Animated.Value(0)).current;
  const indicatorWidth = useRef(new Animated.Value(0)).current;
  const tabLayouts = useRef<{ [key: string]: { x: number; width: number } }>({});

  // Background fade animation for tab switching
  const backgroundOpacity = useRef(new Animated.Value(1)).current;

  // Separate animated values for sticky header tabs (to avoid native driver conflicts)
  const stickyIndicatorPosition = useRef(new Animated.Value(0)).current;
  const stickyIndicatorWidth = useRef(new Animated.Value(0)).current;

  // Animated scroll value
  const scrollY = useRef(new Animated.Value(0)).current;

  // Initialize selected tab from header data
  useEffect(() => {
    if (headerData?.tabs?.items && headerData.tabs.items.length > 0 && !selectedTab) {
      const initialTab = headerData.tabs.selectedTabId || headerData.tabs.items[0].id;
      setSelectedTab(initialTab);
      setDisplayedTab(initialTab); // Also set displayed tab initially
    }
  }, [headerData, selectedTab]);

  // Animate indicator when selected tab changes
  useEffect(() => {
    if (selectedTab && tabLayouts.current[selectedTab]) {
      const layout = tabLayouts.current[selectedTab];

      // Animate main header indicator (in scrollable content)
      Animated.parallel([
        Animated.spring(indicatorPosition, {
          toValue: layout.x,
          useNativeDriver: false,
          friction: 8,
          tension: 40,
        }),
        Animated.spring(indicatorWidth, {
          toValue: layout.width,
          useNativeDriver: false,
          friction: 8,
          tension: 40,
        }),
      ]).start();

      // Animate sticky header indicator (overlay)
      Animated.parallel([
        Animated.spring(stickyIndicatorPosition, {
          toValue: layout.x,
          useNativeDriver: false,
          friction: 8,
          tension: 40,
        }),
        Animated.spring(stickyIndicatorWidth, {
          toValue: layout.width,
          useNativeDriver: false,
          friction: 8,
          tension: 40,
        }),
      ]).start();
    }
  }, [selectedTab, indicatorPosition, indicatorWidth, stickyIndicatorPosition, stickyIndicatorWidth]);

  // Store tab layout for animation
  const handleTabLayout = (tabId: string, event: any) => {
    const { x, width } = event.nativeEvent.layout;
    const wasFirstLayout = Object.keys(tabLayouts.current).length === 0;
    tabLayouts.current[tabId] = { x, width };

    // Initialize indicator position on first layout
    if (wasFirstLayout && tabId === selectedTab) {
      indicatorPosition.setValue(x);
      indicatorWidth.setValue(width);
      stickyIndicatorPosition.setValue(x);
      stickyIndicatorWidth.setValue(width);
    }
  };

  // Interpolations for toolbar collapse
  const toolbarHeight = scrollY.interpolate({
    inputRange: [0, TOOLBAR_HEIGHT],
    outputRange: [TOOLBAR_HEIGHT, 0],
    extrapolate: 'clamp',
  });

  const toolbarOpacity = scrollY.interpolate({
    inputRange: [0, TOOLBAR_HEIGHT / 2, TOOLBAR_HEIGHT],
    outputRange: [1, 0.5, 0],
    extrapolate: 'clamp',
  });

  // Interpolations for banner collapse
  const bannerHeight = scrollY.interpolate({
    inputRange: [TOOLBAR_HEIGHT, COLLAPSE_DISTANCE],
    outputRange: [BANNER_HEIGHT, 0],
    extrapolate: 'clamp',
  });

  const bannerOpacity = scrollY.interpolate({
    inputRange: [TOOLBAR_HEIGHT, TOOLBAR_HEIGHT + BANNER_HEIGHT / 2, COLLAPSE_DISTANCE],
    outputRange: [1, 0.5, 0],
    extrapolate: 'clamp',
  });

  // Translucent sticky header background (appears when toolbar collapses)
  const stickyHeaderOpacity = scrollY.interpolate({
    inputRange: [0, TOOLBAR_HEIGHT / 2, TOOLBAR_HEIGHT],
    outputRange: [0, 0.5, 0.97], // Gradually appear to 97% opacity (3% transparent)
    extrapolate: 'clamp',
  });

  // Original search/tabs opacity (inverse of sticky - fades OUT as sticky appears)
  const searchTabsOpacity = scrollY.interpolate({
    inputRange: [0, TOOLBAR_HEIGHT / 2, TOOLBAR_HEIGHT],
    outputRange: [1, 0.5, 0], // Gradually disappear
    extrapolate: 'clamp',
  });

  // Sticky header translateY (move off-screen when not needed)
  const stickyHeaderTranslateY = scrollY.interpolate({
    inputRange: [0, 10, TOOLBAR_HEIGHT],
    outputRange: [-300, -100, 0], // Start way off-screen, gradually slide in
    extrapolate: 'clamp',
  });

  // Sticky header background color based on theme
  const stickyHeaderBgColor = colorScheme === 'dark'
    ? 'rgba(40, 40, 40, 1)' // Dark grey for dark mode
    : 'rgba(255, 255, 255, 1)'; // White for light mode

  // Handle tab change with fade animation
  const handleTabChange = useCallback((tabId: string) => {
    if (tabId === selectedTab) return; // Don't animate if same tab

    // Fade out -> Change displayed tab -> Fade in
    Animated.timing(backgroundOpacity, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      // Change the displayed tab (which updates the background) at the midpoint
      setDisplayedTab(tabId);
      setSelectedTab(tabId);

      // Fade back in
      Animated.timing(backgroundOpacity, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();
    });

    console.log('Tab selected:', tabId);
  }, [selectedTab, backgroundOpacity]);

  // Transform API data to component props with displayed tab for dynamic backgrounds
  // NOTE: This must be called before any conditional returns to satisfy React's Rules of Hooks
  const headerProps = useMemo(() => {
    if (!headerData) return null;

    return transformHomeHeaderData(
      headerData,
      {
        onLocationPress: () => {
          console.log('Location pressed');
        },
        onTabSelect: handleTabChange,
      },
      displayedTab // Pass displayed tab for dynamic background (not selectedTab)
    );
  }, [headerData, displayedTab, handleTabChange]);

  // Handle header loading state
  if (headerLoading) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.colors.background.primary }]}
        edges={['top']}
      >
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#058234" />
        </View>
      </SafeAreaView>
    );
  }

  // Handle header error state
  if (headerError || !headerData || !headerProps) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.colors.background.primary }]}
        edges={['top']}
      >
        <View style={styles.errorContainer}>
          <SushiText variant="body" customColor="#FF0000">
            Failed to load header data
          </SushiText>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View
      style={[styles.container, { backgroundColor: '#058234' }]}
    >
      <View style={styles.container}>
        {/* Scrollable content with header inside */}
        <Animated.ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false } // Required for height/opacity animations
          )}
        >
          {/* Header with animated values for parallax and background transition */}
          <Animated.View style={{ opacity: backgroundOpacity }}>
            <HomeHeader
              {...headerProps}
              toolbarAnimatedHeight={toolbarHeight}
              toolbarAnimatedOpacity={toolbarOpacity}
              bannerAnimatedHeight={bannerHeight}
              bannerAnimatedOpacity={bannerOpacity}
              searchTabsAnimatedOpacity={searchTabsOpacity}
            />
          </Animated.View>

          {/* Main content */}
          <View style={[styles.content, { backgroundColor: theme.colors.background.secondary }]}>
            <SDUIRenderer widgets={layout?.widgets || []} isLoading={isLoading} />
          </View>
        </Animated.ScrollView>

        {/* Sticky header (search bar + tabs) with translucent background */}
        <Animated.View
          style={[
            styles.stickyHeader,
            {
              backgroundColor: stickyHeaderBgColor,
              opacity: stickyHeaderOpacity,
              transform: [{ translateY: stickyHeaderTranslateY }],
            },
          ]}
          pointerEvents="box-none"
        >
          <StickySearchTabs
            searchPlaceholders={headerProps.searchPlaceholders}
            categoryTabs={headerProps.categoryTabs}
            selectedTab={selectedTab}
            onTabSelect={handleTabChange}
            tabLayouts={tabLayouts}
            indicatorPosition={stickyIndicatorPosition}
            indicatorWidth={stickyIndicatorWidth}
            handleTabLayout={handleTabLayout}
            contentOpacity={stickyHeaderOpacity}
            colorScheme={colorScheme}
          />
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
  },
  stickyHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
});
