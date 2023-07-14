import React, {useState, useEffect} from 'react';
import {Image, Text, View} from 'react-native-ui-lib';
import {RootStackParams, RouteNames} from '../../navigation';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import AppColors from '../../constants/AppColors';
import AppStrings from '../../constants/AppStrings';
import { TouchableOpacity } from 'react-native';
import { SliderBox } from "react-native-image-slider-box";
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashBoardDetails } from '../../api/home/DashBoardDetailsSlice';
import CarouselView from '../../components/CarouselView';
import styles from './styles';
import AppImages from '../../constants/AppImages';
import AppFonts from '../../constants/AppFonts';
export type DetailsScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'DetailsScreen'
>;

export type DetailsScreenRouteProps = RouteProp<
  RootStackParams,
  'DetailsScreen'
>;

interface Props {}

const DetailsScreen: React.FC<Props> = ({route}) => {
  const navigation = useNavigation<DetailsScreenNavigationProps>();
  const {adId, countryId} = route.params;
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const {dashboardDetails, loadingDashBoardDetail} = useSelector(
    (state: RootState) => state.DashBoardDetails,
  );

  useEffect(() => {
    let request = JSON.stringify({
        ads_id: adId,
      country_id: countryId
    })
    dispatch(fetchDashBoardDetails({requestBody: request}));
  }, []);


  return (
    <>
        {dashboardDetails?.ads.length != 0 &&
        <View flex backgroundColor='#FFFFFF'>
        <CarouselView data={dashboardDetails?.ads[0].image}/>
        <View row padding-20 style={{justifyContent:'space-between',width:'100%',position:'absolute'}}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
        <View style={styles.circle}>
        <Image source={AppImages.ARROW_LEFT} style={{width:25, height:25}}/>
        </View></TouchableOpacity>
        <View style={styles.circle}></View>
       </View> 
       <View paddingH-20>
        <View row centerV style={{justifyContent:'space-between'}}>
            <Text style={styles.priceText}>USD {dashboardDetails?.ads[0].price}</Text>
            <View style={[styles.circle,{elevation:10}]}>
                <Image source={AppImages.HEART} style={{width:20, height:20}}/>
            </View>
        </View>

        <Text style={styles.titleText}>{dashboardDetails?.ads[0].title}</Text>
        <Text style={styles.subHeading}>Description</Text>
        <Text style={[styles.subHeading,{fontFamily:AppFonts.POPPINS_REGULAR}]}>{dashboardDetails?.ads[0].description}</Text>

        <Text style={styles.subHeading}>Location</Text>
        <Text style={[styles.subHeading,{fontFamily:AppFonts.POPPINS_REGULAR}]}>
        {dashboardDetails?.ads[0].state_name}, {dashboardDetails?.ads[0].city_name}, {dashboardDetails?.ads[0].country_name}
            </Text>
       </View>
       </View>
        }
        </>
    
  );
};

export default DetailsScreen;