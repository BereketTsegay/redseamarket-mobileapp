import React, {useState, useEffect} from 'react';
import {Image, Incubator, Text, View} from 'react-native-ui-lib';
import {RootStackParams, RouteNames} from '../../navigation';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {ActivityIndicator, ImageBackground, TouchableOpacity} from 'react-native';
import AppImages from '../../constants/AppImages';
import AppColors from '../../constants/AppColors';
import AppFonts from '../../constants/AppFonts';
import { RootState } from '../../../store';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../login/styles';
import { SimpleApiClient } from '../../api/apiClient';
import { showToast } from '../../constants/commonUtils';

const {TextField} = Incubator;
export type ForgotPasswordScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'ForgotPasswordScreen'
>;

export type ForgotPasswordScreenRouteProps = RouteProp<
  RootStackParams,
  'ForgotPasswordScreen'
>;

interface Props {}

const ForgotPasswordScreen: React.FC<Props> = () => {
  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage,
  );
  const strings = useSelector(
    (state: RootState) => state.language.resources[currentLanguage],
  );
  const navigation = useNavigation<ForgotPasswordScreenNavigationProps>();
  const [email, setEmail] = useState('');
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState('');
  const [invalidEmail, setInvalidEmail] = useState(false);
  useEffect(() => {
  }, []);

  function isValidate(): boolean {
    if (email == '') {
      setError('required field');
      setInvalidEmail(true);
      return false;
    }
    return true;
  }

  const sendMail = () => {
    setLoading(true)
  let request = JSON.stringify({
    email: email
  })
  SimpleApiClient('app/forgot/password/send/toMail', 'POST', request)
  .then(request => {
    if(request.data.status == 'success'){
    showToast(request.data.message)
      navigation.replace(RouteNames.OtpVerificationScreen,{email:email,from:'forgot'})
    }
    else{
      showToast(request.data.message)
    }
    setLoading(false)
  })
  }


  return (
   <ImageBackground
   source={AppImages.BG} style={styles.container}>
    <View row centerV style={{justifyContent:'space-between'}}>
        <View marginL-40>
    <Text style={styles.text1}>{strings.letFix}</Text>
    </View>
    <Image source={AppImages.PERSON1} style={{left:6}}/>
    </View>
    <View style={styles.view}>
      <Text style={styles.heading}>{strings.emailVerify}</Text>
      <TextField
      fieldStyle={styles.inputLayout}
      placeholder={strings.email}
      floatingPlaceholder
      floatingPlaceholderColor={'black'}
      floatOnFocus="true"
      keyboardType="default"
      floatingPlaceholderStyle={styles.floatStyle}
      marginV-20
      value={email}
      onChangeText={(text: React.SetStateAction<string>) => {
        setEmail(text);
        setInvalidEmail(false);
      }}
      trailingAccessory={
        invalidEmail && (
            <Text style={{color: 'red'}}>{error}</Text>
        )
      }
      />


    <TouchableOpacity onPress={() => {
            if (isValidate()) {
              sendMail()
            }
          }}
    style={styles.button}>
       {isLoading ?
      <ActivityIndicator size={20} color={AppColors.blue} />  
    :
    <Text style={styles.text2}>{strings.verify1}</Text>}
     
    </TouchableOpacity>

    <TouchableOpacity onPress={()=>navigation.navigate(RouteNames.LoginScreen)}>
    <Text style={styles.bottomText}>{strings.haveAccount}</Text>
    </TouchableOpacity>
    </View>

   </ImageBackground>
    
  );
};

export default ForgotPasswordScreen;



