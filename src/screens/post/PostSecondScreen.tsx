import React, { useEffect, useContext, useState } from 'react';
import { Image, Text, View } from 'react-native-ui-lib';
import { RootStackParams, RouteNames } from '../../navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import {
  ActivityIndicator,
  BackHandler,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import AppImages from '../../constants/AppImages';
import styles from './styles';
import { RootState } from '../../../store';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubCategoryList } from '../../api/subCategories/SubCategoryListSlice';
import AppColors from '../../constants/AppColors';
import AppFonts from '../../constants/AppFonts';
import { PlaceAdContext } from '../../api/placeAd/PlaceAdContext';
import { BackHeader } from './BackHeader';

export type PostSecondScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'PostSecondScreen'
>;

const PostSecondScreen: React.FC = () => {
  const navigation = useNavigation<PostSecondScreenNavigationProps>();
  const { placeAdInput, setPlaceAdInput } = useContext(PlaceAdContext);

  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const [subCategories, setSubCategories] = useState([]);
  const { loadingSubCategoryLists } = useSelector(
    (state: RootState) => state.SubCategoryList,
  );

  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage,
  );

  const strings = useSelector(
    (state: RootState) => state.language.resources[currentLanguage],
  );

  // ✅ Fetch ONLY first-level subcategories
  useEffect(() => {
    if (placeAdInput.category) {
      let request = JSON.stringify({
        parent_id: placeAdInput.category,
      });
      dispatch(fetchSubCategoryList({ requestBody: request })).then((res: any) => {
        console.log('sub category response', res.payload);
        setSubCategories(res.payload.subCategoryLists.data);
      });
    }
  }, []);

  // ✅ Handle Android back same as header back
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        navigation.goBack();
        return true;
      },
    );

    return () => backHandler.remove();
  }, []);

  // ✅ Handle click → go directly to PlaceAdScreen
  const handleCategoryPress = (item: any) => {
    setPlaceAdInput(prev => ({
      ...prev,
      subcategory: item.id,
      categoryPath: [item], // optional breadcrumb
    }));

    navigation.navigate(RouteNames.PlaceAdScreen);
  };

  // ✅ Render item
  const renderItem = ({ item }: any) => {
    return (
      <TouchableOpacity
        onPress={() => handleCategoryPress(item)}
        activeOpacity={0.85}
        style={styles.card1}
      >
        <View row centerV spread>
          {/* LEFT TEXT */}
          <View>
            <Text style={styles.title}>
              {item.name}
            </Text>
          </View>

          {/* RIGHT ICON */}
          <Image
            source={AppImages.RIGHT_ARROW}
            style={styles.arrow}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View flex backgroundColor={AppColors.white} padding-20>
      {/* Header */}
      <BackHeader title={placeAdInput.category_Name} sub={strings.chooseCategoryFits} navigation={navigation} />

      {/* Content */}
      {loadingSubCategoryLists ? (
        <ActivityIndicator color={AppColors.blue} size={30} />
      ) : (
        <FlatList
          data={subCategories || []}
          contentContainerStyle={{
            marginTop: 20,
            paddingBottom: 20,
          }}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      )}
    </View>
  );
};

export default PostSecondScreen;