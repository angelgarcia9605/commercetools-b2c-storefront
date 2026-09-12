import { create } from 'zustand';
import { createCart, addLineItem, removeLineItem, updateLineItemQuantity } from '../commercetools/cart';
import { Cart } from '../commercetools/cart';

interface CartStore {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
  initCart: (cart: Cart) => void;
  addItem: (productId: string, variantId: number, quantity: number) => Promise<void>;
  removeItem: (lineItemId: string) => Promise<void>;
  updateQuantity: (lineItemId: string, quantity: number) => Promise<void>;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  cart: null,
  loading: false,
  error: null,

  initCart: (cart: Cart) => {
    set({ cart });
  },

  addItem: async (productId: string, variantId: number, quantity: number) => {
    const { cart } = get();
    if (!cart) return;

    set({ loading: true, error: null });
    try {
      const response = await addLineItem(cart.id, cart.version, productId, variantId, quantity);
      if (response.data) {
        set({ cart: response.data });
      }
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  removeItem: async (lineItemId: string) => {
    const { cart } = get();
    if (!cart) return;

    set({ loading: true, error: null });
    try {
      const response = await removeLineItem(cart.id, cart.version, lineItemId);
      if (response.data) {
        set({ cart: response.data });
      }
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  updateQuantity: async (lineItemId: string, quantity: number) => {
    const { cart } = get();
    if (!cart) return;

    set({ loading: true, error: null });
    try {
      const response = await updateLineItemQuantity(cart.id, cart.version, lineItemId, quantity);
      if (response.data) {
        set({ cart: response.data });
      }
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  clearCart: () => {
    set({ cart: null });
  },
}));
