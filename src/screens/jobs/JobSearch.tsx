import React, {useState, useEffect, useContext} from 'react';
import {Image, Text, View} from 'react-native-ui-lib';
import {RootStackParams, RouteNames} from '../../navigation';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {ActivityIndicator, FlatList, TouchableOpacity} from 'react-native';
import AppImages from '../../constants/AppImages';
import AppFonts from '../../constants/AppFonts';
import {PlaceAdContext} from '../../api/placeAd/PlaceAdContext';
import styles from '../post/styles';
import { CommonContext } from '../../api/commonContext';
export type JobSearchNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'JobSearch'
>;

export type JobSearchRouteProps = RouteProp<
  RootStackParams,
  'JobSearch'
>;

interface Props {}

const JobSearch: React.FC<Props> = ({route}) => {
  const navigation = useNavigation<JobSearchNavigationProps>();
  const {Id, name} = route.params;
  const {commonInput, setCommonInput} = useContext(CommonContext)

  return (
    <View flex backgroundColor="white" paddingV-20>
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
          <Text style={styles.subHeading}>
            Choose the category that your ad fits into.
          </Text>
        </View>
      </View>

      <View>
        <TouchableOpacity onPress={()=>{
              navigation.navigate(RouteNames.CategoryListScreen,{cat_Id:Id,countryId:commonInput.common_country_id})
            }}>
          <View marginH-30 marginV-20>
            <Text style={{fontSize: 14, fontFamily: AppFonts.POPPINS_SEMIBOLD}}>
              Find your job
            </Text>
          </View>
          <View
            style={{borderBottomColor: '#00000029', borderBottomWidth: 1}}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>navigation.navigate(RouteNames.PostSecondScreen,{Id:Id,name:name})}>
          <View marginH-30 marginV-20>
            <Text style={{fontSize: 14, fontFamily: AppFonts.POPPINS_SEMIBOLD}}>
              Hire people
            </Text>
          </View>
          <View
            style={{borderBottomColor: '#00000029', borderBottomWidth: 1}}
          />
        </TouchableOpacity>
       
      </View>

      
    </View>
  );
};

export default JobSearch;
