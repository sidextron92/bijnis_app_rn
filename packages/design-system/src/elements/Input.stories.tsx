import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Elements/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Input size',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable input',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Full width input',
    },
  },
  args: {
    placeholder: 'Enter text...',
    size: 'md',
    disabled: false,
    fullWidth: true,
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, width: 300 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Input>;

// Default Input
export const Default: Story = {
  args: {
    placeholder: 'Enter your name',
  },
};

// With Label
export const WithLabel: Story = {
  args: {
    label: 'Full Name',
    placeholder: 'Enter your name',
  },
};

// With Helper Text
export const WithHelperText: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    helperText: 'We will never share your email',
  },
};

// With Error
export const WithError: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter password',
    error: 'Password must be at least 8 characters',
  },
};

// Disabled
export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'Cannot edit this',
    disabled: true,
  },
};

// Sizes
export const Small: Story = {
  args: {
    size: 'sm',
    placeholder: 'Small input',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    placeholder: 'Large input',
  },
};

// All States
export const AllStates: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <Input label="Default" placeholder="Default input" />
      <Input label="With Helper" placeholder="With helper text" helperText="This is helper text" />
      <Input label="With Error" placeholder="With error" error="This field is required" />
      <Input label="Disabled" placeholder="Disabled input" disabled />
    </View>
  ),
};
