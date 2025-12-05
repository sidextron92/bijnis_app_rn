import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { SizeGuideTable } from './SizeGuideTable';
import { ThemeProvider } from '../../theme';

const meta: Meta<typeof SizeGuideTable> = {
  title: 'Sushi/Atoms/Table/SizeGuideTable',
  component: SizeGuideTable,
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
    rowLabels: ['Length (Inch)', 'Chest (Inch)'],
    sizeColumns: [
      { size: 'S', values: ['24', '34'] },
      { size: 'M', values: ['24', '34'] },
      { size: 'L', values: ['24', '34'] },
      { size: 'XL', values: ['24', '34'] },
      { size: 'XXL', values: ['24', '34'] },
      { size: 'XXXL', values: ['24', '34'] },
    ],
  },
};

export const WithFooterNote: Story = {
  args: {
    rowLabels: ['Length (Inch)', 'Chest (Inch)'],
    sizeColumns: [
      { size: 'S', values: ['24', '34'] },
      { size: 'M', values: ['24', '34'] },
      { size: 'L', values: ['24', '34'] },
      { size: 'XL', values: ['24', '34'] },
      { size: 'XXL', values: ['24', '34'] },
      { size: 'XXXL', values: ['24', '34'] },
    ],
    footerNote: '**0.75 +/- inches may vary on physical product due to wash/shrinkage**',
  },
};

export const ThreeMeasurements: Story = {
  args: {
    rowLabels: ['Length (Inch)', 'Chest (Inch)', 'Waist (Inch)'],
    sizeColumns: [
      { size: 'S', values: ['24', '34', '28'] },
      { size: 'M', values: ['26', '36', '30'] },
      { size: 'L', values: ['28', '38', '32'] },
      { size: 'XL', values: ['30', '40', '34'] },
    ],
    footerNote: 'All measurements are approximate',
  },
};

export const FewerSizes: Story = {
  args: {
    rowLabels: ['Length (Inch)', 'Chest (Inch)'],
    sizeColumns: [
      { size: 'S', values: ['24', '34'] },
      { size: 'M', values: ['26', '36'] },
      { size: 'L', values: ['28', '38'] },
    ],
  },
};

export const DarkMode: Story = {
  args: {
    rowLabels: ['Length (Inch)', 'Chest (Inch)'],
    sizeColumns: [
      { size: 'S', values: ['24', '34'] },
      { size: 'M', values: ['24', '34'] },
      { size: 'L', values: ['24', '34'] },
      { size: 'XL', values: ['24', '34'] },
      { size: 'XXL', values: ['24', '34'] },
      { size: 'XXXL', values: ['24', '34'] },
    ],
    footerNote: '**0.75 +/- inches may vary on physical product due to wash/shrinkage**',
  },
  decorators: [
    (Story) => (
      <ThemeProvider initialMode="dark">
        <View style={{ padding: 16, backgroundColor: '#000' }}>
          <Story />
        </View>
      </ThemeProvider>
    ),
  ],
};
