import React, { createContext, useCallback, useContext, useState } from 'react';
import type {
  Product,
  ProductVariant,
} from '../hooks/api/products/useGetProducts';
import { calculateTotalItems, calculateTotalPrice } from '../utils/cart/cart';

export interface CartItem {
  variant: ProductVariant;
  productTitle: string;
  quantity: number;
}

interface CartContextValues {
  cartItems: CartItem[];
  addToCart: (product: Product, variantToAdd: ProductVariant) => void;
  removeFromCart: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  totalItems: number;
  totalPrice: number;
  currencyCode: string;
}

const CartContext = createContext<CartContextValues | undefined>(undefined);

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider = (props: CartProviderProps) => {
  const { children } = props;

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product, variantToAdd: ProductVariant) => {
    setCartItems((prev) => {
      const existingItemIndex = prev.findIndex(
        (item) => item.variant.id === variantToAdd.id,
      );

      // If the variant is already in the cart, we increment quantity.
      if (existingItemIndex >= 0) {
        return prev.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      // New variant, just add to cart.
      return [
        ...prev,
        {
          variant: variantToAdd,
          productTitle: product.title,
          quantity: 1,
        },
      ];
    });
  };

  const removeFromCart = useCallback((variantId: string) => {
    setCartItems((prev) =>
      prev.filter((item) => item.variant.id !== variantId),
    );
  }, []);

  const updateQuantity = useCallback(
    (variantId: string, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(variantId);
        return;
      }

      setCartItems((prev) =>
        prev.map((item) =>
          item.variant.id === variantId ? { ...item, quantity } : item,
        ),
      );
    },
    [removeFromCart],
  );

  const totalPrice = calculateTotalPrice(cartItems);
  const totalItems = calculateTotalItems(cartItems);

  // Note:
  // Normally this would come from user locale, App prefs, AuthContext or some other setting.
  // Just wanted to prevent hard-coding the currency within the CartScreen.
  const currencyCode = cartItems[0]?.variant.price.currencyCode ?? 'CAD';

  const value: CartContextValues = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    totalPrice,
    totalItems,
    currencyCode,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCartContext = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider!');
  }

  return context;
};
