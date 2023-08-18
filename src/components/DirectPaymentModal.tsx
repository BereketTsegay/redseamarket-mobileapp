// CountrySelectionModal.tsx
import React, { useState } from 'react';
import {Modal, FlatList, TouchableOpacity, Image, ToastAndroid, ScrollView, ImageBackground} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import InputField from './InputField';
import AppStyles from '../constants/AppStyles';
import AppColors from '../constants/AppColors';
import { Button, Text, View } from 'react-native-ui-lib';
import AppImages from '../constants/AppImages';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { UploadPaymentDocument, reset } from '../api/directPayment/DirectPaymentSlice';

interface Props {
  isVisible: boolean;
  ad_id: any;
  onRequestClose: () => void;
}

const DirectPaymentModal: React.FC<Props> = ({ isVisible, ad_id, onRequestClose }) => {
  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage,
  );
  const strings = useSelector(
    (state: RootState) => state.language.resources[currentLanguage],
  );
  const [images, setImages] = useState([]);
  const [transactionId, setTransactionId] = useState<string | null>(null);
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const {directPaymentData, loadingDirectPayment, directPaymentError} = useSelector(
    (state: RootState) => state.DirectPayment,
  );
  const [errors, setErrors] = useState({
    transactionId: false,
    images: false,
  });

  const openDocumentFiles = async () => {
    try {
      const files = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        // allowMultiSelection: true,
      });

      const selectedImages = files.map(file => ({
        uri: file.uri,
        type: file.type,
        name: file.name,
      }));
     
      setImages([...images, ...selectedImages]);
      setErrors({ ...errors, images: false });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        throw err;
      }
    }
  };

  const removeImage = (indexToRemove: number) => {
    const updatedImages = [...images];
  
    updatedImages.splice(indexToRemove, 1);
    setImages(updatedImages);
  };

  const Upload = () => {
    const hasErrors = !transactionId || !images;

    if (hasErrors) {
      setErrors({
        transactionId: !transactionId,
        images: !images
      });
      return;
    }
    else{
      const formData = new FormData();
      formData.append('id', ad_id);
      formData.append('transaction_id', transactionId);
      if(images.length != 0){
        images.forEach((image) => {
          formData.append('payment_slip[]', {
            uri: image.uri,
            name: image.name,
            type: image.type,
          });
        });
      }
      console.log(formData, '-------------------------');
      dispatch(UploadPaymentDocument({requestBody: formData}))
      .then(() => {
        dispatch(reset());
        setImages([]);
        setTransactionId('')
        onRequestClose()
      })
      .catch((err: any) => console.log(err));
    }
  };

  if (directPaymentData != null) {
    // console.log(jobSaveData)
    if (
      !loadingDirectPayment &&
      !directPaymentError &&
      directPaymentData.status == 'success'
    ) {
      ToastAndroid.show(
        JSON.stringify(directPaymentData.message),
        ToastAndroid.SHORT,
      );
    } else {
      // console.log(jobSaveData,'failure')
      ToastAndroid.show(JSON.stringify(directPaymentData.message), ToastAndroid.SHORT);
    }
  }
  return (
    <Modal visible={isVisible} onRequestClose={onRequestClose} transparent>
      <View  
            style={{justifyContent: 'center',flex:1,backgroundColor:"rgba(0, 0, 0, 0.3)",paddingHorizontal:30}}>
        <View style={{backgroundColor:'white',padding:20,borderRadius:20}}>
          <Text style={[AppStyles.title,{color:AppColors.darkBlue}]}>{strings.uploadPaymentDocument}</Text>
        <InputField
            title={'Transaction Id'}
            height={45}
            type={'default'}
            value={transactionId}
            onChange={(text)=>{setTransactionId(text)
              setErrors({...errors, transactionId: false});
            }}
            trailing={
              errors.transactionId &&
              <Text color={'red'}>{strings.requiredField}</Text>
            }
          />

<View marginB-20>
            <TouchableOpacity onPress={openDocumentFiles}>
            <View
              paddingH-15
              centerV
              row
              style={[
                AppStyles.fieldStyle,
                {borderStyle: 'dashed', justifyContent: 'space-between'},
              ]}>
              <Text style={AppStyles.fieldText}>{strings.uploadDocument}</Text>
              {
              errors.images &&
              <Text color={'red'}>**</Text>
            }
              
              <Image
                source={AppImages.UPLOAD}
                tintColor={AppColors.lightBlue}
              />
            </View>
            </TouchableOpacity>

            {images.length != 0 &&
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View row>
           {images.map((file,index)=>(
            <TouchableOpacity 
            onPress={()=>removeImage(index)} 
            key={index}>
            <ImageBackground source={{uri:file.uri}} style={{width:60,height:60,marginHorizontal:5}}>
              <Image source={AppImages.DELETE} style={{alignSelf:'flex-end',backgroundColor:'white'}}/>
              </ImageBackground>
              </TouchableOpacity>
              ))}
              </View>
              </ScrollView>}
          </View>

<Button
            label={strings.upload}
            style={{backgroundColor: AppColors.lightBlue,width:'50%'}}
            onPress={Upload}
          />
        </View>
      </View>
    </Modal>
  );
};

export default DirectPaymentModal;
