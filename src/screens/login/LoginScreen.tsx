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
export type LoginScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'LoginScreen'
>;

export type LoginScreenRouteProps = RouteProp<
  RootStackParams,
  'LoginScreen'
>;

interface Props {}

const LoginScreen: React.FC<Props> = () => {
  const navigation = useNavigation<LoginScreenNavigationProps>();
  useEffect(() => {
  }, []);

  return (
   <ImageBackground
   source={AppImages.BG} style={styles.container}>
    <View row centerV style={{justifyContent:'space-between'}}>
        <View marginL-40>
    <Text style={styles.text}>Hi, Welcome</Text>
    <Text style={styles.text1}>Back</Text>
    </View>
    <Image source={AppImages.PERSON1} style={{left:6}}/>
    </View>
    <View style={styles.view}>
    <TouchableOpacity onPress={()=>navigation.navigate(RouteNames.RegisterScreen)}
    style={styles.button}>
      <Text style={styles.text2}>Login</Text>
    </TouchableOpacity>
    </View>

   </ImageBackground>
    
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container:{
  flex:1,
  justifyContent:'flex-end'
  },
  view:{
    height:'70%',
    backgroundColor:AppColors.white,
    borderTopStartRadius:44,
    borderTopEndRadius:44,
    paddingHorizontal:50
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
  },
  text2:{
    fontFamily:AppFonts.POPPINS_MEDIUM,
    color:AppColors.darkBlue,
    fontSize:15
  },
  button:{
    borderColor:AppColors.blue,
    borderWidth:1,
    paddingVertical:5,
    borderRadius:8,
    alignItems:'center',
    justifyContent:'center'
  }
});
