/**
 * Example: HomeScreen with Mock API Integration
 *
 * This file demonstrates how to integrate the mock Home Header API
 * with the HomeHeader component.
 *
 * Copy this pattern to your actual home screen implementation.
 */

import React from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HomeHeader } from '@/features/home/components/HomeHeader';
import { useHomeHeaderData, transformHomeHeaderData } from '@/mocks';
import { SushiText } from 'design-system';

/**
 * Example 1: Basic Usage with Default Mock Data
 */
export function HomeScreenBasic() {
  const { data, isLoading, error, refetch } = useHomeHeaderData();

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#058234" />
        <SushiText variant="body" style={styles.loadingText}>
          Loading...
        </SushiText>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <SushiText variant="h3" color="error">
          Error Loading Data
        </SushiText>
        <SushiText variant="body" color="secondary" style={styles.errorText}>
          {error.message}
        </SushiText>
        <View style={styles.retryButton}>
          <SushiText variant="body" color="brand" onPress={refetch}>
            Retry
          </SushiText>
        </View>
      </View>
    );
  }

  if (!data) return null;

  // Transform API data to component props
  const headerProps = transformHomeHeaderData(data, {
    onLocationPress: () => {
      console.log('Location pressed - open location picker');
    },
    onAvatarPress: () => {
      console.log('Avatar pressed - navigate to profile');
    },
    onTabSelect: (tabId) => {
      console.log('Tab selected:', tabId);
      // Filter content based on selected tab
    },
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <HomeHeader {...headerProps} />
      <ScrollView style={styles.content}>
        <SushiText variant="body">Your content here...</SushiText>
      </ScrollView>
    </SafeAreaView>
  );
}

/**
 * Example 2: Using Specific Mock Scenario
 */
export function HomeScreenWithScenario() {
  const { data, isLoading } = useHomeHeaderData({
    scenario: 'userWithAvatar', // Use specific mock scenario
  });

  if (isLoading || !data) return <ActivityIndicator />;

  const headerProps = transformHomeHeaderData(data);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <HomeHeader {...headerProps} />
    </SafeAreaView>
  );
}

/**
 * Example 3: With Auto-Refresh
 */
export function HomeScreenWithRefresh() {
  const { data, isLoading } = useHomeHeaderData({
    autoRefresh: true,
    refreshInterval: 60000, // Refresh every minute
  });

  if (isLoading || !data) return <ActivityIndicator />;

  const headerProps = transformHomeHeaderData(data);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <HomeHeader {...headerProps} />
    </SafeAreaView>
  );
}

/**
 * Example 4: With User Personalization
 */
export function HomeScreenPersonalized() {
  // In real app, get userId and location from auth/location services
  const userId = 'user123';
  const userLocation = { lat: 28.6139, lng: 77.2090 }; // Delhi coordinates

  const { data, isLoading } = useHomeHeaderData({
    userId,
    location: userLocation,
  });

  if (isLoading || !data) return <ActivityIndicator />;

  const headerProps = transformHomeHeaderData(data);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <HomeHeader {...headerProps} />
    </SafeAreaView>
  );
}

/**
 * Example 5: With Custom Handlers and Navigation
 */
export function HomeScreenWithNavigation() {
  const { data, isLoading } = useHomeHeaderData();

  const handleLocationPress = () => {
    // Navigate to location picker
    // navigation.navigate('LocationPicker');
    console.log('Opening location picker...');
  };

  const handleAvatarPress = () => {
    // Navigate to profile
    // navigation.navigate('Profile');
    console.log('Navigating to profile...');
  };

  const handleTabSelect = (tabId: string) => {
    // Filter products/content based on selected category
    console.log('Filtering by category:', tabId);
    // fetchProductsByCategory(tabId);
  };

  const handleBannerClick = (bannerId: string, target: any) => {
    // Handle banner click navigation
    console.log('Banner clicked:', bannerId, target);
    // navigateToTarget(target);
  };

  if (isLoading || !data) return <ActivityIndicator />;

  const headerProps = transformHomeHeaderData(data, {
    onLocationPress: handleLocationPress,
    onAvatarPress: handleAvatarPress,
    onTabSelect: handleTabSelect,
    onBannerClick: handleBannerClick,
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <HomeHeader {...headerProps} />
      <ScrollView style={styles.content}>
        {/* Your content filtered by selected tab */}
      </ScrollView>
    </SafeAreaView>
  );
}

/**
 * Example 6: Direct API Usage (without hook)
 */
export function HomeScreenDirectApi() {
  const [data, setData] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Direct API call
    import('@/mocks').then(({ fetchHomeHeader }) => {
      fetchHomeHeader().then((response) => {
        setData(response);
        setIsLoading(false);
      });
    });
  }, []);

  if (isLoading || !data) return <ActivityIndicator />;

  const headerProps = transformHomeHeaderData(data);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <HomeHeader {...headerProps} />
    </SafeAreaView>
  );
}

/**
 * Example 7: Testing Different Scenarios
 */
export function HomeScreenTestScenarios() {
  const [scenario, setScenario] = React.useState<
    'default' | 'solidBackground' | 'longDelivery' | 'noBanners' | 'userWithAvatar'
  >('default');

  const { data, isLoading } = useHomeHeaderData({
    scenario: scenario === 'default' ? undefined : scenario,
  });

  if (isLoading || !data) return <ActivityIndicator />;

  const headerProps = transformHomeHeaderData(data);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <HomeHeader {...headerProps} />

      {/* Scenario switcher for testing */}
      <View style={styles.scenarioSwitcher}>
        <SushiText variant="caption">Test Scenarios:</SushiText>
        <View style={styles.scenarioButtons}>
          <SushiText onPress={() => setScenario('default')}>Default</SushiText>
          <SushiText onPress={() => setScenario('solidBackground')}>Solid BG</SushiText>
          <SushiText onPress={() => setScenario('longDelivery')}>Long Delivery</SushiText>
          <SushiText onPress={() => setScenario('noBanners')}>No Banners</SushiText>
          <SushiText onPress={() => setScenario('userWithAvatar')}>With Avatar</SushiText>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  loadingText: {
    marginTop: 16,
  },
  errorText: {
    marginTop: 8,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  scenarioSwitcher: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  scenarioButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 8,
  },
});
