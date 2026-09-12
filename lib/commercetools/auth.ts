import { apiCall } from './api';

export interface Customer {
  id: string;
  version: number;
  email: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  title?: string;
  dateOfBirth?: string;
  defaultBillingAddressId?: string;
  defaultShippingAddressId?: string;
  addresses: Address[];
  isEmailVerified: boolean;
  authenticationMode: string;
  createdAt: string;
  lastModifiedAt: string;
}

export interface Address {
  id: string;
  firstName?: string;
  lastName?: string;
  streetName?: string;
  streetNumber?: string;
  postalCode?: string;
  city?: string;
  country: string;
  phone?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  addresses?: Address[];
  defaultBillingAddress?: number;
  defaultShippingAddress?: number;
}

export const loginCustomer = async (credentials: LoginCredentials) => {
  return apiCall<Customer>('POST', '/login', credentials);
};

export const signUpCustomer = async (data: SignUpData) => {
  return apiCall<Customer>('POST', '/customers', data);
};

export const getCustomer = async (customerId: string) => {
  return apiCall<Customer>('GET', `/customers/${customerId}`);
};

export const updateCustomer = async (
  customerId: string,
  version: number,
  updates: Partial<Customer>
) => {
  return apiCall<Customer>('POST', `/customers/${customerId}`, {
    version,
    actions: Object.entries(updates).map(([key, value]) => ({
      action: `set${key.charAt(0).toUpperCase() + key.slice(1)}`,
      [key]: value,
    })),
  });
};

export const addAddress = async (
  customerId: string,
  version: number,
  address: Address
) => {
  return apiCall<Customer>('POST', `/customers/${customerId}`, {
    version,
    actions: [
      {
        action: 'addAddress',
        address,
      },
    ],
  });
};

export const removeAddress = async (
  customerId: string,
  version: number,
  addressId: string
) => {
  return apiCall<Customer>('POST', `/customers/${customerId}`, {
    version,
    actions: [
      {
        action: 'removeAddress',
        addressId,
      },
    ],
  });
};
