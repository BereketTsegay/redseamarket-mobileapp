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
import SortModal from '../../components/SortModal';
import FilterModal from '../../components/FilterModal';

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
  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage,
  );
  const strings = useSelector(
    (state: RootState) => state.language.resources[currentLanguage],
  );
  const {cat_Id, name, countryId} = route.params;
  const [sortOpen, setSortOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [initialValue, setValue] = useState('');
  const [FilterValue, setFilterValue] = useState([]);
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const {categoryLists, loadingCategoryLists} = useSelector(
    (state: RootState) => state.CategoryList,
  );

  useEffect(() => {
    list('','','','','','','');
  }, []);

  const list = (initialValue,state,city,area,subarea,priceFrom,priceTo) => {
    let request = JSON.stringify({
      category: cat_Id,
      country: countryId,
      sort: initialValue,
      state_id:state,
      city:city,
      area: area,
      subArea:subarea,
      priceFrom:priceFrom,
      priceTo:priceTo

    });
    // console.log(request)
    dispatch(fetchCategoryList({requestBody: request}));
  };

  const closeSheet = () => {
    setSortOpen(false);
  };
  const closeFilterSheet = () => {
    setFilterOpen(false);
  };

  const sortSet = value => {
    if (value == 1) {
      setValue('low-to-high');
      list('low-to-high','','','','','','')
    } else if (value == 2) {
      setValue('high-to-low');
      list('high-to-low','','','','','','')
    }
    setSortOpen(false);
    
  };

  const FilterSet = (state, city, area, subArea, fromPrice, toPrice) => {
    list('',state, city, area, subArea, fromPrice, toPrice)
    setFilterOpen(false)
  }

  return (
    <View
      flex
      backgroundColor={sortOpen || filterOpen ? 'rgba(0, 0, 0, 0.1)' : '#FFFFFF'}
      paddingV-20>
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
          {categoryLists?.ads.length} {strings.results}
        </Text>
      </View>

      <View row centerV style={styles.row}>
        <TouchableOpacity
          onPress={() => navigation.navigate(RouteNames.SearchListScreen,{alert:true})}>
          <View row center>
            <Image
              source={AppImages.SEARCH}
              style={{width: 15, height: 15, marginRight: 5}}
              tintColor={'black'}
            />
            <Text style={[styles.text]}>{strings.searchAlert}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setFilterOpen(!filterOpen)}>
          <View row center>
            <Image
              source={AppImages.FILTER}
              style={{width: 15, height: 15, marginRight: 5}}
            />
            <Text style={styles.text}>{strings.filter}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSortOpen(!sortOpen)}>
          <View row center>
            <Image
              source={AppImages.SORT}
              style={{width: 15, height: 15, marginRight: 5}}
            />
            <Text style={styles.text}>{strings.sort}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View flex paddingH-20>
        {loadingCategoryLists ? (
          <ActivityIndicator color={AppColors.blue} size={20} />
        ) : (
          categoryLists?.ads.length == 0 ?
          <View flex center>
          <Text style={styles.filterText}>{strings.listNothing}</Text>
          </View>
          :
          <CategoryListComponent
            data={categoryLists?.ads}
            countryId={countryId}
            categoryName={name}
            close={()=>{
             setFilterOpen(false)
             setSortOpen(false)
            }}
          />
        )}
      </View>

      {sortOpen && (
        <SortModal
          closeSheet={closeSheet}
          initialValue={
            initialValue == 'low-to-high'
              ? 1
              : initialValue == 'high-to-low'
              ? 2
              : 0
          }
          set={sortSet}
        />
      )}

{filterOpen && (
        <FilterModal
          closeSheet={closeFilterSheet}
          set={FilterSet}
        />
      )}
    </View>
  );
};

export default CategoryListScreen;
