import React, {useState, useEffect} from 'react';
import {Image, Incubator, Text, View} from 'react-native-ui-lib';
import {RootStackParams, RouteNames} from '../../navigation';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {ImageBackground, StyleSheet, TouchableOpacity} from 'react-native';
import AppImages from '../../constants/AppImages';
import styles from './styles';

const {TextField} = Incubator;

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
      <Text style={styles.heading}>Sign up</Text>
      <TextField
      fieldStyle={styles.inputLayout}
      placeholder={'Email'}
      floatingPlaceholder
      floatingPlaceholderColor={'black'}
      floatOnFocus="true"
      keyboardType="default"
      floatingPlaceholderStyle={styles.floatStyle}/>

<TextField
      fieldStyle={styles.inputLayout}
      placeholder={'Username'}
      floatingPlaceholder
      floatingPlaceholderColor={'black'}
      floatOnFocus="true"
      keyboardType="default"
      floatingPlaceholderStyle={styles.floatStyle}/>

<TextField
      fieldStyle={styles.inputLayout}
      placeholder={'Phone Number'}
      floatingPlaceholder
      floatingPlaceholderColor={'black'}
      floatOnFocus="true"
      keyboardType="default"
      floatingPlaceholderStyle={styles.floatStyle}/>

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

<TextField
      fieldStyle={styles.inputLayout}
      placeholder={'Confirm Password'}
      floatingPlaceholder
      floatingPlaceholderColor={'black'}
      floatOnFocus="true"
      keyboardType="default"
      floatingPlaceholderStyle={styles.floatStyle}
      marginB-30
      trailingAccessory={
        <Image source={AppImages.EYE} style={{height:12,width:14,right:10}}/>
      }/>


    <TouchableOpacity onPress={()=>navigation.navigate(RouteNames.OtpVerificationScreen)}
    style={styles.button}>
      <Text style={styles.text2}>Signup</Text>
    </TouchableOpacity>

    <Text style={styles.bottomText}>Already have an account? Login</Text>
    </View>

   </ImageBackground>
    
  );
};

export default RegisterScreen;


