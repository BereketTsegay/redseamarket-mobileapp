import React, {useState, useEffect, useContext} from 'react';
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
import { fetchModelList } from '../../api/motor/ModelListSlice';
import { fetchVariantList } from '../../api/motor/VariantListSlice';
import { PlaceAdContext } from '../../api/placeAd/PlaceAdContext';
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
  const {cat_id,sub_id,name}= route.params;
  const {placeAdInput, setPlaceAdInput} = useContext(PlaceAdContext)
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const {makeList} = useSelector(
    (state: RootState) => state.MakeList,
  );
  const {modelList} = useSelector(
    (state: RootState) => state.ModelList,
  );
  const {variantList} = useSelector(
    (state: RootState) => state.VariantList,
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

  useEffect(() => {
    let request = JSON.stringify({
      make_id: placeAdInput.make_id
    })
    dispatch(fetchModelList({requestBody: request}));
  }, [placeAdInput.make_id]);

  useEffect(() => {
    let request = JSON.stringify({
      model_id: placeAdInput.model_id
    })
    dispatch(fetchVariantList({requestBody: request}));
  }, [placeAdInput.model_id]);

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

  const setMake = (value) => {
    setPlaceAdInput({...placeAdInput, make_id:value})
  }

  const setModel = (value) => {
    setPlaceAdInput({...placeAdInput, model_id:value})
  }

  const setVariant = (value) => {
    setPlaceAdInput({...placeAdInput, variant_id:value})
  }

  const setFuel = (value) => {
    setPlaceAdInput({...placeAdInput, fuel:value})
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

          <Text style={styles.AdTitle}>Tell us about your {name}</Text>

     <ScrollView showsVerticalScrollIndicator={false}>
        <View marginV-20>

<ItemDropdown value={'Make'} data={makeList?.make} add={setMake}/>

<ItemDropdown value={'Model'} data={modelList?.model} add={setModel}/>

<ItemDropdown value={'Variant'} data={variantList?.variant} add={setVariant}/>

<InputField
          title={'Registered Year'}
          multiline={false}
          height={45}
          type={'numeric'}
          value={placeAdInput.registration_year}
            onChange={(text)=>{setPlaceAdInput({...placeAdInput, registration_year:text})}}
          />

<ItemDropdown value={'Fuel Type'} data={fuelOption} add={setVariant}/>

<Text style={[styles.title,{fontSize:14,marginBottom:20}]}>Transmission</Text>
<RadioGroup
              initialValue={placeAdInput.transmission}
              onValueChange={(value: any) =>setPlaceAdInput({...placeAdInput, transmission:value})}
              >
              {renderRadioButton(1,'Manual')}
              {renderRadioButton(2,'Automatic')}
            </RadioGroup>

<Text style={[styles.title,{fontSize:14,marginBottom:20}]}>Condition</Text>
<RadioGroup
              initialValue={placeAdInput.condition}
              onValueChange={(value: any) =>setPlaceAdInput({...placeAdInput, condition:value})}
              >
              {renderRadioButton(1,'New')}
              {renderRadioButton(2,'Used')}
            </RadioGroup>

<InputField
          title={'Mileage'}
          multiline={false}
          height={45}
          type={'numeric'}
          value={placeAdInput.mileage}
          onChange={(text)=>{setPlaceAdInput({...placeAdInput, mileage:text})}}
          />

          <Text style={[styles.title,{fontSize:14,marginBottom:20}]}>Features</Text>

<Checkbox
          label={'Air Conditioner'}
          labelStyle={styles.fieldText}
          value={placeAdInput.aircondition}
          onValueChange={(value: any) =>setPlaceAdInput({...placeAdInput, aircondition:value})}
          color={'grey'}
          containerStyle={{marginBottom:20}}/>

<Checkbox
          label={'GPS'}
          labelStyle={styles.fieldText}
          value={placeAdInput.gps}
          onValueChange={(value: any) =>setPlaceAdInput({...placeAdInput, gps:value})}
          color={'grey'}
          containerStyle={{marginBottom:20}}/>

<Checkbox
          label={'Security System'}
          labelStyle={styles.fieldText}
          value={placeAdInput.security}
          onValueChange={(value: any) =>setPlaceAdInput({...placeAdInput, security:value})}
          color={'grey'}
          containerStyle={{marginBottom:20}}/>

<Checkbox
          label={'Spare Tire'}
          labelStyle={styles.fieldText}
          value={placeAdInput.tire}
          onValueChange={(value: any) =>setPlaceAdInput({...placeAdInput, tire:value})}
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