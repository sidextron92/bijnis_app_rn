import React, { useRef, useState, useMemo } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import type { BannerCarouselProps } from '../../types';
import { useTheme } from 'design-system';
import { spacing } from '@/theme/spacing';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BANNER_WIDTH = SCREEN_WIDTH - spacing.lg * 2;
const BANNER_HEIGHT = 160;

export function BannerCarousel({ banners }: BannerCarouselProps) {
  const router = useRouter();
  const { theme } = useTheme();
  const colors = theme.colors;
  const styles = useMemo(() => createStyles(colors), [colors]);

  const scrollViewRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / BANNER_WIDTH);
    setActiveIndex(index);
  };

  const handleBannerPress = (deepLink?: string) => {
    if (deepLink) {
      // Handle deep link navigation
      router.push(deepLink as any);
    }
  };

  if (!banners || banners.length === 0) {
    return (
      <View style={[styles.container, styles.placeholder]}>
        <View style={styles.placeholderBanner} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
      >
        {banners.map((banner, index) => (
          <Pressable
            key={banner.id || index}
            onPress={() => handleBannerPress(banner.deepLink)}
          >
            <View style={styles.bannerContainer}>
              <Image
                source={{ uri: banner.image }}
                style={styles.banner}
                resizeMode="cover"
              />
            </View>
          </Pressable>
        ))}
      </ScrollView>

      {banners.length > 1 && (
        <View style={styles.pagination}>
          {banners.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === activeIndex && styles.activeDot,
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const createStyles = (colors: ReturnType<typeof useTheme>['theme']['colors']) =>
  StyleSheet.create({
    container: {
      marginVertical: spacing.md,
    },
    scrollContent: {
      paddingHorizontal: spacing.lg,
    },
    banner: {
      width: '100%',
      height: '100%',
      backgroundColor: colors.background.secondary,
    },
    placeholder: {
      paddingHorizontal: spacing.lg,
    },
    placeholderBanner: {
      width: BANNER_WIDTH,
      height: BANNER_HEIGHT,
      borderRadius: 16,
      backgroundColor: colors.background.secondary,
    },
    bannerContainer: {
      width: BANNER_WIDTH,
      height: BANNER_HEIGHT,
      marginRight: spacing.md,
      borderRadius: 16,
      overflow: 'hidden',
    },
    pagination: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: spacing.sm,
    },
    dot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: colors.border.default,
      marginHorizontal: 3,
    },
    activeDot: {
      backgroundColor: colors.interactive.primary,
      width: 18,
    },
  });
