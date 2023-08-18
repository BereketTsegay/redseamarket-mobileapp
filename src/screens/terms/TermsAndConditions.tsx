import React, {useState, useEffect} from 'react';
import {Button, Image, Text, View} from 'react-native-ui-lib';
import {RootStackParams, RouteNames} from '../../navigation';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import AppColors from '../../constants/AppColors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppStrings from '../../constants/AppStrings';
import {TouchableOpacity} from 'react-native';
import styles from '../post/styles';
import AppImages from '../../constants/AppImages';
import { apiClient } from '../../api/apiClient';
import AppFonts from '../../constants/AppFonts';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
export type TermsAndConditionsNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'TermsAndConditions'
>;

export type TermsAndConditionsRouteProps = RouteProp<RootStackParams, 'TermsAndConditions'>;

interface Props {}

const TermsAndConditions: React.FC<Props> = () => {
  const navigation = useNavigation<TermsAndConditionsNavigationProps>();
  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage,
  );
  const strings = useSelector(
    (state: RootState) => state.language.resources[currentLanguage],
  );
  const [terms, setTerms] = useState('')
  useEffect(() => {
    apiClient('app/terms/conditions', 'POST', '')
    .then(response=>
        setTerms(response.data.terms[0].terms))
  }, []);


  return (
    <View flex backgroundColor="#FFFFFF" padding-20>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <View style={styles.circle}>
          <Image
            source={AppImages.ARROW_LEFT}
            style={{width: 25, height: 25}}
          />
        </View>
      </TouchableOpacity>

      <Text style={[styles.AdTitle, {}]}>
        {strings.terms}
      </Text>

      <View flex>
        <Text style={{fontSize:16,fontFamily:AppFonts.POPPINS_REGULAR,textAlign:'justify'}}>{terms}</Text>
      </View>

      
    </View>
  );
};

export default TermsAndConditions;
