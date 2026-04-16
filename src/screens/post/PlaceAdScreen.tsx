import React, { useState, useEffect, useContext, useMemo } from 'react';
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
import {
  BackHandler,
  FlatList,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { pick, types } from '@react-native-documents/picker';
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
import AdsCountrySelect from '../../components/AdsCountrySelect';
import { CommonContext } from '../../api/commonContext';
import { SimpleApiClient, apiClient } from '../../api/apiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppStrings from '../../constants/AppStrings';
import { showToast } from '../../constants/commonUtils';
import { fetchSubCategoryList } from '../../api/subCategories/SubCategoryListSlice';
import { BackHeader } from './BackHeader';
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
  const { placeAdInput, setPlaceAdInput } = useContext(PlaceAdContext);
  const { commonInput, setCommonInput } = useContext(CommonContext);
  const [stateDropdownTouched, setStateDropdownTouched] = useState(false);
  const [cityDropdownTouched, setCityDropdownTouched] = useState(false);
  const [priceValue, setPriceValue] = useState('');
  const [customValues, setCustomValues] = useState<any[]>([]);
  const { countryLists } = useSelector((state: RootState) => state.CountryList);
  const { stateLists } = useSelector((state: RootState) => state.StateList);
  const { cityLists } = useSelector((state: RootState) => state.CityList);
  const { customLists } = useSelector(
    (state: RootState) => state.CustomFieldList,
  );
  const [innerSubCategories, setInnerSubCategories] = useState([]);
  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage,
  );
  const strings = useSelector(
    (state: RootState) => state.language.resources[currentLanguage],
  );
  const [errors, setErrors] = useState({
    title: false,
    titleinArabic: false,
    description: false,
    descriptioninArabic: false,
    priceValue: false,
    country: false,
    state: false,
  });

  useEffect(() => {
    if (placeAdInput.subcategory) {
      let request = JSON.stringify({
        parent_id: placeAdInput.subcategory,
      });
      dispatch(fetchSubCategoryList({ requestBody: request })).then((res: any) => {
        setInnerSubCategories(res.payload.subCategoryLists.data);
      });
    }
  }, []);


  const handleBackPress = () => {
    navigation.goBack();
    clearFieldsExceptCountryAndCommonCountryId();
    return true;
  };

  useEffect(() => {

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );
    return () => backHandler.remove();

  }, []);

  useEffect(() => {
    valueSet();
  }, []);

  const valueSet = async () => {
    const stored_country_id = await AsyncStorage.getItem(AppStrings.COUNTRY);
    if (editData) {
      const selectedImageURIs = editData.image.map(img => ({
        id: img.id,
        image: img.image,
      }));
      setPlaceAdInput({
        ...placeAdInput,
        image: [...placeAdInput.image, ...selectedImageURIs],
      });
      const selectCountries = editData.mapCountry.map(item =>
        Number(item.country_id),
      );
      const customData = editData.custom_value.map(item => ({
        field_id: item.field_id,
        value: item.value.startsWith('storage/') ? 'https://admin-jamal.prompttechdemohosting.com/' + item.value : item.value,
      }));
      setPriceValue(editData.price);
      setPlaceAdInput({
        ...placeAdInput,
        id: editData.id,
        category: editData.category_id,
        subcategory: editData.subcategory_id,
        category_Name: editData.category.name,
        title: editData.title,
        titleinArabic: editData.title_arabic,
        canonical_name: editData.canonical_name,
        description: editData.description,
        descriptioninArabic: editData.description_arabic,
        price: editData.price,
        country: editData.country_id,
        state: editData.state_id,
        city: editData.city_id,
        area: editData.area,
        sub_area: editData.sub_area,
        sub_area2: editData.sub_area2,
        negotiable: editData.negotiable_flag ? true : false,
        name: editData.seller_information.name,
        email: editData.seller_information.email,
        phone: editData.seller_information.phone,
        address: editData.seller_information.address,
        latitude: editData.latitude,
        longitude: editData.longitude,
        phone_hide: editData.seller_information.phone_hide_flag,
        image: [...placeAdInput.image, ...selectedImageURIs],
        adsCountry: [...placeAdInput.adsCountry, ...selectCountries],
        make_id: editData.category_id == 1 ? editData.motore_value.make_id : 0,
        model_id:
          editData.category_id == 1 ? editData.motore_value.model_id : 0,
        variant_id:
          editData.category_id == 1 ? editData.motore_value.varient_id : 0,
        registration_year:
          editData.category_id == 1
            ? editData.motore_value.registration_year
            : '',
        fuel: editData.category_id == 1 ? editData.motore_value.fuel_type : '',
        transmission:
          editData.category_id == 1
            ? editData.motore_value.transmission == 'Manual'
              ? 1
              : 2
            : '',
        condition:
          editData.category_id == 1
            ? editData.motore_value.condition == 'New'
              ? 1
              : 2
            : '',
        mileage: editData.category_id == 1 ? editData.motore_value.milage : 0,
        aircondition:
          editData.category_id == 1 &&
          !!editData.motor_features.find(
            feature => feature.value == 'aircondition',
          ),
        gps:
          editData.category_id == 1 &&
          !!editData.motor_features.find(feature => feature.value == 'gps'),
        security:
          editData.category_id == 1 &&
          !!editData.motor_features.find(
            feature => feature.value == 'security',
          ),
        tire:
          editData.category_id == 1 &&
          !!editData.motor_features.find(feature => feature.value == 'tire'),
        size:
          editData.category_id == 2
            ? editData.property_rend.size
            : editData.category_id == 3
              ? editData.property_sale.size
              : '',
        room:
          editData.category_id == 2
            ? editData.property_rend.room
            : editData.category_id == 3
              ? editData.property_sale.room
              : '',
        furnished:
          editData.category_id == 2
            ? editData.property_rend.furnished == 'Yes'
              ? 1
              : 2
            : editData.category_id == 3
              ? editData.property_sale.furnished == 'Yes'
                ? 1
                : 2
              : '',
        building:
          editData.category_id == 2
            ? editData.property_rend.building_type
            : editData.category_id == 3
              ? editData.property_sale.building.building_type
              : '',
        parking:
          editData.category_id == 2
            ? editData.property_rend.parking
            : editData.category_id == 3
              ? editData.property_sale.parking
              : '',
        featured: editData.featured_flag,
        fieldValue: customData,
      });
    } else {
      setPlaceAdInput({
        ...placeAdInput,
        country: stored_country_id,
        adsCountry: [Number(stored_country_id)],
      });
    }
  };

  // console.log(placeAdInput.adsCountry,'____=============', commonInput.common_country_id)
  // useEffect(() => {
  //   if (commonInput.common_country_id && !placeAdInput.country) {
  //     setPlaceAdInput({ ...placeAdInput, country: commonInput.common_country_id });
  //   }
  // }, [commonInput.common_country_id, placeAdInput.country]);

  useEffect(() => {
    let request = JSON.stringify({
      country_id: placeAdInput.country,
    });
    dispatch(fetchStateList({ requestBody: request }));
  }, [placeAdInput.country]);

  useEffect(() => {
    let request = JSON.stringify({
      state_id: placeAdInput.state,
    });
    dispatch(fetchCityList({ requestBody: request }));
  }, [placeAdInput.state]);

  useEffect(() => {
    let request = JSON.stringify({
      category_id: placeAdInput.subcategory,
    });
    dispatch(fetchCustomField({ requestBody: request }));
  }, [placeAdInput.subcategory]);

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

  console.log('place ad input', placeAdInput);

  const nextScreen = () => {
    const hasErrors =
      !placeAdInput.title ||
      !placeAdInput.description ||
      !placeAdInput.country ||
      !placeAdInput.titleinArabic ||
      !placeAdInput.descriptioninArabic ||
      !priceValue ||
      !placeAdInput.state

    if (hasErrors) {
      setErrors({
        title: !placeAdInput.title,
        titleinArabic: !placeAdInput.titleinArabic,
        description: !placeAdInput.description,
        descriptioninArabic: !placeAdInput.descriptioninArabic,
        priceValue: !priceValue,
        country: !placeAdInput.country,
        state: !placeAdInput.state
      });
      return;
    } else {
      if (placeAdInput.category == 1) {
        navigation.navigate(RouteNames.MotorPlaceAd, {
          name: placeAdInput.category_Name,
        });
      } else if (placeAdInput.category == 2 || placeAdInput.category == 3) {
        navigation.navigate(RouteNames.SaleRentPlaceAd, {
          name: placeAdInput.category_Name,
        });
      } else {
        if (
          editData
            ? placeAdInput.fieldValue == 0
            : customLists?.data.category_field.length == 0
        ) {
          navigation.navigate(RouteNames.SellerInformation);
        } else {
          navigation.navigate(RouteNames.CustomPlaceAd, {
            name: placeAdInput.category_Name,
          });
        }
      }
    }
  };

  const openDocumentFile = async () => {
    try {
      const imgs = await pick({
        mode: 'open',
        type: [types.images],
        allowMultiSelection: true,
      });
      const selectedImageURIs = imgs.map((img, index) => ({
        // id: placeAdInput.image.length + index + 1,
        id: 0,
        image: img.uri,
      }));
      setPlaceAdInput({
        ...placeAdInput,
        image: [...placeAdInput.image, ...selectedImageURIs],
      });
    } catch (err) {
      console.log('Image picker error:', err);
      showToast('User cancelled image picker');
    }
  };

  const deleteImageAtIndex = (index: number, id: any) => {
    if (id !== 0) {
      let request = JSON.stringify({
        id: id,
      });
      apiClient('customer/ads/remove_image', 'POST', request)
        .then(response => {
          showToast(response.data.message)
        })
        .catch(error => {
          console.error('Image deletion error:', error);
        });
    }

    const updatedImages = [...placeAdInput.image];

    updatedImages.splice(index, 1);

    const newImages = updatedImages.map((img, idx) => ({
      id: img.id,
      image: img.image,
    }));
    setPlaceAdInput({
      ...placeAdInput,
      image: newImages,
    });
  };
  // console.log(placeAdInput.image,'-------')

  const clearFieldsExceptCountryAndCommonCountryId = () => {
    const { category } = placeAdInput;
  };

  const handleTitleChange = text => {
    setPlaceAdInput((prevPlaceAdInput: any) => ({
      ...prevPlaceAdInput,
      title: text,
      canonical_name: text,
    }));
    setErrors(prevErrors => ({ ...prevErrors, title: false }));
    handleArabChange(text, 'title');
  };

  const handleDescriptionChange = text => {
    setPlaceAdInput((prevPlaceAdInput: any) => ({
      ...prevPlaceAdInput,
      description: text,
    }));
    setErrors(prevErrors => ({ ...prevErrors, description: false }));
    handleArabChange(text, 'description');
  };

  const handleArabChange = (text, status) => {
    let request = JSON.stringify({
      text: text,
    });

    SimpleApiClient('app/ar/text', 'POST', request)
      .then(response => {
        try {
          if (response.data.status === 'success') {
            if (status == 'title') {
              setPlaceAdInput((prevPlaceAdInput: any) => ({
                ...prevPlaceAdInput,
                titleinArabic: response.data.data,
              }));
            } else if (status == 'description') {
              setPlaceAdInput((prevPlaceAdInput: any) => ({
                ...prevPlaceAdInput,
                descriptioninArabic: response.data.data,
              }));
            }
          } else {
            if (status == 'title') {
              setPlaceAdInput((prevPlaceAdInput: any) => ({
                ...prevPlaceAdInput,
                titleinArabic: '',
              }));
            } else if (status == 'description') {
              setPlaceAdInput((prevPlaceAdInput: any) => ({
                ...prevPlaceAdInput,
                descriptioninArabic: '',
              }));
            }
          }
        } catch (error) {
          if (status == 'title') {
            setPlaceAdInput((prevPlaceAdInput: any) => ({
              ...prevPlaceAdInput,
              titleinArabic: '',
            }));
          } else if (status == 'description') {
            setPlaceAdInput((prevPlaceAdInput: any) => ({
              ...prevPlaceAdInput,
              descriptioninArabic: '',
            }));
          }
        }
      })
      .catch(error => {
        setPlaceAdInput((prevPlaceAdInput: any) => ({
          ...prevPlaceAdInput,
          titleinArabic: '',
        }));
      });
  };

  const handleCustomChange = (fieldIndex: number, value: any) => {
    setCustomValues(prev => {
      const updated = [...prev];
      const index = updated.findIndex(f => f.field_id === fieldIndex);

      if (index > -1) {
        updated[index].value = value;
      } else {
        updated.push({ field_id: fieldIndex, value });
      }

      return updated;
    });
  };

  const getValue = (fieldIndex: number) => {
    const item = customValues.find(f => f.field_id === fieldIndex);
    return item ? item.value : '';
  };

  const renderCustomField = (field: any, index: number) => {
    const value = getValue(index);

    switch (field.type) {

      // ✅ TEXT INPUT
      case 'text':
        return (
          <InputField
            key={index}
            label={field.label}
            title={`Enter ${field.label}`}
            value={value}
            onChange={(text: string) => handleCustomChange(index, text)}
          />
        );

      // ✅ TEXTAREA
      case 'textarea':
        const limit = field.word_limit || 200;
        const currentLength = value ? value.length : 0;

        return (
          <View key={index} style={{ marginBottom: 15 }}>
            <InputField
              label={field.label}
              title={`Enter ${field.label}`}
              multiline={true}
              height={80}
              value={value}
              onChange={(text: string) => {
                if (text.length <= limit) {
                  handleCustomChange(index, text);
                }
              }}
            />

            {/* ✅ Counter */}
            <Text
              style={{
                fontSize: 12,
                color: currentLength >= limit ? 'red' : '#888',
                marginTop: -8,
              }}
            >
              {currentLength}/{limit} letters
            </Text>
          </View>
        );

      // ✅ RADIO BUTTON
      case 'radio':
        return (
          <View key={index} marginB-15>
            <Text style={styles.labelStyle}>{field.label}</Text>

            <View row style={{ flexWrap: 'wrap', marginTop: 10 }}>
              {field.radio_options?.map((option: string, i: number) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => handleCustomChange(index, option)}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginRight: 20,
                    marginBottom: 10,
                  }}>

                  {/* circle */}
                  <View
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: 8,
                      borderWidth: 2,
                      borderColor: AppColors.lightBlue,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 5,
                    }}>
                    {value === option && (
                      <View
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: 4,
                          backgroundColor: AppColors.lightBlue,
                        }}
                      />
                    )}
                  </View>

                  <Text>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      // ✅ SELECT DROPDOWN
      case 'select':
        return (
          <View key={index}>
            <Text style={styles.labelStyle}>{field.label}</Text>

            <ItemDropdown
              value={value}
              data={[]} // ⚠️ replace with dropdown API data
              add={(val: any) => handleCustomChange(index, val)}
              dropdownType={field.label}
            />
          </View>
        );

      // ✅ FILE PICKER
      case 'file':
        return (
          <View key={index} marginB-15>
            <Text style={styles.labelStyle}>{field.label}</Text>

            <TouchableOpacity onPress={openDocumentFile}>
              <View
                style={[
                  styles.fieldStyle,
                  {
                    borderStyle: 'dashed',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                  },
                ]}>
                <Text>Select File</Text>
                <Image source={AppImages.UPLOAD} />
              </View>
            </TouchableOpacity>
            {placeAdInput.image.length != 0 && (
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View row>
                  {placeAdInput.image.map((image, index) => (
                    <TouchableOpacity
                      onPress={() => deleteImageAtIndex(index, image.id)}
                      key={index}>
                      <ImageBackground
                        source={{ uri: image.image }}
                        style={{ width: 60, height: 60, marginHorizontal: 5 }}>
                        <Image
                          source={AppImages.DELETE}
                          style={{
                            alignSelf: 'flex-end',
                            backgroundColor: 'white',
                          }}
                        />
                      </ImageBackground>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            )}
          </View>
        );

      // ✅ MAP (placeholder)
      case 'map':
        return (
          <View key={index} marginB-15>
            <Text style={styles.labelStyle}>{field.label}</Text>
            <Text>Select location (map integration pending)</Text>
          </View>
        );

      default:
        return null;
    }
  };

  const sortedFields = useMemo(() => {
    return [...(customLists?.data?.fields || [])].sort(
      (a, b) => a.sort_order - b.sort_order
    );
  }, [customLists]);


  return (
    <View flex backgroundColor={AppColors.white} padding-20>
      <BackHeader title={strings.placeAd} navigation={navigation} onBackPress={() => {
        navigation.goBack();
        clearFieldsExceptCountryAndCommonCountryId();
      }} />

      <Text style={styles.AdTitle}>
        {strings.tellUs} {placeAdInput.category_Name}
      </Text>

      {placeAdInput.categoryPath?.length > 0 && (
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>
            {placeAdInput.categoryPath.map(item => item.name).join(' > ')}
          </Text>
        </View>
      )}

      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled'>
        <View marginT-20>

          {innerSubCategories.length > 0 && (
            <View>
              <Text style={styles.labelStyle}>Select Category</Text>
              <ItemDropdown
                value={placeAdInput.innercategory}
                data={innerSubCategories}
                add={(val) =>
                  setPlaceAdInput(prev => ({
                    ...prev,
                    innercategory: val,
                  }))
                }
                dropdownType={'Select'}
              />
            </View>
          )}


          {sortedFields.map((field, index) =>
            renderCustomField(field, index)
          )}

          <Button
            label={strings.next}
            style={{ backgroundColor: AppColors.lightBlue }}
            onPress={nextScreen}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default PlaceAdScreen;
