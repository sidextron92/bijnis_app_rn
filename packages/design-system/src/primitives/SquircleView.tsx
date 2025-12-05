import React from 'react';
import { View, ViewStyle, Platform } from 'react-native';
import type { CornerStyle } from '../tokens/cornerStyle';

// Conditionally import Squircle for web only
let Squircle: React.ComponentType<{
  cornerRadius: number;
  cornerSmoothing: number;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}> | null = null;

if (Platform.OS === 'web') {
  try {
    // Dynamic import for web platform
    const squircleModule = require('@squircle-js/react');
    Squircle = squircleModule.Squircle;
  } catch (e) {
    // Fallback if module not available
    Squircle = null;
  }
}

export interface SquircleViewProps {
  /** Children content */
  children?: React.ReactNode;
  /** Corner style: rectangle, rounded, or squircle */
  cornerStyle?: CornerStyle;
  /** Corner radius value */
  cornerRadius?: number;
  /** Background color */
  backgroundColor?: string;
  /** Border width */
  borderWidth?: number;
  /** Border color */
  borderColor?: string;
  /** Custom style */
  style?: ViewStyle;
  /** Corner smoothing for squircle (0-1, default 1 for maximum smoothing) */
  cornerSmoothing?: number;
}

/**
 * A wrapper component that renders content with different corner styles:
 * - rectangle: Sharp corners
 * - rounded: Standard CSS border-radius
 * - squircle: Continuous corner curves (iOS-style)
 *
 * Uses @squircle-js/react on web for proper squircle rendering.
 */
export const SquircleView: React.FC<SquircleViewProps> = ({
  children,
  cornerStyle = 'rounded',
  cornerRadius = 8,
  backgroundColor = 'transparent',
  borderWidth = 0,
  borderColor = 'transparent',
  style,
  cornerSmoothing = 1,
}) => {
  // Rectangle style - no border radius
  if (cornerStyle === 'rectangle') {
    return (
      <View
        style={[
          {
            backgroundColor,
            borderWidth,
            borderColor,
            borderRadius: 0,
            overflow: 'hidden',
          },
          style,
        ]}
      >
        {children}
      </View>
    );
  }

  // Rounded style - standard CSS border-radius
  if (cornerStyle === 'rounded') {
    return (
      <View
        style={[
          {
            backgroundColor,
            borderWidth,
            borderColor,
            borderRadius: cornerRadius,
            overflow: 'hidden',
          },
          style,
        ]}
      >
        {children}
      </View>
    );
  }

  // Squircle style - continuous corner curves
  // On web, use @squircle-js/react for proper squircle effect
  if (Platform.OS === 'web' && Squircle) {
    // Extract style properties for web
    const styleObj = style || {};

    // Convert ViewStyle to CSSProperties for web
    const webStyle: React.CSSProperties = {
      backgroundColor,
      borderWidth: borderWidth > 0 ? borderWidth : undefined,
      borderColor: borderWidth > 0 ? borderColor : undefined,
      borderStyle: borderWidth > 0 ? 'solid' : undefined,
      overflow: styleObj.overflow || 'hidden',
      display: 'flex',
      flexDirection: (styleObj.flexDirection as React.CSSProperties['flexDirection']) || 'column',
      alignItems: styleObj.alignItems as React.CSSProperties['alignItems'],
      justifyContent: styleObj.justifyContent as React.CSSProperties['justifyContent'],
      width: styleObj.width,
      height: styleObj.height,
      minWidth: styleObj.minWidth,
      minHeight: styleObj.minHeight,
      maxWidth: styleObj.maxWidth,
      maxHeight: styleObj.maxHeight,
      aspectRatio: styleObj.aspectRatio as React.CSSProperties['aspectRatio'],
      padding: styleObj.padding,
      paddingTop: styleObj.paddingTop,
      paddingBottom: styleObj.paddingBottom,
      paddingLeft: styleObj.paddingLeft,
      paddingRight: styleObj.paddingRight,
      paddingHorizontal: styleObj.paddingHorizontal as unknown as React.CSSProperties['paddingInline'],
      paddingVertical: styleObj.paddingVertical as unknown as React.CSSProperties['paddingBlock'],
      margin: styleObj.margin,
      marginTop: styleObj.marginTop,
      marginBottom: styleObj.marginBottom,
      marginLeft: styleObj.marginLeft,
      marginRight: styleObj.marginRight,
      opacity: styleObj.opacity,
      flex: styleObj.flex,
    };

    // Remove undefined values
    Object.keys(webStyle).forEach(key => {
      if (webStyle[key as keyof React.CSSProperties] === undefined) {
        delete webStyle[key as keyof React.CSSProperties];
      }
    });

    return (
      <Squircle
        cornerRadius={cornerRadius}
        cornerSmoothing={cornerSmoothing}
        style={webStyle}
      >
        {children}
      </Squircle>
    );
  }

  // On native, use enhanced border-radius as approximation
  // True squircle would require react-native-svg or Skia
  return (
    <View
      style={[
        {
          backgroundColor,
          borderWidth,
          borderColor,
          // Use slightly larger radius to approximate squircle effect on native
          borderRadius: cornerRadius * 1.5,
          overflow: 'hidden',
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

SquircleView.displayName = 'SquircleView';
