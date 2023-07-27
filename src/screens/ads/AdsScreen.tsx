import React, {useState, useEffect, useContext} from 'react';
import {Image, Text, View} from 'react-native-ui-lib';
import {RootStackParams, RouteNames} from '../../navigation';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import styles from '../fav/styles';
import AppImages from '../../constants/AppImages';
import { ActivityIndicator, FlatList, ToastAndroid, TouchableOpacity } from 'react-native';
import AppColors from '../../constants/AppColors';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { fetchAdList } from '../../api/ads/AdListSlice';
import Header from '../../components/Header';
import AppFonts from '../../constants/AppFonts';
import { apiClient } from '../../api/apiClient';
import { CommonContext } from '../../api/commonContext';
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
  const {commonInput, setCommonInput} = useContext(CommonContext)
  const {adLists, loadingAdLists} = useSelector(
    (state: RootState) => state.AdList)
    const {currencyLists} = useSelector(
      (state: RootState) => state.CurrencyList,
    );

    useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        list()
      });
  
      return unsubscribe;
    }, [navigation]);

    const list = () => {
      dispatch(fetchAdList({requestBody: ''}));
    }

    const AdsDelete = (id) => {
      let request = JSON.stringify({
        ads_id: id
      })
      apiClient( 'app/customer/ad/delete','POST',request)
      .then(response=>{
        if(response.data.status == 'success'){
          list()
          ToastAndroid.show(
            JSON.stringify(response.data.message),
            ToastAndroid.SHORT,
          );
        }
        else{
          ToastAndroid.show(
            JSON.stringify(response.data.message),
            ToastAndroid.SHORT,
          );
        }
      })
    }


  return (
    <View flex backgroundColor='#FFFFFF'>
      <Header/>

        <View paddingH-20 paddingT-10 paddingB-70 flex center>
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
        <TouchableOpacity onPress={()=>{
          navigation.navigate(RouteNames.DetailsScreen,{adId:item.id,countryId:commonInput.common_country_id})
        }}>
              <View style={styles.view}>
                 <Image source={item.image == null || item.image.length == 0 ? AppImages.PLACEHOLDER : {uri:'https://admin-jamal.prompttechdemohosting.com/' + item.image[0].image}} 
                 resizeMode={'contain'} style={{height:70,width:'100%',borderTopLeftRadius:4,borderTopRightRadius:4}}/>
                 <View margin-3>
                 <Text numberOfLines={1} ellipsizeMode='tail' style={styles.priceText}>{currencyLists == null ? 'USD ' + item.price.toFixed()
                  : (currencyLists?.currency.currency_code + ' ' + (currencyLists?.currency.value * item.price).toFixed())}</Text>
                 <Text numberOfLines={1} ellipsizeMode='tail' style={styles.titleText}>{item.title}</Text>
                 <Text style={styles.cityText}>{item.area}</Text>
                 <View row centerV style={{justifyContent:'space-between'}}>
                 <Text style={[styles.titleText,{fontFamily:AppFonts.POPPINS_SEMIBOLD}]}>Status : 
                 {item.status == 1 ? <Text color={'green'}> Accepted</Text> : item.status == 0 ? <Text color={'grey'}> Pending</Text> : <Text color={'red'}> Rejected</Text>}</Text>
                 <TouchableOpacity onPress={()=>AdsDelete(item.id)}>
                 <Image source={AppImages.DELETE} style={{width:18,height:18}}/>
                 </TouchableOpacity>
                 </View>
                 </View>
                </View>
                </TouchableOpacity>
      )
    }}/>}
        </View>
        </View>
    
  );
};

export default AdsScreen;