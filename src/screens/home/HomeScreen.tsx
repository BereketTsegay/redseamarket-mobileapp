import React, { useState, useEffect, useContext } from 'react';
import { Image, Incubator, Text, View } from 'react-native-ui-lib';
import { RootStackParams, RouteNames } from '../../navigation';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import AppImages from '../../constants/AppImages';
import SelectDropdown from 'react-native-select-dropdown';
import styles from './styles';
import AppColors from '../../constants/AppColors';
import { ActivityIndicator, Alert, FlatList, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashBoardList } from '../../api/home/DashBoardListSlice';
import AppFonts from '../../constants/AppFonts';
import { fetchCountryList } from '../../api/country/CountryListSlice';
import { fetchCurrencyList } from '../../api/currency/CurrencyListSlice';
import CountrySelectionModal from '../../components/CountrySelectionModal';
import { CommonContext } from '../../api/commonContext';
import HomeScreenSlider from '../../components/HomeScreenSlider';
const { TextField } = Incubator;
export type HomeScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'HomeScreen'
>;

export type HomeScreenRouteProps = RouteProp<
  RootStackParams,
  'HomeScreen'
>;

interface Props { }

const HomeScreen: React.FC<Props> = () => {
  const navigation = useNavigation<HomeScreenNavigationProps>();
  const [lang, setLang] = useState([{ code: 'English', name: 'UK', id: 1 }]);
  const { commonInput, setCommonInput } = useContext(CommonContext)
  const [showCountryModal, setShowCountryModal] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [selectedCountryFlag, setSelectedCountryFlag] = useState<string>('Country');
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const { dashboardLists, loadingDashBoardList } = useSelector(
    (state: RootState) => state.DashBoardList,
  );
  const { countryLists, loadingCountryList } = useSelector(
    (state: RootState) => state.CountryList,
  );
  const { currencyLists } = useSelector(
    (state: RootState) => state.CurrencyList,
  );

  useEffect(() => {
    if (selectedCountry) {
      setCommonInput({ ...commonInput, common_country_id: selectedCountry });
    }
  }, [selectedCountry]);

  useEffect(() => {
    let request = JSON.stringify({
      country: commonInput.common_country_id
    })
    dispatch(fetchDashBoardList({ requestBody: request }));
  }, [commonInput.common_country_id]);

  useEffect(() => {
    let request = JSON.stringify({
      country: commonInput.common_country_id
    })
    dispatch(fetchCurrencyList({ requestBody: request }));
  }, [commonInput.common_country_id]);

  useEffect(() => {
    dispatch(fetchCountryList({ requestBody: '' }));
  }, []);

  // function isValidate(): boolean {
  //   if(commonInput.common_country_id == null){
  //     Alert.alert('Please Select a Country')
  //     return false;
  //   }
  //   return true;
  //   }

  const handleCountrySelect = (item) => {
    setSelectedCountry(item.id);
    setSelectedCountryFlag(item.flag);
    setShowCountryModal(false);
  };



  return (
    <View flex backgroundColor="#FFFFFF" paddingB-60>
      <ImageBackground
      source={AppImages.BGIMAGE}
        // source={dashboardLists?.data.slider != null ? { uri: 'https://admin-jamal.prompttechdemohosting.com/' + dashboardLists.data.slider[1].file } : null}
        style={styles.topBackground}
        resizeMode='stretch'
      >
        <Text style={{ fontSize: 15, fontFamily: AppFonts.POPPINS_SEMIBOLD, color: 'white', width: '30%' }}>Red sea Market</Text>
      
      <HomeScreenSlider data={dashboardLists?.data.slider}/>

        <View center style={styles.rowContainer}>
          <SelectDropdown
            data={countryLists?.country || []}
            onSelect={(selectedItem, index) => {
              setSelectedCountry(selectedItem.id);
              setSelectedCountryFlag(selectedItem.flag);
            }}
            defaultButtonText={selectedCountryFlag ? 
              <Image source={{ uri: 'https://admin-jamal.prompttechdemohosting.com/' + selectedCountryFlag }}
                style={{ width: 25, height: 25, right: 10 }} />
            : 'Country'}

            buttonTextAfterSelection={(selectedItem, index) => {
              return <Image source={{ uri: 'https://admin-jamal.prompttechdemohosting.com/' + selectedItem.flag }}
                style={{ width: 25, height: 25, right: 10 }} />;
            }}
            rowTextForSelection={(item, index) => {
              return item.name + ', ' + item.code;
            }}
            buttonStyle={[styles.dropdown1BtnStyle,{elevation:10}]}
            buttonTextStyle={styles.dropdown1BtnTxtStyle}
            renderDropdownIcon={isOpened => {
              return <Image source={AppImages.ARROW_DOWN} />;
            }}
            dropdownIconPosition={'right'}
            dropdownStyle={styles.dropdown1DropdownStyle}
            rowStyle={styles.dropdown1RowStyle}
            rowTextStyle={styles.dropdown1RowTxtStyle}
          />

          <TouchableOpacity onPress={()=>navigation.navigate(RouteNames.SearchListScreen)}
          style={[styles.textFieldStyle,{elevation:10}]}>
          <TextField
            style={styles.text}
            paddingV-5
            paddingH-2
            placeholder={'What are you looking for ?'}
            leadingAccessory={<Image source={AppImages.SEARCH} style={{ width: 18, height: 18, right: 5 }} />}
            editable={false}/>
            </TouchableOpacity>

          <SelectDropdown
            data={lang}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem)
            }}
            defaultButtonText={'UK'}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem.name
            }}
            rowTextForSelection={(item, index) => {
              return item.name + ', ' + item.code;
            }}
            buttonStyle={[styles.dropdown1BtnStyle,{elevation:10}]}
            buttonTextStyle={styles.text}
            renderDropdownIcon={isOpened => {
              return <Image source={AppImages.ARROW_DOWN} />;
            }}
            dropdownIconPosition={'right'}
            dropdownStyle={styles.dropdown1DropdownStyle}
            rowStyle={styles.dropdown1RowStyle}
            rowTextStyle={styles.dropdown1RowTxtStyle}
          />
        </View>
      </ImageBackground>
      <CountrySelectionModal
        isVisible={showCountryModal}
        countryLists={countryLists?.country}
        onSelectCountry={handleCountrySelect}
        onRequestClose={() => setShowCountryModal(false)}
      />

      <View padding-20 marginT-10>
        <Text style={styles.categoryText}>Category</Text>
        <FlatList
          data={dashboardLists?.data.categories}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <View center key={index} style={{ flex: 1, margin: 10 }}>
                <TouchableOpacity onPress={() => {
                  if (item.name == 'Jobs') {
                    navigation.navigate(RouteNames.JobSearch, { Id: item.id, name: item.name })
                  }
                  else {
                    navigation.navigate(RouteNames.CategoryListScreen, { cat_Id: item.id, name: item.name, countryId: commonInput.common_country_id })
                  }
                }}>
                  <View center>
                  <Image
                    source={
                      item.image == null
                        ? AppImages.PLACEHOLDER
                        : { uri: 'https://admin-jamal.prompttechdemohosting.com/' + item.image }
                    }
                    style={{ width: 55, height: 35 }}
                    resizeMode="contain"
                  />
                  <Text style={styles.categoryTitle}>{item.name}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>

      {loadingDashBoardList ?
        <ActivityIndicator color={AppColors.blue} size={30} />
        :
        <FlatList
          data={dashboardLists?.data.categories_ads}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <View marginH-20>
                <View row centerV style={{ justifyContent: 'space-between' }}>
                  <Text style={styles.categoryText}>Popular in {item.name}</Text>
                  <TouchableOpacity onPress={() => {
                    navigation.navigate(RouteNames.CategoryListScreen, { cat_Id: item.id, name: item.name, countryId: commonInput.common_country_id })
                  }}>
                    <Image source={AppImages.ARROW_RIGHT} style={{ height: 10, width: 15 }} tintColor={'black'} />
                  </TouchableOpacity>
                </View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                  <View row marginV-20>
                    {item.ads.map((item, index) => (
                      <TouchableOpacity onPress={() => {
                        navigation.navigate(RouteNames.DetailsScreen, { adId: item.id, countryId: commonInput.common_country_id, edit: false })
                      }}>
                        <View backgroundColor='white' key={index} marginR-20 style={{ elevation: 4, width: 120, height:140 }}>
                          <Image source={item.ad_image == null ? AppImages.PLACEHOLDER : { uri: 'https://admin-jamal.prompttechdemohosting.com/' + item.ad_image?.image }}
                            resizeMode={'cover'} style={{ height: 70, width: '100%' }} />
                          <View margin-3>
                            <Text numberOfLines={1} ellipsizeMode='tail' style={styles.priceText}>{currencyLists == null ? 'USD ' + item.price.toFixed(2)
                              : (currencyLists?.currency.currency_code + ' ' + (currencyLists?.currency.value * item.price).toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','))}</Text>
                            <Text numberOfLines={1} ellipsizeMode='tail' style={styles.nameText}>{item.title}</Text>
                            <Text style={styles.cityText}>{item.area}</Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>

              </View>
            )
          }} />}
    </View>
  );
};


export default HomeScreen;
