import React, { useState, useEffect, useContext } from 'react';
import { Image, Text, View } from 'react-native-ui-lib';
import { RootStackParams, RouteNames } from '../../navigation';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native';
import AppImages from '../../constants/AppImages';
import styles from './styles';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { PlaceAdContext } from '../../api/placeAd/PlaceAdContext';
import { getWithAuthCall } from '../../api/apiClient';
import { CommonContext } from '../../api/commonContext';
import AppColors from '../../constants/AppColors';
import { BackHeader } from './BackHeader';
export type PostListScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'PostListScreen'
>;

export type PostListScreenRouteProps = RouteProp<
  RootStackParams,
  'PostListScreen'
>;

interface Props { }

const PostListScreen: React.FC<Props> = () => {
  const navigation = useNavigation<PostListScreenNavigationProps>();
  const { commonInput, setCommonInput } = useContext(CommonContext);
  const { placeAdInput, setPlaceAdInput } = useContext(PlaceAdContext)
  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage,
  );
  const strings = useSelector(
    (state: RootState) => state.language.resources[currentLanguage],
  );
  const { categoryLists, loadingCategoryLists } = useSelector(
    (state: RootState) => state.CategoryList,
  );
  // useEffect(() => {
  //   getWithAuthCall('app/featured')
  //   .then(response=>
  //   {
  //     console.log('featured response', response)
  //     setPlaceAdInput({...placeAdInput, featured:response.data.data})
  //   }
  //     )

  // }, []);

  return (
    <View flex backgroundColor={AppColors.white} padding-20>
      <BackHeader title={strings.listing} sub={strings.chooseCategoryFits} navigation={navigation} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {categoryLists?.data.map((item, index) => (
            <TouchableOpacity
              onPress={() => {
                setPlaceAdInput({
                  ...placeAdInput,
                  category: item.id,
                  category_Name: item.name,
                });
                navigation.navigate(RouteNames.PostSecondScreen);
              }}
              key={index}
              style={styles.tile}
            >
              <View style={styles.tileIconBg}>
                <Image
                  source={
                    item.image == null
                      ? AppImages.PLACEHOLDER
                      : { uri: item.image }
                  }
                  style={styles.tileIcon}
                  resizeMode="contain"
                />
              </View>

              <Text style={styles.tileText} numberOfLines={1}>
                {commonInput.language == 'ar' ? item.arabic_name : item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default PostListScreen;
