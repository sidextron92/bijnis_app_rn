import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { SushiLoader } from './SushiLoader';
import { SushiText } from '../Text/SushiText';
import { SushiCard, SushiCardContent } from '../Card/SushiCard';
import { ThemeProvider } from '../../theme';

const meta: Meta<typeof SushiLoader> = {
  title: 'Sushi/Atoms/Loader',
  component: SushiLoader,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['spinner', 'dots', 'pulse'],
      description: 'Loader animation variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Loader size',
    },
    colorScheme: {
      control: 'select',
      options: ['primary', 'secondary', 'neutral', 'white'],
      description: 'Loader color',
    },
  },
  args: {
    variant: 'spinner',
    size: 'md',
    colorScheme: 'primary',
  },
  decorators: [
    (Story) => (
      <ThemeProvider initialMode="light">
        <View style={{ padding: 16 }}>
          <Story />
        </View>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SushiLoader>;

// Default
export const Default: Story = {};

// All Variants
export const AllVariants: Story = {
  render: () => (
    <View style={{ gap: 32 }}>
      <View style={{ alignItems: 'center', gap: 8 }}>
        <SushiLoader variant="spinner" />
        <SushiText variant="caption">Spinner</SushiText>
      </View>
      <View style={{ alignItems: 'center', gap: 8 }}>
        <SushiLoader variant="dots" />
        <SushiText variant="caption">Dots</SushiText>
      </View>
      <View style={{ alignItems: 'center', gap: 8 }}>
        <SushiLoader variant="pulse" />
        <SushiText variant="caption">Pulse</SushiText>
      </View>
    </View>
  ),
};

// All Sizes
export const AllSizes: Story = {
  render: () => (
    <View style={{ gap: 32 }}>
      <View style={{ gap: 16 }}>
        <SushiText variant="label" weight="semibold">Spinner</SushiText>
        <View style={{ flexDirection: 'row', gap: 24, alignItems: 'center' }}>
          <View style={{ alignItems: 'center', gap: 4 }}>
            <SushiLoader variant="spinner" size="sm" />
            <SushiText variant="caption">Small</SushiText>
          </View>
          <View style={{ alignItems: 'center', gap: 4 }}>
            <SushiLoader variant="spinner" size="md" />
            <SushiText variant="caption">Medium</SushiText>
          </View>
          <View style={{ alignItems: 'center', gap: 4 }}>
            <SushiLoader variant="spinner" size="lg" />
            <SushiText variant="caption">Large</SushiText>
          </View>
        </View>
      </View>
      <View style={{ gap: 16 }}>
        <SushiText variant="label" weight="semibold">Dots</SushiText>
        <View style={{ flexDirection: 'row', gap: 24, alignItems: 'center' }}>
          <View style={{ alignItems: 'center', gap: 4 }}>
            <SushiLoader variant="dots" size="sm" />
            <SushiText variant="caption">Small</SushiText>
          </View>
          <View style={{ alignItems: 'center', gap: 4 }}>
            <SushiLoader variant="dots" size="md" />
            <SushiText variant="caption">Medium</SushiText>
          </View>
          <View style={{ alignItems: 'center', gap: 4 }}>
            <SushiLoader variant="dots" size="lg" />
            <SushiText variant="caption">Large</SushiText>
          </View>
        </View>
      </View>
    </View>
  ),
};

// All Colors
export const AllColors: Story = {
  render: () => (
    <View style={{ gap: 24 }}>
      <View style={{ flexDirection: 'row', gap: 24, alignItems: 'center' }}>
        <View style={{ alignItems: 'center', gap: 4 }}>
          <SushiLoader colorScheme="primary" />
          <SushiText variant="caption">Primary</SushiText>
        </View>
        <View style={{ alignItems: 'center', gap: 4 }}>
          <SushiLoader colorScheme="secondary" />
          <SushiText variant="caption">Secondary</SushiText>
        </View>
        <View style={{ alignItems: 'center', gap: 4 }}>
          <SushiLoader colorScheme="neutral" />
          <SushiText variant="caption">Neutral</SushiText>
        </View>
      </View>
      <View style={{ backgroundColor: '#333', padding: 16, borderRadius: 8, alignItems: 'center' }}>
        <SushiLoader colorScheme="white" />
        <SushiText variant="caption" customColor="#FFFFFF" style={{ marginTop: 8 }}>White (on dark)</SushiText>
      </View>
    </View>
  ),
};

// Spinner Variant
export const Spinner: Story = {
  args: {
    variant: 'spinner',
  },
};

// Dots Variant
export const Dots: Story = {
  args: {
    variant: 'dots',
  },
};

// Pulse Variant
export const Pulse: Story = {
  args: {
    variant: 'pulse',
  },
};

// Loading States
export const LoadingStates: Story = {
  render: () => (
    <View style={{ gap: 24 }}>
      <SushiCard>
        <SushiCardContent>
          <View style={{ alignItems: 'center', padding: 24 }}>
            <SushiLoader size="lg" />
            <SushiText color="secondary" style={{ marginTop: 12 }}>Loading content...</SushiText>
          </View>
        </SushiCardContent>
      </SushiCard>
    </View>
  ),
};

// Inline Loading
export const InlineLoading: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <SushiLoader size="sm" />
        <SushiText>Loading data...</SushiText>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <SushiLoader variant="dots" size="sm" />
        <SushiText>Syncing...</SushiText>
      </View>
    </View>
  ),
};

