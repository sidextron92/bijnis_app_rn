import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { SushiBadge } from './SushiBadge';
import { SushiText } from '../Text/SushiText';
import { SushiAvatar } from '../Avatar/SushiAvatar';
import { SushiIcon } from '../Icon/SushiIcon';
import { ThemeProvider } from '../../theme';

const meta: Meta<typeof SushiBadge> = {
  title: 'Sushi/Atoms/Badge',
  component: SushiBadge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'soft', 'dot'],
      description: 'Badge style variant',
    },
    colorScheme: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'neutral'],
      description: 'Color scheme',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Badge size',
    },
    content: {
      control: 'text',
      description: 'Badge content (text or number)',
    },
    max: {
      control: 'number',
      description: 'Max count before showing +',
    },
    position: {
      control: 'select',
      options: ['top-right', 'top-left', 'bottom-right', 'bottom-left'],
      description: 'Badge position when used as overlay',
    },
  },
  args: {
    variant: 'solid',
    colorScheme: 'primary',
    size: 'md',
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
type Story = StoryObj<typeof SushiBadge>;

// Default
export const Default: Story = {
  args: {
    content: '5',
  },
};

// All Variants
export const AllVariants: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
        <View style={{ alignItems: 'center', gap: 4 }}>
          <SushiBadge content="5" variant="solid" />
          <SushiText variant="caption">Solid</SushiText>
        </View>
        <View style={{ alignItems: 'center', gap: 4 }}>
          <SushiBadge content="5" variant="outline" />
          <SushiText variant="caption">Outline</SushiText>
        </View>
        <View style={{ alignItems: 'center', gap: 4 }}>
          <SushiBadge content="5" variant="soft" />
          <SushiText variant="caption">Soft</SushiText>
        </View>
        <View style={{ alignItems: 'center', gap: 4 }}>
          <SushiBadge variant="dot" />
          <SushiText variant="caption">Dot</SushiText>
        </View>
      </View>
    </View>
  ),
};

// All Color Schemes
export const AllColorSchemes: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <View style={{ flexDirection: 'row', gap: 12, flexWrap: 'wrap' }}>
        <SushiBadge content="5" colorScheme="primary" />
        <SushiBadge content="5" colorScheme="secondary" />
        <SushiBadge content="5" colorScheme="success" />
        <SushiBadge content="5" colorScheme="warning" />
        <SushiBadge content="5" colorScheme="error" />
        <SushiBadge content="5" colorScheme="neutral" />
      </View>
      <View style={{ flexDirection: 'row', gap: 12, flexWrap: 'wrap' }}>
        <SushiBadge variant="dot" colorScheme="primary" />
        <SushiBadge variant="dot" colorScheme="secondary" />
        <SushiBadge variant="dot" colorScheme="success" />
        <SushiBadge variant="dot" colorScheme="warning" />
        <SushiBadge variant="dot" colorScheme="error" />
        <SushiBadge variant="dot" colorScheme="neutral" />
      </View>
    </View>
  ),
};

// All Sizes
export const AllSizes: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
        <View style={{ alignItems: 'center', gap: 4 }}>
          <SushiBadge content="5" size="sm" />
          <SushiText variant="caption">Small</SushiText>
        </View>
        <View style={{ alignItems: 'center', gap: 4 }}>
          <SushiBadge content="5" size="md" />
          <SushiText variant="caption">Medium</SushiText>
        </View>
        <View style={{ alignItems: 'center', gap: 4 }}>
          <SushiBadge content="5" size="lg" />
          <SushiText variant="caption">Large</SushiText>
        </View>
      </View>
    </View>
  ),
};

// Max Count
export const MaxCount: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
        <View style={{ alignItems: 'center', gap: 4 }}>
          <SushiBadge content={5} />
          <SushiText variant="caption">5</SushiText>
        </View>
        <View style={{ alignItems: 'center', gap: 4 }}>
          <SushiBadge content={99} />
          <SushiText variant="caption">99</SushiText>
        </View>
        <View style={{ alignItems: 'center', gap: 4 }}>
          <SushiBadge content={100} max={99} />
          <SushiText variant="caption">100 (max 99)</SushiText>
        </View>
        <View style={{ alignItems: 'center', gap: 4 }}>
          <SushiBadge content={999} max={99} />
          <SushiText variant="caption">999 (max 99)</SushiText>
        </View>
      </View>
    </View>
  ),
};

// On Avatar
export const OnAvatar: Story = {
  render: () => (
    <View style={{ gap: 24 }}>
      <View style={{ flexDirection: 'row', gap: 24 }}>
        <SushiBadge content={3} position="top-right">
          <SushiAvatar name="John Doe" size="lg" />
        </SushiBadge>
        <SushiBadge variant="dot" colorScheme="success" position="bottom-right">
          <SushiAvatar name="Jane Smith" size="lg" />
        </SushiBadge>
        <SushiBadge content="99+" colorScheme="error" position="top-right">
          <SushiAvatar name="Bob Wilson" size="lg" />
        </SushiBadge>
      </View>
    </View>
  ),
};

// On Icon
export const OnIcon: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 32 }}>
      <SushiBadge content={5} position="top-right" size="sm">
        <SushiIcon name="bell" size={32} />
      </SushiBadge>
      <SushiBadge content={12} position="top-right" size="sm" colorScheme="error">
        <SushiIcon name="mail" size={32} />
      </SushiBadge>
      <SushiBadge variant="dot" position="top-right" colorScheme="success">
        <SushiIcon name="message-circle" size={32} />
      </SushiBadge>
    </View>
  ),
};

