import React, {useState, useEffect, useContext} from 'react';
import {Button, Checkbox, Image, Incubator, Text, View} from 'react-native-ui-lib';
import {RootStackParams, RouteNames} from '../../navigation';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import { FlatList, ScrollView, ToastAndroid, TouchableOpacity } from 'react-native';
import AppImages from '../../constants/AppImages';
import styles from './styles';
import AppColors from '../../constants/AppColors';
import InputField from '../../components/InputField';
import { PlaceAdContext } from '../../api/placeAd/PlaceAdContext';
import { createAd, reset } from '../../api/placeAd/PlaceAdSlice';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
const {TextField} = Incubator;
export type SellerInformationNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'SellerInformation'
>;

export type SellerInformationRouteProps = RouteProp<
  RootStackParams,
  'SellerInformation'
>;

interface Props {}

const SellerInformation: React.FC<Props> = () => {
  const navigation = useNavigation<SellerInformationNavigationProps>();
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const {placeAdInput, setPlaceAdInput} = useContext(PlaceAdContext)
  const {PlaceAdData,loadingPlaceAd,PlaceAdError} = useSelector((state: RootState) => state.PlaceAd);
  const {profileDetails} = useSelector(
    (state: RootState) => state.ProfileDetails,
  );
  const [terms, setTerms] = useState(false)
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    address: false
  });

  console.log(placeAdInput.featured)
  
  useEffect(() => {
    setPlaceAdInput({...placeAdInput, name:profileDetails?.data.user.name, email:profileDetails?.data.user.email})
  }, []);

  const submit = () => {
    const hasErrors = !placeAdInput.name || !placeAdInput.email || !placeAdInput.address;

    if (hasErrors) {
      setErrors({
        name: !placeAdInput.name,
        email: !placeAdInput.email,
        address: !placeAdInput.address
      });
      return;
    }
    else{
        const formData = new FormData();
      
        const keysToAppend = [
          'address',
          'aircondition',
          'area',
          'building',
          'canonical_name',
          'category',
          'city',
          'condition',
          'country',
          'description',
          'descriptioninArabic',
          'email',
          'featured',
          'fuel',
          'furnished',
          'gps',
          'latitude',
          'longitude',
          'make_id',
          'mileage',
          'model_id',
          'name',
          'negotiable',
          'parking',
          'phone',
          'phone_hide',
          'price',
          'registration_year',
          'room',
          'security',
          'size',
          'state',
          'sub_area',
          'sub_area2',
          'subcategory',
          'tire',
          'title',
          'titleinArabic',
          'transmission',
          'variant_id'
        ];
      
        keysToAppend.forEach((key) => {
          formData.append(key, placeAdInput[key] ?? '');
        });
          placeAdInput.image.forEach((image) => {
            formData.append('image[]', {
              uri: image,
              name: 'image.png',
              type: 'image/png',
            });
          });

          const fieldValueArray = placeAdInput.fieldValue;

          for (let i = 0; i < fieldValueArray.length; i++) {
            formData.append(`fieldValue[${i}][field_id]`, fieldValueArray[i].field_id);
            formData.append(`fieldValue[${i}][value]`, fieldValueArray[i].value);
          }
        // console.log(formData, '-------------------------');
        dispatch(createAd({requestBody: formData}))
        .then(() => {
          dispatch(reset());
        })
        .catch((err: any) => console.log(err));
    }
  }

  if (PlaceAdData != null) {
    if (!loadingPlaceAd && !PlaceAdError && PlaceAdData.status == 'success') {
      ToastAndroid.show(
        JSON.stringify(PlaceAdData.message),
        ToastAndroid.SHORT,
      );
      console.log(PlaceAdData,'success')
      navigation.navigate(RouteNames.SuccessPage)
    } else {
      console.log(PlaceAdData,'failure')
        ToastAndroid.show(
          JSON.stringify(PlaceAdData.message),
          ToastAndroid.SHORT,
        );
      }
     
    }

  return (
    <View flex backgroundColor='white' padding-20>
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

          <Text style={styles.AdTitle}>Seller information</Text>

     <ScrollView showsVerticalScrollIndicator={false}>
        <View marginV-20>
        <InputField
          title={'Name'}
          multiline={false}
          height={45}
          type={'default'}
          value={placeAdInput.name}
          onChange={(text)=>{setPlaceAdInput({...placeAdInput, name:text})
          setErrors({...errors, name: false});
        }}
        trailing={
          errors.name &&
          <Text color={'red'}>required field</Text>
        }
          />

<InputField
          title={'Email'}
          multiline={false}
          height={45}
          type={'default'}
          value={placeAdInput.email}
          onChange={(text)=>{setPlaceAdInput({...placeAdInput, email:text})
          setErrors({...errors, email: false});
            }}
            trailing={
              errors.email &&
              <Text color={'red'}>required field</Text>
            }
          />

<InputField
          title={'Phone'}
          multiline={false}
          height={45}
          type={'numeric'}
          value={placeAdInput.phone}
          onChange={(text)=>{setPlaceAdInput({...placeAdInput, phone:text})}}
          trailing={null}
          />

<InputField
          title={'Address'}
          multiline={false}
          height={80}
          type={'default'}
          value={placeAdInput.address}
          onChange={(text)=>{setPlaceAdInput({...placeAdInput, address:text})
          setErrors({...errors, address: false});
        }}
        trailing={
          errors.address &&
          <Text color={'red'}>required field</Text>
        }
          />
          
          <Checkbox
          label={'Phone Hide'}
          labelStyle={styles.fieldText} 
          value={placeAdInput.phone_hide}
          onValueChange={(value)=>{setPlaceAdInput({...placeAdInput, phone_hide:value})}}
        
          color={'grey'}
          containerStyle={{marginBottom:20}}/>

<Checkbox
          label={'Accept Terms & Conditions'}
          labelStyle={[styles.fieldText,{color:'#006EFF'}]}
          value={terms}
          color={'grey'}
          containerStyle={{marginBottom:20}}
          onValueChange={(value)=>setTerms(value)}/>

          <View row style={{justifyContent:'space-between'}}>
          <Button
          label={'Back'}
          labelStyle={styles.buttonLabelStyle}
          style={{backgroundColor:'white',borderColor:AppColors.lightBlue,borderWidth:1,width:'48%'}}/>

          <Button
          label={'Create'}
          labelStyle={[styles.buttonLabelStyle,{color:'white'}]}
          style={{backgroundColor:AppColors.lightBlue,width:'48%',opacity:terms && placeAdInput.featured == 0 ? 1 : 0.5}}
          onPress={()=>{terms && placeAdInput.featured == 0 ? submit() : null}}
          />

          </View>

          
                </View>
     </ScrollView>
        </View>
    
  );
};

export default SellerInformation;

function dispatch(arg0: any) {
  throw new Error('Function not implemented.');
}
