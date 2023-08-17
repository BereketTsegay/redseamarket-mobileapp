import React, {useRef, useState, useEffect} from 'react';
import {
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AppColors from '../constants/AppColors';
import { Button, Checkbox, Image, Text, View } from 'react-native-ui-lib';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import InputField from './InputField';
import AppStyles from '../constants/AppStyles';
import { RouteNames } from '../navigation';
import { useNavigation } from '@react-navigation/native';
import AppImages from '../constants/AppImages';
import moment from 'moment';

const {height: windowHeight} = Dimensions.get('window');

type Props = {
  closeSheet : any;
  set: any
}

const SheetModal = ({closeSheet, set}: Props) => {
    const navigation = useNavigation();
  const bottomSheetRef = useRef(null);
  const [fromDateVisible, setFromVisible] = useState(false)
  const [toDateVisible, setToVisible] = useState(false)
  const [currentlyWorking, setCurrentlyWorking] = useState(false);
  const [company_name, setCompanyName] = useState('')
  const [fromDate, setFrom] = useState('')
  const [toDate, setTo] = useState('')
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

  const FromDateConfirm = (date) => {
    setFromVisible(false);
    setFrom(moment(date).format('DD-MM-YYYY'))
  };

  const ToDateConfirm = (date) => {
    setToVisible(false);
    setTo(moment(date).format('DD-MM-YYYY'))
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
       
       <InputField
            title={'Company name'}
            height={40}
            value={company_name}
            onChange={(text)=>setCompanyName(text)}
          />

<Checkbox
                  label={'Currently working in this company'}
                  labelStyle={AppStyles.fieldText}
                  value={currentlyWorking}
                  onValueChange={(value) => {
                    setCurrentlyWorking(value);
                    if (value) {
                      setTo('Present'); 
                    }
                  }}
                  color={'grey'}
                />

              <View marginT-20>
                <TouchableOpacity onPress={()=>setFromVisible(true)}>
                <InputField
                  title={"from date"}
                  height={45}
                  value={fromDate}
            onChange={null}
                  editable={false}
                  trailing={
                    <View>
                       <DateTimePickerModal
                  isVisible={fromDateVisible}
                  mode="date"
                  onConfirm={FromDateConfirm}
                  onCancel={() => setFromVisible(false)}
                />
                    <Image source={AppImages.CALENDAR}/>
                    </View>
                  }
                />
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>setToVisible(!currentlyWorking)}>
<InputField
                  title={'to date'}
                  height={45}
                  value={toDate}
                  onChange={null}
                  editable={false}
                  trailing={
                    
                      !currentlyWorking && (
                        <View>
                       <DateTimePickerModal
                  isVisible={toDateVisible}
                  mode="date"
                  onConfirm={ToDateConfirm}
                  onCancel={() => setToVisible(false)}
                />
                      
                    <Image source={AppImages.CALENDAR}/>
                    </View>
                  )}
                />
                </TouchableOpacity>
                </View>

<Button
            label={'Save'}
            style={{backgroundColor: AppColors.lightBlue}}
            onPress={()=>{set(company_name,fromDate,toDate)
              closeBottomSheet()}}
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
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    alignSelf:'center',
    padding:20,
    // borderColor:'grey',
    // borderWidth:1,
    elevation:20
  },
});

export default SheetModal;
