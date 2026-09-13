// commercetools products API client
import config from '@/lib/config';

export interface PriceValue {
  centAmount: number;
  currencyCode: string;
}

export interface Price {
  value: PriceValue;
  country?: string;
}

export interface Image {
  url: string;
  dimensions?: {
    w: number;
    h: number;
  };
}

export interface Attribute {
  name: string;
  value: string | number | any;
}

export interface ProductVariant {
  id: number;
  sku?: string;
  prices: Price[];
  images: Image[];
  attributes?: Attribute[];
}

export interface ProductData {
  name: Record<string, string>;
  description?: Record<string, string>;
  slug?: Record<string, string>;
  masterVariant: ProductVariant;
  variants?: ProductVariant[];
  categories?: Array<{ id: string; name: Record<string, string> }>;
}

export interface Product {
  id: string;
  key?: string;
  version: number;
  name?: Record<string, string>; // Flattened for backward compatibility
  description?: Record<string, string>; // Flattened for backward compatibility
  slug?: Record<string, string>; // Flattened for backward compatibility
  masterVariant?: ProductVariant; // Flattened for backward compatibility
  masterData?: {
    current?: ProductData;
    staged?: ProductData;
    published?: boolean;
  };
}

export interface ProductResponse {
  results: Product[];
  total: number;
  offset: number;
  limit: number;
}

// Helper function to normalize products from commercetools API
function normalizeProduct(product: any): Product {
  // Handle both formats: new commercetools API and legacy
  if (product.masterData?.current) {
    // New format with masterData
    const current = product.masterData.current;
    return {
      id: product.id,
      key: product.key,
      version: product.version,
      // Flatten the data for easier access
      name: current.name,
      description: current.description,
      slug: current.slug,
      masterVariant: current.masterVariant,
      // Keep original structure too
      masterData: product.masterData,
    };
  }
  // Legacy format - return as is
  return product;
}

async function getAccessToken(): Promise<string> {
  try {
    const response = await fetch('/api/auth/token');
    if (!response.ok) {
      throw new Error('Failed to get access token');
    }
    const data = await response.json();
    return data.access_token;
  } catch (error: any) {
    console.error('Token error:', error);
    throw new Error(`Authentication failed: ${error.message}`);
  }
}

export async function getProducts(
  limit: number = 12,
  offset: number = 0
): Promise<ProductResponse> {
  try {
    const token = await getAccessToken();
    const url = `${config.commercetools.apiUrl}/projects/${config.commercetools.projectKey}/products?limit=${limit}&offset=${offset}`;
    
    console.log('Fetching products from:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('Product fetch failed:', response.status, response.statusText);
      const errorText = await response.text();
      console.error('Error details:', errorText);
      
      return {
        results: [],
        total: 0,
        offset,
        limit,
      };
    }

    const data = await response.json();
    const normalizedResults = (data.results || []).map(normalizeProduct);
    
    return {
      results: normalizedResults,
      total: data.total || 0,
      offset: data.offset || offset,
      limit: data.limit || limit,
    };
  } catch (error: any) {
    console.error('Failed to fetch products:', error.message);
    return {
      results: [],
      total: 0,
      offset,
      limit,
    };
  }
}

export async function getProductBySlug(
  slug: string
): Promise<ProductResponse> {
  try {
    const token = await getAccessToken();
    const url = `${config.commercetools.apiUrl}/projects/${config.commercetools.projectKey}/products?where=slug(en-US="${slug}")`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return {
        results: [],
        total: 0,
        offset: 0,
        limit: 1,
      };
    }

    const data = await response.json();
    const normalizedResults = (data.results || []).map(normalizeProduct);
    
    return {
      results: normalizedResults,
      total: data.total || 0,
      offset: data.offset || 0,
      limit: data.limit || 1,
    };
  } catch (error: any) {
    console.error('Failed to fetch product:', error.message);
    return {
      results: [],
      total: 0,
      offset: 0,
      limit: 1,
    };
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const token = await getAccessToken();
    const url = `${config.commercetools.apiUrl}/projects/${config.commercetools.projectKey}/products/${id}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return null;
    }

    const product = await response.json();
    return normalizeProduct(product);
  } catch (error: any) {
    console.error('Failed to fetch product:', error.message);
    return null;
  }
}
