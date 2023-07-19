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
export type PaymentScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'PaymentScreen'
>;

export type PaymentScreenRouteProps = RouteProp<
  RootStackParams,
  'PaymentScreen'
>;

interface Props {}

const PaymentScreen: React.FC<Props> = () => {
  const navigation = useNavigation<PaymentScreenNavigationProps>();
  useEffect(() => {
  }, []);

  return (
    <View flex backgroundColor='white' paddingV-20>
         <View row centerV paddingH-20>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <View style={styles.circle}>
                <Image
                  source={AppImages.ARROW_LEFT}
                  style={{width: 25, height: 25}}
                />
              </View>
            </TouchableOpacity>
            <View flex center>
            <Text style={styles.heading}>Payment method</Text>
            </View>
          </View>

          <Text style={styles.AdTitle}>Choose a Payment Method</Text>
          <View flex paddingH-30 paddingV-30>
          
          <View style={styles.card}>
            <Text style={[styles.title,{fontSize:15}]}>Credit card</Text>
            <View row>
            <Image source={AppImages.MASTER} marginR-10/>
            <Image source={AppImages.VISA}/>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={[styles.title,{fontSize:15}]}>Debit card</Text>
            <Image source={AppImages.VISA}/>
          </View>

          <View style={styles.card}>
            <Text style={[styles.title,{fontSize:15}]}>Net banking</Text>
            <Image source={AppImages.BANKING}/>
          </View>

          <View style={styles.card}>
            <Text style={[styles.title,{fontSize:15}]}>Bank transfer</Text>
            <Image source={AppImages.TRANSFER}/>
          </View>

          

          </View>

          <View style={styles.bottomView}>
            <View row marginB-10 style={{justifyContent:'space-between'}}>
            <Text style={[styles.heading,{fontSize:15}]}>Total Payment :</Text>
            <Text style={[styles.heading,{fontSize:15}]}>AED 20</Text>
            </View>
            <Button
            label={'Proceed to checkout'}
            labelStyle={[styles.buttonLabelStyle,{color:'white'}]}
          style={{backgroundColor:AppColors.lightBlue}}
          onPress={()=>navigation.navigate(RouteNames.SuccessPage)}/>
          </View>

   
        </View>
    
  );
};

export default PaymentScreen;