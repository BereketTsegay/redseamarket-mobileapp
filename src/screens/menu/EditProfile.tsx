import React, {useState, useEffect} from 'react';
import {Button, Image, Text, View} from 'react-native-ui-lib';
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigation';
import AppImages from '../../constants/AppImages';
import AppColors from '../../constants/AppColors';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../store';
import {ProfileEditRequest} from '../../api/profile/ProfileEditRequest';
import {UpdateProfile, reset} from '../../api/profile/ProfileEditSlice';
import {showToast} from '../../constants/commonUtils';
import {pick, types} from '@react-native-documents/picker';
import {AnyAction, ThunkDispatch} from '@reduxjs/toolkit';

// ✅ NEW LIB
import {CountryPicker} from 'react-native-country-codes-picker';

export type EditProfileNavigationProps =
  NativeStackNavigationProp<RootStackParams, 'EditProfile'>;

const EditProfile: React.FC = () => {
  const navigation = useNavigation<EditProfileNavigationProps>();
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();

  const [EditInput, setEditInput] = useState(new ProfileEditRequest());

  const [showPicker, setShowPicker] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState<any>({
    name: 'UAE',
    dial_code: '+971',
    code: 'AE',
  });

  const {EditData, loadingEdit, EditingError} = useSelector(
    (state: RootState) => state.ProfileEdit,
  );

  const {profileDetails} = useSelector(
    (state: RootState) => state.ProfileDetails,
  );

  const strings = useSelector(
    (state: RootState) =>
      state.language.resources[state.language.currentLanguage],
  );

  // ✅ LOAD DATA
  useEffect(() => {
    if (profileDetails?.data) {
      const item = profileDetails.data;

      const code = item?.phone_code || '971';

      setEditInput({
        name: item?.name || '',
        email: item?.email || '',
        phone_code: code,
        phone_number: String(item?.phone_number || ''),
        nationality: item?.nationality || '',
        image: item?.profile_picture || null,
      });

      setSelectedCountry({
        name: item?.nationality || 'UAE',
        dial_code: `${code}`,
        code: 'AE',
      });
    }
  }, [profileDetails]);

  // ✅ TOAST
  useEffect(() => {
    if (!loadingEdit && EditData) {
      if (!EditingError && EditData.status === 'success') {
        showToast(EditData.message);
        dispatch(reset());
        navigation.goBack();
      } else {
        showToast(EditData.message);
      }
    }
  }, [EditData]);

  // ✅ IMAGE PICKER
  const openDocumentFile = async () => {
    try {
      const img = await pick({type: [types.images]});
      setEditInput({...EditInput, image: img[0].uri});
    } catch {
      showToast('User cancelled image picker');
    }
  };

  // ✅ UPDATE
  const Update = () => {
    if (
      !EditInput.name ||
      !EditInput.email ||
      !EditInput.phone_number ||
      !EditInput.nationality
    ) {
      showToast('Please fill all fields');
      return;
    }

    const formData = new FormData();
    formData.append('name', EditInput.name);
    formData.append('email', EditInput.email);
    formData.append('phone', EditInput.phone_number);
    formData.append('phone_code', EditInput.phone_code);
    formData.append('nationality', EditInput.nationality);

    if (EditInput.image) {
      formData.append('image', {
        uri: EditInput.image,
        name: 'image.jpg',
        type: 'image/jpeg',
      } as any);
    }

    dispatch(UpdateProfile({requestBody: formData}));
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.backBtn}>
            <Image source={AppImages.ARROW_LEFT} style={{width: 20, height: 20}} />
          </View>
        </TouchableOpacity>
        <Text style={styles.header}>{strings.editProfile}</Text>
      </View>

      <ScrollView>
        <View style={styles.card}>
          {/* IMAGE */}
          <TouchableOpacity 
          // onPress={openDocumentFile}
          >
            <View style={styles.avatarWrapper}>
              <Image
                source={
                  EditInput.image
                    ? {uri: EditInput.image}
                    : AppImages.PLACEHOLDER
                }
                style={styles.avatar}
              />
              {/* <View style={styles.editBadge}>
                <Text style={{color: '#fff'}}>✏️</Text>
              </View> */}
            </View>
          </TouchableOpacity>

          {/* NAME */}
          <Text style={styles.label}>{strings.name}</Text>
          <TextInput
            style={styles.input}
            value={EditInput.name}
            onChangeText={text =>
              setEditInput({...EditInput, name: text})
            }
          />

          {/* EMAIL */}
          <Text style={styles.label}>{strings.email}</Text>
          <TextInput
            style={[styles.input, {backgroundColor: '#f0f0f0'}]}
            value={EditInput.email}
            editable={false}
            // onChangeText={text =>
            //   setEditInput({...EditInput, email: text})
            // }
          />

          {/* PHONE */}
          <Text style={styles.label}>{strings.phone}</Text>

          <View  style={styles.phoneInput}>
            <TouchableOpacity
              style={styles.codeBox}
              onPress={() => setShowPicker(true)}>
              <Text>{selectedCountry.dial_code}</Text>
            </TouchableOpacity>

            <TextInput
             
              keyboardType="number-pad"
              value={EditInput.phone_number}
              onChangeText={text =>
                setEditInput({...EditInput, phone_number: text})
              }
            />
          </View>

          {/* COUNTRY */}
          <Text style={styles.label}>{strings.country}</Text>
          <TouchableOpacity
            onPress={() => setShowPicker(true)}
            style={styles.dropdown}>
            <Text>{EditInput.nationality || 'Select Country'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* COUNTRY PICKER MODAL */}
      <CountryPicker
        show={showPicker}
        lang='en'
        pickerButtonOnPress={item => {
          setSelectedCountry(item);

          setEditInput({
            ...EditInput,
            nationality: item.name.en,
            phone_code: item.dial_code.replace('+', ''),
          });

          setShowPicker(false);
        }}
          inputPlaceholder="Search country"

          // Text styles
          style={{
            modal: {
              backgroundColor: 'white',
              height: '60%',
            },
            countryName: {
              color: 'black',
            },
            dialCode: {
              color: 'black',
            },
            searchMessageText: {
              color: 'black',
            },
            textInput: {
              color: 'black',
            },
          }}
          onBackdropPress={() => setShowPicker(false)}
      />

      {/* BUTTON */}
      <View style={styles.submitContainer}>
        <Button
          label={strings.submit}
          style={styles.submitBtn}
          onPress={Update}
        />
      </View>
    </View>
  );
};

