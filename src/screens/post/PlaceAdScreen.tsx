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
import {
  FlatList,
  ImageBackground,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
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
import {PlaceAdContext} from '../../api/placeAd/PlaceAdContext';
import AdsCountrySelect from '../../components/AdsCountrySelect';
import {CommonContext} from '../../api/commonContext';
import {SimpleApiClient, apiClient} from '../../api/apiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppStrings from '../../constants/AppStrings';
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

const PlaceAdScreen: React.FC<Props> = ({editData}) => {
  const navigation = useNavigation<PlaceAdScreenNavigationProps>();
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const {placeAdInput, setPlaceAdInput} = useContext(PlaceAdContext);
  const {commonInput, setCommonInput} = useContext(CommonContext);
  const [stateDropdownTouched, setStateDropdownTouched] = useState(false);
  const [cityDropdownTouched, setCityDropdownTouched] = useState(false);
  const [priceValue, setPriceValue] = useState('');
  const {countryLists} = useSelector((state: RootState) => state.CountryList);
  const {stateLists} = useSelector((state: RootState) => state.StateList);
  const {cityLists} = useSelector((state: RootState) => state.CityList);
  const {currencyLists} = useSelector((state: RootState) => state.CurrencyList);
  const {customLists} = useSelector(
    (state: RootState) => state.CustomFieldList,
  );
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
    valueSet();
  }, []);

  const valueSet = async () => {
    const stored_country_id = await AsyncStorage.getItem(AppStrings.COUNTRY);
    if (editData) {
      const selectedImageURIs = editData.image.map(img => ({
        id: img.id,
        image: 'https://admin-jamal.prompttechdemohosting.com/' + img.image,
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
        value:  item.value.startsWith('storage/') ? 'https://admin-jamal.prompttechdemohosting.com/' + item.value : item.value,
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
      category: placeAdInput.category,
      subcategory: placeAdInput.subcategory,
    });
    dispatch(fetchCustomField({requestBody: request}));
  }, [placeAdInput.category, placeAdInput.subcategory]);

  const setCountry = value => {
    setPlaceAdInput({...placeAdInput, country: value});
    setErrors({...errors, country: false});
  };

  const setState = value => {
    setPlaceAdInput({...placeAdInput, state: value});
    setErrors({...errors, state: false});
  };
  const setCity = value => {
    setPlaceAdInput({...placeAdInput, city: value});
    setErrors({...errors, city: false});
  };

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
      const imgs = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
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
      if (DocumentPicker.isCancel(err)) {
        throw err;
      }
    }
  };

  const deleteImageAtIndex = (index: number, id: any) => {
    if (id !== 0) {
      let request = JSON.stringify({
        id: id,
      });
      apiClient('customer/ads/remove_image', 'POST', request)
        .then(response => {
          ToastAndroid.show(
            JSON.stringify(response.data.message),
            ToastAndroid.SHORT,
          );
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
    const {category, subcategory} = placeAdInput;
    const newPlaceAdInput = {category, subcategory};

    for (const key in placeAdInput) {
      if (key !== 'category' && key !== 'subcategory') {
        newPlaceAdInput[key] = typeof placeAdInput[key] == 'number' ? 0 : '';
      }
    }

    setPlaceAdInput(newPlaceAdInput);
  };

  const handleTitleChange = text => {
    setPlaceAdInput((prevPlaceAdInput: any) => ({
      ...prevPlaceAdInput,
      title: text,
      canonical_name: text,
    }));
    setErrors(prevErrors => ({...prevErrors, title: false}));
    handleArabChange(text, 'title');
  };

  const handleDescriptionChange = text => {
    setPlaceAdInput((prevPlaceAdInput: any) => ({
      ...prevPlaceAdInput,
      description: text,
    }));
    setErrors(prevErrors => ({...prevErrors, description: false}));
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


  return (
    <View flex backgroundColor="white" padding-20>
      <View row centerV>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
            clearFieldsExceptCountryAndCommonCountryId();
          }}>
          <View style={styles.circle}>
            <Image
              source={AppImages.ARROW_LEFT}
              style={{width: 25, height: 25}}
            />
          </View>
        </TouchableOpacity>
        <View flex center>
          <Text style={styles.heading}>{strings.placeAd}</Text>
        </View>
      </View>

      <Text style={styles.AdTitle}>
        {strings.tellUs} {placeAdInput.category_Name}
      </Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View marginV-20>
          <InputField
            label={strings.engTitle}
            title={strings.enterTitle}
            multiline={false}
            height={45}
            type={'default'}
            value={placeAdInput.title}
            onChange={text => {
              handleTitleChange(text);
            }}
            trailing={
              errors.title && <Text color={'red'}>{strings.requiredField}</Text>
            }
            editable={true}
          />

          <InputField
            label={strings.arabTitle}
            title={strings.enterArab}
            multiline={false}
            height={45}
            type={'default'}
            value={placeAdInput.titleinArabic}
            onChange={text => {
              setPlaceAdInput({...placeAdInput, titleinArabic: text});
              setErrors({...errors, titleinArabic: false});
            }}
            trailing={
              errors.titleinArabic && (
                <Text color={'red'}>{strings.requiredField}</Text>
              )
            }
            editable={true}
          />

          <TextField
            label={strings.canonical}
            labelStyle={styles.labelStyle}
            placeholder={strings.enterCanonical}
            placeholderTextColor={'#000000'}
            color={'#000000'}
            style={styles.fieldText}
            fieldStyle={styles.fieldStyle1}
            paddingH-15
            marginB-20
            value={placeAdInput.canonical_name}
          />

          <View marginB-20>
            <TouchableOpacity
              onPress={() =>
                placeAdInput.image.length <= 4 ? openDocumentFile() : null
              }>
              <View
                paddingH-15
                centerV
                row
                style={[
                  styles.fieldStyle,
                  {borderStyle: 'dashed', justifyContent: 'space-between'},
                ]}>
                <Text style={styles.fieldText}>{strings.UploadImage}</Text>
                <Image
                  source={AppImages.UPLOAD}
                  tintColor={AppColors.lightBlue}
                />
              </View>
            </TouchableOpacity>
            <Text style={{color: 'red', fontSize: 8}}>
              *{strings.maxImages}
            </Text>
            {placeAdInput.image.length != 0 && (
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View row>
                  {placeAdInput.image.map((image, index) => (
                    <TouchableOpacity
                      onPress={() => deleteImageAtIndex(index, image.id)}
                      key={index}>
                      <ImageBackground
                        source={{uri: image.image}}
                        style={{width: 60, height: 60, marginHorizontal: 5}}>
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

          <View>
            {errors.country && (
              <Text color={'red'} style={{alignSelf: 'flex-end'}}>
                {strings.requiredField}
              </Text>
            )}
            <Text style={styles.labelStyle}>{strings.country}</Text>
            <ItemDropdown
              value={placeAdInput.country}
              data={countryLists?.country}
              add={setCountry}
              dropdownType={strings.country}
              error={stateDropdownTouched && !placeAdInput.country}
            />
          </View>

          <InputField
            label={
              placeAdInput.category_Name == 'Jobs'
                ? strings.salary
                : strings.price
            }
            title={
              placeAdInput.category_Name == 'Jobs'
                ? strings.enterSalary
                : strings.enterPrice
            }
            multiline={false}
            height={45}
            type={'numeric'}
            value={placeAdInput.price_norm}
            onChange={text => {
              setPriceValue(text);
              setPlaceAdInput({
                ...placeAdInput,
                price: (text * currencyLists?.usdval).toFixed(2),
              });
              setErrors({...errors, priceValue: false});
            }}
            trailing={
              <View row>
                {errors.priceValue && (
                  <Text color={'red'}>{strings.requiredField}</Text>
                )}
                <Text>
                  {placeAdInput.price != 0 && placeAdInput.price + ' USD'}
                </Text>
              </View>
            }
            editable={true}
          />

          <InputField
            label={strings.engDescription}
            title={strings.enterDescription}
            multiline={true}
            height={80}
            type={'default'}
            value={placeAdInput.description}
            onChange={text => {
              handleDescriptionChange(text);
            }}
            trailing={
              errors.description && (
                <Text color={'red'}>{strings.requiredField}</Text>
              )
            }
            editable={true}
          />

          <InputField
            label={strings.arabDescription}
            title={strings.enterArabDescription}
            multiline={true}
            height={80}
            type={'default'}
            value={placeAdInput.descriptioninArabic}
            onChange={text => {
              setPlaceAdInput({...placeAdInput, descriptioninArabic: text});
              setErrors({...errors, descriptioninArabic: false});
            }}
            trailing={
              errors.descriptioninArabic && (
                <Text color={'red'}>{strings.requiredField}</Text>
              )
            }
            editable={true}
          />

          <View>
            {errors.state && (
              <Text color={'red'} style={{alignSelf: 'flex-end'}}>
                {strings.requiredField}
              </Text>
            )}
            <Text style={styles.labelStyle}>{strings.state}</Text>
            <ItemDropdown
              value={placeAdInput.state}
              data={stateLists?.state}
              add={setState}
              dropdownType={strings.state}
              onBlur={() => setStateDropdownTouched(true)}
              error={cityDropdownTouched && !placeAdInput.state}
            />
          </View>

          <View>
            <Text style={styles.labelStyle}>{strings.city}</Text>
            <ItemDropdown
              value={placeAdInput.city}
              data={cityLists?.city}
              add={setCity}
              dropdownType={strings.city}
              onBlur={() => setCityDropdownTouched(true)}
            />
          </View>

          <InputField
            label={strings.area}
            title={strings.enterArea}
            multiline={false}
            height={45}
            type={'default'}
            value={placeAdInput.area}
            onChange={text => {
              setPlaceAdInput({...placeAdInput, area: text});
            }}
            editable={true}
          />

          <InputField
            label={strings.subArea}
            title={strings.enterSubArea}
            multiline={false}
            height={45}
            value={placeAdInput.sub_area}
            onChange={text => {
              setPlaceAdInput({...placeAdInput, sub_area: text});
            }}
            trailing={null}
            editable={true}
          />

          <InputField
            label={strings.subArea + '2'}
            title={strings.enterSubArea + '2'}
            multiline={false}
            height={45}
            value={placeAdInput.sub_area2}
            onChange={text => {
              setPlaceAdInput({...placeAdInput, sub_area2: text});
            }}
            trailing={null}
            editable={true}
          />

          <View>
            <Text style={styles.labelStyle}>{strings.viewCountries}</Text>
            <AdsCountrySelect
              countryLists={countryLists?.country}
              Id={
                editData
                  ? editData.mapCountry.map(item => Number(item.country_id))
                  : [Number(commonInput.common_country_id)]
              }
            />
          </View>
          <Checkbox
            label={strings.negotiable}
            labelStyle={styles.fieldText}
            value={placeAdInput.negotiable}
            color={'grey'}
            containerStyle={{marginBottom: 20}}
            onValueChange={value =>
              setPlaceAdInput({...placeAdInput, negotiable: value})
            }
          />

          {placeAdInput.featured == 2 && (
            <Checkbox
              label={strings.featured}
              labelStyle={styles.fieldText}
              value={placeAdInput.featuredSelect}
              color={'grey'}
              containerStyle={{marginBottom: 20}}
              onValueChange={value =>
                setPlaceAdInput({...placeAdInput, featuredSelect: value})
              }
            />
          )}

          <Button
            label={strings.next}
            style={{backgroundColor: AppColors.lightBlue}}
            onPress={nextScreen}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default PlaceAdScreen;
