import React, {useState, useEffect} from 'react';
import {Image, Text, View} from 'react-native-ui-lib';
import {RootStackParams, RouteNames} from '../../navigation';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import AppColors from '../../constants/AppColors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppStrings from '../../constants/AppStrings';
import { TouchableOpacity } from 'react-native';
export type ProfileScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'ProfileScreen'
>;

export type ProfileScreenRouteProps = RouteProp<
  RootStackParams,
  'ProfileScreen'
>;

interface Props {}

const ProfileScreen: React.FC<Props> = () => {
  const navigation = useNavigation<ProfileScreenNavigationProps>();
  useEffect(() => {
  }, []);

  const Logout = async () => { 
    await AsyncStorage.removeItem(AppStrings.ACCESS_TOKEN);
    navigation.replace(RouteNames.WelcomeScreen)
 };

  return (
    <View flex center backgroundColor='#FFFFFF'>
      <TouchableOpacity onPress={Logout}>
        <Text color={AppColors.lightBlue}>Logout</Text>
        </TouchableOpacity>
        </View>
    
  );
};

export default ProfileScreen;