import React, {useState, useEffect} from 'react';
import {Image, Text, View} from 'react-native-ui-lib';
import {RootStackParams, RouteNames} from '../../navigation';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {ActivityIndicator, FlatList, TouchableOpacity} from 'react-native';
import styles from './styles';
import AppImages from '../../constants/AppImages';
import {AnyAction, ThunkDispatch} from '@reduxjs/toolkit';
import {RootState} from '../../../store';
import {useDispatch, useSelector} from 'react-redux';
import {fetchCategoryList} from '../../api/category/CategoryListSlice';
import AppColors from '../../constants/AppColors';
import CarouselView from '../../components/CarouselView';
import FavoriteComponent from '../../components/FavoriteComponent';

type HiringListScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'HiringListScreen'
>;

type HiringListScreenRouteProps = RouteProp<
  RootStackParams,
  'HiringListScreen'
>;

interface Props {}

const HiringListScreen: React.FC<Props> = ({route}) => {
  const navigation = useNavigation<HiringListScreenNavigationProps>();
  const {cat_Id, name, countryId} = route.params;
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const {categoryLists, loadingCategoryLists} = useSelector(
    (state: RootState) => state.CategoryList,
  );
  const {currencyLists} = useSelector((state: RootState) => state.CurrencyList);

  useEffect(() => {
    list();
  }, []);

  const list = () => {
    let request = JSON.stringify({
      category: cat_Id,
      country: countryId,
    });
    dispatch(fetchCategoryList({requestBody: request}));
  };

  const favDone = () => {
    list();
  };

  return (
    <View flex backgroundColor="#FFFFFF" paddingV-20>
      <View row centerV paddingH-20>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.circle}>
            <Image
              source={AppImages.ARROW_LEFT}
              style={{width: 25, height: 25}}
            />
          </View>
        </TouchableOpacity>
        <Text flex center style={[styles.text, {fontSize: 14}]}>
          {categoryLists?.length} Results
        </Text>
      </View>

      <View row centerV style={styles.row}>
        <Text style={styles.text}>Search Alert</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate(RouteNames.FilterScreen)}>
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
            renderItem={({item}) => {
              return (
                <>
                     <TouchableOpacity
                     onPress={() => {
                       navigation.navigate(RouteNames.DetailsScreen, {
                         adId: item.id,
                         countryId: countryId,
                       });
                     }}>
                    <View style={styles.view1}>
                      <View style={styles.rowView}>
                        <View>
                        {item.featured_flag == 1 &&
                        <View center style={styles.featuredView}>
                          <Text style={styles.featuredText}>Featured</Text>
                        </View>}
                        </View>
                        <FavoriteComponent
                          id={item.id}
                          status={item.isFavourite}
                          done={favDone}
                        />
                      </View>

                      <View style={styles.rowView}>
                        <Image
                          source={
                            item.image == null ||
                            item.image.length == 0 ||
                            item.image[0].image == null
                              ? AppImages.PLACEHOLDER
                              : {
                                  uri:
                                    'https://admin-jamal.prompttechdemohosting.com/' +
                                    item.image[0].image,
                                }
                          }
                          style={{width: 70, height: 70, borderRadius:40}}
                        />
                        <View flex left marginH-20>
                          {/* <Text style={styles.jobText}>TCS Solutions</Text> */}
                          <Text style={[styles.jobText, {color: 'black'}]}>
                            {item.title}
                          </Text>
                          <Text style={styles.jobText1}>
                            Salary - {currencyLists?.currency.currency_code}{' '}
                            {(currencyLists?.currency.value * item.price)
                              .toFixed()
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          </Text>
                        </View>
                      </View>

                      <View marginV-10>
                        <Text style={styles.text}>Description</Text>
                        <Text numberOfLines={1} ellipsizeMode='tail' style={[styles.text, {opacity: 0.75}]}>
                          {item.description}
                        </Text>
                      </View>

                      <View marginB-10 style={styles.rowView}>
                        <View row center>
                          <Image source={AppImages.LOCATION} style={{height:15,width:15}}/>
                        <Text>{item.state_name + ',' + item.country_name}</Text>
                        </View>
                        <Text>{item.created_on}</Text>
                      </View>
                    </View>
                    </TouchableOpacity>
                 
                </>
              );
            }}
          />
        )}
      </View>
    </View>
  );
};

export default HiringListScreen;
