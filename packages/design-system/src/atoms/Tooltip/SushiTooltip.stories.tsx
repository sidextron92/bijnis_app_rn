import React, { useState, useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, StyleSheet } from 'react-native';
import {
  SushiTooltip,
  SushiTooltipBox,
  SushiTooltipRef,
  useSushiTooltipState,
} from './SushiTooltip';
import { SushiButton } from '../Button/SushiButton';
import { SushiText } from '../Text/SushiText';
import { SushiIcon } from '../Icon/SushiIcon';
import { ThemeProvider } from '../../theme';

const meta: Meta<typeof SushiTooltip> = {
  title: 'Sushi/Atoms/Tooltip',
  component: SushiTooltip,
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
type Story = StoryObj<typeof SushiTooltip>;

const BasicExample = () => {
  const [visible, setVisible] = useState(false);
  const [anchorLayout, setAnchorLayout] = useState<any>(null);
  const buttonRef = useRef<View>(null);

  const handlePress = () => {
    buttonRef.current?.measureInWindow((x, y, width, height) => {
      setAnchorLayout({ x, y, width, height });
      setVisible(true);
    });
  };

  return (
    <View style={styles.container}>
      <View ref={buttonRef}>
        <SushiButton title="Show Tooltip" onPress={handlePress} />
      </View>
      <SushiTooltip
        visible={visible}
        text="This is a helpful tooltip!"
        position="top"
        onVisibilityChange={setVisible}
        anchorLayout={anchorLayout}
        autoDismissDelay={3000}
      />
    </View>
  );
};

export const Basic: Story = {
  render: () => <BasicExample />,
};

const PositionsExample = () => {
  const tooltipState = useSushiTooltipState();
  const [position, setPosition] = useState<'top' | 'bottom' | 'left' | 'right'>('top');
  const [anchorLayout, setAnchorLayout] = useState<any>(null);
  const buttonRef = useRef<View>(null);

  const showTooltip = (pos: typeof position) => {
    setPosition(pos);
    buttonRef.current?.measureInWindow((x, y, width, height) => {
      setAnchorLayout({ x, y, width, height });
      tooltipState.show();
    });
  };

  return (
    <View style={styles.positionsContainer}>
      <View style={styles.positionRow}>
        <SushiButton
          title="Top"
          variant="outline"
          size="sm"
          onPress={() => showTooltip('top')}
        />
      </View>
      <View style={styles.positionMiddle}>
        <SushiButton
          title="Left"
          variant="outline"
          size="sm"
          onPress={() => showTooltip('left')}
        />
        <View ref={buttonRef} style={styles.centerButton}>
          <SushiIcon name="info" size="lg" />
        </View>
        <SushiButton
          title="Right"
          variant="outline"
          size="sm"
          onPress={() => showTooltip('right')}
        />
      </View>
      <View style={styles.positionRow}>
        <SushiButton
          title="Bottom"
          variant="outline"
          size="sm"
          onPress={() => showTooltip('bottom')}
        />
      </View>
      <SushiTooltip
        visible={tooltipState.isVisible}
        text={`Tooltip on ${position}`}
        position={position}
        onVisibilityChange={tooltipState.setIsVisible}
        anchorLayout={anchorLayout}
        autoDismissDelay={2000}
      />
    </View>
  );
};

export const Positions: Story = {
  render: () => <PositionsExample />,
};

const TooltipBoxExample = () => {
  return (
    <View style={styles.container}>
      <SushiTooltipBox
        tooltip="Click to learn more!"
        position="top"
        triggerOnPress
      >
        <SushiButton title="Tap Me" variant="outline" />
      </SushiTooltipBox>
    </View>
  );
};

export const UsingTooltipBox: Story = {
  render: () => <TooltipBoxExample />,
};

const LongPressExample = () => {
  return (
    <View style={styles.container}>
      <SushiTooltipBox
        tooltip="This appears on long press!"
        position="bottom"
        triggerOnPress={false}
        triggerOnLongPress
      >
        <SushiButton title="Long Press Me" />
      </SushiTooltipBox>
    </View>
  );
};

export const LongPressTooltip: Story = {
  render: () => <LongPressExample />,
};

const CustomContentExample = () => {
  return (
    <View style={styles.container}>
      <SushiTooltipBox
        tooltip={({ hide }) => (
          <View style={styles.customTooltip}>
            <SushiText variant="caption" style={{ color: '#fff' }}>
              Custom tooltip content
            </SushiText>
            <SushiButton
              title="Got it"
              size="sm"
              variant="text"
              onPress={hide}
              style={{ marginTop: 8 }}
            />
          </View>
        )}
        position="bottom"
      >
        <SushiButton title="Custom Tooltip" variant="outline" />
      </SushiTooltipBox>
    </View>
  );
};

export const CustomContent: Story = {
  render: () => <CustomContentExample />,
};

const WithRefExample = () => {
  const tooltipRef = useRef<SushiTooltipRef>(null);

  return (
    <View style={styles.container}>
      <View style={styles.refControls}>
        <SushiButton
          title="Show"
          size="sm"
          onPress={() => tooltipRef.current?.show()}
        />
        <SushiButton
          title="Hide"
          size="sm"
          variant="outline"
          onPress={() => tooltipRef.current?.hide()}
        />
        <SushiButton
          title="Toggle"
          size="sm"
          variant="outline"
          onPress={() => tooltipRef.current?.toggle()}
        />
      </View>
      <SushiTooltipBox
        ref={tooltipRef}
        tooltip="Controlled via ref!"
        position="top"
        triggerOnPress={false}
      >
        <View style={styles.targetBox}>
          <SushiText variant="body">Target Element</SushiText>
        </View>
      </SushiTooltipBox>
    </View>
  );
};

export const ControlledWithRef: Story = {
  render: () => <WithRefExample />,
};

const styles = StyleSheet.create({
  container: {
    padding: 40,
    minHeight: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  positionsContainer: {
    padding: 60,
    alignItems: 'center',
  },
  positionRow: {
    marginVertical: 20,
  },
  positionMiddle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 30,
  },
  centerButton: {
    padding: 20,
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
  },
  customTooltip: {
    padding: 4,
    alignItems: 'center',
  },
  refControls: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24,
  },
  targetBox: {
    padding: 16,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderStyle: 'dashed',
  },
});
