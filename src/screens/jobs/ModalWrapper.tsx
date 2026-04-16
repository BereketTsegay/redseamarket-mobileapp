import React from 'react';
import {Modal, View, TouchableOpacity, Text, StyleSheet} from 'react-native';

const ModalWrapper = ({visible, onClose, title, children}: {visible: boolean, onClose: () => void, title: string, children: React.ReactNode}) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.box}>

          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>

            <TouchableOpacity onPress={onClose}>
              <Text style={styles.close}>✕</Text>
            </TouchableOpacity>
          </View>

          {children}

        </View>
      </View>
    </Modal>
  );
};

export default ModalWrapper;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    padding: 20,
  },

  box: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    maxHeight: '100%',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  title: {
    fontSize: 16,
    fontWeight: '700',
  },

  close: {
    fontSize: 18,
    color: '#999',
  },
});