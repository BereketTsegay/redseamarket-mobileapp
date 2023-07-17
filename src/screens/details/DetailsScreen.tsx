import React, {useState, useEffect} from 'react';
import {Button, Image, Text, View} from 'react-native-ui-lib';
import {RootStackParams, RouteNames} from '../../navigation';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {Alert, Linking, ScrollView, TouchableOpacity} from 'react-native';
import {AnyAction, ThunkDispatch} from '@reduxjs/toolkit';
import {RootState} from '../../../store';
import {useDispatch, useSelector} from 'react-redux';
import {fetchDashBoardDetails} from '../../api/home/DashBoardDetailsSlice';
import CarouselView from '../../components/CarouselView';
import styles from './styles';
import AppImages from '../../constants/AppImages';
import AppFonts from '../../constants/AppFonts';
import MotorDetails from './MotorDetails';
import SaleAndRentDetails from './SaleAndRentDetails';
import CustomDetails from './CustomDetails';
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
  const {currencyLists} = useSelector((state: RootState) => state.CurrencyList);

  useEffect(() => {
    let request = JSON.stringify({
      ads_id: adId,
      country_id: countryId,
    });
    dispatch(fetchDashBoardDetails({requestBody: request}));
  }, []);

  const openCall = (number) => {
    Linking.openURL(`tel:${number}`)
  }

  const openMail = (mail) => {
    Linking.canOpenURL(`mailto:${mail}`).then((supported) => {
      if (supported) {
        Linking.openURL(`mailto:${mail}`);
      } else {
        Alert.alert('No email app found on the device');
      }
    });
  }


  return (
    <>
      {dashboardDetails?.ads.length != 0 && (
        <View flex backgroundColor="#FFFFFF">
          <CarouselView data={dashboardDetails?.ads[0].image}/>
          <View
            row
            padding-20
            style={{
              justifyContent: 'space-between',
              width: '100%',
              position: 'absolute',
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <View style={styles.circle}>
                <Image
                  source={AppImages.ARROW_LEFT}
                  style={{width: 25, height: 25}}
                />
              </View>
            </TouchableOpacity>
            <View style={styles.circle}></View>
          </View>

          <View flex>
            <ScrollView>
              <View paddingH-20 paddingB-85>
                <View row centerV style={{justifyContent: 'space-between'}}>
                  <Text style={styles.priceText}>
                    {currencyLists?.currency.currency_code}{' '}
                    {currencyLists?.currency.value *
                      dashboardDetails?.ads[0].price}
                  </Text>
                  <View style={[styles.circle, {elevation: 10}]}>
                    <Image
                      source={AppImages.HEART}
                      style={{width: 20, height: 20}}
                    />
                  </View>
                </View>

                <Text style={styles.titleText}>
                  {dashboardDetails?.ads[0].title}
                </Text>
               
               {dashboardDetails?.ads[0].motor_features && dashboardDetails.ads[0].motore_value &&
                <MotorDetails features={dashboardDetails?.ads[0].motor_features} details={dashboardDetails?.ads[0].motore_value}/>}

                {dashboardDetails?.ads[0].property_rend &&
                <SaleAndRentDetails details={dashboardDetails?.ads[0].property_rend}/>}

               {dashboardDetails?.ads[0].property_sale &&
                <SaleAndRentDetails details={dashboardDetails?.ads[0].property_sale}/>}

                {dashboardDetails?.ads[0].custom_value.length != 0 ?
                <CustomDetails details={dashboardDetails?.ads[0].custom_value}/> : null}

                <Text style={styles.subHeading}>Description</Text>
                <Text
                  style={[
                    styles.subHeading,
                    {fontFamily: AppFonts.POPPINS_REGULAR},
                  ]}>
                  {dashboardDetails?.ads[0].description}
                </Text>

                <Text style={styles.subHeading}>Location</Text>
                <Text
                  style={[
                    styles.subHeading,
                    {fontFamily: AppFonts.POPPINS_REGULAR},
                  ]}>
                  {dashboardDetails?.ads[0].state_name},{' '}
                  {dashboardDetails?.ads[0].city_name},{' '}
                  {dashboardDetails?.ads[0].country_name}
                </Text>
              </View>
            </ScrollView>

            <View
              style={styles.buttonView}>
                <Button label={'Call'}
                onPress={()=>openCall(dashboardDetails?.ads[0].seller_information.phone)}
                 labelStyle={{color:'white',fontSize:14,fontFamily:AppFonts.POPPINS_MEDIUM}} 
                 style={styles.callButton}/>
                <Button label={'Mail'}
                onPress={()=>openMail(dashboardDetails?.ads[0].seller_information.email)}
                 labelStyle={{color:'black',fontSize:14,fontFamily:AppFonts.POPPINS_MEDIUM}} 
                 style={styles.mailButton}/>
              </View>
          </View>
        </View>
      )}
    </>
  );
};

export default DetailsScreen;
