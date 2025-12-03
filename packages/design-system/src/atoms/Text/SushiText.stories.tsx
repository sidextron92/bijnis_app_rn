import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { SushiText, H1, H2, H3, H4, Body, BodySmall, Label, Caption } from './SushiText';
import { ThemeProvider } from '../../theme';

const meta: Meta<typeof SushiText> = {
  title: 'Sushi/Atoms/Text',
  component: SushiText,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'body', 'bodySmall', 'label', 'caption', 'button', 'link', 'code', 'overline'],
      description: 'Text variant (semantic style)',
    },
    weight: {
      control: 'select',
      options: ['light', 'regular', 'medium', 'semibold', 'bold', 'extrabold'],
      description: 'Font weight',
    },
    size: {
      control: 'select',
      options: ['050', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
      description: 'Font size from typography matrix',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'disabled', 'inverse', 'link', 'error', 'success', 'warning'],
      description: 'Text color',
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: 'Text alignment',
    },
    italic: {
      control: 'boolean',
      description: 'Italic style',
    },
    underline: {
      control: 'boolean',
      description: 'Underline decoration',
    },
    strikethrough: {
      control: 'boolean',
      description: 'Strikethrough decoration',
    },
  },
  args: {
    children: 'Hello Sushi!',
    variant: 'body',
    color: 'primary',
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
type Story = StoryObj<typeof SushiText>;

// Default
export const Default: Story = {
  args: {
    children: 'Default Text',
  },
};

// Typography Matrix - Weight × Size
export const TypographyMatrix: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <SushiText variant="h3">Typography Matrix (Weight × Size)</SushiText>
      <View style={{ gap: 8 }}>
        <SushiText weight="light" size="400">Light 400</SushiText>
        <SushiText weight="regular" size="400">Regular 400</SushiText>
        <SushiText weight="medium" size="400">Medium 400</SushiText>
        <SushiText weight="semibold" size="400">Semibold 400</SushiText>
        <SushiText weight="bold" size="400">Bold 400</SushiText>
        <SushiText weight="extrabold" size="400">Extrabold 400</SushiText>
      </View>
    </View>
  ),
};

// All Variants
export const AllVariants: Story = {
  render: () => (
    <View style={{ gap: 8 }}>
      <H1>H1 - Display Heading</H1>
      <H2>H2 - Page Heading</H2>
      <H3>H3 - Section Heading</H3>
      <H4>H4 - Subsection Heading</H4>
      <Body>Body - Regular body text for content</Body>
      <BodySmall>Body Small - Secondary body text</BodySmall>
      <Label>Label - Form labels and UI labels</Label>
      <Caption>Caption - Captions and helper text</Caption>
      <SushiText variant="button">Button - Button text</SushiText>
      <SushiText variant="link">Link - Clickable link text</SushiText>
      <SushiText variant="code">Code - Monospace code text</SushiText>
      <SushiText variant="overline">OVERLINE - ALL CAPS LABEL</SushiText>
    </View>
  ),
};

// Colors
export const Colors: Story = {
  render: () => (
    <View style={{ gap: 8 }}>
      <SushiText color="primary">Primary - Main text color</SushiText>
      <SushiText color="secondary">Secondary - Supporting text</SushiText>
      <SushiText color="tertiary">Tertiary - Subtle text</SushiText>
      <SushiText color="disabled">Disabled - Inactive text</SushiText>
      <SushiText color="link">Link - Clickable text</SushiText>
      <SushiText color="error">Error - Error message</SushiText>
      <SushiText color="success">Success - Success message</SushiText>
      <SushiText color="warning">Warning - Warning message</SushiText>
    </View>
  ),
};

// Font Sizes
export const FontSizes: Story = {
  render: () => (
    <View style={{ gap: 8 }}>
      <SushiText size="050">Size 050 (10px)</SushiText>
      <SushiText size="100">Size 100 (11px)</SushiText>
      <SushiText size="200">Size 200 (12px)</SushiText>
      <SushiText size="300">Size 300 (13px)</SushiText>
      <SushiText size="400">Size 400 (14px)</SushiText>
      <SushiText size="500">Size 500 (16px)</SushiText>
      <SushiText size="600">Size 600 (18px)</SushiText>
      <SushiText size="700">Size 700 (20px)</SushiText>
      <SushiText size="800">Size 800 (24px)</SushiText>
      <SushiText size="900">Size 900 (32px)</SushiText>
    </View>
  ),
};

// Text Decorations
export const TextDecorations: Story = {
  render: () => (
    <View style={{ gap: 8 }}>
      <SushiText italic>Italic text style</SushiText>
      <SushiText underline>Underlined text</SushiText>
      <SushiText strikethrough>Strikethrough text</SushiText>
      <SushiText italic underline>Italic and underlined</SushiText>
    </View>
  ),
};

// Alignment
export const Alignment: Story = {
  render: () => (
    <View style={{ gap: 8, width: 300 }}>
      <SushiText align="left">Left aligned text</SushiText>
      <SushiText align="center">Center aligned text</SushiText>
      <SushiText align="right">Right aligned text</SushiText>
    </View>
  ),
};

// Number of Lines (Truncation)
export const Truncation: Story = {
  render: () => (
    <View style={{ gap: 16, width: 200 }}>
      <View>
        <SushiText variant="label" color="secondary">Single line:</SushiText>
        <SushiText numberOfLines={1}>
          This is a very long text that will be truncated to a single line with ellipsis at the end.
        </SushiText>
      </View>
      <View>
        <SushiText variant="label" color="secondary">Two lines:</SushiText>
        <SushiText numberOfLines={2}>
          This is a very long text that will be truncated to two lines with ellipsis at the end. Adding more text to demonstrate the truncation behavior.
        </SushiText>
      </View>
    </View>
  ),
};

// Headings Showcase
export const Headings: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <H1>Heading 1 - 32px Bold</H1>
      <H2>Heading 2 - 24px Bold</H2>
      <H3>Heading 3 - 20px Semibold</H3>
      <H4>Heading 4 - 18px Semibold</H4>
    </View>
  ),
};

// Body Text
export const BodyText: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Body>
        Body text is used for the main content of your application. It should be easily readable and comfortable for long-form content.
      </Body>
      <BodySmall>
        Body small is used for secondary content, descriptions, and supporting information. It's slightly smaller but still readable.
      </BodySmall>
      <Caption>
        Captions are used for image descriptions, timestamps, and other metadata.
      </Caption>
    </View>
  ),
};
