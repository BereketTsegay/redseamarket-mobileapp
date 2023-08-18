import React, { useState, useEffect, useContext } from 'react';
import { Button, Image, Text, View } from 'react-native-ui-lib';
import { RootStackParams, RouteNames } from '../../navigation';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator, Alert, ImageBackground, Linking, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import AppImages from '../../constants/AppImages';
import styles from './styles';
import { RootState } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import AppFonts from '../../constants/AppFonts';
import Pdf from 'react-native-pdf';
import PdfModal from '../../components/PdfModal';
export type HiringJobDetailsNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'HiringJobDetails'
>;

export type HiringJobDetailsRouteProps = RouteProp<
  RootStackParams,
  'HiringJobDetails'
>;

interface Props { }

const HiringJobDetails: React.FC<Props> = ({route}) => {
  const navigation = useNavigation<HiringJobDetailsNavigationProps>();
  const [showPdf, setShowPdf] = useState(false);
  const {hiringJobList, loadingHiringJobList, hiringJobListError} = useSelector(
    (state: RootState) => state.HiringJob,
  );
  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage,
  );
  const strings = useSelector(
    (state: RootState) => state.language.resources[currentLanguage],
  );
  const {index} = route.params;

  useEffect(() => {
  }, []);

  const openCall = number => {
    Linking.openURL(`tel:${number}`);
  };
  
  const openMail = mail => {
    const mailtoLink = `mailto:${mail}`;
    Linking.openURL(mailtoLink).catch(() => {
      Alert.alert('No email app found on the device');
    });
  };

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
        marginB-20
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

      <View flex backgroundColor='white' padding-20>
      <View row marginB-20>
        <Image 
        source={hiringJobList?.data[index].user.image ? {uri:'https://admin-jamal.prompttechdemohosting.com/' + hiringJobList?.data[index].user.image} : AppImages.PLACEHOLDER} 
        style={{width:70, height:70}}/>

        <View marginL-20>
            <Text style={styles.priceText}>{hiringJobList?.data[index].user.name}</Text>
            <Text style={styles.titleText}>{hiringJobList?.data[index].title}</Text>
            <Button
                label={'View Resume'}
                onPress={handleViewResume}
                labelStyle={{
                  color: 'white',
                  fontSize: 14,
                  fontFamily: AppFonts.POPPINS_MEDIUM,
                }}
                style={[styles.callButton,{width:'80%'}]}
              />
        </View>
      </View>

      <Text style={styles.subHeading}>{strings.details}</Text>
            <View style={styles.row}>
              <Text style={styles.motorText}>{strings.workExperience}</Text>
              <Text style={styles.motorText1}>{hiringJobList?.data[index].work_experience} years</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.motorText}>{strings.education}</Text>
              <Text style={styles.motorText1}>{hiringJobList?.data[index].education}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.motorText}>{strings.certificates}</Text>
              <Text style={styles.motorText1}>{hiringJobList?.data[index].certificate}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.motorText}>{strings.lang}</Text>
              <Text style={styles.motorText1}>{hiringJobList?.data[index].language}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.motorText}>{strings.skills}</Text>
              <Text style={styles.motorText1}>{hiringJobList?.data[index].skils}</Text>
            </View>

            <Text style={[styles.subHeading,{marginTop:20}]}>{strings.description}</Text>
                <Text
                  style={[
                    styles.subHeading,
                    {fontFamily: AppFonts.POPPINS_REGULAR},
                  ]}>
                  {hiringJobList?.data[index].overview}
                </Text>
                {showPdf && (
          <PdfModal
          visible={showPdf}
          pdfUrl={'https://admin-jamal.prompttechdemohosting.com/' + hiringJobList?.data[index].cv_file}
          onClose={handleClosePdf}
          jobStatus={false}
        />
      )}
                
      </View>
     
      <View style={styles.buttonView}>
              <Button
                label={strings.call}
                onPress={() =>
                  openCall(hiringJobList?.data[index].user.phone)
                }
                labelStyle={{
                  color: 'white',
                  fontSize: 14,
                  fontFamily: AppFonts.POPPINS_MEDIUM,
                }}
                style={styles.callButton}
              />
              <Button
                label={strings.mail}
                onPress={() =>
                  openMail(hiringJobList?.data[index].user.email)
                }
                labelStyle={{
                  color: 'black',
                  fontSize: 14,
                  fontFamily: AppFonts.POPPINS_MEDIUM,
                }}
                style={styles.mailButton}
              />
            </View>

    </ImageBackground>

  );
};

export default HiringJobDetails;


