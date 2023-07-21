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
import { PlaceAdContext } from '../../api/placeAd/PlaceAdContext';
const {TextField} = Incubator;
export type SellerInformationNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'SellerInformation'
>;

export type SellerInformationRouteProps = RouteProp<
  RootStackParams,
  'SellerInformation'
>;

interface Props {}

const SellerInformation: React.FC<Props> = () => {
  const navigation = useNavigation<SellerInformationNavigationProps>();
  const {placeAdInput, setPlaceAdInput} = useContext(PlaceAdContext)
  useEffect(() => {
  }, []);

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

          <Text style={styles.AdTitle}>Seller information</Text>

     <ScrollView showsVerticalScrollIndicator={false}>
        <View marginV-20>
        <InputField
          title={'Name'}
          multiline={false}
          height={45}
          type={'default'}
          value={placeAdInput.name}
          onChange={(text)=>{setPlaceAdInput({...placeAdInput, name:text})}}
          />

<InputField
          title={'Email'}
          multiline={false}
          height={45}
          type={'default'}
          value={placeAdInput.email}
          onChange={(text)=>{setPlaceAdInput({...placeAdInput, email:text})}}
          />

<InputField
          title={'Phone'}
          multiline={false}
          height={45}
          type={'numeric'}
          value={placeAdInput.phone}
          onChange={(text)=>{setPlaceAdInput({...placeAdInput, phone:text})}}
          />

<InputField
          title={'Address'}
          multiline={false}
          height={80}
          type={'default'}
          value={placeAdInput.address}
          onChange={(text)=>{setPlaceAdInput({...placeAdInput, address:text})}}
          />
          
          <Checkbox
          label={'Phone Hide'}
          labelStyle={styles.fieldText} 
          value={placeAdInput.phone_hide}
          onValueChange={(value)=>{setPlaceAdInput({...placeAdInput, phone_hide:value})}}
        
          color={'grey'}
          containerStyle={{marginBottom:20}}/>

<Checkbox
          label={'Accept Terms & Conditions'}
          labelStyle={[styles.fieldText,{color:'#006EFF'}]}
          value={false}
          color={'grey'}
          containerStyle={{marginBottom:20}}/>

          <View row style={{justifyContent:'space-between'}}>
          <Button
          label={'Back'}
          labelStyle={styles.buttonLabelStyle}
          style={{backgroundColor:'white',borderColor:AppColors.lightBlue,borderWidth:1,width:'48%'}}/>

          <Button
          label={'Create'}
          labelStyle={[styles.buttonLabelStyle,{color:'white'}]}
          style={{backgroundColor:AppColors.lightBlue,width:'48%'}}
          onPress={()=>navigation.navigate(RouteNames.PaymentScreen)}/>

          </View>

          
                </View>
     </ScrollView>
        </View>
    
  );
};

export default SellerInformation;