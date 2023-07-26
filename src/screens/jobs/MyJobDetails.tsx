import React, {useState, useEffect} from 'react';
import {Image, Text, View} from 'react-native-ui-lib';
import {RootStackParams, RouteNames} from '../../navigation';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {ImageBackground, StyleSheet, TouchableOpacity} from 'react-native';
import AppColors from '../../constants/AppColors';
import AppImages from '../../constants/AppImages';
import AppFonts from '../../constants/AppFonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppStrings from '../../constants/AppStrings';
export type MyJobDetailsNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'MyJobDetails'
>;

export type MyJobDetailsRouteProps = RouteProp<
  RootStackParams,
  'MyJobDetails'
>;

interface Props {}

const MyJobDetails: React.FC<Props> = () => {
  const navigation = useNavigation<MyJobDetailsNavigationProps>();
  
  useEffect(() => {
  }, []);



  return (
   <ImageBackground
   source={AppImages.BG} style={styles.container}>

    

   

   </ImageBackground>
    
  );
};

export default MyJobDetails;

const styles = StyleSheet.create({
  container:{
  flex:1,
  alignItems:'center',
  justifyContent:'center'
  },
});
