import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { SushiTag } from './SushiTag';
import { SushiText } from '../Text/SushiText';
import { ThemeProvider } from '../../theme';

const meta: Meta<typeof SushiTag> = {
  title: 'Sushi/Atoms/Tag',
  component: SushiTag,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'subtle'],
      description: 'Tag style variant',
    },
    colorScheme: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'error', 'info'],
      description: 'Color scheme',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tag size',
    },
    label: {
      control: 'text',
      description: 'Tag text',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    selected: {
      control: 'boolean',
      description: 'Selected state',
    },
  },
  args: {
    label: 'Tag',
    variant: 'filled',
    colorScheme: 'primary',
    size: 'md',
    disabled: false,
    selected: false,
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
type Story = StoryObj<typeof SushiTag>;

// Default
export const Default: Story = {
  args: {
    label: 'Default Tag',
  },
};

// Filled Variants
export const FilledPrimary: Story = {
  args: {
    label: 'Primary',
    variant: 'filled',
    colorScheme: 'primary',
  },
};

export const FilledSuccess: Story = {
  args: {
    label: 'Success',
    variant: 'filled',
    colorScheme: 'success',
  },
};

export const FilledWarning: Story = {
  args: {
    label: 'Warning',
    variant: 'filled',
    colorScheme: 'warning',
  },
};

export const FilledError: Story = {
  args: {
    label: 'Error',
    variant: 'filled',
    colorScheme: 'error',
  },
};

// All Variants
export const AllVariants: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
        <SushiTag label="Filled" variant="filled" colorScheme="primary" />
        <SushiTag label="Outlined" variant="outlined" colorScheme="primary" />
        <SushiTag label="Subtle" variant="subtle" colorScheme="primary" />
      </View>
    </View>
  ),
};

// All Color Schemes - Filled
export const AllColorSchemesFilled: Story = {
  render: () => (
    <View style={{ gap: 8 }}>
      <SushiText variant="label" weight="semibold">Filled</SushiText>
      <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
        <SushiTag label="Default" variant="filled" colorScheme="default" />
        <SushiTag label="Primary" variant="filled" colorScheme="primary" />
        <SushiTag label="Success" variant="filled" colorScheme="success" />
        <SushiTag label="Warning" variant="filled" colorScheme="warning" />
        <SushiTag label="Error" variant="filled" colorScheme="error" />
        <SushiTag label="Info" variant="filled" colorScheme="info" />
      </View>
    </View>
  ),
};

// All Color Schemes - Outlined
export const AllColorSchemesOutlined: Story = {
  render: () => (
    <View style={{ gap: 8 }}>
      <SushiText variant="label" weight="semibold">Outlined</SushiText>
      <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
        <SushiTag label="Default" variant="outlined" colorScheme="default" />
        <SushiTag label="Primary" variant="outlined" colorScheme="primary" />
        <SushiTag label="Success" variant="outlined" colorScheme="success" />
        <SushiTag label="Warning" variant="outlined" colorScheme="warning" />
        <SushiTag label="Error" variant="outlined" colorScheme="error" />
        <SushiTag label="Info" variant="outlined" colorScheme="info" />
      </View>
    </View>
  ),
};

// All Color Schemes - Subtle
export const AllColorSchemesSubtle: Story = {
  render: () => (
    <View style={{ gap: 8 }}>
      <SushiText variant="label" weight="semibold">Subtle</SushiText>
      <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
        <SushiTag label="Default" variant="subtle" colorScheme="default" />
        <SushiTag label="Primary" variant="subtle" colorScheme="primary" />
        <SushiTag label="Success" variant="subtle" colorScheme="success" />
        <SushiTag label="Warning" variant="subtle" colorScheme="warning" />
        <SushiTag label="Error" variant="subtle" colorScheme="error" />
        <SushiTag label="Info" variant="subtle" colorScheme="info" />
      </View>
    </View>
  ),
};

// All Sizes
export const AllSizes: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
        <SushiTag label="Small" size="sm" />
        <SushiTag label="Medium" size="md" />
        <SushiTag label="Large" size="lg" />
      </View>
    </View>
  ),
};

// With Close Handler
export const WithCloseHandler: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
      <SushiTag
        label="React"
        onClose={() => console.log('Closed React')}
        rightIcon={<SushiText variant="caption">×</SushiText>}
      />
      <SushiTag
        label="TypeScript"
        colorScheme="info"
        onClose={() => console.log('Closed TypeScript')}
        rightIcon={<SushiText variant="caption">×</SushiText>}
      />
      <SushiTag
        label="React Native"
        colorScheme="success"
        onClose={() => console.log('Closed React Native')}
        rightIcon={<SushiText variant="caption">×</SushiText>}
      />
    </View>
  ),
};

