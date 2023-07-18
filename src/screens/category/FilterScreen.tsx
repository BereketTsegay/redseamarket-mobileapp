import React, {useState, useEffect} from 'react';
import {Image, Text, View} from 'react-native-ui-lib';
import {RootStackParams, RouteNames} from '../../navigation';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import AppColors from '../../constants/AppColors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppStrings from '../../constants/AppStrings';
import { TouchableOpacity } from 'react-native';
import styles from './styles';
import AppImages from '../../constants/AppImages';
export type FilterScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'FilterScreen'
>;

export type FilterScreenRouteProps = RouteProp<
  RootStackParams,
  'FilterScreen'
>;

interface Props {}

const FilterScreen: React.FC<Props> = () => {
  const navigation = useNavigation<FilterScreenNavigationProps>();
  useEffect(() => {
  }, []);


  return (
    <View flex backgroundColor='#FFFFFF'>
         <View row centerV padding-20 style={styles.topView}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <View style={styles.circle}>
                <Image
                  source={AppImages.ARROW_LEFT}
                  style={{width: 25, height: 25}}
                />
              </View>
            </TouchableOpacity>
            <Text style={styles.filterText}>Filters</Text>
            <Text style={styles.resetText}>Reset</Text>
          </View>

          <View row paddingH-20 paddingV-10 style={styles.topView}>
            <Text style={[styles.titleText,{opacity:1}]}>City</Text>
            <Image source={AppImages.RIGHT_ARROW}/>
          </View>

          <View row paddingH-20 paddingV-10 style={styles.topView}>
            <Text style={[styles.titleText,{opacity:1}]}>Category</Text>
            <Image source={AppImages.RIGHT_ARROW}/>
          </View>

          <View row paddingH-20 paddingV-10 style={styles.topView}>
            <Text style={[styles.titleText,{opacity:1}]}>Make</Text>
            <Image source={AppImages.RIGHT_ARROW}/>
          </View>

          <View row paddingH-20 paddingV-10 style={styles.topView}>
            <Text style={[styles.titleText,{opacity:1}]}>Model</Text>
            <Image source={AppImages.RIGHT_ARROW}/>
          </View>

          <View row paddingH-20 paddingV-10 style={styles.topView}>
            <Text style={[styles.titleText,{opacity:1}]}>Trim</Text>
            <Image source={AppImages.RIGHT_ARROW}/>
          </View>
        </View>
    
  );
};

export default FilterScreen;