import React, {useState, useEffect} from 'react';
import {Image, Text, View} from 'react-native-ui-lib';
import {RootStackParams, RouteNames} from '../../navigation';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
export type PostListScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'PostListScreen'
>;

export type PostListScreenRouteProps = RouteProp<
  RootStackParams,
  'PostListScreen'
>;

interface Props {}

const PostListScreen: React.FC<Props> = () => {
  const navigation = useNavigation<PostListScreenNavigationProps>();
  useEffect(() => {
  }, []);

  return (
    <View flex center>
        <Text>PostListScreen</Text>
        </View>
    
  );
};

export default PostListScreen;