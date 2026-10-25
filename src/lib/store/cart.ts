import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type CartItem = {
  productId: string;
  variantId?: string;
  name: string;
  slug: string;
  image?: string;
  price: number; // cents
  quantity: number;
};

export type CartState = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (productId: string, variantId?: string) => void;
  setQuantity: (productId: string, quantity: number, variantId?: string) => void;
  clear: () => void;
  itemCount: () => number;
  subtotal: () => number;
  hasItem: (productId: string, variantId?: string) => boolean;
};

const keyMatch = (a: CartItem, b: CartItem) =>
  a.productId === b.productId && a.variantId === b.variantId;

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const existing = get().items.find((i) =>
          keyMatch(i, { ...item, quantity: 0 }),
        );
        set((state) => {
          const next = existing
            ? state.items.map((i) =>
                keyMatch(i, { ...item, quantity: 0 })
                  ? { ...i, quantity: i.quantity + (item.quantity ?? 1) }
                  : i,
              )
            : [
                ...state.items,
                { ...item, quantity: item.quantity ?? 1 },
              ];
          return { items: next };
        });
      },
      removeItem: (productId, variantId) =>
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.productId === productId && i.variantId === variantId),
          ),
        })),
      setQuantity: (productId, quantity, variantId) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId && i.variantId === variantId
              ? { ...i, quantity: Math.max(0, quantity) }
              : i,
          ),
        })),
      clear: () => set({ items: [] }),
      itemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      subtotal: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      hasItem: (productId, variantId) =>
        get().items.some(
          (i) => i.productId === productId && i.variantId === variantId,
        ),
    }),
    {
      name: "perfume-cart-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
