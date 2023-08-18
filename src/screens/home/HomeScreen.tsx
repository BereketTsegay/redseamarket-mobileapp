import React, {useState, useEffect, useContext} from 'react';
import {Image, Incubator, Text, View} from 'react-native-ui-lib';
import {RootStackParams, RouteNames} from '../../navigation';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import AppImages from '../../constants/AppImages';
import SelectDropdown from 'react-native-select-dropdown';
import styles from './styles';
import AppColors from '../../constants/AppColors';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {AnyAction, ThunkDispatch} from '@reduxjs/toolkit';
import {RootState} from '../../../store';
import {useDispatch, useSelector} from 'react-redux';
import {fetchDashBoardList} from '../../api/home/DashBoardListSlice';
import AppFonts from '../../constants/AppFonts';
import {fetchCountryList} from '../../api/country/CountryListSlice';
import {fetchCurrencyList} from '../../api/currency/CurrencyListSlice';
import CountrySelectionModal from '../../components/CountrySelectionModal';
import {CommonContext} from '../../api/commonContext';
import HomeScreenSlider from '../../components/HomeScreenSlider';
import CountryLanguageHomeModal from '../../components/CountryLanguageHomeModal';
import {setLanguage} from '../../api/language/languageSlice';
const {TextField} = Incubator;
export type HomeScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'HomeScreen'
>;

export type HomeScreenRouteProps = RouteProp<RootStackParams, 'HomeScreen'>;

interface Props {}

