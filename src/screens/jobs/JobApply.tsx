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
import {FlatList, ImageBackground, Modal, ScrollView, TextInput, ToastAndroid, TouchableOpacity} from 'react-native';
import AppImages from '../../constants/AppImages';
import AppColors from '../../constants/AppColors';
import InputField from '../../components/InputField';
import styles from './styles';
const {TextField} = Incubator;
export type JobApplyNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'JobApply'
>;

export type JobApplyRouteProps = RouteProp<
  RootStackParams,
  'JobApply'
>;

interface Props {}

const JobApply: React.FC<Props> = ({}) => {
  const navigation = useNavigation<JobApplyNavigationProps>();
  const [fileSizeError, setFileSizeError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<any | null>(null);

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

      <Text style={styles.AdTitle}>Tell us more about you</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View marginV-20>
          <InputField
            title={'Total experience'}
            height={45}
            type={'default'}
            value={null}
            onChange={null}
          />

<InputField
            title={'Current CTC'}
            height={45}
            type={'numeric'}
            value={null}
            onChange={null}
          />

<InputField
            title={'Expected CTC'}
            height={45}
            type={'default'}
            value={null}
            onChange={null}
          />

<InputField
            title={'Notice period'}
            height={45}
            type={'numeric'}
            value={null}
            onChange={null}
          />

<InputField
            title={'Relevant field'}
            height={45}
            type={'numeric'}
            value={null}
            onChange={null}
          />

<InputField
            title={'Current company'}
            height={45}
            type={'default'}
            value={null}
            onChange={null}
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
            <TouchableOpacity onPress={()=>{setSelectedFile(null)}}>
            <Image source={AppImages.DELETE} style={{left:10, backgroundColor: 'white' }} />
            </TouchableOpacity>
          </View>
      )}
          </View>


          
        </View>
      </ScrollView>
      <Button
            label={'Submit'}
            style={{backgroundColor: AppColors.lightBlue}}
          />
    </View>
  );
};

export default JobApply;
