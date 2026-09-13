// Environment configuration
const config = {
  commercetools: {
    projectKey: process.env.NEXT_PUBLIC_COMMERCETOOLS_PROJECT_KEY || '',
    clientId: process.env.NEXT_PUBLIC_COMMERCETOOLS_CLIENT_ID || '',
    clientSecret: process.env.COMMERCETOOLS_CLIENT_SECRET || '',
    apiUrl: process.env.COMMERCETOOLS_API_URL || 'https://api.us-central1.gcp.commercetools.com',
    authUrl: process.env.COMMERCETOOLS_AUTH_URL || 'https://auth.us-central1.gcp.commercetools.com',
  },
  app: {
    name: 'StoreFront',
    description: 'B2C E-commerce Storefront',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },
  pagination: {
    defaultPageSize: 12,
    maxPageSize: 100,
  },
  cache: {
    ttl: 60 * 60 * 24, // 24 hours
  },
};

export default config;
