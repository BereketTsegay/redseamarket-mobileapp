import React, { useState, useEffect } from 'react';
import { Image, Text, View } from 'react-native-ui-lib';
import { RootStackParams, RouteNames } from '../../navigation';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import AppColors from '../../constants/AppColors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppStrings from '../../constants/AppStrings';
import { TouchableOpacity } from 'react-native';
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

interface Props { }

const ProfileScreen: React.FC<Props> = () => {
  const navigation = useNavigation<ProfileScreenNavigationProps>();
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const { jobProfileList } = useSelector(
    (state: RootState) => state.JobProfileList,
  );
  useEffect(() => {
    dispatch(fetchJobProfileList({ requestBody: '' }));
  }, []);

  const Logout = async () => {
    await AsyncStorage.removeItem(AppStrings.ACCESS_TOKEN);
    navigation.replace(RouteNames.WelcomeScreen)
  };

  const List = ({ image, name, onPress }) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <View row paddingV-5 style={{ justifyContent: 'space-between' }}>
          <Image source={image} />
          <View flex left marginL-20>
            <Text style={styles.title}>{name}</Text>
          </View>
          <Image source={AppImages.RIGHT_ARROW} />
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
          <List image={AppImages.HEART} name={'Profile'} onPress={null} />

          <List image={AppImages.HEART} name={'My Ads'} onPress={() => navigation.navigate(RouteNames.AdsScreen)} />

          <List image={AppImages.HEART} name={'My job Profile'} onPress={() => {
            jobProfileList?.data ?
            navigation.navigate('JobProfile',{screen:RouteNames.MyJobDetails})
            :
            navigation.navigate('JobProfile',{screen:RouteNames.MyJobProfile})
          }} />

          <List image={AppImages.HEART} name={'Favourites'} onPress={() => navigation.navigate(RouteNames.FavoritesScreen)} />
        </View>

        <View style={styles.divider} />

        <View margin-20>
          <Text style={styles.subHeading}>Settings</Text>
          <List image={AppImages.HEART} name={'City'} onPress={null} />

          <List image={AppImages.HEART} name={'Language'} onPress={null} />
        </View>


        <View style={styles.divider} />

        <View margin-20>
          <Text style={styles.subHeading}>Others</Text>
          <List image={AppImages.HEART} name={'Support'} onPress={null} />

          <List image={AppImages.HEART} name={'Terms & Conditions'} onPress={() => navigation.navigate(RouteNames.TermsAndConditions)} />

          <List image={AppImages.HEART} name={'Call Us'} onPress={null} />

          <List image={AppImages.HEART} name={'Logout'} onPress={Logout} />
        </View>
      </View>
    </View>

  );
};

export default ProfileScreen;