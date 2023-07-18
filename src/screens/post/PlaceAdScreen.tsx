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

const PlaceAdScreen: React.FC<Props> = () => {
  const navigation = useNavigation<PlaceAdScreenNavigationProps>();
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
        <View>
          <TextField
          placeholder={'Title'}
          placeholderTextColor={"#000000"}
          color={"#000000"}
          style={styles.fieldText}
          fieldStyle={styles.fieldStyle}
          paddingH-15
          marginV-20
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

          <TextField
          placeholder={'Select Country'}
          placeholderTextColor={"#000000"}
          color={"#000000"}
          style={styles.fieldText}
          fieldStyle={styles.fieldStyle}
          paddingH-15
          marginB-20
          />

     <TextField
          placeholder={'Price'}
          placeholderTextColor={"#000000"}
          color={"#000000"}
          style={styles.fieldText}
          fieldStyle={styles.fieldStyle}
          paddingH-15
          marginB-20
          />

<TextField
          placeholder={'Description'}
          placeholderTextColor={"#000000"}
          color={"#000000"}
          style={styles.fieldText}
          fieldStyle={[styles.fieldStyle,{height:80}]}
          paddingH-15
          marginB-20
          />

<TextField
          placeholder={'Area'}
          placeholderTextColor={"#000000"}
          color={"#000000"}
          style={styles.fieldText}
          fieldStyle={styles.fieldStyle}
          paddingH-15
          marginB-20
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
          style={{backgroundColor:AppColors.lightBlue}}/>
                </View>
     </ScrollView>
        </View>
    
  );
};

export default PlaceAdScreen;