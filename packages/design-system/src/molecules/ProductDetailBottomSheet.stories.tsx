import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { ProductDetailBottomSheet } from './ProductDetailBottomSheet';
import { SushiButton } from '../atoms/Button/SushiButton';
import { ThemeProvider } from '../theme';

const meta: Meta<typeof ProductDetailBottomSheet> = {
  title: 'Sushi/Atoms/BottomSheet/ProductDetailBottomSheet',
  component: ProductDetailBottomSheet,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider initialMode="light">
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockProductInfo = {
  colorIndicator: '#23c417',
  colorName: 'Green',
  sizeInfo: 'UK Sizes- Adult',
  price: '₹ 200/Pair',
  priceNote: '(Including GST)',
};

const mockSizeGuide = {
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
};

const mockDeliveryOptions = [
  {
    id: 'express',
    variant: 'express' as const,
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
  {
    id: 'prebook',
    variant: 'prebook' as const,
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
];

export const Interactive = () => {
  const [visible, setVisible] = useState(false);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <SushiButton
        title="Open Product Details"
        onPress={() => setVisible(true)}
      />

      <ProductDetailBottomSheet
        visible={visible}
        onDismissRequest={() => setVisible(false)}
        productInfo={mockProductInfo}
        sizeGuide={mockSizeGuide}
        deliveryOptions={mockDeliveryOptions}
        onAddItems={(selections) => {
          console.log('Selected items:', selections);
          alert(`Selected items: ${JSON.stringify(selections, null, 2)}`);
          setVisible(false);
        }}
      />
    </View>
  );
};

export const WithoutSizeGuide = () => {
  const [visible, setVisible] = useState(false);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <SushiButton
        title="Open Product Details (No Size Guide)"
        onPress={() => setVisible(true)}
      />

      <ProductDetailBottomSheet
        visible={visible}
        onDismissRequest={() => setVisible(false)}
        productInfo={mockProductInfo}
        deliveryOptions={mockDeliveryOptions}
        showSizeGuide={false}
        onAddItems={(selections) => {
          console.log('Selected items:', selections);
          setVisible(false);
        }}
      />
    </View>
  );
};

export const SingleDeliveryOption = () => {
  const [visible, setVisible] = useState(false);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <SushiButton
        title="Open Product Details (Express Only)"
        onPress={() => setVisible(true)}
      />

      <ProductDetailBottomSheet
        visible={visible}
        onDismissRequest={() => setVisible(false)}
        productInfo={mockProductInfo}
        sizeGuide={mockSizeGuide}
        deliveryOptions={[mockDeliveryOptions[0]]}
        onAddItems={(selections) => {
          console.log('Selected items:', selections);
          setVisible(false);
        }}
      />
    </View>
  );
};

export const PreBookOnly = () => {
  const [visible, setVisible] = useState(false);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <SushiButton
        title="Open Product Details (Pre-Book Only)"
        onPress={() => setVisible(true)}
      />

      <ProductDetailBottomSheet
        visible={visible}
        onDismissRequest={() => setVisible(false)}
        productInfo={mockProductInfo}
        sizeGuide={mockSizeGuide}
        deliveryOptions={[mockDeliveryOptions[1]]}
        onAddItems={(selections) => {
          console.log('Selected items:', selections);
          setVisible(false);
        }}
      />
    </View>
  );
};
