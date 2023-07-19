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
export type SuccessPageNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'SuccessPage'
>;

export type SuccessPageRouteProps = RouteProp<RootStackParams, 'SuccessPage'>;

interface Props {}

const SuccessPage: React.FC<Props> = () => {
  const navigation = useNavigation<SuccessPageNavigationProps>();
  useEffect(() => {}, []);

  const Logout = async () => {
    await AsyncStorage.removeItem(AppStrings.ACCESS_TOKEN);
    navigation.replace(RouteNames.WelcomeScreen);
  };

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

      <Text style={[styles.AdTitle, {top: 30}]}>
        Ad Request has been Placed
      </Text>

      <View center flex>
        <Image source={AppImages.SUCCESS} />
      </View>

      <Button
        label={'Lets go !'}
        labelStyle={[styles.buttonLabelStyle, {color: 'white'}]}
        style={{backgroundColor: AppColors.lightBlue, marginBottom: 40}}
        onPress={() => navigation.navigate(RouteNames.SuccessPage)}
      />
    </View>
  );
};

export default SuccessPage;
