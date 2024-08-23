import React, {useState, useEffect} from 'react';
import {Image, Incubator, Text, View} from 'react-native-ui-lib';
import {RootStackParams, RouteNames} from '../../navigation';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {ActivityIndicator, ImageBackground, Pressable, ScrollView, TouchableOpacity} from 'react-native';
import AppImages from '../../constants/AppImages';
import styles from './styles';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { createRegister, reset } from '../../api/register/RegisterCreateSlice';
import AppColors from '../../constants/AppColors';
import { showToast } from '../../constants/commonUtils';

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
  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage,
  );
  const strings = useSelector(
    (state: RootState) => state.language.resources[currentLanguage],
  );
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [invalidName, setInvalidName] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPass, setInvalidPass] = useState(false);
  const [invalidConfirm, setInvalidConfirm] = useState(false);
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [isSecureEntrySec, setIsSecureEntrySec] = useState(true);
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const {RegisterData, loadingRegister, RegisterError} = useSelector(
    (state: RootState) => state.registerCreate,
  );
  useEffect(() => {
  }, []);

  const updateSecureTextEntry = async () => {
    setIsSecureEntry(!isSecureEntry);
  };

  const updateSecureTextEntrySec = async () => {
    setIsSecureEntrySec(!isSecureEntrySec);
  };

  const isValidEmail = (email: string) => {
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailPattern.test(email);
  };

  function isValidate(): boolean {
    if (name == '') {
      setError('required field');
      setInvalidName(true);
      return false;
    }
    if (email == '') {
      setError('required field');
      setInvalidEmail(true);
      return false;
    }
    
    if (!isValidEmail(email)) {
      setError('Invalid email format');
      setInvalidEmail(true);
      return false;
    }
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

  const Register = async () => {
    let request = JSON.stringify({
      name: name,
      email: email,
      password: password,
    });
    dispatch(createRegister({requestBody: request}))
      .then(() => {
        dispatch(reset());
      })
      .catch((err: any) => console.log(err));
  };

  if (RegisterData != null) {
    if (!loadingRegister && !RegisterError && RegisterData.status == 'success') {
      showToast(RegisterData.message)
      navigation.replace(RouteNames.OtpVerificationScreen,{email:email,from:'register'})
    } else if (RegisterData.status == 'error') {
      showToast(RegisterData.message)
    }
  }


  return (
   <ImageBackground
   source={AppImages.BG} style={styles.container}>
<View row>
<Image source={AppImages.PERSON2} style={{right:5}}/>
        <View marginL-20>
    <Text style={styles.text}>{strings.hello}</Text>
    <Text style={styles.text1}>{strings.started}</Text>
    </View>
    
    </View>
    <View style={styles.view}>
      <Text style={styles.heading}>{strings.signUp}</Text>
      
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled'>
      <View>
<TextField
      fieldStyle={styles.inputLayout}
      placeholder={strings.username}
      floatingPlaceholder
      floatingPlaceholderColor={'black'}
      floatOnFocus="true"
      keyboardType="default"
      floatingPlaceholderStyle={styles.floatStyle}
      value={name}
      onChangeText={(text: React.SetStateAction<string>) =>{
        setName(text);
        setInvalidName(false);
      }}
      trailingAccessory={
        invalidName && (
            <Text style={{color: 'red'}}>{error}</Text>
        )
      }/>

<TextField
      fieldStyle={styles.inputLayout}
      placeholder={strings.email}
      floatingPlaceholder
      floatingPlaceholderColor={'black'}
      floatOnFocus="true"
      keyboardType="default"
      floatingPlaceholderStyle={styles.floatStyle}
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

{/* <TextField
      fieldStyle={styles.inputLayout}
      placeholder={'Phone Number'}
      floatingPlaceholder
      floatingPlaceholderColor={'black'}
      floatOnFocus="true"
      keyboardType="default"
      floatingPlaceholderStyle={styles.floatStyle}/> */}

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
              Register()
            }
          }}
    style={styles.button}>
      {loadingRegister?
      <ActivityIndicator size={20} color={AppColors.blue} />  
    :
      <Text style={styles.text2}>{strings.signUp}</Text>}
    </TouchableOpacity>

    <TouchableOpacity onPress={()=>navigation.navigate(RouteNames.LoginScreen)}>
    <Text style={styles.bottomText}>{strings.haveAccount}</Text>
    </TouchableOpacity>
    </View>
    </ScrollView>

    </View>

   </ImageBackground>
    
  );
};

export default RegisterScreen;


