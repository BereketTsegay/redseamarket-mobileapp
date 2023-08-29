import React, { useState, useEffect, useContext } from 'react';
import { Button, Checkbox, Image, Incubator, Text, View } from 'react-native-ui-lib';
import { RootStackParams, RouteNames } from '../../navigation';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator, FlatList, ScrollView, ToastAndroid, TouchableOpacity } from 'react-native';
import AppImages from '../../constants/AppImages';
import styles from './styles';
import AppColors from '../../constants/AppColors';
import InputField from '../../components/InputField';
import { PlaceAdContext } from '../../api/placeAd/PlaceAdContext';
import { createAd, reset } from '../../api/placeAd/PlaceAdSlice';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { PlaceAdRequest } from '../../api/placeAd/PlaceAdRequest';
import MapComponent from '../../components/MapComponent';
import PaymentType from '../../components/PaymentType';
const { TextField } = Incubator;
export type SellerInformationNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'SellerInformation'
>;

export type SellerInformationRouteProps = RouteProp<
  RootStackParams,
  'SellerInformation'
>;

interface Props { }

const SellerInformation: React.FC<Props> = () => {
  const navigation = useNavigation<SellerInformationNavigationProps>();
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage,
  );
  const strings = useSelector(
    (state: RootState) => state.language.resources[currentLanguage],
  );
  const { placeAdInput, setPlaceAdInput } = useContext(PlaceAdContext)
  const { PlaceAdData, loadingPlaceAd, PlaceAdError } = useSelector((state: RootState) => state.PlaceAd);
  const { profileDetails } = useSelector(
    (state: RootState) => state.ProfileDetails,
  );
  const [terms, setTerms] = useState(false)
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    address: false,
    phone: false
  });


  useEffect(() => {
    setPlaceAdInput({
      ...placeAdInput, name: profileDetails?.data.user.name,
      email: profileDetails?.data.user.email,
      phone: profileDetails?.data.user.phone
    })
  }, []);

  const locationSet = (value) => {
    setPlaceAdInput({ ...placeAdInput, latitude: value.latitude, longitude: value.longitude })
    console.log(value,'+++++++++')
  }

  const afterPayment = (id) => {
    setPlaceAdInput({ ...placeAdInput, paymentId: id })
    submit(id)
  }

  const Create = () => {
    if (placeAdInput.featured == 1 && placeAdInput.id == 0) {
      if (placeAdInput.paymentMethod == 'account') {
        submit('')
      }
      else {
        null
      }
    }
    else if (placeAdInput.featured == 2 && placeAdInput.featuredSelect == true && placeAdInput.id == 0) {
      if (placeAdInput.paymentMethod == 'account') {
        submit('')
      }
      else {
        null
      }
    }
    else {
      submit('')
    }
  }

  const submit = (pay_id) => {
    console.log(pay_id)
    const hasErrors = !placeAdInput.name || !placeAdInput.email || !placeAdInput.address || !placeAdInput.phone;

    if (hasErrors) {
      setErrors({
        name: !placeAdInput.name,
        email: !placeAdInput.email,
        address: !placeAdInput.address,
        phone: !placeAdInput.phone
      });
      return;
    }
    else {
      const formData = new FormData();
      if (placeAdInput.id != 0) {
        formData.append('id', placeAdInput.id)
      }
      const keysToAppend = [
        'address',
        'area',
        'building',
        'canonical_name',
        'category',
        'city',
        'country',
        'description',
        'descriptioninArabic',
        'email',
        'fuel',
        'latitude',
        'longitude',
        'make_id',
        'mileage',
        'model_id',
        'name',
        'negotiable',
        'parking',
        'phone',
        'phone_hide',
        'price',
        'registration_year',
        'room',
        'size',
        'state',
        'sub_area',
        'sub_area2',
        'subcategory',
        'title',
        'titleinArabic',
        'variant_id',
        'paymentMethod'
      ];

      keysToAppend.forEach((key) => {
        formData.append(key, placeAdInput[key] ?? '');
      });
      formData.append('paymentId', pay_id);
      formData.append('featured', placeAdInput.featured == 2 ? (placeAdInput.featuredSelect ? 1 : 0) : placeAdInput.featured);

      if (placeAdInput.aircondition) {
        formData.append('aircondition', 'aircondition');
      }
      if (placeAdInput.gps) {
        formData.append('gps', 'gps');
      }
      if (placeAdInput.security) {
        formData.append('security', 'security');
      }
      if (placeAdInput.tire) {
        formData.append('tire', 'tire');
      }

      if (placeAdInput.furnished == 1) {
        formData.append('furnished', 'Yes');
      }
      else if (placeAdInput.furnished == 2) {
        formData.append('furnished', 'No');
      }

      if (placeAdInput.transmission == 1) {
        formData.append('transmission', 'Manual');
      }
      else if (placeAdInput.transmission == 2) {
        formData.append('transmission', 'Automatic');
      }

      if (placeAdInput.condition == 1) {
        formData.append('condition', 'New');
      }
      else if (placeAdInput.condition == 2) {
        formData.append('condition', 'Used');
      }

      if (placeAdInput.image.length != 0) {
        placeAdInput.image.forEach((image) => {
          if (image.id == 0) {
            formData.append('image[]', {
              uri: image.image,
              name: 'image.png',
              type: 'image/png',
            });
          }
        });
      }

      if (placeAdInput.adsCountry.length != 0) {
        placeAdInput.adsCountry.forEach((id) => {
          formData.append('adsCountry[]', id);
        });
      }

      const fieldValueArray = placeAdInput.fieldValue;

      for (let i = 0; i < fieldValueArray.length; i++) {
        formData.append(`fieldValue[${i}][field_id]`, fieldValueArray[i].field_id);
        formData.append(`fieldValue[${i}][value]`, fieldValueArray[i].value);
      }
      // console.log(formData,'_______________')
      dispatch(createAd({ requestBody: formData, url: placeAdInput.id == 0 ? 'app/customer/ads/store' : 'app/customer/ads/update' }))
        .then(() => {
          dispatch(reset());
          setPlaceAdInput(new PlaceAdRequest())
        })
        .catch((err: any) => console.log(err));
    }
  }

  useEffect(()=>{

  if (PlaceAdData != null) {
    if (!loadingPlaceAd && !PlaceAdError && PlaceAdData.status == 'success') {
      ToastAndroid.show(
        JSON.stringify(PlaceAdData.message),
        ToastAndroid.SHORT,
      );
      // console.log(PlaceAdData,'success')
      navigation.navigate(RouteNames.SuccessPage, { status: placeAdInput.id == 0 ? 'PostAd' : 'UpdateAd' })
    } else {
      // console.log(PlaceAdData,'failure')
      ToastAndroid.show(
        JSON.stringify(PlaceAdData.message),
        ToastAndroid.SHORT,
      );
    }

  }
},[PlaceAdData])

  return (
    <View flex backgroundColor='white' padding-20>
      <View row centerV>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.circle}>
            <Image
              source={AppImages.ARROW_LEFT}
              style={{ width: 25, height: 25 }}
            />
          </View>
        </TouchableOpacity>
        <View flex center>
          <Text style={styles.heading}>{strings.placeAd}</Text>
        </View>
      </View>

      <Text style={styles.AdTitle}>{strings.seller}</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View marginV-20>
          <InputField
            label={strings.name}
            title={strings.enterName}
            multiline={false}
            height={45}
            type={'default'}
            value={placeAdInput.name}
            onChange={(text) => {
              setPlaceAdInput({ ...placeAdInput, name: text })
              setErrors({ ...errors, name: false });
            }}
            trailing={
              errors.name &&
              <Text color={'red'}>{strings.requiredField}</Text>
            }
            editable={true}
          />

          <InputField
            label={strings.email}
            title={strings.enterEmail}
            multiline={false}
            height={45}
            type={'default'}
            value={placeAdInput.email}
            onChange={(text) => {
              setPlaceAdInput({ ...placeAdInput, email: text })
              setErrors({ ...errors, email: false });
            }}
            trailing={
              errors.email &&
              <Text color={'red'}>{strings.requiredField}</Text>
            }
            editable={true}
          />

          <InputField
            label={strings.phone}
            title={strings.enterPhone}
            multiline={false}
            height={45}
            type={'numeric'}
            value={placeAdInput.phone}
            onChange={(text) => {
              setPlaceAdInput({ ...placeAdInput, phone: text })
              setErrors({ ...errors, phone: false });
            }}
            trailing={
              errors.phone &&
              <Text color={'red'}>{strings.requiredField}</Text>
            }
            editable={true}
          />

          <InputField
            label={strings.address}
            title={strings.enterAddress}
            multiline={false}
            height={80}
            type={'default'}
            value={placeAdInput.address}
            onChange={(text) => {
              setPlaceAdInput({ ...placeAdInput, address: text })
              setErrors({ ...errors, address: false });
            }}
            trailing={
              errors.address &&
              <Text color={'red'}>{strings.requiredField}</Text>
            }
            editable={true}
          />

          <Checkbox
            label={strings.phoneHide}
            labelStyle={styles.fieldText}
            value={placeAdInput.phone_hide}
            onValueChange={(value) => { setPlaceAdInput({ ...placeAdInput, phone_hide: value }) }}

            color={'grey'}
            containerStyle={{ marginBottom: 20 }} />

          <View marginB-20>
            <Text style={styles.fieldText} marginB-5>{strings.location}</Text>
            <MapComponent onPress={locationSet} />
          </View>

          <View row marginB-20>
            <Checkbox
              // label={'Accept Terms & Conditions'}
              // labelStyle={[styles.fieldText,{color:'#006EFF'}]}
              value={terms}
              color={'grey'}
              onValueChange={(value) => setTerms(value)} />
            <TouchableOpacity onPress={() => navigation.navigate(RouteNames.TermsAndConditions)}>
              <Text style={[styles.fieldText, { left: 15 }]}>{strings.accept}
                <Text color={'#006EFF'}> {strings.terms}</Text>
              </Text>
            </TouchableOpacity>
          </View>

          {(terms && placeAdInput.featured == 1 && placeAdInput.id == 0) ?
            <PaymentType value={afterPayment} />
            : (terms && placeAdInput.featured == 2 && placeAdInput.featuredSelect == true && placeAdInput.id == 0) ?
              <PaymentType value={afterPayment} />
              : <View />}

          {placeAdInput.paymentMethod != 'stripe' &&
            <View row style={{ justifyContent: 'space-between' }}>
              <Button
                label={strings.back}
                labelStyle={styles.buttonLabelStyle}
                style={{ backgroundColor: 'white', borderColor: AppColors.lightBlue, borderWidth: 1, width: '48%' }}
                onPress={() => submit('')} />


              <Button
                label={loadingPlaceAd ?
                  <ActivityIndicator color={AppColors.darkBlue} size={20} /> : (placeAdInput.id == 0 ? strings.create : strings.update)}
                labelStyle={[styles.buttonLabelStyle, { color: 'white' }]}
                style={{
                  backgroundColor: AppColors.lightBlue, width: '48%',
                  opacity: (terms && placeAdInput.featured == 0) ? 1 :
                    (terms && placeAdInput.featured == 2 && placeAdInput.featuredSelect == false) ? 1 :
                      (terms && placeAdInput.featured == 2 && placeAdInput.featuredSelect == true && placeAdInput.paymentMethod == 'account') ? 1 :
                        (terms && placeAdInput.id != 0) ? 1 :
                          0.5
                }}
                onPress={() => { terms && Create() }}
              />

            </View>}


        </View>
      </ScrollView>
    </View>

  );
};

export default SellerInformation;

