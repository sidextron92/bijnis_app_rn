import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { DeliveryOptionCard } from './DeliveryOptionCard';
import { ThemeProvider } from '../../theme';

const meta: Meta<typeof DeliveryOptionCard> = {
  title: 'Sushi/Atoms/Card/DeliveryOptionCard',
  component: DeliveryOptionCard,
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

export const ExpressDelivery: Story = {
  args: {
    variant: 'express',
    deliveryTitle: '60 Min Delivery',
    icon: '🚀',
    sizeSets: [
      {
        sizeSet: '7/2, 8/1, 9/1',
        description: '4 Pairs per size set',
        quantity: 0,
      },
      {
        sizeSet: '7/2, 8/2',
        description: '4 Pairs per size set',
        extraPrice: 'Extra price: ₹ 5/pair',
        quantity: 0,
      },
    ],
  },
};

export const PreBookDelivery: Story = {
  args: {
    variant: 'prebook',
    deliveryTitle: 'Pre Book: Delivery by 15 Oct',
    icon: '🕐',
    sizeSets: [
      {
        sizeSet: '7/2, 8/1, 9/1',
        description: '4 Pairs per size set',
        quantity: 0,
      },
      {
        sizeSet: '7/2, 8/2',
        description: '4 Pairs per size set',
        extraPrice: 'Extra price: ₹ 5/pair',
        quantity: 0,
      },
      {
        sizeSet: '6/1, 7/1, 8/2',
        description: '4 Pairs per size set',
        quantity: 0,
      },
    ],
  },
};

export const WithQuantities: Story = {
  args: {
    variant: 'express',
    deliveryTitle: '60 Min Delivery',
    icon: '🚀',
    sizeSets: [
      {
        sizeSet: '7/2, 8/1, 9/1',
        description: '4 Pairs per size set',
        quantity: 2,
      },
      {
        sizeSet: '7/2, 8/2',
        description: '4 Pairs per size set',
        extraPrice: 'Extra price: ₹ 5/pair',
        quantity: 4,
      },
    ],
  },
};

export const SingleSizeSet: Story = {
  args: {
    variant: 'express',
    deliveryTitle: '60 Min Delivery',
    icon: '🚀',
    sizeSets: [
      {
        sizeSet: '7/2, 8/1, 9/1',
        description: '4 Pairs per size set',
        quantity: 0,
      },
    ],
  },
};

export const DarkModeExpress: Story = {
  args: {
    variant: 'express',
    deliveryTitle: '60 Min Delivery',
    icon: '🚀',
    sizeSets: [
      {
        sizeSet: '7/2, 8/1, 9/1',
        description: '4 Pairs per size set',
        quantity: 0,
      },
      {
        sizeSet: '7/2, 8/2',
        description: '4 Pairs per size set',
        extraPrice: 'Extra price: ₹ 5/pair',
        quantity: 0,
      },
    ],
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

export const DarkModePreBook: Story = {
  args: {
    variant: 'prebook',
    deliveryTitle: 'Pre Book: Delivery by 15 Oct',
    icon: '🕐',
    sizeSets: [
      {
        sizeSet: '7/2, 8/1, 9/1',
        description: '4 Pairs per size set',
        quantity: 0,
      },
      {
        sizeSet: '7/2, 8/2',
        description: '4 Pairs per size set',
        extraPrice: 'Extra price: ₹ 5/pair',
        quantity: 0,
      },
    ],
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
