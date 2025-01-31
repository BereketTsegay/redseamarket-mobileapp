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
export type WelcomeScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'WelcomeScreen'
>;

export type WelcomeScreenRouteProps = RouteProp<
  RootStackParams,
  'WelcomeScreen'
>;

interface Props {}

const WelcomeScreen: React.FC<Props> = () => {
  const navigation = useNavigation<WelcomeScreenNavigationProps>();
  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage,
  );
  const strings = useSelector(
    (state: RootState) => state.language.resources[currentLanguage],
  );
 

  return (
   <ImageBackground
   source={AppImages.BG} style={styles.container}>

    <Text style={styles.text}>{strings.appName}</Text>
    <Text style={styles.text1}>{strings.trading}</Text>

    <TouchableOpacity onPress={()=>{navigation.replace(RouteNames.LoginScreen)}}
    style={styles.button}>
      <Text style={styles.text2}>{strings.getStarted}</Text>
    </TouchableOpacity>

   </ImageBackground>
    
  );
};

export default WelcomeScreen;

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
