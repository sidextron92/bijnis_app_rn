import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { SushiRadio, SushiRadioGroup } from './SushiRadio';
import { SushiText } from '../Text/SushiText';
import { SushiCard, SushiCardContent } from '../Card/SushiCard';
import { ThemeProvider } from '../../theme';

const meta: Meta<typeof SushiRadio> = {
  title: 'Sushi/Atoms/Radio',
  component: SushiRadio,
  tags: ['autodocs'],
  argTypes: {
    selected: {
      control: 'boolean',
      description: 'Selected state',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Radio button size',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    error: {
      control: 'boolean',
      description: 'Error state',
    },
    label: {
      control: 'text',
      description: 'Radio label',
    },
    description: {
      control: 'text',
      description: 'Description text',
    },
  },
  args: {
    selected: false,
    size: 'md',
    disabled: false,
    error: false,
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
type Story = StoryObj<typeof SushiRadio>;

// Default
export const Default: Story = {
  args: {
    label: 'Radio Option',
    onSelect: () => console.log('Selected'),
  },
};

// Selected
export const Selected: Story = {
  args: {
    label: 'Selected Option',
    selected: true,
    onSelect: () => console.log('Selected'),
  },
};

// Disabled States
export const DisabledUnselected: Story = {
  args: {
    label: 'Disabled unselected',
    disabled: true,
    onSelect: () => {},
  },
};

export const DisabledSelected: Story = {
  args: {
    label: 'Disabled selected',
    selected: true,
    disabled: true,
    onSelect: () => {},
  },
};

// Error State
export const ErrorState: Story = {
  args: {
    label: 'Error state',
    error: true,
    onSelect: () => {},
  },
};

// With Description
export const WithDescription: Story = {
  args: {
    label: 'Option with description',
    description: 'This is a helpful description for the option',
    selected: true,
    onSelect: () => {},
  },
};

// All Sizes
export const AllSizes: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <SushiRadio label="Small radio" size="sm" selected onSelect={() => {}} />
      <SushiRadio label="Medium radio" size="md" selected onSelect={() => {}} />
      <SushiRadio label="Large radio" size="lg" selected onSelect={() => {}} />
    </View>
  ),
};

// Without Label
export const WithoutLabel: Story = {
  args: {
    selected: true,
    onSelect: () => {},
  },
};

// States Comparison
export const StatesComparison: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <View style={{ flexDirection: 'row', gap: 24, alignItems: 'center' }}>
        <SushiRadio label="Unselected" selected={false} onSelect={() => {}} />
        <SushiRadio label="Selected" selected onSelect={() => {}} />
      </View>
      <View style={{ flexDirection: 'row', gap: 24, alignItems: 'center' }}>
        <SushiRadio label="Disabled" disabled selected={false} onSelect={() => {}} />
        <SushiRadio label="Disabled Selected" selected disabled onSelect={() => {}} />
      </View>
      <View style={{ flexDirection: 'row', gap: 24, alignItems: 'center' }}>
        <SushiRadio label="Error" error selected={false} onSelect={() => {}} />
        <SushiRadio label="Error Selected" error selected onSelect={() => {}} />
      </View>
    </View>
  ),
};

// Interactive Radio Group
const InteractiveRadioGroup = () => {
  const [selected, setSelected] = useState('option1');

  return (
    <View style={{ gap: 12 }}>
      <SushiText variant="label" weight="semibold">Select an option:</SushiText>
      <SushiRadio
        label="Option 1"
        selected={selected === 'option1'}
        onSelect={() => setSelected('option1')}
      />
      <SushiRadio
        label="Option 2"
        selected={selected === 'option2'}
        onSelect={() => setSelected('option2')}
      />
      <SushiRadio
        label="Option 3"
        selected={selected === 'option3'}
        onSelect={() => setSelected('option3')}
      />
      <SushiText variant="caption" color="secondary">
        Selected: {selected}
      </SushiText>
    </View>
  );
};

export const Interactive: Story = {
  render: () => <InteractiveRadioGroup />,
};

// Radio Group Component using SushiRadioGroup
const RadioGroupExample = () => {
  const [value, setValue] = useState('medium');

  const options = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
  ];

  return (
    <View style={{ gap: 8 }}>
      <SushiText variant="label" weight="semibold">Select size:</SushiText>
      <SushiRadioGroup
        value={value}
        onChange={setValue}
        options={options}
      />
    </View>
  );
};

