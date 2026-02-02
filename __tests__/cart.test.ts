
import type { CartItem } from '../src/context/CartContext';
import type { ProductVariant } from '../src/hooks/api/products/useGetProducts';
import { calculateTotalItems, calculateTotalPrice } from '../src/utils/cart/cart';

const defaultMockVariant: ProductVariant = {
  id: 'variant-1',
  title: 'Default / S',
  availableForSale: true,
  price: { amount: '10.00', currencyCode: 'CAD' },
  image: { id: 'img-1', url: 'https://example.com/image.jpg' },
};

const createMockCartItem = (overrides: Partial<CartItem> = {}): CartItem => ({
  productTitle: 'Test Product',
  quantity: 1,
  variant: defaultMockVariant,
  ...overrides,
});

describe('Cart - Calculating Total Price', () => {
  test('calculates the total price for a single item', () => {
    const cartItems: CartItem[] = [
      createMockCartItem({
        quantity: 1,
        variant: {
          ...defaultMockVariant,
          price: { amount: '29.46', currencyCode: 'CAD' }
        }
      }),
    ];

    expect(calculateTotalPrice(cartItems)).toBe(29.46);
  });

  test('calculates the total price for multiple items', () => {
    const cartItems: CartItem[] = [
      createMockCartItem({
        quantity: 1,
        variant: {
          ...defaultMockVariant,
          price: { amount: '29.46', currencyCode: 'CAD' }
        }
      }),
      createMockCartItem({
        quantity: 1,
        variant: {
          ...defaultMockVariant,
          price: { amount: '50.00', currencyCode: 'CAD' },
        }
      }),
    ];

    expect(calculateTotalPrice(cartItems)).toBe(79.46);
  });

  test('calculates the total price accounting for quantity', () => {
    const cartItems: CartItem[] = [
      createMockCartItem({
        quantity: 3,
        variant: {
          ...defaultMockVariant,
          price: { amount: '29.46', currencyCode: 'CAD' }
        }
      }),
    ];

    expect(calculateTotalPrice(cartItems)).toBe(88.38);
  });
});

describe('Cart - Calculating Total Items', () => {
  test('returns 0 for an empty cart', () => {
    expect(calculateTotalItems([])).toBe(0);
  });

  test('calculates total for a single item with quantity of 1', () => {
    const cartItems: CartItem[] = [
      createMockCartItem({
        quantity: 1,
      }),
    ];

    expect(calculateTotalItems(cartItems)).toBe(1);
  });

  test('calculates total for a single item with quantity greater than 1', () => {
    const cartItems: CartItem[] = [
      createMockCartItem({
        quantity: 5,
      }),
    ];

    expect(calculateTotalItems(cartItems)).toBe(5);
  });

  test('calculates total for multiple items with different quantities', () => {
    const cartItems: CartItem[] = [
      createMockCartItem({ quantity: 1 }),
      createMockCartItem({ quantity: 2 }),
      createMockCartItem({ quantity: 3 }),
    ];

    expect(calculateTotalItems(cartItems)).toBe(6);
  });
});