/**
 * SushiVerticalPager - Vertical Pager Component
 *
 * A theme-aware vertical pager/carousel component that enables
 * vertical swiping through paginated content.
 *
 * @platform android
 * @platform ios
 * @platform web
 */

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
  ReactNode,
} from 'react';
import {
  View,
  StyleSheet,
  Animated,
  PanResponder,
  ViewStyle,
  Dimensions,
  LayoutChangeEvent,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { spacing } from '../../tokens/dimensions';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

/**
 * Page size strategy
 */
export type PageSize = 'fill' | 'match_parent' | { fixed: number };

/**
 * Snap position after scrolling
 */
export type SnapPosition = 'start' | 'center' | 'end';

/**
 * Horizontal alignment of pages
 */
export type HorizontalAlignment = 'start' | 'center' | 'end';

/**
 * Pager state
 */
export interface PagerState {
  currentPage: number;
  pageCount: number;
  isScrolling: boolean;
  offset: number;
}

/**
 * Pager ref methods
 */
export interface SushiVerticalPagerRef {
  scrollToPage: (page: number, animated?: boolean) => void;
  animateScrollToPage: (page: number) => Promise<void>;
  getCurrentPage: () => number;
}

/**
 * Props for SushiVerticalPager
 */
export interface SushiVerticalPagerProps {
  /** Number of pages */
  pageCount: number;
  /** Initial page index */
  initialPage?: number;
  /** Content padding */
  contentPadding?: { top?: number; bottom?: number };
  /** Page sizing strategy */
  pageSize?: PageSize;
  /** Number of pages to keep rendered outside viewport */
  beyondViewportPageCount?: number;
  /** Spacing between pages */
  pageSpacing?: number;
  /** Enable/disable user scroll */
  userScrollEnabled?: boolean;
  /** Reverse the layout order */
  reverseLayout?: boolean;
  /** Snap position after scroll ends */
  snapPosition?: SnapPosition;
  /** Horizontal alignment of pages */
  horizontalAlignment?: HorizontalAlignment;
  /** Callback when page changes */
  onPageChange?: (page: number) => void;
  /** Callback during scroll */
  onScroll?: (offset: number) => void;
  /** Custom container style */
  style?: ViewStyle;
  /** Render function for each page */
  renderPage: (index: number) => ReactNode;
}

/**
 * SushiVerticalPager Component
 *
 * @example
 * ```tsx
 * const [currentPage, setCurrentPage] = useState(0);
 *
 * <SushiVerticalPager
 *   pageCount={5}
 *   onPageChange={setCurrentPage}
 *   renderPage={(index) => (
 *     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
 *       <Text>Page {index + 1}</Text>
 *     </View>
 *   )}
 * />
 *
 * // With programmatic navigation
 * const pagerRef = useRef<SushiVerticalPagerRef>(null);
 *
 * <SushiVerticalPager
 *   ref={pagerRef}
 *   pageCount={3}
 *   renderPage={(index) => <PageContent index={index} />}
 * />
 *
 * // Navigate programmatically
 * <Button title="Next" onPress={() => pagerRef.current?.animateScrollToPage(1)} />
 * ```
 */
export const SushiVerticalPager = forwardRef<SushiVerticalPagerRef, SushiVerticalPagerProps>(
  (
    {
      pageCount,
      initialPage = 0,
      contentPadding = {},
      pageSize = 'fill',
      beyondViewportPageCount = 1,
      pageSpacing = 0,
      userScrollEnabled = true,
      reverseLayout = false,
      snapPosition = 'start',
      horizontalAlignment = 'center',
      onPageChange,
      onScroll,
      style,
      renderPage,
    },
    ref
  ) => {
    const [containerHeight, setContainerHeight] = useState(SCREEN_HEIGHT);
    const [currentPage, setCurrentPage] = useState(initialPage);
    const scrollY = useRef(new Animated.Value(-initialPage * containerHeight)).current;
    const currentPageRef = useRef(initialPage);

    // Calculate page height based on pageSize prop
    const getPageHeight = useCallback(() => {
      if (pageSize === 'fill' || pageSize === 'match_parent') {
        return containerHeight - (contentPadding.top || 0) - (contentPadding.bottom || 0);
      }
      if (typeof pageSize === 'object' && 'fixed' in pageSize) {
        return pageSize.fixed;
      }
      return containerHeight;
    }, [containerHeight, pageSize, contentPadding]);

    const pageHeight = getPageHeight();

    // Scroll to specific page
    const scrollToPage = useCallback(
      (page: number, animated = true) => {
        const validPage = Math.max(0, Math.min(page, pageCount - 1));
        const targetY = -validPage * (pageHeight + pageSpacing);

        if (animated) {
          Animated.spring(scrollY, {
            toValue: targetY,
            friction: 8,
            tension: 40,
            useNativeDriver: true,
          }).start(() => {
            setCurrentPage(validPage);
            currentPageRef.current = validPage;
            onPageChange?.(validPage);
          });
        } else {
          scrollY.setValue(targetY);
          setCurrentPage(validPage);
          currentPageRef.current = validPage;
          onPageChange?.(validPage);
        }
      },
      [pageCount, pageHeight, pageSpacing, scrollY, onPageChange]
    );

    // Animated scroll to page (returns promise)
    const animateScrollToPage = useCallback(
      (page: number): Promise<void> => {
        return new Promise((resolve) => {
          const validPage = Math.max(0, Math.min(page, pageCount - 1));
          const targetY = -validPage * (pageHeight + pageSpacing);

          Animated.spring(scrollY, {
            toValue: targetY,
            friction: 8,
            tension: 40,
            useNativeDriver: true,
          }).start(({ finished }) => {
            if (finished) {
              setCurrentPage(validPage);
              currentPageRef.current = validPage;
              onPageChange?.(validPage);
            }
            resolve();
          });
        });
      },
      [pageCount, pageHeight, pageSpacing, scrollY, onPageChange]
    );

    // Expose ref methods
    useImperativeHandle(
      ref,
      () => ({
        scrollToPage,
        animateScrollToPage,
        getCurrentPage: () => currentPageRef.current,
      }),
      [scrollToPage, animateScrollToPage]
    );

    // Pan responder for gesture handling
    const panResponder = useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => userScrollEnabled,
        onMoveShouldSetPanResponder: (_, gestureState) => {
          return userScrollEnabled && Math.abs(gestureState.dy) > 10;
        },
        onPanResponderGrant: () => {
          scrollY.stopAnimation();
        },
        onPanResponderMove: (_, gestureState) => {
          const currentY = -currentPageRef.current * (pageHeight + pageSpacing);
          const newY = currentY + gestureState.dy;
          scrollY.setValue(newY);
          onScroll?.(newY);
        },
        onPanResponderRelease: (_, gestureState) => {
          const velocity = gestureState.vy;
          const threshold = pageHeight / 4;
          let targetPage = currentPageRef.current;

          if (Math.abs(gestureState.dy) > threshold || Math.abs(velocity) > 0.5) {
            if (gestureState.dy > 0 || velocity > 0.5) {
              targetPage = Math.max(0, currentPageRef.current - 1);
            } else if (gestureState.dy < 0 || velocity < -0.5) {
              targetPage = Math.min(pageCount - 1, currentPageRef.current + 1);
            }
          }

          scrollToPage(targetPage);
        },
      })
    ).current;

    // Handle container layout
    const handleLayout = (event: LayoutChangeEvent) => {
      setContainerHeight(event.nativeEvent.layout.height);
    };

    // Get pages to render (including beyond viewport)
    const getPagesToRender = () => {
      const pages: number[] = [];
      const start = Math.max(0, currentPage - beyondViewportPageCount);
      const end = Math.min(pageCount - 1, currentPage + beyondViewportPageCount);

      for (let i = start; i <= end; i++) {
        pages.push(reverseLayout ? pageCount - 1 - i : i);
      }

      return pages;
    };

    // Get horizontal alignment style
    const getHorizontalAlignmentStyle = (): ViewStyle => {
      switch (horizontalAlignment) {
        case 'start':
          return { alignItems: 'flex-start' };
        case 'end':
          return { alignItems: 'flex-end' };
        case 'center':
        default:
          return { alignItems: 'center' };
      }
    };

    const pagesToRender = getPagesToRender();

    return (
      <View style={[styles.container, style]} onLayout={handleLayout}>
        <Animated.View
          style={[
            styles.pagesContainer,
            {
              paddingTop: contentPadding.top || 0,
              paddingBottom: contentPadding.bottom || 0,
              transform: [{ translateY: scrollY }],
            },
          ]}
          {...panResponder.panHandlers}
        >
          {Array.from({ length: pageCount }).map((_, index) => {
            const pageIndex = reverseLayout ? pageCount - 1 - index : index;
            const shouldRender = pagesToRender.includes(pageIndex);

            return (
              <View
                key={pageIndex}
                style={[
                  styles.page,
                  {
                    height: pageHeight,
                    marginBottom: index < pageCount - 1 ? pageSpacing : 0,
                  },
                  getHorizontalAlignmentStyle(),
                ]}
              >
                {shouldRender ? renderPage(pageIndex) : null}
              </View>
            );
          })}
        </Animated.View>
      </View>
    );
  }
);

/**
 * Hook to create pager state
 */
export const usePagerState = (initialPage = 0, pageCount = 0): PagerState => {
  const [state, setState] = useState<PagerState>({
    currentPage: initialPage,
    pageCount,
    isScrolling: false,
    offset: 0,
  });

  return state;
};

/**
 * Hook to remember pager state
 */
export const useRememberPagerState = (pageCount: number, initialPage = 0) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const pagerRef = useRef<SushiVerticalPagerRef>(null);

  const scrollToPage = useCallback(
    (page: number, animated = true) => {
      pagerRef.current?.scrollToPage(page, animated);
    },
    []
  );

  const animateScrollToPage = useCallback((page: number) => {
    return pagerRef.current?.animateScrollToPage(page) || Promise.resolve();
  }, []);

  return {
    pagerRef,
    currentPage,
    pageCount,
    setCurrentPage,
    scrollToPage,
    animateScrollToPage,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  pagesContainer: {
    flex: 1,
  },
  page: {
    width: '100%',
    justifyContent: 'center',
  },
});

SushiVerticalPager.displayName = 'SushiVerticalPager';

// Aliases for backward compatibility
export const VerticalPager = SushiVerticalPager;
