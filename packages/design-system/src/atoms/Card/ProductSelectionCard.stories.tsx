import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { ProductSelectionCard } from './ProductSelectionCard';
import { ThemeProvider } from '../../theme';

const meta: Meta<typeof ProductSelectionCard> = {
  title: 'Sushi/Atoms/Card/ProductSelectionCard',
  component: ProductSelectionCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
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
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    colorIndicator: '#23c417',
    colorName: 'Green',
    sizeInfo: 'UK Sizes- Adult',
    price: '₹ 200/Pair',
    priceNote: '(Including GST)',
  },
};

export const WithImage: Story = {
  args: {
    imageSource: { uri: 'https://via.placeholder.com/56' },
    colorIndicator: '#23c417',
    colorName: 'Green',
    sizeInfo: 'UK Sizes- Adult',
    price: '₹ 200/Pair',
    priceNote: '(Including GST)',
  },
};

export const DifferentColor: Story = {
  args: {
    colorIndicator: '#FF0000',
    colorName: 'Red',
    sizeInfo: 'UK Sizes- Adult',
    price: '₹ 250/Pair',
    priceNote: '(Including GST)',
  },
};

export const NoColorInfo: Story = {
  args: {
    sizeInfo: 'UK Sizes- Adult',
    price: '₹ 200/Pair',
    priceNote: '(Including GST)',
  },
};

export const MinimalInfo: Story = {
  args: {
    colorName: 'Blue',
    price: '₹ 180/Pair',
  },
};
