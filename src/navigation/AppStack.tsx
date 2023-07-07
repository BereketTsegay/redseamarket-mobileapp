import React, { useEffect } from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { RouteNames } from './Routes';
import WelcomeScreen from '../screens/welcome/WelcomeScreen';
import LoginScreen from '../screens/login/LoginScreen';
import RegisterScreen from '../screens/register/RegisterScreen';

const Stack = createNativeStackNavigator();



const AppStack = () => {

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name={RouteNames.WelcomeScreen} component={WelcomeScreen}/>
        <Stack.Screen name={RouteNames.LoginScreen} component={LoginScreen}/>
        <Stack.Screen name={RouteNames.RegisterScreen} component={RegisterScreen}/>
     
    </Stack.Navigator>
  );
};

export default AppStack;
