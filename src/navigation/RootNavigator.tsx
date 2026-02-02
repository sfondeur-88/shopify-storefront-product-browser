import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { BottomTabNavigator } from './BottomTabNavigator';

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
  );
};
