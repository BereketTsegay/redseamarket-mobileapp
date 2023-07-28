import React, {useState, useEffect, useContext} from 'react';
import {
  Button,
  Checkbox,
  Image,
  Incubator,
  Text,
  View,
} from 'react-native-ui-lib';
import {RootStackParams, RouteNames} from '../../navigation';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {FlatList, ImageBackground, Modal, ScrollView, TextInput, ToastAndroid, TouchableOpacity} from 'react-native';
import AppImages from '../../constants/AppImages';
import AppColors from '../../constants/AppColors';
import InputField from '../../components/InputField';
import styles from './styles';
const {TextField} = Incubator;
export type JobApplyNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'JobApply'
>;

export type JobApplyRouteProps = RouteProp<
  RootStackParams,
  'JobApply'
>;

interface Props {}

const JobApply: React.FC<Props> = ({}) => {
  const navigation = useNavigation<JobApplyNavigationProps>();

  return (
    <View flex backgroundColor="white" padding-20>
      <View row centerV>
        <TouchableOpacity onPress={() => {navigation.goBack()}}>
          <View style={styles.circle}>
            <Image
              source={AppImages.ARROW_LEFT}
              style={{width: 25, height: 25}}
            />
          </View>
        </TouchableOpacity>
      </View>

      <Text style={styles.AdTitle}>Tell us more about you</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View marginV-20>
          <InputField
            title={'Total experience'}
            height={45}
            type={'default'}
            value={null}
            onChange={null}
          />

<InputField
            title={'Current CTC'}
            height={45}
            type={'numeric'}
            value={null}
            onChange={null}
          />

<InputField
            title={'Expected CTC'}
            height={45}
            type={'default'}
            value={null}
            onChange={null}
          />

<InputField
            title={'Notice period'}
            height={45}
            type={'numeric'}
            value={null}
            onChange={null}
          />

<InputField
            title={'Relevant field'}
            height={45}
            type={'numeric'}
            value={null}
            onChange={null}
          />

<InputField
            title={'Current company'}
            height={45}
            type={'default'}
            value={null}
            onChange={null}
          />


          
        </View>
      </ScrollView>
      <Button
            label={'Submit'}
            style={{backgroundColor: AppColors.lightBlue}}
          />
    </View>
  );
};

export default JobApply;
