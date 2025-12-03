import React from 'react';
import { View } from 'react-native';
import { spacing } from '@/theme/spacing';

interface SpacerProps {
  height?: number;
}

export function Spacer({ height = spacing.lg }: SpacerProps) {
  return <View style={{ height }} />;
}
