import React, {useState, useEffect} from 'react';
import {Image, Incubator, Text, View} from 'react-native-ui-lib';
import {RootStackParams, RouteNames} from '../../navigation';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {ImageBackground, StyleSheet, TouchableOpacity} from 'react-native';
import AppImages from '../../constants/AppImages';
import AppColors from '../../constants/AppColors';
import AppFonts from '../../constants/AppFonts';
import styles from './styles';

const {TextField} = Incubator;
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
      <Text style={styles.heading}>Log in</Text>
      <TextField
      fieldStyle={styles.inputLayout}
      placeholder={'Email'}
      floatingPlaceholder
      floatingPlaceholderColor={'black'}
      floatOnFocus="true"
      keyboardType="default"
      floatingPlaceholderStyle={styles.floatStyle}
      marginT-30/>

<TextField
      fieldStyle={styles.inputLayout}
      placeholder={'Password'}
      floatingPlaceholder
      floatingPlaceholderColor={'black'}
      floatOnFocus="true"
      keyboardType="default"
      floatingPlaceholderStyle={styles.floatStyle}
      trailingAccessory={
        <Image source={AppImages.EYE} style={{height:12,width:14,right:10}}/>
      }/>

      <View row center marginV-20>
        <Image source={AppImages.FACEBOOK} style={{width:26, height:26}}/>
        <Image source={AppImages.GOOGLE} style={{width:26, height:26,marginLeft:20}}/>
      </View>
    <TouchableOpacity onPress={()=>navigation.navigate(RouteNames.RegisterScreen)}
    style={styles.button}>
      <Text style={styles.text2}>Login</Text>
    </TouchableOpacity>

    <Text style={styles.bottomText}>Don't have an account? Create one</Text>
    </View>

   </ImageBackground>
    
  );
};

export default LoginScreen;



