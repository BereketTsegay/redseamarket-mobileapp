import React, {useState, useEffect, useContext} from 'react';
import {
  Button,
  Checkbox,
  Image,
  Incubator,
  RadioButton,
  Text,
  View,
} from 'react-native-ui-lib';
import {RootStackParams, RouteNames} from '../../navigation';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {FlatList, ImageBackground, ScrollView, TouchableOpacity} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AppImages from '../../constants/AppImages';
import styles from './styles';
import AppColors from '../../constants/AppColors';
import InputField from '../../components/InputField';
import ItemDropdown from '../../components/ItemDropdown';
import {AnyAction, ThunkDispatch} from '@reduxjs/toolkit';
import {RootState} from '../../../store';
import {useDispatch, useSelector} from 'react-redux';
import {PlaceAdContext} from '../../api/placeAd/PlaceAdContext';
import SelectDropdown from 'react-native-select-dropdown';
import AppStyles from '../../constants/AppStyles';
import moment from 'moment';
const {TextField} = Incubator;
export type CustomPlaceAdNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'CustomPlaceAd'
>;

export type CustomPlaceAdRouteProps = RouteProp<
  RootStackParams,
  'CustomPlaceAd'
>;

interface Props {}

const CustomPlaceAd: React.FC<Props> = ({route}) => {
  const navigation = useNavigation<CustomPlaceAdNavigationProps>();
  const {name} = route.params;
  const [image, setImage] = useState('');
  const [dateVisible, setDateVisible] = useState(false)
  const [date, setDate] = useState('');
  const [date_Display, setDate_Display] = useState(new Date())
  const {placeAdInput, setPlaceAdInput} = useContext(PlaceAdContext);
  const {customLists} = useSelector(
    (state: RootState) => state.CustomFieldList,
  );

  useEffect(() => {}, []);

  const updateFieldValue = (fieldId, value) => {
    const existingIndex = placeAdInput.fieldValue.findIndex(
      field => field.field_id === fieldId,
    );

    if (existingIndex >= 0) {
      const updatedFieldValue = [...placeAdInput.fieldValue];
      updatedFieldValue[existingIndex].value = value;
      setPlaceAdInput({...placeAdInput, fieldValue: updatedFieldValue});
    } else {
      setPlaceAdInput({
        ...placeAdInput,
        fieldValue: [
          ...placeAdInput.fieldValue,
          {field_id: fieldId, value: value},
        ],
      });
    }
  };

  const openDocumentFile = async (id) => {
    try {
      const imgs = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles && DocumentPicker.types.images],
        allowMultiSelection: true,
      });
      setImage(imgs[0].uri)
      updateFieldValue(id, imgs[0].uri)
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        throw err;
      }
    }
  };

  const deleteImageAtIndex = () => {
   setImage('')
  };

  const DateConfirm = (date, id) => {
    setDateVisible(false);
    setDate(moment(date).format('DD-MM-YYYY'))
    updateFieldValue(id, moment(date).format('DD-MM-YYYY'))
    setDate_Display(date);
  };
  const handleDateSelect = (selectedDate, id) => {
    DateConfirm(selectedDate, id);
    setDateVisible(false);
  };

  return (
    <View flex backgroundColor="white" padding-20>
      <View row centerV>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.circle}>
            <Image
              source={AppImages.ARROW_LEFT}
              style={{width: 25, height: 25}}
            />
          </View>
        </TouchableOpacity>
        <View flex center>
          <Text style={styles.heading}>Place an Ad</Text>
        </View>
      </View>

      <Text style={styles.AdTitle}>Tell us about your {name}</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View marginV-20>
          {customLists?.data.category_field.map(item => (
            <>
              {item.field.type === 'text' ? (
                <InputField
                  title={item.field.name}
                  multiline={false}
                  height={45}
                  type={'default'}
                  value={placeAdInput.textValue}
                  onChange={text => updateFieldValue(item.field.id, text)}
                  trailing={null}
                  editable={true}
                />
              ) : item.field.type === 'number' ? (
                <InputField
                  title={item.field.name}
                  multiline={false}
                  height={45}
                  type={'numeric'}
                  value={placeAdInput.textValue}
                  onChange={text => updateFieldValue(item.field.id, text)}
                  trailing={null}
                  editable={true}
                />
                ) : item.field.type === 'url' ? (
                  <InputField
                    title={item.field.name}
                    multiline={false}
                    height={45}
                    type={'url'}
                    value={placeAdInput.textValue}
                    onChange={text => updateFieldValue(item.field.id, text)}
                    trailing={null}
                    editable={true}
                  />
              ) : item.field.type === 'date' ? (
                <TouchableOpacity
              onPress={() => setDateVisible(true)}>
                <InputField
                  title={item.field.name}
                  multiline={false}
                  height={45}
                  type={'default'}
                  value={date}
                  onChange={null}
                  editable={false}
                  trailing={
                    <View>
                      <DateTimePickerModal
                  isVisible={dateVisible}
                  mode="date"
                  onConfirm={(date) => handleDateSelect(date, item.field.id)}
                  date={new Date(date_Display)}
                  onCancel={() => setDateVisible(false)}
                />
                    <Image source={AppImages.CALENDAR}/>
                    </View>
                  }
                /></TouchableOpacity>
              ) : item.field.type === 'textarea' ? (
                <InputField
                  title={item.field.name}
                  multiline={false}
                  height={80}
                  type={'default'}
                  value={placeAdInput.textValue}
                  onChange={text => updateFieldValue(item.field.id, text)}
                  trailing={null}
                  editable={true}
                />
              ) : item.field.type === 'checkbox' ? (
                <Checkbox
                  label={item.field.name}
                  labelStyle={styles.fieldText}
                  value={placeAdInput.textValue}
                  color={'grey'}
                  containerStyle={{marginBottom: 20}}
                  onValueChange={value =>
                    updateFieldValue(item.field.id, value)
                  }
                />
              )
              : item.field.type === 'radio' ? (
                <View marginB-20>
                <RadioButton
                  value={placeAdInput.textValue}
                  label={item.field.name}
                  color={'grey'}
                  labelStyle={styles.fieldText}
                  onValueChange={value =>
                    updateFieldValue(item.field.id, value)
                  }
                />
                </View>
              ) : item.field.type === 'select' ? (
                <SelectDropdown
                data={item.field.field_option}
                onSelect={(selectedItem, index) => {
                  updateFieldValue(item.field.id, selectedItem.value)
                }}
                defaultButtonText={item.field.name}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem.name;
                }}
                rowTextForSelection={(item, index) => {
                  return item.name;
                }}
                buttonStyle={AppStyles.dropdown1BtnStyle}
                buttonTextStyle={AppStyles.dropdown1BtnTxtStyle}
                renderDropdownIcon={isOpened => {
                  return <Image source={AppImages.ARROW_DOWN} />;
                }}
                dropdownIconPosition={'right'}
                dropdownStyle={AppStyles.dropdown1DropdownStyle}
                rowStyle={AppStyles.dropdown1RowStyle}
                rowTextStyle={AppStyles.dropdown1RowTxtStyle}
              />
              ) : item.field.type === 'file' ? (
                <View marginB-20>
                <TouchableOpacity onPress={()=>placeAdInput.image.length <= 4 ? openDocumentFile(item.field.id) : null}>
                <View
                  paddingH-15
                  centerV
                  row
                  style={[
                    styles.fieldStyle,
                    {borderStyle: 'dashed', justifyContent: 'space-between'},
                  ]}>
                  <Text style={styles.fieldText}>Upload {item.field.name}</Text>
                  <Image
                    source={AppImages.UPLOAD}
                    tintColor={AppColors.lightBlue}
                  />
                </View>
                </TouchableOpacity>
                {image != '' &&
                <TouchableOpacity 
                onPress={()=>deleteImageAtIndex()} >
                <ImageBackground source={{uri:image}} style={{width:60,height:60,marginHorizontal:5}}>
                  <Image source={AppImages.DELETE} style={{alignSelf:'flex-end',backgroundColor:'white'}}/>
                  </ImageBackground>
                  </TouchableOpacity>}
              </View>
              )
              : null}
            </>
          ))}
  
          <Button
            label={'Next'}
            style={{backgroundColor: AppColors.lightBlue}}
            onPress={() => navigation.navigate(RouteNames.SellerInformation)}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default CustomPlaceAd;