export const RadioGroup: Story = {
  render: () => <RadioGroupExample />,
};

// Radio Group with Descriptions
const RadioGroupWithDescriptionsExample = () => {
  const [value, setValue] = useState('standard');

  const options = [
    { value: 'standard', label: 'Standard', description: 'Best for most users' },
    { value: 'premium', label: 'Premium', description: 'More features and priority support' },
    { value: 'enterprise', label: 'Enterprise', description: 'Custom solutions for large teams' },
  ];

  return (
    <View style={{ gap: 8 }}>
      <SushiText variant="label" weight="semibold">Select plan:</SushiText>
      <SushiRadioGroup
        value={value}
        onChange={setValue}
        options={options}
      />
    </View>
  );
};

export const RadioGroupWithDescriptions: Story = {
  render: () => <RadioGroupWithDescriptionsExample />,
};

// Horizontal Radio Group
const HorizontalRadioGroupExample = () => {
  const [value, setValue] = useState('left');

  return (
    <View style={{ gap: 8 }}>
      <SushiText variant="label" weight="semibold">Alignment:</SushiText>
      <View style={{ flexDirection: 'row', gap: 24 }}>
        <SushiRadio
          label="Left"
          selected={value === 'left'}
          onSelect={() => setValue('left')}
        />
        <SushiRadio
          label="Center"
          selected={value === 'center'}
          onSelect={() => setValue('center')}
        />
        <SushiRadio
          label="Right"
          selected={value === 'right'}
          onSelect={() => setValue('right')}
        />
      </View>
    </View>
  );
};

export const HorizontalRadioGroup: Story = {
  render: () => <HorizontalRadioGroupExample />,
};

// Payment Method Selection
const PaymentMethodExample = () => {
  const [method, setMethod] = useState('card');

  return (
    <View style={{ gap: 12 }}>
      <SushiText variant="h4">Payment Method</SushiText>
      <SushiCard variant="outlined" pressable style={{ borderColor: method === 'card' ? '#FF5722' : undefined }}>
        <SushiCardContent>
          <SushiRadio
            label="Credit/Debit Card"
            selected={method === 'card'}
            onSelect={() => setMethod('card')}
          />
        </SushiCardContent>
      </SushiCard>
      <SushiCard variant="outlined" pressable style={{ borderColor: method === 'upi' ? '#FF5722' : undefined }}>
        <SushiCardContent>
          <SushiRadio
            label="UPI"
            selected={method === 'upi'}
            onSelect={() => setMethod('upi')}
          />
        </SushiCardContent>
      </SushiCard>
      <SushiCard variant="outlined" pressable style={{ borderColor: method === 'netbanking' ? '#FF5722' : undefined }}>
        <SushiCardContent>
          <SushiRadio
            label="Net Banking"
            selected={method === 'netbanking'}
            onSelect={() => setMethod('netbanking')}
          />
        </SushiCardContent>
      </SushiCard>
      <SushiCard variant="outlined" pressable style={{ borderColor: method === 'cod' ? '#FF5722' : undefined }}>
        <SushiCardContent>
          <SushiRadio
            label="Cash on Delivery"
            selected={method === 'cod'}
            onSelect={() => setMethod('cod')}
          />
        </SushiCardContent>
      </SushiCard>
    </View>
  );
};

export const PaymentMethodSelection: Story = {
  render: () => <PaymentMethodExample />,
};

