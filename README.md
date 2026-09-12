# CommercetoolsB2C Storefront

A modern B2C e-commerce storefront built with Next.js and commercetools.

## Features

- ✨ Modern, responsive UI with Tailwind CSS
- 🛍️ Product catalog with search and filtering
- 🛒 Shopping cart management
- 💳 Multi-step checkout process
- 👤 User account management
- 📱 Mobile-friendly design
- ⚡ Built with Next.js 14 and React 18
- 🔐 Secure payment integration
- 🌐 Multi-language support ready

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- commercetools account with API credentials

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd commercetools-b2c-storefront
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file with your commercetools credentials:

```env
NEXT_PUBLIC_COMMERCETOOLS_PROJECT_KEY=your_project_key
NEXT_PUBLIC_COMMERCETOOLS_CLIENT_ID=your_client_id
COMMERCETOOLS_CLIENT_SECRET=your_client_secret
COMMERCETOOLS_API_URL=https://api.sphere.it
COMMERCETOOLS_AUTH_URL=https://auth.sphere.it
```

4. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home page
│   ├── products/          # Products pages
│   ├── search/            # Search page
│   ├── cart/              # Shopping cart
│   ├── checkout/          # Checkout flow
│   ├── account/           # User account
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ProductCard.tsx
│   ├── SearchBar.tsx
│   └── ...
├── lib/                   # Utility functions and services
│   ├── commercetools/     # commercetools API integration
│   ├── store/             # Zustand stores
│   └── utils.ts           # Helper functions
└── public/                # Static assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Technologies Used

- **Framework**: Next.js 14
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Language**: TypeScript
- **Backend**: commercetools

## Environment Variables

The following environment variables are required:

- `NEXT_PUBLIC_COMMERCETOOLS_PROJECT_KEY` - Your commercetools project key
- `NEXT_PUBLIC_COMMERCETOOLS_CLIENT_ID` - Your commercetools client ID
- `COMMERCETOOLS_CLIENT_SECRET` - Your commercetools client secret
- `COMMERCETOOLS_API_URL` - The commercetools API URL
- `COMMERCETOOLS_AUTH_URL` - The commercetools authentication URL

## API Integration

The project includes integration with the commercetools API for:

- Product catalog
- Product search and filtering
- Shopping cart management
- Order management
- Customer management

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Support

For support, please open an issue on GitHub or contact the development team.
