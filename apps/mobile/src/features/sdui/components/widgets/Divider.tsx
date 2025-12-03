import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from 'design-system';

interface DividerProps {
  height?: number;
  thickness?: number;
  color?: string;
}

export function Divider({ height, thickness, color }: DividerProps) {
  const { theme } = useTheme();
  const dividerHeight = height || thickness || 8;
  const backgroundColor = color || theme.colors.background.tertiary;

  return <View style={[styles.divider, { height: dividerHeight, backgroundColor }]} />;
}

const styles = StyleSheet.create({
  divider: {
    width: '100%',
  },
});
