import { apiCall } from './api';

export interface SearchParams {
  text: string;
  limit?: number;
  offset?: number;
  sort?: string;
  filter?: string[];
  facets?: string[];
}

export interface SearchResult {
  total: number;
  results: any[];
  facets?: Record<string, any>;
}

export const searchProducts = async (params: SearchParams) => {
  const { text, limit = 20, offset = 0, sort = '', filter = [], facets = [] } = params;

  let searchUrl = `/product-projections/search?limit=${limit}&offset=${offset}`;

  if (text) {
    searchUrl += `&text="${encodeURIComponent(text)}"`;
  }

  if (sort) {
    searchUrl += `&sort=${sort}`;
  }

  filter.forEach((f) => {
    searchUrl += `&filter=${encodeURIComponent(f)}`;
  });

  facets.forEach((facet) => {
    searchUrl += `&facet=${encodeURIComponent(facet)}`;
  });

  return apiCall<SearchResult>('GET', searchUrl);
};
