import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Card } from './Card';
import { Text } from '../primitives/Text';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['elevated', 'outlined', 'filled'],
      description: 'Card variant',
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Card padding',
    },
    cornerStyle: {
      control: 'select',
      options: ['rectangle', 'rounded', 'squircle'],
      description: 'Corner style: rectangle (sharp), rounded (standard), squircle (continuous curves)',
    },
    pressable: {
      control: 'boolean',
      description: 'Make card pressable',
    },
  },
  args: {
    variant: 'elevated',
    padding: 'md',
    cornerStyle: 'rounded',
    pressable: false,
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, backgroundColor: '#F5F5F5' }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Card>;

// Elevated Card
export const Elevated: Story = {
  args: {
    variant: 'elevated',
    children: (
      <View>
        <Text variant="h4">Elevated Card</Text>
        <Text variant="body" color="secondary">
          This card has a subtle shadow for depth.
        </Text>
      </View>
    ),
  },
};

// Outlined Card
export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: (
      <View>
        <Text variant="h4">Outlined Card</Text>
        <Text variant="body" color="secondary">
          This card has a border instead of shadow.
        </Text>
      </View>
    ),
  },
};

// Filled Card
export const Filled: Story = {
  args: {
    variant: 'filled',
    children: (
      <View>
        <Text variant="h4">Filled Card</Text>
        <Text variant="body" color="secondary">
          This card has a filled background.
        </Text>
      </View>
    ),
  },
};

// Pressable Card
export const Pressable: Story = {
  args: {
    variant: 'elevated',
    pressable: true,
    children: (
      <View>
        <Text variant="h4">Pressable Card</Text>
        <Text variant="body" color="secondary">
          Tap me! I have touch feedback.
        </Text>
      </View>
    ),
  },
};

// All Variants
export const AllVariants: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <Card variant="elevated">
        <Text variant="h4">Elevated</Text>
        <Text variant="bodySmall" color="secondary">With shadow</Text>
      </Card>
      <Card variant="outlined">
        <Text variant="h4">Outlined</Text>
        <Text variant="bodySmall" color="secondary">With border</Text>
      </Card>
      <Card variant="filled">
        <Text variant="h4">Filled</Text>
        <Text variant="bodySmall" color="secondary">With background</Text>
      </Card>
    </View>
  ),
};

// Rectangle Corner Style
export const RectangleCorners: Story = {
  args: {
    cornerStyle: 'rectangle',
    children: (
      <View>
        <Text variant="h4">Rectangle Corners</Text>
        <Text variant="body" color="secondary">
          Sharp 90° corners with no border radius.
        </Text>
      </View>
    ),
  },
};

// Rounded Corner Style
export const RoundedCorners: Story = {
  args: {
    cornerStyle: 'rounded',
    children: (
      <View>
        <Text variant="h4">Rounded Corners</Text>
        <Text variant="body" color="secondary">
          Standard CSS border-radius with circular arc.
        </Text>
      </View>
    ),
  },
};

// Squircle Corner Style
export const SquircleCorners: Story = {
  args: {
    cornerStyle: 'squircle',
    children: (
      <View>
        <Text variant="h4">Squircle Corners</Text>
        <Text variant="body" color="secondary">
          Continuous corner curves like iOS app icons.
        </Text>
      </View>
    ),
  },
};

// All Corner Styles Comparison
export const AllCornerStyles: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <Card cornerStyle="rectangle">
        <Text variant="h4">Rectangle</Text>
        <Text variant="bodySmall" color="secondary">Sharp corners</Text>
      </Card>
      <Card cornerStyle="rounded">
        <Text variant="h4">Rounded</Text>
        <Text variant="bodySmall" color="secondary">Standard border-radius</Text>
      </Card>
      <Card cornerStyle="squircle">
        <Text variant="h4">Squircle</Text>
        <Text variant="bodySmall" color="secondary">Continuous curves (iOS-style)</Text>
      </Card>
    </View>
  ),
};
