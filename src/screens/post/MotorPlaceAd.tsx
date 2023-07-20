import React, {useState, useEffect} from 'react';
import {Button, Checkbox, Image, Incubator, RadioButton, RadioGroup, Text, View} from 'react-native-ui-lib';
import {RootStackParams, RouteNames} from '../../navigation';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native';
import AppImages from '../../constants/AppImages';
import styles from './styles';
import AppColors from '../../constants/AppColors';
import InputField from '../../components/InputField';
import ItemDropdown from '../../components/ItemDropdown';
import AppFonts from '../../constants/AppFonts';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMakeList } from '../../api/motor/MakeListSlice';
const {TextField} = Incubator;
export type MotorPlaceAdNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'MotorPlaceAd'
>;

export type MotorPlaceAdRouteProps = RouteProp<
  RootStackParams,
  'MotorPlaceAd'
>;

interface Props {}

const MotorPlaceAd: React.FC<Props> = ({route}) => {
  const navigation = useNavigation<MotorPlaceAdNavigationProps>();
  const {cat_id,sub_id}= route.params;
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const {makeList} = useSelector(
    (state: RootState) => state.MakeList,
  );
  const [fuelOption, setFuelOption] = useState([
    {
        id: 'Petrol',
        name: 'Petrol',
    },
    {
        id: 'Diesel',
        name: 'Diesel',
    },
    {
        id: 'LPG Gas',
        name: 'LPG Gas',
    },
    {
      id: 'Electric',
        name: 'Electric',
    },
])
  const [data,setData] = useState([
    {name:'Item1',id:1},
    {name:'Item2', id:2}
  ])
  useEffect(() => {
    dispatch(fetchMakeList({requestBody: ''}));
  }, []);

  const renderRadioButton = (
    value,name
  ) => {
    return (
      <View marginB-20>
        <RadioButton
          value={value}
          label={name}
          color={'grey'}
          labelStyle={styles.fieldText}
        />
        </View>
    );
  };


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

<ItemDropdown value={'Make'} data={makeList?.make}/>

<ItemDropdown value={'Model'} data={data}/>

<ItemDropdown value={'Variant'} data={data}/>

<InputField
          title={'Registered Year'}
          multiline={false}
          height={45}
          type={'numeric'}
          />

<ItemDropdown value={'Fuel Type'} data={fuelOption}/>

<Text style={[styles.title,{fontSize:14,marginBottom:20}]}>Transmission</Text>
<RadioGroup
              // initialValue={}
              // onValueChange={(value: any) =>}
              >
              {renderRadioButton(1,'Manual')}
              {renderRadioButton(2,'Automatic')}
            </RadioGroup>

<Text style={[styles.title,{fontSize:14,marginBottom:20}]}>Condition</Text>
<RadioGroup
              // initialValue={}
              // onValueChange={(value: any) =>}
              >
              {renderRadioButton(1,'New')}
              {renderRadioButton(2,'Used')}
            </RadioGroup>

<InputField
          title={'Mileage'}
          multiline={false}
          height={45}
          type={'numeric'}
          />

          <Text style={[styles.title,{fontSize:14,marginBottom:20}]}>Features</Text>

<Checkbox
          label={'Air Conditioner'}
          labelStyle={styles.fieldText}
          value={true}
          color={'grey'}
          containerStyle={{marginBottom:20}}/>

<Checkbox
          label={'GPS'}
          labelStyle={styles.fieldText}
          value={false}
          color={'grey'}
          containerStyle={{marginBottom:20}}/>

<Checkbox
          label={'Security System'}
          labelStyle={styles.fieldText}
          value={false}
          color={'grey'}
          containerStyle={{marginBottom:20}}/>

<Checkbox
          label={'Spare Tire'}
          labelStyle={styles.fieldText}
          value={false}
          color={'grey'}
          containerStyle={{marginBottom:20}}/>

          <Button
          label={'Next'}
          style={{backgroundColor:AppColors.lightBlue}}
          onPress={()=>navigation.navigate(RouteNames.SellerInformation)}/>
                </View>
     </ScrollView>
        </View>
    
  );
};

export default MotorPlaceAd;