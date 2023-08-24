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
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppStrings from '../../constants/AppStrings';
export type SplashScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'SplashScreen'
>;

export type WelcomeScreenRouteProps = RouteProp<
  RootStackParams,
  'SplashScreen'
>;

interface Props {}

const SplashScreen: React.FC<Props> = () => {
  const navigation = useNavigation<SplashScreenNavigationProps>();
  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage,
  );
  const strings = useSelector(
    (state: RootState) => state.language.resources[currentLanguage],
  );

  setTimeout(() => {
    AsyncStorage.getItem(AppStrings.ACCESS_TOKEN).then(value => {
      if (value) {
        navigation.replace(RouteNames.BottomTabs);
      } else {
        navigation.replace(RouteNames.LoginScreen);
      }
    });
  }, 3000);
 

  return (
   <ImageBackground
   source={AppImages.BG} style={styles.container}>

    <Text style={styles.text}>{strings.appName}</Text>
    <Text style={styles.text1}>{strings.trading}</Text>

   </ImageBackground>
    
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container:{
  flex:1,
  alignItems:'center',
  justifyContent:'center'
  },
  text:{
    fontFamily:AppFonts.POPPINS_BOLD,
    color:AppColors.white,
    fontSize:20
  },
  text1:{
    fontFamily:AppFonts.POPPINS_EXTRA_LIGHT,
    color:AppColors.white,
    fontSize:12
  },
  text2:{
    fontFamily:AppFonts.POPPINS_MEDIUM,
    color:AppColors.darkBlue,
    fontSize:15
  },
  button:{
    backgroundColor:AppColors.white,
    borderColor:AppColors.blue,
    borderWidth:1,
    position:'absolute',
    bottom:'20%',
    paddingVertical:5,
    width:'60%',
    borderRadius:8,
    alignItems:'center',
    justifyContent:'center'
  }
});
