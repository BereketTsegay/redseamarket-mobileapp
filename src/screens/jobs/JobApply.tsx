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
import DocumentPicker from 'react-native-document-picker';
import {useNavigation} from '@react-navigation/native';
import {
  FlatList,
  ImageBackground,
  Modal,
  ScrollView,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import AppImages from '../../constants/AppImages';
import AppColors from '../../constants/AppColors';
import InputField from '../../components/InputField';
import styles from './styles';
import {JobApplyContext} from '../../api/jobApply/JobApplyContext';
import {AnyAction, ThunkDispatch} from '@reduxjs/toolkit';
import {RootState} from '../../../store';
import {useDispatch, useSelector} from 'react-redux';
import {JobApplyRequest} from '../../api/jobApply/JobApplyRequest';
import {applyJob, reset} from '../../api/jobApply/JobApplySlice';
const {TextField} = Incubator;
export type JobApplyNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'JobApply'
>;

export type JobApplyRouteProps = RouteProp<RootStackParams, 'JobApply'>;

interface Props {}

const JobApply: React.FC<Props> = ({id}) => {
  const navigation = useNavigation<JobApplyNavigationProps>();
  const [fileSizeError, setFileSizeError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<any | null>(null);
  const {jobApplyInput, setJobApplyInput} = useContext(JobApplyContext);
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const {jobApplyData, loadingApplyJob, jobApplyError} = useSelector(
    (state: RootState) => state.JobApply,
  );
  const [errors, setErrors] = useState({
    total_experience: false,
    current_ctc: false,
    expect_ctc: false,
    notice_period: false,
    relevent_field: false,
    current_company: false,
    cv_file: false,
  });

  useEffect(() => {
    setJobApplyInput({...jobApplyInput, ad_id: id});
  }, [id]);

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
        setJobApplyInput({...jobApplyInput, cv_file: file[0].uri});
        setErrors({...errors, cv_file: false});
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        throw err;
      }
    }
  };

  const apply = () => {
    const hasErrors =
      !jobApplyInput.total_experience ||
      !jobApplyInput.current_ctc ||
      !jobApplyInput.expect_ctc ||
      !jobApplyInput.notice_period ||
    !jobApplyInput.relevent_field ||
      !jobApplyInput.current_company ||
      !jobApplyInput.cv_file;

    if (hasErrors) {
      setErrors({
        total_experience: !jobApplyInput.total_experience,
        current_ctc: !jobApplyInput.current_ctc,
        expect_ctc: !jobApplyInput.expect_ctc,
        notice_period: !jobApplyInput.notice_period,
        relevent_field: !jobApplyInput.relevent_field,
        current_company: !jobApplyInput.current_company,
        cv_file: !jobApplyInput.cv_file,
      });
      return;
    } else {
      const formData = new FormData();
      const keysToAppend = [
        'ad_id',
        'total_experience',
        'current_ctc',
        'expect_ctc',
        'notice_period',
        'relevent_field',
        'current_company',
      ];

      keysToAppend.forEach(key => {
        formData.append(key, jobApplyInput[key] ?? '');
      });

      if (jobApplyInput.cv_file) {
        formData.append('cv_file', {
          uri: jobApplyInput.cv_file,
          name: 'document.pdf',
          type: 'application/pdf',
        });
      } else {
        formData.append('cv_file', '');
      }
      // console.log(formData, '-------------------------');
      dispatch(applyJob({requestBody: formData}))
      .then(() => {
        dispatch(reset());
        setJobApplyInput(new JobApplyRequest())
      })
      .catch((err: any) => console.log(err));
    }
  };

  if (jobApplyData != null) {
    // console.log(jobSaveData)
    if (
      !loadingApplyJob &&
      !jobApplyError &&
      jobApplyData.status == 'success'
    ) {
      ToastAndroid.show(
        JSON.stringify('Job Applied Successfully'),
        ToastAndroid.SHORT,
      );
      navigation.replace(RouteNames.SuccessPage,{status:'JobApply'});
    } else {
      // console.log(jobSaveData,'failure')
      ToastAndroid.show(JSON.stringify('error'), ToastAndroid.SHORT);
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

      <Text style={styles.AdTitle}>Tell us more about you</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View marginV-20>
          <InputField
            title={'Total experience'}
            height={45}
            type={'numeric'}
            value={jobApplyInput.total_experience}
            onChange={text => {
              setJobApplyInput({...jobApplyInput, total_experience: text});
              setErrors({...errors, total_experience: false});
            }}
            trailing={
              errors.total_experience && (
                <Text color={'red'}>required field</Text>
              )
            }
          />

          <InputField
            title={'Current CTC'}
            height={45}
            type={'numeric'}
            value={jobApplyInput.current_ctc}
            onChange={text => {
              setJobApplyInput({...jobApplyInput, current_ctc: text});
              setErrors({...errors, current_ctc: false});
            }}
            trailing={
              errors.current_ctc && <Text color={'red'}>required field</Text>
            }
          />

          <InputField
            title={'Expected CTC'}
            height={45}
            type={'numeric'}
            value={jobApplyInput.expect_ctc}
            onChange={text => {
              setJobApplyInput({...jobApplyInput, expect_ctc: text});
              setErrors({...errors, expect_ctc: false});
            }}
            trailing={
              errors.expect_ctc && <Text color={'red'}>required field</Text>
            }
          />

          <InputField
            title={'Notice period'}
            height={45}
            type={'numeric'}
            value={jobApplyInput.notice_period}
            onChange={text => {
              setJobApplyInput({...jobApplyInput, notice_period: text});
              setErrors({...errors, notice_period: false});
            }}
            trailing={
              errors.notice_period && <Text color={'red'}>required field</Text>
            }
          />

          <InputField
            title={'Relevant field'}
            height={45}
            type={'default'}
            value={jobApplyInput.relevent_field}
            onChange={text => {
              setJobApplyInput({...jobApplyInput, relevent_field: text});
              setErrors({...errors, relevent_field: false});
            }}
            trailing={
              errors.relevent_field && <Text color={'red'}>required field</Text>
            }
          />

          <InputField
            title={'Current company'}
            height={45}
            type={'default'}
            value={jobApplyInput.current_company}
            onChange={text => {
              setJobApplyInput({...jobApplyInput, current_company: text});
              setErrors({...errors, current_company: false});
            }}
            trailing={
              errors.current_company && (
                <Text color={'red'}>required field</Text>
              )
            }
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
                <Text style={styles.fieldText}>Upload Resume</Text>
                {fileSizeError && (
                  <Text style={{color: 'red', fontSize: 8}}>
                    {fileSizeError}
                  </Text>
                )}
                {errors.cv_file && <Text color={'red'}>required field</Text>}
                <Image
                  source={AppImages.UPLOAD}
                  tintColor={AppColors.lightBlue}
                />
              </View>
            </TouchableOpacity>
            <Text style={{color: 'red', fontSize: 8}}>
              *Maximum 500kb file size are allowed
            </Text>
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
                    setJobApplyInput({...jobApplyInput, cv_file: null});
                  }}>
                  <Image
                    source={AppImages.DELETE}
                    style={{left: 10, backgroundColor: 'white'}}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      <Button
        label={'Submit'}
        style={{backgroundColor: AppColors.lightBlue}}
        onPress={apply}
      />
    </View>
  );
};

export default JobApply;
