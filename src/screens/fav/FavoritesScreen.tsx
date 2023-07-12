import React, {useState, useEffect} from 'react';
import {Image, Text, View} from 'react-native-ui-lib';
import {RootStackParams, RouteNames} from '../../navigation';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
export type FavoritesScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'FavoritesScreen'
>;

export type FavoritesScreenRouteProps = RouteProp<
  RootStackParams,
  'FavoritesScreen'
>;

interface Props {}

const FavoritesScreen: React.FC<Props> = () => {
  const navigation = useNavigation<FavoritesScreenNavigationProps>();
  useEffect(() => {
  }, []);

  return (
    <View flex center backgroundColor='#FFFFFF'>
        <Text>FavoritesScreen</Text>
        </View>
    
  );
};

export default FavoritesScreen;