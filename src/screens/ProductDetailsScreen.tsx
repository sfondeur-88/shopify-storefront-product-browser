import type { RouteProp } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useCartContext } from '../context/CartContext';
import {
  ProductVariant,
  useGetProducts,
} from '../hooks/api/products/useGetProducts';
import type { CollectionStackParamList } from '../navigation/types';
import { getDefaultVariant } from '../utils/products/getDefaultVariant';
import { formatPrice } from '../utils/products/pricing';

export const ProductDetailsScreen = () => {
  const route =
    useRoute<RouteProp<CollectionStackParamList, 'ProductDetails'>>();
  const { productId } = route.params;
  const { products, isLoading } = useGetProducts();
  const { addToCart } = useCartContext();

  const [isVariantsExpanded, setIsVariantsExpanded] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    null,
  );

  const product = products.find((p) => p.id === productId);

  // Loading
  if (isLoading || !product) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#5433EB" />
      </View>
    );
  }

  const activeVariant = selectedVariant ?? getDefaultVariant(product);
  const price = formatPrice(
    activeVariant.price.amount,
    activeVariant.price.currencyCode,
  );

  return (
    <ScrollView style={styles.container}>
      {/* Product Image */}
      <Image
        source={{ uri: activeVariant.image.url }}
        style={styles.image}
        resizeMode="cover"
      />

      {/* Product Info */}
      <View style={styles.info}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>{price}</Text>
        <Text style={styles.description}>{product.description}</Text>
      </View>

      {/* Variant Selector */}
      <View style={styles.variantSection}>
        <TouchableOpacity
          style={styles.variantHeader}
          onPress={() => setIsVariantsExpanded(!isVariantsExpanded)}
        >
          <Text style={styles.variantHeaderText}>
            Variants ({product.variants.length})
          </Text>
          <Text style={styles.variantToggleIcon}>
            {isVariantsExpanded ? '▲' : '▼'}
          </Text>
        </TouchableOpacity>

        {isVariantsExpanded && (
          <View style={styles.variantList}>
            {product.variants.map((variant) => {
              const isSelected = activeVariant.id === variant.id;
              const isUnavailable = !variant.availableForSale;

              return (
                <TouchableOpacity
                  key={variant.id}
                  onPress={() => !isUnavailable && setSelectedVariant(variant)}
                  disabled={isUnavailable}
                  style={[
                    styles.variantItem,
                    isSelected && styles.variantItemSelected,
                    isUnavailable && styles.variantItemUnavailable,
                  ]}
                >
                  <Text
                    style={[
                      styles.variantItemText,
                      isSelected && styles.variantItemTextSelected,
                      isUnavailable && styles.variantItemTextUnavailable,
                    ]}
                  >
                    {variant.title}
                  </Text>
                  {isUnavailable && (
                    <Text style={styles.unavailableBadge}>Out of Stock</Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </View>

      {/* Add to Cart Button */}
      <TouchableOpacity
        onPress={() => addToCart(product, activeVariant)}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Add to cart"
        accessibilityHint="Adds this product to your shopping cart"
        style={styles.addToCartButton}
      >
        <Text style={styles.addToCartText}>Add to Cart</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EEE',
    borderRadius: 16,
  },
  info: {
    paddingVertical: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  variantSection: {
    marginTop: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    overflow: 'hidden',
  },
  variantHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F5F5F5',
  },
  variantHeaderText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  variantToggleIcon: {
    fontSize: 12,
    color: '#666',
  },
  variantList: {
    padding: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  variantItem: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFF',
  },
  variantItemSelected: {
    borderColor: '#000',
    backgroundColor: '#EEE',
  },
  variantItemUnavailable: {
    opacity: 0.4,
    borderStyle: 'dashed',
  },
  variantItemText: {
    fontSize: 14,
    color: '#333',
  },
  variantItemTextSelected: {
    color: '#333',
    fontWeight: '600',
  },
  variantItemTextUnavailable: {
    textDecorationLine: 'line-through',
  },
  unavailableBadge: {
    fontSize: 10,
    color: '#FF3B30',
    marginTop: 2,
  },
  addToCartButton: {
    marginTop: 16,
    marginBottom: 128,
    paddingVertical: 16,
    borderRadius: 30,
    backgroundColor: '#5433EB',
    alignItems: 'center',
  },
  addToCartText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
