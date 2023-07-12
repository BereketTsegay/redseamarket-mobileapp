import React, {useState, useEffect} from 'react';
import {Image, Incubator, Text, View} from 'react-native-ui-lib';
import {RootStackParams, RouteNames} from '../../navigation';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {ActivityIndicator, ImageBackground, StyleSheet, ToastAndroid, TouchableOpacity} from 'react-native';
import AppImages from '../../constants/AppImages';
import OTPTextView from 'react-native-otp-textinput'
import styles from './styles';
import AppColors from '../../constants/AppColors';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { VerifyOtp, reset } from '../../api/otp/OtpVerificationSlice';
import { ResendOtp, ResendReset } from '../../api/otp/OtpResendSlice';

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

const OtpVerificationScreen: React.FC<Props> = ({route}) => {
  const navigation = useNavigation<OtpVerificationScreenNavigationProps>();
  const {email,from} = route.params;
  const [otp, setOtp] = useState('')
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const { OtpData,loadingOtp, OtpError} = useSelector(
    (state: RootState) => state.otpVerify,
  );
  const {OtpResendData, loadingOtpResend, OtpResendError} = useSelector(
    (state: RootState) => state.otpResend,
  );


  useEffect(() => {
  }, []);

  const OtpVerification = async () => {
    let request = JSON.stringify({
      email: email,
      otp: otp,
    });
    dispatch(VerifyOtp({requestBody: request}))
      .then(() => {
        dispatch(reset());
      })
      .catch((err: any) => console.log(err));
  };

  if (OtpData != null) {
    if (!loadingOtp && !OtpError && OtpData.status == 'success') {
      
      ToastAndroid.show(
        JSON.stringify(OtpData.message),
        ToastAndroid.SHORT,
      );
      if(from == 'register'){
      navigation.replace(RouteNames.LoginScreen)}
      else if(from == 'login'){
        navigation.replace(RouteNames.BottomTabs)
      }
      else
      null;

    } else if (OtpData.status == 'error') {
      
      ToastAndroid.show(
        JSON.stringify(OtpData.message),
        ToastAndroid.SHORT,
      );
    }
  }

  const ResendingOtp = async () => {
    let request = JSON.stringify({
      email: email
    });
    dispatch(ResendOtp({requestBody: request}))
      .then(() => {
        dispatch(ResendReset());
      })
      .catch((err: any) => console.log(err));
  };

    if (OtpResendData != null) {
    if (!loadingOtpResend && !OtpResendError && OtpResendData.status == 'success') {
      ToastAndroid.show(
        JSON.stringify(OtpResendData.message),
        ToastAndroid.SHORT,
      );
    } else if (OtpResendData.status == 'error') {
      ToastAndroid.show(
        JSON.stringify(OtpResendData.message),
        ToastAndroid.SHORT,
      );
    }
  }

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
    <View center style={styles.view}>
      <Text style={styles.heading}>Verify your Email</Text>
      <Text style={[styles.subTitle,{marginTop:30}]}>We have sent the code verification to your Email</Text>
      <Text style={styles.numberText}>{email}</Text>

      <OTPTextView
          handleTextChange={e => {setOtp(e)}}
          containerStyle={styles.textInputContainer}
          textInputStyle={styles.roundedTextInput}
          tintColor={AppColors.blue}
        />

      <Text style={styles.subTitle}>I didn't receive a code!</Text>
      <TouchableOpacity onPress={ResendingOtp}>
      {loadingOtpResend?
      <ActivityIndicator size={20} color={AppColors.blue} />  
    :
      <Text style={[styles.heading,{fontSize:16}]}>Resend Code</Text>}
      </TouchableOpacity>
  
    <TouchableOpacity onPress={OtpVerification}
    style={styles.button}>
       {loadingOtp?
      <ActivityIndicator size={20} color={AppColors.blue} />  
    :
    <Text style={styles.text2}>Submit</Text>}
      
    </TouchableOpacity>

    </View>

   </ImageBackground>
    
  );
};

export default OtpVerificationScreen;



