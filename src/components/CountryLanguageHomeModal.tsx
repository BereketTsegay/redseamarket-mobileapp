import React, { useState } from 'react';
import { Modal, Text, View, TouchableOpacity, FlatList } from 'react-native';
import AppColors from '../constants/AppColors';
import AppImages from '../constants/AppImages';
import { Image } from 'react-native-ui-lib';
import AppStyles from '../constants/AppStyles';
import AppFonts from '../constants/AppFonts';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface CountryLanguageModalProps {
  isVisible: boolean;
  data: any[]; // Array of countries or languages
  onSelectItem: (item: any) => void;
  onRequestClose: () => void;
  required?: any
}

const CountryLanguageHomeModal: React.FC<CountryLanguageModalProps> = ({
    isVisible,
    data,
    onSelectItem,
    onRequestClose,
    required
  }) => {
    const [selectedItem, setSelectedItem] = useState(null);
    const currentLanguage = useSelector(
      (state: RootState) => state.language.currentLanguage,
    );
    const strings = useSelector(
      (state: RootState) => state.language.resources[currentLanguage],
    );

    const handleCloseModal = (item) => {
      if (item) {
        onSelectItem(item);
      }
      onRequestClose();
    };

    return (
      <Modal
      visible={isVisible}
      animationType='none'
      transparent={true}
      onRequestClose={()=>handleCloseModal(null)}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}>
        <View
          style={{
            backgroundColor: 'white',
            width: '80%',
            borderRadius: 10,
          }}>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  setSelectedItem(item);
                  handleCloseModal(item);
                }}
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  backgroundColor: 'white',
                  flexDirection:'row',
                  justifyContent:'space-between',
                  borderRadius:20
                }}>
                <Text style={AppStyles.text1}>{item.name}</Text>
                <Image source={selectedItem === item ? AppImages.RADIO_ON : AppImages.RADIO_OFF} tintColor={AppColors.lightBlue}/>
              </TouchableOpacity>
            )}
          />
         {required &&
          <Text style={[AppStyles.text1,AppStyles.required]}>*{strings.pleaseSelectCountry}</Text>}
        </View>
      </View>
    </Modal>
    );
  };

export default CountryLanguageHomeModal;
