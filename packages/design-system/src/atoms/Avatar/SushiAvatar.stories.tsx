import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { SushiAvatar, SushiAvatarGroup } from './SushiAvatar';
import { SushiText } from '../Text/SushiText';
import { ThemeProvider } from '../../theme';

const meta: Meta<typeof SushiAvatar> = {
  title: 'Sushi/Atoms/Avatar',
  component: SushiAvatar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Avatar size',
    },
    shape: {
      control: 'select',
      options: ['circle', 'square', 'rounded'],
      description: 'Avatar shape',
    },
    bordered: {
      control: 'boolean',
      description: 'Show border',
    },
    name: {
      control: 'text',
      description: 'Name for initials fallback',
    },
    uri: {
      control: 'text',
      description: 'Image URL',
    },
  },
  args: {
    size: 'md',
    shape: 'circle',
    bordered: false,
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
type Story = StoryObj<typeof SushiAvatar>;

// Default with Initials
export const Default: Story = {
  args: {
    name: 'John Doe',
  },
};

// With Image
export const WithImage: Story = {
  args: {
    uri: 'https://i.pravatar.cc/150?img=1',
    name: 'John Doe',
  },
};

// All Sizes
export const AllSizes: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
      <View style={{ alignItems: 'center', gap: 4 }}>
        <SushiAvatar name="JD" size="xs" />
        <SushiText variant="caption">xs</SushiText>
      </View>
      <View style={{ alignItems: 'center', gap: 4 }}>
        <SushiAvatar name="JD" size="sm" />
        <SushiText variant="caption">sm</SushiText>
      </View>
      <View style={{ alignItems: 'center', gap: 4 }}>
        <SushiAvatar name="JD" size="md" />
        <SushiText variant="caption">md</SushiText>
      </View>
      <View style={{ alignItems: 'center', gap: 4 }}>
        <SushiAvatar name="JD" size="lg" />
        <SushiText variant="caption">lg</SushiText>
      </View>
      <View style={{ alignItems: 'center', gap: 4 }}>
        <SushiAvatar name="JD" size="xl" />
        <SushiText variant="caption">xl</SushiText>
      </View>
      <View style={{ alignItems: 'center', gap: 4 }}>
        <SushiAvatar name="JD" size="2xl" />
        <SushiText variant="caption">2xl</SushiText>
      </View>
    </View>
  ),
};

// All Shapes
export const AllShapes: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
      <View style={{ alignItems: 'center', gap: 4 }}>
        <SushiAvatar name="John Doe" size="lg" shape="circle" />
        <SushiText variant="caption">Circle</SushiText>
      </View>
      <View style={{ alignItems: 'center', gap: 4 }}>
        <SushiAvatar name="John Doe" size="lg" shape="rounded" />
        <SushiText variant="caption">Rounded</SushiText>
      </View>
      <View style={{ alignItems: 'center', gap: 4 }}>
        <SushiAvatar name="John Doe" size="lg" shape="square" />
        <SushiText variant="caption">Square</SushiText>
      </View>
    </View>
  ),
};

// With Border
export const WithBorder: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
      <SushiAvatar name="John Doe" size="lg" bordered />
      <SushiAvatar name="Jane Smith" size="lg" bordered />
      <SushiAvatar name="Bob Wilson" size="lg" bordered />
    </View>
  ),
};

// Custom Border Color
export const CustomBorderColor: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
      <SushiAvatar name="John Doe" size="lg" bordered borderColor="#FF6B6B" />
      <SushiAvatar name="Jane Smith" size="lg" bordered borderColor="#4ECDC4" />
      <SushiAvatar name="Bob Wilson" size="lg" bordered borderColor="#45B7D1" />
    </View>
  ),
};

// Initials Variations
export const InitialsVariations: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <SushiText variant="label" weight="semibold">Different name formats:</SushiText>
      <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
        <View style={{ alignItems: 'center', gap: 4 }}>
          <SushiAvatar name="John" size="lg" />
          <SushiText variant="caption">Single name</SushiText>
        </View>
        <View style={{ alignItems: 'center', gap: 4 }}>
          <SushiAvatar name="John Doe" size="lg" />
          <SushiText variant="caption">First + Last</SushiText>
        </View>
        <View style={{ alignItems: 'center', gap: 4 }}>
          <SushiAvatar name="John Michael Doe" size="lg" />
          <SushiText variant="caption">Full name</SushiText>
        </View>
      </View>
    </View>
  ),
};

// Fallback (No name or image)
export const Fallback: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
      <View style={{ alignItems: 'center', gap: 4 }}>
        <SushiAvatar size="lg" />
        <SushiText variant="caption">Default fallback</SushiText>
      </View>
      <View style={{ alignItems: 'center', gap: 4 }}>
        <SushiAvatar size="lg" fallback={<SushiText>👤</SushiText>} />
        <SushiText variant="caption">Custom fallback</SushiText>
      </View>
    </View>
  ),
};

