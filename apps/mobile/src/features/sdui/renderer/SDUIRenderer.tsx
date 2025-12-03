import React from 'react';
import { View, StyleSheet } from 'react-native';
import type { SDUIWidget } from '../types';
import { WidgetRegistry } from '../components/WidgetRegistry';
import { SushiLoader } from 'design-system';
import { spacing } from '@/theme/spacing';

interface SDUIRendererProps {
  widgets: SDUIWidget[];
  isLoading?: boolean;
}

export function SDUIRenderer({ widgets, isLoading }: SDUIRendererProps) {
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <SushiLoader size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {widgets.map((widget, index) => {
        const WidgetComponent = WidgetRegistry[widget.type];

        if (!WidgetComponent) {
          console.warn(`Unknown widget type: ${widget.type}`);
          return null;
        }

        return (
          <View key={`${widget.type}-${index}`} style={widget.style}>
            <WidgetComponent {...widget.data} />
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing['3xl'],
  },
});
