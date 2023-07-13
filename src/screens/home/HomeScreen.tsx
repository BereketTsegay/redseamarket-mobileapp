import React, {useState, useEffect} from 'react';
import {Image, Incubator, Text, View} from 'react-native-ui-lib';
import {RootStackParams, RouteNames} from '../../navigation';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import AppImages from '../../constants/AppImages';
import SelectDropdown from 'react-native-select-dropdown';
import styles from './styles';
import AppColors from '../../constants/AppColors';
import { ActivityIndicator, FlatList, ImageBackground, ScrollView } from 'react-native';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashBoardList } from '../../api/home/DashBoardListSlice';
import AppFonts from '../../constants/AppFonts';
import { fetchCountryList } from '../../api/country/CountryListSlice';
const {TextField} = Incubator;
export type HomeScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'HomeScreen'
>;

export type HomeScreenRouteProps = RouteProp<
  RootStackParams,
  'HomeScreen'
>;

interface Props {}

const HomeScreen: React.FC<Props> = () => {
  const navigation = useNavigation<HomeScreenNavigationProps>();
  const [countryId, setCountryId] = useState('');
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const {dashboardLists,loadingDashBoardList} = useSelector(
    (state: RootState) => state.DashBoardList,
  );
  const {countryLists, loadingCountryList} = useSelector(
    (state: RootState) => state.CountryList,
  );
  

  useEffect(() => {
    let request = JSON.stringify({
      country: countryId
    })
    dispatch(fetchDashBoardList({requestBody: request}));
  }, [countryId]);

  useEffect(() => {
    dispatch(fetchCountryList({requestBody: ''}));
  }, []);


  const Dropdown = () => {
    return (
      <SelectDropdown
        data={countryLists?.country}
        onSelect={(selectedItem, index) => {
          setCountryId(selectedItem.id);
        }}
        defaultButtonText={'country'}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem.code;
        }}
        rowTextForSelection={(item, index) => {
          return item.name + ', ' + item.code;
        }}
        buttonStyle={styles.dropdown1BtnStyle}
        buttonTextStyle={styles.dropdown1BtnTxtStyle}
        renderDropdownIcon={isOpened => {
          return <Image source={AppImages.ARROW_DOWN} />;
        }}
        dropdownIconPosition={'right'}
        dropdownStyle={styles.dropdown1DropdownStyle}
        rowStyle={styles.dropdown1RowStyle}
        rowTextStyle={styles.dropdown1RowTxtStyle}
      />
    )
  }


  return (
    <View flex backgroundColor="#FFFFFF" paddingB-60>
        <ImageBackground 
         source={dashboardLists?.data.slider != null ? {uri:'https://admin-jamal.prompttechdemohosting.com/' + dashboardLists.data.slider.image}: null}
        style={{backgroundColor:AppColors.darkBlue,height:200,justifyContent:'flex-end',paddingHorizontal:10}}
        >
          <Text style={{alignSelf:'center',fontSize:16,fontFamily:AppFonts.POPPINS_BOLD,bottom:20,color:'white'}}>{dashboardLists?.data.slider != null ?dashboardLists?.data.slider.name : ''}</Text>
    <View center style={styles.rowContainer}>
     
     {Dropdown()}
      {/* <TextField
        fieldStyle={styles.textFieldStyle}
        style={{fontSize:12}}
        paddingV-5
        paddingH-10
        placeholder={'What are you looking for ?'}
        keyboardType="default"
        leadingAccessory={<Image source={AppImages.SEARCH} />}
      /> */}
     {/* {Dropdown()} */}
    </View>
    </ImageBackground>

    <View padding-20>
      <Text style={styles.categoryText}>Category</Text>
      <FlatList
  data={dashboardLists?.data.categories}
  numColumns={4}
  showsHorizontalScrollIndicator={false}
  renderItem={({ item, index }) => {
    return (
      <View center key={index} style={{ flex: 1, margin: 10 }}>
        <ImageBackground key={index} source={AppImages.CIRCLE} style={{width:42, height:31 }}>
        <Image
          source={
            item.image == null
              ? AppImages.PLACEHOLDER
              : { uri: 'https://admin-jamal.prompttechdemohosting.com/' + item.image }
          }
          style={{width:45, height:25, right:5, top:10}}
          resizeMode="contain"
        />
        </ImageBackground>
      </View>
    );
  }}
/>
    </View>

    {loadingDashBoardList ?
    <ActivityIndicator color={AppColors.blue} size={30}/>
:
    <FlatList
    data={dashboardLists?.data.categories_ads}
    showsVerticalScrollIndicator={false}
    renderItem={({item})=>{
      return(
        <View marginH-20>
          <View row centerV style={{justifyContent:'space-between'}}>
          <Text style={styles.categoryText}>Popular in {item.name}</Text>
          <Image source={AppImages.ARROW_RIGHT} style={{height:10,width:15}} tintColor={'black'}/>
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View row marginV-20>
          {item.ads.map((item,index)=>(
              <View backgroundColor='white' key={index} marginR-20 style={{elevation:5,width:100}}>
                 <Image source={item.ad_image == null ? AppImages.PLACEHOLDER : {uri:'https://admin-jamal.prompttechdemohosting.com/' + item.ad_image?.image}} 
                 resizeMode={'cover'} style={{height:70,width:'100%'}}/>
                 <View margin-3>
                 <Text style={styles.priceText}>AED {item.price}</Text>
                 <Text numberOfLines={1} ellipsizeMode='tail' style={styles.nameText}>{item.title}</Text>
                 <Text style={styles.cityText}>{item.area}</Text>
                 </View>
                </View>
                ))}
                </View>
</ScrollView>
          
          </View>
      )
    }}/>}
  </View>
);
};


export default HomeScreen;
