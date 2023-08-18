import React, {useState, useEffect, useContext} from 'react';
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
import { PlaceAdContext } from '../../api/placeAd/PlaceAdContext';
import { getWithAuthCall } from '../../api/apiClient';
import { CommonContext } from '../../api/commonContext';
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
  const {commonInput, setCommonInput} = useContext(CommonContext);
  const {placeAdInput, setPlaceAdInput} = useContext(PlaceAdContext)
  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage,
  );
  const strings = useSelector(
    (state: RootState) => state.language.resources[currentLanguage],
  );
  const {dashboardLists,loadingDashBoardList} = useSelector(
    (state: RootState) => state.DashBoardList,
  );
  useEffect(() => {
    getWithAuthCall('app/featured')
    .then(response=>
      setPlaceAdInput({...placeAdInput, featured:response.data.data})
      )
      
  }, []);

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
          <Text style={styles.heading}>{strings.listing}</Text>
          <Text style={styles.subHeading}>
            {strings.chooseCategoryFits}
          </Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {dashboardLists?.data.categories.map((item,index) => (
          <TouchableOpacity
            onPress={() => {setPlaceAdInput({...placeAdInput, category:item.id, category_Name: item.name})
              navigation.navigate(RouteNames.PostSecondScreen)}}
            key={index}
            style={styles.itemContainer}>
            <Image
          source={
            item.image == null
              ? AppImages.PLACEHOLDER
              : { uri: 'https://admin-jamal.prompttechdemohosting.com/' + item.image }
          }
          style={{width:60, height:60}}
          resizeMode="contain"
        />
            <Text style={styles.title}>{commonInput.language == 'ar' ? item.arabic_name : item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      </ScrollView>
    </View>
  );
};

export default PostListScreen;
