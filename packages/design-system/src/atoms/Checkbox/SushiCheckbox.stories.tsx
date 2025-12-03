import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { SushiCheckbox } from './SushiCheckbox';
import { SushiText } from '../Text/SushiText';
import { ThemeProvider } from '../../theme';

const meta: Meta<typeof SushiCheckbox> = {
  title: 'Sushi/Atoms/Checkbox',
  component: SushiCheckbox,
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Checked state',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Indeterminate state (partial selection)',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Checkbox size',
    },
    colorScheme: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error'],
      description: 'Color scheme',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    label: {
      control: 'text',
      description: 'Checkbox label',
    },
  },
  args: {
    checked: false,
    size: 'md',
    colorScheme: 'primary',
    disabled: false,
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
type Story = StoryObj<typeof SushiCheckbox>;

// Default
export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
  },
};

// Checked
export const Checked: Story = {
  args: {
    label: 'Checked checkbox',
    checked: true,
  },
};

// Indeterminate
export const Indeterminate: Story = {
  args: {
    label: 'Indeterminate state',
    indeterminate: true,
  },
};

// Disabled States
export const DisabledUnchecked: Story = {
  args: {
    label: 'Disabled unchecked',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled checked',
    checked: true,
    disabled: true,
  },
};

// All Sizes
export const AllSizes: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <SushiCheckbox label="Small checkbox" size="sm" />
      <SushiCheckbox label="Medium checkbox" size="md" />
      <SushiCheckbox label="Large checkbox" size="lg" />
    </View>
  ),
};

// All Color Schemes
export const AllColorSchemes: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <SushiCheckbox label="Primary" colorScheme="primary" checked />
      <SushiCheckbox label="Secondary" colorScheme="secondary" checked />
      <SushiCheckbox label="Success" colorScheme="success" checked />
      <SushiCheckbox label="Warning" colorScheme="warning" checked />
      <SushiCheckbox label="Error" colorScheme="error" checked />
    </View>
  ),
};

// Without Label
export const WithoutLabel: Story = {
  args: {
    checked: true,
  },
};

// States Comparison
export const StatesComparison: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <View style={{ flexDirection: 'row', gap: 24, alignItems: 'center' }}>
        <SushiCheckbox label="Unchecked" />
        <SushiCheckbox label="Checked" checked />
        <SushiCheckbox label="Indeterminate" indeterminate />
      </View>
      <View style={{ flexDirection: 'row', gap: 24, alignItems: 'center' }}>
        <SushiCheckbox label="Disabled" disabled />
        <SushiCheckbox label="Disabled Checked" checked disabled />
        <SushiCheckbox label="Disabled Indeterminate" indeterminate disabled />
      </View>
    </View>
  ),
};

// Interactive Example
const InteractiveCheckbox = () => {
  const [checked, setChecked] = useState(false);
  return (
    <SushiCheckbox
      label={checked ? 'Checked!' : 'Click to check'}
      checked={checked}
      onChange={setChecked}
    />
  );
};

export const Interactive: Story = {
  render: () => <InteractiveCheckbox />,
};

// Checkbox Group Example
const CheckboxGroupExample = () => {
  const [selected, setSelected] = useState<string[]>(['option1']);

  const toggle = (value: string) => {
    setSelected(prev =>
      prev.includes(value)
        ? prev.filter(v => v !== value)
        : [...prev, value]
    );
  };

  return (
    <View style={{ gap: 12 }}>
      <SushiText variant="label" weight="semibold">Select your interests:</SushiText>
      <SushiCheckbox
        label="Technology"
        checked={selected.includes('option1')}
        onChange={() => toggle('option1')}
      />
      <SushiCheckbox
        label="Design"
        checked={selected.includes('option2')}
        onChange={() => toggle('option2')}
      />
      <SushiCheckbox
        label="Business"
        checked={selected.includes('option3')}
        onChange={() => toggle('option3')}
      />
      <SushiCheckbox
        label="Marketing"
        checked={selected.includes('option4')}
        onChange={() => toggle('option4')}
      />
      <SushiText variant="caption" color="secondary">
        Selected: {selected.length > 0 ? selected.join(', ') : 'None'}
      </SushiText>
    </View>
  );
};

export const CheckboxGroup: Story = {
  render: () => <CheckboxGroupExample />,
};

// Select All Example
const SelectAllExample = () => {
  const [items, setItems] = useState([
    { id: 1, label: 'Item 1', checked: true },
    { id: 2, label: 'Item 2', checked: false },
    { id: 3, label: 'Item 3', checked: true },
    { id: 4, label: 'Item 4', checked: false },
  ]);

  const allChecked = items.every(item => item.checked);
  const someChecked = items.some(item => item.checked) && !allChecked;

  const toggleAll = () => {
    setItems(items.map(item => ({ ...item, checked: !allChecked })));
  };

  const toggleItem = (id: number) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  return (
    <View style={{ gap: 12 }}>
      <SushiCheckbox
        label="Select All"
        checked={allChecked}
        indeterminate={someChecked}
        onChange={toggleAll}
      />
      <View style={{ marginLeft: 24, gap: 8 }}>
        {items.map(item => (
          <SushiCheckbox
            key={item.id}
            label={item.label}
            checked={item.checked}
            onChange={() => toggleItem(item.id)}
          />
        ))}
      </View>
    </View>
  );
};

export const SelectAll: Story = {
  render: () => <SelectAllExample />,
};

// Form Integration
export const FormIntegration: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <SushiText variant="h4">Preferences</SushiText>
      <View style={{ gap: 12 }}>
        <SushiCheckbox
          label="Receive email notifications"
          checked
        />
        <SushiCheckbox
          label="Receive SMS notifications"
        />
        <SushiCheckbox
          label="Subscribe to newsletter"
        />
      </View>
      <View style={{ marginTop: 16, gap: 12 }}>
        <SushiCheckbox
          label="I agree to the Terms of Service"
          colorScheme="primary"
          required
        />
        <SushiCheckbox
          label="I agree to the Privacy Policy"
          colorScheme="primary"
          required
        />
      </View>
    </View>
  ),
};
