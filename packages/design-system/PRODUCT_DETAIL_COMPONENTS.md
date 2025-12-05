# Product Detail Bottom Sheet Components

This document provides a comprehensive guide to the modular product detail bottom sheet components created based on the Figma design.

## Overview

The product detail bottom sheet is composed of several reusable components that can be used independently or combined together:

1. **ProductSelectionCard** - Displays product image, color, size, and price information
2. **SizeGuideTable** - Shows a scrollable size guide table with measurements
3. **DeliveryOptionCard** - Displays delivery options with size set selections
4. **SizeSetSelector** - Quantity selector with +/- buttons
5. **ProductDetailBottomSheet** - Complete bottom sheet combining all components

## Components

### 1. ProductSelectionCard

Located: `packages/design-system/src/atoms/Card/ProductSelectionCard.tsx`

A horizontal card showing product thumbnail, color selection, and pricing.

```tsx
import { ProductSelectionCard } from 'design-system';

<ProductSelectionCard
  imageSource={require('./assets/shoe.png')}
  colorIndicator="#23c417"
  colorName="Green"
  sizeInfo="UK Sizes- Adult"
  price="₹ 200/Pair"
  priceNote="(Including GST)"
/>
```

**Props:**
- `imageSource?`: Product image
- `colorIndicator?`: Hex color for the color indicator circle
- `colorName?`: Color name text
- `sizeInfo?`: Size information text
- `price?`: Price with unit
- `priceNote?`: Additional price information (e.g., tax note)

---

### 2. SizeGuideTable

Located: `packages/design-system/src/atoms/Table/SizeGuideTable.tsx`

A scrollable table displaying size measurements across different sizes.

```tsx
import { SizeGuideTable } from 'design-system';

<SizeGuideTable
  rowLabels={["Length (Inch)", "Chest (Inch)"]}
  sizeColumns={[
    { size: "S", values: ["24", "34"] },
    { size: "M", values: ["24", "34"] },
    { size: "L", values: ["24", "34"] },
    { size: "XL", values: ["24", "34"] },
    { size: "XXL", values: ["24", "34"] },
    { size: "XXXL", values: ["24", "34"] },
  ]}
  footerNote="**0.75 +/- inches may vary on physical product due to wash/shrinkage**"
/>
```

**Props:**
- `rowLabels`: Array of measurement labels (e.g., ["Length (Inch)", "Chest (Inch)"])
- `sizeColumns`: Array of size column data with size and values
- `footerNote?`: Optional disclaimer text shown below the table

---

### 3. DeliveryOptionCard

Located: `packages/design-system/src/atoms/Card/DeliveryOptionCard.tsx`

A card displaying delivery options with an icon and list of available size sets.

```tsx
import { DeliveryOptionCard } from 'design-system';

<DeliveryOptionCard
  variant="express"
  deliveryTitle="60 Min Delivery"
  icon="🚀"
  sizeSets={[
    {
      sizeSet: "7/2, 8/1, 9/1",
      description: "4 Pairs per size set",
      quantity: 0,
      onQuantityChange: (qty) => console.log(qty),
    },
    {
      sizeSet: "7/2, 8/2",
      description: "4 Pairs per size set",
      extraPrice: "Extra price: ₹ 5/pair",
      quantity: 4,
      onQuantityChange: (qty) => console.log(qty),
    },
  ]}
/>
```

**Variants:**
- `express`: Orange border, for fast delivery (60 Min Delivery)
- `prebook`: Blue border, for pre-book orders

**Props:**
- `variant`: 'express' | 'prebook'
- `deliveryTitle`: Delivery option title
- `icon?`: Emoji icon to display
- `sizeSets`: Array of size set items
- `children?`: Custom content (for custom size set renderers)

---

### 4. SizeSetSelector

Located: `packages/design-system/src/atoms/Input/SizeSetSelector.tsx`

A quantity selector with increment/decrement buttons.

```tsx
import { SizeSetSelector } from 'design-system';

<SizeSetSelector
  value={4}
  onChange={(value) => console.log('New quantity:', value)}
  min={0}
  max={99}
  step={1}
/>
```

**Props:**
- `value`: Current quantity
- `onChange?`: Callback when value changes
- `min?`: Minimum value (default: 0)
- `max?`: Maximum value (default: undefined)
- `step?`: Increment step (default: 1)
- `disabled?`: Disabled state

---

### 5. ProductDetailBottomSheet

Located: `packages/design-system/src/molecules/ProductDetailBottomSheet.tsx`

A complete bottom sheet combining all the above components with a sticky ADD ITEMS button.

