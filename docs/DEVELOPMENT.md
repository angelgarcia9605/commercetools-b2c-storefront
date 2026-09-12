# Development Guide

## Project Structure

```
commercetools-b2c-storefront/
├── app/                          # Next.js app directory
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   ├── globals.css              # Global styles
│   ├── products/                # Product pages
│   │   ├── page.tsx            # Products list
│   │   └── [slug]/
│   │       └── page.tsx        # Product detail
│   ├── search/                  # Search page
│   │   └── page.tsx            # Search results
│   ├── cart/                    # Shopping cart
│   │   └── page.tsx            # Cart page
│   ├── checkout/                # Checkout flow
│   │   └── page.tsx            # Checkout page
│   └── account/                 # User account
│       └── page.tsx            # Account page
├── components/                   # Reusable components
│   ├── Header.tsx              # Navigation header
│   ├── Footer.tsx              # Footer
│   ├── ProductCard.tsx         # Product card component
│   ├── SearchBar.tsx           # Search input
│   └── Facets.tsx              # Filter sidebar
├── lib/                          # Utility functions and services
│   ├── api-client.ts           # Axios configuration
│   ├── config.ts               # Environment config
│   ├── utils.ts                # Helper functions
│   ├── commercetools/          # commercetools API integration
│   │   ├── products.ts         # Products API
│   │   └── search.ts           # Search API
│   └── store/                   # Zustand stores
│       └── cartStore.ts        # Shopping cart state
├── public/                       # Static assets
├── docs/                         # Documentation
│   ├── API.md                  # API documentation
│   └── DEVELOPMENT.md          # This file
├── .env.local                    # Environment variables (not in repo)
├── .gitignore                    # Git ignore rules
├── .eslintrc.json               # ESLint configuration
├── package.json                 # Project dependencies
├── tailwind.config.ts           # Tailwind CSS config
├── tsconfig.json                # TypeScript config
├── next.config.ts               # Next.js config
├── postcss.config.js            # PostCSS config
└── README.md                     # Project README
```

## Getting Started

### 1. Clone and Install

```bash
git clone <repository-url>
cd commercetools-b2c-storefront
npm install
```

### 2. Environment Setup

Create `.env.local` with your commercetools credentials:

```env
NEXT_PUBLIC_COMMERCETOOLS_PROJECT_KEY=your_key
NEXT_PUBLIC_COMMERCETOOLS_CLIENT_ID=your_id
COMMERCETOOLS_CLIENT_SECRET=your_secret
COMMERCETOOLS_API_URL=https://api.sphere.it
COMMERCETOOLS_AUTH_URL=https://auth.sphere.it
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Code Conventions

### File Naming

- Components: PascalCase (e.g., `ProductCard.tsx`)
- Utilities: camelCase (e.g., `utils.ts`)
- Types: PascalCase (e.g., `Product.ts`)

### Component Structure

```typescript
'use client';

import { useState } from 'react';
import { SomeType } from '@/lib/types';

interface ComponentProps {
  title: string;
  onAction?: () => void;
}

export default function Component({ title, onAction }: ComponentProps) {
  const [state, setState] = useState('');

  return <div>{title}</div>;
}
```

### API Integration

Use the provided API clients in `lib/commercetools/`:

```typescript
import { getProducts } from '@/lib/commercetools/products';

export default async function Page() {
  const { data } = await getProducts(12, 0);
  return <div>{/* render products */}</div>;
}
```

## Styling

The project uses **Tailwind CSS** with custom configuration:

```typescript
// Custom colors in tailwind.config.ts
colors: {
  primary: '#1F2937',    // Dark gray
  secondary: '#3B82F6',  // Blue
  accent: '#1E40AF',     // Dark blue
  success: '#10B981',    // Green
  warning: '#F59E0B',    // Amber
  error: '#EF4444',      // Red
}
```

### Utility Classes

Defined in `app/globals.css`:

- `.btn-primary` - Primary button
- `.btn-secondary` - Secondary button
- `.card` - Card component
- `.input-field` - Form input
- `.badge` - Badge component

## State Management

Using **Zustand** for cart state:

```typescript
import { useCartStore } from '@/lib/store/cartStore';

export default function Component() {
  const cart = useCartStore((state) => state.cart);
  const addItem = useCartStore((state) => state.addItem);

  return <div>{/* use cart state */}</div>;
}
```

## Testing

### Unit Tests

```bash
npm run test
```

### E2E Tests

```bash
npm run e2e
```

## Deployment

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

## Troubleshooting

### Common Issues

**Issue**: 401 Unauthorized error
- **Solution**: Check commercetools credentials in `.env.local`

**Issue**: Products not loading
- **Solution**: Verify API credentials and network connection

**Issue**: Build fails with TypeScript errors
- **Solution**: Run `npm run type-check` and fix errors

## Performance

- Image optimization with Next.js `Image` component
- API response caching with Zustand persistence
- Code splitting with dynamic imports
- CSS minification with Tailwind

## Contributing

1. Create a feature branch
2. Make your changes
3. Run linting: `npm run lint`
4. Submit a pull request

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [commercetools Documentation](https://docs.commercetools.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
