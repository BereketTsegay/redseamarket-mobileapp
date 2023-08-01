import React, {useState, useEffect} from 'react';
import {Button, Image, Text, View} from 'react-native-ui-lib';
import {RootStackParams, RouteNames} from '../../navigation';
import {CommonActions, RouteProp} from '@react-navigation/native';
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

const SuccessPage: React.FC<Props> = ({route}) => {
  const {status} = route.params;
  const [title, setTitle] = useState('')
  const navigation = useNavigation<SuccessPageNavigationProps>();
  useEffect(() => {
   if(status == 'PostAd'){
    setTitle('Ad request has been placed successfully')
   }
   else if(status == 'JobApply'){
    setTitle("Job applied successfully")
   }
   else{
    setTitle('')
   }
  }, [status]);

  function resetStackAndNavigate(navigation, routeName) {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: routeName }],
      })
    );
  }

  const letGo = () => {
  if(status == 'PostAd'){
    navigation.replace(RouteNames.BottomTabs, {screen: RouteNames.AdsScreen})
        resetStackAndNavigate(navigation, 'PostListScreen');
  }
  else if(status == 'JobApply'){
    navigation.navigate(RouteNames.BottomTabs, {screen: RouteNames.HomeScreen})
  }
  else
  null;
  }

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
        {title}
      </Text>

      <View center flex>
        <Image source={AppImages.SUCCESS} />
      </View>

      <Button
        label={'Lets go !'}
        labelStyle={[styles.buttonLabelStyle, {color: 'white'}]}
        style={{backgroundColor: AppColors.lightBlue, marginBottom: 40}}
        onPress={letGo}
      />
    </View>
  );
};

export default SuccessPage;
