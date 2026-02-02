import { act, renderHook } from '@testing-library/react-native';
import { CartProvider, useCartContext } from '../src/context/CartContext';
import type { Product, ProductVariant } from '../src/hooks/api/products/useGetProducts';

const mockProduct: Product = {
  id: 'product-1',
  title: 'Test Hoodie',
  description: 'A test product',
  images: [],
  variants: [],
};

const mockVariant: ProductVariant = {
  id: 'variant-1',
  title: 'Black / S',
  availableForSale: true,
  price: { amount: '29.46', currencyCode: 'CAD' },
  image: { id: 'img-1', url: 'https://example.com/image.jpg' },
};

describe('CartContext', () => {
  test('adds item to cart', () => {
    const { result } = renderHook(() => useCartContext(), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addToCart(mockProduct, mockVariant);
    });

    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.cartItems[0].variant.id).toBe('variant-1');
    expect(result.current.cartItems[0].quantity).toBe(1);
  });

  test('increments quantity for duplicate variant', () => {
    const { result } = renderHook(() => useCartContext(), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addToCart(mockProduct, mockVariant);
      result.current.addToCart(mockProduct, mockVariant);
    });

    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.cartItems[0].quantity).toBe(2);
  });

  test('decrements quantity for duplicate variant', () => {
    const { result } = renderHook(() => useCartContext(), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addToCart(mockProduct, mockVariant);
      result.current.updateQuantity('variant-1', 3);
    });

    expect(result.current.cartItems[0].quantity).toBe(3);

    act(() => {
      result.current.updateQuantity('variant-1', 2);
    });

    expect(result.current.cartItems[0].quantity).toBe(2);
    expect(result.current.cartItems).toHaveLength(1);
  });


  test('removes item when quantity updated to 0', () => {
    const { result } = renderHook(() => useCartContext(), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addToCart(mockProduct, mockVariant);
    });

    expect(result.current.cartItems).toHaveLength(1);

    act(() => {
      result.current.updateQuantity('variant-1', 0);
    });

    expect(result.current.cartItems).toHaveLength(0);
  });

  test('removes item from cart', () => {
    const { result } = renderHook(() => useCartContext(), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addToCart(mockProduct, mockVariant);
    });

    expect(result.current.cartItems).toHaveLength(1);

    act(() => {
      result.current.removeFromCart('variant-1');
    });

    expect(result.current.cartItems).toHaveLength(0);
  });
});