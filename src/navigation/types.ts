import type { NavigatorScreenParams } from '@react-navigation/native';

// Main product stack
export type CollectionStackParamList = {
  ProductList: undefined;
  ProductDetails: {
    productId: string;
  };
};

// Bottom Tab Navigator
export type RootTabParamList = {
  Collection: NavigatorScreenParams<CollectionStackParamList>;
  Cart: undefined;
};