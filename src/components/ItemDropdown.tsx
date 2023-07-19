import React from 'react';
import AppStyles from '../constants/AppStyles';
import { Image } from 'react-native-ui-lib';
import AppImages from '../constants/AppImages';
import SelectDropdown from 'react-native-select-dropdown';


const ItemDropdown = ({value,data}) => {
    return (
      <SelectDropdown
        data={data}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem.id);
        }}
        defaultButtonText={value}
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
    )
  }

  export default ItemDropdown;