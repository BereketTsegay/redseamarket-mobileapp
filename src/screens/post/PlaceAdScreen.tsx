import React, { useState, useEffect, useContext } from 'react';
import {
  Button,
  Checkbox,
  Image,
  Incubator,
  Text,
  View,
} from 'react-native-ui-lib';
import { RootStackParams, RouteNames } from '../../navigation';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { FlatList, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import AppImages from '../../constants/AppImages';
import styles from './styles';
import AppColors from '../../constants/AppColors';
import ItemDropdown from '../../components/ItemDropdown';
import InputField from '../../components/InputField';
import { RootState } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { fetchStateList } from '../../api/country/StateListSlice';
import { fetchCityList } from '../../api/country/CityListSlice';
import { fetchCustomField } from '../../api/customField/CustomFieldSlice';
import { PlaceAdContext } from '../../api/placeAd/PlaceAdContext';
import { PlaceAdRequest } from '../../api/placeAd/PlaceAdRequest';
import { getWithAuthCall } from '../../api/apiClient';
import AdsCountrySelect from '../../components/AdsCountrySelect';
import { CommonContext } from '../../api/commonContext';
const { TextField } = Incubator;
export type PlaceAdScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'PlaceAdScreen'
>;

export type PlaceAdScreenRouteProps = RouteProp<
  RootStackParams,
  'PlaceAdScreen'
>;

interface Props { }

const PlaceAdScreen: React.FC<Props> = ({ editData }) => {

  const navigation = useNavigation<PlaceAdScreenNavigationProps>();
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const { placeAdInput, setPlaceAdInput } = useContext(PlaceAdContext)
  const { commonInput, setCommonInput } = useContext(CommonContext)
  const [priceValue, setPriceValue] = useState('')
  const { countryLists } = useSelector((state: RootState) => state.CountryList);
  const { stateLists } = useSelector((state: RootState) => state.StateList);
  const { cityLists } = useSelector((state: RootState) => state.CityList);
  const { currencyLists } = useSelector(
    (state: RootState) => state.CurrencyList,
  );
  const { customLists } = useSelector(
    (state: RootState) => state.CustomFieldList,
  );
  const [errors, setErrors] = useState({
    title: false,
    titleinArabic: false,
    description: false,
    descriptioninArabic: false,
    priceValue: false,
    country: false,
    state: false,
    city: false,
    area: false,
  });

  useEffect(() => {
    if(editData){
      const selectedImageURIs = editData.image.map((img) => ('https://admin-jamal.prompttechdemohosting.com/' + img.image));
      const selectCountries = editData.mapCountry.map((item) => Number(item.country_id))
      setPriceValue(editData.price)
    setPlaceAdInput({
      ...placeAdInput, id:editData.id, category: editData.category_id, subcategory: editData.subcategory_id, category_Name: editData.category.name,
      title: editData.title, titleinArabic: editData.title_arabic, canonical_name: editData.canonical_name, description: editData.description, descriptioninArabic: editData.description_arabic,
      price: editData.price, country: editData.country_id, state: editData.state_id, city: editData.city_id, area: editData.area, sub_area: editData.sub_area, sub_area2: editData.sub_area2, negotiable: editData.negotiable_flag ? true : false,
      name: editData.seller_information.name, email: editData.seller_information.email, phone: editData.seller_information.phone, address: editData.seller_information.address, latitude: editData.latitude, longitude: editData.longitude, 
      phone_hide: editData.seller_information.phone_hide_flag,  image: [...placeAdInput.image, ...selectedImageURIs],  adsCountry: [...placeAdInput.adsCountry, ...selectCountries], make_id: editData.category_id == 1 ? editData.motore_value.make_id : 0, model_id: editData.category_id == 1 ? editData.motore_value.model_id : 0,
      variant_id: editData.category_id == 1 ? editData.motore_value.varient_id : 0, registration_year: editData.category_id == 1 ? editData.motore_value.registration_year : '', fuel: editData.category_id == 1 ? editData.motore_value.fuel_type : '', transmission: editData.category_id == 1 ? editData.motore_value.transmission == 'Manual' ? 1 : 2 : '',
      condition: editData.category_id == 1 ? editData.motore_value.condition == 'New' ? 1 : 2 : '', mileage: editData.category_id == 1 ? editData.motore_value.milage : 0, aircondition: editData.category_id == 1 && !!editData.motor_features.find(feature => feature.value === 'aircondition'), gps: editData.category_id == 1 && !!editData.motor_features.find(feature => feature.value === 'gps'),
      security: editData.category_id == 1 && !!editData.motor_features.find(feature => feature.value === 'security'), tire: editData.category_id == 1 && !!editData.motor_features.find(feature => feature.value === 'tire'), size: editData.category_id == 2 ? editData.property_rend.size : editData.category_id == 3 ? editData.property_sale.size : '',
      room: editData.category_id == 2 ? editData.property_rend.room : editData.category_id == 3 ? editData.property_sale.room : '', furnished: editData.category_id == 2 ? editData.property_rend.furnished == 'Yes' ? 1 : 2 : editData.category_id == 3 ? editData.property_sale.furnished == 'Yes' ? 1 : 2 : '', building: editData.category_id == 2 ? editData.property_rend.building : editData.category_id == 3 ? editData.property_sale.building : '',
      parking: editData.category_id == 2 ? editData.property_rend.parking : editData.category_id == 3 ? editData.property_sale.parking : '', featured: editData.featured_flag
    });
  }
  else{
    setPlaceAdInput({ ...placeAdInput, country: commonInput.common_country_id });
  }
  }, [editData]);

  // console.log(placeAdInput.adsCountry,'____=============')
  // useEffect(() => {
  //   if (commonInput.common_country_id && !placeAdInput.country) {
  //     setPlaceAdInput({ ...placeAdInput, country: commonInput.common_country_id });
  //   }
  // }, [commonInput.common_country_id, placeAdInput.country]);

  useEffect(() => {
    let request = JSON.stringify({
      country: placeAdInput.country,
    });
    dispatch(fetchStateList({ requestBody: request }));
  }, [placeAdInput.country]);

  useEffect(() => {
    let request = JSON.stringify({
      state: placeAdInput.state,
    });
    dispatch(fetchCityList({ requestBody: request }));
  }, [placeAdInput.state]);

  useEffect(() => {
    let request = JSON.stringify({
      category: placeAdInput.category,
      subcategory: placeAdInput.subcategory,
    });
    dispatch(fetchCustomField({ requestBody: request }));
  }, []);

  const setCountry = value => {
    setPlaceAdInput({ ...placeAdInput, country: value });
    setErrors({ ...errors, country: false });
  };

  const setState = value => {
    setPlaceAdInput({ ...placeAdInput, state: value });
    setErrors({ ...errors, state: false });
  };
  const setCity = value => {
    setPlaceAdInput({ ...placeAdInput, city: value });
    setErrors({ ...errors, city: false });
  };

  const nextScreen = () => {
    const hasErrors = !placeAdInput.title || !placeAdInput.description || !placeAdInput.country || !placeAdInput.titleinArabic || !placeAdInput.descriptioninArabic || !priceValue || !placeAdInput.state || !placeAdInput.city || !placeAdInput.area;

    if (hasErrors) {
      setErrors({
        title: !placeAdInput.title,
        titleinArabic: !placeAdInput.titleinArabic,
        description: !placeAdInput.description,
        descriptioninArabic: !placeAdInput.descriptioninArabic,
        priceValue: !priceValue,
        country: !placeAdInput.country,
        state: !placeAdInput.state,
        city: !placeAdInput.city,
        area: !placeAdInput.area,
      });
      return;
    }
    else {
      if (placeAdInput.category == 1) {
        navigation.navigate(RouteNames.MotorPlaceAd, { name: placeAdInput.category_Name, });
      }
      else if (placeAdInput.category == 2 || placeAdInput.category == 3) {
        navigation.navigate(RouteNames.SaleRentPlaceAd, { name: placeAdInput.category_Name, });
      } else {
        if (customLists?.data.category_field.length == 0) {
          navigation.navigate(RouteNames.SellerInformation);
        } else {
          navigation.navigate(RouteNames.CustomPlaceAd, { name: placeAdInput.category_Name, });
        }
      }
    }
  };

  const openDocumentFile = async () => {
    try {
      const imgs = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
        allowMultiSelection: true,
      });
      const selectedImageURIs = imgs.map((img) => img.uri);
      setPlaceAdInput({
        ...placeAdInput,
        image: [...placeAdInput.image, ...selectedImageURIs],
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        throw err;
      }
    }
  };

  const deleteImageAtIndex = (index: number) => {
    const updatedImages = [...placeAdInput.image];

    updatedImages.splice(index, 1);

    setPlaceAdInput({
      ...placeAdInput,
      image: updatedImages,
    });
  };

  const clearFieldsExceptCountryAndCommonCountryId = () => {
    const { category, subcategory } = placeAdInput;
    const newPlaceAdInput = { category, subcategory };

    for (const key in placeAdInput) {
      if (key !== 'category' && key !== 'subcategory') {
        newPlaceAdInput[key] = typeof placeAdInput[key] === 'number' ? 0 : '';
      }
    }

    setPlaceAdInput(newPlaceAdInput);
  };

  return (
    <View flex backgroundColor="white" padding-20>
      <View row centerV>
        <TouchableOpacity onPress={() => {
          navigation.goBack()
          clearFieldsExceptCountryAndCommonCountryId()
        }}>
          <View style={styles.circle}>
            <Image
              source={AppImages.ARROW_LEFT}
              style={{ width: 25, height: 25 }}
            />
          </View>
        </TouchableOpacity>
        <View flex center>
          <Text style={styles.heading}>Place an Ad</Text>
        </View>
      </View>

      <Text style={styles.AdTitle}>Tell us about your {placeAdInput.category_Name}</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View marginV-20>
          <InputField
          label={'Title in English'}
            title={'Enter title'}
            multiline={false}
            height={45}
            type={'default'}
            value={placeAdInput.title}
            onChange={(text) => {
              setPlaceAdInput({ ...placeAdInput, title: text, canonical_name: text });
              setErrors({ ...errors, title: false });
            }}
            trailing={
              errors.title &&
              <Text color={'red'}>required field</Text>
            }
            editable={true}
          />

          <InputField
          label={'Title in Arabic'}
            title={'Enter title (Arabic)'}
            multiline={false}
            height={45}
            type={'default'}
            value={placeAdInput.titleinArabic}
            onChange={(text) => {
              setPlaceAdInput({ ...placeAdInput, titleinArabic: text })
              setErrors({ ...errors, titleinArabic: false });
            }}
            trailing={
              errors.titleinArabic &&
              <Text color={'red'}>required field</Text>
            }
            editable={true}
          />

          <TextField
          label={'Canonical Name'}
          labelStyle={styles.labelStyle}
            placeholder={'Enter canonical name'}
            placeholderTextColor={'#000000'}
            color={'#000000'}
            style={styles.fieldText}
            fieldStyle={styles.fieldStyle1}
            paddingH-15
            marginB-20
            value={placeAdInput.canonical_name}
          />

          <View marginB-20>
            <TouchableOpacity onPress={() => placeAdInput.image.length <= 4 ? openDocumentFile() : null}>
              <View
                paddingH-15
                centerV
                row
                style={[
                  styles.fieldStyle,
                  { borderStyle: 'dashed', justifyContent: 'space-between' },
                ]}>
                <Text style={styles.fieldText}>Upload Image</Text>
                <Image
                  source={AppImages.UPLOAD}
                  tintColor={AppColors.lightBlue}
                />
              </View>
            </TouchableOpacity>
            <Text style={{ color: 'red', fontSize: 8 }}>
              *Maximum 5 images are allowed
            </Text>
            {placeAdInput.image.length != 0 &&
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View row>
                  {placeAdInput.image.map((file, index) => (
                    <TouchableOpacity
                      onPress={() => deleteImageAtIndex(index)}
                      key={index}>
                      <ImageBackground source={{ uri: file }} style={{ width: 60, height: 60, marginHorizontal: 5 }}>
                        <Image source={AppImages.DELETE} style={{ alignSelf: 'flex-end', backgroundColor: 'white' }} />
                      </ImageBackground>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>}
          </View>

          <View>
            {errors.country &&
              <Text color={'red'} style={{ alignSelf: 'flex-end' }}>required field</Text>}
              <Text style={styles.labelStyle}>Country</Text>
            <ItemDropdown
              value={placeAdInput.country}
              data={countryLists?.country}
              add={setCountry}
              dropdownType={'Country'}
            />

          </View>

          <InputField
          label={placeAdInput.category_Name == 'Jobs' ? 'Salary' : 'Price'}
            title={placeAdInput.category_Name == 'Jobs' ? 'Enter salary' : 'Enter price'}
            multiline={false}
            height={45}
            type={'numeric'}
            value={placeAdInput.price_norm}
            onChange={(text) => {
              setPriceValue(text)
              setPlaceAdInput({ ...placeAdInput, price: (text * currencyLists?.usdval).toFixed(2) })
              setErrors({ ...errors, priceValue: false });
            }}
            trailing={
              <View row>
                {errors.priceValue &&
                  <Text color={'red'}>required field</Text>
                }
                <Text>{placeAdInput.price != 0 && placeAdInput.price + ' USD'}</Text>
              </View>
            }
            editable={true}
          />

          <InputField
          label={'Description in English'}
            title={'Enter description'}
            multiline={true}
            height={80}
            type={'default'}
            value={placeAdInput.description}
            onChange={(text) => {
              setPlaceAdInput({ ...placeAdInput, description: text })
              setErrors({ ...errors, description: false });
            }}
            trailing={
              errors.description &&
              <Text color={'red'}>required field</Text>
            }
            editable={true}
          />

          <InputField
          label={'Description in Arabic'}
            title={'Enter description (Arabic)'}
            multiline={true}
            height={80}
            type={'default'}
            value={placeAdInput.descriptioninArabic}
            onChange={(text) => {
              setPlaceAdInput({ ...placeAdInput, descriptioninArabic: text })
              setErrors({ ...errors, descriptioninArabic: false });
            }}
            trailing={
              errors.descriptioninArabic &&
              <Text color={'red'}>required field</Text>
            }
            editable={true}
          />

          <View>
            {errors.state &&
              <Text color={'red'} style={{ alignSelf: 'flex-end' }}>required field</Text>}
              <Text style={styles.labelStyle}>State</Text>
            <ItemDropdown
              value={placeAdInput.state}
              data={stateLists?.state}
              add={setState}
              dropdownType={'State'}
            />
          </View>

          <View>
            {errors.city &&
              <Text color={'red'} style={{ alignSelf: 'flex-end' }}>required field</Text>}
              <Text style={styles.labelStyle}>City</Text>
            <ItemDropdown
              value={placeAdInput.city}
              data={cityLists?.city}
              add={setCity}
              dropdownType={'City'}
            />
          </View>

          <InputField
          label={'Area'}
            title={'Enter area'}
            multiline={false}
            height={45}
            type={'default'}
            value={placeAdInput.area}
            onChange={(text) => {
              setPlaceAdInput({ ...placeAdInput, area: text })
              setErrors({ ...errors, area: false });
            }}
            trailing={
              errors.area &&
              <Text color={'red'}>required field</Text>
            }
            editable={true}
          />

          <InputField
          label={'Sub Area'}
            title={'enter sub area'}
            multiline={false}
            height={45}
            type={'default'}
            value={placeAdInput.sub_area}
            onChange={(text) => { setPlaceAdInput({ ...placeAdInput, sub_area: text }) }}
            trailing={null}
            editable={true}
          />

          <InputField
          label={'Sub Area2'}
            title={'enter sub area2'}
            multiline={false}
            height={45}
            type={'default'}
            value={placeAdInput.sub_area2}
            onChange={(text) => { setPlaceAdInput({ ...placeAdInput, sub_area2: text }) }}
            trailing={null}
            editable={true}
          />
          
          <View>
            <Text style={styles.labelStyle}>Ad View Countries</Text>
          <AdsCountrySelect countryLists={countryLists?.country} Id={editData ? placeAdInput.adsCountry : [commonInput.common_country_id]} />
</View>
          <Checkbox
            label={'Price Negotiable'}
            labelStyle={styles.fieldText}
            value={placeAdInput.negotiable}
            color={'grey'}
            containerStyle={{ marginBottom: 20 }}
            onValueChange={(value) => setPlaceAdInput({ ...placeAdInput, negotiable: value })}
          />

          {placeAdInput.featured == 2 &&
            <Checkbox
              label={'Featured'}
              labelStyle={styles.fieldText}
              value={placeAdInput.featuredSelect}
              color={'grey'}
              containerStyle={{ marginBottom: 20 }}
              onValueChange={(value) => setPlaceAdInput({ ...placeAdInput, featuredSelect: value })}
            />}

          <Button
            label={'Next'}
            style={{ backgroundColor: AppColors.lightBlue }}
            onPress={nextScreen}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default PlaceAdScreen;
