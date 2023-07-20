import React, {useState, useEffect} from 'react';
import {Button, Checkbox, Image, Incubator, Text, View} from 'react-native-ui-lib';
import {RootStackParams, RouteNames} from '../../navigation';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native';
import AppImages from '../../constants/AppImages';
import styles from './styles';
import AppColors from '../../constants/AppColors';
import ItemDropdown from '../../components/ItemDropdown';
import InputField from '../../components/InputField';
import { RootState } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { fetchCountryList } from '../../api/country/CountryListSlice';
import { fetchStateList } from '../../api/country/StateListSlice';
import { fetchCityList } from '../../api/country/CityListSlice';
const {TextField} = Incubator;
export type PlaceAdScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'PlaceAdScreen'
>;

export type PlaceAdScreenRouteProps = RouteProp<
  RootStackParams,
  'PlaceAdScreen'
>;

interface Props {}

const PlaceAdScreen: React.FC<Props> = ({route}) => {
  const navigation = useNavigation<PlaceAdScreenNavigationProps>();
  const {cat_id, sub_id} = route.params;
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const [country_id, setCountryId] = useState(0)
  const [state_id, setStateId] = useState(0)
  const [city_id, setCityId] = useState(0)
  const [data,setData] = useState([
    {name:'Item1',id:1},
    {name:'Item2', id:2}
  ])
  const {countryLists} = useSelector(
    (state: RootState) => state.CountryList,
  );
  const {stateLists} = useSelector(
    (state: RootState) => state.StateList,
  );
  const {cityLists} = useSelector(
    (state: RootState) => state.CityList,
  );

  useEffect(() => {
    let request = JSON.stringify({
      country: country_id
    })
    dispatch(fetchStateList({requestBody: request}));
  }, [country_id]);

  useEffect(() => {
    let request = JSON.stringify({
      state: state_id
    })
    dispatch(fetchCityList({requestBody: request}));
  }, [state_id]);

  const setCountry = (value) => {
    setCountryId(value)
  }

  const setState = (value) => {
    setStateId(value)
  }
  const setCity = (value) => {
    setCityId(value)
  }

  return (
    <View flex backgroundColor='white' padding-20>
         <View row centerV>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <View style={styles.circle}>
                <Image
                  source={AppImages.ARROW_LEFT}
                  style={{width: 25, height: 25}}
                />
              </View>
            </TouchableOpacity>
            <View flex center>
            <Text style={styles.heading}>Place an Ad</Text>
            </View>
          </View>

          <Text style={styles.AdTitle}>Tell us about your car</Text>

     <ScrollView showsVerticalScrollIndicator={false}>
        <View marginV-20>
          <InputField
          title={'Title in English'}
          multiline={false}
          height={45}
          type={'default'}
          />
          
        <InputField
          title={'Title in Arabic'}
          multiline={false}
          height={45}
          type={'default'}
          />

          <TextField
          placeholder={'Canonical Name'}
          placeholderTextColor={"#000000"}
          color={"#000000"}
          style={styles.fieldText}
          fieldStyle={styles.fieldStyle1}
          paddingH-15
          marginB-20
          />

          <View marginB-20>
          <View paddingH-15 centerV row style={[styles.fieldStyle,{borderStyle:'dashed',justifyContent:'space-between'}]}>
            <Text style={styles.fieldText}>Upload Image</Text>
            <Image source={AppImages.UPLOAD} tintColor={AppColors.lightBlue}/>
          </View>
          <Text style={{color:'red',fontSize:8}}>*Maximum 5 images are allowed</Text>
          </View>

          <ItemDropdown value={'Select Country'} data={countryLists?.country} add={setCountry}/>

     <InputField
          title={'Price'}
          multiline={false}
          height={45}
          type={'default'}
          />

<InputField
          title={'Description in English'}
          multiline={true}
          height={80}
          type={'default'}
          />

<InputField
          title={'Description in Arabic'}
          multiline={true}
          height={80}
          type={'default'}
          />

<ItemDropdown value={'Select State'} data={stateLists?.state} add={setState}/>

<ItemDropdown value={'Select City'} data={cityLists?.city} add ={setCity}/>

<InputField
          title={'Area'}
          multiline={false}
          height={45}
          type={'default'}
          />
          
          <Checkbox
          label={'Price Negotiable'}
          labelStyle={styles.fieldText}
          value={true}
          color={'grey'}
          containerStyle={{marginBottom:20}}/>

<Checkbox
          label={'Featured'}
          labelStyle={styles.fieldText}
          value={false}
          color={'grey'}
          containerStyle={{marginBottom:20}}/>

          <Button
          label={'Next'}
          style={{backgroundColor:AppColors.lightBlue}}
          onPress={()=>navigation.navigate(RouteNames.SaleRentPlaceAd,{cat_id:cat_id,sub_id:sub_id})}/>
                </View>
     </ScrollView>
        </View>
    
  );
};

export default PlaceAdScreen;