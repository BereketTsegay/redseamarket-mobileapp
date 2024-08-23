import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  Button,
  Image,
  RadioButton,
  RadioGroup,
  Text,
  View,
} from 'react-native-ui-lib';
import AppImages from '../constants/AppImages';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store';
import AppStyles from '../constants/AppStyles';
import AppFonts from '../constants/AppFonts';
import {AnyAction, ThunkDispatch} from '@reduxjs/toolkit';
import {PlaceAdContext} from '../api/placeAd/PlaceAdContext';
import InputField from './InputField';
import AppColors from '../constants/AppColors';
import {ActivityIndicator} from 'react-native';
import {createPayment, reset} from '../api/stripe/StripePaymentSlice';
import { showToast } from '../constants/commonUtils';

const PaymentDetails = ({amount, value}) => {
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage,
  );
  const strings = useSelector(
    (state: RootState) => state.language.resources[currentLanguage],
  );
  const {placeAdInput, setPlaceAdInput} = useContext(PlaceAdContext);
  const {paymentData, loadingPayment, paymentError} = useSelector(
    (state: RootState) => state.StripePayment,
  );
  const {loadingPlaceAd} = useSelector(
    (state: RootState) => state.PlaceAd,
  );
  const [cardNumber, setCardNumber] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [cvv, setCVV] = useState('');
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    phone: false,
    cardNumber: false,
    month: false,
    year: false,
    cvv: false,
  });

  const setCardNumberFormatted = (text) => {
    const cleanedText = text.replace(/\D/g, '');
  
    const truncatedText = cleanedText.slice(0, 16);
    let formattedText = '';
    for (let i = 0; i < truncatedText.length; i += 4) {
      formattedText += truncatedText.slice(i, i + 4) + ' ';
    }
  
    formattedText = formattedText.trim();
  
    setCardNumber(formattedText);
    setErrors({...errors, cardNumber: false});
  };

  const Proceed = () => {
    const hasErrors =
      !placeAdInput.name ||
      !placeAdInput.email ||
      !placeAdInput.phone ||
      !cardNumber ||
      !month ||
      !year ||
      !cvv;

    if (hasErrors) {
      setErrors({
        name: !placeAdInput.name,
        email: !placeAdInput.email,
        phone: !placeAdInput.phone,
        cardNumber: !cardNumber,
        month: !month,
        year: !year,
        cvv: !cvv,
      });
      return;
    } else {
      const formData = new FormData();

      const keysToAppend = ['name', 'phone', 'email'];

      keysToAppend.forEach(key => {
        formData.append(key, placeAdInput[key] ?? '');
      });

      formData.append('cardNumber', cardNumber);
      formData.append('month', month);
      formData.append('year', year);
      formData.append('cvv', cvv);
      formData.append('amount', amount);

      // console.log(formData, '-------------------------');
      dispatch(createPayment({requestBody: formData}))
        .then(() => {
          dispatch(reset());
        })
        .catch((err: any) => console.log(err));
    }
  };

  useEffect(() => {
    if (paymentData != null) {
      // console.log(paymentData);
      if (!loadingPayment && !paymentError && paymentData.status) {
        value(paymentData.payment_id);
        showToast('Payment' + paymentData.message);
      } else {
        showToast(paymentData.message);
      }
    }
  }, [paymentData]);

  return (
    <View>
      <Text style={AppStyles.title}>{strings.paymentDetails}</Text>

      <InputField
      label={strings.name}
        title={strings.enterName}
        multiline={false}
        height={45}
        type={'default'}
        value={placeAdInput.name}
        onChange={text => {
          setPlaceAdInput({...placeAdInput, name: text});
          setErrors({...errors, name: false});
        }}
        trailing={errors.name && <Text color={'red'}>{strings.requiredField}</Text>}
        editable={true}
      />

      <InputField
      label={strings.email}
        title={strings.enterEmail}
        height={45}
        type={'default'}
        value={placeAdInput.email}
        onChange={text => {
          setPlaceAdInput({...placeAdInput, email: text});
          setErrors({...errors, email: false});
        }}
        trailing={errors.email && <Text color={'red'}>{strings.requiredField}</Text>}
      />

      <InputField
      label={strings.phone}
        title={strings.enterPhone}
        height={45}
        type={'numeric'}
        value={placeAdInput.phone}
        onChange={text => {
          setPlaceAdInput({...placeAdInput, phone: text});
          setErrors({...errors, phone: false});
        }}
        trailing={errors.phone && <Text color={'red'}>{strings.requiredField}</Text>}
      />

      <InputField
      label={strings.cardNumber}
        title={strings.enterCard}
        height={45}
        type={'numeric'}
        value={cardNumber}
        onChange={setCardNumberFormatted}
        trailing={errors.cardNumber && <Text color={'red'}>**</Text>}
        lead={<Image source={AppImages.CARD} marginR-10 />}
      />

      <View row style={{justifyContent: 'space-between'}}>
        <InputField
        label={strings.month}
          title={strings.month}
          height={45}
          width={80}
          type={'numeric'}
          value={month}
          onChange={text => {
            setMonth(text.slice(0, 2));
            setErrors({...errors, month: false});
          }}
          trailing={errors.month && <Text color={'red'}>**</Text>}
        />

        <InputField
        label={strings.year}
          title={strings.year}
          height={45}
          width={80}
          type={'numeric'}
          value={year}
          onChange={text => {
            setYear(text.slice(0, 2));
            setErrors({...errors, year: false});
          }}
          trailing={errors.year && <Text color={'red'}>**</Text>}
        />

        <InputField
        label={strings.Cvv}
          title={strings.Cvv}
          height={45}
          width={80}
          type={'numeric'}
          value={cvv}
          onChange={text => {
            setCVV(text.slice(0,3));
            setErrors({...errors, cvv: false});
          }}
          trailing={errors.cvv && <Text color={'red'}>**</Text>}
        />
      </View>

      <Button
        label={loadingPayment ? 
          <ActivityIndicator color={AppColors.darkBlue} size={20}/> : 
          loadingPlaceAd ? <ActivityIndicator color={AppColors.darkBlue} size={20}/> : 
           strings.proceed}
        style={{backgroundColor: '#28a745', borderRadius: 5}}
        onPress={Proceed}
      />
    </View>
  );
};
export default PaymentDetails;
