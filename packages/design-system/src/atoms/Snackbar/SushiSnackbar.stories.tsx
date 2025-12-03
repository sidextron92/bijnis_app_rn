import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, StyleSheet } from 'react-native';
import { SushiSnackbar, SushiSnackbarHost, useSushiSnackbarHostState } from './SushiSnackbar';
import { SushiButton } from '../Button/SushiButton';
import { ThemeProvider } from '../../theme';

/**
 * SushiSnackbar displays brief messages at the bottom of the screen
 * with optional action buttons. Based on Zomato's Sushi Snackbar component.
 *
 * ## Features
 * - Multiple duration options (short, long, indefinite)
 * - Semantic variants (default, success, error, warning, info)
 * - Optional action button
 * - Position control (top/bottom)
 * - Queue management via host state
 */

const meta: Meta<typeof SushiSnackbar> = {
  title: 'Sushi/Atoms/Snackbar',
  component: SushiSnackbar,
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
type Story = StoryObj<typeof SushiSnackbar>;

// Demo wrapper with host
const SnackbarDemo: React.FC<{ variant?: 'default' | 'success' | 'error' | 'warning' | 'info' }> = ({
  variant = 'default',
}) => {
  const hostState = useSushiSnackbarHostState();

  const showSnackbar = () => {
    hostState.showSnackbar({
      message: `This is a ${variant} snackbar message`,
      variant,
      duration: 'long',
    });
  };

  return (
    <SushiSnackbarHost hostState={hostState}>
      <View style={styles.container}>
        <SushiButton title={`Show ${variant} Snackbar`} onPress={showSnackbar} />
      </View>
    </SushiSnackbarHost>
  );
};

const SnackbarWithActionDemo: React.FC = () => {
  const hostState = useSushiSnackbarHostState();

  const showSnackbar = () => {
    hostState.showSnackbar({
      message: 'Item deleted successfully',
      variant: 'default',
      duration: 'long',
      actionText: 'UNDO',
      onAction: () => {
        console.log('Undo action triggered');
      },
    });
  };

  return (
    <SushiSnackbarHost hostState={hostState}>
      <View style={styles.container}>
        <SushiButton title="Show Snackbar with Action" onPress={showSnackbar} />
      </View>
    </SushiSnackbarHost>
  );
};

const SnackbarQueueDemo: React.FC = () => {
  const hostState = useSushiSnackbarHostState();
  let counter = 0;

  const showMultiple = () => {
    for (let i = 0; i < 3; i++) {
      counter++;
      hostState.showSnackbar({
        message: `Message ${counter}`,
        variant: ['default', 'success', 'error'][i % 3] as 'default' | 'success' | 'error',
        duration: 'short',
      });
    }
  };

  return (
    <SushiSnackbarHost hostState={hostState}>
      <View style={styles.container}>
        <SushiButton title="Show Multiple Snackbars" onPress={showMultiple} />
      </View>
    </SushiSnackbarHost>
  );
};

const ControlledSnackbarDemo: React.FC = () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <View style={styles.container}>
      <SushiButton title="Toggle Snackbar" onPress={() => setVisible(!visible)} />
      <SushiSnackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        message="This is a controlled snackbar"
        variant="info"
        duration="indefinite"
        actionText="DISMISS"
        onAction={() => setVisible(false)}
      />
    </View>
  );
};

/**
 * Default snackbar with basic message
 */
export const Default: Story = {
  render: () => <SnackbarDemo variant="default" />,
};

/**
 * Success variant for positive feedback
 */
export const Success: Story = {
  render: () => <SnackbarDemo variant="success" />,
};

/**
 * Error variant for error messages
 */
export const Error: Story = {
  render: () => <SnackbarDemo variant="error" />,
};

/**
 * Warning variant for caution messages
 */
export const Warning: Story = {
  render: () => <SnackbarDemo variant="warning" />,
};

/**
 * Info variant for informational messages
 */
export const Info: Story = {
  render: () => <SnackbarDemo variant="info" />,
};

/**
 * Snackbar with action button
 */
export const WithAction: Story = {
  render: () => <SnackbarWithActionDemo />,
};

/**
 * Multiple snackbars queued
 */
export const QueuedSnackbars: Story = {
  render: () => <SnackbarQueueDemo />,
};

/**
 * Controlled snackbar (without host)
 */
export const Controlled: Story = {
  render: () => <ControlledSnackbarDemo />,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    minHeight: 400,
  },
});
