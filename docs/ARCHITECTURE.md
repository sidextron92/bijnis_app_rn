# Quick Commerce App - Architecture Documentation

## Table of Contents

1. [Overview](#overview)
2. [Technology Stack](#technology-stack)
3. [Monorepo Structure](#monorepo-structure)
4. [Frontend Architecture](#frontend-architecture)
5. [Design System](#design-system)
6. [State Management](#state-management)
7. [Server-Driven UI (SDUI)](#server-driven-ui-sdui)
8. [Backend Architecture](#backend-architecture)
9. [Database Schema](#database-schema)
10. [API Design](#api-design)
11. [Feature Modules](#feature-modules)
12. [Best Practices](#best-practices)
13. [Getting Started](#getting-started)
14. [Deployment](#deployment)

---

## Overview

This document outlines the architecture for a scalable quick commerce application similar to Blinkit. The app is built with React Native (Expo) and can be deployed on Android, iOS, and Web platforms.

### Key Features

- **Authentication**: Phone + OTP based login
- **Dynamic Home Page**: Server-Driven UI for flexible layouts
- **Product Catalog**: Categories, search, filters
- **Cart Management**: Add, remove, quantity updates
- **Checkout**: Address selection, payment methods
- **Order Tracking**: Real-time order status updates
- **Order History**: Past orders with reorder capability

### Architecture Principles

1. **Feature-Based Organization**: Code is organized by business domain, not by type
2. **Modularity**: Each feature is self-contained and independent
3. **Type Safety**: TypeScript throughout the codebase
4. **Reusability**: Shared design system and types
5. **Scalability**: Easy to add new features without affecting existing code

---

## Technology Stack

### Frontend (Mobile & Web)

| Technology | Purpose | Version |
|------------|---------|---------|
| React Native | Cross-platform framework | 0.74+ |
| Expo | Development tooling | 51+ |
| TypeScript | Type-safe JavaScript | 5.3+ |
| Redux Toolkit | State management | 2.2+ |
| RTK Query | API caching | 2.2+ |
| Expo Router | Navigation | 3.5+ |
| Axios | HTTP client | 1.6+ |

### Backend (Planned)

| Technology | Purpose |
|------------|---------|
| Node.js + Fastify | API server |
| PostgreSQL | Primary database |
| Redis | Caching & sessions |
| Prisma | ORM |
| Socket.io | Real-time updates |
| JWT | Authentication |

### Development Tools

| Tool | Purpose |
|------|---------|
| pnpm | Package manager |
| Turborepo | Monorepo build system |
| Storybook | Component documentation |
| ESLint | Code linting |
| Prettier | Code formatting |
| Jest | Testing |

---

## Monorepo Structure

```
quick-commerce/
├── apps/
│   ├── mobile/                 # Expo mobile app
│   └── api/                    # Node.js backend (planned)
│
├── packages/
│   ├── design-system/          # UI component library
│   └── shared-types/           # TypeScript type definitions
│
├── docs/                       # Documentation
│
├── package.json                # Root package.json
├── pnpm-workspace.yaml         # Workspace configuration
├── turbo.json                  # Turborepo configuration
└── tsconfig.base.json          # Base TypeScript config
```

### Why Monorepo?

1. **Code Sharing**: Design system and types shared across apps
2. **Atomic Changes**: Single PR can update multiple packages
3. **Consistent Tooling**: Same lint, format, test setup everywhere
4. **Simplified Dependencies**: Packages reference each other directly

---

## Frontend Architecture

### Directory Structure

```
apps/mobile/
├── app/                        # Expo Router pages
│   ├── (auth)/                 # Auth screens group
│   │   ├── login.tsx
│   │   └── otp.tsx
│   ├── (main)/                 # Main app screens
│   │   ├── (tabs)/             # Tab navigation
│   │   │   ├── home.tsx
│   │   │   ├── categories.tsx
│   │   │   ├── cart.tsx
│   │   │   ├── orders.tsx
│   │   │   └── account.tsx
│   │   ├── product/[id].tsx
│   │   ├── checkout.tsx
│   │   ├── order/[id].tsx
│   │   └── search.tsx
│   ├── _layout.tsx
│   └── index.tsx
│
├── src/
│   ├── features/               # Feature modules
│   │   ├── auth/
│   │   ├── home/
│   │   ├── products/
│   │   ├── cart/
│   │   ├── checkout/
│   │   ├── orders/
│   │   ├── account/
│   │   ├── search/
│   │   └── sdui/
│   │
│   ├── shared/                 # Shared utilities
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── utils/
│   │   └── constants/
│   │
│   ├── store/                  # Redux store
│   │   ├── index.ts
│   │   ├── rootReducer.ts
│   │   └── hooks.ts
│   │
│   └── theme/                  # Design tokens
│       ├── colors.ts
│       ├── spacing.ts
│       ├── typography.ts
│       └── index.ts
│
└── assets/                     # Static assets
```

### Feature Module Structure

Each feature follows this consistent structure:

```
features/[feature-name]/
├── components/                 # Feature-specific components
│   ├── ComponentName.tsx
│   └── index.ts
├── hooks/                      # Feature-specific hooks
│   └── useFeatureHook.ts
├── services/                   # API calls
│   └── featureApi.ts
├── store/                      # Redux slice
│   └── featureSlice.ts
├── types.ts                    # Feature types (if needed)
└── index.ts                    # Public exports
```

### Navigation Flow

```
App Entry (index.tsx)
    │
    ├── Not Authenticated ──► Auth Stack
    │                              ├── Login Screen
    │                              └── OTP Screen
    │
    └── Authenticated ──────► Main Stack
                                   ├── Tab Navigator
                                   │    ├── Home Tab
                                   │    ├── Categories Tab
                                   │    ├── Cart Tab
                                   │    ├── Orders Tab
                                   │    └── Account Tab
                                   │
                                   └── Modal Screens
                                        ├── Product Detail
                                        ├── Checkout
                                        ├── Order Detail
                                        └── Search
```

---

## Design System

### Architecture (Inspired by Blinkit)

The design system follows a layered architecture:

```
┌─────────────────────────────────────────────────────────┐
│                     COMPONENTS                          │
│  Complex, composed of Elements + Primitives             │
│  Examples: Card, Modal, BottomSheet, Toast              │
├─────────────────────────────────────────────────────────┤
│                      ELEMENTS                           │
│  Simple, reusable UI pieces                             │
│  Examples: Button, Input, Badge, Chip, Icon             │
├─────────────────────────────────────────────────────────┤
│                     PRIMITIVES                          │
│  Base building blocks wrapping RN components            │
│  Examples: Text, Box (View wrapper)                     │
├─────────────────────────────────────────────────────────┤
│                       TOKENS                            │
│  Design constants                                       │
│  Examples: colors, spacing, typography, shadows         │
└─────────────────────────────────────────────────────────┘
```

### Design Tokens

```typescript
// Colors
colors.primary[500]     // Brand green (#058234)
colors.success.main     // Green
colors.error.main       // Red
colors.gray[500]        // Neutral gray
colors.text.primary     // Primary text
colors.background.primary // White background

// Spacing (4px base unit)
spacing.xs   // 4px
spacing.sm   // 8px
spacing.md   // 12px
spacing.lg   // 16px
spacing.xl   // 24px

// Typography
fontSize.sm  // 12px
fontSize.md  // 14px (default)
fontSize.lg  // 16px

// Border Radius
borderRadius.sm  // 4px
borderRadius.md  // 8px
borderRadius.lg  // 12px
borderRadius.full // 9999px (circular)
```

### Using Design System Components

```tsx
import { Button, Input, Card, Text, Box } from 'design-system';

// Button variants
<Button title="Primary" variant="primary" />
<Button title="Outline" variant="outline" />
<Button title="Loading" loading />

// Input with validation
<Input
  label="Email"
  placeholder="Enter email"
  error="Invalid email"
/>

// Card component
<Card variant="elevated" padding="md">
  <Text variant="h4">Card Title</Text>
  <Text variant="body" color="secondary">Card content</Text>
</Card>

// Box (styled View)
<Box bg="secondary" p="lg" radius="md" shadow="sm">
  <Text>Content in a box</Text>
</Box>
```

### Storybook Integration

Components are documented in Storybook:

```bash
# Run Storybook for web
pnpm run dev:storybook

# Build Storybook
pnpm run build:storybook
```

Each component has stories:
- Default state
- All variants
- All sizes
- Interactive states (loading, disabled)
- Edge cases

---

## State Management

### Redux Toolkit Setup

```typescript
// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### Typed Hooks

```typescript
// store/hooks.ts
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

### Feature Slice Pattern

```typescript
// features/cart/store/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartState {
  items: CartItem[];
  isLoading: boolean;
  error: string | null;
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Product>) => {
      // Immer handles immutability
      state.items.push(/* ... */);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    // Handle async thunks
  },
});

// Export actions
export const { addItem, removeItem } = cartSlice.actions;

// Export selectors
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartTotal = (state: RootState) =>
  state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

export default cartSlice.reducer;
```

### State Flow Diagram

```
┌──────────────┐     dispatch     ┌──────────────┐
│  Component   │ ───────────────► │    Action    │
└──────────────┘                  └──────────────┘
       ▲                                 │
       │                                 ▼
       │ useSelector            ┌──────────────┐
       │                        │   Reducer    │
       │                        └──────────────┘
       │                                 │
       │                                 ▼
┌──────────────┐                ┌──────────────┐
│   Re-render  │ ◄───────────── │    Store     │
└──────────────┘                └──────────────┘
```

---

## Server-Driven UI (SDUI)

### Why SDUI?

1. **No App Updates**: Change UI without app store releases
2. **A/B Testing**: Test different layouts dynamically
3. **Personalization**: Show different content per user
4. **Marketing Control**: Marketing team can update banners, promotions

### How It Works

```
┌──────────┐     GET /sdui/home     ┌──────────┐
│  Mobile  │ ──────────────────────►│  Server  │
│   App    │                        │          │
└──────────┘                        └──────────┘
     │                                    │
     │                                    ▼
     │                            ┌──────────────┐
     │                            │ Generate JSON│
     │                            │   Layout     │
     │                            └──────────────┘
     │                                    │
     │         JSON Response              │
     │◄───────────────────────────────────┘
     │
     ▼
┌──────────────┐
│ Parse JSON   │
│ & Render     │
│ Widgets      │
└──────────────┘
```

### SDUI JSON Structure

```json
{
  "pageType": "home",
  "widgets": [
    {
      "type": "banner_carousel",
      "data": {
        "banners": [
          {
            "id": "1",
            "image": "https://...",
            "deepLink": "/category/fruits"
          }
        ]
      },
      "height": 180
    },
    {
      "type": "category_grid",
      "data": {
        "categories": [
          { "id": "1", "name": "Fruits", "image": "..." }
        ],
        "columns": 4
      }
    },
    {
      "type": "product_rail",
      "data": {
        "title": "Best Sellers",
        "products": [...],
        "seeAllLink": "/products?sort=popular"
      }
    }
  ]
}
```

### Widget Registry Pattern

```typescript
// features/sdui/components/WidgetRegistry.ts
import { BannerCarousel } from './widgets/BannerCarousel';
import { CategoryGrid } from './widgets/CategoryGrid';
import { ProductRail } from './widgets/ProductRail';

export const WidgetRegistry: Record<string, React.ComponentType<any>> = {
  banner_carousel: BannerCarousel,
  category_grid: CategoryGrid,
  product_rail: ProductRail,
  // Add new widgets here
};
```

### SDUI Renderer

```typescript
// features/sdui/renderer/SDUIRenderer.tsx
export function SDUIRenderer({ widgets }) {
  return (
    <View>
      {widgets.map((widget, index) => {
        const Widget = WidgetRegistry[widget.type];
        if (!Widget) return null;
        return <Widget key={index} {...widget.data} />;
      })}
    </View>
  );
}
```

### Adding a New Widget

1. Create widget component in `features/sdui/components/widgets/`
2. Add type to `WidgetType` in `shared-types`
3. Register in `WidgetRegistry`
4. Add data type in `shared-types/sdui.ts`

---

## Backend Architecture

### Directory Structure (Planned)

```
apps/api/
├── src/
│   ├── modules/                # Feature modules
│   │   ├── auth/
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.routes.ts
│   │   │   └── auth.schema.ts
│   │   ├── users/
│   │   ├── products/
│   │   ├── categories/
│   │   ├── cart/
│   │   ├── orders/
│   │   └── sdui/
│   │
│   ├── common/
│   │   ├── middlewares/
│   │   ├── utils/
│   │   └── types/
│   │
│   ├── config/
│   │   ├── env.ts
│   │   ├── database.ts
│   │   └── redis.ts
│   │
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   │
│   └── app.ts
```

### API Module Pattern

```typescript
// Example: products module

// products.routes.ts
export async function productRoutes(app: FastifyInstance) {
  app.get('/products', getProducts);
  app.get('/products/:id', getProductById);
  app.get('/products/search', searchProducts);
}

// products.controller.ts
export async function getProducts(request, reply) {
  const products = await productService.getProducts(request.query);
  return reply.send({ success: true, data: products });
}

// products.service.ts
export const productService = {
  getProducts: async (filters) => {
    return prisma.product.findMany({
      where: buildWhereClause(filters),
      include: { category: true },
    });
  },
};
```

---

## Database Schema

### Core Tables (Prisma Schema)

```prisma
// Users
model User {
  id          String    @id @default(cuid())
  phone       String    @unique
  name        String?
  email       String?   @unique
  createdAt   DateTime  @default(now())

  addresses   Address[]
  cart        Cart?
  orders      Order[]
}

// Products
model Product {
  id            String   @id @default(cuid())
  name          String
  slug          String   @unique
  mrp           Decimal
  sellingPrice  Decimal
  unit          String
  images        String[]
  stockQuantity Int
  categoryId    String

  category      Category @relation(...)
}

// Categories
model Category {
  id        String     @id @default(cuid())
  name      String
  slug      String     @unique
  image     String?
  parentId  String?

  parent    Category?  @relation("Hierarchy", ...)
  children  Category[] @relation("Hierarchy")
  products  Product[]
}

// Orders
model Order {
  id            String      @id @default(cuid())
  orderNumber   String      @unique
  userId        String
  status        OrderStatus
  total         Decimal

  user          User        @relation(...)
  items         OrderItem[]
}
```

### Database Diagram

```
┌──────────┐       ┌───────────┐       ┌──────────┐
│   User   │───────│   Cart    │───────│ CartItem │
└──────────┘       └───────────┘       └──────────┘
     │                                       │
     │                                       ▼
     │                               ┌───────────┐
     │                               │  Product  │
     │                               └───────────┘
     │                                     │
     │                                     ▼
     ▼                               ┌───────────┐
┌──────────┐       ┌───────────┐    │  Category │
│  Order   │───────│ OrderItem │────└───────────┘
└──────────┘       └───────────┘
     │
     ▼
┌──────────┐
│ Address  │
└──────────┘
```

---

## API Design

### REST Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| **Auth** | | |
| POST | `/auth/send-otp` | Send OTP to phone |
| POST | `/auth/verify-otp` | Verify OTP & login |
| POST | `/auth/refresh` | Refresh access token |
| POST | `/auth/logout` | Logout |
| **Products** | | |
| GET | `/products` | List products (with filters) |
| GET | `/products/:id` | Get product detail |
| GET | `/products/search` | Search products |
| **Categories** | | |
| GET | `/categories` | List all categories |
| GET | `/categories/:id` | Get category with products |
| **Cart** | | |
| GET | `/cart` | Get user's cart |
| POST | `/cart/items` | Add item to cart |
| PATCH | `/cart/items/:id` | Update item quantity |
| DELETE | `/cart/items/:id` | Remove item |
| **Orders** | | |
| GET | `/orders` | List user's orders |
| GET | `/orders/:id` | Get order detail |
| POST | `/orders` | Create new order |
| POST | `/orders/:id/cancel` | Cancel order |
| **SDUI** | | |
| GET | `/sdui/:pageType` | Get page layout |

### Response Format

```typescript
// Success Response
{
  "success": true,
  "data": { ... }
}

// Error Response
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": {
      "phone": ["Phone number is required"]
    }
  }
}

// Paginated Response
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5,
    "hasNext": true,
    "hasPrev": false
  }
}
```

---

## Feature Modules

### Auth Module

**Responsibilities:**
- Phone + OTP authentication
- Token management (JWT)
- Session handling

**Components:**
- `LoginForm` - Phone input form
- `OTPForm` - OTP verification form

**State:**
- `user` - Current user data
- `token` - Access token
- `isAuthenticated` - Auth status

### Cart Module

**Responsibilities:**
- Cart item management
- Quantity updates
- Cart sync with server

**Components:**
- `CartContent` - Cart screen content
- `CartItem` - Individual cart item

**State:**
- `items` - Cart items array
- Selectors: `selectCartTotal`, `selectCartItemCount`

### Orders Module

**Responsibilities:**
- Order history
- Order tracking
- Real-time updates

**Components:**
- `OrderHistory` - Orders list
- `OrderCard` - Order summary card
- `OrderDetails` - Full order view

**State:**
- `orders` - Orders array
- `selectedOrder` - Current order detail

### SDUI Module

**Responsibilities:**
- Fetch page layouts
- Render widgets dynamically
- Widget caching

**Components:**
- `SDUIRenderer` - Main renderer
- Widget components (Banner, CategoryGrid, ProductRail, etc.)

---

## Best Practices

### 1. Feature Module Rules

```typescript
// ✅ Good - Feature exports only what's needed
// features/cart/index.ts
export { CartContent } from './components/CartContent';
export { addToCart, selectCartItems } from './store/cartSlice';

// ❌ Bad - Exporting internal implementation
export { formatCartItem } from './utils/helpers';
```

### 2. Component Organization

```typescript
// ✅ Good - Clear separation
// features/products/components/ProductCard.tsx
export function ProductCard({ product }) {
  // Presentation only
}

// features/products/components/ProductCardContainer.tsx
export function ProductCardContainer({ productId }) {
  const product = useAppSelector(selectProduct(productId));
  return <ProductCard product={product} />;
}
```

### 3. API Service Pattern

```typescript
// ✅ Good - Centralized API calls
// features/products/services/productsApi.ts
export const productsApi = {
  getProducts: (filters) => api.get('/products', { params: filters }),
  getProductById: (id) => api.get(`/products/${id}`),
};
```

### 4. Custom Hooks for Logic

```typescript
// ✅ Good - Encapsulated business logic
// features/cart/hooks/useAddToCart.ts
export function useAddToCart() {
  const dispatch = useAppDispatch();

  const addToCart = useCallback((product) => {
    analytics.track('add_to_cart', { productId: product.id });
    dispatch(cartActions.addItem(product));
    toast.show('Added to cart');
  }, [dispatch]);

  return { addToCart };
}
```

### 5. Type Safety

```typescript
// ✅ Good - Use shared types
import type { Product, CartItem } from 'shared-types';

// ✅ Good - Type your slices
interface CartState {
  items: CartItem[];
  isLoading: boolean;
  error: string | null;
}
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 9+
- Expo CLI
- iOS Simulator / Android Emulator (for mobile)

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd quick-commerce

# Install dependencies
pnpm install

# Start development
pnpm dev:mobile      # Start Expo app
pnpm dev:storybook   # Start Storybook
```

### Environment Setup

Create `.env` files:

```bash
# apps/mobile/.env
EXPO_PUBLIC_API_URL=http://localhost:3000/api

# apps/api/.env (when backend is setup)
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
JWT_SECRET=your-secret-key
```

### Running the App

```bash
# iOS
pnpm dev:mobile --ios

# Android
pnpm dev:mobile --android

# Web
pnpm dev:mobile --web
```

---

## Deployment

### Mobile App (Expo EAS)

```bash
# Build for production
eas build --platform all --profile production

# Submit to stores
eas submit --platform ios
eas submit --platform android
```

### Backend (Docker)

```dockerfile
# Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm build:api
CMD ["node", "apps/api/dist/app.js"]
```

### Environment-specific Builds

| Environment | API URL | Features |
|-------------|---------|----------|
| Development | localhost:3000 | All features, debug mode |
| Staging | staging-api.example.com | All features, real data |
| Production | api.example.com | Production features only |

---

## References

- [Blinkit - Structuring React Native Project](https://blinkit.com/blog/birth-structuring-react-native-project)
- [Blinkit - Building Design Library](https://blinkit.com/blog/building-blinkits-own-react-native-design-library)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
- [Storybook for React Native](https://storybook.js.org/tutorials/intro-to-storybook/react-native/en/get-started/)

---

## Contributing

1. Create feature branch from `main`
2. Follow the feature module structure
3. Add Storybook stories for new components
4. Write tests for business logic
5. Submit PR with description

---

*Last Updated: November 2025*
