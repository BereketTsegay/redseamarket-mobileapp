import React, {useState, useEffect, useContext} from 'react';
import {Button, Checkbox, Image, Incubator, Text, View} from 'react-native-ui-lib';
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
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { PlaceAdContext } from '../../api/placeAd/PlaceAdContext';
const {TextField} = Incubator;
export type CustomPlaceAdNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'CustomPlaceAd'
>;

export type CustomPlaceAdRouteProps = RouteProp<
  RootStackParams,
  'CustomPlaceAd'
>;

interface Props {}

const CustomPlaceAd: React.FC<Props> = ({route}) => {
  const navigation = useNavigation<CustomPlaceAdNavigationProps>();
  const {name}= route.params;
  const {placeAdInput, setPlaceAdInput} = useContext(PlaceAdContext)
  const {customLists} = useSelector(
    (state: RootState) => state.CustomFieldList,
  );


  useEffect(() => {
   
  }, []);

  const updateFieldValue = (fieldId, value) => {
    const existingIndex = placeAdInput.fieldValue.findIndex((field) => field.field_id === fieldId);

    if(existingIndex>=0){
      const updatedFieldValue = [...placeAdInput.fieldValue];
      updatedFieldValue[existingIndex].value = value;
      setPlaceAdInput({ ...placeAdInput, fieldValue: updatedFieldValue });
    }else{
      setPlaceAdInput({
        ...placeAdInput,
        fieldValue: [...placeAdInput.fieldValue, { field_id: fieldId, value: value }],
      });
    }
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

          <Text style={styles.AdTitle}>Tell us about your {name}</Text>

     <ScrollView showsVerticalScrollIndicator={false}>
        <View marginV-20>

          {customLists?.data.category_field.map((item)=>(
       <>
       {item.field.type == "text" &&
       <InputField
          title={item.field.name}
          multiline={false}
          height={45}
          type={'default'}
          value={placeAdInput.textValue}
          onChange={(text) => updateFieldValue(item.field.id, text)}
          trailing={null}
          />}

{item.field.type == "Number" &&
       <InputField
          title={item.field.name}
          multiline={false}
          height={45}
          type={'numeric'}
          value={placeAdInput.textValue}
          onChange={(text) => updateFieldValue(item.field.id, text)}
          trailing={null}
          />}

{item.field.type == "date" &&
       <InputField
          title={item.field.name}
          multiline={false}
          height={45}
          type={'default'}
          value={placeAdInput.textValue}
          onChange={(text) => updateFieldValue(item.field.id, text)}
          trailing={null}
          />}

{item.field.type == "textarea" &&
       <InputField
          title={item.field.name}
          multiline={false}
          height={80}
          type={'default'}
          value={placeAdInput.textValue}
          onChange={(text) => updateFieldValue(item.field.id, text)}
          trailing={null}
          />}

 {/* <ItemDropdown value={'Select Item'} data={data}/> */}

{item.field.type == "Checkbox" &&
<Checkbox
          label={item.field.name}
          labelStyle={styles.fieldText}
          value={placeAdInput.textValue}
          color={'grey'}
          containerStyle={{marginBottom:20}}
          onValueChange={(value) => updateFieldValue(item.field.id, value)}/> 
}
          </>
          ))}
     
        

          <Button
          label={'Next'}
          style={{backgroundColor:AppColors.lightBlue}}
          onPress={()=>navigation.navigate(RouteNames.SellerInformation)}/>
                </View>
     </ScrollView>
        </View>
    
  );
};

export default CustomPlaceAd;