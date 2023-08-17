// CountrySelectionModal.tsx
import React from 'react';
import { View, Modal, FlatList, TouchableOpacity, Image, Text } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import AppImages from '../constants/AppImages';
import AppStyles from '../constants/AppStyles';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface Props {
  isVisible: boolean;
  countryLists: any[];
  onSelectCountry: (countryId: number) => void;
  onRequestClose: () => void;
}

const CountrySelectionModal: React.FC<Props> = ({ isVisible, countryLists, onSelectCountry, onRequestClose }) => {
  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage,
  );
  const strings = useSelector(
    (state: RootState) => state.language.resources[currentLanguage],
  );
  return (
    <Modal visible={isVisible} onRequestClose={onRequestClose} transparent>
      <View  
            style={{justifyContent: 'center',flex:1,backgroundColor:"rgba(0, 0, 0, 0.3)",paddingHorizontal:30}}>
        <View style={{backgroundColor:'white',paddingHorizontal:20,paddingTop:40,paddingBottom:20,borderRadius:20}}>
        <SelectDropdown
            data={countryLists}
            onSelect={(selectedItem) => onSelectCountry(selectedItem)}
            defaultButtonText={strings.pleaseSelectCountry}
            buttonTextAfterSelection={(selectedItem) => selectedItem.name}
            rowTextForSelection={(item) => item.name}
            buttonStyle={AppStyles.dropdown1BtnStyle}
            buttonTextStyle={AppStyles.dropdown1BtnTxtStyle}
            renderDropdownIcon={(isOpened) => (
              <Image source={AppImages.ARROW_DOWN} />
            )}
            dropdownStyle={AppStyles.dropdown1DropdownStyle}
            rowStyle={AppStyles.dropdown1RowStyle}
            rowTextStyle={AppStyles.dropdown1RowTxtStyle}
          />
        </View>
      </View>
    </Modal>
  );
};

export default CountrySelectionModal;
