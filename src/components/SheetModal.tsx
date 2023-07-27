import React, {useRef, useState, useEffect} from 'react';
import {
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
} from 'react-native';
import AppColors from '../constants/AppColors';
import { Button, Checkbox, Image, Text, View } from 'react-native-ui-lib';
import InputField from './InputField';
import AppStyles from '../constants/AppStyles';
import { RouteNames } from '../navigation';
import { useNavigation } from '@react-navigation/native';
import AppImages from '../constants/AppImages';

const {height: windowHeight} = Dimensions.get('window');

type Props = {
  closeSheet : any;
  value? : any;
  tip? : any
}

const SheetModal = ({closeSheet, value,tip}: Props) => {
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

  const closeBottomSheet = (type) => {
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

  return (
    <Animated.View
      style={[
        styles.sheetContainer,
        {
          transform: [{translateY: translateY}],
        },
      ]}
      {...panResponder.panHandlers}>
       
       <InputField
            title={'Company name'}
            height={40}
            type={'numeric'}
            value={null}
            onChange={null}
            editable={true}
          />

<Checkbox
                  label={'Currently working in this company'}
                  labelStyle={AppStyles.fieldText}
                //   value={placeAdInput.textValue}
                  color={'grey'}
                //   onValueChange={value =>
                //     updateFieldValue(item.field.id, value)
                //   }
                />

                <View row style={{justifyContent:'space-between'}}>
                <InputField
                  title={"from date"}
                  multiline={false}
                  height={45}
                  type={'default'}
                  editable={true}
                  trailing={
                    <View>
                    <Image source={AppImages.CALENDAR}/>
                    </View>
                  }
                />

<InputField
                  title={'to date'}
                  multiline={false}
                  height={45}
                  type={'default'}
                  value={date}
                  onChange={null}
                  editable={false}
                  trailing={
                    <View>
                    <Image source={AppImages.CALENDAR}/>
                    </View>
                  }
                />
                </View>

<Button
            label={'Save'}
            style={{backgroundColor: AppColors.lightBlue,marginTop:20}}
            onPress={() => navigation.navigate(RouteNames.SellerInformation)}
          />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  sheetContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    alignSelf:'center',
    padding:20,
    borderColor:'grey',
    borderWidth:1
  },
});

export default SheetModal;
