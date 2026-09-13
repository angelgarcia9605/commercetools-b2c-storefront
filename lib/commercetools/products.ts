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
  value: string | number;
}

export interface ProductVariant {
  id: number;
  sku?: string;
  prices: Price[];
  images: Image[];
  attributes?: Attribute[];
}

export interface Product {
  id: string;
  key?: string;
  version: number;
  name: Record<string, string>;
  description?: Record<string, string>;
  slug?: Record<string, string>;
  masterVariant: ProductVariant;
  variants?: ProductVariant[];
  categories?: Array<{ id: string; name: Record<string, string> }>;
}

export interface ProductResponse {
  results: Product[];
  total: number;
  offset: number;
  limit: number;
}

export async function getProducts(
  limit: number = config.pagination.defaultPageSize,
  offset: number = 0
): Promise<ProductResponse> {
  try {
    const url = `${config.commercetools.apiUrl}/projects/${config.commercetools.projectKey}/products?limit=${limit}&offset=${offset}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('Product fetch failed:', response.statusText, response.status);
      // Return empty results instead of throwing
      return {
        results: [],
        total: 0,
        offset,
        limit,
      };
    }

    const data = await response.json();
    return {
      results: data.results || [],
      total: data.total || 0,
      offset: data.offset || offset,
      limit: data.limit || limit,
    };
  } catch (error: any) {
    console.error('Failed to fetch products:', error.message);
    // Return empty results instead of throwing
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
    const url = `${config.commercetools.apiUrl}/projects/${config.commercetools.projectKey}/products?where=slug(en-US="${slug}")`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
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
    return {
      results: data.results || [],
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
    const url = `${config.commercetools.apiUrl}/projects/${config.commercetools.projectKey}/products/${id}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error: any) {
    console.error('Failed to fetch product:', error.message);
    return null;
  }
}
