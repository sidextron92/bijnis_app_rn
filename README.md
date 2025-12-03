# Quick Commerce App

A scalable quick commerce application built with React Native (Expo), supporting Android, iOS, and Web platforms.

## Features

- Phone + OTP Authentication
- Server-Driven UI (Dynamic Home Page)
- Product Catalog with Categories & Search
- Cart Management
- Checkout with Multiple Payment Options
- Real-time Order Tracking
- Order History

## Tech Stack

- **Frontend**: React Native (Expo), TypeScript, Redux Toolkit
- **Design System**: Custom component library with Storybook
- **Backend**: Node.js, Fastify, PostgreSQL, Redis (planned)

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 9+
- Expo CLI

### Installation

```bash
# Install dependencies
pnpm install

# Start the mobile app
pnpm dev:mobile

# Start Storybook
pnpm dev:storybook
```

### Project Structure

```
├── apps/
│   └── mobile/          # Expo mobile app
├── packages/
│   ├── design-system/   # UI component library
│   └── shared-types/    # TypeScript types
└── docs/                # Documentation
```

## Documentation

See [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) for detailed architecture documentation.

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev:mobile` | Start Expo development server |
| `pnpm dev:storybook` | Start Storybook |
| `pnpm build:mobile` | Build mobile app |
| `pnpm lint` | Run ESLint |
| `pnpm test` | Run tests |

## License

Private - All rights reserved
