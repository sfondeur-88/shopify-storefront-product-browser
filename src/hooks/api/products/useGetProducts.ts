import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

interface ProductImage {
  id: string;
  url: string;
}

interface Price {
  amount: string;
  currencyCode: string;
}

export interface ProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: Price;
  image: ProductImage;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  images: ProductImage[];
  variants: ProductVariant[];
}

const PRODUCTS_URL = 'https://gist.githubusercontent.com/tsopin/22b7b6b32cef24dbf3dd98ffcfb63b1a/raw/6f379a4730ceb3c625afbcb0427ca9db7f7f3b8b/testProducts.json';
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;

const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export const useGetProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);


  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    let lastError: Error | null = null;

    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
      try {
        const { data } = await axios.get<Product[]>(PRODUCTS_URL);
        setProducts(data);
        setIsLoading(false);
        return;
      } catch (err) {
        lastError = err instanceof Error ? err : new Error('Unknown error');

        // We won't call delay() after the last attempt.
        if (attempt < MAX_RETRIES - 1) {
          await delay(RETRY_DELAY_MS * (attempt + 1));
        }
      }
    }

    // All retries exhausted.
    setError(lastError);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    isLoading,
    error,
    refetch: fetchProducts,
  };
};