import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, StyleSheet } from 'react-native';
import { SushiDialog, SushiAlertDialog, useSushiDialogState } from './SushiDialog';
import { SushiButton } from '../Button/SushiButton';
import { SushiText } from '../Text/SushiText';
import { ThemeProvider } from '../../theme';

/**
 * SushiDialog is a customizable alert dialog component for displaying
 * information and requesting user decisions. Based on Zomato's Sushi Dialog.
 *
 * ## Features
 * - Optional header image
 * - Title and subtitle text
 * - Up to three configurable action buttons
 * - Flexible button layout (horizontal/vertical)
 * - Customizable dismissal behaviors
 * - Custom content support
 */

const meta: Meta<typeof SushiDialog> = {
  title: 'Sushi/Atoms/Dialog',
  component: SushiDialog,
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
type Story = StoryObj<typeof SushiDialog>;

// Basic dialog demo
const BasicDialogDemo: React.FC = () => {
  const { isVisible, show, hide } = useSushiDialogState();

  return (
    <View style={styles.container}>
      <SushiButton title="Show Basic Dialog" onPress={show} />
      <SushiDialog
        visible={isVisible}
        onDismissRequest={hide}
        title="Welcome!"
        subtitle="Thank you for using our app. We hope you enjoy the experience."
        positiveButton={{
          text: 'Get Started',
        }}
      />
    </View>
  );
};

// Confirmation dialog demo
const ConfirmationDialogDemo: React.FC = () => {
  const { isVisible, show, hide } = useSushiDialogState();

  return (
    <View style={styles.container}>
      <SushiButton title="Show Confirmation Dialog" onPress={show} />
      <SushiDialog
        visible={isVisible}
        onDismissRequest={hide}
        title="Confirm Action"
        subtitle="Are you sure you want to proceed? This action cannot be undone."
        positiveButton={{
          text: 'Confirm',
          onPress: () => console.log('Confirmed'),
        }}
        negativeButton={{
          text: 'Cancel',
          onPress: () => console.log('Cancelled'),
        }}
      />
    </View>
  );
};

// Destructive dialog demo
const DestructiveDialogDemo: React.FC = () => {
  const { isVisible, show, hide } = useSushiDialogState();

  return (
    <View style={styles.container}>
      <SushiButton title="Show Delete Dialog" onPress={show} colorScheme="destructive" />
      <SushiDialog
        visible={isVisible}
        onDismissRequest={hide}
        title="Delete Item?"
        subtitle="This will permanently delete the item and all associated data. This action cannot be undone."
        positiveButton={{
          text: 'Delete',
          colorScheme: 'destructive',
          onPress: () => console.log('Deleted'),
        }}
        negativeButton={{
          text: 'Cancel',
        }}
      />
    </View>
  );
};

// Vertical buttons dialog demo
const VerticalButtonsDemo: React.FC = () => {
  const { isVisible, show, hide } = useSushiDialogState();

  return (
    <View style={styles.container}>
      <SushiButton title="Show Vertical Buttons" onPress={show} />
      <SushiDialog
        visible={isVisible}
        onDismissRequest={hide}
        title="Choose an Option"
        subtitle="Select one of the following options to continue."
        alignment="vertical"
        positiveButton={{
          text: 'Option A - Primary Action',
          onPress: () => console.log('Option A'),
        }}
        negativeButton={{
          text: 'Option B - Secondary Action',
          onPress: () => console.log('Option B'),
        }}
        neutralButton={{
          text: 'Maybe Later',
          onPress: () => console.log('Neutral'),
        }}
      />
    </View>
  );
};

// Three buttons dialog demo
const ThreeButtonsDemo: React.FC = () => {
  const { isVisible, show, hide } = useSushiDialogState();

  return (
    <View style={styles.container}>
      <SushiButton title="Show Three Buttons" onPress={show} />
      <SushiDialog
        visible={isVisible}
        onDismissRequest={hide}
        title="Save Changes?"
        subtitle="You have unsaved changes. What would you like to do?"
        positiveButton={{
          text: 'Save',
          onPress: () => console.log('Saved'),
        }}
        negativeButton={{
          text: "Don't Save",
          onPress: () => console.log('Discarded'),
        }}
        neutralButton={{
          text: 'Cancel',
          onPress: () => console.log('Cancelled'),
        }}
      />
    </View>
  );
};

// Custom content dialog demo
const CustomContentDemo: React.FC = () => {
  const { isVisible, show, hide } = useSushiDialogState();

  return (
    <View style={styles.container}>
      <SushiButton title="Show Custom Content" onPress={show} />
      <SushiDialog
        visible={isVisible}
        onDismissRequest={hide}
        title="Terms of Service"
        positiveButton={{
          text: 'Accept',
          onPress: () => console.log('Accepted'),
        }}
        negativeButton={{
          text: 'Decline',
        }}
      >
        <View style={styles.customContent}>
          <SushiText variant="body">
            By continuing, you agree to our Terms of Service and Privacy Policy.
            Please read them carefully before proceeding.
          </SushiText>
          <View style={styles.checkbox}>
            <SushiText variant="caption">
              I have read and agree to the terms
            </SushiText>
          </View>
        </View>
      </SushiDialog>
    </View>
  );
};

// Alert dialog shorthand demo
const AlertDialogDemo: React.FC = () => {
  const { isVisible, show, hide } = useSushiDialogState();

  return (
    <View style={styles.container}>
      <SushiButton title="Show Alert Dialog" onPress={show} />
      <SushiAlertDialog
        visible={isVisible}
        onDismiss={hide}
        title="Session Expired"
        message="Your session has expired. Please log in again to continue."
        confirmText="Log In"
        cancelText="Later"
        onConfirm={() => console.log('Log in')}
        onCancel={() => console.log('Later')}
      />
    </View>
  );
};

// Non-dismissible dialog demo
const NonDismissibleDemo: React.FC = () => {
  const { isVisible, show, hide } = useSushiDialogState();

  return (
    <View style={styles.container}>
      <SushiButton title="Show Non-dismissible" onPress={show} />
      <SushiDialog
        visible={isVisible}
        onDismissRequest={hide}
        title="Update Required"
        subtitle="A new version of the app is available. Please update to continue using the app."
        dismissOnBackPress={false}
        dismissOnClickOutside={false}
        positiveButton={{
          text: 'Update Now',
          onPress: () => {
            console.log('Update');
            hide();
          },
        }}
      />
    </View>
  );
};

/**
 * Basic dialog with title and subtitle
 */
export const Basic: Story = {
  render: () => <BasicDialogDemo />,
};

/**
 * Confirmation dialog with two buttons
 */
export const Confirmation: Story = {
  render: () => <ConfirmationDialogDemo />,
};

/**
 * Destructive action dialog
 */
export const Destructive: Story = {
  render: () => <DestructiveDialogDemo />,
};

/**
 * Dialog with vertical button layout
 */
export const VerticalButtons: Story = {
  render: () => <VerticalButtonsDemo />,
};

/**
 * Dialog with three buttons
 */
export const ThreeButtons: Story = {
  render: () => <ThreeButtonsDemo />,
};

/**
 * Dialog with custom content
 */
export const CustomContent: Story = {
  render: () => <CustomContentDemo />,
};

/**
 * Simplified AlertDialog component
 */
export const AlertDialogShorthand: Story = {
  render: () => <AlertDialogDemo />,
};

/**
 * Non-dismissible dialog (must use button)
 */
export const NonDismissible: Story = {
  render: () => <NonDismissibleDemo />,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    minHeight: 400,
  },
  customContent: {
    marginTop: 8,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingVertical: 8,
  },
});
