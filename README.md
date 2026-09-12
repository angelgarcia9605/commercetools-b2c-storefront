# StoreFront - B2C E-commerce Storefront

![StoreFront](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![commercetools](https://img.shields.io/badge/commercetools-Headless%20Commerce-blue)
![License](https://img.shields.io/badge/license-MIT-green)

A modern, high-performance B2C e-commerce storefront built with **Next.js 14**, **React 18**, **TypeScript**, and **Tailwind CSS**, powered by **commercetools** headless commerce platform.

## 🌟 Features

✨ **Modern Architecture**
- Next.js 14 with App Router
- React 18 with Server Components
- TypeScript for type safety
- Tailwind CSS for styling

🛍️ **E-commerce Features**
- Product catalog with search and filtering
- Advanced product filtering (facets)
- Shopping cart with persistent storage
- Multi-step checkout process
- User account management
- Order history

⚡ **Performance**
- Server-side rendering (SSR)
- Static generation (SSG)
- Image optimization
- Code splitting
- Lazy loading
- CDN-ready

🔒 **Security**
- Secure payment integration
- HTTPS support
- Security headers
- Input validation
- CORS protection

📱 **Responsive Design**
- Mobile-first approach
- Tablet and desktop support
- Touch-friendly interface
- Accessibility (a11y) ready

🌐 **Integration Ready**
- commercetools API integration
- Payment gateway support
- Analytics integration ready
- Multi-language support ready

## 📋 Prerequisites

- **Node.js**: 18.0.0 or higher
- **npm**: 9.0.0 or higher
- **commercetools account** with API credentials

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/angelgarcia9605/commercetools-b2c-storefront.git
cd commercetools-b2c-storefront
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory:

```env
# commercetools API Credentials
NEXT_PUBLIC_COMMERCETOOLS_PROJECT_KEY=your_project_key
NEXT_PUBLIC_COMMERCETOOLS_CLIENT_ID=your_client_id
COMMERCETOOLS_CLIENT_SECRET=your_client_secret
COMMERCETOOLS_API_URL=https://api.sphere.it
COMMERCETOOLS_AUTH_URL=https://auth.sphere.it

# Application URL (optional)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📦 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm start           # Start production server

# Code Quality
npm run lint        # Run ESLint
npm run type-check  # Run TypeScript type checking

# Testing
npm test            # Run unit tests
npm run e2e         # Run end-to-end tests
```

## 📁 Project Structure

```
commercetools-b2c-storefront/
├── app/                    # Next.js App Router
│   ├── (pages)            # Page routes
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # Reusable components
├── lib/                   # Utilities and services
│   ├── commercetools/     # API clients
│   ├── store/            # Zustand stores
│   └── utils.ts          # Helper functions
├── public/               # Static assets
├── docs/                 # Documentation
└── package.json          # Dependencies
```

## 🎨 Pages

### Core Pages
- **Home** (`/`) - Landing page with featured products
- **Products** (`/products`) - Product catalog with filtering
- **Product Detail** (`/products/[slug]`) - Single product page
- **Search** (`/search`) - Search results page
- **Shopping Cart** (`/cart`) - Cart management
- **Checkout** (`/checkout`) - 3-step checkout process
- **Account** (`/account`) - User profile and settings

## 🧩 Components

### Layout Components
- `Header` - Navigation and branding
- `Footer` - Footer with links and info

### Product Components
- `ProductCard` - Individual product card
- `SearchBar` - Search input field
- `Facets` - Filter sidebar

### Form Components
- Login/Sign Up forms
- Checkout forms
- Account settings forms

## 🛠️ Technologies

### Frontend
- **Framework**: Next.js 14
- **Library**: React 18
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3
- **State**: Zustand 4
- **HTTP**: Axios 1

### Backend Services
- **Commerce**: commercetools
- **Hosting**: Vercel (recommended)

### Development
- **Linting**: ESLint
- **Testing**: Jest + React Testing Library
- **Version Control**: Git

## 🔌 API Integration

### commercetools APIs Used
- **Products API** - Get catalog and product details
- **Search API** - Full-text and faceted search
- **Carts API** - Shopping cart management
- **Orders API** - Order processing
- **Customers API** - User management
- **Payments API** - Payment processing

## 📚 Documentation

- [API Documentation](./docs/API.md) - API integration guide
- [Development Guide](./docs/DEVELOPMENT.md) - Development setup and conventions
- [Deployment Guide](./docs/DEPLOYMENT.md) - Deployment instructions
- [Contributing Guide](./docs/CONTRIBUTING.md) - How to contribute

## 🚀 Deployment

### Deploy to Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Deploy to Other Platforms

See [Deployment Guide](./docs/DEPLOYMENT.md) for AWS, Docker, and other options.

## 🔐 Security

- Environment variables for sensitive data
- Secure API authentication
- HTTPS only in production
- Security headers configured
- Input validation and sanitization
- XSS protection
- CSRF protection ready

## 📊 Performance Optimizations

- Image optimization with Next.js Image
- CSS minification with Tailwind
- JavaScript code splitting
- Server-side rendering for SEO
- Static generation where applicable
- API response caching
- Zustand state persistence

## 🤝 Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](./docs/CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting and tests
5. Submit a pull request

## 📝 License

MIT License - see LICENSE file for details

## 🆘 Support

- 📖 [Documentation](./docs)
- 🐛 [Issue Tracker](https://github.com/angelgarcia9605/commercetools-b2c-storefront/issues)
- 💬 [Discussions](https://github.com/angelgarcia9605/commercetools-b2c-storefront/discussions)

## 🔗 Resources

- [Next.js Documentation](https://nextjs.org)
- [commercetools Docs](https://docs.commercetools.com)
- [Tailwind CSS](https://tailwindcss.com)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

## 📧 Contact

For questions or inquiries, please contact the development team.

---

**Made with ❤️ by the StoreFront Team**
