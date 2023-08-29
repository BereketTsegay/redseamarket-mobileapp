import React, { useState, useEffect, useContext } from 'react';
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
import { JobContext } from '../../api/jobs/JobContext';
import PdfModal from '../../components/PdfModal';
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
  const [showPdf, setShowPdf] = useState(false);
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const {jobInput, setJobInput} = useContext(JobContext)
  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage,
  );
  const strings = useSelector(
    (state: RootState) => state.language.resources[currentLanguage],
  );
  const { jobProfileList, loadingJobProfileList} = useSelector(
    (state: RootState) => state.JobProfileList,
  );
  useEffect(() => {
    list()
  }, []);

  const list = () => {
    dispatch(fetchJobProfileList({ requestBody: '' }));
  }

  const handleViewResume = () => {
    setShowPdf(true);
  };

  const handleClosePdf = () => {
    setShowPdf(false);
  };


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
        {/* <View style={styles.circle}></View> */}
      </View>

      <View
        paddingH-30
        paddingV-10
        row
        style={{
          justifyContent: 'space-between',
        }}>
        <Text style={styles.heading}>{strings.myJobProfile}</Text>
        {/* <View center style={styles.smallButton}>
          <Text style={styles.buttonText}>My Jobs</Text>
        </View> */}
      </View>

      <View flex backgroundColor='white'>
        {loadingJobProfileList ?
        <ActivityIndicator color={AppColors.blue} size={30} />
      :

        <View flex style={styles.insideView}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View paddingB-60>
           
          <Text style={styles.title}>{jobProfileList?.data.title}</Text>
          <Text style={styles.text}>{jobProfileList?.data.work_experience} {strings.yearsExp}</Text>

          <View style={styles.divider}/>

          <Text style={styles.subHeading}>{strings.education}</Text>
          <Text style={styles.text}>{jobProfileList?.data.education}</Text>
          
          <View style={styles.divider}/>
          
          <Text style={styles.subHeading}>{strings.certificates}</Text>
          <Text style={styles.text}>{jobProfileList?.data.certificate}</Text>
          
          <View style={styles.divider}/>
          
          <Text style={styles.subHeading}>{strings.lang}</Text>
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
          
          <Text style={styles.subHeading}>{strings.skills}</Text>
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

          <Text style={styles.subHeading}>{strings.workExperience}</Text>
          {jobProfileList?.data.company.map((item, index) => (
            <View key={index} row style={{justifyContent:'space-between'}}>
              <Text style={styles.text}>{item.company}</Text>
              <Text style={[styles.text,{fontSize:12}]}>{item.from_date} -> {item.to_date}</Text>
              </View>
          ))}

<View style={styles.divider}/>
          
          <View row centerV style={{justifyContent:'space-between'}} marginV-10>
          <Text style={styles.subHeading}>{strings.resume}</Text>
          <TouchableOpacity onPress={handleViewResume}>
          <View  style={styles.cvView}>
          <Text>{jobProfileList?.data.cv_file}</Text>
          </View>
          </TouchableOpacity>
          </View>

          <View style={styles.overView}>
          <Text>{jobProfileList?.data.overview}</Text>
          </View>

             
          </View>
          </ScrollView>

         <View centerV style={{flexDirection:'row',justifyContent:'space-between'}}>
          <Button label={strings.edit} style={styles.button} onPress={()=>{setJobInput({...jobInput, jobprofile_id: jobProfileList?.data.id})
            navigation.navigate('JobProfile',{screen: RouteNames.MyJobProfile})}}/>


            <View row>
              <Image source={AppImages.EYE} style={{width:20,height:20,marginRight:5}}/>
            <Text  style={styles.text}>{jobProfileList?.profile_view}</Text>
            </View>
            </View>
        </View>
}
      </View>

      {showPdf && (
          <PdfModal
          visible={showPdf}
          pdfUrl={'https://admin-jamal.prompttechdemohosting.com/' + jobProfileList?.data.cv_file}
          onClose={handleClosePdf}
          jobStatus={false}
        />
      )}
    </ImageBackground>

  );
};

export default MyJobDetails;