// Selectable Tags
export const SelectableTags: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
      <SushiTag label="Option 1" onPress={() => console.log('Option 1')} />
      <SushiTag label="Option 2" selected onPress={() => console.log('Option 2')} />
      <SushiTag label="Option 3" onPress={() => console.log('Option 3')} />
    </View>
  ),
};

// Disabled
export const Disabled: Story = {
  args: {
    label: 'Disabled',
    disabled: true,
  },
};

// Selected
export const Selected: Story = {
  args: {
    label: 'Selected',
    selected: true,
  },
};

// Status Tags
export const StatusTags: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <SushiText variant="label" weight="semibold">Order Status</SushiText>
      <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
        <SushiTag label="Pending" variant="subtle" colorScheme="warning" />
        <SushiTag label="Processing" variant="subtle" colorScheme="primary" />
        <SushiTag label="Shipped" variant="subtle" colorScheme="info" />
        <SushiTag label="Delivered" variant="subtle" colorScheme="success" />
        <SushiTag label="Cancelled" variant="subtle" colorScheme="error" />
      </View>
    </View>
  ),
};

// Category Tags
export const CategoryTags: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <SushiText variant="label" weight="semibold">Categories</SushiText>
      <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
        <SushiTag label="Electronics" variant="outlined" />
        <SushiTag label="Clothing" variant="outlined" />
        <SushiTag label="Home & Garden" variant="outlined" />
        <SushiTag label="Sports" variant="outlined" />
        <SushiTag label="Books" variant="outlined" />
      </View>
    </View>
  ),
};

// Filter Tags Example
export const FilterTags: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <SushiText variant="label" weight="semibold">Active Filters</SushiText>
      <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
        <SushiTag
          label="Price: $10-$50"
          variant="subtle"
          colorScheme="default"
          rightIcon={<SushiText variant="caption">×</SushiText>}
          onClose={() => {}}
        />
        <SushiTag
          label="Brand: Nike"
          variant="subtle"
          colorScheme="default"
          rightIcon={<SushiText variant="caption">×</SushiText>}
          onClose={() => {}}
        />
        <SushiTag
          label="Size: M"
          variant="subtle"
          colorScheme="default"
          rightIcon={<SushiText variant="caption">×</SushiText>}
          onClose={() => {}}
        />
      </View>
    </View>
  ),
};

// Skill Tags
export const SkillTags: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <SushiText variant="label" weight="semibold">Skills</SushiText>
      <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
        <SushiTag label="JavaScript" variant="subtle" colorScheme="warning" />
        <SushiTag label="TypeScript" variant="subtle" colorScheme="primary" />
        <SushiTag label="React" variant="subtle" colorScheme="info" />
        <SushiTag label="Node.js" variant="subtle" colorScheme="success" />
        <SushiTag label="Python" variant="subtle" colorScheme="primary" />
        <SushiTag label="GraphQL" variant="subtle" colorScheme="error" />
      </View>
    </View>
  ),
};

// Compact Tags
export const CompactTags: Story = {
  render: () => (
    <View style={{ gap: 8 }}>
      <View style={{ flexDirection: 'row', gap: 4, flexWrap: 'wrap' }}>
        <SushiTag label="v1.0.0" size="sm" variant="outlined" colorScheme="default" />
        <SushiTag label="stable" size="sm" variant="subtle" colorScheme="success" />
        <SushiTag label="MIT" size="sm" variant="subtle" colorScheme="primary" />
      </View>
    </View>
  ),
};

// Complete Showcase
export const CompleteShowcase: Story = {
  render: () => (
    <View style={{ gap: 24 }}>
      <View style={{ gap: 8 }}>
        <SushiText variant="h4">Filled Tags</SushiText>
        <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
          <SushiTag label="Primary" variant="filled" colorScheme="primary" />
          <SushiTag label="Success" variant="filled" colorScheme="success" />
          <SushiTag label="Warning" variant="filled" colorScheme="warning" />
          <SushiTag label="Error" variant="filled" colorScheme="error" />
        </View>
      </View>
      <View style={{ gap: 8 }}>
        <SushiText variant="h4">Outlined Tags</SushiText>
        <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
          <SushiTag label="Primary" variant="outlined" colorScheme="primary" />
          <SushiTag label="Success" variant="outlined" colorScheme="success" />
          <SushiTag label="Warning" variant="outlined" colorScheme="warning" />
          <SushiTag label="Error" variant="outlined" colorScheme="error" />
        </View>
      </View>
      <View style={{ gap: 8 }}>
        <SushiText variant="h4">Subtle Tags</SushiText>
        <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
          <SushiTag label="Primary" variant="subtle" colorScheme="primary" />
          <SushiTag label="Success" variant="subtle" colorScheme="success" />
          <SushiTag label="Warning" variant="subtle" colorScheme="warning" />
          <SushiTag label="Error" variant="subtle" colorScheme="error" />
        </View>
      </View>
    </View>
  ),
};
