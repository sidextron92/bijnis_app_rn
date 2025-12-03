import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, StyleSheet } from 'react-native';
import { SushiDropdown, DropdownItem, useSushiDropdownState } from './SushiDropdown';
import { SushiButton } from '../Button/SushiButton';
import { SushiText } from '../Text/SushiText';
import { ThemeProvider } from '../../theme';

const meta: Meta<typeof SushiDropdown> = {
  title: 'Sushi/Atoms/Dropdown',
  component: SushiDropdown,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SushiDropdown>;

const BasicDropdownExample = () => {
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const items: DropdownItem[] = [
    { id: '1', type: 'text', label: 'Edit', icon: 'edit' },
    { id: '2', type: 'text', label: 'Duplicate', icon: 'copy' },
    { id: '3', type: 'divider' },
    { id: '4', type: 'text', label: 'Delete', icon: 'trash', destructive: true },
  ];

  return (
    <View style={styles.container}>
      <SushiDropdown
        expanded={expanded}
        onDismiss={() => setExpanded(false)}
        items={items}
        onEvent={(event) => {
          if (event.type === 'text') {
            setSelected(event.item.label);
            setExpanded(false);
          }
        }}
      >
        <SushiButton
          title="Open Menu"
          onPress={() => setExpanded(true)}
        />
      </SushiDropdown>
      {selected && (
        <SushiText style={styles.selectedText}>
          Selected: {selected}
        </SushiText>
      )}
    </View>
  );
};

export const Basic: Story = {
  render: () => <BasicDropdownExample />,
};

const CheckboxDropdownExample = () => {
  const [expanded, setExpanded] = useState(false);
  const [items, setItems] = useState<DropdownItem[]>([
    { id: '1', type: 'checkbox', label: 'Show notifications', checked: true },
    { id: '2', type: 'checkbox', label: 'Enable sounds', checked: false },
    { id: '3', type: 'checkbox', label: 'Dark mode', checked: true },
  ]);

  return (
    <View style={styles.container}>
      <SushiDropdown
        expanded={expanded}
        onDismiss={() => setExpanded(false)}
        items={items}
        onEvent={(event) => {
          if (event.type === 'checkbox') {
            setItems((prev) =>
              prev.map((item) =>
                item.id === event.item.id
                  ? { ...item, checked: event.checked }
                  : item
              ) as DropdownItem[]
            );
          }
        }}
      >
        <SushiButton
          title="Settings"
          variant="outline"
          onPress={() => setExpanded(true)}
        />
      </SushiDropdown>
    </View>
  );
};

export const WithCheckboxes: Story = {
  render: () => <CheckboxDropdownExample />,
};

const RadioDropdownExample = () => {
  const [expanded, setExpanded] = useState(false);
  const [selectedId, setSelectedId] = useState('1');

  const items: DropdownItem[] = [
    { id: '1', type: 'radio', label: 'Small', selected: selectedId === '1' },
    { id: '2', type: 'radio', label: 'Medium', selected: selectedId === '2' },
    { id: '3', type: 'radio', label: 'Large', selected: selectedId === '3' },
  ];

  return (
    <View style={styles.container}>
      <SushiDropdown
        expanded={expanded}
        onDismiss={() => setExpanded(false)}
        items={items}
        onEvent={(event) => {
          if (event.type === 'radio') {
            setSelectedId(event.item.id);
          }
        }}
      >
        <SushiButton
          title="Select Size"
          variant="outline"
          onPress={() => setExpanded(true)}
        />
      </SushiDropdown>
    </View>
  );
};

export const WithRadioButtons: Story = {
  render: () => <RadioDropdownExample />,
};

const WithHookExample = () => {
  const dropdown = useSushiDropdownState();

  const items: DropdownItem[] = [
    { id: '1', type: 'text', label: 'Profile' },
    { id: '2', type: 'text', label: 'Settings' },
    { id: '3', type: 'divider' },
    { id: '4', type: 'text', label: 'Logout', destructive: true },
  ];

  return (
    <View style={styles.container}>
      <SushiDropdown
        expanded={dropdown.isExpanded}
        onDismiss={dropdown.close}
        items={items}
        onEvent={() => dropdown.close()}
      >
        <SushiButton title="Menu" onPress={dropdown.toggle} />
      </SushiDropdown>
    </View>
  );
};

export const UsingHook: Story = {
  render: () => <WithHookExample />,
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    minHeight: 300,
  },
  selectedText: {
    marginTop: 16,
    textAlign: 'center',
  },
});
