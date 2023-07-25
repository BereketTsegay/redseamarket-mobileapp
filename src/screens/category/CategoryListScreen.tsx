import React, { useState, useEffect } from 'react';
import { Image, Text, View } from 'react-native-ui-lib';
import { RootStackParams, RouteNames } from '../../navigation';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import styles from './styles';
import AppImages from '../../constants/AppImages';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoryList } from '../../api/category/CategoryListSlice';
import AppColors from '../../constants/AppColors';
import CarouselView from '../../components/CarouselView';
import FavoriteComponent from '../../components/FavoriteComponent';

type CategoryListScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'CategoryListScreen'
>;

type CategoryListScreenRouteProps = RouteProp<
  RootStackParams,
  'CategoryListScreen'
>;

interface Props {}

const CategoryListScreen: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation<CategoryListScreenNavigationProps>();
  const { cat_Id, countryId } = route.params;
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const { categoryLists, loadingCategoryLists } = useSelector((state: RootState) => state.CategoryList);
  const { currencyLists } = useSelector((state: RootState) => state.CurrencyList);

  useEffect(() => {
    list();
  }, []);

  const list = () => {
    let request = JSON.stringify({
      category: cat_Id,
      country: countryId,
    });
    dispatch(fetchCategoryList({ requestBody: request }));
  };

  const favDone = () => {
    list();
  };

  return (
    <View flex backgroundColor='#FFFFFF' paddingV-20>
      <View row centerV paddingH-20>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.circle}>
            <Image source={AppImages.ARROW_LEFT} style={{ width: 25, height: 25 }} />
          </View>
        </TouchableOpacity>
        <Text flex center style={[styles.text, { fontSize: 14 }]}>{categoryLists?.length} Results</Text>
      </View>

      <View row centerV style={styles.row}>
        <Text style={styles.text}>Search Alert</Text>
        <TouchableOpacity onPress={() => navigation.navigate(RouteNames.FilterScreen)}>
          <Text style={styles.text}>Filter</Text>
        </TouchableOpacity>
        <Text style={styles.text}>Sort</Text>
      </View>
      <View flex paddingH-20>
        {loadingCategoryLists ? (
          <ActivityIndicator color={AppColors.blue} size={20} />
        ) : (
          <FlatList
            data={categoryLists}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity onPress={() => {
                  navigation.navigate(RouteNames.DetailsScreen, { adId: item.id, countryId: countryId });
                }}>
                  <View style={styles.view} centerH>
                    <Image
                      source={(item.image == null || item.image.length == 0 || item.image[0].image == null) ? AppImages.PLACEHOLDER : { uri: 'https://admin-jamal.prompttechdemohosting.com/' + item.image[0].image }}
                      style={{ height: "100%", width: '40%', borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }}
                      resizeMode='contain'
                    />
                    <View padding-10 style={{ position: 'absolute', alignSelf: 'flex-start' }}>
                      <FavoriteComponent
                        id={item.id}
                        status={item.isFavourite}
                        done={favDone}
                      />
                    </View>
                    <View marginH-20 style={{width:'55%'}}>
                      <Text style={styles.priceText}>{currencyLists?.currency.currency_code} {(currencyLists?.currency.value * item.price).toFixed()}</Text>
                      <Text style={[styles.locationText, { fontSize: 14 }]} numberOfLines={1} ellipsizeMode='tail'>{item.title}</Text>
                      <Text style={styles.titleText} numberOfLines={1} ellipsizeMode='tail'>{item.description}</Text>
                      <Text style={[styles.locationText]}>{item.country_name}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        )}
      </View>
    </View>
  );
};

export default CategoryListScreen;