const HomeScreen: React.FC<Props> = () => {
  const navigation = useNavigation<HomeScreenNavigationProps>();
  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage,
  );
  const strings = useSelector(
    (state: RootState) => state.language.resources[currentLanguage],
  );
  const [lang, setLang] = useState([
    {code: 'English', name: 'UK', id: 1},
    {code: 'Arabic', name: 'UAE', id: 2},
  ]);
  const {commonInput, setCommonInput} = useContext(CommonContext);
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [selectedCountryFlag, setSelectedCountryFlag] =
    useState<string>('Country');
  const [showCountryLanguageModal, setShowCountryLanguageModal] =
    useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<any>('UK');
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const {dashboardLists, loadingDashBoardList} = useSelector(
    (state: RootState) => state.DashBoardList,
  );
  const {countryLists, loadingCountryList} = useSelector(
    (state: RootState) => state.CountryList,
  );
  const {currencyLists} = useSelector((state: RootState) => state.CurrencyList);

  useEffect(() => {
    if (selectedCountry) {
      setCommonInput({...commonInput, common_country_id: selectedCountry});
    }
  }, [selectedCountry]);

  useEffect(() => {
    let request = JSON.stringify({
      country: commonInput.common_country_id,
    });
    dispatch(fetchDashBoardList({requestBody: request}));
  }, [commonInput.common_country_id]);

  useEffect(() => {
    let request = JSON.stringify({
      country: commonInput.common_country_id,
    });
    dispatch(fetchCurrencyList({requestBody: request}));
  }, [commonInput.common_country_id]);

  useEffect(() => {
    dispatch(fetchCountryList({requestBody: ''}));
  }, []);

  // function isValidate(): boolean {
  //   if(commonInput.common_country_id == null){
  //     Alert.alert('Please Select a Country')
  //     return false;
  //   }
  //   return true;
  //   }

  function handleLanguageChange(language: Language) {
    dispatch(setLanguage(language));
    setCommonInput({...commonInput, language: language});
  }

  return (
    <View flex backgroundColor="#FFFFFF" paddingB-60>
      <ImageBackground
        source={AppImages.BGIMAGE}
        // source={dashboardLists?.data.slider != null ? { uri: 'https://admin-jamal.prompttechdemohosting.com/' + dashboardLists.data.slider[1].file } : null}
        style={styles.topBackground}
        resizeMode="stretch">
        <Text
          style={{
            fontSize: 15,
            fontFamily: AppFonts.POPPINS_SEMIBOLD,
            color: 'white',
            width: '30%',
          }}>
          {strings.appName}
        </Text>

        <HomeScreenSlider data={dashboardLists?.data.slider} />

        <View center style={styles.rowContainer}>
          <TouchableOpacity onPress={() => setShowCountryLanguageModal(true)}>
            <View row style={styles.smallDropdown}>
              {selectedCountry ? (
                <Image
                  source={{
                    uri:
                      'https://admin-jamal.prompttechdemohosting.com/' +
                      selectedCountryFlag,
                  }}
                  style={{width: 25, height: 25}}
                />
              ) : (
                <Text style={styles.text}>{strings.country}</Text>
              )}
              <Image source={AppImages.ARROW_DOWN} style={{left: 10}} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate(RouteNames.SearchListScreen)}
            style={[styles.textFieldStyle, {elevation: 10}]}>
            <Image
              source={AppImages.SEARCH}
              style={{width: 18, height: 18, right: 5}}
            />
            <Text style={styles.text}>{strings.looking}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setShowLanguageModal(true)}>
            <View row style={styles.smallDropdown}>
              <Text style={styles.text}>
                {selectedLanguage ? selectedLanguage : strings.lang}
              </Text>
              <Image source={AppImages.ARROW_DOWN} style={{left: 0}} />
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>

      <View padding-20 marginT-10>
        <Text style={styles.categoryText}>{strings.category}</Text>
        <FlatList
          data={dashboardLists?.data.categories}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <View center key={index} style={{flex: 1, margin: 10}}>
                <TouchableOpacity
                  onPress={() => {
                    if (item.name == 'Jobs') {
                      navigation.navigate(RouteNames.JobSearch, {
                        Id: item.id,
                        name: item.name,
                      });
                    } else {
                      navigation.navigate(RouteNames.CategoryListScreen, {
                        cat_Id: item.id,
                        name: item.name,
                        countryId: commonInput.common_country_id,
                      });
                    }
                  }}>
                  <View center>
                    <Image
                      source={
                        item.image == null
                          ? AppImages.PLACEHOLDER
                          : {
                              uri:
                                'https://admin-jamal.prompttechdemohosting.com/' +
                                item.image,
                            }
                      }
                      style={{width: 55, height: 35}}
                      resizeMode="contain"
                    />
                    <Text style={styles.categoryTitle}>{commonInput.language == 'ar' ? item.arabic_name : item.name}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>

      {loadingDashBoardList ? (
        <ActivityIndicator color={AppColors.blue} size={30} />
      ) : (
        <FlatList
          data={dashboardLists?.data.categories_ads}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <View marginH-20>
                <View row centerV style={{justifyContent: 'space-between'}}>
                  <Text style={styles.categoryText}>
                    {strings.popular} {commonInput.language == 'ar' ? item.arabic_name : item.name}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate(RouteNames.CategoryListScreen, {
                        cat_Id: item.id,
                        name: item.name,
                        countryId: commonInput.common_country_id,
                      });
                    }}>
                    <Image
                      source={AppImages.ARROW_RIGHT}
                      style={{height: 10, width: 15}}
                      tintColor={'black'}
                    />
                  </TouchableOpacity>
                </View>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}>
                  <View row marginV-20>
                    {item.ads.map((item, index) => (
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate(RouteNames.DetailsScreen, {
                            adId: item.id,
                            countryId: commonInput.common_country_id,
                            edit: false,
                          });
                        }}>
                        <View
                          backgroundColor="white"
                          key={index}
                          marginR-20
                          style={{elevation: 4, width: 125, height: 145}}>
                          <Image
                            source={
                              item.ad_image == null
                                ? AppImages.PLACEHOLDER
                                : {
                                    uri:
                                      'https://admin-jamal.prompttechdemohosting.com/' +
                                      item.ad_image?.image,
                                  }
                            }
                            resizeMode={'cover'}
                            style={{height: 70, width: '100%'}}
                          />
                          <View margin-3>
                            <Text
                              numberOfLines={1}
                              ellipsizeMode="tail"
                              style={styles.priceText}>
                              {currencyLists == null
                                ? 'USD ' + item.price.toFixed(2)
                                : currencyLists?.currency.currency_code +
                                  ' ' +
                                  (currencyLists?.currency.value * item.price)
                                    .toFixed()
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            </Text>
                            <Text
                              numberOfLines={1}
                              ellipsizeMode="tail"
                              style={styles.nameText}>
                               {commonInput.language == 'ar' ? item.title_arabic ? item.title_arabic : item.title : item.title}
                            </Text>
                            <Text style={styles.cityText}>{item.area}</Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              </View>
            );
          }}
        />
      )}

      <CountryLanguageHomeModal
        isVisible={showCountryLanguageModal}
        data={countryLists?.country || []}
        onSelectItem={item => {
          setSelectedCountry(item.id);
          setSelectedCountryFlag(item.flag);
          setShowCountryLanguageModal(false);
        }}
        onRequestClose={() => setShowCountryLanguageModal(false)}
        required={true}
      />

      <CountryLanguageHomeModal
        isVisible={showLanguageModal}
        data={lang}
        onSelectItem={item => {
          setSelectedLanguage(item.name);
          handleLanguageChange(item.id == 1 ? 'en' : 'ar');
          setShowLanguageModal(false);
        }}
        onRequestClose={() => setShowLanguageModal(false)}
      />
    </View>
  );
};

export default HomeScreen;
