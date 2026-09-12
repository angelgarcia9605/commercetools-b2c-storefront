import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LineItem {
  id: string;
  productId: string;
  variantId: number;
  name: Record<string, string>;
  quantity: number;
  price: {
    value: {
      centAmount: number;
      currencyCode: string;
    };
  };
  totalPrice: {
    centAmount: number;
    currencyCode: string;
  };
  variant: {
    sku?: string;
    images?: Array<{ url: string }>;;
  };
}

interface Cart {
  id: string;
  lineItems: LineItem[];
  totalPrice: {
    centAmount: number;
    currencyCode: string;
  };
}

interface CartStore {
  cart: Cart | null;
  setCart: (cart: Cart) => void;
  addItem: (productId: string, variantId: number, quantity: number) => Promise<void>;
  removeItem: (lineItemId: string) => Promise<void>;
  updateQuantity: (lineItemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
}

export const useCartStore = create<CartStore>()(n  persist(
    (set, get) => ({
      cart: null,
      setCart: (cart) => set({ cart }),
      addItem: async (productId, variantId, quantity) => {
        // Simulate API call to add item to cart
        const currentCart = get().cart;
        if (currentCart) {
          const existingItem = currentCart.lineItems.find(
            (item) => item.productId === productId && item.variantId === variantId
          );
          if (existingItem) {
            existingItem.quantity += quantity;
          }
          set({ cart: currentCart });
        }
      },
      removeItem: async (lineItemId) => {
        const currentCart = get().cart;
        if (currentCart) {
          currentCart.lineItems = currentCart.lineItems.filter(
            (item) => item.id !== lineItemId
          );
          set({ cart: currentCart });
        }
      },
      updateQuantity: async (lineItemId, quantity) => {
        const currentCart = get().cart;
        if (currentCart) {
          const item = currentCart.lineItems.find((item) => item.id === lineItemId);
          if (item) {
            item.quantity = quantity;
            set({ cart: currentCart });
          }
        }
      },
      clearCart: async () => {
        set({ cart: null });
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
