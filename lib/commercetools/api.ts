import { ctpClient } from './client';

export interface ApiResponse<T> {
  data: T;
  error?: string;
}

export const apiCall = async <T>(
  method: string,
  endpoint: string,
  body?: any
): Promise<ApiResponse<T>> => {
  try {
    const response = await ctpClient.execute({
      uri: endpoint,
      method: method as any,
      body: body ? JSON.stringify(body) : undefined,
    });

    return { data: response.body as T };
  } catch (error: any) {
    console.error(`API Error: ${error.message}`);
    return {
      data: {} as T,
      error: error.message,
    };
  }
};
