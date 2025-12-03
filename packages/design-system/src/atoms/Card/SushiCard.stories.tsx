import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, Image } from 'react-native';
import { SushiCard, SushiCardHeader, SushiCardContent, SushiCardFooter } from './SushiCard';
import { SushiText } from '../Text/SushiText';
import { SushiButton } from '../Button/SushiButton';
import { SushiTag } from '../Tag/SushiTag';
import { SushiAvatar } from '../Avatar/SushiAvatar';
import { ThemeProvider } from '../../theme';

const meta: Meta<typeof SushiCard> = {
  title: 'Sushi/Atoms/Card',
  component: SushiCard,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['elevated', 'outlined', 'filled'],
      description: 'Card style variant',
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
      description: 'Card padding',
    },
    radius: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
      description: 'Border radius',
    },
    pressable: {
      control: 'boolean',
      description: 'Make card pressable',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
  },
  args: {
    variant: 'elevated',
    padding: 'md',
    radius: 'lg',
    pressable: false,
    disabled: false,
  },
  decorators: [
    (Story) => (
      <ThemeProvider initialMode="light">
        <View style={{ padding: 16, maxWidth: 400 }}>
          <Story />
        </View>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SushiCard>;

// Default
export const Default: Story = {
  render: (args) => (
    <SushiCard {...args}>
      <SushiText>This is a basic card with some content inside.</SushiText>
    </SushiCard>
  ),
};

// With Header
export const WithHeader: Story = {
  render: () => (
    <SushiCard padding="none">
      <SushiCardHeader>
        <SushiText variant="h4">Card Title</SushiText>
        <SushiText color="secondary" variant="bodySmall">Card subtitle</SushiText>
      </SushiCardHeader>
      <SushiCardContent>
        <SushiText>
          This card has a header with title and subtitle. The content area contains the main body text.
        </SushiText>
      </SushiCardContent>
    </SushiCard>
  ),
};

// With Header and Footer
export const WithHeaderAndFooter: Story = {
  render: () => (
    <SushiCard padding="none">
      <SushiCardHeader>
        <SushiText variant="h4">Card Title</SushiText>
        <SushiText color="secondary" variant="bodySmall">Card subtitle</SushiText>
      </SushiCardHeader>
      <SushiCardContent>
        <SushiText>
          This card demonstrates the full structure with header, content, and footer sections.
        </SushiText>
      </SushiCardContent>
      <SushiCardFooter>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <SushiButton title="Cancel" variant="outline" size="sm" />
          <SushiButton title="Confirm" size="sm" />
        </View>
      </SushiCardFooter>
    </SushiCard>
  ),
};

// All Variants
export const AllVariants: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <SushiCard variant="elevated">
        <SushiCardContent>
          <SushiText weight="semibold">Elevated Card</SushiText>
          <SushiText color="secondary">Has shadow for depth</SushiText>
        </SushiCardContent>
      </SushiCard>
      <SushiCard variant="outlined">
        <SushiCardContent>
          <SushiText weight="semibold">Outlined Card</SushiText>
          <SushiText color="secondary">Has border outline</SushiText>
        </SushiCardContent>
      </SushiCard>
      <SushiCard variant="filled">
        <SushiCardContent>
          <SushiText weight="semibold">Filled Card</SushiText>
          <SushiText color="secondary">Has background fill</SushiText>
        </SushiCardContent>
      </SushiCard>
    </View>
  ),
};

// Pressable Card
export const Pressable: Story = {
  render: () => (
    <SushiCard pressable onPress={() => console.log('Card pressed!')}>
      <SushiCardContent>
        <SushiText weight="semibold">Pressable Card</SushiText>
        <SushiText color="secondary">Tap me to see the press effect</SushiText>
      </SushiCardContent>
    </SushiCard>
  ),
};

// Product Card
export const ProductCard: Story = {
  render: () => (
    <SushiCard variant="elevated" padding="none">
      <View style={{ height: 160, backgroundColor: '#F5F5F5' }}>
        <Image
          source={{ uri: 'https://via.placeholder.com/400x160' }}
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
        />
      </View>
      <SushiCardContent>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <View style={{ flex: 1 }}>
            <SushiText weight="semibold" numberOfLines={1}>Product Name</SushiText>
            <SushiText color="secondary" variant="bodySmall">Category</SushiText>
          </View>
          <SushiTag label="New" size="sm" colorScheme="success" />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8, gap: 8 }}>
          <SushiText weight="bold" size="600">$99.00</SushiText>
          <SushiText color="secondary" strikethrough variant="bodySmall">$129.00</SushiText>
        </View>
      </SushiCardContent>
      <SushiCardFooter>
        <SushiButton title="Add to Cart" fullWidth />
      </SushiCardFooter>
    </SushiCard>
  ),
};

// User Profile Card
export const UserProfileCard: Story = {
  render: () => (
    <SushiCard padding="none">
      <SushiCardHeader>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <SushiAvatar name="John Doe" size="lg" />
            <View>
              <SushiText variant="h4">John Doe</SushiText>
              <SushiText color="secondary" variant="bodySmall">Software Engineer</SushiText>
            </View>
          </View>
          <SushiButton title="Follow" size="sm" variant="outline" />
        </View>
      </SushiCardHeader>
      <SushiCardContent>
        <SushiText color="secondary">
          Passionate about building great products and user experiences. Currently working on React Native apps.
        </SushiText>
        <View style={{ flexDirection: 'row', gap: 16, marginTop: 12 }}>
          <View>
            <SushiText weight="bold">1.2K</SushiText>
            <SushiText color="secondary" variant="caption">Followers</SushiText>
          </View>
          <View>
            <SushiText weight="bold">384</SushiText>
            <SushiText color="secondary" variant="caption">Following</SushiText>
          </View>
          <View>
            <SushiText weight="bold">56</SushiText>
            <SushiText color="secondary" variant="caption">Posts</SushiText>
          </View>
        </View>
      </SushiCardContent>
    </SushiCard>
  ),
};

