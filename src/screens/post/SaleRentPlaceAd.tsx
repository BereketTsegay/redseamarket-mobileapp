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
import InputField from '../../components/InputField';
import ItemDropdown from '../../components/ItemDropdown';
const {TextField} = Incubator;
export type SaleRentPlaceAdNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'SaleRentPlaceAd'
>;

export type SaleRentPlaceAdRouteProps = RouteProp<
  RootStackParams,
  'SaleRentPlaceAd'
>;

interface Props {}

const SaleRentPlaceAd: React.FC<Props> = ({route}) => {
  const navigation = useNavigation<SaleRentPlaceAdNavigationProps>();
  const {cat_id,sub_id}= route.params;
  const [data,setData] = useState([
    {name:'Item1',id:1},
    {name:'Item2', id:2}
  ])
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

          <Text style={styles.AdTitle}>Tell us about your car</Text>

     <ScrollView showsVerticalScrollIndicator={false}>
        <View marginV-20>
     
        <InputField
          title={'Custom Title'}
          multiline={false}
          height={45}
          type={'numeric'}
          />

<ItemDropdown value={'Select Item'} data={data}/>

<Checkbox
          label={'checkbox'}
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

export default SaleRentPlaceAd;