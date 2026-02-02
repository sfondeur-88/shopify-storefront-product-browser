import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Product } from '../../hooks/api/products/useGetProducts';
import { getDefaultVariant } from '../../utils/products/getDefaultVariant';
import { formatPrice } from '../../utils/products/pricing';

interface ProductCardProps {
  product: Product;
  onPress: () => void;
}

export const ProductCard = (props: ProductCardProps) => {
  const { product, onPress } = props;

  const defaultVariant = getDefaultVariant(product);
  const price = formatPrice(
    defaultVariant.price.amount,
    defaultVariant.price.currencyCode,
  );

  return (
    <TouchableOpacity
      onPress={onPress}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={`${product.title}, ${price}`}
      accessibilityHint="Tap to view product details"
      style={styles.card}
      activeOpacity={0.7}
    >
      <Image
        source={{ uri: defaultVariant.image.url }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>
        <Text style={styles.price}>{price}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(5,41,77,.1)',
  },
  info: {
    padding: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
});
