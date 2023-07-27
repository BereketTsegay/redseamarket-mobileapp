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
import {FlatList, ImageBackground, Modal, ScrollView, TextInput, TouchableOpacity} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import AppImages from '../../constants/AppImages';
import AppColors from '../../constants/AppColors';
import ItemDropdown from '../../components/ItemDropdown';
import InputField from '../../components/InputField';
import styles from './styles';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import SheetModal from '../../components/SheetModal';
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
  const [fileSizeError, setFileSizeError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<any | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false)
  const { jobProfileList} = useSelector(
    (state: RootState) => state.JobProfileList,
  );
  const {countryLists} = useSelector(
    (state: RootState) => state.CountryList,
  );


  const openDocumentFile = async () => {
    try {
      const file = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
        allowMultiSelection: true,
      });
       const maxSizeInBytes = 500 * 1024; // 500kb in bytes
       if (file.some((item) => item.size > maxSizeInBytes)) {
         setFileSizeError('File size exceeds 500kb limit');
       } else {
         setFileSizeError(null);
         setSelectedFile(file[0].name);
       }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        throw err;
      }
    }
  };

  const closeSheet = () => {
    setSheetOpen(false)
  }

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

        <TouchableOpacity onPress={()=>setSheetOpen(!sheetOpen)}>
          <View centerV style={styles.companyView}>
            <Text style={styles.fieldText}>Add Company</Text>
            <View style={styles.addCircle}>
            <Image source={AppImages.ADD} tintColor={AppColors.lightBlue} style={{width:12,height:12}}/>
            </View>
          </View>
          </TouchableOpacity>

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
              {fileSizeError && (
          <Text style={{ color: 'red', fontSize: 8 }}>{fileSizeError}</Text>
        )}
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
            <View row style={{borderColor:'grey',borderWidth:1,padding:5,width:'50%',borderRadius:5}}>
            <Text>{selectedFile}</Text>
            <TouchableOpacity onPress={()=>setSelectedFile(null)}>
            <Image source={AppImages.DELETE} style={{left:10, backgroundColor: 'white' }} />
            </TouchableOpacity>
          </View>
      )}
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

      {sheetOpen && <SheetModal closeSheet={closeSheet}/>}
    </View>
  );
};

export default MyJobProfile;
