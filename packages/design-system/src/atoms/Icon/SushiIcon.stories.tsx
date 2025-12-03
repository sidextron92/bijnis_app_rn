import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, ScrollView } from 'react-native';
import { SushiIcon, SushiIconButton } from './SushiIcon';
import { SushiText } from '../Text/SushiText';
import { ThemeProvider } from '../../theme';

const meta: Meta<typeof SushiIcon> = {
  title: 'Sushi/Atoms/Icon',
  component: SushiIcon,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'Icon name from Feather icons',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Icon size',
    },
    color: {
      control: 'color',
      description: 'Icon color',
    },
  },
  args: {
    name: 'star',
    size: 'md',
  },
  decorators: [
    (Story) => (
      <ThemeProvider initialMode="light">
        <View style={{ padding: 16, backgroundColor: '#FFFFFF' }}>
          <Story />
        </View>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SushiIcon>;

// Default
export const Default: Story = {
  args: {
    name: 'star',
  },
};

// All Sizes
export const AllSizes: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 24, alignItems: 'center' }}>
      <View style={{ alignItems: 'center', gap: 4 }}>
        <SushiIcon name="star" size="xs" />
        <SushiText variant="caption">xs</SushiText>
      </View>
      <View style={{ alignItems: 'center', gap: 4 }}>
        <SushiIcon name="star" size="sm" />
        <SushiText variant="caption">sm</SushiText>
      </View>
      <View style={{ alignItems: 'center', gap: 4 }}>
        <SushiIcon name="star" size="md" />
        <SushiText variant="caption">md</SushiText>
      </View>
      <View style={{ alignItems: 'center', gap: 4 }}>
        <SushiIcon name="star" size="lg" />
        <SushiText variant="caption">lg</SushiText>
      </View>
      <View style={{ alignItems: 'center', gap: 4 }}>
        <SushiIcon name="star" size="xl" />
        <SushiText variant="caption">xl</SushiText>
      </View>
      <View style={{ alignItems: 'center', gap: 4 }}>
        <SushiIcon name="star" size="2xl" />
        <SushiText variant="caption">2xl</SushiText>
      </View>
    </View>
  ),
};

// Custom Colors
export const CustomColors: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 16 }}>
      <SushiIcon name="heart" size="lg" color="#FF5722" />
      <SushiIcon name="star" size="lg" color="#FFC107" />
      <SushiIcon name="check-circle" size="lg" color="#4CAF50" />
      <SushiIcon name="info" size="lg" color="#2196F3" />
      <SushiIcon name="alert-triangle" size="lg" color="#FF9800" />
      <SushiIcon name="x-circle" size="lg" color="#F44336" />
    </View>
  ),
};

// Common Navigation Icons
export const NavigationIcons: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <SushiText variant="label" weight="semibold">Navigation</SushiText>
      <View style={{ flexDirection: 'row', gap: 16, flexWrap: 'wrap' }}>
        {['home', 'arrow-left', 'arrow-right', 'chevron-left', 'chevron-right', 'chevron-up', 'chevron-down', 'menu', 'x', 'more-horizontal', 'more-vertical'].map((icon) => (
          <View key={icon} style={{ alignItems: 'center', gap: 4, width: 60 }}>
            <SushiIcon name={icon} size="lg" />
            <SushiText variant="caption" numberOfLines={1}>{icon}</SushiText>
          </View>
        ))}
      </View>
    </View>
  ),
};

// Action Icons
export const ActionIcons: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <SushiText variant="label" weight="semibold">Actions</SushiText>
      <View style={{ flexDirection: 'row', gap: 16, flexWrap: 'wrap' }}>
        {['plus', 'minus', 'edit', 'trash-2', 'copy', 'save', 'download', 'upload', 'share', 'refresh-cw', 'search', 'filter'].map((icon) => (
          <View key={icon} style={{ alignItems: 'center', gap: 4, width: 60 }}>
            <SushiIcon name={icon} size="lg" />
            <SushiText variant="caption" numberOfLines={1}>{icon}</SushiText>
          </View>
        ))}
      </View>
    </View>
  ),
};

