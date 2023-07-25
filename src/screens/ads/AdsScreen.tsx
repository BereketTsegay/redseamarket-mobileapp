import React, {useState, useEffect} from 'react';
import {Image, Text, View} from 'react-native-ui-lib';
import {RootStackParams, RouteNames} from '../../navigation';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import styles from '../fav/styles';
import AppImages from '../../constants/AppImages';
import { ActivityIndicator, FlatList } from 'react-native';
import AppColors from '../../constants/AppColors';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { fetchAdList } from '../../api/ads/AdListSlice';
import Header from '../../components/Header';
export type AdsScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'AdsScreen'
>;

export type AdsScreenRouteProps = RouteProp<
  RootStackParams,
  'AdsScreen'
>;

interface Props {}

const AdsScreen: React.FC<Props> = () => {
  const navigation = useNavigation<AdsScreenNavigationProps>();
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const {adLists, loadingAdLists} = useSelector(
    (state: RootState) => state.AdList)
    const {currencyLists} = useSelector(
      (state: RootState) => state.CurrencyList,
    );
    console.log(adLists)

    useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        dispatch(fetchAdList({requestBody: ''}));
      });
  
      return unsubscribe;
    }, [navigation]);


  return (
    <View flex backgroundColor='#FFFFFF'>
      <Header/>

        <View paddingH-30 paddingT-10 paddingB-70 flex>
          <Text style={styles.text}>My Ads</Text>

          {loadingAdLists ?
    <ActivityIndicator color={AppColors.blue} size={30}/>
:
    <FlatList
    data={adLists?.ads}
    numColumns={3}
    showsVerticalScrollIndicator={false}
    renderItem={({item})=>{
      return(
              <View style={styles.view}>
                 <Image source={item.image == null || item.image.length == 0 ? AppImages.PLACEHOLDER : {uri:'https://admin-jamal.prompttechdemohosting.com/' + item.image[0].image}} 
                 resizeMode={'contain'} style={{height:70,width:'100%',borderTopLeftRadius:4,borderTopRightRadius:4}}/>
                 <View margin-3>
                 <Text numberOfLines={1} ellipsizeMode='tail' style={styles.priceText}>{currencyLists == null ? 'USD ' + item.price.toFixed()
                  : (currencyLists?.currency.currency_code + ' ' + (currencyLists?.currency.value * item.price).toFixed())}</Text>
                 <Text numberOfLines={1} ellipsizeMode='tail' style={styles.titleText}>{item.title}</Text>
                 <Text style={styles.cityText}>{item.area}</Text>
                 </View>
                </View>
      )
    }}/>}
        </View>
        </View>
    
  );
};

export default AdsScreen;