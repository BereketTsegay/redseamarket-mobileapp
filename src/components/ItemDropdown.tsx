import React from 'react';
import AppStyles from '../constants/AppStyles';
import { Image } from 'react-native-ui-lib';
import AppImages from '../constants/AppImages';
import SelectDropdown from 'react-native-select-dropdown';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';


const ItemDropdown = ({value,data,add,dropdownType}) => {
  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage,
  );
  const strings = useSelector(
    (state: RootState) => state.language.resources[currentLanguage],
  );
  const selectedItem = data ? data.find((item) => item.id === value) : null;
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