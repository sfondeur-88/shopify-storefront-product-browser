import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import React from 'react';
import { CartIcon } from '../components/icons/CartIcon';
import { GridIcon } from '../components/icons/GridIcon';
import { useCartContext } from '../context/CartContext';
import { CartScreen } from '../screens/CartScreen';
import { CollectionStackNavigator } from './CollectionStackNavigator';
import { CustomBottomTabBar } from './CustomBottomTabBar';
import type { RootTabParamList } from './types';

const Tab = createBottomTabNavigator<RootTabParamList>();

// Note:
// I extracted these into render functions to avoid creating new component instances every render
// Addresses the `react/no-unstable-nested-components` ESLint rule I was receiving.
const renderGridIcon = (color: string) => <GridIcon color={color} />;
const renderCartIcon = (color: string) => <CartIcon color={color} />;
const renderCustomBottomTabBar = (props: BottomTabBarProps) => (
  <CustomBottomTabBar {...props} />
);

export const BottomTabNavigator = () => {
  const { totalItems } = useCartContext();

  return (
    <Tab.Navigator
      tabBar={(props) => renderCustomBottomTabBar(props)}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#5433EB',
        tabBarInactiveTintColor: '#A0A0A0',
      }}
    >
      <Tab.Screen
        name="Collection"
        component={CollectionStackNavigator}
        options={{
          title: 'Collection',
          tabBarIcon: ({ color }) => renderGridIcon(color),
          tabBarAccessibilityLabel: 'Products tab',
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          title: 'Cart',
          tabBarIcon: ({ color }) => renderCartIcon(color),
          tabBarBadge: totalItems > 0 ? totalItems : undefined,
          tabBarAccessibilityLabel:
            totalItems > 0
              ? `Cart tab, ${totalItems} ${totalItems === 1 ? 'item' : 'items'}`
              : 'Cart tab',
        }}
      />
    </Tab.Navigator>
  );
};
