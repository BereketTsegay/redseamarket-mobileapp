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
import CategoryListComponent from '../../components/CategoryListComponent';

type CategoryListScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'CategoryListScreen'
>;

type CategoryListScreenRouteProps = RouteProp<
  RootStackParams,
  'CategoryListScreen'
>;

interface Props {}

const CategoryListScreen: React.FC<Props> = ({route}) => {
  const navigation = useNavigation<CategoryListScreenNavigationProps>();
  const {cat_Id, name, countryId} = route.params;
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const {categoryLists, loadingCategoryLists} = useSelector(
    (state: RootState) => state.CategoryList,
  );

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
          

          <CategoryListComponent data={categoryLists} countryId={countryId} categoryName={name}/>
        )}
      </View>
    </View>
  );
};

export default CategoryListScreen;