// Full Page Loading
export const FullPageLoading: Story = {
  render: () => (
    <View style={{
      height: 300,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5F5F5',
      borderRadius: 8,
    }}>
      <SushiLoader size="lg" />
      <SushiText variant="body" color="secondary" style={{ marginTop: 16 }}>
        Loading your dashboard...
      </SushiText>
    </View>
  ),
};

// Button Loading
export const ButtonLoading: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <View style={{
        backgroundColor: '#FF5722',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
      }}>
        <SushiLoader size="sm" colorScheme="white" />
        <SushiText customColor="#FFFFFF" weight="semibold">Submitting...</SushiText>
      </View>
      <View style={{
        backgroundColor: '#2196F3',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
      }}>
        <SushiLoader variant="dots" size="sm" colorScheme="white" />
        <SushiText customColor="#FFFFFF" weight="semibold">Processing...</SushiText>
      </View>
    </View>
  ),
};

// Skeleton Placeholder
export const SkeletonPlaceholder: Story = {
  render: () => (
    <SushiCard>
      <SushiCardContent>
        <View style={{ gap: 12 }}>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <View style={{ width: 48, height: 48, backgroundColor: '#E0E0E0', borderRadius: 24 }}>
              <SushiLoader variant="pulse" size="lg" />
            </View>
            <View style={{ flex: 1, gap: 8 }}>
              <View style={{ height: 16, backgroundColor: '#E0E0E0', borderRadius: 4, width: '60%' }} />
              <View style={{ height: 12, backgroundColor: '#E0E0E0', borderRadius: 4, width: '40%' }} />
            </View>
          </View>
          <View style={{ height: 12, backgroundColor: '#E0E0E0', borderRadius: 4 }} />
          <View style={{ height: 12, backgroundColor: '#E0E0E0', borderRadius: 4, width: '80%' }} />
        </View>
      </SushiCardContent>
    </SushiCard>
  ),
};

// Loading Overlay
export const LoadingOverlay: Story = {
  render: () => (
    <View style={{ position: 'relative', height: 200 }}>
      <SushiCard style={{ height: '100%' }}>
        <SushiCardContent>
          <SushiText variant="h4">Content Title</SushiText>
          <SushiText color="secondary">Some content that is being loaded...</SushiText>
        </SushiCardContent>
      </SushiCard>
      <View style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
      }}>
        <SushiLoader size="lg" />
        <SushiText color="secondary" style={{ marginTop: 8 }}>Refreshing...</SushiText>
      </View>
    </View>
  ),
};
