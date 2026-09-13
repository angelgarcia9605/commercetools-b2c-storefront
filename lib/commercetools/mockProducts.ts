// Mock products data for development
export const mockProducts = [
  {
    id: '1',
    version: 1,
    name: { 'en-US': 'Premium Wireless Headphones' },
    description: { 'en-US': 'High-quality wireless headphones with noise cancellation' },
    slug: { 'en-US': 'premium-wireless-headphones' },
    masterVariant: {
      id: 1,
      sku: 'WH-1000XM4',
      prices: [
        {
          value: { centAmount: 34999, currencyCode: 'USD' },
        },
      ],
      images: [
        {
          url: 'https://via.placeholder.com/500x500?text=Headphones',
        },
      ],
    },
  },
  {
    id: '2',
    version: 1,
    name: { 'en-US': 'Smart Watch Pro' },
    description: { 'en-US': 'Advanced smartwatch with health tracking features' },
    slug: { 'en-US': 'smart-watch-pro' },
    masterVariant: {
      id: 1,
      sku: 'SW-PRO-001',
      prices: [
        {
          value: { centAmount: 29999, currencyCode: 'USD' },
        },
      ],
      images: [
        {
          url: 'https://via.placeholder.com/500x500?text=Smart+Watch',
        },
      ],
    },
  },
  {
    id: '3',
    version: 1,
    name: { 'en-US': 'Portable Charger' },
    description: { 'en-US': 'Fast charging portable battery for all devices' },
    slug: { 'en-US': 'portable-charger' },
    masterVariant: {
      id: 1,
      sku: 'PC-20000',
      prices: [
        {
          value: { centAmount: 4999, currencyCode: 'USD' },
        },
      ],
      images: [
        {
          url: 'https://via.placeholder.com/500x500?text=Power+Bank',
        },
      ],
    },
  },
  {
    id: '4',
    version: 1,
    name: { 'en-US': 'Wireless Keyboard' },
    description: { 'en-US': 'Ergonomic wireless keyboard for productivity' },
    slug: { 'en-US': 'wireless-keyboard' },
    masterVariant: {
      id: 1,
      sku: 'KB-WIRELESS-01',
      prices: [
        {
          value: { centAmount: 7999, currencyCode: 'USD' },
        },
      ],
      images: [
        {
          url: 'https://via.placeholder.com/500x500?text=Keyboard',
        },
      ],
    },
  },
  {
    id: '5',
    version: 1,
    name: { 'en-US': 'USB-C Cable' },
    description: { 'en-US': 'Durable USB-C charging and data cable' },
    slug: { 'en-US': 'usb-c-cable' },
    masterVariant: {
      id: 1,
      sku: 'USB-C-2M',
      prices: [
        {
          value: { centAmount: 1999, currencyCode: 'USD' },
        },
      ],
      images: [
        {
          url: 'https://via.placeholder.com/500x500?text=USB-C+Cable',
        },
      ],
    },
  },
  {
    id: '6',
    version: 1,
    name: { 'en-US': 'Screen Protector' },
    description: { 'en-US': 'Tempered glass screen protector for smartphones' },
    slug: { 'en-US': 'screen-protector' },
    masterVariant: {
      id: 1,
      sku: 'SP-TEMPERED-01',
      prices: [
        {
          value: { centAmount: 999, currencyCode: 'USD' },
        },
      ],
      images: [
        {
          url: 'https://via.placeholder.com/500x500?text=Screen+Protector',
        },
      ],
    },
  },
];
