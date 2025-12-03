import React, { useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, StyleSheet } from 'react-native';
import {
  SushiVerticalPager,
  SushiVerticalPagerRef,
  useRememberPagerState,
} from './SushiVerticalPager';
import { SushiButton } from '../Button/SushiButton';
import { SushiText } from '../Text/SushiText';
import { ThemeProvider } from '../../theme';

const meta: Meta<typeof SushiVerticalPager> = {
  title: 'Sushi/Atoms/VerticalPager',
  component: SushiVerticalPager,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SushiVerticalPager>;

const colors = ['#6366f1', '#ec4899', '#22c55e', '#f59e0b', '#3b82f6'];

const BasicExample = () => {
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <View style={styles.container}>
      <SushiText variant="caption" style={styles.pageIndicator}>
        Page {currentPage + 1} of 5
      </SushiText>
      <View style={styles.pagerContainer}>
        <SushiVerticalPager
          pageCount={5}
          onPageChange={setCurrentPage}
          pageSpacing={8}
          renderPage={(index) => (
            <View style={[styles.page, { backgroundColor: colors[index] }]}>
              <SushiText variant="h2" style={styles.pageText}>
                Page {index + 1}
              </SushiText>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export const Basic: Story = {
  render: () => <BasicExample />,
};

const WithControlsExample = () => {
  const pagerRef = useRef<SushiVerticalPagerRef>(null);
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.controls}>
        <SushiButton
          title="Previous"
          variant="outline"
          size="sm"
          disabled={currentPage === 0}
          onPress={() => pagerRef.current?.scrollToPage(currentPage - 1)}
        />
        <SushiText variant="body" style={styles.pageLabel}>
          {currentPage + 1} / 5
        </SushiText>
        <SushiButton
          title="Next"
          variant="outline"
          size="sm"
          disabled={currentPage === 4}
          onPress={() => pagerRef.current?.scrollToPage(currentPage + 1)}
        />
      </View>
      <View style={styles.pagerContainer}>
        <SushiVerticalPager
          ref={pagerRef}
          pageCount={5}
          onPageChange={setCurrentPage}
          renderPage={(index) => (
            <View style={[styles.page, { backgroundColor: colors[index] }]}>
              <SushiText variant="h2" style={styles.pageText}>
                Page {index + 1}
              </SushiText>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export const WithControls: Story = {
  render: () => <WithControlsExample />,
};

const CardCarouselExample = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const cards = [
    { title: 'Welcome', subtitle: 'Swipe up to continue' },
    { title: 'Features', subtitle: 'Discover amazing features' },
    { title: 'Get Started', subtitle: 'Begin your journey' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.pagerContainer}>
        <SushiVerticalPager
          pageCount={cards.length}
          onPageChange={setCurrentPage}
          pageSpacing={16}
          contentPadding={{ top: 20, bottom: 20 }}
          renderPage={(index) => (
            <View style={styles.card}>
              <SushiText variant="h3">{cards[index].title}</SushiText>
              <SushiText variant="body" style={styles.subtitle}>
                {cards[index].subtitle}
              </SushiText>
            </View>
          )}
        />
      </View>
      <View style={styles.dots}>
        {cards.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentPage === index && styles.activeDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export const CardCarousel: Story = {
  render: () => <CardCarouselExample />,
};

const WithHookExample = () => {
  const pager = useRememberPagerState(4);

  return (
    <View style={styles.container}>
      <View style={styles.controls}>
        <SushiButton
          title="Go to 1"
          size="sm"
          variant={pager.currentPage === 0 ? 'solid' : 'outline'}
          onPress={() => pager.scrollToPage(0)}
        />
        <SushiButton
          title="Go to 2"
          size="sm"
          variant={pager.currentPage === 1 ? 'solid' : 'outline'}
          onPress={() => pager.scrollToPage(1)}
        />
        <SushiButton
          title="Go to 3"
          size="sm"
          variant={pager.currentPage === 2 ? 'solid' : 'outline'}
          onPress={() => pager.scrollToPage(2)}
        />
        <SushiButton
          title="Go to 4"
          size="sm"
          variant={pager.currentPage === 3 ? 'solid' : 'outline'}
          onPress={() => pager.scrollToPage(3)}
        />
      </View>
      <View style={styles.pagerContainer}>
        <SushiVerticalPager
          ref={pager.pagerRef}
          pageCount={pager.pageCount}
          onPageChange={pager.setCurrentPage}
          renderPage={(index) => (
            <View style={[styles.page, { backgroundColor: colors[index] }]}>
              <SushiText variant="h2" style={styles.pageText}>
                Page {index + 1}
              </SushiText>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export const UsingHook: Story = {
  render: () => <WithHookExample />,
};

const styles = StyleSheet.create({
  container: {
    width: 320,
    alignItems: 'center',
  },
  pagerContainer: {
    width: 280,
    height: 400,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#f3f4f6',
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    margin: 8,
  },
  pageText: {
    color: '#fff',
    fontWeight: '700',
  },
  pageIndicator: {
    marginBottom: 12,
    color: '#6b7280',
  },
  controls: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  pageLabel: {
    minWidth: 50,
    textAlign: 'center',
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  subtitle: {
    marginTop: 8,
    color: '#6b7280',
    textAlign: 'center',
  },
  dots: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#d1d5db',
  },
  activeDot: {
    backgroundColor: '#6366f1',
    width: 24,
  },
});
