import React, {useState, useEffect} from 'react';
import {Image, Text, View} from 'react-native-ui-lib';
import {RootStackParams, RouteNames} from '../../navigation';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
export type AdsScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'AdsScreen'
>;

export type AdsScreenRouteProps = RouteProp<
  RootStackParams,
  'AdsScreen'
>;

interface Props {}

const AdsScreen: React.FC<Props> = () => {
  const navigation = useNavigation<AdsScreenNavigationProps>();
  useEffect(() => {
  }, []);

  return (
    <View flex center backgroundColor='#FFFFFF'>
        <Text>AdsScreen</Text>
        </View>
    
  );
};

export default AdsScreen;