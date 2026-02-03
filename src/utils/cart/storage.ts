import AsyncStorage from '@react-native-async-storage/async-storage';
import type { CartItem } from '../../context/CartContext';

const CART_STORAGE_KEY = '@cart_items';

export const loadCartFromStorage = async (): Promise<CartItem[]> => {
  try {
    const savedCart = await AsyncStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      return JSON.parse(savedCart);
    }
    return [];
  } catch (error) {
    console.error('Failed to load cart from storage:', error);
    return [];
  }
};

export const saveCartToStorage = async (cartItems: CartItem[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  } catch (error) {
    console.error('Failed to save cart to storage:', error);
  }
};

// Note: Unused at the moment, but would be perfect for post-checkout cart clearing.
export const clearCartStorage = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(CART_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear cart from storage:', error);
  }
};