// Communication Icons
export const CommunicationIcons: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <SushiText variant="label" weight="semibold">Communication</SushiText>
      <View style={{ flexDirection: 'row', gap: 16, flexWrap: 'wrap' }}>
        {['mail', 'message-circle', 'phone', 'video', 'send', 'bell', 'at-sign', 'paperclip'].map((icon) => (
          <View key={icon} style={{ alignItems: 'center', gap: 4, width: 60 }}>
            <SushiIcon name={icon} size="lg" />
            <SushiText variant="caption" numberOfLines={1}>{icon}</SushiText>
          </View>
        ))}
      </View>
    </View>
  ),
};

// Status Icons
export const StatusIcons: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <SushiText variant="label" weight="semibold">Status</SushiText>
      <View style={{ flexDirection: 'row', gap: 16, flexWrap: 'wrap' }}>
        {['check', 'check-circle', 'x', 'x-circle', 'alert-circle', 'alert-triangle', 'info', 'help-circle'].map((icon) => (
          <View key={icon} style={{ alignItems: 'center', gap: 4, width: 60 }}>
            <SushiIcon name={icon} size="lg" />
            <SushiText variant="caption" numberOfLines={1}>{icon}</SushiText>
          </View>
        ))}
      </View>
    </View>
  ),
};

// User & Social Icons
export const UserSocialIcons: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <SushiText variant="label" weight="semibold">User & Social</SushiText>
      <View style={{ flexDirection: 'row', gap: 16, flexWrap: 'wrap' }}>
        {['user', 'users', 'user-plus', 'user-check', 'heart', 'thumbs-up', 'thumbs-down', 'star', 'bookmark', 'award'].map((icon) => (
          <View key={icon} style={{ alignItems: 'center', gap: 4, width: 60 }}>
            <SushiIcon name={icon} size="lg" />
            <SushiText variant="caption" numberOfLines={1}>{icon}</SushiText>
          </View>
        ))}
      </View>
    </View>
  ),
};

// E-commerce Icons
export const EcommerceIcons: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <SushiText variant="label" weight="semibold">E-commerce</SushiText>
      <View style={{ flexDirection: 'row', gap: 16, flexWrap: 'wrap' }}>
        {['shopping-cart', 'shopping-bag', 'package', 'truck', 'credit-card', 'dollar-sign', 'percent', 'tag', 'gift', 'box'].map((icon) => (
          <View key={icon} style={{ alignItems: 'center', gap: 4, width: 60 }}>
            <SushiIcon name={icon} size="lg" />
            <SushiText variant="caption" numberOfLines={1}>{icon}</SushiText>
          </View>
        ))}
      </View>
    </View>
  ),
};

// Media Icons
export const MediaIcons: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <SushiText variant="label" weight="semibold">Media</SushiText>
      <View style={{ flexDirection: 'row', gap: 16, flexWrap: 'wrap' }}>
        {['image', 'camera', 'film', 'play', 'pause', 'volume-2', 'volume-x', 'mic', 'headphones', 'music'].map((icon) => (
          <View key={icon} style={{ alignItems: 'center', gap: 4, width: 60 }}>
            <SushiIcon name={icon} size="lg" />
            <SushiText variant="caption" numberOfLines={1}>{icon}</SushiText>
          </View>
        ))}
      </View>
    </View>
  ),
};

// Location Icons
export const LocationIcons: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <SushiText variant="label" weight="semibold">Location</SushiText>
      <View style={{ flexDirection: 'row', gap: 16, flexWrap: 'wrap' }}>
        {['map-pin', 'map', 'navigation', 'compass', 'globe', 'target'].map((icon) => (
          <View key={icon} style={{ alignItems: 'center', gap: 4, width: 60 }}>
            <SushiIcon name={icon} size="lg" />
            <SushiText variant="caption" numberOfLines={1}>{icon}</SushiText>
          </View>
        ))}
      </View>
    </View>
  ),
};

