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
import {FlatList, ImageBackground, ScrollView, TouchableOpacity} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import AppImages from '../../constants/AppImages';
import AppColors from '../../constants/AppColors';
import ItemDropdown from '../../components/ItemDropdown';
import InputField from '../../components/InputField';
import styles from './styles';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
const {TextField} = Incubator;
export type MyJobProfileNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'MyJobProfile'
>;

export type MyJobProfileRouteProps = RouteProp<
  RootStackParams,
  'MyJobProfile'
>;

interface Props {}

const MyJobProfile: React.FC<Props> = ({route}) => {
  const navigation = useNavigation<MyJobProfileNavigationProps>();
  const {id} = route.params;
  const { jobProfileList} = useSelector(
    (state: RootState) => state.JobProfileList,
  );
  const {countryLists} = useSelector(
    (state: RootState) => state.CountryList,
  );

  const openDocumentFile = async () => {
    try {
      const imgs = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
        allowMultiSelection: true,
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        throw err;
      }
    }
  };


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

      <Text style={styles.AdTitle}>Add Job Profile</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View marginV-20>
          <InputField
            title={jobProfileList?.data == null ? 'Job Title' : jobProfileList.data.title}
            multiline={false}
            height={45}
            type={'default'}
            value={null}
            onChange={null}
            trailing={null}
            editable={true}
          />

<InputField
            title={jobProfileList?.data == null ? 'Add work experience (optional)' : jobProfileList.data.work_experience}
            multiline={false}
            height={45}
            type={'numeric'}
            value={null}
            onChange={null}
            trailing={null}
            editable={true}
          />

<InputField
            title={'Add Company'}
            multiline={false}
            height={45}
            type={'numeric'}
            value={null}
            onChange={null}
            trailing={null}
            editable={true}
          />

<InputField
            title={jobProfileList?.data == null ? 'Add Education' : jobProfileList.data.education}
            multiline={false}
            height={45}
            type={'numeric'}
            value={null}
            onChange={null}
            trailing={null}
            editable={true}
          />

<InputField
            title={jobProfileList?.data == null ? 'Add Certifications' : jobProfileList.data.certificate}
            multiline={false}
            height={45}
            type={'numeric'}
            value={null}
            onChange={null}
            trailing={null}
            editable={true}
          />

<InputField
            title={jobProfileList?.data == null ? 'Add Language Known' : jobProfileList.data.language}
            multiline={false}
            height={45}
            type={'numeric'}
            value={null}
            onChange={null}
            trailing={null}
            editable={true}
          />

<InputField
            title={jobProfileList?.data == null ? 'Add Skills' : jobProfileList.data.skils}
            multiline={false}
            height={45}
            type={'numeric'}
            value={null}
            onChange={null}
            trailing={null}
            editable={true}
          />
          <View marginB-20>
            <TouchableOpacity onPress={()=>openDocumentFile()}>
            <View
              paddingH-15
              centerV
              row
              style={[
                styles.fieldStyle,
                {borderStyle: 'dashed', justifyContent: 'space-between'},
              ]}>
              <Text style={styles.fieldText}>Upload Resume</Text>
              <Image
                source={AppImages.UPLOAD}
                tintColor={AppColors.lightBlue}
              />
            </View>
            </TouchableOpacity>
            <Text style={{color: 'red', fontSize: 8}}>
              *Maximum 500kb file size are allowed
            </Text>
            {/* {placeAdInput.image.length != 0 &&
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View row>
           {placeAdInput.image.map((file,index)=>(
            <TouchableOpacity 
            onPress={()=>deleteImageAtIndex(index)} 
            key={index}>
            <ImageBackground source={{uri:file}} style={{width:60,height:60,marginHorizontal:5}}>
              <Image source={AppImages.DELETE} style={{alignSelf:'flex-end',backgroundColor:'white'}}/>
              </ImageBackground>
              </TouchableOpacity>
              ))}
              </View>
              
              </ScrollView>} */}
          </View>
          
          <View>
      
          <ItemDropdown
            value={'Select Country'}
            data={countryLists}
            add={null}
          />

<InputField
            title={jobProfileList?.data == null ? 'Overview' : jobProfileList.data.overview}
            multiline={true}
            height={100}
            type={'numeric'}
            value={null}
            onChange={null}
            trailing={null}
            editable={true}
          />
    
          <ItemDropdown
            value={'Select State'}
            data={jobProfileList?.data == null ? null : jobProfileList.data.state_id}
            add={null}
          />

<ItemDropdown
            value={'Select City'}
            data={jobProfileList?.data == null ? null : jobProfileList.data.city_id}
            add={null}
          />

          <Button
            label={'Submit'}
            style={{backgroundColor: AppColors.lightBlue}}
          />
        </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default MyJobProfile;
