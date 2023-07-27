import React, { useState, useEffect } from 'react';
import { Button, Image, Text, View } from 'react-native-ui-lib';
import { RootStackParams, RouteNames } from '../../navigation';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator, ImageBackground, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
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
          <ScrollView showsVerticalScrollIndicator={false}>
            <View paddingB-60>
           
          <Text style={styles.title}>{jobProfileList?.data.title}</Text>
          <Text style={styles.text}>{jobProfileList?.data.work_experience} years total experience</Text>

          <View style={styles.divider}/>

          <Text style={styles.subHeading}>Education</Text>
          <Text style={styles.text}>{jobProfileList?.data.education}</Text>
          
          <View style={styles.divider}/>
          
          <Text style={styles.subHeading}>Certification</Text>
          <Text style={styles.text}>{jobProfileList?.data.certificate}</Text>
          
          <View style={styles.divider}/>
          
          <Text style={styles.subHeading}>Languages Known</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {jobProfileList?.data.language.split(",").map((word, index) => (
            word.length!=0 ?
            <View key={index} style={styles.box}>
            <Text style={styles.boxText}>{word}</Text>
            </View>
            :null
          ))}
          </View>
          
          <View style={styles.divider}/>
          
          <Text style={styles.subHeading}>Skills</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {jobProfileList?.data.skils.split(",").map((word, index) => (
             word.length!=0 ?
             <View key={index} style={styles.box}>
             <Text style={styles.boxText}>{word}</Text>
             </View>
             :null
          ))}
          </View>
          
          <View style={styles.divider}/>

          <Text style={styles.subHeading}>Work Experience</Text>
          {jobProfileList?.data.company.map((item, index) => (
            <View key={index} row style={{justifyContent:'space-between'}}>
              <Text style={styles.text}>{item.company}</Text>
              <Text style={[styles.text,{fontSize:12}]}>{item.from_date} -> {item.to_date}</Text>
              </View>
          ))}

<View style={styles.divider}/>
          
          <View row centerV style={{justifyContent:'space-between'}} marginV-10>
          <Text style={styles.subHeading}>Resume</Text>
          <View  style={styles.cvView}>
          <Text>{jobProfileList?.data.cv_file}</Text>
          </View>
          </View>

          <View style={styles.overView}>
          <Text>{jobProfileList?.data.overview}</Text>
          </View>

             
          </View>
          </ScrollView>

          <Button label={'Edit'} style={styles.button} onPress={()=>navigation.navigate(RouteNames.MyJobProfile,{id:jobProfileList?.data.id})}/>
        </View>
}
      </View>


    </ImageBackground>

  );
};

export default MyJobDetails;


