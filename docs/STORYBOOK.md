# Storybook Guide

This document explains how to use Storybook for developing, testing, and deploying UI components in the Retailer App.

## Table of Contents

- [Introduction](#introduction)
- [Architecture Overview](#architecture-overview)
- [Running Storybook Locally](#running-storybook-locally)
- [Creating and Modifying Components](#creating-and-modifying-components)
- [Writing Stories](#writing-stories)
- [Verifying Changes](#verifying-changes)
- [Deploying Storybook](#deploying-storybook)
- [Best Practices](#best-practices)

---

## Introduction

### What is Storybook?

Storybook is a development environment and playground for UI components. It allows you to:

- **Develop components in isolation** - Build and test components without running the full app
- **Document components** - Auto-generate documentation with usage examples
- **Visual testing** - See how components look in different states
- **Collaborate** - Share a hosted version with designers and stakeholders

### Why Use Storybook?

1. **Faster Development** - Iterate on components without app reload cycles
2. **Better Quality** - Test edge cases and states easily
3. **Living Documentation** - Documentation stays in sync with code
4. **Design System Consistency** - Ensures UI consistency across the app

---

## Architecture Overview

### Project Structure

```
retailer-app-new/
├── packages/
│   └── design-system/           # Shared UI component library
│       ├── src/
│       │   ├── components/      # Reusable components
│       │   ├── theme/           # Colors, typography, spacing
│       │   └── index.ts         # Package exports
│       └── storybook/
│           └── web/
│               └── .storybook/  # Storybook configuration
│                   ├── main.ts  # Main config (addons, stories glob)
│                   └── preview.ts # Preview decorators
├── apps/
│   └── mobile/                  # Main React Native app
│       └── src/
│           └── features/        # Feature-specific components
└── docs/                        # Documentation
```

### How Components Flow to the App

```
┌─────────────────────────────────────────────────────────────────┐
│                      Design System Package                       │
│  packages/design-system/src/                                    │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Button     │  │   Input      │  │   Card       │  ...     │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│           │                │                │                   │
│           └────────────────┼────────────────┘                   │
│                            │                                    │
│                     index.ts (exports)                          │
└─────────────────────────────┼───────────────────────────────────┘
                              │
                              │ npm package / workspace import
                              │
┌─────────────────────────────▼───────────────────────────────────┐
│                        Mobile App                                │
│  apps/mobile/src/                                               │
│                                                                 │
│  import { Button, Input, Card } from 'design-system';           │
│                                                                 │
│  Feature components use design system primitives:               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  LoginForm   │  │  ProductCard │  │  CartItem    │          │
│  │  (uses Input,│  │  (uses Card, │  │  (uses Button│          │
│  │   Button)    │  │   Button)    │  │   , Text)    │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
```

### Import Example in Mobile App

```tsx
// apps/mobile/src/features/auth/components/LoginForm.tsx
import { Button, Input, Text } from 'design-system';

export function LoginForm() {
  return (
    <View>
      <Text variant="heading">Login</Text>
      <Input placeholder="Phone Number" />
      <Button onPress={handleLogin}>Continue</Button>
    </View>
  );
}
```

---

## Running Storybook Locally

### Prerequisites

- Node.js 18+
- pnpm installed (`npm install -g pnpm`)

### Start Storybook

```bash
# From project root
cd packages/design-system
pnpm storybook

# Or from project root using workspace
pnpm --filter design-system storybook

# clear Cache and restart
rm -rf /Users/bijnis/Documents/Projects/retailer-app-new/packages/design-system/node_modules/.cache/storybook
pnpm --filter design-system storybook
```


Storybook will start at **http://localhost:6006**

### Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm storybook` | Start development server on port 6006 |
| `pnpm storybook:build` | Build static Storybook for deployment |
| `pnpm build` | Build the design-system package |

---

## Creating and Modifying Components

### Step 1: Create/Edit Component

Components live in `packages/design-system/src/components/`

```tsx
// packages/design-system/src/components/Button/Button.tsx
import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onPress?: () => void;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onPress,
}: ButtonProps) {
  return (
    <Pressable
      style={[
        styles.base,
        styles[variant],
        styles[size],
        disabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.text, styles[`${variant}Text`]]}>
        {children}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: '#FFCC00',
  },
  secondary: {
    backgroundColor: '#F5F5F5',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#FFCC00',
  },
  sm: { paddingVertical: 8, paddingHorizontal: 16 },
  md: { paddingVertical: 12, paddingHorizontal: 24 },
  lg: { paddingVertical: 16, paddingHorizontal: 32 },
  disabled: { opacity: 0.5 },
  text: { fontWeight: '600' },
  primaryText: { color: '#000' },
  secondaryText: { color: '#333' },
  outlineText: { color: '#FFCC00' },
});
```

### Step 2: Export Component

```tsx
// packages/design-system/src/components/Button/index.ts
export { Button } from './Button';
export type { ButtonProps } from './Button';

// packages/design-system/src/components/index.ts
export * from './Button';

// packages/design-system/src/index.ts
export * from './components';
```

### Step 3: Rebuild Package

```bash
cd packages/design-system
pnpm build
```

---

## Writing Stories

Stories are test cases that showcase component states.

### Story File Location

Place stories next to components:
```
components/
└── Button/
    ├── Button.tsx
    ├── Button.stories.tsx  # Story file
    └── index.ts
```

### Basic Story Structure

```tsx
// packages/design-system/src/components/Button/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default state
export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
  },
};

// Variant examples
export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline Button',
    variant: 'outline',
  },
};

// Size examples
export const Small: Story = {
  args: {
    children: 'Small',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    children: 'Large Button',
    size: 'lg',
  },
};

// State examples
export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
  },
};

// Interactive example with actions
export const WithClick: Story = {
  args: {
    children: 'Click Me',
  },
  play: async ({ canvasElement }) => {
    // Interaction tests can go here
  },
};
```

### Story Organization

Organize stories by category in the sidebar:

```tsx
// Title determines sidebar structure
title: 'Components/Button'      // Components > Button
title: 'Forms/Input'            // Forms > Input
title: 'Layout/Card'            // Layout > Card
title: 'Feedback/Toast'         // Feedback > Toast
```

---

## Verifying Changes

### Development Workflow

1. **Make changes** to component in `packages/design-system/src/`

2. **View in Storybook** - Changes hot-reload automatically
   ```
   http://localhost:6006
   ```

3. **Test different states** using Storybook controls panel

4. **Check responsiveness** using viewport addon

5. **Verify accessibility** - Storybook shows a11y warnings

### Testing Checklist

Before committing component changes:

- [ ] Component renders in all variants
- [ ] Props work as expected (use Controls panel)
- [ ] Disabled/loading states look correct
- [ ] Component is accessible (keyboard nav, screen reader)
- [ ] Responsive at different viewport sizes
- [ ] No console errors/warnings

### Using Controls Panel

The Controls panel (bottom of Storybook) lets you:
- Toggle boolean props
- Select enum values from dropdowns
- Edit text/number values
- See real-time component updates

---

## Deploying Storybook

### Build Static Storybook

```bash
cd packages/design-system
pnpm storybook:build
```

This creates a `storybook-static/` directory with static HTML/JS/CSS.

### Deploy Options

#### Option 1: Vercel (Recommended)

1. Create a `vercel.json` in design-system package:
```json
{
  "buildCommand": "pnpm storybook:build",
  "outputDirectory": "storybook-static"
}
```

2. Connect repo to Vercel and set root directory to `packages/design-system`

#### Option 2: Netlify

1. Create `netlify.toml`:
```toml
[build]
  base = "packages/design-system"
  command = "pnpm storybook:build"
  publish = "storybook-static"
```

#### Option 3: GitHub Pages

Add to `.github/workflows/storybook.yml`:
```yaml
name: Deploy Storybook

on:
  push:
    branches: [main]
    paths:
      - 'packages/design-system/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v2
        with:
          version: 8

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'

      - run: pnpm install

      - run: pnpm --filter design-system storybook:build

      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./packages/design-system/storybook-static
```

#### Option 4: Chromatic (Visual Testing + Hosting)

```bash
# Install Chromatic
pnpm add -D chromatic

# Publish
npx chromatic --project-token=<your-token>
```

Chromatic provides:
- Free Storybook hosting
- Visual regression testing
- UI review workflows

---

## Best Practices

### Component Design

1. **Single Responsibility** - One component, one purpose
2. **Composable** - Build complex UIs from simple components
3. **Props over State** - Prefer controlled components
4. **Consistent API** - Similar props across components

### Story Writing

1. **Cover all states** - Default, hover, active, disabled, error, loading
2. **Show variants** - All sizes, colors, types
3. **Edge cases** - Empty data, long text, special characters
4. **Real content** - Use realistic data, not "Lorem ipsum"

### Documentation

```tsx
/**
 * Primary button for main actions.
 *
 * @example
 * ```tsx
 * <Button variant="primary" onPress={handleSubmit}>
 *   Submit Order
 * </Button>
 * ```
 */
export function Button({ ... }) { }
```

### File Structure

```
ComponentName/
├── ComponentName.tsx        # Main component
├── ComponentName.stories.tsx # Storybook stories
├── ComponentName.test.tsx   # Unit tests (optional)
├── ComponentName.styles.ts  # Styles (if separate)
└── index.ts                 # Public exports
```

---

## Quick Reference

| Task | Command |
|------|---------|
| Start Storybook | `pnpm --filter design-system storybook` |
| Build Storybook | `pnpm --filter design-system storybook:build` |
| Build package | `pnpm --filter design-system build` |
| Run all builds | `pnpm build` (from root) |

### Useful Links

- [Storybook Docs](https://storybook.js.org/docs)
- [React Native Web](https://necolas.github.io/react-native-web/)
- [Component Story Format (CSF)](https://storybook.js.org/docs/react/api/csf)
