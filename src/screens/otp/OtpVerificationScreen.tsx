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
export type OtpVerificationScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'OtpVerificationScreen'
>;

export type OtpVerificationScreenRouteProps = RouteProp<
  RootStackParams,
  'OtpVerificationScreen'
>;

interface Props {}

const OtpVerificationScreen: React.FC<Props> = () => {
  const navigation = useNavigation<OtpVerificationScreenNavigationProps>();
  useEffect(() => {
  }, []);

  return (
   <ImageBackground
   source={AppImages.BG} style={styles.container}>
    <View row centerV style={{justifyContent:'space-between'}}>
        <View marginL-40>
    <Text style={styles.text}>Verification</Text>
    <Text style={styles.text1}>Code</Text>
    </View>
    <Image source={AppImages.PERSON1} style={{left:6}}/>
    </View>
    <View style={styles.view}>
      <Text style={styles.heading}>Verify your Phone</Text>
  
    <TouchableOpacity onPress={()=>navigation.navigate(RouteNames.BottomTabs)}
    style={styles.button}>
      <Text style={styles.text2}>Submit</Text>
    </TouchableOpacity>

    </View>

   </ImageBackground>
    
  );
};

export default OtpVerificationScreen;



