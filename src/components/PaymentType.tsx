import React, {useContext, useEffect} from 'react';
import {Image, RadioButton, RadioGroup, Text, View} from 'react-native-ui-lib';
import AppImages from '../constants/AppImages';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store';
import AppStyles from '../constants/AppStyles';
import AppFonts from '../constants/AppFonts';
import {AnyAction, ThunkDispatch} from '@reduxjs/toolkit';
import {PlaceAdContext} from '../api/placeAd/PlaceAdContext';
import {fetchFeaturedAmount} from '../api/featured/FeaturedAmountSlice';
import PaymentDetails from './PaymentDetails';

const PaymentType = ({value}) => {
  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage,
  );
  const strings = useSelector(
    (state: RootState) => state.language.resources[currentLanguage],
  );
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const {placeAdInput, setPlaceAdInput} = useContext(PlaceAdContext);
  const {featuredAmount, loadingFeaturedAmount, featuredAmountError} =
    useSelector((state: RootState) => state.FeaturedAmount);

  useEffect(() => {
    let request = JSON.stringify({
      category: placeAdInput.category,
      subcategory: placeAdInput.subcategory,
    });
    dispatch(fetchFeaturedAmount({requestBody: request}));
  }, []);

  const renderRadioButton = (value, name) => {
    return (
      <View marginB-20>
        <RadioButton
          value={value}
          label={name}
          color={'grey'}
          labelStyle={AppStyles.text1}
        />
      </View>
    );
  };
  return (
    <View marginB-20>
      <Text style={AppStyles.text}>{strings.paymentType}</Text>
      <Text style={AppStyles.text1}>
        {strings.pay}
        <Text style={AppStyles.text2}>
          {' '}
          USD{' '}
          {featuredAmount?.subcategory.type == 0
            ? featuredAmount?.subcategory.percentage *
              placeAdInput.adsCountry.length
            : ((placeAdInput.price * featuredAmount?.subcategory.percentage) /
                100) *
              placeAdInput.adsCountry.length}
        </Text>{' '}
        {strings.forFeaturedAd}
      </Text>
      <RadioGroup
        initialValue={placeAdInput.paymentMethod}
        onValueChange={value =>
          setPlaceAdInput({...placeAdInput, paymentMethod: value})
        }>
        {renderRadioButton(
          'account',
          strings.directPayment,
        )}
        <Text style={AppStyles.warnText}>
          <Text style={{fontFamily: AppFonts.POPPINS_BOLD, color: 'red'}}>
            {strings.warning}:{' '}
          </Text>{' '}
          {strings.warnMsg}
        </Text>
        {renderRadioButton(
          'stripe',
          strings.accountPayment,
        )}
      </RadioGroup>

      {placeAdInput.paymentMethod == 'stripe' && (
        <PaymentDetails
          amount={
            featuredAmount?.subcategory.type == 0
              ? featuredAmount?.subcategory.percentage *
                placeAdInput.adsCountry.length
              : ((placeAdInput.price * featuredAmount?.subcategory.percentage) /
                  100) *
                placeAdInput.adsCountry.length
          }
          value={value}
        />
      )}
    </View>
  );
};
export default PaymentType;