```tsx
import { ProductDetailBottomSheet } from 'design-system';
import { useState } from 'react';

function ProductScreen() {
  const [visible, setVisible] = useState(false);

  return (
    <ProductDetailBottomSheet
      visible={visible}
      onDismissRequest={() => setVisible(false)}
      productInfo={{
        imageSource: require('./assets/shoe.png'),
        colorIndicator: "#23c417",
        colorName: "Green",
        sizeInfo: "UK Sizes- Adult",
        price: "₹ 200/Pair",
        priceNote: "(Including GST)",
      }}
      sizeGuide={{
        rowLabels: ["Length (Inch)", "Chest (Inch)"],
        sizeColumns: [
          { size: "S", values: ["24", "34"] },
          { size: "M", values: ["24", "34"] },
          { size: "L", values: ["24", "34"] },
          { size: "XL", values: ["24", "34"] },
          { size: "XXL", values: ["24", "34"] },
          { size: "XXXL", values: ["24", "34"] },
        ],
        footerNote: "**0.75 +/- inches may vary on physical product due to wash/shrinkage**",
      }}
      deliveryOptions={[
        {
          id: "express",
          variant: "express",
          deliveryTitle: "60 Min Delivery",
          icon: "🚀",
          sizeSets: [
            {
              sizeSet: "7/2, 8/1, 9/1",
              description: "4 Pairs per size set",
              quantity: 0,
            },
            {
              sizeSet: "7/2, 8/2",
              description: "4 Pairs per size set",
              extraPrice: "Extra price: ₹ 5/pair",
              quantity: 0,
            },
          ],
        },
        {
          id: "prebook",
          variant: "prebook",
          deliveryTitle: "Pre Book: Delivery by 15 Oct",
          icon: "🕐",
          sizeSets: [
            {
              sizeSet: "7/2, 8/1, 9/1",
              description: "4 Pairs per size set",
              quantity: 0,
            },
            {
              sizeSet: "7/2, 8/2",
              description: "4 Pairs per size set",
              extraPrice: "Extra price: ₹ 5/pair",
              quantity: 0,
            },
          ],
        },
      ]}
      showSizeGuide={true}
      addItemsLabel="ADD ITEMS"
      onAddItems={(selections) => {
        console.log('Selected items:', selections);
        setVisible(false);
      }}
    />
  );
}
```

**Props:**
- All `SushiBottomSheet` props (visible, onDismissRequest, etc.)
- `productInfo`: ProductSelectionCardProps
- `sizeGuide?`: SizeGuideTableProps
- `deliveryOptions`: Array of delivery option data
- `addItemsLabel?`: Button label (default: "ADD ITEMS")
- `onAddItems?`: Callback with selections object
- `showSizeGuide?`: Show/hide size guide section (default: true)

---

## Features

### ✅ Modular Design
- Each component can be used independently
- Easy to compose and customize
- Follows the design system patterns

### ✅ Sticky Bottom Button
- ADD ITEMS button stays at the bottom
- Disabled when no items selected
- Shows opacity feedback on press

### ✅ Scrollable Content
- Bottom sheet content is scrollable
- Sticky button remains visible
- Smooth scroll behavior

### ✅ State Management
- Internal quantity state management
- Callback for external state updates
- Selections tracked per delivery option

### ✅ Theme Support
- Uses design system theme tokens
- Supports light/dark modes
- Consistent with existing components

### ✅ Type Safe
- Full TypeScript support
- Proper prop types and interfaces
- Autocomplete support in IDEs

---

## Usage with Existing ProductCard

The `ProductCard` component already has an `onAddPress` callback. You can use it to open the ProductDetailBottomSheet:

```tsx
import { ProductCard, ProductDetailBottomSheet } from 'design-system';
import { useState } from 'react';

function ProductListScreen() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

  return (
    <>
      <ProductCard
        title="Loafers LAND AD -1372"
        price="434"
        mrp="999"
        onAddPress={() => {
          setSelectedProduct(/* product data */);
          setBottomSheetVisible(true);
        }}
      />

      {selectedProduct && (
        <ProductDetailBottomSheet
          visible={bottomSheetVisible}
          onDismissRequest={() => setBottomSheetVisible(false)}
          productInfo={/* ... */}
          deliveryOptions={/* ... */}
          onAddItems={(selections) => {
            // Handle add to cart
            console.log(selections);
            setBottomSheetVisible(false);
          }}
        />
      )}
    </>
  );
}
```

---

## Customization Examples

### Custom Size Set Rendering

You can provide custom children to `DeliveryOptionCard` for complete control:

```tsx
<DeliveryOptionCard
  variant="express"
  deliveryTitle="60 Min Delivery"
  icon="🚀"
  sizeSets={sizeSets}
>
  <View style={{ padding: 16 }}>
    {sizeSets.map((sizeSet, index) => (
      <CustomSizeSetRow
        key={index}
        sizeSet={sizeSet}
        onQuantityChange={(qty) => handleQuantityChange(index, qty)}
      />
    ))}
  </View>
</DeliveryOptionCard>
```

### Without Size Guide

Simply set `showSizeGuide={false}` or omit the `sizeGuide` prop:

```tsx
<ProductDetailBottomSheet
  visible={visible}
  onDismissRequest={() => setVisible(false)}
  productInfo={/* ... */}
  deliveryOptions={/* ... */}
  showSizeGuide={false}
  onAddItems={(selections) => console.log(selections)}
/>
```

---

## File Locations

```
packages/design-system/src/
├── atoms/
│   ├── Card/
│   │   ├── ProductSelectionCard.tsx
│   │   └── DeliveryOptionCard.tsx
│   ├── Table/
│   │   └── SizeGuideTable.tsx
│   └── Input/
│       └── SizeSetSelector.tsx
└── molecules/
    └── ProductDetailBottomSheet.tsx
```

---

## Design System Integration

All components are:
- ✅ Exported from the design system package
- ✅ Follow existing naming conventions (Sushi prefix for atoms)
- ✅ Use design system tokens (spacing, colors, typography)
- ✅ Support theme system
- ✅ Include proper TypeScript types
- ✅ Have comprehensive JSDoc documentation

---

## Next Steps

1. **Add Storybook Stories**: Create interactive stories for each component
2. **Add Tests**: Write unit tests for component behavior
3. **Add Animations**: Enhance with smooth transitions
4. **Add Accessibility**: Add proper ARIA labels and keyboard navigation
5. **Optimize Performance**: Memoize components as needed

---

## Questions?

Refer to the inline JSDoc documentation in each component file for detailed prop descriptions and usage examples.
