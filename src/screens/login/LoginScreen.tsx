import React, {useState, useEffect} from 'react';
import {Image, Incubator, Text, View} from 'react-native-ui-lib';
import {RootStackParams, RouteNames} from '../../navigation';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {ActivityIndicator, ImageBackground, Pressable, StyleSheet, ToastAndroid, TouchableOpacity} from 'react-native';
import AppImages from '../../constants/AppImages';
import AppColors from '../../constants/AppColors';
import AppFonts from '../../constants/AppFonts';
import styles from './styles';
import { RootState } from '../../../store';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { createLogin, reset } from '../../api/login/LoginCreateSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppStrings from '../../constants/AppStrings';

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
  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage,
  );
  const strings = useSelector(
    (state: RootState) => state.language.resources[currentLanguage],
  );
  const navigation = useNavigation<LoginScreenNavigationProps>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPass, setInvalidPass] = useState(false);
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const {LoginData, loadingLogin, LoginError} = useSelector(
    (state: RootState) => state.loginCreate,
  );
  useEffect(() => {
  }, []);

  const updateSecureTextEntry = async () => {
    setIsSecureEntry(!isSecureEntry);
  };

  function isValidate(): boolean {
    if (email == '') {
      setError('required field');
      setInvalidEmail(true);
      return false;
    }
    if (password == '') {
      setError('required field');
      setInvalidPass(true);
      return false;
    }
    return true;
  }

  const Login = async () => {
    let request = JSON.stringify({
      email: email,
      password: password,
    });
    dispatch(createLogin({requestBody: request}))
      .then(() => {
        dispatch(reset());
      })
      .catch((err: any) => console.log(err));
  };

  if (LoginData != null) {
    if (!loadingLogin && !LoginError && LoginData.status == 'success') {
      ToastAndroid.show(
        JSON.stringify(LoginData.message),
        ToastAndroid.SHORT,
      );
      AsyncStorage.setItem(
        AppStrings.ACCESS_TOKEN,
        LoginData.token == null ? '' : LoginData.token,
      );
     
      navigation.replace(RouteNames.BottomTabs)
    } else if (LoginData.status == 'error') {
      if(LoginData.message == 'User Not Verified'){
        ToastAndroid.show(
          JSON.stringify(LoginData.message),
          ToastAndroid.SHORT,
        );
        navigation.replace(RouteNames.OtpVerificationScreen,{email:email,from:'login'})
      }
      else{
        ToastAndroid.show(
          JSON.stringify(LoginData.message),
          ToastAndroid.SHORT,
        );
      }
     
    }
  }


  return (
   <ImageBackground
   source={AppImages.BG} style={styles.container}>
    <View row centerV style={{justifyContent:'space-between'}}>
        <View marginL-40>
    <Text style={styles.text}>{strings.welcome}</Text>
    <Text style={styles.text1}>{strings.back}</Text>
    </View>
    <Image source={AppImages.PERSON1} style={{left:6}}/>
    </View>
    <View style={styles.view}>
      <Text style={styles.heading}>{strings.Login}</Text>
      <TextField
      fieldStyle={styles.inputLayout}
      placeholder={strings.email}
      floatingPlaceholder
      floatingPlaceholderColor={'black'}
      floatOnFocus="true"
      keyboardType="default"
      floatingPlaceholderStyle={styles.floatStyle}
      marginT-30
      value={email}
      onChangeText={(text: React.SetStateAction<string>) => {
        setEmail(text);
        setInvalidEmail(false);
      }}
      trailingAccessory={
        invalidEmail && (
            <Text style={{color: 'red'}}>{error}</Text>
        )
      }/>

<TextField
      fieldStyle={styles.inputLayout}
      placeholder={strings.password}
      floatingPlaceholder
      floatingPlaceholderColor={'black'}
      floatOnFocus="true"
      keyboardType="default"
      floatingPlaceholderStyle={styles.floatStyle}
      value={password}
      onChangeText={(text: React.SetStateAction<string>) =>
        {
          setPassword(text);
          setInvalidPass(false);
        }}
        secureTextEntry={isSecureEntry ? true : false}
      trailingAccessory={
        <View row center>
          { invalidPass && (
                  <Text style={{color: 'red',right:10}}>{error}</Text>
              )}
        <Pressable onPress={updateSecureTextEntry}>
                {isSecureEntry ? (
                  <Image source={AppImages.EYE_OFF} style={{height:12,width:14,right:10}}/>
                ) : (
                  <Image source={AppImages.EYE} style={{height:12,width:14,right:10}}/>
                )}
              </Pressable>
        </View>
      }/>

      {/* <View right marginB-20>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </View> */}

      {/* <View row center marginV-20>
        <Image source={AppImages.FACEBOOK} style={{width:26, height:26}}/>
        <Image source={AppImages.GOOGLE} style={{width:26, height:26,marginLeft:20}}/>
      </View> */}
    <TouchableOpacity onPress={() => {
            if (isValidate()) {
              Login()
            }
          }}
    style={styles.button}>
      {loadingLogin?
      <ActivityIndicator size={20} color={AppColors.blue} />  
    :
      <Text style={styles.text2}>{strings.Login}</Text>}
    </TouchableOpacity>

    <TouchableOpacity onPress={()=>navigation.navigate(RouteNames.RegisterScreen)}>
    <Text style={styles.bottomText}>{strings.noAccount}</Text>
    </TouchableOpacity>
    </View>

   </ImageBackground>
    
  );
};

export default LoginScreen;