// Icon Button
export const IconButton: Story = {
  render: () => (
    <View style={{ gap: 24 }}>
      <View style={{ gap: 8 }}>
        <SushiText variant="label" weight="semibold">Icon Buttons</SushiText>
        <View style={{ flexDirection: 'row', gap: 16 }}>
          <SushiIconButton name="heart" onPress={() => console.log('Heart pressed')} />
          <SushiIconButton name="share" onPress={() => console.log('Share pressed')} />
          <SushiIconButton name="bookmark" onPress={() => console.log('Bookmark pressed')} />
          <SushiIconButton name="more-horizontal" onPress={() => console.log('More pressed')} />
        </View>
      </View>
    </View>
  ),
};

// Icon Button Sizes
export const IconButtonSizes: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <SushiText variant="label" weight="semibold">Icon Button Sizes</SushiText>
      <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
        <View style={{ alignItems: 'center', gap: 4 }}>
          <SushiIconButton name="star" size="sm" />
          <SushiText variant="caption">sm</SushiText>
        </View>
        <View style={{ alignItems: 'center', gap: 4 }}>
          <SushiIconButton name="star" size="md" />
          <SushiText variant="caption">md</SushiText>
        </View>
        <View style={{ alignItems: 'center', gap: 4 }}>
          <SushiIconButton name="star" size="lg" />
          <SushiText variant="caption">lg</SushiText>
        </View>
      </View>
    </View>
  ),
};

// Icon Button Variants
export const IconButtonVariants: Story = {
  render: () => (
    <View style={{ gap: 24 }}>
      <View style={{ gap: 8 }}>
        <SushiText variant="label" weight="semibold">Default (Ghost)</SushiText>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <SushiIconButton name="edit" variant="ghost" />
          <SushiIconButton name="trash-2" variant="ghost" />
          <SushiIconButton name="copy" variant="ghost" />
        </View>
      </View>
      <View style={{ gap: 8 }}>
        <SushiText variant="label" weight="semibold">Filled</SushiText>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <SushiIconButton name="plus" variant="filled" colorScheme="primary" />
          <SushiIconButton name="check" variant="filled" colorScheme="success" />
          <SushiIconButton name="x" variant="filled" colorScheme="error" />
        </View>
      </View>
      <View style={{ gap: 8 }}>
        <SushiText variant="label" weight="semibold">Outlined</SushiText>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <SushiIconButton name="heart" variant="outlined" colorScheme="primary" />
          <SushiIconButton name="star" variant="outlined" colorScheme="warning" />
          <SushiIconButton name="bell" variant="outlined" colorScheme="secondary" />
        </View>
      </View>
    </View>
  ),
};

// Toolbar Example
export const ToolbarExample: Story = {
  render: () => (
    <View style={{
      flexDirection: 'row',
      backgroundColor: '#F5F5F5',
      borderRadius: 8,
      padding: 4,
      gap: 4,
    }}>
      <SushiIconButton name="bold" size="sm" />
      <SushiIconButton name="italic" size="sm" />
      <SushiIconButton name="underline" size="sm" />
      <View style={{ width: 1, backgroundColor: '#E0E0E0', marginHorizontal: 4 }} />
      <SushiIconButton name="align-left" size="sm" />
      <SushiIconButton name="align-center" size="sm" />
      <SushiIconButton name="align-right" size="sm" />
      <View style={{ width: 1, backgroundColor: '#E0E0E0', marginHorizontal: 4 }} />
      <SushiIconButton name="link" size="sm" />
      <SushiIconButton name="image" size="sm" />
    </View>
  ),
};

