import React, {useState, useEffect, useContext} from 'react';
import {Image, Text, View} from 'react-native-ui-lib';
import {RootStackParams, RouteNames} from '../../navigation';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import AppImages from '../../constants/AppImages';
import styles from './styles';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavList } from '../../api/favorites/FavListSlice';
import { ActivityIndicator, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import AppColors from '../../constants/AppColors';
import Header from '../../components/Header';
import { CommonContext } from '../../api/commonContext';
import AppStrings from '../../constants/AppStrings';
import AsyncStorage from '@react-native-async-storage/async-storage';
export type FavoritesScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'FavoritesScreen'
>;

export type FavoritesScreenRouteProps = RouteProp<
  RootStackParams,
  'FavoritesScreen'
>;

interface Props {}

const screenWidth = Dimensions.get('window').width;

const FavoritesScreen: React.FC<Props> = () => {
  const navigation = useNavigation<FavoritesScreenNavigationProps>();
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const {commonInput, setCommonInput} = useContext(CommonContext)
  const {favLists,loadingFavLists} = useSelector(
    (state: RootState) => state.FavList)
    const {currencyLists} = useSelector(
      (state: RootState) => state.CurrencyList,
    );
    const currentLanguage = useSelector(
      (state: RootState) => state.language.currentLanguage,
    );
    const strings = useSelector(
      (state: RootState) => state.language.resources[currentLanguage],
    );

    useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        dispatch(fetchFavList({requestBody: ''}));
      });
  
      return unsubscribe;
    }, [navigation]);

  return (
    <View flex backgroundColor='#FFFFFF'>
       <Header/>

       <View flex paddingH-10 style={{width:screenWidth,alignItems:'center'}}>
          <Text style={styles.text}>{strings.favorites}</Text>

          {loadingFavLists ?
    <ActivityIndicator color={AppColors.blue} size={30}/>
:
    <FlatList
    data={favLists?.favourite}
    numColumns={3}
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{ paddingBottom: 70 }}
    renderItem={({item})=>{
      return(
        <TouchableOpacity onPress={()=>{
            navigation.navigate(RouteNames.DetailsScreen,{adId:item.ads_id,countryId:commonInput.common_country_id,edit:false})
          }}>
              <View style={styles.view}>
                 <Image source={item.ads.image.length == 0 ? AppImages.PLACEHOLDER : {uri:'https://admin-jamal.prompttechdemohosting.com/' + item.ads.image[0].image}} 
                 resizeMode={'contain'} style={{width:'100%',borderTopLeftRadius:4,borderTopRightRadius:4,height:70}}/>
                 <View margin-3>
                 <Text numberOfLines={1} ellipsizeMode='tail' style={styles.priceText}>{currencyLists == null ? 'USD ' + item.ads.price.toFixed()
                  : (currencyLists?.currency.currency_code + ' ' + (currencyLists?.currency.value * item.ads.price).toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','))}</Text>
                 <Text numberOfLines={1} ellipsizeMode='tail' style={styles.titleText}>{commonInput.language == 'ar' ? item.ads.title_arabic ? item.ads.title_arabic : item.ads.title : item.ads.title}</Text>
                 <Text style={styles.cityText}>{item.ads.area}</Text>
                 </View>
                </View>
                </TouchableOpacity>
      )
    }}/>}
        </View>
        </View>
    
  );
};

export default FavoritesScreen;