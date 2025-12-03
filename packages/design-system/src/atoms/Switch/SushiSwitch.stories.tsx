import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { SushiSwitch } from './SushiSwitch';
import { SushiText } from '../Text/SushiText';
import { ThemeProvider } from '../../theme';

const meta: Meta<typeof SushiSwitch> = {
  title: 'Sushi/Atoms/Switch',
  component: SushiSwitch,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'boolean',
      description: 'Switch on/off state',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Switch size',
    },
    colorScheme: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error'],
      description: 'Color scheme when active',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    label: {
      control: 'text',
      description: 'Switch label',
    },
    labelPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Label position',
    },
  },
  args: {
    value: false,
    size: 'md',
    colorScheme: 'primary',
    disabled: false,
    labelPosition: 'right',
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
type Story = StoryObj<typeof SushiSwitch>;

// Default
export const Default: Story = {
  args: {
    label: 'Enable notifications',
  },
};

// On State
export const On: Story = {
  args: {
    label: 'Switch is on',
    value: true,
  },
};

// Off State
export const Off: Story = {
  args: {
    label: 'Switch is off',
    value: false,
  },
};

// Disabled States
export const DisabledOff: Story = {
  args: {
    label: 'Disabled off',
    disabled: true,
    value: false,
  },
};

export const DisabledOn: Story = {
  args: {
    label: 'Disabled on',
    disabled: true,
    value: true,
  },
};

// All Sizes
export const AllSizes: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <SushiSwitch label="Small switch" size="sm" value />
      <SushiSwitch label="Medium switch" size="md" value />
      <SushiSwitch label="Large switch" size="lg" value />
    </View>
  ),
};

// All Color Schemes
export const AllColorSchemes: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <SushiSwitch label="Primary" colorScheme="primary" value />
      <SushiSwitch label="Secondary" colorScheme="secondary" value />
      <SushiSwitch label="Success" colorScheme="success" value />
      <SushiSwitch label="Warning" colorScheme="warning" value />
      <SushiSwitch label="Error" colorScheme="error" value />
    </View>
  ),
};

// Label Positions
export const LabelPositions: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <SushiSwitch label="Label on right" labelPosition="right" value />
      <SushiSwitch label="Label on left" labelPosition="left" value />
    </View>
  ),
};

// Without Label
export const WithoutLabel: Story = {
  args: {
    value: true,
  },
};

// Interactive Example
const InteractiveSwitch = () => {
  const [value, setValue] = useState(false);
  return (
    <SushiSwitch
      label={value ? 'Enabled' : 'Disabled'}
      value={value}
      onValueChange={setValue}
    />
  );
};

export const Interactive: Story = {
  render: () => <InteractiveSwitch />,
};

// Settings Page Example
const SettingsExample = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    autoUpdate: true,
    analytics: false,
    location: true,
  });

  const toggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <View style={{ gap: 16 }}>
      <SushiText variant="h4">Settings</SushiText>
      <View style={{ gap: 12 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <SushiText>Push Notifications</SushiText>
            <SushiText variant="caption" color="secondary">Receive push notifications</SushiText>
          </View>
          <SushiSwitch
            value={settings.notifications}
            onValueChange={() => toggle('notifications')}
          />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <SushiText>Dark Mode</SushiText>
            <SushiText variant="caption" color="secondary">Enable dark theme</SushiText>
          </View>
          <SushiSwitch
            value={settings.darkMode}
            onValueChange={() => toggle('darkMode')}
          />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <SushiText>Auto Update</SushiText>
            <SushiText variant="caption" color="secondary">Automatically update app</SushiText>
          </View>
          <SushiSwitch
            value={settings.autoUpdate}
            onValueChange={() => toggle('autoUpdate')}
          />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <SushiText>Analytics</SushiText>
            <SushiText variant="caption" color="secondary">Share usage data</SushiText>
          </View>
          <SushiSwitch
            value={settings.analytics}
            onValueChange={() => toggle('analytics')}
          />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <SushiText>Location Services</SushiText>
            <SushiText variant="caption" color="secondary">Allow location access</SushiText>
          </View>
          <SushiSwitch
            value={settings.location}
            onValueChange={() => toggle('location')}
            colorScheme="success"
          />
        </View>
      </View>
    </View>
  );
};

export const SettingsPage: Story = {
  render: () => <SettingsExample />,
};

// States Comparison
export const StatesComparison: Story = {
  render: () => (
    <View style={{ gap: 24 }}>
      <View>
        <SushiText variant="label" weight="semibold" style={{ marginBottom: 12 }}>Normal</SushiText>
        <View style={{ flexDirection: 'row', gap: 24 }}>
          <SushiSwitch label="Off" value={false} />
          <SushiSwitch label="On" value={true} />
        </View>
      </View>
      <View>
        <SushiText variant="label" weight="semibold" style={{ marginBottom: 12 }}>Disabled</SushiText>
        <View style={{ flexDirection: 'row', gap: 24 }}>
          <SushiSwitch label="Off" value={false} disabled />
          <SushiSwitch label="On" value={true} disabled />
        </View>
      </View>
    </View>
  ),
};

// Size Comparison
export const SizeComparison: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <View style={{ flexDirection: 'row', gap: 24, alignItems: 'center' }}>
        <SushiSwitch size="sm" value />
        <SushiSwitch size="md" value />
        <SushiSwitch size="lg" value />
      </View>
      <View style={{ flexDirection: 'row', gap: 24, alignItems: 'center' }}>
        <SushiSwitch size="sm" value={false} />
        <SushiSwitch size="md" value={false} />
        <SushiSwitch size="lg" value={false} />
      </View>
    </View>
  ),
};