// Action Bar Example
export const ActionBarExample: Story = {
  render: () => (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-around',
      backgroundColor: '#FFFFFF',
      borderTopWidth: 1,
      borderTopColor: '#E0E0E0',
      paddingVertical: 8,
    }}>
      <View style={{ alignItems: 'center', gap: 4 }}>
        <SushiIconButton name="home" size="md" />
        <SushiText variant="caption" color="primary">Home</SushiText>
      </View>
      <View style={{ alignItems: 'center', gap: 4 }}>
        <SushiIconButton name="search" size="md" />
        <SushiText variant="caption" color="secondary">Search</SushiText>
      </View>
      <View style={{ alignItems: 'center', gap: 4 }}>
        <SushiIconButton name="shopping-cart" size="md" />
        <SushiText variant="caption" color="secondary">Cart</SushiText>
      </View>
      <View style={{ alignItems: 'center', gap: 4 }}>
        <SushiIconButton name="user" size="md" />
        <SushiText variant="caption" color="secondary">Profile</SushiText>
      </View>
    </View>
  ),
};

// FAB Example
export const FABExample: Story = {
  render: () => (
    <View style={{ alignItems: 'flex-end' }}>
      <View style={{
        backgroundColor: '#FF5722',
        borderRadius: 28,
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
      }}>
        <SushiIcon name="plus" size="lg" color="#FFFFFF" />
      </View>
    </View>
  ),
};

// Complete Icon Gallery
export const IconGallery: Story = {
  render: () => {
    const allIcons = [
      'activity', 'airplay', 'alert-circle', 'alert-triangle', 'align-center', 'align-left', 'align-right',
      'anchor', 'archive', 'arrow-down', 'arrow-left', 'arrow-right', 'arrow-up', 'at-sign', 'award',
      'bell', 'bluetooth', 'bold', 'book', 'bookmark', 'box', 'briefcase',
      'calendar', 'camera', 'check', 'check-circle', 'chevron-down', 'chevron-left', 'chevron-right', 'chevron-up',
      'clipboard', 'clock', 'cloud', 'code', 'coffee', 'compass', 'copy', 'credit-card', 'crop',
      'dollar-sign', 'download', 'edit', 'eye', 'eye-off',
      'facebook', 'file', 'film', 'filter', 'flag', 'folder',
      'gift', 'globe', 'grid',
      'headphones', 'heart', 'help-circle', 'home',
      'image', 'inbox', 'info', 'instagram', 'italic',
      'key',
      'layers', 'link', 'list', 'lock', 'log-in', 'log-out',
      'mail', 'map', 'map-pin', 'maximize', 'menu', 'message-circle', 'mic', 'minimize', 'minus', 'monitor', 'moon', 'more-horizontal', 'more-vertical', 'music',
      'navigation',
      'package', 'paperclip', 'pause', 'percent', 'phone', 'play', 'plus', 'power', 'printer',
      'radio', 'refresh-cw',
      'save', 'search', 'send', 'settings', 'share', 'shield', 'shopping-bag', 'shopping-cart', 'sliders', 'smartphone', 'star', 'sun',
      'tag', 'target', 'thumbs-down', 'thumbs-up', 'trash-2', 'trending-up', 'truck', 'tv', 'twitter',
      'underline', 'unlock', 'upload', 'user', 'user-check', 'user-plus', 'users',
      'video', 'volume-2', 'volume-x',
      'wifi',
      'x', 'x-circle',
      'zap', 'zoom-in', 'zoom-out',
    ];

    return (
      <View style={{ gap: 16 }}>
        <SushiText variant="h4">Icon Gallery (Feather Icons)</SushiText>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {allIcons.map((icon) => (
            <View key={icon} style={{ alignItems: 'center', width: 70, padding: 8 }}>
              <SushiIcon name={icon} size="md" />
              <SushiText variant="caption" numberOfLines={1} style={{ marginTop: 4 }}>{icon}</SushiText>
            </View>
          ))}
        </View>
      </View>
    );
  },
};
