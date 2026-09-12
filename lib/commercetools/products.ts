import { apiCall } from './api';

export interface ProductSearchParams {
  query?: string;
  facets?: string[];
  sort?: string;
  limit?: number;
  offset?: number;
  filter?: string[];
}

export interface Product {
  id: string;
  key?: string;
  name: { [key: string]: string };
  description?: { [key: string]: string };
  slug: { [key: string]: string };
  masterVariant: Variant;
  variants: Variant[];
  productType: { id: string };
  categories: Array<{ id: string; typeId: string }>;
  createdAt: string;
  lastModifiedAt: string;
}

export interface Variant {
  id: number;
  sku?: string;
  key?: string;
  prices: Price[];
  images: Image[];
  attributes: Attribute[];
}

export interface Price {
  id: string;
  value: Money;
  country?: string;
  customerGroup?: { id: string; typeId: string };
}

export interface Money {
  type: 'centPrecision';
  currencyCode: string;
  centAmount: number;
  fractionDigits: number;
}

export interface Image {
  url: string;
  dimensions: { w: number; h: number };
  label?: string;
}

export interface Attribute {
  name: string;
  value: any;
}

export const getProducts = async (
  params: ProductSearchParams = {}
) => {
  const { query = '', facets = [], sort = '', limit = 20, offset = 0, filter = [] } = params;

  let searchParams = `/product-projections/search?limit=${limit}&offset=${offset}`;

  if (query) {
    searchParams += `&text="${query}"`;
  }

  if (sort) {
    searchParams += `&sort=${sort}`;
  }

  filter.forEach((f) => {
    searchParams += `&filter=${encodeURIComponent(f)}`;
  });

  facets.forEach((facet) => {
    searchParams += `&facet=${encodeURIComponent(facet)}`;
  });

  return apiCall<any>('GET', searchParams);
};

export const getProductById = async (id: string) => {
  return apiCall<Product>('GET', `/product-projections/${id}`);
};

export const getProductBySlug = async (slug: string) => {
  return apiCall<{ results: Product[] }>(
    'GET',
    `/product-projections?where=slug(en-US="${slug}")`
  );
};
