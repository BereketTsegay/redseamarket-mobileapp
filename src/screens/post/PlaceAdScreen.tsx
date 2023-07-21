import React, {useState, useEffect, useContext} from 'react';
import {
  Button,
  Checkbox,
  Image,
  Incubator,
  Text,
  View,
} from 'react-native-ui-lib';
import {RootStackParams, RouteNames} from '../../navigation';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {FlatList, ImageBackground, ScrollView, TouchableOpacity} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import AppImages from '../../constants/AppImages';
import styles from './styles';
import AppColors from '../../constants/AppColors';
import ItemDropdown from '../../components/ItemDropdown';
import InputField from '../../components/InputField';
import {RootState} from '../../../store';
import {useDispatch, useSelector} from 'react-redux';
import {AnyAction, ThunkDispatch} from '@reduxjs/toolkit';
import {fetchStateList} from '../../api/country/StateListSlice';
import {fetchCityList} from '../../api/country/CityListSlice';
import {fetchCustomField} from '../../api/customField/CustomFieldSlice';
import { PlaceAdContext } from '../../api/placeAd/PlaceAdContext';
import { PlaceAdRequest } from '../../api/placeAd/PlaceAdRequest';
import { getWithAuthCall } from '../../api/apiClient';
const {TextField} = Incubator;
export type PlaceAdScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'PlaceAdScreen'
>;

export type PlaceAdScreenRouteProps = RouteProp<
  RootStackParams,
  'PlaceAdScreen'
>;

interface Props {}

