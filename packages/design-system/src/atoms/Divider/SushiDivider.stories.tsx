import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { SushiDivider } from './SushiDivider';
import { SushiText } from '../Text/SushiText';
import { ThemeProvider } from '../../theme';

const meta: Meta<typeof SushiDivider> = {
  title: 'Sushi/Atoms/Divider',
  component: SushiDivider,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Divider orientation',
    },
    variant: {
      control: 'select',
      options: ['solid', 'dashed', 'dotted'],
      description: 'Line style variant',
    },
    thickness: {
      control: 'select',
      options: ['thin', 'medium', 'thick'],
      description: 'Line thickness',
    },
    spacing: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Margin around divider',
    },
    color: {
      control: 'color',
      description: 'Custom color',
    },
  },
  args: {
    orientation: 'horizontal',
    variant: 'solid',
    thickness: 'thin',
    spacing: 'md',
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
type Story = StoryObj<typeof SushiDivider>;

// Default
export const Default: Story = {};

// All Variants
export const AllVariants: Story = {
  render: () => (
    <View style={{ gap: 24 }}>
      <View>
        <SushiText variant="label" color="secondary">Solid</SushiText>
        <SushiDivider variant="solid" />
      </View>
      <View>
        <SushiText variant="label" color="secondary">Dashed</SushiText>
        <SushiDivider variant="dashed" />
      </View>
      <View>
        <SushiText variant="label" color="secondary">Dotted</SushiText>
        <SushiDivider variant="dotted" />
      </View>
    </View>
  ),
};

// All Thicknesses
export const AllThicknesses: Story = {
  render: () => (
    <View style={{ gap: 24 }}>
      <View>
        <SushiText variant="label" color="secondary">Thin (1px)</SushiText>
        <SushiDivider thickness="thin" />
      </View>
      <View>
        <SushiText variant="label" color="secondary">Medium (2px)</SushiText>
        <SushiDivider thickness="medium" />
      </View>
      <View>
        <SushiText variant="label" color="secondary">Thick (4px)</SushiText>
        <SushiDivider thickness="thick" />
      </View>
    </View>
  ),
};

// Spacing Variants
export const SpacingVariants: Story = {
  render: () => (
    <View style={{ gap: 8 }}>
      <SushiText>Content above (no spacing)</SushiText>
      <SushiDivider spacing="none" />
      <SushiText>Content below</SushiText>

      <SushiText style={{ marginTop: 24 }}>Content above (sm)</SushiText>
      <SushiDivider spacing="sm" />
      <SushiText>Content below</SushiText>

      <SushiText style={{ marginTop: 24 }}>Content above (md)</SushiText>
      <SushiDivider spacing="md" />
      <SushiText>Content below</SushiText>

      <SushiText style={{ marginTop: 24 }}>Content above (lg)</SushiText>
      <SushiDivider spacing="lg" />
      <SushiText>Content below</SushiText>
    </View>
  ),
};

// Vertical Divider
export const VerticalDivider: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', alignItems: 'center', height: 40, gap: 16 }}>
      <SushiText>Item 1</SushiText>
      <SushiDivider orientation="vertical" />
      <SushiText>Item 2</SushiText>
      <SushiDivider orientation="vertical" />
      <SushiText>Item 3</SushiText>
    </View>
  ),
};

// With Text Label
export const WithTextLabel: Story = {
  render: () => (
    <View style={{ gap: 24 }}>
      <SushiDivider label="OR" />
      <SushiDivider label="Continue with" labelPosition="left" />
      <SushiDivider label="More options" labelPosition="right" />
    </View>
  ),
};

// Custom Colors
export const CustomColors: Story = {
  render: () => (
    <View style={{ gap: 24 }}>
      <SushiDivider color="#FF5722" thickness="medium" />
      <SushiDivider color="#2196F3" thickness="medium" />
      <SushiDivider color="#4CAF50" thickness="medium" />
      <SushiDivider color="#9C27B0" thickness="medium" />
    </View>
  ),
};

// List Dividers
export const ListDividers: Story = {
  render: () => (
    <View>
      {['Item 1', 'Item 2', 'Item 3', 'Item 4'].map((item, index, arr) => (
        <View key={item}>
          <View style={{ paddingVertical: 12 }}>
            <SushiText>{item}</SushiText>
          </View>
          {index < arr.length - 1 && <SushiDivider spacing="none" />}
        </View>
      ))}
    </View>
  ),
};

