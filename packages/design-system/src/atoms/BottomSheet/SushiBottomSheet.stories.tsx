import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, StyleSheet } from 'react-native';
import { SushiBottomSheet, useSushiBottomSheetState } from './SushiBottomSheet';
import { SushiButton } from '../Button/SushiButton';
import { SushiText } from '../Text/SushiText';
import { ThemeProvider } from '../../theme';

/**
 * SushiBottomSheet slides up from the bottom of the screen to display
 * additional content. Based on Zomato's Sushi Bottom Sheet component.
 *
 * ## Features
 * - Multiple size presets (auto, small, medium, large, full)
 * - Drag to dismiss
 * - Customizable appearance (colors, corner radius)
 * - Header and footer support
 * - Scrollable content option
 * - Backdrop tap to dismiss
 */

const meta: Meta<typeof SushiBottomSheet> = {
  title: 'Sushi/Atoms/BottomSheet',
  component: SushiBottomSheet,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof SushiBottomSheet>;

// Demo wrapper
const BottomSheetDemo: React.FC<{ size?: 'auto' | 'small' | 'medium' | 'large' | 'full' }> = ({
  size = 'medium',
}) => {
  const { isVisible, show, hide } = useSushiBottomSheetState();

  return (
    <View style={styles.container}>
      <SushiButton title={`Open ${size} Bottom Sheet`} onPress={show} />
      <SushiBottomSheet
        visible={isVisible}
        onDismissRequest={hide}
        size={size}
      >
        <SushiText variant="h3" style={styles.title}>
          Bottom Sheet Title
        </SushiText>
        <SushiText variant="body" style={styles.content}>
          This is the content of the bottom sheet. You can put any content here
          including forms, lists, or other interactive elements.
        </SushiText>
        <SushiButton title="Close" onPress={hide} style={styles.button} />
      </SushiBottomSheet>
    </View>
  );
};

const BottomSheetWithHeaderFooter: React.FC = () => {
  const { isVisible, show, hide } = useSushiBottomSheetState();

  return (
    <View style={styles.container}>
      <SushiButton title="Open with Header/Footer" onPress={show} />
      <SushiBottomSheet
        visible={isVisible}
        onDismissRequest={hide}
        size="medium"
        header={
          <SushiText variant="h3">Settings</SushiText>
        }
        footer={
          <View style={styles.footerButtons}>
            <SushiButton title="Cancel" variant="outline" onPress={hide} style={styles.footerButton} />
            <SushiButton title="Save" onPress={hide} style={styles.footerButton} />
          </View>
        }
      >
        <SushiText variant="body">
          Configure your settings here. The header and footer are fixed while
          the content can scroll if needed.
        </SushiText>
      </SushiBottomSheet>
    </View>
  );
};

const ScrollableBottomSheet: React.FC = () => {
  const { isVisible, show, hide } = useSushiBottomSheetState();

  return (
    <View style={styles.container}>
      <SushiButton title="Open Scrollable Sheet" onPress={show} />
      <SushiBottomSheet
        visible={isVisible}
        onDismissRequest={hide}
        size="medium"
        scrollable
      >
        <SushiText variant="h3" style={styles.title}>
          Scrollable Content
        </SushiText>
        {Array.from({ length: 20 }, (_, i) => (
          <SushiText key={i} variant="body" style={styles.listItem}>
            Item {i + 1} - This is a list item in the scrollable bottom sheet
          </SushiText>
        ))}
      </SushiBottomSheet>
    </View>
  );
};

const NonDismissibleBottomSheet: React.FC = () => {
  const { isVisible, show, hide } = useSushiBottomSheetState();

  return (
    <View style={styles.container}>
      <SushiButton title="Open Non-dismissible Sheet" onPress={show} />
      <SushiBottomSheet
        visible={isVisible}
        onDismissRequest={hide}
        size="small"
        dismissOnClickOutside={false}
        dismissOnDrag={false}
        showHandle={false}
      >
        <SushiText variant="h3" style={styles.title}>
          Required Action
        </SushiText>
        <SushiText variant="body" style={styles.content}>
          This sheet can only be closed by pressing the button below.
        </SushiText>
        <SushiButton title="I Understand" onPress={hide} style={styles.button} />
      </SushiBottomSheet>
    </View>
  );
};

/**
 * Small bottom sheet (25% height)
 */
export const Small: Story = {
  render: () => <BottomSheetDemo size="small" />,
};

/**
 * Medium bottom sheet (50% height) - default
 */
export const Medium: Story = {
  render: () => <BottomSheetDemo size="medium" />,
};

/**
 * Large bottom sheet (75% height)
 */
export const Large: Story = {
  render: () => <BottomSheetDemo size="large" />,
};

/**
 * Full bottom sheet (95% height)
 */
export const Full: Story = {
  render: () => <BottomSheetDemo size="full" />,
};

/**
 * Bottom sheet with header and footer
 */
export const WithHeaderFooter: Story = {
  render: () => <BottomSheetWithHeaderFooter />,
};

/**
 * Scrollable content bottom sheet
 */
export const Scrollable: Story = {
  render: () => <ScrollableBottomSheet />,
};

/**
 * Non-dismissible bottom sheet
 */
export const NonDismissible: Story = {
  render: () => <NonDismissibleBottomSheet />,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    minHeight: 400,
  },
  title: {
    marginBottom: 12,
  },
  content: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
  footerButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  footerButton: {
    marginLeft: 8,
  },
  listItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
});
