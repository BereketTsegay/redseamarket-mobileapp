import React, {useState, useEffect} from 'react';
import {Image, Text, View} from 'react-native-ui-lib';
import {RootStackParams, RouteNames} from '../../navigation';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {FlatList, ScrollView, TouchableOpacity} from 'react-native';
import AppImages from '../../constants/AppImages';
import styles from './styles';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
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
  const {dashboardLists,loadingDashBoardList} = useSelector(
    (state: RootState) => state.DashBoardList,
  );
  useEffect(() => {}, []);

  return (
    <View flex backgroundColor="white" padding-20>
      <View row>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.circle}>
            <Image
              source={AppImages.ARROW_LEFT}
              style={{width: 25, height: 25}}
            />
          </View>
        </TouchableOpacity>
        <View flex center>
          <Text style={styles.heading}>What are you listing?</Text>
          <Text style={styles.subHeading}>
            Choose the category that your ad fits into.
          </Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {dashboardLists?.data.categories.map((item,index) => (
          <TouchableOpacity
            onPress={() => navigation.navigate(RouteNames.PostSecondScreen,{Id:item.id,name:item.name})}
            key={index}
            style={styles.itemContainer}>
            <Image
          source={
            item.image == null
              ? AppImages.PLACEHOLDER
              : { uri: 'https://admin-jamal.prompttechdemohosting.com/' + item.image }
          }
          style={{width:60, height:40}}
          resizeMode="contain"
        />
            <Text style={styles.title}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      </ScrollView>
    </View>
  );
};

export default PostListScreen;
