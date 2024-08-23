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
import {
  FlatList,
  ImageBackground,
  Modal,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import AppImages from '../../constants/AppImages';
import AppColors from '../../constants/AppColors';
import ItemDropdown from '../../components/ItemDropdown';
import InputField from '../../components/InputField';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../store';
import SheetModal from '../../components/SheetModal';
import {JobContext} from '../../api/jobs/JobContext';
import {AnyAction, ThunkDispatch} from '@reduxjs/toolkit';
import {fetchStateList} from '../../api/country/StateListSlice';
import {fetchCityList} from '../../api/country/CityListSlice';
import {createJobProfile, reset} from '../../api/jobs/JobProfileSaveSlice';
import {JobRequest} from '../../api/jobs/JobRequest';
import moment from 'moment';
import {
  UpdateReset,
  updateJobProfile,
} from '../../api/jobs/JobProfileUpdateSlice';
import { showToast } from '../../constants/commonUtils';
const {TextField} = Incubator;
export type MyJobProfileNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'MyJobProfile'
>;

export type MyJobProfileRouteProps = RouteProp<RootStackParams, 'MyJobProfile'>;

interface Props {}

const MyJobProfile: React.FC<Props> = ({route}) => {
  const navigation = useNavigation<MyJobProfileNavigationProps>();
  const [fileSizeError, setFileSizeError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<any | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const {jobInput, setJobInput} = useContext(JobContext);
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const {jobSaveData, loadingSavedJob, jobSaveError} = useSelector(
    (state: RootState) => state.JobProfileSave,
  );
  const {jobUpdateData, loadingUpdateJob, jobUpdateError} = useSelector(
    (state: RootState) => state.JobProfileUpdate,
  );
  const {countryLists} = useSelector((state: RootState) => state.CountryList);
  const {stateLists} = useSelector((state: RootState) => state.StateList);
  const {cityLists} = useSelector((state: RootState) => state.CityList);
  const {jobProfileList} = useSelector(
    (state: RootState) => state.JobProfileList,
  );
  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage,
  );
  const strings = useSelector(
    (state: RootState) => state.language.resources[currentLanguage],
  );
  useEffect(() => {
    let request = JSON.stringify({
      country: jobInput.country_id,
    });
    dispatch(fetchStateList({requestBody: request}));
  }, [jobInput.country_id]);

  useEffect(() => {
    let request = JSON.stringify({
      state: jobInput.state_id,
    });
    dispatch(fetchCityList({requestBody: request}));
  }, [jobInput.state_id]);

  useEffect(() => {
    if (jobInput.jobprofile_id != null) {
      setValues();
    } else {
      null;
    }
  }, []);

  const setValues = async () => {
    const item = jobProfileList?.data;
    setJobInput({
      ...jobInput,
      jobprofile_id: item?.id,
      title: item?.title,
      work_experience: item?.work_experience,
      company: item?.company,
      education: item?.education,
      certificate: item?.certificate,
      language: item?.language,
      skils: item?.skils,
      cv_file: null,
      country_id: item?.country_id,
      overview: item?.overview,
      state_id: item?.state_id,
      city_id: item?.city_id,
    });
    setSelectedFile(item?.cv_file);
  };

  const openDocumentFile = async () => {
    try {
      const file = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
        allowMultiSelection: true,
      });
      const maxSizeInBytes = 500 * 1024; // 500kb in bytes
      if (file.some(item => item.size > maxSizeInBytes)) {
        setFileSizeError('File size exceeds 500kb limit');
      } else {
        setFileSizeError(null);
        setSelectedFile(file[0].name);
        setJobInput({...jobInput, cv_file: file[0].uri});
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        throw err;
      }
    }
  };

  const closeSheet = () => {
    setSheetOpen(false);
  };

  const setCountry = (value: any) => {
    setJobInput({...jobInput, country_id: value});
  };

  const setState = (value: any) => {
    setJobInput({...jobInput, state_id: value});
  };
  const setCity = (value: any) => {
    setJobInput({...jobInput, city_id: value});
  };

  const addCompany = (name: any, from: any, to: any) => {
    setJobInput({
      ...jobInput,
      company: [
        ...jobInput.company,
        {from_date: from, to_date: to, company: name},
      ],
    });
  };

  const deleteCompany = (index: number) => {
    const updatedCompanies = jobInput.company.filter((_, idx) => idx !== index);
    setJobInput({
      ...jobInput,
      company: updatedCompanies,
    });
  };

  const submit = () => {
    const formData = new FormData();
    if (jobInput.jobprofile_id != null) {
      formData.append('jobprofile_id', jobInput.jobprofile_id);
    }

    const keysToAppend = [
      'education',
      'certificate',
      'language',
      'skils',
      'overview',
      'country_id',
      'state_id',
      'city_id',
      'work_experience',
      'title',
    ];

    keysToAppend.forEach(key => {
      formData.append(key, jobInput[key] ?? '');
    });

    if (jobInput.cv_file) {
      formData.append('cv_file', {
        uri: jobInput.cv_file,
        name: 'document.pdf',
        type: 'application/pdf',
      });
    } else {
      formData.append('cv_file', '');
    }

    for (let i = 0; i < jobInput.company.length; i++) {
      formData.append(
        `company[${i}][from_date]`,
        moment(jobInput.company[i].from_date, 'DD-MM-YYYY').format('YYYY-MM'),
      );
      formData.append(
        `company[${i}][to_date]`,
        jobInput.company[i].to_date == 'Present'
          ? jobInput.company[i].to_date
          : moment(jobInput.company[i].to_date, 'DD-MM-YYYY').format('YYYY-MM'),
      );
      formData.append(`company[${i}][company]`, jobInput.company[i].company);
    }
    // console.log(formData, '-------------------------');
    if (jobInput.jobprofile_id == null) {
      dispatch(createJobProfile({requestBody: formData}))
        .then(() => {
          dispatch(reset());
          setJobInput(new JobRequest());
        })
        .catch((err: any) => console.log(err));
    } else {
      dispatch(updateJobProfile({requestBody: formData}))
        .then(() => {
          dispatch(UpdateReset());
          // setJobInput(new JobRequest())
        })
        .catch((err: any) => console.log(err));
    }
  };

  if (jobSaveData != null) {
    // console.log(jobSaveData)
    if (!loadingSavedJob && !jobSaveError && jobSaveData.status == 'success') {
    showToast('Profile Added Successfully')
      navigation.replace('JobProfile', {screen: RouteNames.MyJobDetails});
    } else {
      // console.log(jobSaveData,'failure')
      showToast(JSON.stringify('error'))
    }
  }

  if (jobUpdateData != null) {
    if (
      !loadingUpdateJob &&
      !jobUpdateError &&
      jobUpdateData.status == 'success'
    ) {
      showToast('Profile Updated Successfully')
      navigation.replace('JobProfile', {screen: RouteNames.MyJobDetails});
    } else {
      showToast(JSON.stringify('error'))
    }
  }

  return (
    <View flex backgroundColor="white" padding-20>
      <View row centerV>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <View style={styles.circle}>
            <Image
              source={AppImages.ARROW_LEFT}
              style={{width: 25, height: 25}}
            />
          </View>
        </TouchableOpacity>
      </View>

      <Text style={styles.AdTitle}>{strings.addJobProfile}</Text>

      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled'>
        <View marginV-20>
          <InputField
            label={strings.jobTitle}
            title={strings.enterJobTitle}
            height={45}
            type={'default'}
            value={jobInput.title}
            onChange={text => setJobInput({...jobInput, title: text})}
          />

          <InputField
            label={strings.addWork}
            title={strings.enterWork}
            height={45}
            type={'numeric'}
            value={jobInput.work_experience}
            onChange={text => setJobInput({...jobInput, work_experience: text})}
          />

          <TouchableOpacity onPress={() => setSheetOpen(!sheetOpen)}>
            <View centerV style={styles.companyView}>
              <Text style={styles.fieldText}>{strings.addCompany}</Text>
              <View style={styles.addCircle}>
                <Image
                  source={AppImages.ADD}
                  tintColor={AppColors.lightBlue}
                  style={{width: 12, height: 12}}
                />
              </View>
            </View>
          </TouchableOpacity>

          {jobInput.company != null &&
            jobInput.company.map((companyData, index) => (
              <View key={index} paddingB-10>
                <Text style={styles.fieldText}>{companyData.company}</Text>
                <Text style={styles.fieldText}>
                  {companyData.from_date} - {companyData.to_date}
                </Text>
                <TouchableOpacity onPress={() => deleteCompany(index)}>
                  <Text style={{color: 'red'}}>Delete</Text>
                </TouchableOpacity>
              </View>
            ))}

          <InputField
            label={strings.education}
            title={strings.enterEducation}
            height={45}
            value={jobInput.education}
            onChange={text => setJobInput({...jobInput, education: text})}
          />

          <InputField
            label={strings.certifications}
            title={strings.enterCertifications}
            height={45}
            value={jobInput.certificate}
            onChange={text => setJobInput({...jobInput, certificate: text})}
          />

          <InputField
            label={strings.lang}
            title={strings.enterLang}
            height={45}
            value={jobInput.language}
            onChange={text => setJobInput({...jobInput, language: text})}
          />

          <InputField
            label={strings.skills}
            title={strings.skills}
            height={45}
            value={jobInput.skils}
            onChange={text => setJobInput({...jobInput, skils: text})}
          />
          <View marginB-20>
            <TouchableOpacity onPress={() => openDocumentFile()}>
              <View
                paddingH-15
                centerV
                row
                style={[
                  styles.fieldStyle,
                  {borderStyle: 'dashed', justifyContent: 'space-between'},
                ]}>
                <Text style={styles.fieldText}>{strings.uploadResume}</Text>
                {fileSizeError && (
                  <Text style={{color: 'red', fontSize: 8}}>
                    {fileSizeError}
                  </Text>
                )}
                <Image
                  source={AppImages.UPLOAD}
                  tintColor={AppColors.lightBlue}
                />
              </View>
            </TouchableOpacity>
            <Text style={{color: 'red', fontSize: 8}}>*{strings.maxFiles}</Text>
            {selectedFile && (
              <View
                row
                style={{
                  borderColor: 'grey',
                  borderWidth: 1,
                  padding: 5,
                  width: '50%',
                  borderRadius: 5,
                }}>
                <Text>{selectedFile}</Text>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedFile(null);
                    setJobInput({...jobInput, cv_file: null});
                  }}>
                  <Image
                    source={AppImages.DELETE}
                    style={{left: 10, backgroundColor: 'white'}}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View>
            <View>
              <Text style={styles.labelStyle}>{strings.country}</Text>

              <ItemDropdown
                value={jobInput.country_id}
                data={countryLists?.country}
                add={setCountry}
                dropdownType={strings.country}
              />
            </View>

            <InputField
              label={strings.overview}
              title={strings.describe}
              height={100}
              value={jobInput.overview}
              onChange={text => setJobInput({...jobInput, overview: text})}
            />

            <View>
              <Text style={styles.labelStyle}>{strings.state}</Text>
              <ItemDropdown
                value={jobInput.state_id}
                data={stateLists?.state}
                add={setState}
                dropdownType={strings.state}
              />
            </View>

            <View>
              <Text style={styles.labelStyle}>{strings.city}</Text>
              <ItemDropdown
                value={jobInput.city_id}
                data={cityLists?.city}
                add={setCity}
                dropdownType={strings.city}
              />
            </View>

            <Button
              label={strings.submit}
              style={{backgroundColor: AppColors.lightBlue}}
              onPress={submit}
            />
          </View>
        </View>
      </ScrollView>

      {sheetOpen && <SheetModal closeSheet={closeSheet} set={addCompany} />}
    </View>
  );
};

export default MyJobProfile;
