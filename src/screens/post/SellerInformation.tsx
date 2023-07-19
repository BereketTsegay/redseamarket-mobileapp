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
        <View>
          <TextField
          placeholder={'Name'}
          placeholderTextColor={"#000000"}
          color={"#000000"}
          style={styles.fieldText}
          fieldStyle={styles.fieldStyle}
          paddingH-15
          marginV-20
          />

          <TextField
          placeholder={'Email'}
          placeholderTextColor={"#000000"}
          color={"#000000"}
          style={styles.fieldText}
          fieldStyle={styles.fieldStyle}
          paddingH-15
          marginB-20
          />

     <TextField
          placeholder={'Phone'}
          placeholderTextColor={"#000000"}
          color={"#000000"}
          keyboardType={'numeric'}
          style={styles.fieldText}
          fieldStyle={styles.fieldStyle}
          paddingH-15
          marginB-20
          />

<TextField
          placeholder={'Address'}
          placeholderTextColor={"#000000"}
          color={"#000000"}
          style={styles.fieldText}
          fieldStyle={[styles.fieldStyle,{height:80}]}
          paddingH-15
          marginB-20
          />
          
          <Checkbox
          label={'Phone Hide'}
          labelStyle={styles.fieldText}
          value={true}
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