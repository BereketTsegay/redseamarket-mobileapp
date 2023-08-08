import React, { useState, useEffect } from 'react';
import { Button, Image, Text, View } from 'react-native-ui-lib';
import { RootStackParams, RouteNames } from '../../navigation';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import {
  Alert,
  Linking,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashBoardDetails } from '../../api/home/DashBoardDetailsSlice';
import CarouselView from '../../components/CarouselView';
import styles from './styles';
import AppImages from '../../constants/AppImages';
import AppFonts from '../../constants/AppFonts';
import MotorDetails from './MotorDetails';
import SaleAndRentDetails from './SaleAndRentDetails';
import CustomDetails from './CustomDetails';
import AppColors from '../../constants/AppColors';
import FavoriteComponent from '../../components/FavoriteComponent';
import moment from 'moment';
import MapComponent from '../../components/MapComponent';
import DirectPaymentModal from '../../components/DirectPaymentModal';
export type DetailsScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'DetailsScreen'
>;

export type DetailsScreenRouteProps = RouteProp<
  RootStackParams,
  'DetailsScreen'
>;

interface Props { }

const DetailsScreen: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation<DetailsScreenNavigationProps>();
  const { adId, countryId } = route.params;
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const { dashboardDetails, loadingDashBoardDetail } = useSelector(
    (state: RootState) => state.DashBoardDetails,
  );
  const { currencyLists } = useSelector((state: RootState) => state.CurrencyList);

  useEffect(() => {
    list()
  }, []);

  const list = () => {
    let request = JSON.stringify({
      ads_id: adId,
      country_id: countryId,
    });
    dispatch(fetchDashBoardDetails({ requestBody: request }));
  }

  const openCall = number => {
    Linking.openURL(`tel:${number}`);
  };

  const favDone = () => {
    list()
  }

  const openMail = mail => {
    const mailtoLink = `mailto:${mail}`;
    Linking.openURL(mailtoLink).catch(() => {
      Alert.alert('No email app found on the device');
    });
  };

  return (
    <>
      {dashboardDetails?.status == 'error' &&
        <View flex backgroundColor="#FFFFFF" padding-20>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={styles.circle}>
              <Image
                source={AppImages.ARROW_LEFT}
                style={{ width: 25, height: 25 }}
              />
            </View>
          </TouchableOpacity>
          <View flex center>
            <Text style={styles.titleText}>{dashboardDetails.message}</Text>
          </View>
        </View>}

      {dashboardDetails?.ads.length != 0 && (
        <View flex backgroundColor="#FFFFFF">
          <CarouselView data={dashboardDetails?.ads[0].image} />
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
                  style={{ width: 25, height: 25 }}
                />
              </View>
            </TouchableOpacity>
            <View style={styles.circle}></View>
          </View>

          <View flex>
            <ScrollView>
              <View paddingH-20 paddingB-85>
                <View row centerV style={{ justifyContent: 'space-between' }}>
                  <Text style={styles.priceText}>
                    {currencyLists?.currency.currency_code}{' '}
                    {(currencyLists?.currency.value *
                      dashboardDetails?.ads[0].price).toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </Text>

                  <FavoriteComponent
                    id={dashboardDetails?.ads[0].id}
                    status={dashboardDetails?.ads[0].isFavourite}
                    done={favDone}
                  />
                </View>

                <Text style={styles.titleText}>
                  {dashboardDetails?.ads[0].title}
                </Text>

                {dashboardDetails?.ads[0].motor_features &&
                  dashboardDetails.ads[0].motore_value && (
                    <MotorDetails
                      features={dashboardDetails?.ads[0].motor_features}
                      details={dashboardDetails?.ads[0].motore_value}
                    />
                  )}

                {dashboardDetails?.ads[0].property_rend && (
                  <SaleAndRentDetails
                    details={dashboardDetails?.ads[0].property_rend}
                  />
                )}

                {dashboardDetails?.ads[0].property_sale && (
                  <SaleAndRentDetails
                    details={dashboardDetails?.ads[0].property_sale}
                  />
                )}

                {dashboardDetails?.ads[0].custom_value.length != 0 ? (
                  <CustomDetails
                    details={dashboardDetails?.ads[0].custom_value}
                  />
                ) : null}


                <View style={styles.row}>
                  <Text style={styles.motorText}>Posted On</Text>
                  <Text style={styles.motorText1}>{dashboardDetails?.ads[0].created_on}</Text>
                </View>

                <View marginB-20 style={styles.row}>
                  <Text style={styles.motorText}>Updated at</Text>
                  <Text style={styles.motorText1}>{dashboardDetails?.ads[0].updated_on}</Text>
                </View>

                {dashboardDetails?.ads[0].category.name == "Jobs" && dashboardDetails.ads[0].status == 0 && dashboardDetails.ads[0].featured_flag == 1 && dashboardDetails.ads[0].payment &&
                  dashboardDetails.ads[0].payment.payment_type == 1 && dashboardDetails.lastpay == 0 &&
                  <Button
                    label={'Upload Payment Document (USD ' + dashboardDetails.ads[0].payment.amount + ')'}
                    style={{ backgroundColor: AppColors.lightBlue, marginBottom: 20, width: '100%', alignSelf: 'center' }}
                    onPress={() => {setShowPaymentModal(true) }}
                  />}

                {dashboardDetails?.ads[0].category.name == "Jobs" && dashboardDetails.lastpay == 1 && dashboardDetails.ads[0].status == 0 &&
                  <View center>
                    <Text style={{ color: 'red' }}>Ad pending for Verification</Text>
                  </View>
                }

                {dashboardDetails?.ads[0].category.name == "Jobs" && dashboardDetails.ads[0].status == 1 &&
                  <Button
                    label={dashboardDetails?.ads[0].isApply ? 'Job already applied' : 'Apply this Job'}
                    style={{ backgroundColor: AppColors.lightBlue, marginBottom: 20, width: '70%', alignSelf: 'center' }}
                    onPress={() => {
                      dashboardDetails?.ads[0].isApply ? null :
                      navigation.navigate('Apply_Job', { id: dashboardDetails.ads[0].id })
                    }}
                  />}

                <Text style={styles.subHeading}>Description</Text>
                <Text
                  style={[
                    styles.subHeading,
                    { fontFamily: AppFonts.POPPINS_REGULAR },
                  ]}>
                  {dashboardDetails?.ads[0].description}
                </Text>

                <Text style={styles.subHeading}>Location</Text>
                <Text
                  style={[
                    styles.subHeading,
                    { fontFamily: AppFonts.POPPINS_REGULAR },
                  ]}>
                  {dashboardDetails?.ads[0].state_name},{' '}
                  {dashboardDetails?.ads[0].city_name},{' '}
                  {dashboardDetails?.ads[0].country_name}
                </Text>
                <MapComponent latitudes={dashboardDetails?.ads[0].latitude} longitudes={dashboardDetails?.ads[0].longitude} />
              </View>
            </ScrollView>

            <View style={styles.buttonView}>
              <Button
                label={'Call'}
                onPress={() =>
                  openCall(dashboardDetails?.ads[0].seller_information.phone)
                }
                labelStyle={{
                  color: 'white',
                  fontSize: 14,
                  fontFamily: AppFonts.POPPINS_MEDIUM,
                }}
                style={styles.callButton}
              />
              <Button
                label={'Mail'}
                onPress={() =>
                  openMail(dashboardDetails?.ads[0].seller_information.email)
                }
                labelStyle={{
                  color: 'black',
                  fontSize: 14,
                  fontFamily: AppFonts.POPPINS_MEDIUM,
                }}
                style={styles.mailButton}
              />
            </View>
          </View>


          <DirectPaymentModal
        isVisible={showPaymentModal}
        ad_id={dashboardDetails?.ads[0].id}
        onRequestClose={() => {setShowPaymentModal(false)
        list()}}
      />
        </View>
      )}
     
    </>
  );
};

export default DetailsScreen;
