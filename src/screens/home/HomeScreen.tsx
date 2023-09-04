import React, {useState, useEffect, useContext, useRef} from 'react';
import {Image, Incubator, Text, View} from 'react-native-ui-lib';
import {RootStackParams, RouteNames} from '../../navigation';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import AppImages from '../../constants/AppImages';
import styles from './styles';
import AppColors from '../../constants/AppColors';
import {
  ActivityIndicator,
  Alert,
  Animated,
  FlatList,
  ImageBackground,
  LayoutAnimation,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import {AnyAction, ThunkDispatch} from '@reduxjs/toolkit';
import {RootState} from '../../../store';
import {useDispatch, useSelector} from 'react-redux';
import {fetchDashBoardList} from '../../api/home/DashBoardListSlice';
import AppFonts from '../../constants/AppFonts';
import {fetchCountryList} from '../../api/country/CountryListSlice';
import {fetchCurrencyList} from '../../api/currency/CurrencyListSlice';
import {CommonContext} from '../../api/commonContext';
import HomeScreenSlider from '../../components/HomeScreenSlider';
import CountryLanguageHomeModal from '../../components/CountryLanguageHomeModal';
import {setLanguage} from '../../api/language/languageSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppStrings from '../../constants/AppStrings';
const {TextField} = Incubator;
export type HomeScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'HomeScreen'
>;

export type HomeScreenRouteProps = RouteProp<RootStackParams, 'HomeScreen'>;

interface Props {}

const HomeScreen: React.FC<Props> = React.memo(() => {
  const navigation = useNavigation<HomeScreenNavigationProps>();
  const scrollYRef = useRef(0);
  const [visibleBanner, setVisibleBanner] = useState(1);
  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage,
  );
  const strings = useSelector(
    (state: RootState) => state.language.resources[currentLanguage],
  );
  const [lang, setLang] = useState([
    {code: 'English', name: 'English', id: 1},
    {code: 'Arabic', name: 'Arabic', id: 2},
  ]);
  const {commonInput, setCommonInput} = useContext(CommonContext);
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [showCountryLanguageModal, setShowCountryLanguageModal] =
    useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<any>('English');
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
      AsyncStorage.setItem(AppStrings.COUNTRY, String(selectedCountry));
    }
  }, [selectedCountry]);

  useEffect(() => {
    const fetchCountryFromStorage = async () => {
      try {
        const storedCountry = await AsyncStorage.getItem(AppStrings.COUNTRY);
        if (storedCountry !== null) {
          setSelectedCountry(storedCountry);
        } else {
          setShowCountryLanguageModal(true);
        }
      } catch (error) {
        ToastAndroid.show(JSON.stringify(error), ToastAndroid.SHORT);
      }
    };
  
    fetchCountryFromStorage();
  }, []);

  useEffect(() => {
    let request = JSON.stringify({
      country: selectedCountry,
    });
    dispatch(fetchDashBoardList({requestBody: request}));
  }, [selectedCountry]);

  useEffect(() => {
    let request = JSON.stringify({
      country: selectedCountry,
    });
    dispatch(fetchCurrencyList({requestBody: request}));
  }, [selectedCountry]);

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

  const findFlagUrlById = id => {
    const country = countryLists?.country?.find(country => country.id == id);
    return country
      ? 'https://admin-jamal.prompttechdemohosting.com/' + country.flag
      : null;
  };

  const setCountryId = async item => {
    setSelectedCountry(item.id);
    AsyncStorage.setItem(AppStrings.COUNTRY, String(item.id));
    setShowCountryLanguageModal(false);
  };

  const handleScroll = (event: {nativeEvent: {contentOffset: {y: any}}}) => {
    const {y} = event.nativeEvent.contentOffset;
    const prevScrollY = scrollYRef.current;
    const threshold = 105;

    if (y > prevScrollY && visibleBanner) {
      // Scrolling down
      setVisibleBanner(0);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    } else if (y < prevScrollY && !visibleBanner && y < threshold) {
      // Scrolling up and scrolled less than 100 units
      setVisibleBanner(1);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    }

    scrollYRef.current = y;
  };

  return (
    <View flex backgroundColor={AppColors.white} paddingB-60>
      {visibleBanner ? (
        <ImageBackground
          source={
            dashboardLists?.data.slider
              ? {
                  uri:
                    'https://admin-jamal.prompttechdemohosting.com/' +
                    dashboardLists.data.slider.file,
                }
              : AppImages.BG
          }
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
          <View flex center>
            <Text
              style={{
                fontSize: 18,
                fontFamily: AppFonts.POPPINS_BOLD,
                color: 'white',
              }}>
              {dashboardLists?.data.slider
                ? dashboardLists?.data.slider.title
                : strings.defaultText}
            </Text>
          </View>
        </ImageBackground>
      ) : (
        <View marginV-20 />
      )}

      <View center style={styles.rowContainer}>
        <TouchableOpacity onPress={() => setShowCountryLanguageModal(true)}>
          <View row style={styles.smallDropdown}>
            {selectedCountry ? (
              <Image
                source={
                  findFlagUrlById(selectedCountry) == null
                    ? AppImages.PLACEHOLDER
                    : {uri: findFlagUrlById(selectedCountry)}
                }
                style={{width: 25, height: 25}}
              />
            ) : (
              <Text style={styles.text}>{strings.country}</Text>
            )}
            <Image source={AppImages.ARROW_DOWN} style={{left: 10}} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate(RouteNames.SearchListScreen, {alert: false})
          }
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

      <ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
        <View paddingB-20>
          <Text style={[styles.categoryText, {marginHorizontal: 10}]}>
            {strings.category}
          </Text>
          <FlatList
            data={dashboardLists?.data.categories}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => {
              return (
                <View
                  center
                  paddingB-10
                  key={index}
                  style={{flex: 1, margin: 10}}>
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
                      <Text style={styles.categoryTitle}>
                        {commonInput.language == 'ar'
                          ? item.arabic_name
                          : item.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}
          />

          {loadingDashBoardList ? (
            <ActivityIndicator color={AppColors.blue} size={30} />
          ) : (
            <FlatList
              data={dashboardLists?.data.categories_ads}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => {
                return (
                  <View>
                    <View
                      row
                      centerV
                      marginH-10
                      style={{justifyContent: 'space-between'}}>
                      <Text style={styles.categoryText}>
                        {strings.popular}{' '}
                        {commonInput.language == 'ar'
                          ? item.arabic_name
                          : item.name}
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
                            }}
                            key={index}>
                            <View
                              backgroundColor="white"
                              key={index}
                              marginH-10
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
                                      (
                                        currencyLists?.currency.value *
                                        item.price
                                      )
                                        .toFixed()
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                </Text>
                                <Text
                                  numberOfLines={1}
                                  ellipsizeMode="tail"
                                  style={styles.nameText}>
                                  {commonInput.language == 'ar'
                                    ? item.title_arabic
                                      ? item.title_arabic
                                      : item.title
                                    : item.title}
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
        </View>
      </ScrollView>

      <CountryLanguageHomeModal
        isVisible={showCountryLanguageModal}
        data={countryLists?.country || []}
        onSelectItem={item => {
          setCountryId(item);
        }}
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
});

export default HomeScreen;
