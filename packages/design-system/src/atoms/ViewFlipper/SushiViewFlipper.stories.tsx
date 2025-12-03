import React, { useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, StyleSheet } from 'react-native';
import {
  SushiViewFlipper,
  SushiViewFlipperRef,
  useSushiViewFlipperState,
} from './SushiViewFlipper';
import { SushiButton } from '../Button/SushiButton';
import { SushiText } from '../Text/SushiText';
import { ThemeProvider } from '../../theme';

const meta: Meta<typeof SushiViewFlipper> = {
  title: 'Sushi/Atoms/ViewFlipper',
  component: SushiViewFlipper,
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
type Story = StoryObj<typeof SushiViewFlipper>;

const promos = [
  { title: '50% OFF', subtitle: 'On your first order', color: '#6366f1' },
  { title: 'Free Delivery', subtitle: 'Orders above $30', color: '#ec4899' },
  { title: 'New Items', subtitle: 'Check out latest arrivals', color: '#22c55e' },
];

const BasicExample = () => {
  return (
    <View style={styles.container}>
      <SushiViewFlipper
        count={promos.length}
        flipInterval={3000}
        style={styles.flipper}
        renderItem={(index) => (
          <View style={[styles.promoCard, { backgroundColor: promos[index].color }]}>
            <SushiText variant="h3" style={styles.promoTitle}>
              {promos[index].title}
            </SushiText>
            <SushiText variant="body" style={styles.promoSubtitle}>
              {promos[index].subtitle}
            </SushiText>
          </View>
        )}
      />
    </View>
  );
};

export const Basic: Story = {
  render: () => <BasicExample />,
};

const FlipToBottomExample = () => {
  return (
    <View style={styles.container}>
      <SushiViewFlipper
        count={promos.length}
        flipInterval={2500}
        animationDirection="flipToBottom"
        style={styles.flipper}
        renderItem={(index) => (
          <View style={[styles.promoCard, { backgroundColor: promos[index].color }]}>
            <SushiText variant="h3" style={styles.promoTitle}>
              {promos[index].title}
            </SushiText>
            <SushiText variant="body" style={styles.promoSubtitle}>
              {promos[index].subtitle}
            </SushiText>
          </View>
        )}
      />
    </View>
  );
};

export const FlipToBottom: Story = {
  render: () => <FlipToBottomExample />,
};

const ControlledExample = () => {
  const flipperRef = useRef<SushiViewFlipperRef>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <View style={styles.container}>
      <SushiViewFlipper
        ref={flipperRef}
        count={promos.length}
        flipInterval={3000}
        isPlaying={isPlaying}
        onFlip={setCurrentIndex}
        style={styles.flipper}
        renderItem={(index) => (
          <View style={[styles.promoCard, { backgroundColor: promos[index].color }]}>
            <SushiText variant="h3" style={styles.promoTitle}>
              {promos[index].title}
            </SushiText>
            <SushiText variant="body" style={styles.promoSubtitle}>
              {promos[index].subtitle}
            </SushiText>
          </View>
        )}
      />
      <View style={styles.controls}>
        <SushiButton
          title="Prev"
          variant="outline"
          size="sm"
          onPress={() => flipperRef.current?.previous()}
        />
        <SushiButton
          title={isPlaying ? 'Pause' : 'Play'}
          size="sm"
          onPress={() => {
            if (isPlaying) {
              flipperRef.current?.pause();
            } else {
              flipperRef.current?.play();
            }
            setIsPlaying(!isPlaying);
          }}
        />
        <SushiButton
          title="Next"
          variant="outline"
          size="sm"
          onPress={() => flipperRef.current?.next()}
        />
      </View>
      <View style={styles.dots}>
        {promos.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, currentIndex === index && styles.activeDot]}
          />
        ))}
      </View>
    </View>
  );
};

export const Controlled: Story = {
  render: () => <ControlledExample />,
};

