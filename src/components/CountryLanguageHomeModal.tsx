import React from 'react';
import { Modal, Text, View, TouchableOpacity, FlatList } from 'react-native';
import AppColors from '../constants/AppColors';

interface CountryLanguageModalProps {
  isVisible: boolean;
  data: any[]; // Array of countries or languages
  onSelectItem: (item: any) => void;
  onRequestClose: () => void;
}

const CountryLanguageHomeModal: React.FC<CountryLanguageModalProps> = ({
    isVisible,
    data,
    onSelectItem,
    onRequestClose,
  }) => {
    return (
      <Modal
        visible={isVisible}
        animationType='none'
        transparent={true}
        onRequestClose={onRequestClose}>
        <TouchableOpacity
          onPress={onRequestClose}
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
            <View
              style={{
                borderBottomWidth: 1,
                borderColor: '#ddd',
                padding: 10,
                alignItems: 'center',
              }}>
              <Text>Select an item</Text>
            </View>
            <FlatList
              data={data}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    onSelectItem(item);
                    onRequestClose();
                  }}
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                  }}>
                  <Text>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

export default CountryLanguageHomeModal;
