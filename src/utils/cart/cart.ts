import type { CartItem } from "../../context/CartContext";

/**
 * Calculates the total price of the CartItems.
 * Rounds the result to prevent long floating numbers.
 */
export const calculateTotalPrice = (items: CartItem[]): number => {
  const total = items.reduce(
    (sum, item) => sum + parseFloat(item.variant.price.amount) * item.quantity,
    0,
  );

  return Math.round(total * 100) / 100;
};

/**
 * Calculates the total amount of CartItems.
 * Currently used with the Bottom navs Cart badge when items have been added.
 */
export const calculateTotalItems = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.quantity, 0);
};