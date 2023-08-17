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
import {AnyAction, ThunkDispatch} from '@reduxjs/toolkit';
import {RootState} from '../../../store';
import {useDispatch, useSelector} from 'react-redux';
import {ProfileEditRequest} from '../../api/profile/ProfileEditRequest';
import ItemDropdown from '../../components/ItemDropdown';
import {UpdateProfile, reset} from '../../api/profile/ProfileEditSlice';
import {fetchProfileDetails} from '../../api/profile/ProfileDetailsSlice';
const {TextField} = Incubator;
export type EditProfileNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'EditProfile'
>;

export type EditProfileRouteProps = RouteProp<RootStackParams, 'EditProfile'>;

interface Props {}

const EditProfile: React.FC<Props> = () => {
  const navigation = useNavigation<EditProfileNavigationProps>();
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const [EditInput, setEditInput] = useState<ProfileEditRequest>(
    new ProfileEditRequest(),
  );
  const {countryLists} = useSelector((state: RootState) => state.CountryList);
  const {EditData, loadingEdit, EditingError} = useSelector(
    (state: RootState) => state.ProfileEdit,
  );
  const {profileDetails} = useSelector(
    (state: RootState) => state.ProfileDetails,
  );
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    phone: false,
    nationality: false,
  });
  useEffect(() => {
    setItems();
  }, []);

  const setItems = () => {
    const item = profileDetails?.data.user;
    setEditInput({
      ...EditInput,
      name: item?.name,
      email: item?.email,
      phone: item?.phone && item.phone,
      nationality: item?.nationality_id && Number(item.nationality_id),
      image:
        item?.image &&
        'https://admin-jamal.prompttechdemohosting.com/' + item.image,
    });
  };

  const openDocumentFile = async () => {
    try {
      const img = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
        allowMultiSelection: true,
      });
      setEditInput({...EditInput, image: img[0].uri});
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        throw err;
      }
    }
  };

  const setCountry = (value: any) => {
    setEditInput({...EditInput, nationality: value});
    setErrors({...errors, nationality: false});
  };

  const Update = () => {
    const hasErrors =
      !EditInput.name ||
      !EditInput.email ||
      !EditInput.phone ||
      !EditInput.nationality;

    if (hasErrors) {
      setErrors({
        name: !EditInput.name,
        email: !EditInput.email,
        phone: !EditInput.phone,
        nationality: !EditInput.nationality,
      });
      return;
    } else {
      const formData = new FormData();
      formData.append('name', EditInput.name);
      formData.append('email', EditInput.email);
      formData.append('phone', EditInput.phone);
      formData.append('nationality', EditInput.nationality);

      if (EditInput.image) {
        formData.append('image', {
          uri: EditInput.image,
          name: 'image.png',
          type: 'image/png',
        });
      } else {
        formData.append('image', '');
      }
      console.log(formData, '-------------------------');
      dispatch(UpdateProfile({requestBody: formData}))
        .then(() => {
          dispatch(reset());
          dispatch(fetchProfileDetails({requestBody: ''}));
          setEditInput(new ProfileEditRequest());
        })
        .catch((err: any) => console.log(err));
    }
  };

  if (EditData != null) {
    // console.log(jobSaveData)
    if (!loadingEdit && !EditingError && EditData.status == 'success') {
      ToastAndroid.show(JSON.stringify(EditData.message), ToastAndroid.SHORT);
      navigation.goBack();
    } else {
      // console.log(jobSaveData,'failure')
      ToastAndroid.show(EditData.message, ToastAndroid.SHORT);
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

      <Text style={styles.AdTitle}>Edit your profile</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View marginV-10>
          <TouchableOpacity onPress={openDocumentFile}>
            <View style={styles.imageView}>
              <Image
                source={
                  EditInput.image
                    ? {uri: EditInput.image}
                    : AppImages.PLACEHOLDER
                }
                style={{width: 80, height: 80, borderRadius: 40}}
              />
            </View>
          </TouchableOpacity>
          <View marginT-20>
            <InputField
              label={'Name'}
              title={'Enter name'}
              height={45}
              type={'default'}
              value={EditInput.name}
              onChange={text => {
                setEditInput({...EditInput, name: text});
                setErrors({...errors, name: false});
              }}
              trailing={
                errors.name && <Text color={'red'}>required field</Text>
              }
            />

            <InputField
              label={'Email'}
              title={'Enter email'}
              height={45}
              type={'default'}
              value={EditInput.email}
              onChange={text => {
                setEditInput({...EditInput, email: text});
                setErrors({...errors, email: false});
              }}
              trailing={
                errors.email && <Text color={'red'}>required field</Text>
              }
            />

            <InputField
              label={'Phone'}
              title={'Enter phone'}
              height={45}
              type={'numeric'}
              value={EditInput.phone}
              onChange={text => {
                setEditInput({...EditInput, phone: text});
                setErrors({...errors, phone: false});
              }}
              trailing={
                errors.phone && <Text color={'red'}>required field</Text>
              }
            />
            <View>
              {errors.nationality && (
                <Text style={{alignSelf: 'flex-end'}} color={'red'}>
                  required field
                </Text>
              )}
              <Text style={styles.labelStyle}>Country</Text>
              <ItemDropdown
                value={EditInput.nationality}
                data={countryLists?.country}
                add={setCountry}
                dropdownType="Nationality"
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <Button
        label={'Submit'}
        style={{backgroundColor: AppColors.lightBlue}}
        onPress={Update}
      />
    </View>
  );
};

export default EditProfile;
