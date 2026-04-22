import React, {useCallback, useContext, useEffect, useMemo, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Image, Incubator, Text, View} from 'react-native-ui-lib';
import {useSelector} from 'react-redux';

import {RootState} from '../../../store';
import {apiClient} from '../../api/apiClient';
import {CommonContext} from '../../api/commonContext';
import CategoryListComponent from '../../components/CategoryListComponent';
import AppColors from '../../constants/AppColors';
import AppFonts from '../../constants/AppFonts';
import AppImages from '../../constants/AppImages';
import {RootStackParams} from '../../navigation';
import styles from './styles';

const {TextField} = Incubator;

export type SearchListScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'SearchListScreen'
>;

export type SearchListScreenRouteProps = RouteProp<
  RootStackParams,
  'SearchListScreen'
>;

type SearchCategory = {
  id: string | number;
  name: string;
  arabic_name?: string;
};

type SearchAlertItem = {
  search_key: string;
  ads_count: number;
};

type SearchAdItem = {
  category_id?: string | number;
  main_category_id?: string | number;
  category?: {
    id?: string | number;
    name?: string;
  };
};

const SearchListScreen: React.FC<{route: SearchListScreenRouteProps}> = ({
  route,
}) => {
  const textFieldRef = useRef<any>(null);
  const navigation = useNavigation<SearchListScreenNavigationProps>();
  const {alert, categoryId, categoryName} = route.params;
  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage,
  );
  const strings = useSelector(
    (state: RootState) => state.language.resources[currentLanguage],
  );
  const {commonInput} = useContext(CommonContext);

  const [searchKey, setSearchKey] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [searchData, setSearchData] = useState<any[]>([]);
  const [alertData, setAlertData] = useState<SearchAlertItem[]>([]);
  const [categories, setCategories] = useState<SearchCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<SearchCategory | null>(
    categoryId ? {id: categoryId, name: categoryName || ''} : null,
  );
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);

  const selectedCategoryLabel = useMemo(() => {
    if (!selectedCategory) {
      return null;
    }

    return commonInput.language === 'ar'
      ? selectedCategory.arabic_name || selectedCategory.name
      : selectedCategory.name;
  }, [commonInput.language, selectedCategory]);

  const filterResultsByCategory = useCallback(
    (ads: SearchAdItem[], category: SearchCategory | null) => {
      if (!category?.id) {
        return ads;
      }

      const selectedId = String(category.id);
      const selectedName = (category.name || '').trim().toLowerCase();

      return ads.filter(item => {
        const adCategoryId = item.category?.id ?? item.category_id;
        const mainCategoryId = item.main_category_id;
        const adCategoryName = (item.category?.name || '').trim().toLowerCase();

        return (
          String(adCategoryId) === selectedId ||
          String(mainCategoryId) === selectedId ||
          (!!selectedName && adCategoryName === selectedName)
        );
      });
    },
    [],
  );

  const fetchCategories = useCallback(async () => {
    setLoadingCategories(true);
    try {
      const response = await apiClient('category', 'POST', '');
      const categoryList = Array.isArray(response?.data?.data)
        ? response.data.data
        : [];

      setCategories(categoryList);

      if (categoryId) {
        const matchedCategory = categoryList.find(
          (item: SearchCategory) => String(item.id) === String(categoryId),
        );

        if (matchedCategory) {
          setSelectedCategory(matchedCategory);
        }
      }
    } finally {
      setLoadingCategories(false);
    }
  }, [categoryId]);

  const list = useCallback(
    async (searchValue: string, category: SearchCategory | null = selectedCategory) => {
      Keyboard.dismiss();
      textFieldRef.current?.blur?.();

      if (alert) {
        setModalVisible(false);
      }

      setLoadingSearch(true);
      try {
        const requestBody = JSON.stringify({
          search_key: searchValue,
          country: commonInput.common_country_id,
          category: category?.id || '',
        });

        const response = await apiClient(
          'app/customer/search/ads',
          'POST',
          requestBody,
        );
        const ads = Array.isArray(response?.data?.ads) ? response.data.ads : [];
        setSearchData(filterResultsByCategory(ads, category));
      } finally {
        setLoadingSearch(false);
      }
    },
    [alert, commonInput.common_country_id, filterResultsByCategory, selectedCategory],
  );

  const alertList = useCallback(async () => {
    const request = JSON.stringify({
      country: commonInput.common_country_id,
    });
    const response = await apiClient('app/customer/search/alert', 'POST', request);
    setAlertData(Array.isArray(response?.data?.data) ? response.data.data : []);
    setModalVisible(true);
  }, [commonInput.common_country_id]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    list('', selectedCategory);
  }, [list, selectedCategory]);

  useEffect(() => {
    if (alert) {
      alertList();
    }
  }, [alert, alertList]);

  const handleFocus = () => {
    if (alert) {
      alertList();
    }
  };

  const handleCategoryPress = (category: SearchCategory) => {
    const nextCategory =
      selectedCategory && String(selectedCategory.id) === String(category.id)
        ? null
        : category;

    setSelectedCategory(nextCategory);
  };

  return (
    <View flex backgroundColor="#F4F7FB">
      <View style={localStyles.headerBlock}>
        <TextField
          ref={textFieldRef}
          fieldStyle={styles.fieldStyle}
          style={styles.fieldText}
          padding-10
          placeholder={strings.search}
          value={searchKey}
          onChangeText={text => setSearchKey(text)}
          onFocus={handleFocus}
          onSubmitEditing={() => list(searchKey)}
          trailingAccessory={
            <TouchableOpacity onPress={() => list(searchKey)}>
              <Image
                source={AppImages.SEARCH}
                style={localStyles.searchIcon}
              />
            </TouchableOpacity>
          }
          leadingAccessory={
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <View style={styles.circle}>
                <Image
                  source={AppImages.ARROW_LEFT}
                  style={localStyles.backIcon}
                />
              </View>
            </TouchableOpacity>
          }
        />

        <View style={localStyles.categorySection}>
          <View row centerV style={localStyles.categoryTitleRow}>
            <Text style={localStyles.categoryTitle}>{strings.category}</Text>
            {selectedCategoryLabel ? (
              <Text style={localStyles.categoryHint}>{selectedCategoryLabel}</Text>
            ) : (
              <Text style={localStyles.categoryHint}>All</Text>
            )}
          </View>

          {loadingCategories ? (
            <ActivityIndicator color={AppColors.darkBlue} size="small" />
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={localStyles.categoryScroll}
            >
              {categories.map(item => {
                const isSelected =
                  selectedCategory &&
                  String(selectedCategory.id) === String(item.id);
                const label =
                  commonInput.language === 'ar'
                    ? item.arabic_name || item.name
                    : item.name;

                return (
                  <TouchableOpacity
                    key={String(item.id)}
                    activeOpacity={0.88}
                    onPress={() => handleCategoryPress(item)}
                    style={[
                      localStyles.categoryChip,
                      isSelected && localStyles.categoryChipActive,
                    ]}
                  >
                    <Text
                      style={[
                        localStyles.categoryChipText,
                        isSelected && localStyles.categoryChipTextActive,
                      ]}
                    >
                      {label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          )}
        </View>

        {modalVisible && alertData.length > 0 && (
          <View style={localStyles.alertCard}>
            {alertData.map((item, index) => (
              <TouchableOpacity
                key={`${item.search_key}-${index}`}
                onPress={() => {
                  setSearchKey(item.search_key);
                  list(item.search_key);
                  setModalVisible(false);
                }}
              >
                <View row style={localStyles.alertRow} centerV>
                  <Image
                    source={AppImages.HISTORY}
                    tintColor="grey"
                    style={localStyles.historyIcon}
                  />
                  <View flex left marginL-10>
                    <Text>{item.search_key}</Text>
                    <Text style={styles.countText}>{item.ads_count} alert</Text>
                  </View>
                  <Image
                    source={AppImages.UP_ARROW}
                    tintColor="grey"
                    style={localStyles.upArrowIcon}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <View flex style={localStyles.resultsSection}>
        <View row centerV style={localStyles.resultsHeader}>
          <Text style={localStyles.resultsTitle}>
            {searchData.length} {strings.results}
          </Text>
          {selectedCategoryLabel ? (
            <View style={localStyles.selectedBadge}>
              <Text style={localStyles.selectedBadgeText}>
                {selectedCategoryLabel}
              </Text>
            </View>
          ) : null}
        </View>

        {loadingSearch ? (
          <View flex center>
            <ActivityIndicator color={AppColors.blue} size="small" />
          </View>
        ) : searchData.length === 0 ? (
          <View flex center style={localStyles.emptyState}>
            <Text style={localStyles.emptyTitle}>{strings.searchNothing}</Text>
            <Text style={localStyles.emptySubTitle}>
              {selectedCategoryLabel
                ? `${strings.search} in ${selectedCategoryLabel}`
                : strings.looking}
            </Text>
          </View>
        ) : (
          <CategoryListComponent
            data={searchData}
            countryId={commonInput.common_country_id}
            close={() => {
              setModalVisible(false);
            }}
          />
        )}
      </View>
    </View>
  );
};

export default SearchListScreen;

const localStyles = StyleSheet.create({
  headerBlock: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: '#F4F7FB',
  },
  searchIcon: {
    width: 18,
    height: 18,
    right: 5,
  },
  backIcon: {
    width: 25,
    height: 25,
  },
  categorySection: {
    marginTop: 18,
  },
  categoryTitleRow: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  categoryTitle: {
    fontSize: 15,
    color: '#1A2238',
    fontFamily: AppFonts.POPPINS_SEMIBOLD,
  },
  categoryHint: {
    fontSize: 12,
    color: AppColors.darkBlue,
    fontFamily: AppFonts.POPPINS_MEDIUM,
  },
  categoryScroll: {
    paddingRight: 20,
  },
  categoryChip: {
    marginRight: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D6E2F5',
  },
  categoryChipActive: {
    backgroundColor: AppColors.darkBlue,
    borderColor: AppColors.darkBlue,
  },
  categoryChipText: {
    fontSize: 12,
    color: '#36507A',
    fontFamily: AppFonts.POPPINS_MEDIUM,
  },
  categoryChipTextActive: {
    color: '#FFFFFF',
  },
  alertCard: {
    marginTop: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    shadowColor: '#16355F',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: {width: 0, height: 6},
    elevation: 8,
  },
  alertRow: {
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  historyIcon: {
    width: 22,
    height: 22,
  },
  upArrowIcon: {
    width: 22,
    height: 22,
  },
  resultsSection: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 18,
  },
  resultsHeader: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  resultsTitle: {
    fontSize: 14,
    color: '#1A2238',
    fontFamily: AppFonts.POPPINS_SEMIBOLD,
  },
  selectedBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(0, 82, 190, 0.10)',
  },
  selectedBadgeText: {
    color: AppColors.darkBlue,
    fontSize: 11,
    fontFamily: AppFonts.POPPINS_MEDIUM,
  },
  emptyState: {
    paddingBottom: 80,
  },
  emptyTitle: {
    fontSize: 16,
    color: '#1A2238',
    fontFamily: AppFonts.POPPINS_SEMIBOLD,
  },
  emptySubTitle: {
    marginTop: 8,
    fontSize: 12,
    color: '#667085',
    fontFamily: AppFonts.POPPINS_REGULAR,
  },
});