const NotificationExample = () => {
  const notifications = [
    'John liked your post',
    'New message from Sarah',
    'Your order has been shipped',
    '3 new followers today',
  ];

  return (
    <View style={styles.notificationContainer}>
      <View style={styles.notificationBar}>
        <SushiText variant="caption" style={styles.notificationIcon}>
          🔔
        </SushiText>
        <SushiViewFlipper
          count={notifications.length}
          flipInterval={4000}
          style={styles.notificationFlipper}
          renderItem={(index) => (
            <SushiText variant="body" numberOfLines={1}>
              {notifications[index]}
            </SushiText>
          )}
        />
      </View>
    </View>
  );
};

export const NotificationBanner: Story = {
  render: () => <NotificationExample />,
};

const WithHookExample = () => {
  const flipper = useSushiViewFlipperState(promos.length);

  return (
    <View style={styles.container}>
      <SushiViewFlipper
        ref={flipper.flipperRef}
        count={flipper.count}
        flipInterval={3000}
        isPlaying={flipper.isPlaying}
        onFlip={flipper.onFlip}
        style={styles.flipper}
        renderItem={(index) => (
          <View style={[styles.promoCard, { backgroundColor: promos[index].color }]}>
            <SushiText variant="h3" style={styles.promoTitle}>
              {promos[index].title}
            </SushiText>
            <SushiText variant="body" style={styles.promoSubtitle}>
              {promos[index].subtitle}
            </SushiText>
          </View>
        )}
      />
      <View style={styles.controls}>
        <SushiButton
          title="Previous"
          variant="outline"
          size="sm"
          onPress={flipper.previous}
        />
        <SushiButton
          title={flipper.isPlaying ? 'Pause' : 'Play'}
          size="sm"
          onPress={flipper.isPlaying ? flipper.pause : flipper.play}
        />
        <SushiButton
          title="Next"
          variant="outline"
          size="sm"
          onPress={flipper.next}
        />
      </View>
      <SushiText variant="caption" style={styles.indexText}>
        Current: {flipper.currentIndex + 1} / {flipper.count}
      </SushiText>
    </View>
  );
};

export const UsingHook: Story = {
  render: () => <WithHookExample />,
};

const CustomTimingExample = () => {
  return (
    <View style={styles.container}>
      <SushiText variant="body" style={styles.label}>
        Fast (1s interval, 300ms animation)
      </SushiText>
      <SushiViewFlipper
        count={3}
        flipInterval={1000}
        animationDuration={300}
        style={[styles.flipper, styles.smallFlipper]}
        renderItem={(index) => (
          <View style={[styles.simpleCard, { backgroundColor: ['#f87171', '#facc15', '#4ade80'][index] }]}>
            <SushiText variant="h4" style={{ color: '#fff' }}>
              {index + 1}
            </SushiText>
          </View>
        )}
      />

      <SushiText variant="body" style={[styles.label, { marginTop: 24 }]}>
        Slow (5s interval, 1s animation)
      </SushiText>
      <SushiViewFlipper
        count={3}
        flipInterval={5000}
        animationDuration={1000}
        style={[styles.flipper, styles.smallFlipper]}
        renderItem={(index) => (
          <View style={[styles.simpleCard, { backgroundColor: ['#818cf8', '#f472b6', '#38bdf8'][index] }]}>
            <SushiText variant="h4" style={{ color: '#fff' }}>
              {index + 1}
            </SushiText>
          </View>
        )}
      />
    </View>
  );
};

export const CustomTiming: Story = {
  render: () => <CustomTimingExample />,
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  flipper: {
    width: 300,
    height: 100,
    borderRadius: 12,
    overflow: 'hidden',
  },
  promoCard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  promoTitle: {
    color: '#fff',
    fontWeight: '700',
  },
  promoSubtitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 4,
  },
  controls: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 16,
  },
  dots: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#d1d5db',
  },
  activeDot: {
    backgroundColor: '#6366f1',
  },
  notificationContainer: {
    padding: 20,
    width: 320,
  },
  notificationBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    padding: 12,
  },
  notificationIcon: {
    marginRight: 8,
  },
  notificationFlipper: {
    flex: 1,
    height: 20,
  },
  indexText: {
    marginTop: 8,
    color: '#6b7280',
  },
  label: {
    marginBottom: 8,
    color: '#6b7280',
  },
  smallFlipper: {
    height: 60,
    width: 200,
  },
  simpleCard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
