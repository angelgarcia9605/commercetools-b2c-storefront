// commercetools products API client
import apiClient from '@/lib/api-client';
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
  data: {
    results: Product[];
    total: number;
    offset: number;
    limit: number;
  };
}

export async function getProducts(
  limit: number = config.pagination.defaultPageSize,
  offset: number = 0
): Promise<ProductResponse> {
  try {
    const response = await apiClient.get(
      `/projects/${config.commercetools.projectKey}/products`,
      {
        params: {
          limit,
          offset,
        },
      }
    );
    return { data: response.data };
  } catch (error: any) {
    throw new Error(`Failed to fetch products: ${error.message}`);
  }
}

export async function getProductBySlug(
  slug: string
): Promise<ProductResponse> {
  try {
    const response = await apiClient.get(
      `/projects/${config.commercetools.projectKey}/products`,
      {
        params: {
          where: `slug(en-US="${slug}")`,
        },
      }
    );
    return { data: response.data };
  } catch (error: any) {
    throw new Error(`Failed to fetch product: ${error.message}`);
  }
}

export async function getProductById(id: string): Promise<Product> {
  try {
    const response = await apiClient.get(
      `/projects/${config.commercetools.projectKey}/products/${id}`
    );
    return response.data;
  } catch (error: any) {
    throw new Error(`Failed to fetch product: ${error.message}`);
  }
}
