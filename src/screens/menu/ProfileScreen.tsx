import React, { useState, useEffect } from 'react';
import { Image, Text, View } from 'react-native-ui-lib';
import { RootStackParams, RouteNames } from '../../navigation';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import AppColors from '../../constants/AppColors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppStrings from '../../constants/AppStrings';
import { Linking, TouchableOpacity } from 'react-native';
import Header from '../../components/Header';
import styles from './styles';
import AppImages from '../../constants/AppImages';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobProfileList } from '../../api/jobs/JobProfileListSlice';
export type ProfileScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'ProfileScreen'
>;

export type ProfileScreenRouteProps = RouteProp<
  RootStackParams,
  'ProfileScreen'
>;

interface Props { 
  image: any;
  name: any;
  onPress?: any;
  number? : any;
}

const ProfileScreen: React.FC<Props> = () => {
  const navigation = useNavigation<ProfileScreenNavigationProps>();
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const { jobProfileList } = useSelector(
    (state: RootState) => state.JobProfileList,
  );
  const {profileDetails} = useSelector(
    (state: RootState) => state.ProfileDetails,
  );

  useEffect(() => {
    dispatch(fetchJobProfileList({ requestBody: '' }));
  }, []);

  const openCall = number => {
    Linking.openURL(`tel:${number}`);
  };

  const Logout = async () => {
    await AsyncStorage.removeItem(AppStrings.ACCESS_TOKEN);
    navigation.replace(RouteNames.WelcomeScreen)
  };

  const List = ({ image, name, onPress, number }: Props) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <View row paddingV-5 centerV style={{ justifyContent: 'space-between' }}>
          <Image source={image} style={{width:20,height:20}}/>
          <View flex left marginL-20>
            <Text style={styles.title}>{name}</Text>
          </View>
          <View row centerV>
            {number &&
            <Text marginR-10 style={styles.title}>{number}</Text>}
          <Image source={AppImages.RIGHT_ARROW} />
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View flex backgroundColor='#FFFFFF'>
      <Header />
      <View flex >
        <View margin-20>
          <Text style={styles.subHeading}>My Account</Text>
          <List image={AppImages.PROFILE} name={'Profile'} onPress={()=>navigation.navigate(RouteNames.EditProfile)} />

          <List image={AppImages.MYADS} name={'My Ads'} onPress={() => navigation.navigate(RouteNames.AdsScreen)} number={profileDetails?.data.myads}/>

          <List image={AppImages.HEART} name={'My job Profile'} onPress={() => {
            jobProfileList?.data ?
            navigation.navigate('JobProfile',{screen:RouteNames.MyJobDetails})
            :
            navigation.navigate('JobProfile',{screen:RouteNames.MyJobProfile})
          }} />

          <List image={AppImages.HEART} name={'Favourites'} onPress={() => navigation.navigate(RouteNames.FavoritesScreen)} number={profileDetails?.data.myfavourite}/>

          <View row paddingV-5 centerV style={{ justifyContent: 'space-between' }}>
          <Image source={AppImages.BANKING} style={{width:20,height:20}}/>
          <View flex left marginL-20>
            <Text style={styles.title}>Wallet</Text>
          </View>
       
            <Text marginR-10 style={styles.title}>{profileDetails?.data.user.wallet ? profileDetails?.data.user.wallet : 0} USD</Text>
        </View>
        </View>

        <View style={styles.divider} />

        <View margin-20>
          <Text style={styles.subHeading}>Settings</Text>
          <List image={AppImages.CITY} name={'City'}/>

          <List image={AppImages.LANG} name={'Language'}/>
        </View>


        <View style={styles.divider} />

        <View margin-20>
          <Text style={styles.subHeading}>Others</Text>
          <List image={AppImages.SUPPORT} name={'Support'}/>

          <List image={AppImages.HEART} name={'Terms & Conditions'} onPress={() => navigation.navigate(RouteNames.TermsAndConditions)} />
          
          {profileDetails?.data.user.phone &&
          <List image={AppImages.CALL} name={'Call Us'} onPress={()=>openCall(profileDetails?.data.user.phone)} />}

          <List image={AppImages.HEART} name={'Logout'} onPress={Logout} />
        </View>
      </View>
    </View>

  );
};

export default ProfileScreen;