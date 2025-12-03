/**
 * SushiDropdown - Dropdown Menu Component
 *
 * A theme-aware customizable popup menu component that supports
 * text items, checkboxes, and radio buttons.
 *
 * @platform android
 * @platform ios
 * @platform web
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Modal,
  StyleSheet,
  Animated,
  Pressable,
  ScrollView,
  ViewStyle,
  LayoutRectangle,
  Dimensions,
} from 'react-native';
import { useTheme } from '../../theme';
import { SushiText } from '../Text/SushiText';
import { SushiIcon } from '../Icon/SushiIcon';
import { spacing, borderRadius, zIndex } from '../../tokens/dimensions';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

/**
 * Dropdown item types
 */
export type DropdownItemType = 'text' | 'checkbox' | 'radio' | 'divider';

/**
 * Base dropdown item
 */
export interface BaseDropdownItem {
  id: string;
  type: DropdownItemType;
  disabled?: boolean;
}

/**
 * Text item
 */
export interface TextDropdownItem extends BaseDropdownItem {
  type: 'text';
  label: string;
  icon?: string;
  destructive?: boolean;
}

/**
 * Checkbox item
 */
export interface CheckboxDropdownItem extends BaseDropdownItem {
  type: 'checkbox';
  label: string;
  checked: boolean;
}

/**
 * Radio button item
 */
export interface RadioDropdownItem extends BaseDropdownItem {
  type: 'radio';
  label: string;
  selected: boolean;
  group?: string;
}

/**
 * Divider item
 */
export interface DividerDropdownItem extends BaseDropdownItem {
  type: 'divider';
}

/**
 * Combined dropdown item type
 */
export type DropdownItem =
  | TextDropdownItem
  | CheckboxDropdownItem
  | RadioDropdownItem
  | DividerDropdownItem;

/**
 * Dropdown event types
 */
export type DropdownEvent =
  | { type: 'text'; item: TextDropdownItem }
  | { type: 'checkbox'; item: CheckboxDropdownItem; checked: boolean }
  | { type: 'radio'; item: RadioDropdownItem };

/**
 * Dropdown anchor position
 */
export interface DropdownOffset {
  x?: number;
  y?: number;
}

/**
 * Props for SushiDropdown
 */
export interface SushiDropdownProps {
  /** Whether the dropdown is visible */
  expanded: boolean;
  /** Callback when dismiss is requested */
  onDismiss: () => void;
  /** List of dropdown items */
  items: DropdownItem[];
  /** Callback when an item is selected/changed */
  onEvent?: (event: DropdownEvent) => void;
  /** Position offset from anchor */
  offset?: DropdownOffset;
  /** Container background color */
  containerColor?: string;
  /** Border style */
  border?: ViewStyle;
  /** Shadow elevation */
  shadowElevation?: number;
  /** Max height of dropdown */
  maxHeight?: number;
  /** Custom container style */
  style?: ViewStyle;
  /** Anchor layout rectangle */
  anchorLayout?: LayoutRectangle;
  /** Children (anchor element) */
  children?: React.ReactNode;
}

/**
 * SushiDropdown Component
 *
 * @example
 * ```tsx
 * const [expanded, setExpanded] = useState(false);
 *
 * <SushiDropdown
 *   expanded={expanded}
 *   onDismiss={() => setExpanded(false)}
 *   items={[
 *     { id: '1', type: 'text', label: 'Edit' },
 *     { id: '2', type: 'text', label: 'Delete', destructive: true },
 *   ]}
 *   onEvent={(event) => {
 *     if (event.type === 'text') {
 *       console.log('Selected:', event.item.label);
 *     }
 *     setExpanded(false);
 *   }}
 * >
 *   <Button title="Menu" onPress={() => setExpanded(true)} />
 * </SushiDropdown>
 * ```
 */
