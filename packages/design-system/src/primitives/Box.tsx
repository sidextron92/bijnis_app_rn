import React from 'react';
import { View, ViewProps, ViewStyle, StyleSheet } from 'react-native';
import { colors } from '../tokens/colors';
import { spacing, SpacingKey, getSpacing } from '../tokens/spacing';
import { borderRadius, BorderRadiusKey, getBorderRadius } from '../tokens/borderRadius';
import { shadows, ShadowKey, getShadow } from '../tokens/shadows';

/**
 * Supported platforms for this component
 * @platform android
 * @platform ios
 * @platform web
 */

type BackgroundColor = 'primary' | 'secondary' | 'tertiary' | 'transparent' | 'white';

export interface BoxProps extends ViewProps {
  /** Background color */
  bg?: BackgroundColor;
  /** Padding - all sides */
  p?: SpacingKey | number;
  /** Padding - horizontal */
  px?: SpacingKey | number;
  /** Padding - vertical */
  py?: SpacingKey | number;
  /** Padding - top */
  pt?: SpacingKey | number;
  /** Padding - bottom */
  pb?: SpacingKey | number;
  /** Padding - left */
  pl?: SpacingKey | number;
  /** Padding - right */
  pr?: SpacingKey | number;
  /** Margin - all sides */
  m?: SpacingKey | number;
  /** Margin - horizontal */
  mx?: SpacingKey | number;
  /** Margin - vertical */
  my?: SpacingKey | number;
  /** Margin - top */
  mt?: SpacingKey | number;
  /** Margin - bottom */
  mb?: SpacingKey | number;
  /** Margin - left */
  ml?: SpacingKey | number;
  /** Margin - right */
  mr?: SpacingKey | number;
  /** Border radius */
  radius?: BorderRadiusKey | number;
  /** Shadow */
  shadow?: ShadowKey;
  /** Flex grow */
  flex?: number;
  /** Flex direction */
  direction?: 'row' | 'column';
  /** Align items */
  align?: ViewStyle['alignItems'];
  /** Justify content */
  justify?: ViewStyle['justifyContent'];
  /** Gap between children */
  gap?: SpacingKey | number;
  /** Width */
  width?: ViewStyle['width'];
  /** Height */
  height?: ViewStyle['height'];
  /** Children content */
  children?: React.ReactNode;
}

const bgColorMap: Record<BackgroundColor, string> = {
  primary: colors.background.primary,
  secondary: colors.background.secondary,
  tertiary: colors.background.tertiary,
  transparent: colors.transparent,
  white: colors.white,
};

export const Box: React.FC<BoxProps> = ({
  bg,
  p,
  px,
  py,
  pt,
  pb,
  pl,
  pr,
  m,
  mx,
  my,
  mt,
  mb,
  ml,
  mr,
  radius,
  shadow,
  flex,
  direction,
  align,
  justify,
  gap,
  width,
  height,
  style,
  children,
  ...props
}) => {
  const boxStyle: ViewStyle = {
    // Background
    ...(bg && { backgroundColor: bgColorMap[bg] }),

    // Padding
    ...(p !== undefined && { padding: getSpacing(p) }),
    ...(px !== undefined && { paddingHorizontal: getSpacing(px) }),
    ...(py !== undefined && { paddingVertical: getSpacing(py) }),
    ...(pt !== undefined && { paddingTop: getSpacing(pt) }),
    ...(pb !== undefined && { paddingBottom: getSpacing(pb) }),
    ...(pl !== undefined && { paddingLeft: getSpacing(pl) }),
    ...(pr !== undefined && { paddingRight: getSpacing(pr) }),

    // Margin
    ...(m !== undefined && { margin: getSpacing(m) }),
    ...(mx !== undefined && { marginHorizontal: getSpacing(mx) }),
    ...(my !== undefined && { marginVertical: getSpacing(my) }),
    ...(mt !== undefined && { marginTop: getSpacing(mt) }),
    ...(mb !== undefined && { marginBottom: getSpacing(mb) }),
    ...(ml !== undefined && { marginLeft: getSpacing(ml) }),
    ...(mr !== undefined && { marginRight: getSpacing(mr) }),

    // Border radius
    ...(radius !== undefined && { borderRadius: getBorderRadius(radius) }),

    // Shadow
    ...(shadow && getShadow(shadow)),

    // Layout
    ...(flex !== undefined && { flex }),
    ...(direction && { flexDirection: direction }),
    ...(align && { alignItems: align }),
    ...(justify && { justifyContent: justify }),
    ...(gap !== undefined && { gap: getSpacing(gap) }),

    // Dimensions
    ...(width !== undefined && { width }),
    ...(height !== undefined && { height }),
  };

  return (
    <View style={[boxStyle, style]} {...props}>
      {children}
    </View>
  );
};

Box.displayName = 'Box';