// Color Generation
export const ColorGeneration: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <SushiText variant="label" weight="semibold">Colors are generated from names:</SushiText>
      <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
        <SushiAvatar name="Alice" size="md" />
        <SushiAvatar name="Bob" size="md" />
        <SushiAvatar name="Charlie" size="md" />
        <SushiAvatar name="Diana" size="md" />
        <SushiAvatar name="Edward" size="md" />
        <SushiAvatar name="Fiona" size="md" />
        <SushiAvatar name="George" size="md" />
        <SushiAvatar name="Hannah" size="md" />
        <SushiAvatar name="Ivan" size="md" />
        <SushiAvatar name="Julia" size="md" />
      </View>
    </View>
  ),
};

// Custom Colors
export const CustomColors: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
      <SushiAvatar name="JD" size="lg" backgroundColor="#FF6B6B" textColor="#FFFFFF" />
      <SushiAvatar name="AB" size="lg" backgroundColor="#4ECDC4" textColor="#FFFFFF" />
      <SushiAvatar name="XY" size="lg" backgroundColor="#45B7D1" textColor="#FFFFFF" />
      <SushiAvatar name="MN" size="lg" backgroundColor="#96CEB4" textColor="#333333" />
    </View>
  ),
};

// Avatar Group
export const AvatarGroup: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <SushiText variant="label" weight="semibold">Avatar Group:</SushiText>
      <SushiAvatarGroup
        avatars={[
          { name: 'John Doe' },
          { name: 'Jane Smith' },
          { name: 'Bob Wilson' },
          { name: 'Alice Brown' },
          { name: 'Charlie Davis' },
        ]}
        max={4}
      />
    </View>
  ),
};

// Avatar Group Sizes
export const AvatarGroupSizes: Story = {
  render: () => (
    <View style={{ gap: 24 }}>
      <View style={{ gap: 8 }}>
        <SushiText variant="caption" color="secondary">Small</SushiText>
        <SushiAvatarGroup
          avatars={[
            { name: 'John Doe' },
            { name: 'Jane Smith' },
            { name: 'Bob Wilson' },
            { name: 'Alice Brown' },
          ]}
          size="sm"
        />
      </View>
      <View style={{ gap: 8 }}>
        <SushiText variant="caption" color="secondary">Medium</SushiText>
        <SushiAvatarGroup
          avatars={[
            { name: 'John Doe' },
            { name: 'Jane Smith' },
            { name: 'Bob Wilson' },
            { name: 'Alice Brown' },
          ]}
          size="md"
        />
      </View>
      <View style={{ gap: 8 }}>
        <SushiText variant="caption" color="secondary">Large</SushiText>
        <SushiAvatarGroup
          avatars={[
            { name: 'John Doe' },
            { name: 'Jane Smith' },
            { name: 'Bob Wilson' },
            { name: 'Alice Brown' },
          ]}
          size="lg"
        />
      </View>
    </View>
  ),
};

// Avatar Group with Max
export const AvatarGroupWithMax: Story = {
  render: () => (
    <View style={{ gap: 24 }}>
      <View style={{ gap: 8 }}>
        <SushiText variant="caption" color="secondary">Max 3</SushiText>
        <SushiAvatarGroup
          avatars={[
            { name: 'User 1' },
            { name: 'User 2' },
            { name: 'User 3' },
            { name: 'User 4' },
            { name: 'User 5' },
            { name: 'User 6' },
          ]}
          max={3}
        />
      </View>
      <View style={{ gap: 8 }}>
        <SushiText variant="caption" color="secondary">Max 5</SushiText>
        <SushiAvatarGroup
          avatars={[
            { name: 'User 1' },
            { name: 'User 2' },
            { name: 'User 3' },
            { name: 'User 4' },
            { name: 'User 5' },
            { name: 'User 6' },
          ]}
          max={5}
        />
      </View>
    </View>
  ),
};

// User List Item
export const UserListItem: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      {['Alice Johnson', 'Bob Smith', 'Carol Williams'].map((name) => (
        <View key={name} style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <SushiAvatar name={name} size="md" />
          <View>
            <SushiText weight="medium">{name}</SushiText>
            <SushiText variant="caption" color="secondary">Online</SushiText>
          </View>
        </View>
      ))}
    </View>
  ),
};

// Profile Header
export const ProfileHeader: Story = {
  render: () => (
    <View style={{ alignItems: 'center', gap: 12 }}>
      <SushiAvatar name="John Doe" size="2xl" bordered />
      <View style={{ alignItems: 'center' }}>
        <SushiText variant="h3">John Doe</SushiText>
        <SushiText color="secondary">Software Engineer</SushiText>
      </View>
    </View>
  ),
};

// Comment Avatar
export const CommentAvatar: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <SushiAvatar name="Alice" size="sm" />
        <View style={{ flex: 1, backgroundColor: '#F5F5F5', padding: 12, borderRadius: 8 }}>
          <SushiText weight="medium" variant="bodySmall">Alice</SushiText>
          <SushiText variant="bodySmall">Great post! Thanks for sharing.</SushiText>
        </View>
      </View>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <SushiAvatar name="Bob" size="sm" />
        <View style={{ flex: 1, backgroundColor: '#F5F5F5', padding: 12, borderRadius: 8 }}>
          <SushiText weight="medium" variant="bodySmall">Bob</SushiText>
          <SushiText variant="bodySmall">I agree, very informative!</SushiText>
        </View>
      </View>
    </View>
  ),
};
