// commercetools search API client
import apiClient from '@/lib/api-client';
import config from '@/lib/config';
import { ProductResponse } from './products';

export interface SearchParams {
  text?: string;
  limit?: number;
  offset?: number;
  sort?: string;
  fuzzy?: boolean;
}

export async function searchProducts(
  params: SearchParams
): Promise<ProductResponse> {
  try {
    const queryParams = {
      limit: params.limit || config.pagination.defaultPageSize,
      offset: params.offset || 0,
      ...(params.sort && { sort: params.sort }),
      ...(params.fuzzy && { fuzzy: params.fuzzy }),
    };

    const response = await apiClient.get(
      `/projects/${config.commercetools.projectKey}/product-projections/search`,
      {
        params: {
          ...queryParams,
          ...(params.text && { text: { 'en-US': params.text } }),
        },
      }
    );

    return { data: response.data };
  } catch (error: any) {
    throw new Error(`Search failed: ${error.message}`);
  }
}

export async function filterProducts(
  filters: Record<string, string[]>,
  limit: number = config.pagination.defaultPageSize,
  offset: number = 0
): Promise<ProductResponse> {
  try {
    const filterQueries = Object.entries(filters)
      .map(([key, values]) => `${key}:${values.join(',')}`)
      .join(' AND ');

    const response = await apiClient.get(
      `/projects/${config.commercetools.projectKey}/product-projections/search`,
      {
        params: {
          limit,
          offset,
          filter: filterQueries,
        },
      }
    );

    return { data: response.data };
  } catch (error: any) {
    throw new Error(`Filter failed: ${error.message}`);
  }
}
