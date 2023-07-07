import React from 'react';
import AppStack from './AppStack';
import { NavigationContainer } from '@react-navigation/native';

const Navigation = () => {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
};

export default Navigation;
