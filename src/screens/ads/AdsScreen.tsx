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
import PdfModal from '../../components/PdfModal';
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
  const [request_Document, setDocument] = useState([])
  const [showPdf, setShowPdf] = useState(false);
  const {commonInput, setCommonInput} = useContext(CommonContext)
  const {adLists, loadingAdLists} = useSelector(
    (state: RootState) => state.AdList)
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

    const Documents = (ad_id) => {
      let request = JSON.stringify({
        ads_id: ad_id
      })
      apiClient('app/customer/get/ad-cvdocuments', 'POST', request)
      .then(response=>{
        setDocument(response.data.data)
        setShowPdf(true)
      })
    }

  
    const handleClosePdf = () => {
      setShowPdf(false);
    };

  return (
    <View flex backgroundColor='#FFFFFF'>
      <Header/>

        <View paddingH-20 paddingT-10 paddingB-70 flex>
          <Text style={styles.text}>{strings.myAds}</Text>

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
          navigation.navigate(RouteNames.DetailsScreen,{adId:item.id,countryId:commonInput.common_country_id,edit:true})
        }}>
              <View style={[styles.view,{height:180}]}>
                 <Image source={item.image == null || item.image.length == 0 ? AppImages.PLACEHOLDER : {uri:'https://admin-jamal.prompttechdemohosting.com/' + item.image[0].image}} 
                 resizeMode={'contain'} style={{height:70,width:'100%',borderTopLeftRadius:4,borderTopRightRadius:4}}/>
                 <View margin-3>
                 <Text numberOfLines={1} ellipsizeMode='tail' style={styles.priceText}>{currencyLists == null ? 'USD ' + item.price.toFixed()
                  : (currencyLists?.currency.currency_code + ' ' + (currencyLists?.currency.value * item.price).toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','))}</Text>
                 <Text numberOfLines={1} ellipsizeMode='tail' style={styles.titleText}>{commonInput.language == 'ar' ? item.title_arabic ? item.title_arabic : item.title : item.title}</Text>
                 <Text style={styles.cityText}>{item.area}</Text>
                 <View row centerV style={{justifyContent:'space-between'}}>
                 <Text style={[styles.titleText,{fontFamily:AppFonts.POPPINS_SEMIBOLD}]}>
                 {item.status == 5 || item.status == 0 ? <Text color={'grey'}> {strings.pending}</Text> : item.status == 2 ? <Text color={'red'}> Rejected</Text> : ''}</Text>
                 <TouchableOpacity onPress={()=>AdsDelete(item.id)}>
                 <Image source={AppImages.DELETE} style={{width:18,height:18}}/>
                 </TouchableOpacity>
                 </View>

                 {(item.category.name == 'Jobs' && item.status == 1) &&
                 <TouchableOpacity onPress={()=>Documents(item.id)}>
                  <Text style={[styles.titleText,{color:'#007bff'}]}>{strings.viewDocuments}</Text>
                 </TouchableOpacity>}
                 </View>
                </View>
                </TouchableOpacity>
      )
    }}/>}
        </View>

        {showPdf && (
          <PdfModal
          visible={showPdf}
          pdfUrl={request_Document}
          onClose={handleClosePdf}
          jobStatus={true}
        />
      )}
        </View>
    
  );
};

export default AdsScreen;