// Shipping Options
const ShippingOptionsExample = () => {
  const [shipping, setShipping] = useState('standard');

  return (
    <View style={{ gap: 12 }}>
      <SushiText variant="h4">Shipping Options</SushiText>
      <View style={{ gap: 8 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <SushiRadio
            label="Standard Shipping"
            selected={shipping === 'standard'}
            onSelect={() => setShipping('standard')}
          />
          <SushiText weight="semibold">Free</SushiText>
        </View>
        <SushiText variant="caption" color="secondary" style={{ marginLeft: 32 }}>
          Delivery in 5-7 business days
        </SushiText>
      </View>
      <View style={{ gap: 8 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <SushiRadio
            label="Express Shipping"
            selected={shipping === 'express'}
            onSelect={() => setShipping('express')}
          />
          <SushiText weight="semibold">$9.99</SushiText>
        </View>
        <SushiText variant="caption" color="secondary" style={{ marginLeft: 32 }}>
          Delivery in 2-3 business days
        </SushiText>
      </View>
      <View style={{ gap: 8 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <SushiRadio
            label="Same Day Delivery"
            selected={shipping === 'sameday'}
            onSelect={() => setShipping('sameday')}
          />
          <SushiText weight="semibold">$19.99</SushiText>
        </View>
        <SushiText variant="caption" color="secondary" style={{ marginLeft: 32 }}>
          Delivery by end of day
        </SushiText>
      </View>
    </View>
  );
};

export const ShippingOptions: Story = {
  render: () => <ShippingOptionsExample />,
};

// Survey Question
const SurveyQuestionExample = () => {
  const [rating, setRating] = useState('');

  return (
    <View style={{ gap: 16 }}>
      <SushiText variant="h4">How satisfied are you with our service?</SushiText>
      <View style={{ gap: 8 }}>
        <SushiRadio
          label="Very Satisfied"
          selected={rating === 'very-satisfied'}
          onSelect={() => setRating('very-satisfied')}
        />
        <SushiRadio
          label="Satisfied"
          selected={rating === 'satisfied'}
          onSelect={() => setRating('satisfied')}
        />
        <SushiRadio
          label="Neutral"
          selected={rating === 'neutral'}
          onSelect={() => setRating('neutral')}
        />
        <SushiRadio
          label="Dissatisfied"
          selected={rating === 'dissatisfied'}
          onSelect={() => setRating('dissatisfied')}
        />
        <SushiRadio
          label="Very Dissatisfied"
          selected={rating === 'very-dissatisfied'}
          onSelect={() => setRating('very-dissatisfied')}
        />
      </View>
    </View>
  );
};

export const SurveyQuestion: Story = {
  render: () => <SurveyQuestionExample />,
};

// Form Integration
const FormIntegrationExample = () => {
  const [gender, setGender] = useState('');
  const [ageGroup, setAgeGroup] = useState('25-34');

  return (
    <View style={{ gap: 24 }}>
      <View style={{ gap: 8 }}>
        <SushiText variant="label" weight="semibold">Gender</SushiText>
        <View style={{ flexDirection: 'row', gap: 24 }}>
          <SushiRadio
            label="Male"
            selected={gender === 'male'}
            onSelect={() => setGender('male')}
          />
          <SushiRadio
            label="Female"
            selected={gender === 'female'}
            onSelect={() => setGender('female')}
          />
          <SushiRadio
            label="Other"
            selected={gender === 'other'}
            onSelect={() => setGender('other')}
          />
        </View>
      </View>
      <View style={{ gap: 8 }}>
        <SushiText variant="label" weight="semibold">Age Group</SushiText>
        <View style={{ gap: 8 }}>
          <SushiRadio
            label="Under 18"
            selected={ageGroup === 'under-18'}
            onSelect={() => setAgeGroup('under-18')}
          />
          <SushiRadio
            label="18-24"
            selected={ageGroup === '18-24'}
            onSelect={() => setAgeGroup('18-24')}
          />
          <SushiRadio
            label="25-34"
            selected={ageGroup === '25-34'}
            onSelect={() => setAgeGroup('25-34')}
          />
          <SushiRadio
            label="35-44"
            selected={ageGroup === '35-44'}
            onSelect={() => setAgeGroup('35-44')}
          />
          <SushiRadio
            label="45+"
            selected={ageGroup === '45-plus'}
            onSelect={() => setAgeGroup('45-plus')}
          />
        </View>
      </View>
    </View>
  );
};

export const FormIntegration: Story = {
  render: () => <FormIntegrationExample />,
};

// Disabled Radio Group
const DisabledRadioGroupExample = () => {
  const [value, setValue] = useState('option2');

  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3', disabled: true },
  ];

  return (
    <View style={{ gap: 8 }}>
      <SushiText variant="label" weight="semibold">Select option (Option 3 disabled):</SushiText>
      <SushiRadioGroup
        value={value}
        onChange={setValue}
        options={options}
      />
    </View>
  );
};

export const DisabledOptions: Story = {
  render: () => <DisabledRadioGroupExample />,
};
