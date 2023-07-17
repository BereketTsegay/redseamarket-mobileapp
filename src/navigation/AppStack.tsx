import React, { useEffect } from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { RouteNames } from './Routes';
import WelcomeScreen from '../screens/welcome/WelcomeScreen';
import LoginScreen from '../screens/login/LoginScreen';
import RegisterScreen from '../screens/register/RegisterScreen';
import OtpVerificationScreen from '../screens/otp/OtpVerificationScreen';
import PostListScreen from '../screens/post/PostListScreen';
import BottomTabs from './BottomTabs';
import DetailsScreen from '../screens/details/DetailsScreen';
import CategoryListScreen from '../screens/category/CategoryListScreen';

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
        <Stack.Screen name={RouteNames.OtpVerificationScreen} component={OtpVerificationScreen}/>
        <Stack.Screen name={RouteNames.BottomTabs} component={BottomTabs}/>
        <Stack.Screen name={RouteNames.PostListScreen} component={PostListScreen}/>
        <Stack.Screen name={RouteNames.DetailsScreen} component={DetailsScreen}/>
        <Stack.Screen name={RouteNames.CategoryListScreen} component={CategoryListScreen}/>
     
    </Stack.Navigator>
  );
};

export default AppStack;
