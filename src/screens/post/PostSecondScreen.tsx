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
console.log('place ad input in second screen', placeAdInput);
  // ✅ Render item
  const renderItem = ({ item }: any) => {
    return (
      <TouchableOpacity onPress={() => handleCategoryPress(item)}>
        <View row marginH-30 marginV-20>
          <Text
            style={{
              fontSize: 14,
              fontFamily: AppFonts.POPPINS_SEMIBOLD,
            }}>
            {item.name}
          </Text>
        </View>

        <View
          style={{
            borderBottomColor: '#00000029',
            borderBottomWidth: 1,
          }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View flex backgroundColor="white" paddingV-20>
      {/* Header */}
      <View row paddingH-20>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.circle}>
            <Image
              source={AppImages.ARROW_LEFT}
              style={{ width: 25, height: 25 }}
            />
          </View>
        </TouchableOpacity>

        <View flex center>
          <Text style={styles.heading}>
            {placeAdInput.category_Name}
          </Text>
          <Text style={styles.subHeading}>
            {strings.chooseCategoryFits}
          </Text>
        </View>
      </View>

      {/* Content */}
      {loadingSubCategoryLists ? (
        <ActivityIndicator color={AppColors.blue} size={30} />
      ) : (
        <FlatList
          data={subCategories || []}
          contentContainerStyle={{ marginTop: 20 }}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      )}
    </View>
  );
};

export default PostSecondScreen;