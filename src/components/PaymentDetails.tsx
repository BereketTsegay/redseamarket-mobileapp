import React, {useContext, useEffect, useState} from 'react';
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
import {ToastAndroid} from 'react-native';
import {createPayment, reset} from '../api/stripe/StripePaymentSlice';

const PaymentDetails = ({amount, value}) => {
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const {placeAdInput, setPlaceAdInput} = useContext(PlaceAdContext);
  const {paymentData, loadingPayment, paymentError} = useSelector(
    (state: RootState) => state.StripePayment,
  );
  const [cardNumber, setCardNumber] = useState(null);
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);
  const [cvv, setCVV] = useState(null);
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    phone: false,
    cardNumber: false,
    month: false,
    year: false,
    cvv: false,
  });

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

      console.log(formData, '-------------------------');
      dispatch(createPayment({requestBody: formData}))
        .then(() => {
          dispatch(reset());
        })
        .catch((err: any) => console.log(err));
    }
  };

  useEffect(() => {
    if (paymentData != null) {
      console.log(paymentData);
      if (!loadingPayment && !paymentError && paymentData.status) {
        value(paymentData.payment_id);
        ToastAndroid.show(
          JSON.stringify(paymentData.message),
          ToastAndroid.SHORT,
        );
      } else {
        ToastAndroid.show(
          JSON.stringify(paymentData.message),
          ToastAndroid.SHORT,
        );
      }
    }
  }, [paymentData]);

  return (
    <View>
      <Text style={AppStyles.title}>Payment Details</Text>

      <InputField
        title={'Name'}
        multiline={false}
        height={45}
        type={'default'}
        value={placeAdInput.name}
        onChange={text => {
          setPlaceAdInput({...placeAdInput, name: text});
          setErrors({...errors, name: false});
        }}
        trailing={errors.name && <Text color={'red'}>required field</Text>}
        editable={true}
      />

      <InputField
        title={'Email'}
        height={45}
        type={'default'}
        value={placeAdInput.email}
        onChange={text => {
          setPlaceAdInput({...placeAdInput, email: text});
          setErrors({...errors, email: false});
        }}
        trailing={errors.email && <Text color={'red'}>required field</Text>}
      />

      <InputField
        title={'Phone'}
        height={45}
        type={'numeric'}
        value={placeAdInput.phone}
        onChange={text => {
          setPlaceAdInput({...placeAdInput, phone: text});
          setErrors({...errors, phone: false});
        }}
        trailing={errors.phone && <Text color={'red'}>required field</Text>}
      />

      <InputField
        title={'Card Number'}
        height={45}
        type={'numeric'}
        value={cardNumber}
        onChange={text => {
          setCardNumber(text);
          setErrors({...errors, cardNumber: false});
        }}
        trailing={errors.cardNumber && <Text color={'red'}>**</Text>}
        lead={<Image source={AppImages.CARD} marginR-10 />}
      />

      <View row style={{justifyContent: 'space-between'}}>
        <InputField
          title={'Month'}
          height={45}
          width={80}
          type={'numeric'}
          value={month}
          onChange={text => {
            setMonth(text);
            setErrors({...errors, month: false});
          }}
          trailing={errors.month && <Text color={'red'}>**</Text>}
        />

        <InputField
          title={'Year'}
          height={45}
          width={80}
          type={'numeric'}
          value={year}
          onChange={text => {
            setYear(text);
            setErrors({...errors, year: false});
          }}
          trailing={errors.year && <Text color={'red'}>**</Text>}
        />

        <InputField
          title={'CVV'}
          height={45}
          width={80}
          type={'numeric'}
          value={cvv}
          onChange={text => {
            setCVV(text);
            setErrors({...errors, cvv: false});
          }}
          trailing={errors.cvv && <Text color={'red'}>**</Text>}
        />
      </View>

      <Button
        label={'Proceed to pay'}
        style={{backgroundColor: '#28a745', borderRadius: 5}}
        onPress={Proceed}
      />
    </View>
  );
};
export default PaymentDetails;