export default EditProfile;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6FA',
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },

  header: {
    fontSize: 22,
    marginLeft: 15,
    fontWeight: '700',
  },

  backBtn: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 12,
    elevation: 3,
  },

  card: {
    margin: 16,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 5,
  },

  avatarWrapper: {
    alignSelf: 'center',
    marginBottom: 20,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },

  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#1E88E5',
    borderRadius: 12,
    padding: 5,
  },

  label: {
    marginTop: 15,
    marginBottom: 5,
    fontSize: 12,
    color: '#666',
  },

  input: {
    backgroundColor: '#F5F7FB',
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },

  codeBox: {
    backgroundColor: '#F5F7FB',
    padding: 15,
    borderRadius: 12,
    marginRight: 10,
    borderRightWidth: 1,
    borderColor: '#E0E0E0',
  },

  phoneInput: {
    flexDirection: 'row',
    backgroundColor: '#F5F7FB',
    borderRadius: 12,
      borderWidth: 1,
    borderColor: '#E0E0E0',
  },

  dropdown: {
    backgroundColor: '#F5F7FB',
    padding: 15,
    borderRadius: 12,
      borderWidth: 1,
    borderColor: '#E0E0E0',
  },

  submitContainer: {
    padding: 20,
  },

  submitBtn: {
    backgroundColor: '#1E88E5',
    borderRadius: 14,
    height: 55,
  },
});