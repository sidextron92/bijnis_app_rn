/**
 * SushiAvatar - Avatar Component
 *
 * A theme-aware avatar component for displaying user images or initials.
 *
 * @platform android
 * @platform ios
 * @platform web
 */

import React, { useState } from 'react';
import { View, Image, StyleSheet, ViewStyle, ImageSourcePropType } from 'react-native';
import { useTheme } from '../../theme';
import { SushiText } from '../Text/SushiText';
import { avatarSize, AvatarSizeKey, borderWidth, borderRadius } from '../../tokens/dimensions';

/**
 * Avatar shapes
 */
export type AvatarShape = 'circle' | 'square' | 'rounded';

/**
 * SushiAvatar Props
 */
export interface SushiAvatarProps {
  /** Image source */
  source?: ImageSourcePropType;
  /** Image URI */
  uri?: string;
  /** Name for generating initials */
  name?: string;
  /** Avatar size */
  size?: AvatarSizeKey | number;
  /** Avatar shape */
  shape?: AvatarShape;
  /** Show border */
  bordered?: boolean;
  /** Border color */
  borderColor?: string;
  /** Background color for initials */
  backgroundColor?: string;
  /** Text color for initials */
  textColor?: string;
  /** Fallback icon when no image or name */
  fallback?: React.ReactNode;
  /** Container style */
  style?: ViewStyle;
}

/**
 * Get initials from name
 */
const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

/**
 * Generate color from string
 */
const stringToColor = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
    '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F',
    '#BB8FCE', '#85C1E9', '#F8B500', '#00CED1',
  ];
  return colors[Math.abs(hash) % colors.length];
};

/**
 * SushiAvatar Component
 *
 * @example
 * ```tsx
 * // With image
 * <SushiAvatar uri="https://example.com/avatar.jpg" size="lg" />
 *
 * // With initials
 * <SushiAvatar name="John Doe" size="md" />
 *
 * // Bordered avatar
 * <SushiAvatar uri="..." bordered />
 *
 * // Square avatar
 * <SushiAvatar name="JD" shape="square" />
 * ```
 */
export const SushiAvatar: React.FC<SushiAvatarProps> = ({
  source,
  uri,
  name,
  size = 'md',
  shape = 'circle',
  bordered = false,
  borderColor,
  backgroundColor,
  textColor,
  fallback,
  style,
}) => {
  const { theme } = useTheme();
  const [imageError, setImageError] = useState(false);

  // Get size value
  const sizeValue = typeof size === 'number' ? size : avatarSize[size];

  // Get border radius based on shape
  const getRadius = () => {
    switch (shape) {
      case 'circle':
        return sizeValue / 2;
      case 'square':
        return borderRadius.sm;
      case 'rounded':
        return borderRadius.lg;
      default:
        return sizeValue / 2;
    }
  };

  // Has valid image
  const hasImage = (source || uri) && !imageError;

  // Get background color for initials
  const getBackgroundColor = () => {
    if (backgroundColor) return backgroundColor;
    if (name) return stringToColor(name);
    return theme.colors.background.secondary;
  };

  // Get text color for initials
  const getTextColor = () => {
    if (textColor) return textColor;
    return theme.colors.text.inverse;
  };

  // Calculate font size based on avatar size
  const getFontSize = () => {
    return sizeValue * 0.4;
  };

  // Container style
  const containerStyle: ViewStyle = {
    width: sizeValue,
    height: sizeValue,
    borderRadius: getRadius(),
    backgroundColor: getBackgroundColor(),
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    ...(bordered && {
      borderWidth: borderWidth.medium,
      borderColor: borderColor || theme.colors.border.default,
    }),
  };

  // Render image
  if (hasImage) {
    return (
      <View style={[containerStyle, style]}>
        <Image
          source={source || { uri }}
          style={styles.image}
          onError={() => setImageError(true)}
          resizeMode="cover"
        />
      </View>
    );
  }

  // Render initials
  if (name) {
    const initials = getInitials(name);
    return (
      <View style={[containerStyle, style]}>
        <SushiText
          customColor={getTextColor()}
          style={{ fontSize: getFontSize(), fontWeight: '600' }}
        >
          {initials}
        </SushiText>
      </View>
    );
  }

  // Render fallback
  return (
    <View style={[containerStyle, style]}>
      {fallback || (
        <SushiText
          customColor={theme.colors.text.secondary}
          style={{ fontSize: getFontSize() }}
        >
          ?
        </SushiText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
});

SushiAvatar.displayName = 'SushiAvatar';

/**
 * AvatarGroup - Display multiple avatars
 */
export interface SushiAvatarGroupProps {
  /** Avatar data */
  avatars: Array<{ uri?: string; name?: string; source?: ImageSourcePropType }>;
  /** Maximum avatars to show */
  max?: number;
  /** Avatar size */
  size?: AvatarSizeKey | number;
  /** Overlap amount */
  spacing?: number;
  /** Container style */
  style?: ViewStyle;
}

export const SushiAvatarGroup: React.FC<SushiAvatarGroupProps> = ({
  avatars = [],
  max = 4,
  size = 'md',
  spacing = -8,
  style,
}) => {
  const { theme } = useTheme();
  const sizeValue = typeof size === 'number' ? size : avatarSize[size];
  const safeAvatars = avatars || [];
  const displayAvatars = safeAvatars.slice(0, max);
  const remaining = safeAvatars.length - max;

  return (
    <View style={[styles.group, style]}>
      {displayAvatars.map((avatar, index) => (
        <View
          key={index}
          style={[
            styles.groupItem,
            {
              marginLeft: index === 0 ? 0 : spacing,
              zIndex: displayAvatars.length - index,
            },
          ]}
        >
          <SushiAvatar
            {...avatar}
            size={size}
            bordered
            borderColor={theme.colors.background.primary}
          />
        </View>
      ))}
      {remaining > 0 && (
        <View
          style={[
            styles.groupItem,
            styles.remainingBadge,
            {
              marginLeft: spacing,
              width: sizeValue,
              height: sizeValue,
              borderRadius: sizeValue / 2,
              backgroundColor: theme.colors.background.secondary,
              borderWidth: borderWidth.medium,
              borderColor: theme.colors.background.primary,
            },
          ]}
        >
          <SushiText
            variant="caption"
            color="primary"
            style={{ fontSize: sizeValue * 0.35 }}
          >
            +{remaining}
          </SushiText>
        </View>
      )}
    </View>
  );
};

const groupStyles = StyleSheet.create({
  group: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  groupItem: {
    // Individual item styles
  },
  remainingBadge: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Object.assign(styles, groupStyles);

SushiAvatarGroup.displayName = 'SushiAvatarGroup';
