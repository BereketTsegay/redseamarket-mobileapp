// CountrySelectionModal.tsx
import React from 'react';
import { View, Modal, FlatList, TouchableOpacity, Image, Text } from 'react-native';
import InputField from './InputField';

interface Props {
  isVisible: boolean;
  onRequestClose: () => void;
}

const DirectPaymentModal: React.FC<Props> = ({ isVisible, onRequestClose }) => {
  return (
    <Modal visible={isVisible} onRequestClose={onRequestClose} transparent>
      <View  
            style={{justifyContent: 'center',flex:1,backgroundColor:"rgba(0, 0, 0, 0.3)",paddingHorizontal:30}}>
        <View style={{backgroundColor:'white',paddingHorizontal:20,paddingTop:40,paddingBottom:20,borderRadius:20}}>
        <InputField
            title={'Transaction Id'}
            height={45}
            type={'default'}
            value={null}
            onChange={null}
          />
        </View>
      </View>
    </Modal>
  );
};

export default DirectPaymentModal;
