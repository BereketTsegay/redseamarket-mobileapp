import React, { useState, useEffect } from 'react';
import { Button, Image, Text, View } from 'react-native-ui-lib';
import { RootStackParams, RouteNames } from '../../navigation';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import AppColors from '../../constants/AppColors';
import AppImages from '../../constants/AppImages';
import AppFonts from '../../constants/AppFonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppStrings from '../../constants/AppStrings';
import styles from './styles';
import { RootState } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { fetchJobProfileList } from '../../api/jobs/JobProfileListSlice';
export type MyJobDetailsNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'MyJobDetails'
>;

export type MyJobDetailsRouteProps = RouteProp<
  RootStackParams,
  'MyJobDetails'
>;

interface Props { }

const MyJobDetails: React.FC<Props> = () => {
  const navigation = useNavigation<MyJobDetailsNavigationProps>();
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const { jobProfileList, loadingJobProfileList} = useSelector(
    (state: RootState) => state.JobProfileList,
  );
  useEffect(() => {
    list()
  }, []);

  const list = () => {
    dispatch(fetchJobProfileList({ requestBody: '' }));
  }



  return (
    <ImageBackground
      source={AppImages.BG} style={{ flex: 1 }}>
      <View
        row
        padding-20
        style={{
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.circle}>
            <Image
              source={AppImages.ARROW_LEFT}
              style={{ width: 25, height: 25 }}
            />
          </View>
        </TouchableOpacity>
        <View style={styles.circle}></View>
      </View>

      <View
        paddingH-30
        paddingV-10
        row
        style={{
          justifyContent: 'space-between',
        }}>
        <Text style={styles.heading}>My Job Profile</Text>
        <View center style={styles.smallButton}>
          <Text style={styles.buttonText}>My Jobs</Text>
        </View>
      </View>

      <View flex backgroundColor='white'>
        {loadingJobProfileList ?
        <ActivityIndicator color={AppColors.blue} size={30} />
      :

        <View flex style={styles.insideView}>
          <Text>{jobProfileList?.data.title}</Text>
          <Text>Education</Text>
          <Text>{jobProfileList?.data.education}</Text>
          <Text>Certification</Text>
          <Text>{jobProfileList?.data.certificate}</Text>
          <Text>Languages Known</Text>
          {jobProfileList?.data.language.split(",").map((word, index) => (
            <Text key={index}>{word}</Text>
          ))}
          <Text>Skills</Text>
          {jobProfileList?.data.skils.split(",").map((word, index) => (
            <Text key={index}>{word}</Text>
          ))}
          <Text>Resume</Text>
          <Text>{jobProfileList?.data.overview}</Text>
        </View>
}
      </View>


    </ImageBackground>

  );
};

export default MyJobDetails;


