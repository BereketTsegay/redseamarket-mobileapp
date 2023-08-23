import React, {useState, useEffect} from 'react';
import {Image, Incubator, Text, View} from 'react-native-ui-lib';
import {RootStackParams, RouteNames} from '../../navigation';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {ActivityIndicator, ImageBackground, Pressable, StyleSheet, ToastAndroid, TouchableOpacity} from 'react-native';
import AppImages from '../../constants/AppImages';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
import AppColors from '../../constants/AppColors';
import styles from '../register/styles';
import { createLogin, reset } from '../../api/login/LoginCreateSlice';

const {TextField} = Incubator;

export type PasswordResetScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'PasswordResetScreen'
>;

export type PasswordResetScreenRouteProps = RouteProp<
  RootStackParams,
  'PasswordResetScreen'
>;

interface Props {}

const PasswordResetScreen: React.FC<Props> = ({route}) => {
    const {email} = route.params;
  const navigation = useNavigation<PasswordResetScreenNavigationProps>();
  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage,
  );
  const strings = useSelector(
    (state: RootState) => state.language.resources[currentLanguage],
  );
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [invalidPass, setInvalidPass] = useState(false);
  const [invalidConfirm, setInvalidConfirm] = useState(false);
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [isSecureEntrySec, setIsSecureEntrySec] = useState(true);
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const {LoginData, loadingLogin, LoginError} = useSelector(
    (state: RootState) => state.loginCreate,
  );


  const updateSecureTextEntry = async () => {
    setIsSecureEntry(!isSecureEntry);
  };

  const updateSecureTextEntrySec = async () => {
    setIsSecureEntrySec(!isSecureEntrySec);
  };

  function isValidate(): boolean {
    if (password == '') {
      setError('required field');
      setInvalidPass(true);
      return false;
    }
    if (password != confirmPassword) {
      setError('mismatch');
      setInvalidConfirm(true);
      return false;
    }
    return true;
  }

  const passwordReset = async () => {
    let request = JSON.stringify({
      email: email,
      password: password,
    });
    dispatch(createLogin({requestBody: request, url: 'app/forgotpassword/password/reset'}))
      .then(() => {
        dispatch(reset());
      })
      .catch((err: any) => console.log(err));
  };

  useEffect(() => {


  if (LoginData != null) {
    if (!loadingLogin && !LoginError && LoginData.status == 'success') {
      ToastAndroid.show(
        JSON.stringify(LoginData.message),
        ToastAndroid.SHORT,
      );
     
      navigation.replace(RouteNames.LoginScreen)
    } else{
        ToastAndroid.show(
          JSON.stringify(LoginData.message),
          ToastAndroid.SHORT,
        );
    }
  }
  }, [LoginData]);


  return (
   <ImageBackground
   source={AppImages.BG} style={styles.container}>
<View row>
<Image source={AppImages.PERSON2} style={{right:5}}/>
        <View marginL-20>
    <Text style={styles.text1}>{strings.letReset}</Text>
    </View>
    
    </View>
    <View style={styles.view}>
      <Text style={styles.heading}>{strings.resetPassword}</Text>

<TextField
      fieldStyle={styles.inputLayout}
      placeholder={strings.email}
      floatingPlaceholder
      floatingPlaceholderColor={'black'}
      color={'grey'}
      floatOnFocus="true"
      keyboardType="default"
      floatingPlaceholderStyle={styles.floatStyle}
      editable={false}
      value={email}/>

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

<TextField
      fieldStyle={styles.inputLayout}
      placeholder={strings.confirmPassword}
      floatingPlaceholder
      floatingPlaceholderColor={'black'}
      floatOnFocus="true"
      keyboardType="default"
      floatingPlaceholderStyle={styles.floatStyle}
      marginB-30
      value={confirmPassword}
      onChangeText={(text: React.SetStateAction<string>) =>
        {
          setConfirm(text);
          setInvalidConfirm(false)
        }}
        secureTextEntry={isSecureEntrySec ? true : false}
        trailingAccessory={
          <View row center>
            { invalidConfirm && (
                    <Text style={{color: 'red',right:10}}>{error}</Text>
                )}
          <Pressable onPress={updateSecureTextEntrySec}>
                {isSecureEntrySec ? (
                  <Image source={AppImages.EYE_OFF} style={{height:12,width:14,right:10}}/>
                ) : (
                  <Image source={AppImages.EYE} style={{height:12,width:14,right:10}}/>
                )}
              </Pressable>
          </View>
        }/>


    <TouchableOpacity onPress={() => {
            if (isValidate()) {
              passwordReset()
            }
          }}
    style={styles.button}>
      {loadingLogin?
      <ActivityIndicator size={20} color={AppColors.blue} />  
    :
      <Text style={styles.text2}>{strings.reset}</Text>}
    </TouchableOpacity>

    <TouchableOpacity onPress={()=>navigation.navigate(RouteNames.LoginScreen)}>
    <Text style={styles.bottomText}>{strings.haveAccount}</Text>
    </TouchableOpacity>
    </View>

   </ImageBackground>
    
  );
};

export default PasswordResetScreen;


