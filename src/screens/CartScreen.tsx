import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { CartItemRow } from '../components/cart/CartItemRow';
import { useCartContext } from '../context/CartContext';
import { formatPrice } from '../utils/products/pricing';

export const CartScreen = () => {
  const {
    cartItems,
    currencyCode,
    totalPrice,
    removeFromCart,
    updateQuantity,
  } = useCartContext();
  const insets = useSafeAreaInsets();
  const additionalPadding = 20;

  // Empty cart state
  if (cartItems.length <= 0) {
    return (
      <View
        accessible={true}
        accessibilityLabel="Your cart is empty"
        style={styles.emptyContainer}
      >
        <Text accessibilityRole="header" style={styles.emptyTitle}>
          Your cart is currently empty.
        </Text>
        <Text accessibilityRole="text" style={styles.emptySubtitle}>
          Browse our collection to get started!
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={[
        styles.root,
        { paddingBottom: insets.bottom + additionalPadding },
      ]}
    >
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.variant.id}
        ItemSeparatorComponent={<View style={styles.divider} />}
        accessible={false}
        renderItem={({ item }) => (
          <CartItemRow
            item={item}
            onUpdateQuantity={(newQuantity) =>
              updateQuantity(item.variant.id, newQuantity)
            }
            onRemove={() => removeFromCart(item.variant.id)}
          />
        )}
      />

      {/* Total */}
      <View
        style={styles.totalSection}
        accessible={true}
        accessibilityRole="text"
        accessibilityLabel={`Cart total: ${formatPrice(
          totalPrice.toString(),
          currencyCode,
        )}`}
      >
        <View style={styles.totalRow}>
          <Text
            style={styles.totalLabel}
            accessibilityElementsHidden={true} // Hide from screen reader since parent has the label.
            importantForAccessibility="no" // Android equivalent.
          >
            Total
          </Text>
          <Text
            style={styles.totalPrice}
            accessibilityElementsHidden={true} // Hide from screen reader since parent has the label.
            importantForAccessibility="no" // Android equivalent.
          >
            {formatPrice(totalPrice.toString(), currencyCode)}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 16,
  },
  totalSection: {
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    padding: 16,
    marginBottom: 40,
    backgroundColor: '#FFF',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
  },
});
