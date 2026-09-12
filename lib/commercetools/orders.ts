import { apiCall } from './api';

export interface Order {
  id: string;
  version: number;
  orderNumber?: string;
  customerId?: string;
  lineItems: LineItem[];
  totalPrice: Money;
  taxedPrice?: TaxedPrice;
  shippingAddress?: Address;
  billingAddress?: Address;
  orderState: string;
  paymentState: string;
  shipmentState: string;
  createdAt: string;
  lastModifiedAt: string;
}

export interface LineItem {
  id: string;
  productId: string;
  name: { [key: string]: string };
  quantity: number;
  totalPrice: Money;
}

export interface Money {
  type: 'centPrecision';
  currencyCode: string;
  centAmount: number;
  fractionDigits: number;
}

export interface TaxedPrice {
  totalNet: Money;
  totalGross: Money;
}

export interface Address {
  id?: string;
  firstName?: string;
  lastName?: string;
  streetName?: string;
  postalCode?: string;
  city?: string;
  country: string;
  phone?: string;
  email?: string;
}

export const createOrderFromCart = async (
  cartId: string,
  version: number
) => {
  return apiCall<Order>('POST', `/orders`, {
    cartId,
    version,
  });
};

export const getOrder = async (orderId: string) => {
  return apiCall<Order>('GET', `/orders/${orderId}`);
};

export const getCustomerOrders = async (customerId: string) => {
  return apiCall<{ results: Order[] }>(
    'GET',
    `/orders?where=customerId="${customerId}"`
  );
};