// Notification Card
export const NotificationCard: Story = {
  render: () => (
    <SushiCard variant="outlined" pressable>
      <SushiCardContent>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <SushiAvatar name="Jane Smith" size="md" />
          <View style={{ flex: 1 }}>
            <SushiText>
              <SushiText weight="semibold">Jane Smith</SushiText>
              <SushiText color="secondary"> liked your post</SushiText>
            </SushiText>
            <SushiText color="tertiary" variant="caption">2 hours ago</SushiText>
          </View>
        </View>
      </SushiCardContent>
    </SushiCard>
  ),
};

// Stats Card
export const StatsCard: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 12 }}>
      <SushiCard variant="filled" style={{ flex: 1 }}>
        <SushiCardContent>
          <SushiText color="secondary" variant="caption">Total Sales</SushiText>
          <SushiText weight="bold" size="700">$24,500</SushiText>
          <SushiTag label="+12.5%" size="sm" colorScheme="success" variant="soft" />
        </SushiCardContent>
      </SushiCard>
      <SushiCard variant="filled" style={{ flex: 1 }}>
        <SushiCardContent>
          <SushiText color="secondary" variant="caption">Orders</SushiText>
          <SushiText weight="bold" size="700">1,234</SushiText>
          <SushiTag label="+8.2%" size="sm" colorScheme="success" variant="soft" />
        </SushiCardContent>
      </SushiCard>
    </View>
  ),
};

// Article Card
export const ArticleCard: Story = {
  render: () => (
    <SushiCard variant="elevated" padding="none">
      <View style={{ height: 180, backgroundColor: '#E8E8E8' }}>
        <Image
          source={{ uri: 'https://via.placeholder.com/400x180' }}
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
        />
      </View>
      <SushiCardContent>
        <View style={{ flexDirection: 'row', gap: 8, marginBottom: 8 }}>
          <SushiTag label="Design" size="sm" variant="soft" colorScheme="primary" />
          <SushiTag label="UI/UX" size="sm" variant="soft" colorScheme="secondary" />
        </View>
        <SushiText variant="h4" numberOfLines={2}>
          Building a Modern Design System for React Native
        </SushiText>
        <SushiText color="secondary" numberOfLines={2} style={{ marginTop: 8 }}>
          Learn how to create a comprehensive design system that scales across your mobile applications.
        </SushiText>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12, gap: 8 }}>
          <SushiAvatar name="Sarah Wilson" size="sm" />
          <SushiText variant="caption" color="secondary">Sarah Wilson • 5 min read</SushiText>
        </View>
      </SushiCardContent>
    </SushiCard>
  ),
};

// List Item Card
export const ListItemCard: Story = {
  render: () => (
    <View style={{ gap: 8 }}>
      {[1, 2, 3].map((item) => (
        <SushiCard key={item} variant="outlined" pressable padding="sm">
          <SushiCardContent>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <View style={{ width: 48, height: 48, backgroundColor: '#F0F0F0', borderRadius: 8 }} />
              <View style={{ flex: 1 }}>
                <SushiText weight="medium">Item Title {item}</SushiText>
                <SushiText color="secondary" variant="bodySmall">Item description goes here</SushiText>
              </View>
              <SushiText weight="semibold">$29.99</SushiText>
            </View>
          </SushiCardContent>
        </SushiCard>
      ))}
    </View>
  ),
};

// Padding Variants
export const PaddingVariants: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <SushiCard padding="none" variant="outlined">
        <SushiCardContent>
          <SushiText>Padding: none</SushiText>
        </SushiCardContent>
      </SushiCard>
      <SushiCard padding="sm" variant="outlined">
        <SushiCardContent>
          <SushiText>Padding: sm</SushiText>
        </SushiCardContent>
      </SushiCard>
      <SushiCard padding="md" variant="outlined">
        <SushiCardContent>
          <SushiText>Padding: md</SushiText>
        </SushiCardContent>
      </SushiCard>
      <SushiCard padding="lg" variant="outlined">
        <SushiCardContent>
          <SushiText>Padding: lg</SushiText>
        </SushiCardContent>
      </SushiCard>
    </View>
  ),
};

// Border Radius Variants
export const BorderRadiusVariants: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <SushiCard radius="none" variant="filled">
        <SushiCardContent>
          <SushiText>Border Radius: none</SushiText>
        </SushiCardContent>
      </SushiCard>
      <SushiCard radius="sm" variant="filled">
        <SushiCardContent>
          <SushiText>Border Radius: sm</SushiText>
        </SushiCardContent>
      </SushiCard>
      <SushiCard radius="md" variant="filled">
        <SushiCardContent>
          <SushiText>Border Radius: md</SushiText>
        </SushiCardContent>
      </SushiCard>
      <SushiCard radius="lg" variant="filled">
        <SushiCardContent>
          <SushiText>Border Radius: lg</SushiText>
        </SushiCardContent>
      </SushiCard>
      <SushiCard radius="xl" variant="filled">
        <SushiCardContent>
          <SushiText>Border Radius: xl</SushiText>
        </SushiCardContent>
      </SushiCard>
    </View>
  ),
};