const PlaceAdScreen: React.FC<Props> = ({route}) => {
  const navigation = useNavigation<PlaceAdScreenNavigationProps>();
  const {cat_id, sub_id, name} = route.params;
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const {placeAdInput, setPlaceAdInput} = useContext(PlaceAdContext)
  const {countryLists} = useSelector((state: RootState) => state.CountryList);
  const {stateLists} = useSelector((state: RootState) => state.StateList);
  const {cityLists} = useSelector((state: RootState) => state.CityList);
  const {customLists} = useSelector(
    (state: RootState) => state.CustomFieldList,
  );

  useEffect(() => {
    let request = JSON.stringify({
      country: placeAdInput.country,
    });
    dispatch(fetchStateList({requestBody: request}));
  }, [placeAdInput.country]);

  useEffect(() => {
    let request = JSON.stringify({
      state: placeAdInput.state,
    });
    dispatch(fetchCityList({requestBody: request}));
  }, [placeAdInput.state]);

  useEffect(() => {
    let request = JSON.stringify({
      category: cat_id,
      subcategory: sub_id,
    });
    dispatch(fetchCustomField({requestBody: request}));
  }, []);

  useEffect(() => {
    getWithAuthCall('app/featured')
    .then(response=>
      setPlaceAdInput({...placeAdInput, featured:response.data.data}))
  }, []);

  const setCountry = value => {
    setPlaceAdInput({...placeAdInput, country: value});
  };

  const setState = value => {
    setPlaceAdInput({...placeAdInput, state: value});
  };
  const setCity = value => {
    setPlaceAdInput({...placeAdInput, city: value});
  };

  const nextScreen = () => {
    if (cat_id == 1) {
      navigation.navigate(RouteNames.MotorPlaceAd, {cat_id: cat_id,sub_id: sub_id,name: name,});
    } 
    else if (cat_id == 2 || cat_id == 3) {
      navigation.navigate(RouteNames.SaleRentPlaceAd, {cat_id: cat_id,sub_id: sub_id,name: name,});
    } else {
      if (customLists?.data.category_field.length == 0) {
        navigation.navigate(RouteNames.SellerInformation);
      } else {
        navigation.navigate(RouteNames.CustomPlaceAd, {cat_id: cat_id,sub_id: sub_id,name: name, });
      }
    }
  };

  console.log(placeAdInput.featured)

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


  return (
    <View flex backgroundColor="white" padding-20>
      <View row centerV>
        <TouchableOpacity onPress={() => {navigation.goBack()
                                           setPlaceAdInput(new PlaceAdRequest())}}>
          <View style={styles.circle}>
            <Image
              source={AppImages.ARROW_LEFT}
              style={{width: 25, height: 25}}
            />
          </View>
        </TouchableOpacity>
        <View flex center>
          <Text style={styles.heading}>Place an Ad</Text>
        </View>
      </View>

      <Text style={styles.AdTitle}>Tell us about your {name}</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View marginV-20>
          <InputField
            title={'Title in English'}
            multiline={false}
            height={45}
            type={'default'}
            value={placeAdInput.title}
            onChange={(text)=>{setPlaceAdInput({...placeAdInput, title: text, canonical_name:text})}}
          />

          <InputField
            title={'Title in Arabic'}
            multiline={false}
            height={45}
            type={'default'}
            value={placeAdInput.titleinArabic}
            onChange={(text)=>{setPlaceAdInput({...placeAdInput, titleinArabic:text})}}
          />

          <TextField
            placeholder={'Canonical Name'}
            placeholderTextColor={'#000000'}
            color={'#000000'}
            style={styles.fieldText}
            fieldStyle={styles.fieldStyle1}
            paddingH-15
            marginB-20
            value={placeAdInput.canonical_name}
          />

          <View marginB-20>
            <TouchableOpacity onPress={()=>placeAdInput.image.length <= 4 ? openDocumentFile() : null}>
            <View
              paddingH-15
              centerV
              row
              style={[
                styles.fieldStyle,
                {borderStyle: 'dashed', justifyContent: 'space-between'},
              ]}>
              <Text style={styles.fieldText}>Upload Image</Text>
              <Image
                source={AppImages.UPLOAD}
                tintColor={AppColors.lightBlue}
              />
            </View>
            </TouchableOpacity>
            <Text style={{color: 'red', fontSize: 8}}>
              *Maximum 5 images are allowed
            </Text>
            {placeAdInput.image.length != 0 &&
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View row>
           {placeAdInput.image.map((value,index)=>(
            <TouchableOpacity 
            onPress={()=>deleteImageAtIndex(index)} 
            key={index}>
            <ImageBackground source={{uri:value}} style={{width:60,height:60,marginHorizontal:5}}>
              <Image source={AppImages.DELETE} style={{alignSelf:'flex-end',backgroundColor:'white'}}/>
              </ImageBackground>
              </TouchableOpacity>
              ))}
              </View>
              </ScrollView>}
          </View>

          <ItemDropdown
            value={'Select Country'}
            data={countryLists?.country}
            add={setCountry}
          />

          <InputField
            title={'Price'}
            multiline={false}
            height={45}
            type={'numeric'}
            value={placeAdInput.price}
            onChange={(text)=>{setPlaceAdInput({...placeAdInput, price:text})}}
          />

          <InputField
            title={'Description in English'}
            multiline={true}
            height={80}
            type={'default'}
            value={placeAdInput.description}
            onChange={(text)=>{setPlaceAdInput({...placeAdInput, description:text})}}
          />

          <InputField
            title={'Description in Arabic'}
            multiline={true}
            height={80}
            type={'default'}
            value={placeAdInput.descriptioninArabic}
            onChange={(text)=>{setPlaceAdInput({...placeAdInput, descriptioninArabic:text})}}
          />

          <ItemDropdown
            value={'Select State'}
            data={stateLists?.state}
            add={setState}
          />

          <ItemDropdown
            value={'Select City'}
            data={cityLists?.city}
            add={setCity}
          />

          <InputField
            title={'Area'}
            multiline={false}
            height={45}
            type={'default'}
            value={placeAdInput.area}
            onChange={(text)=>{setPlaceAdInput({...placeAdInput, area:text})}}
          />

          <InputField
            title={'Sub area'}
            multiline={false}
            height={45}
            type={'default'}
            value={placeAdInput.sub_area}
            onChange={(text)=>{setPlaceAdInput({...placeAdInput, sub_area:text})}}
          />

          <InputField
            title={'Sub area2'}
            multiline={false}
            height={45}
            type={'default'}
            value={placeAdInput.sub_area2}
            onChange={(text)=>{setPlaceAdInput({...placeAdInput, sub_area2:text})}}
          />

          <Checkbox
            label={'Price Negotiable'}
            labelStyle={styles.fieldText}
            value={placeAdInput.negotiable}
            color={'grey'}
            containerStyle={{marginBottom: 20}}
            onValueChange={(value)=>setPlaceAdInput({...placeAdInput, negotiable:value})}
          />
        
        {placeAdInput.featured == 2 &&
          <Checkbox
            label={'Featured'}
            labelStyle={styles.fieldText}
            value={false}
            color={'grey'}
            containerStyle={{marginBottom: 20}}
          />}

          <Button
            label={'Next'}
            style={{backgroundColor: AppColors.lightBlue}}
            onPress={nextScreen}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default PlaceAdScreen;
