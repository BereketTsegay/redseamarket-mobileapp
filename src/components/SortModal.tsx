import React, {useRef, useState, useEffect} from 'react';
import {
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RadioButton, RadioGroup, Text, View } from 'react-native-ui-lib';
import AppStyles from '../constants/AppStyles';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const {height: windowHeight} = Dimensions.get('window');

type Props = {
  closeSheet : any;
  initialValue: any;
  set: any;
}

const SortModal = ({closeSheet, initialValue, set}: Props) => {
  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage,
  );
  const strings = useSelector(
    (state: RootState) => state.language.resources[currentLanguage],
  );
    const navigation = useNavigation();
  const bottomSheetRef = useRef(null);
  const translateY = useRef(new Animated.Value(windowHeight)).current;
  

  useEffect(() => {
    openBottomSheet();
  }, []);

  const openBottomSheet = () => {
    bottomSheetRef.current?.expand();
    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeBottomSheet = () => {
    closeSheet();
    Animated.timing(translateY, {
      toValue: windowHeight,
      duration: 300,
      useNativeDriver: true,
    }).start(() => bottomSheetRef.current?.close());
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > 5;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100) {
          closeBottomSheet();
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

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
    <Animated.View
      style={[
        styles.sheetContainer,
        {
          transform: [{translateY: translateY}],
        },
      ]}
      {...panResponder.panHandlers}>

        <View marginH-10>
            <Text style={[AppStyles.text,{marginBottom:5}]}>{strings.sortBy}</Text>

            <RadioGroup
          initialValue={initialValue}
          onValueChange={(value: any) =>{set(value)}}
          >
            {renderRadioButton(1, strings.low_high)}
            {renderRadioButton(2, strings.high_low)}
          </RadioGroup>
        </View>
       
      
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  sheetContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    alignSelf:'center',
    padding:20,
    // borderColor:'grey',
    // borderWidth:1,
    elevation:30
  },
});

export default SortModal;
