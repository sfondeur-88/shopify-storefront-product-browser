import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import type {
  Product,
  ProductVariant,
} from '../hooks/api/products/useGetProducts';
import { calculateTotalItems, calculateTotalPrice } from '../utils/cart/cart';
import { loadCartFromStorage, saveCartToStorage } from '../utils/cart/storage';

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
  const [isCartLoaded, setIsCartLoaded] = useState(false);

  // Load cart from AsyncStorage on mount.
  useEffect(() => {
    const initializeCart = async () => {
      const savedCart = await loadCartFromStorage();
      setCartItems(savedCart);
      setIsCartLoaded(true);
    };

    initializeCart();
  }, []);

  // Save cart to AsyncStorage whenever it updates.
  useEffect(() => {
    if (!isCartLoaded) return;
    saveCartToStorage(cartItems);
  }, [cartItems, isCartLoaded]);

  const addToCart = (product: Product, variantToAdd: ProductVariant) => {
    setCartItems((prev) => {
      const existingItemIndex = prev.findIndex(
        (item) => item.variant.id === variantToAdd.id,
      );

      if (existingItemIndex >= 0) {
        return prev.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

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
