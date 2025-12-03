import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, StyleSheet } from 'react-native';
import {
  SushiShimmer,
  ShimmerItem,
  ShimmerText,
  ShimmerAvatar,
  ShimmerCard,
  ShimmerPresets,
} from './SushiShimmer';
import { SushiButton } from '../Button/SushiButton';
import { SushiText } from '../Text/SushiText';
import { ThemeProvider } from '../../theme';

const meta: Meta<typeof SushiShimmer> = {
  title: 'Sushi/Atoms/Shimmer',
  component: SushiShimmer,
  parameters: {
    layout: 'padded',
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
type Story = StoryObj<typeof SushiShimmer>;

export const Basic: Story = {
  render: () => (
    <SushiShimmer>
      <View style={styles.basicContainer}>
        <ShimmerItem width="100%" height={20} />
        <ShimmerItem width="80%" height={16} style={{ marginTop: 8 }} />
        <ShimmerItem width="60%" height={16} style={{ marginTop: 8 }} />
      </View>
    </SushiShimmer>
  ),
};

export const TextLines: Story = {
  render: () => (
    <SushiShimmer>
      <View style={styles.basicContainer}>
        <ShimmerText lines={3} width="100%" />
      </View>
    </SushiShimmer>
  ),
};

export const Avatar: Story = {
  render: () => (
    <SushiShimmer>
      <View style={styles.avatarRow}>
        <ShimmerAvatar size={40} />
        <ShimmerAvatar size={48} style={{ marginLeft: 12 }} />
        <ShimmerAvatar size={56} style={{ marginLeft: 12 }} />
        <ShimmerAvatar size={64} style={{ marginLeft: 12 }} />
      </View>
    </SushiShimmer>
  ),
};

export const Card: Story = {
  render: () => (
    <SushiShimmer>
      <ShimmerCard width="100%" height={200} />
    </SushiShimmer>
  ),
};

export const ListItemPreset: Story = {
  render: () => (
    <SushiShimmer>
      <View style={styles.listContainer}>
        <ShimmerPresets.ListItem />
        <ShimmerPresets.ListItem />
        <ShimmerPresets.ListItem />
      </View>
    </SushiShimmer>
  ),
};

export const CardPreset: Story = {
  render: () => (
    <SushiShimmer>
      <ShimmerPresets.Card />
    </SushiShimmer>
  ),
};

export const ProfilePreset: Story = {
  render: () => (
    <SushiShimmer>
      <ShimmerPresets.Profile />
    </SushiShimmer>
  ),
};

export const CustomAnimation: Story = {
  render: () => (
    <SushiShimmer
      animationDuration={1500}
      animationWidth={150}
    >
      <View style={styles.basicContainer}>
        <ShimmerItem width="100%" height={24} />
        <ShimmerItem width="70%" height={18} style={{ marginTop: 12 }} />
      </View>
    </SushiShimmer>
  ),
};

const ToggleExample = () => {
  const [loading, setLoading] = useState(true);

  return (
    <View style={styles.toggleContainer}>
      <SushiButton
        title={loading ? 'Show Content' : 'Show Shimmer'}
        onPress={() => setLoading(!loading)}
        style={{ marginBottom: 16 }}
      />
      {loading ? (
        <SushiShimmer>
          <View style={styles.contentRow}>
            <ShimmerAvatar size={48} />
            <View style={styles.contentText}>
              <ShimmerText lines={1} width="60%" />
              <ShimmerText lines={2} width="100%" style={{ marginTop: 8 }} />
            </View>
          </View>
        </SushiShimmer>
      ) : (
        <View style={styles.contentRow}>
          <View style={styles.realAvatar}>
            <SushiText variant="h3" style={{ color: '#fff' }}>JD</SushiText>
          </View>
          <View style={styles.contentText}>
            <SushiText variant="h4">John Doe</SushiText>
            <SushiText variant="body" style={{ marginTop: 4 }}>
              Software Developer at Acme Corp. Building amazing products.
            </SushiText>
          </View>
        </View>
      )}
    </View>
  );
};

export const LoadingToggle: Story = {
  render: () => <ToggleExample />,
};

export const ComplexLayout: Story = {
  render: () => (
    <SushiShimmer>
      <View style={styles.complexLayout}>
        {/* Header */}
        <View style={styles.header}>
          <ShimmerAvatar size={64} />
          <View style={styles.headerText}>
            <ShimmerItem width={150} height={20} />
            <ShimmerItem width={100} height={14} style={{ marginTop: 8 }} />
          </View>
        </View>

        {/* Stats */}
        <View style={styles.stats}>
          <ShimmerItem width={80} height={40} radius={8} />
          <ShimmerItem width={80} height={40} radius={8} />
          <ShimmerItem width={80} height={40} radius={8} />
        </View>

        {/* Content Cards */}
        <ShimmerCard height={120} style={{ marginTop: 16 }} />
        <ShimmerCard height={120} style={{ marginTop: 12 }} />
      </View>
    </SushiShimmer>
  ),
};

const styles = StyleSheet.create({
  basicContainer: {
    padding: 16,
    width: 300,
  },
  avatarRow: {
    flexDirection: 'row',
    padding: 16,
  },
  listContainer: {
    width: 300,
  },
  toggleContainer: {
    padding: 16,
    width: 350,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  contentText: {
    flex: 1,
    marginLeft: 12,
  },
  realAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  complexLayout: {
    padding: 16,
    width: 350,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    marginLeft: 16,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});
