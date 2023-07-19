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
  useEffect(() => {
  }, []);

  const InputField = ({title,multiline,height}) => {
    return(
      <TextField
          placeholder={title}
          placeholderTextColor={"#000000"}
          color={"#000000"}
          style={styles.fieldText}
          fieldStyle={[styles.fieldStyle,{height:height}]}
          paddingH-15
          marginB-20
          multiline={multiline}
          />
    )
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
          />
          
        <InputField
          title={'Title in Arabic'}
          multiline={false}
          height={45}
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


          <View paddingH-15 marginB-20 centerV style={[styles.fieldStyle,{borderStyle:'dashed'}]}>
            <Text style={styles.fieldText}>Upload Image</Text>
          </View>

     <InputField
          title={'Price'}
          multiline={false}
          height={45}
          />

<InputField
          title={'Description in English'}
          multiline={true}
          height={80}
          />

<InputField
          title={'Description in Arabic'}
          multiline={true}
          height={80}
          />

<InputField
          title={'Area'}
          multiline={false}
          height={45}
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
          onPress={()=>navigation.navigate(RouteNames.CustomPlaceAd,{cat_id:cat_id,sub_id:sub_id})}/>
                </View>
     </ScrollView>
        </View>
    
  );
};

export default PlaceAdScreen;