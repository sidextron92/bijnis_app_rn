import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Elements/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'destructive'],
      description: 'Button style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Button size',
    },
    cornerStyle: {
      control: 'select',
      options: ['rectangle', 'rounded', 'squircle'],
      description: 'Corner style: rectangle (sharp), rounded (standard), squircle (continuous curves)',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading spinner',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable button',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Full width button',
    },
  },
  args: {
    title: 'Button',
    variant: 'primary',
    size: 'md',
    cornerStyle: 'rounded',
    loading: false,
    disabled: false,
    fullWidth: false,
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, alignItems: 'flex-start' }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Button>;

// Primary Button
export const Primary: Story = {
  args: {
    title: 'Primary Button',
    variant: 'primary',
  },
};

// Secondary Button
export const Secondary: Story = {
  args: {
    title: 'Secondary Button',
    variant: 'secondary',
  },
};

// Outline Button
export const Outline: Story = {
  args: {
    title: 'Outline Button',
    variant: 'outline',
  },
};

// Ghost Button
export const Ghost: Story = {
  args: {
    title: 'Ghost Button',
    variant: 'ghost',
  },
};

// Destructive Button
export const Destructive: Story = {
  args: {
    title: 'Delete',
    variant: 'destructive',
  },
};

// Sizes
export const Small: Story = {
  args: {
    title: 'Small Button',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    title: 'Medium Button',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    title: 'Large Button',
    size: 'lg',
  },
};

// States
export const Loading: Story = {
  args: {
    title: 'Loading...',
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    title: 'Disabled Button',
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    title: 'Full Width Button',
    fullWidth: true,
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, width: '100%' }}>
        <Story />
      </View>
    ),
  ],
};

// All Variants
export const AllVariants: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Button title="Primary" variant="primary" />
      <Button title="Secondary" variant="secondary" />
      <Button title="Outline" variant="outline" />
      <Button title="Ghost" variant="ghost" />
      <Button title="Destructive" variant="destructive" />
    </View>
  ),
};

// All Sizes
export const AllSizes: Story = {
  render: () => (
    <View style={{ gap: 12, alignItems: 'flex-start' }}>
      <Button title="Small" size="sm" />
      <Button title="Medium" size="md" />
      <Button title="Large" size="lg" />
    </View>
  ),
};

// Rectangle Corner Style
export const RectangleCorners: Story = {
  args: {
    title: 'Rectangle Button',
    cornerStyle: 'rectangle',
  },
};

// Rounded Corner Style
export const RoundedCorners: Story = {
  args: {
    title: 'Rounded Button',
    cornerStyle: 'rounded',
  },
};

// Squircle Corner Style
export const SquircleCorners: Story = {
  args: {
    title: 'Squircle Button',
    cornerStyle: 'squircle',
  },
};

// All Corner Styles Comparison
export const AllCornerStyles: Story = {
  render: () => (
    <View style={{ gap: 12, alignItems: 'flex-start' }}>
      <Button title="Rectangle" cornerStyle="rectangle" />
      <Button title="Rounded" cornerStyle="rounded" />
      <Button title="Squircle" cornerStyle="squircle" />
    </View>
  ),
};

// Corner Styles with Variants
export const CornerStylesWithVariants: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <View style={{ gap: 8 }}>
        <Button title="Primary Rectangle" variant="primary" cornerStyle="rectangle" />
        <Button title="Primary Rounded" variant="primary" cornerStyle="rounded" />
        <Button title="Primary Squircle" variant="primary" cornerStyle="squircle" />
      </View>
      <View style={{ gap: 8 }}>
        <Button title="Outline Rectangle" variant="outline" cornerStyle="rectangle" />
        <Button title="Outline Rounded" variant="outline" cornerStyle="rounded" />
        <Button title="Outline Squircle" variant="outline" cornerStyle="squircle" />
      </View>
    </View>
  ),
};
