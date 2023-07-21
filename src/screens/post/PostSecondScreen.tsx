import React, {useState, useEffect} from 'react';
import {Image, Text, View} from 'react-native-ui-lib';
import {RootStackParams, RouteNames} from '../../navigation';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import { ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import AppImages from '../../constants/AppImages';
import styles from './styles';
import { RootState } from '../../../store';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubCategoryList } from '../../api/subCategories/SubCategoryListSlice';
import AppColors from '../../constants/AppColors';
import AppFonts from '../../constants/AppFonts';
export type PostSecondScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'PostSecondScreen'
>;

export type PostSecondScreenRouteProps = RouteProp<
  RootStackParams,
  'PostSecondScreen'
>;

interface Props {}

const PostSecondScreen: React.FC<Props> = ({route}) => {
  const navigation = useNavigation<PostSecondScreenNavigationProps>();
  const {Id,name} = route.params;
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const {subCategoryLists,loadingSubCategoryLists} = useSelector(
    (state: RootState) => state.SubCategoryList
  );
  const [openSubCategories, setOpenSubCategories] = useState([]);

  const handleCategoryPress = (index,item) => {
    if(item.subcategory_child.length != 0){
    setOpenSubCategories((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  }
  else{
    navigation.navigate(RouteNames.PlaceAdScreen,{cat_id:Id,sub_id:item.id,name:name})
  }
  };
  
  

  useEffect(() => {
    let request = JSON.stringify({
      category: Id
    })
    dispatch(fetchSubCategoryList({requestBody: request}));
  }, []);

  const renderItem = ({ item, index }) => {
    const isOpen = openSubCategories[index] || false;
    return (
      <View>
               <TouchableOpacity onPress={() => handleCategoryPress(index,item)}>
               <View row marginH-30 marginV-20>
                <Text style={{fontSize:14,fontFamily:AppFonts.POPPINS_SEMIBOLD}}>{item.name}</Text>
                {item.subcategory_child.length != 0 &&
                <View flex right>
                <Image source={isOpen ? AppImages.ARROW_DOWN :AppImages.RIGHT_ARROW} tintColor={'black'}/>
                </View>}
                </View>
                <View style={{borderBottomColor:'#00000029',borderBottomWidth:1}}/>
                </TouchableOpacity>
                {isOpen && item.subcategory_child.map((childItem)=>(
                <TouchableOpacity onPress={()=>navigation.navigate(RouteNames.PlaceAdScreen,{cat_id:Id,sub_id:childItem.id,name:name})} 
                 key={childItem.id}>
                <View row marginH-30 marginV-20>
                 <Text style={[styles.subHeading,{fontSize:12}]}>{childItem.name}</Text>
                 </View>
                 <View style={{borderBottomColor:'#00000029',borderBottomWidth:1}}/>
                 </TouchableOpacity>))}
                </View>
    )}

  return (
    <View flex backgroundColor='white' paddingV-20>
         <View row paddingH-20>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <View style={styles.circle}>
                <Image
                  source={AppImages.ARROW_LEFT}
                  style={{width: 25, height: 25}}
                />
              </View>
            </TouchableOpacity>
            <View flex center>
            <Text style={styles.heading}>{name}</Text>
            <Text style={styles.subHeading}>Choose the category that your ad fits into.</Text>
            </View>
          </View>

          {loadingSubCategoryLists ?
          <ActivityIndicator color={AppColors.blue} size={30}/>
        :

          <FlatList
          data={subCategoryLists?.subcategories}
          contentContainerStyle={{flex:1,marginTop:20}}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}/>}
        </View>
    
  );
};

export default PostSecondScreen;