export const SushiDropdown: React.FC<SushiDropdownProps> = ({
  expanded,
  onDismiss,
  items,
  onEvent,
  offset = { x: 0, y: 0 },
  containerColor,
  border,
  shadowElevation = 8,
  maxHeight = SCREEN_HEIGHT * 0.4,
  style,
  anchorLayout,
  children,
}) => {
  const { theme } = useTheme();
  const [layout, setLayout] = useState<LayoutRectangle | null>(anchorLayout || null);
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    if (expanded) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 0.9,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [expanded, opacity, scale]);

  const handleLayout = useCallback(
    (event: { nativeEvent: { layout: LayoutRectangle } }) => {
      if (!anchorLayout) {
        setLayout(event.nativeEvent.layout);
      }
    },
    [anchorLayout]
  );

  const handleTextItemPress = useCallback(
    (item: TextDropdownItem) => {
      if (item.disabled) return;
      onEvent?.({ type: 'text', item });
    },
    [onEvent]
  );

  const handleCheckboxChange = useCallback(
    (item: CheckboxDropdownItem, checked: boolean) => {
      if (item.disabled) return;
      onEvent?.({ type: 'checkbox', item, checked });
    },
    [onEvent]
  );

  const handleRadioSelect = useCallback(
    (item: RadioDropdownItem) => {
      if (item.disabled) return;
      onEvent?.({ type: 'radio', item });
    },
    [onEvent]
  );

  const renderItem = (item: DropdownItem) => {
    switch (item.type) {
      case 'text':
        return (
          <Pressable
            key={item.id}
            style={({ pressed }) => [
              styles.menuItem,
              pressed && { backgroundColor: theme.colors.background.secondary },
              item.disabled && styles.disabled,
            ]}
            onPress={() => handleTextItemPress(item)}
            disabled={item.disabled}
          >
            {item.icon && (
              <SushiIcon
                name={item.icon}
                size="sm"
                color={
                  item.destructive
                    ? theme.colors.text.error
                    : item.disabled
                    ? theme.colors.text.disabled
                    : theme.colors.text.primary
                }
                style={styles.menuItemIcon}
              />
            )}
            <SushiText
              variant="body"
              style={{
                color: item.destructive
                  ? theme.colors.text.error
                  : item.disabled
                  ? theme.colors.text.disabled
                  : theme.colors.text.primary,
              }}
            >
              {item.label}
            </SushiText>
          </Pressable>
        );

      case 'checkbox':
        return (
          <Pressable
            key={item.id}
            style={({ pressed }) => [
              styles.menuItem,
              pressed && { backgroundColor: theme.colors.background.secondary },
              item.disabled && styles.disabled,
            ]}
            onPress={() => handleCheckboxChange(item, !item.checked)}
            disabled={item.disabled}
          >
            <View
              style={[
                styles.checkboxBox,
                {
                  backgroundColor: item.checked ? theme.colors.interactive.primary : 'transparent',
                  borderColor: item.checked ? theme.colors.interactive.primary : theme.colors.border.default,
                },
              ]}
            >
              {item.checked && (
                <SushiText variant="caption" style={{ color: theme.colors.text.inverse, fontSize: 10 }}>
                  ✓
                </SushiText>
              )}
            </View>
            <SushiText
              variant="body"
              style={{
                color: item.disabled
                  ? theme.colors.text.disabled
                  : theme.colors.text.primary,
              }}
            >
              {item.label}
            </SushiText>
          </Pressable>
        );

      case 'radio':
        return (
          <Pressable
            key={item.id}
            style={({ pressed }) => [
              styles.menuItem,
              pressed && { backgroundColor: theme.colors.background.secondary },
              item.disabled && styles.disabled,
            ]}
            onPress={() => handleRadioSelect(item)}
            disabled={item.disabled}
          >
            <View
              style={[
                styles.radioOuter,
                {
                  borderColor: item.selected ? theme.colors.interactive.primary : theme.colors.border.default,
                },
              ]}
            >
              {item.selected && (
                <View
                  style={[
                    styles.radioInner,
                    { backgroundColor: theme.colors.interactive.primary },
                  ]}
                />
              )}
            </View>
            <SushiText
              variant="body"
              style={{
                color: item.disabled
                  ? theme.colors.text.disabled
                  : theme.colors.text.primary,
              }}
            >
              {item.label}
            </SushiText>
          </Pressable>
        );

      case 'divider':
        return (
          <View
            key={item.id}
            style={[styles.divider, { backgroundColor: theme.colors.border.subtle }]}
          />
        );

      default:
        return null;
    }
  };

  const dropdownPosition: ViewStyle = layout
    ? {
        position: 'absolute',
        top: layout.y + layout.height + (offset.y || 0),
        left: layout.x + (offset.x || 0),
        minWidth: layout.width,
      }
    : {};

  return (
    <View onLayout={handleLayout}>
      {children}
      <Modal visible={expanded} transparent animationType="none" onRequestClose={onDismiss}>
        <Pressable style={styles.backdrop} onPress={onDismiss}>
          <Animated.View
            style={[
              styles.dropdown,
              {
                backgroundColor: containerColor || theme.colors.background.primary,
                opacity,
                transform: [{ scale }],
                elevation: shadowElevation,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: shadowElevation / 2 },
                shadowOpacity: 0.15,
                shadowRadius: shadowElevation,
                maxHeight,
              },
              border,
              dropdownPosition,
              style,
            ]}
          >
            <ScrollView
              bounces={false}
              showsVerticalScrollIndicator={false}
              style={styles.scrollView}
            >
              {items.map((item, index) => renderItem(item, index))}
            </ScrollView>
          </Animated.View>
        </Pressable>
      </Modal>
    </View>
  );
};

/**
 * Hook to manage dropdown state
 */
export const useSushiDropdownState = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const open = useCallback(() => setIsExpanded(true), []);
  const close = useCallback(() => setIsExpanded(false), []);
  const toggle = useCallback(() => setIsExpanded((v) => !v), []);

  return {
    isExpanded,
    open,
    close,
    toggle,
  };
};

export type SushiDropdownState = ReturnType<typeof useSushiDropdownState>;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
  },
  dropdown: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    zIndex: zIndex.dropdown,
  },
  scrollView: {
    flexGrow: 0,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    minHeight: 44,
  },
  menuItemIcon: {
    marginRight: spacing.sm,
  },
  checkboxBox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 2,
    marginRight: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    marginRight: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  divider: {
    height: 1,
    marginVertical: spacing.xs,
  },
  disabled: {
    opacity: 0.5,
  },
});

SushiDropdown.displayName = 'SushiDropdown';

// Alias for backward compatibility
export const Dropdown = SushiDropdown;
