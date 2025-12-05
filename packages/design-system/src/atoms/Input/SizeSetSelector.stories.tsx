import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { SizeSetSelector } from './SizeSetSelector';
import { ThemeProvider } from '../../theme';

const meta: Meta<typeof SizeSetSelector> = {
  title: 'Sushi/Atoms/Input/SizeSetSelector',
  component: SizeSetSelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider initialMode="light">
        <View style={{ padding: 20 }}>
          <Story />
        </View>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 0,
    min: 0,
    max: 99,
  },
};

export const WithValue: Story = {
  args: {
    value: 4,
    min: 0,
    max: 99,
  },
};

export const Interactive = () => {
  const [value, setValue] = useState(0);

  return (
    <SizeSetSelector
      value={value}
      onChange={setValue}
      min={0}
      max={99}
    />
  );
};

export const LimitedRange: Story = {
  args: {
    value: 5,
    min: 0,
    max: 10,
  },
};

export const WithStep: Story = {
  args: {
    value: 0,
    min: 0,
    max: 100,
    step: 5,
  },
};

export const Disabled: Story = {
  args: {
    value: 4,
    min: 0,
    max: 99,
    disabled: true,
  },
};

export const AtMinimum: Story = {
  args: {
    value: 0,
    min: 0,
    max: 99,
  },
};

export const AtMaximum: Story = {
  args: {
    value: 99,
    min: 0,
    max: 99,
  },
};