// Position Variants
export const PositionVariants: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <SushiText variant="label" weight="semibold">Badge Positions:</SushiText>
      <View style={{ flexDirection: 'row', gap: 32 }}>
        <View style={{ alignItems: 'center', gap: 8 }}>
          <SushiBadge content="1" position="top-right">
            <View style={{ width: 48, height: 48, backgroundColor: '#E0E0E0', borderRadius: 8 }} />
          </SushiBadge>
          <SushiText variant="caption">top-right</SushiText>
        </View>
        <View style={{ alignItems: 'center', gap: 8 }}>
          <SushiBadge content="2" position="top-left">
            <View style={{ width: 48, height: 48, backgroundColor: '#E0E0E0', borderRadius: 8 }} />
          </SushiBadge>
          <SushiText variant="caption">top-left</SushiText>
        </View>
        <View style={{ alignItems: 'center', gap: 8 }}>
          <SushiBadge content="3" position="bottom-right">
            <View style={{ width: 48, height: 48, backgroundColor: '#E0E0E0', borderRadius: 8 }} />
          </SushiBadge>
          <SushiText variant="caption">bottom-right</SushiText>
        </View>
        <View style={{ alignItems: 'center', gap: 8 }}>
          <SushiBadge content="4" position="bottom-left">
            <View style={{ width: 48, height: 48, backgroundColor: '#E0E0E0', borderRadius: 8 }} />
          </SushiBadge>
          <SushiText variant="caption">bottom-left</SushiText>
        </View>
      </View>
    </View>
  ),
};

// Dot Badge Positions
export const DotBadgePositions: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <SushiText variant="label" weight="semibold">Dot Badge Positions:</SushiText>
      <View style={{ flexDirection: 'row', gap: 32 }}>
        <SushiBadge variant="dot" colorScheme="success" position="top-right">
          <SushiAvatar name="User 1" size="lg" />
        </SushiBadge>
        <SushiBadge variant="dot" colorScheme="warning" position="bottom-right">
          <SushiAvatar name="User 2" size="lg" />
        </SushiBadge>
        <SushiBadge variant="dot" colorScheme="error" position="bottom-left">
          <SushiAvatar name="User 3" size="lg" />
        </SushiBadge>
      </View>
    </View>
  ),
};

// Status Indicators
export const StatusIndicators: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <SushiText variant="label" weight="semibold">Online Status:</SushiText>
      <View style={{ gap: 12 }}>
        {[
          { name: 'Alice', status: 'online', color: 'success' as const },
          { name: 'Bob', status: 'away', color: 'warning' as const },
          { name: 'Charlie', status: 'busy', color: 'error' as const },
          { name: 'Diana', status: 'offline', color: 'neutral' as const },
        ].map((user) => (
          <View key={user.name} style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <SushiBadge variant="dot" colorScheme={user.color} position="bottom-right">
              <SushiAvatar name={user.name} size="md" />
            </SushiBadge>
            <View>
              <SushiText weight="medium">{user.name}</SushiText>
              <SushiText variant="caption" color="secondary">{user.status}</SushiText>
            </View>
          </View>
        ))}
      </View>
    </View>
  ),
};

// Notification Example
export const NotificationExample: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <SushiText variant="label" weight="semibold">Notifications:</SushiText>
      <View style={{ flexDirection: 'row', gap: 24 }}>
        <View style={{ alignItems: 'center', gap: 4 }}>
          <SushiBadge content={3} position="top-right" size="sm">
            <View style={{ padding: 8, backgroundColor: '#F5F5F5', borderRadius: 8 }}>
              <SushiIcon name="bell" size={24} />
            </View>
          </SushiBadge>
          <SushiText variant="caption">Notifications</SushiText>
        </View>
        <View style={{ alignItems: 'center', gap: 4 }}>
          <SushiBadge content={12} position="top-right" size="sm" colorScheme="error">
            <View style={{ padding: 8, backgroundColor: '#F5F5F5', borderRadius: 8 }}>
              <SushiIcon name="mail" size={24} />
            </View>
          </SushiBadge>
          <SushiText variant="caption">Messages</SushiText>
        </View>
        <View style={{ alignItems: 'center', gap: 4 }}>
          <SushiBadge content={2} position="top-right" size="sm" colorScheme="primary">
            <View style={{ padding: 8, backgroundColor: '#F5F5F5', borderRadius: 8 }}>
              <SushiIcon name="shopping-cart" size={24} />
            </View>
          </SushiBadge>
          <SushiText variant="caption">Cart</SushiText>
        </View>
      </View>
    </View>
  ),
};

// Standalone Badges
export const StandaloneBadges: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <SushiText variant="label" weight="semibold">Standalone Badges:</SushiText>
      <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
        <SushiBadge content="New" colorScheme="primary" />
        <SushiBadge content="Hot" colorScheme="error" />
        <SushiBadge content="Sale" colorScheme="success" />
        <SushiBadge content="Pro" colorScheme="secondary" />
        <SushiBadge content="Beta" colorScheme="warning" />
      </View>
      <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
        <SushiBadge content="New" variant="soft" colorScheme="primary" />
        <SushiBadge content="Hot" variant="soft" colorScheme="error" />
        <SushiBadge content="Sale" variant="soft" colorScheme="success" />
        <SushiBadge content="Pro" variant="soft" colorScheme="secondary" />
        <SushiBadge content="Beta" variant="soft" colorScheme="warning" />
      </View>
    </View>
  ),
};
