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
import FilterScreen from '../screens/category/FilterScreen';
import PostSecondScreen from '../screens/post/PostSecondScreen';
import PlaceAdScreen from '../screens/post/PlaceAdScreen';
import CustomPlaceAd from '../screens/post/CustomPlaceAd';
import SellerInformation from '../screens/post/SellerInformation';
import PaymentScreen from '../screens/post/PaymentScreen';
import SuccessPage from '../screens/success/SuccessPage';
import MotorPlaceAd from '../screens/post/MotorPlaceAd';
import SaleRentPlaceAd from '../screens/post/SaleRentPlaceAd';
import { PlaceAdProvider } from '../api/placeAd/PlaceAdContext';
import MyJobProfile from '../screens/jobs/MyJobProfile';
import TermsAndConditions from '../screens/terms/TermsAndConditions';
import MyJobDetails from '../screens/jobs/MyJobDetails';
import { CommonProvider } from '../api/commonContext';
import { JobProvider } from '../api/jobs/JobContext';
import JobSearch from '../screens/jobs/JobSearch';
import JobApply from '../screens/jobs/JobApply';

const Stack = createNativeStackNavigator();



const AppStack = () => {

  return (
    <CommonProvider>
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name={RouteNames.WelcomeScreen} component={WelcomeScreen}/>
        <Stack.Screen name={RouteNames.LoginScreen} component={LoginScreen}/>
        <Stack.Screen name={RouteNames.RegisterScreen} component={RegisterScreen}/>
        <Stack.Screen name={RouteNames.OtpVerificationScreen} component={OtpVerificationScreen}/>
        <Stack.Screen name={RouteNames.BottomTabs} component={BottomTabs}/>
        <Stack.Screen name={RouteNames.DetailsScreen} component={DetailsScreen}/>
        <Stack.Screen name={RouteNames.CategoryListScreen} component={CategoryListScreen}/>
        <Stack.Screen name={RouteNames.FilterScreen} component={FilterScreen}/>
        <Stack.Screen name={RouteNames.PaymentScreen} component={PaymentScreen}/>
        <Stack.Screen name={RouteNames.SuccessPage} component={SuccessPage}/>
        <Stack.Screen name={'JobProfile'} component={JobProfileAdd}/>
        <Stack.Screen name={RouteNames.TermsAndConditions} component={TermsAndConditions}/>
        <Stack.Screen name={'PostScreen'} component={AdPost}/>
        <Stack.Screen name={'Apply_Job'} component={Apply_Job}/>
     
    </Stack.Navigator>
    </CommonProvider>
  );
};

const AdPost = () => {
  return(
    <PlaceAdProvider>
    <Stack.Navigator
    screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name={RouteNames.PostListScreen} component={PostListScreen}/>
      <Stack.Screen name={RouteNames.JobSearch} component={JobSearch}/>
      <Stack.Screen name={RouteNames.PostSecondScreen} component={PostSecondScreen}/>
      <Stack.Screen name={RouteNames.PlaceAdScreen} component={PlaceAdScreen}/>
      <Stack.Screen name={RouteNames.CustomPlaceAd} component={CustomPlaceAd}/>
      <Stack.Screen name={RouteNames.SellerInformation} component={SellerInformation}/>
      <Stack.Screen name={RouteNames.MotorPlaceAd} component={MotorPlaceAd}/>
      <Stack.Screen name={RouteNames.SaleRentPlaceAd} component={SaleRentPlaceAd}/>
   
  </Stack.Navigator>
  </PlaceAdProvider>
  )
}

const JobProfileAdd = () => {
  return(
    <JobProvider>
    <Stack.Navigator
    screenOptions={{
      headerShown: false
    }}>
     <Stack.Screen name={RouteNames.MyJobProfile} component={MyJobProfile}/>
     <Stack.Screen name={RouteNames.MyJobDetails} component={MyJobDetails}/>
  </Stack.Navigator>
  </JobProvider>
  )
}

const Apply_Job = () => {
  return(
  <Stack.Navigator
    screenOptions={{
      headerShown: false
    }}>
     <Stack.Screen name={RouteNames.JobApply} component={JobApply}/>
  </Stack.Navigator>
  )
}

export default AppStack;
