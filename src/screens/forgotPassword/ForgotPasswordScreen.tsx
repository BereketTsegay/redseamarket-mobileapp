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
import { RootState } from '../../../store';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../login/styles';

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
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  useEffect(() => {
  }, []);


  return (
   <ImageBackground
   source={AppImages.BG} style={styles.container}>
    <View row centerV style={{justifyContent:'space-between'}}>
        <View marginL-40>
    <Text style={styles.text1}>Let's fix</Text>
    </View>
    <Image source={AppImages.PERSON1} style={{left:6}}/>
    </View>
    <View style={styles.view}>
      <Text style={styles.heading}>Verify email</Text>
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
        // setInvalidEmail(false);
      }}
    //   trailingAccessory={
    //     invalidEmail && (
    //         <Text style={{color: 'red'}}>{error}</Text>
    //     )
    //   }
      />


    <TouchableOpacity 
    style={styles.button}>
      <Text style={styles.text2}>Verify</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={()=>navigation.navigate(RouteNames.LoginScreen)}>
    <Text style={styles.bottomText}>{strings.haveAccount}</Text>
    </TouchableOpacity>
    </View>

   </ImageBackground>
    
  );
};

export default ForgotPasswordScreen;



