import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ProductDetailsScreen } from '../screens/ProductDetailsScreen';
import { ProductListScreen } from '../screens/ProductListScreen';
import type { CollectionStackParamList } from './types';

const Stack = createNativeStackNavigator<CollectionStackParamList>();

export const CollectionStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProductList"
        component={ProductListScreen}
        options={{ title: 'Products', headerShown: false }}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={{ title: 'Product Details', headerTitleAlign: 'center' }}
      />
    </Stack.Navigator>
  );
};
