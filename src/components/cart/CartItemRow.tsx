import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CartItem } from '../../context/CartContext';
import { formatPrice } from '../../utils/products/pricing';
import { QuantityStepper } from './QuantityStepper';

interface CartItemRowProps {
  item: CartItem;
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
}

export const CartItemRow = (props: CartItemRowProps) => {
  const { item, onUpdateQuantity, onRemove } = props;

  const itemTotal = (
    parseFloat(item.variant.price.amount) * item.quantity
  ).toString();

  return (
    <View style={styles.cartItemRow}>
      <Image
        source={{ uri: item.variant.image.url }}
        style={styles.cartItemImage}
        resizeMode="cover"
      />
      <View style={styles.cartItemDescription}>
        <Text style={styles.cartItemTitle} numberOfLines={2}>
          {item.productTitle}
        </Text>
        <Text style={styles.cartItemVariant}>{item.variant.title}</Text>
        <Text style={styles.cartItemPrice}>
          {formatPrice(itemTotal, item.variant.price.currencyCode)}
        </Text>
        <View style={styles.cartItemActions}>
          <QuantityStepper
            quantity={item.quantity}
            onIncrement={() => onUpdateQuantity(item.quantity + 1)}
            onDecrement={() => onUpdateQuantity(item.quantity - 1)}
          />
          <TouchableOpacity
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={`Remove ${item.productTitle} from cart`}
            accessibilityHint="Tap to remove this item"
            onPress={onRemove}
            style={styles.removeButton}
            activeOpacity={0.7}
          >
            <Text style={styles.removeButtonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItemRow: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  cartItemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
  },
  cartItemDescription: {
    flex: 1,
    justifyContent: 'center',
  },
  cartItemTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  cartItemVariant: {
    fontSize: 13,
    color: '#888',
    marginBottom: 4,
  },
  cartItemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  cartItemActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  removeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#FF3B30',
  },
  removeButtonText: {
    fontSize: 13,
    color: '#FF3B30',
    fontWeight: '600',
  },
});
