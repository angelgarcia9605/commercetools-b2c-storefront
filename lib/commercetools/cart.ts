import { apiCall } from './api';

export interface Cart {
  id: string;
  version: number;
  customerId?: string;
  lineItems: LineItem[];
  cartState: string;
  totalPrice: Money;
  taxedPrice?: TaxedPrice;
  shippingAddress?: Address;
  billingAddress?: Address;
  createdAt: string;
  lastModifiedAt: string;
}

export interface LineItem {
  id: string;
  productId: string;
  name: { [key: string]: string };
  productType: { id: string; typeId: string };
  variant: Variant;
  price: Price;
  quantity: number;
  totalPrice: Money;
  addedAt: string;
}

export interface Variant {
  id: number;
  sku?: string;
  prices: Price[];
  images: Image[];
}

export interface Price {
  id: string;
  value: Money;
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
}

export interface TaxedPrice {
  totalNet: Money;
  totalGross: Money;
  taxPortions: TaxPortion[];
}

export interface TaxPortion {
  rate: number;
  amount: Money;
}

export interface Address {
  id?: string;
  title?: string;
  firstName?: string;
  lastName?: string;
  streetName?: string;
  streetNumber?: string;
  postalCode?: string;
  city?: string;
  country: string;
  phone?: string;
  email?: string;
}

export const getCart = async (cartId: string) => {
  return apiCall<Cart>('GET', `/carts/${cartId}`);
};

export const createCart = async () => {
  return apiCall<Cart>('POST', '/carts', {
    currency: process.env.NEXT_PUBLIC_CURRENCY || 'USD',
  });
};

export const addLineItem = async (
  cartId: string,
  version: number,
  productId: string,
  variantId: number,
  quantity: number
) => {
  return apiCall<Cart>('POST', `/carts/${cartId}`, {
    version,
    actions: [
      {
        action: 'addLineItem',
        productId,
        variantId,
        quantity,
      },
    ],
  });
};

export const removeLineItem = async (
  cartId: string,
  version: number,
  lineItemId: string
) => {
  return apiCall<Cart>('POST', `/carts/${cartId}`, {
    version,
    actions: [
      {
        action: 'removeLineItem',
        lineItemId,
      },
    ],
  });
};

export const updateLineItemQuantity = async (
  cartId: string,
  version: number,
  lineItemId: string,
  quantity: number
) => {
  return apiCall<Cart>('POST', `/carts/${cartId}`, {
    version,
    actions: [
      {
        action: 'changeLineItemQuantity',
        lineItemId,
        quantity,
      },
    ],
  });
};

export const setShippingAddress = async (
  cartId: string,
  version: number,
  address: Address
) => {
  return apiCall<Cart>('POST', `/carts/${cartId}`, {
    version,
    actions: [
      {
        action: 'setShippingAddress',
        address,
      },
    ],
  });
};

export const setBillingAddress = async (
  cartId: string,
  version: number,
  address: Address
) => {
  return apiCall<Cart>('POST', `/carts/${cartId}`, {
    version,
    actions: [
      {
        action: 'setBillingAddress',
        address,
      },
    ],
  });
};
