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
import { ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import AppColors from '../../constants/AppColors';
import Header from '../../components/Header';
import { PlaceAdContext } from '../../api/placeAd/PlaceAdContext';
export type FavoritesScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'FavoritesScreen'
>;

export type FavoritesScreenRouteProps = RouteProp<
  RootStackParams,
  'FavoritesScreen'
>;

interface Props {}

const FavoritesScreen: React.FC<Props> = () => {
  const navigation = useNavigation<FavoritesScreenNavigationProps>();
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const {placeAdInput, setPlaceAdInput} = useContext(PlaceAdContext)
  const {favLists,loadingFavLists} = useSelector(
    (state: RootState) => state.FavList)
    const {currencyLists} = useSelector(
      (state: RootState) => state.CurrencyList,
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

        <View paddingH-30 paddingT-10 paddingB-70 flex>
          <Text style={styles.text}>Favourites</Text>

          {loadingFavLists ?
    <ActivityIndicator color={AppColors.blue} size={30}/>
:
    <FlatList
    data={favLists?.favourite}
    numColumns={3}
    showsVerticalScrollIndicator={false}
    renderItem={({item})=>{
      return(
        <TouchableOpacity onPress={()=>{
            navigation.navigate(RouteNames.DetailsScreen,{adId:item.ads_id,countryId:placeAdInput.common_country_id})
          }}>
              <View style={styles.view}>
                 <Image source={item.ads.image[0].image == null || item.ads.image.length == 0 ? AppImages.PLACEHOLDER : {uri:'https://admin-jamal.prompttechdemohosting.com/' + item.ads.image[0].image}} 
                 resizeMode={'contain'} style={{height:70,width:'100%',borderTopLeftRadius:4,borderTopRightRadius:4}}/>
                 <View margin-3>
                 <Text numberOfLines={1} ellipsizeMode='tail' style={styles.priceText}>{currencyLists == null ? 'USD ' + item.ads.price.toFixed()
                  : (currencyLists?.currency.currency_code + ' ' + (currencyLists?.currency.value * item.ads.price).toFixed())}</Text>
                 <Text numberOfLines={1} ellipsizeMode='tail' style={styles.titleText}>{item.ads.title}</Text>
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