// Inset Dividers
export const InsetDividers: Story = {
  render: () => (
    <View>
      {['Email', 'Phone', 'Address', 'Website'].map((item, index, arr) => (
        <View key={item}>
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 12, gap: 12 }}>
            <View style={{ width: 40, height: 40, backgroundColor: '#E0E0E0', borderRadius: 20 }} />
            <SushiText>{item}</SushiText>
          </View>
          {index < arr.length - 1 && (
            <View style={{ marginLeft: 52 }}>
              <SushiDivider spacing="none" />
            </View>
          )}
        </View>
      ))}
    </View>
  ),
};

// Section Divider
export const SectionDivider: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <View>
        <SushiText variant="h4">Section 1</SushiText>
        <SushiText color="secondary">Content for section 1</SushiText>
      </View>
      <SushiDivider spacing="lg" thickness="medium" />
      <View>
        <SushiText variant="h4">Section 2</SushiText>
        <SushiText color="secondary">Content for section 2</SushiText>
      </View>
      <SushiDivider spacing="lg" thickness="medium" />
      <View>
        <SushiText variant="h4">Section 3</SushiText>
        <SushiText color="secondary">Content for section 3</SushiText>
      </View>
    </View>
  ),
};

// Menu Dividers
export const MenuDividers: Story = {
  render: () => (
    <View style={{ backgroundColor: '#FFFFFF', borderRadius: 8, padding: 8, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4 }}>
      <View style={{ paddingVertical: 8, paddingHorizontal: 12 }}>
        <SushiText>Cut</SushiText>
      </View>
      <View style={{ paddingVertical: 8, paddingHorizontal: 12 }}>
        <SushiText>Copy</SushiText>
      </View>
      <View style={{ paddingVertical: 8, paddingHorizontal: 12 }}>
        <SushiText>Paste</SushiText>
      </View>
      <SushiDivider spacing="sm" />
      <View style={{ paddingVertical: 8, paddingHorizontal: 12 }}>
        <SushiText>Select All</SushiText>
      </View>
      <SushiDivider spacing="sm" />
      <View style={{ paddingVertical: 8, paddingHorizontal: 12 }}>
        <SushiText color="error">Delete</SushiText>
      </View>
    </View>
  ),
};

// Toolbar Dividers
export const ToolbarDividers: Story = {
  render: () => (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#F5F5F5',
      padding: 8,
      borderRadius: 8,
      gap: 8,
    }}>
      <View style={{ padding: 8 }}>
        <SushiText variant="caption">Bold</SushiText>
      </View>
      <View style={{ padding: 8 }}>
        <SushiText variant="caption">Italic</SushiText>
      </View>
      <View style={{ padding: 8 }}>
        <SushiText variant="caption">Underline</SushiText>
      </View>
      <SushiDivider orientation="vertical" spacing="sm" />
      <View style={{ padding: 8 }}>
        <SushiText variant="caption">Left</SushiText>
      </View>
      <View style={{ padding: 8 }}>
        <SushiText variant="caption">Center</SushiText>
      </View>
      <View style={{ padding: 8 }}>
        <SushiText variant="caption">Right</SushiText>
      </View>
      <SushiDivider orientation="vertical" spacing="sm" />
      <View style={{ padding: 8 }}>
        <SushiText variant="caption">Link</SushiText>
      </View>
    </View>
  ),
};

// Complete Showcase
export const CompleteShowcase: Story = {
  render: () => (
    <View style={{ gap: 32 }}>
      <View>
        <SushiText variant="h4">Horizontal Dividers</SushiText>
        <SushiDivider />
        <SushiText color="secondary">Content below the divider</SushiText>
      </View>

      <View>
        <SushiText variant="h4">Vertical Dividers</SushiText>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8, gap: 12 }}>
          <SushiText>Left</SushiText>
          <SushiDivider orientation="vertical" />
          <SushiText>Right</SushiText>
        </View>
      </View>

      <View>
        <SushiText variant="h4">Styled Dividers</SushiText>
        <View style={{ gap: 12, marginTop: 8 }}>
          <SushiDivider variant="solid" spacing="sm" />
          <SushiDivider variant="dashed" spacing="sm" />
          <SushiDivider variant="dotted" spacing="sm" />
        </View>
      </View>

      <View>
        <SushiText variant="h4">With Labels</SushiText>
        <SushiDivider label="OR" spacing="md" />
      </View>
    </View>
  ),
};
