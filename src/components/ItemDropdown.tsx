import React, { useEffect, useState } from 'react';
import AppStyles from '../constants/AppStyles';
import { Image, Text, View } from 'react-native-ui-lib';
import AppImages from '../constants/AppImages';
import SelectDropdown from 'react-native-select-dropdown';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface props {
  value: any;
  data : any;
  add? : any;
  dropdownType? : any,
  onBlur? : any,
  error? : any
  
}


const ItemDropdown = ({ value, data, add, dropdownType, onBlur, error }: props) => {
  // console.log(value, '============')
  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage,
  );
  const strings = useSelector(
    (state: RootState) => state.language.resources[currentLanguage],
  );


    const selectedItem = data ? data.find((item) => item.id == value) : null;
    // console.log(selectedItem)
    const defaultButtonText =
      selectedItem && selectedItem.name
        ? selectedItem.name
        : `${strings.select} ${dropdownType}`;

  return (
    <SelectDropdown
      data={data}
      onSelect={(selectedItem, index) => {
        add(selectedItem.id);
      }}
      defaultButtonText={defaultButtonText}
      buttonTextAfterSelection={(selectedItem, index) => {
        return selectedItem.name;
      }}
      rowTextForSelection={(item, index) => {
        return item.name;
      }}
      buttonStyle={AppStyles.dropdown1BtnStyle}
      buttonTextStyle={AppStyles.dropdown1BtnTxtStyle}
      renderDropdownIcon={isOpened => {
        return (
          <View row>
              {error && <Text style={{ color: 'red' }}>** required</Text>}
        <Image source={AppImages.ARROW_DOWN} />
        </View>
        );
      }}
      dropdownIconPosition={'right'}
      dropdownStyle={AppStyles.dropdown1DropdownStyle}
      rowStyle={AppStyles.dropdown1RowStyle}
      rowTextStyle={AppStyles.dropdown1RowTxtStyle}
      onBlur={onBlur}
    />
  )
}

export default ItemDropdown;