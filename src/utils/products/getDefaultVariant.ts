import { Product, ProductVariant } from "../../hooks/api/products/useGetProducts";

/**
 * Returns the first variant that is available for sale, or the first variant as fallback.
 */
export const getDefaultVariant = (product: Product): ProductVariant => {
  return (
    product.variants.find((variant) => variant.availableForSale) ??
    product.variants[0]
  );
};