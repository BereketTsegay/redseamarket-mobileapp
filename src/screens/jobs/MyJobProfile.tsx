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
            title={'Job Title'}
            multiline={false}
            height={45}
            type={'default'}
            value={null}
            onChange={null}
            trailing={null}
          />

<InputField
            title={'Add work experience (optional)'}
            multiline={false}
            height={45}
            type={'numeric'}
            value={null}
            onChange={null}
            trailing={null}
          />

<InputField
            title={'Add Company'}
            multiline={false}
            height={45}
            type={'numeric'}
            value={null}
            onChange={null}
            trailing={null}
          />

<InputField
            title={'Add Education'}
            multiline={false}
            height={45}
            type={'numeric'}
            value={null}
            onChange={null}
            trailing={null}
          />

<InputField
            title={'Add Certifications'}
            multiline={false}
            height={45}
            type={'numeric'}
            value={null}
            onChange={null}
            trailing={null}
          />

<InputField
            title={'Add Language Known'}
            multiline={false}
            height={45}
            type={'numeric'}
            value={null}
            onChange={null}
            trailing={null}
          />

<InputField
            title={'Add Skills'}
            multiline={false}
            height={45}
            type={'numeric'}
            value={null}
            onChange={null}
            trailing={null}
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
            data={null}
            add={null}
          />

<InputField
            title={'Overview'}
            multiline={true}
            height={100}
            type={'numeric'}
            value={null}
            onChange={null}
            trailing={null}
          />
    
          <ItemDropdown
            value={'Select State'}
            data={null}
            add={null}
          />

<ItemDropdown
            value={'Select City'}
            data={null}
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
