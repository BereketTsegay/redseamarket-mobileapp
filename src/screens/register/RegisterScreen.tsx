import React, {useState, useEffect} from 'react';
import {Image, Text, View} from 'react-native-ui-lib';
import {RootStackParams, RouteNames} from '../../navigation';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {ImageBackground, StyleSheet, TouchableOpacity} from 'react-native';
import AppImages from '../../constants/AppImages';
import AppColors from '../../constants/AppColors';
import AppFonts from '../../constants/AppFonts';

export type RegisterScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'RegisterScreen'
>;

export type RegisterScreenRouteProps = RouteProp<
  RootStackParams,
  'RegisterScreen'
>;

interface Props {}

const RegisterScreen: React.FC<Props> = () => {
  const navigation = useNavigation<RegisterScreenNavigationProps>();
  useEffect(() => {
  }, []);

  return (
   <ImageBackground
   source={AppImages.BG} style={styles.container}>
<View row>
<Image source={AppImages.PERSON2} style={{right:5}}/>
        <View marginL-20>
    <Text style={styles.text}>Hello Let's Get</Text>
    <Text style={styles.text1}>Started</Text>
    </View>
    
    </View>
    <View style={styles.view}>

    </View>

   </ImageBackground>
    
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container:{
  flex:1,
  justifyContent:'flex-end'
  },
  view:{
    height:'70%',
    backgroundColor:AppColors.white,
    borderTopStartRadius:44,
    borderTopEndRadius:44
  },
  text:{
    fontSize:24,
    color:AppColors.white,
    fontFamily:AppFonts.POPPINS_REGULAR
  },
  text1:{
    fontSize:24,
    color:AppColors.white,
    fontFamily:AppFonts.POPPINS_SEMIBOLD,
  }
});
