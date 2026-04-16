import React, { useState, useEffect, useContext, useRef } from 'react';
import { Image, Text, View } from 'react-native-ui-lib';
import {
  Animated,
  FlatList,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams, RouteNames } from '../../navigation';

import AppImages from '../../constants/AppImages';
import AppColors from '../../constants/AppColors';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { fetchCountryList } from '../../api/country/CountryListSlice';
import { fetchCategoryList } from '../../api/category/CategoryListSlice';

import { CommonContext } from '../../api/commonContext';
import CountryLanguageHomeModal from '../../components/CountryLanguageHomeModal';
import { setLanguage } from '../../api/language/languageSlice';

import AsyncStorage from '@react-native-async-storage/async-storage';
import AppStrings from '../../constants/AppStrings';
import { showToast } from '../../constants/commonUtils';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';

import styles from './styles';

export type HomeScreenNavigationProps =
  NativeStackNavigationProp<RootStackParams, 'HomeScreen'>;

const dummyDashboardLists = { data: { categories_ads: [{ id: 1, name: 'Cars', arabic_name: 'سيارات', ads: [{ id: 101, title: 'Toyota Corolla 2020', title_arabic: 'تويوتا كورولا 2020', area: 'Dubai', ad_image: { image: 'https://images.unsplash.com/photo-1549924231-f129b911e442', }, }, { id: 102, title: 'Toyota Corolla 2020', title_arabic: 'تويوتا كورولا 2020', area: 'Dubai', ad_image: { image: 'https://images.unsplash.com/photo-1549924231-f129b911e442', }, }, { id: 103, title: 'Toyota Corolla 2020', title_arabic: 'تويوتا كورولا 2020', area: 'Dubai', ad_image: { image: 'https://images.unsplash.com/photo-1549924231-f129b911e442', }, },], }, { id: 2, name: 'Properties', arabic_name: 'عقارات', ads: [{ id: 201, title: 'Luxury Villa', title_arabic: 'فيلا فاخرة', area: 'Sharjah', ad_image: { image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994', }, },], }, { id: 3, name: 'Electronics', arabic_name: 'إلكترونيات', ads: [{ id: 301, title: 'iPhone 14 Pro', title_arabic: 'ايفون 14 برو', area: 'Ajman', ad_image: { image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9', }, },], },], }, };

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProps>();
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();

  const strings = useSelector(
    (state: RootState) =>
      state.language.resources[state.language.currentLanguage],
  );

  const { commonInput, setCommonInput } = useContext(CommonContext);

  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const [showCountryModal, setShowCountryModal] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  const { categoryLists } = useSelector(
    (state: RootState) => state.CategoryList,
  );

  const { countryLists } = useSelector(
    (state: RootState) => state.CountryList,
  );

  /* ================= INIT ================= */
  useEffect(() => {
    dispatch(fetchCountryList({ requestBody: '' }));
    dispatch(fetchCategoryList({ requestBody: '' }));
  }, []);

  useEffect(() => {
    const loadCountry = async () => {
      try {
        const stored = await AsyncStorage.getItem(AppStrings.COUNTRY);
        if (stored) {
          setSelectedCountry(stored);
        } else {
          setShowCountryModal(true);
        }
      } catch (e) {
        showToast(JSON.stringify(e));
      }
    };
    loadCountry();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      setCommonInput({
        ...commonInput,
        common_country_id: selectedCountry,
      });
      AsyncStorage.setItem(AppStrings.COUNTRY, String(selectedCountry));
    }
  }, [selectedCountry]);

  /* ================= HELPERS ================= */

  const handleLanguageChange = (lang: string) => {
    dispatch(setLanguage(lang));
    setCommonInput({ ...commonInput, language: lang });
  };

  const findFlag = (id: any) => {
    const c = countryLists?.data?.find(x => x.id == id);
    return c
      ? c.flag
      : null;
  };

  /* ================= UI ================= */

  const WishlistButton = () => {
    const scale = useRef(new Animated.Value(1)).current;
    const [liked, setLiked] = useState(false);

    const toggleLike = () => {
      setLiked(!liked);

      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.3,
          duration: 120,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          friction: 3,
          useNativeDriver: true,
        }),
      ]).start();
    };

    return (
      <TouchableOpacity activeOpacity={0.8} onPress={toggleLike}>
        <Animated.View style={{ transform: [{ scale }] }}>
          <Image
            source={liked ? AppImages.HEART_FILL : AppImages.HEART}
            style={{
              width: 18,
              height: 18,
              tintColor: liked ? '#FF3B30' : '#999',
            }}
          />
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <View flex backgroundColor={AppColors.white}>

      {/* 🔴 HEADER */}
      <View style={styles.headerContainer}>

        {/* 🔝 TOP ROW */}
        <View style={styles.headerTop}>

          <View style={styles.logoRow}>
            <View style={styles.logoCircle}>
              <Image source={AppImages.LOGO} style={{ width: 39, height: 39 }} />
            </View>
            <Text style={styles.appName}>{strings.appName}</Text>
          </View>

          <TouchableOpacity style={styles.bellWrapper} onPress={()=> navigation.navigate(RouteNames.NotificationScreen)}>
            <Image source={AppImages.BELL} style={styles.bellIcon} />
          </TouchableOpacity>
        </View>

        {/* 🌍 COUNTRY + LANGUAGE */}
        <View style={styles.selectorRow}>

          {/* COUNTRY */}
          <TouchableOpacity
            style={styles.selectorBox}
            onPress={() => setShowCountryModal(true)}
          >
            {selectedCountry ? (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  source={
                    findFlag(selectedCountry)
                      ? { uri: findFlag(selectedCountry) }
                      : AppImages.PLACEHOLDER
                  }
                  style={styles.flag}
                />
                <Text style={styles.selectorText}>
                  {countryLists?.data?.find(x => x.id == selectedCountry)?.name ||
                    strings.country}
                </Text>
              </View>
            ) : (
              <Text style={styles.selectorText}>{strings.country}</Text>
            )}
          </TouchableOpacity>

          {/* LANGUAGE */}
          <TouchableOpacity
            style={styles.selectorBox}
            onPress={() => setShowLanguageModal(true)}
          >
            <Text style={styles.selectorText}>{selectedLanguage}</Text>
          </TouchableOpacity>
        </View>

        {/* 🔍 SEARCH */}
        <TouchableOpacity
          style={styles.searchBar}
          activeOpacity={0.9}
          onPress={() =>
            navigation.navigate(RouteNames.SearchListScreen, { alert: false })
          }
        >
          <Image source={AppImages.SEARCH} style={styles.searchIcon} />
          <Text style={styles.searchPlaceholder}>
            {strings.looking}
          </Text>
        </TouchableOpacity>

      </View>

      {/* CONTENT */}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

        {/* CATEGORY */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{strings.category}</Text>
        </View>

        <FlatList
          data={categoryLists?.data}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, i) => i.toString()}
          contentContainerStyle={{ paddingHorizontal: 10 }}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.categoryCard}>
              <Image
                source={
                  item.image
                    ? { uri: item.image }
                    : AppImages.PLACEHOLDER
                }
                style={styles.categoryIcon}
              />
              <Text style={styles.categoryText}>
                {commonInput.language === 'ar'
                  ? item.arabic_name
                  : item.name}
              </Text>
            </TouchableOpacity>
          )}
        />

        {/* BANNER */}
        <View style={styles.bannerCard}>
          <ImageBackground
            source={AppImages.BGIMAGE}
            style={styles.bannerImage}
            imageStyle={{ borderRadius: 20 }}
          >
            <View style={styles.bannerOverlay} />
            <Text style={styles.bannerTitle}>
              {strings.defaultText}
            </Text>
          </ImageBackground>
        </View>

        {/* PRODUCTS */}
        {/* 🔥 CATEGORY BASED ADS */}
        <FlatList
          data={dummyDashboardLists?.data?.categories_ads}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            return (
              <View style={{ marginBottom: 10 }}>

                {/* 🔹 HEADER */}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginHorizontal: 16,
                    marginBottom: 10,
                  }}>

                  <Text style={styles.sectionTitle}>
                    {strings.popular}{' '}
                    {commonInput.language === 'ar'
                      ? item.arabic_name
                      : item.name}
                  </Text>

                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate(RouteNames.CategoryListScreen, {
                        cat_Id: item.id,
                        name: item.name,
                        countryId: commonInput.common_country_id,
                      })
                    }>
                    {/* <Image
              source={AppImages.ARROW_RIGHT}
              style={{ width: 16, height: 16 }}
              tintColor={'#000'}
            /> */}
                    <Text style={{ color: AppColors.blue }}>
                      View All
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* 🔹 ADS LIST */}
                <FlatList
                  data={item.ads}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(ad, i) => i.toString()}
                  contentContainerStyle={{ paddingLeft: 16 }}
                  renderItem={({ item: ad }) => {
                    const title =
                      commonInput.language === 'ar'
                        ? ad.title_arabic || ad.title
                        : ad.title;

                    return (
                      <TouchableOpacity
                        activeOpacity={0.9}
                        style={styles.cardWrapper}
                        onPress={() =>
                          navigation.navigate(RouteNames.DetailsScreen, {
                            adId: ad.id,
                            countryId: commonInput.common_country_id,
                            edit: false,
                          })
                        }>

                        <View style={styles.card}>

                          {/* 🔥 IMAGE */}
                          <View>
                            <Image
                              source={
                                ad.ad_image
                                  ? { uri: ad.ad_image.image }
                                  : AppImages.PLACEHOLDER
                              }
                              style={styles.cardImage}
                            />

                            {/* ❤️ WISHLIST BUTTON */}
                            <View style={styles.wishlistIcon}>
                              <WishlistButton />
                            </View>
                          </View>

                          {/* 🔥 CONTENT */}
                          <View style={styles.cardContent}>

                            <Text numberOfLines={1} style={styles.priceText}>
                              {'USD 120,000'}
                            </Text>

                            <Text numberOfLines={1} style={styles.nameText}>
                              {title}
                            </Text>

                            <Text numberOfLines={1} style={styles.cityText}>
                              📍 {ad.area}
                            </Text>

                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            );
          }}
        />
      </ScrollView>

      {/* ================= MODALS ================= */}

      <CountryLanguageHomeModal
        isVisible={showCountryModal}
        data={countryLists?.data || []}
        onSelectItem={(item) => {
          setSelectedCountry(item.id);
          setShowCountryModal(false);
        }}
        required={true}
      />

      <CountryLanguageHomeModal
        isVisible={showLanguageModal}
        data={[
          { id: 1, name: 'English' },
          { id: 2, name: 'Arabic' },
        ]}
        onSelectItem={(item) => {
          setSelectedLanguage(item.name);
          handleLanguageChange(item.id === 1 ? 'en' : 'ar');
          setShowLanguageModal(false);
        }}
        onRequestClose={() => setShowLanguageModal(false)}
      />
    </View>
  );
};

export default HomeScreen;