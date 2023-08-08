// CountrySelectionModal.tsx
import React, { useState } from 'react';
import {Modal, FlatList, TouchableOpacity, Image, ToastAndroid} from 'react-native';
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
  const [image, setImage] = useState('')
  const [transactionId, setTransactionId] = useState(null)
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const {directPaymentData, loadingDirectPayment, directPaymentError} = useSelector(
    (state: RootState) => state.DirectPayment,
  );
  const [errors, setErrors] = useState({
    transactionId: false,
    image: false,
  });

  const openDocumentFile = async () => {
    try {
      const file = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf && DocumentPicker.types.images],
        allowMultiSelection: true,
      });
      setImage(file[0].uri)
      setErrors({...errors, image: false});
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        throw err;
      }
    }
  };

  const Upload = () => {
    // const hasErrors = !transactionId || !image;

    // if (hasErrors) {
    //   setErrors({
    //     transactionId: !transactionId,
    //     image: !image
    //   });
    //   return;
    // }
    // else{
    //   const formData = new FormData();
    //   formData.append('id', ad_id);
    //   formData.append('transaction_id', transactionId);
    //   if (image) {
    //     formData.append('payment_slip', {
    //       uri: image,
    //       name: 'document.pdf',
    //       type: 'application/pdf',
    //     });
    //   } else {
    //     formData.append('payment_slip', '');
    //   }
    //   console.log(formData, '-------------------------');
    //   dispatch(UploadPaymentDocument({requestBody: formData}))
    //   .then(() => {
    //     dispatch(reset());
        onRequestClose()
    //   })
    //   .catch((err: any) => console.log(err));
    // }
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
          <Text style={[AppStyles.title,{color:AppColors.darkBlue}]}>Upload Payment Document</Text>
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
              <Text color={'red'}>required field</Text>
            }
          />

<View marginB-20>
            <TouchableOpacity onPress={openDocumentFile}>
            <View
              paddingH-15
              centerV
              row
              style={[
                AppStyles.fieldStyle,
                {borderStyle: 'dashed', justifyContent: 'space-between'},
              ]}>
              <Text style={AppStyles.fieldText}>Upload Document(image/pdf)</Text>
              {
              errors.image &&
              <Text color={'red'}>**</Text>
            }
              
              <Image
                source={AppImages.UPLOAD}
                tintColor={AppColors.lightBlue}
              />
            </View>
            </TouchableOpacity>
          
            {image && (
            <View row style={{borderColor:'grey',borderWidth:1,padding:5,width:'50%',borderRadius:5}}>
            <Text>{image}</Text>
            <TouchableOpacity onPress={()=>{setImage('')}}>
            <Image source={AppImages.DELETE} style={{left:10, backgroundColor: 'white' }} />
            </TouchableOpacity>
          </View>
      )}
          </View>

<Button
            label={'Upload'}
            style={{backgroundColor: AppColors.lightBlue,width:'50%'}}
            onPress={Upload}
          />
        </View>
      </View>
    </Modal>
  );
};

export default DirectPaymentModal;
