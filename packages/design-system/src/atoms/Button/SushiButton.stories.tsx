import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { SushiButton } from './SushiButton';
import { ThemeProvider } from '../../theme';

const meta: Meta<typeof SushiButton> = {
  title: 'Sushi/Atoms/Button',
  component: SushiButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'text', 'underline'],
      description: 'Button style variant',
    },
    colorScheme: {
      control: 'select',
      options: ['primary', 'secondary', 'destructive', 'success'],
      description: 'Color scheme',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Button size',
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
    variant: 'solid',
    colorScheme: 'primary',
    size: 'md',
    loading: false,
    disabled: false,
    fullWidth: false,
  },
  decorators: [
    (Story) => (
      <ThemeProvider initialMode="light">
        <View style={{ padding: 16, alignItems: 'flex-start' }}>
          <Story />
        </View>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SushiButton>;

// Default
export const Default: Story = {
  args: {
    title: 'Sushi Button',
  },
};

// Solid Variants
export const SolidPrimary: Story = {
  args: {
    title: 'Primary',
    variant: 'solid',
    colorScheme: 'primary',
  },
};

export const SolidSecondary: Story = {
  args: {
    title: 'Secondary',
    variant: 'solid',
    colorScheme: 'secondary',
  },
};

export const SolidSuccess: Story = {
  args: {
    title: 'Success',
    variant: 'solid',
    colorScheme: 'success',
  },
};

export const SolidDestructive: Story = {
  args: {
    title: 'Destructive',
    variant: 'solid',
    colorScheme: 'destructive',
  },
};

// Outline Variants
export const OutlinePrimary: Story = {
  args: {
    title: 'Outline Primary',
    variant: 'outline',
    colorScheme: 'primary',
  },
};

export const OutlineSecondary: Story = {
  args: {
    title: 'Outline Secondary',
    variant: 'outline',
    colorScheme: 'secondary',
  },
};

// Text Variants
export const TextPrimary: Story = {
  args: {
    title: 'Text Button',
    variant: 'text',
    colorScheme: 'primary',
  },
};

// Underline Variants
export const UnderlinePrimary: Story = {
  args: {
    title: 'Underline Button',
    variant: 'underline',
    colorScheme: 'primary',
  },
};

// All Variants
export const AllVariants: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <SushiButton title="Solid" variant="solid" colorScheme="primary" />
      <SushiButton title="Outline" variant="outline" colorScheme="primary" />
      <SushiButton title="Text" variant="text" colorScheme="primary" />
      <SushiButton title="Underline" variant="underline" colorScheme="primary" />
    </View>
  ),
};

// All Color Schemes
export const AllColorSchemes: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <SushiButton title="Primary" colorScheme="primary" />
      <SushiButton title="Secondary" colorScheme="secondary" />
      <SushiButton title="Success" colorScheme="success" />
      <SushiButton title="Destructive" colorScheme="destructive" />
    </View>
  ),
};

// Sizes
export const AllSizes: Story = {
  render: () => (
    <View style={{ gap: 12, alignItems: 'flex-start' }}>
      <SushiButton title="Small" size="sm" />
      <SushiButton title="Medium" size="md" />
      <SushiButton title="Large" size="lg" />
    </View>
  ),
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
    title: 'Disabled',
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
      <ThemeProvider initialMode="light">
        <View style={{ padding: 16, width: '100%' }}>
          <Story />
        </View>
      </ThemeProvider>
    ),
  ],
};

// With Icons
export const WithLeftIcon: Story = {
  args: {
    title: 'Add Item',
    leftIcon: 'plus',
  },
};

export const WithRightIcon: Story = {
  args: {
    title: 'Next',
    rightIcon: 'chevron-right',
  },
};

export const WithBothIcons: Story = {
  args: {
    title: 'Navigate',
    leftIcon: 'map-pin',
    rightIcon: 'arrow-right',
  },
};

// Icon Only
export const IconOnly: Story = {
  args: {
    leftIcon: 'heart',
    title: '',
  },
};

// Outline Color Schemes
export const OutlineColorSchemes: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <SushiButton title="Primary" variant="outline" colorScheme="primary" />
      <SushiButton title="Secondary" variant="outline" colorScheme="secondary" />
      <SushiButton title="Success" variant="outline" colorScheme="success" />
      <SushiButton title="Destructive" variant="outline" colorScheme="destructive" />
    </View>
  ),
};

// Text Color Schemes
export const TextColorSchemes: Story = {
  render: () => (
    <View style={{ gap: 8 }}>
      <SushiButton title="Primary" variant="text" colorScheme="primary" />
      <SushiButton title="Secondary" variant="text" colorScheme="secondary" />
      <SushiButton title="Success" variant="text" colorScheme="success" />
      <SushiButton title="Destructive" variant="text" colorScheme="destructive" />
    </View>
  ),
};

// Size Comparison
export const SizeComparison: Story = {
  render: () => (
    <View style={{ gap: 24 }}>
      <View style={{ gap: 8 }}>
        <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
          <SushiButton title="Small" size="sm" />
          <SushiButton title="Medium" size="md" />
          <SushiButton title="Large" size="lg" />
        </View>
      </View>
      <View style={{ gap: 8 }}>
        <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
          <SushiButton title="Small" size="sm" variant="outline" />
          <SushiButton title="Medium" size="md" variant="outline" />
          <SushiButton title="Large" size="lg" variant="outline" />
        </View>
      </View>
    </View>
  ),
};

// Button States Comparison
export const StateComparison: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <View style={{ flexDirection: 'row', gap: 12 }}>
        <SushiButton title="Default" />
        <SushiButton title="Disabled" disabled />
        <SushiButton title="Loading" loading />
      </View>
      <View style={{ flexDirection: 'row', gap: 12 }}>
        <SushiButton title="Default" variant="outline" />
        <SushiButton title="Disabled" variant="outline" disabled />
        <SushiButton title="Loading" variant="outline" loading />
      </View>
    </View>
  ),
};

// Destructive Actions
export const DestructiveActions: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <SushiButton title="Delete" colorScheme="destructive" />
      <SushiButton title="Remove" variant="outline" colorScheme="destructive" />
      <SushiButton title="Cancel" variant="text" colorScheme="destructive" />
    </View>
  ),
};
