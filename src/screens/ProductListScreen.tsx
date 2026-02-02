import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProductCard } from '../components/products/ProductCard';
import { useGetProducts } from '../hooks/api/products/useGetProducts';
import type { CollectionStackParamList } from '../navigation/types';

export const ProductListScreen = () => {
  const navigation = useNavigation<NavigationProp<CollectionStackParamList>>();
  const { products, isLoading, error, refetch } = useGetProducts();

  // Loading
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#5433EB" />
      </View>
    );
  }

  // Error
  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error?.message}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={refetch}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() =>
              navigation.navigate('ProductDetails', { productId: item.id })
            }
          />
        )}
        columnWrapperStyle={styles.listGap}
        contentContainerStyle={styles.listGap}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  listGap: {
    gap: 8,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#FF3B30',
    marginBottom: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  retryButton: {
    backgroundColor: '#5433EB',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
