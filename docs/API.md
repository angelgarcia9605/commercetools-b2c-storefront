# API Documentation

## Overview

This storefront is powered by commercetools, a headless commerce platform. All API interactions are handled through the commercetools API.

## Environment Variables

You need to set the following environment variables in your `.env.local` file:

```env
# commercetools API Credentials
NEXT_PUBLIC_COMMERCETOOLS_PROJECT_KEY=your_project_key
NEXT_PUBLIC_COMMERCETOOLS_CLIENT_ID=your_client_id
COMMERCETOOLS_CLIENT_SECRET=your_client_secret
COMMERCETOOLS_API_URL=https://api.sphere.it
COMMERCETOOLS_AUTH_URL=https://auth.sphere.it

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## API Clients

### Products API

Location: `lib/commercetools/products.ts`

#### Functions

- `getProducts(limit, offset)` - Get all products with pagination
- `getProductBySlug(slug)` - Get a single product by slug
- `getProductById(id)` - Get a single product by ID

### Search API

Location: `lib/commercetools/search.ts`

#### Functions

- `searchProducts(params)` - Search products with text query
- `filterProducts(filters, limit, offset)` - Filter products by attributes

## API Client Configuration

The API client is configured in `lib/api-client.ts` with:

- Authentication interceptors
- Error handling
- Token management
- Request/response logging

## Error Handling

All API errors are caught and logged. Common error codes:

- `401` - Unauthorized (token expired)
- `404` - Not found
- `400` - Bad request
- `500` - Server error

## Rate Limiting

commercetools enforces rate limits. Check response headers for:

- `X-RateLimit-Limit`
- `X-RateLimit-Remaining`
- `X-RateLimit-Reset`
