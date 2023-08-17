import React, {useRef, useState, useEffect} from 'react';
import {
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, RadioButton, RadioGroup, Slider, Text, View } from 'react-native-ui-lib';
import AppStyles from '../constants/AppStyles';
import InputField from './InputField';
import AppColors from '../constants/AppColors';
import ItemDropdown from './ItemDropdown';

const {height: windowHeight} = Dimensions.get('window');

type Props = {
  closeSheet : any;
  initialValue: any;
  set: any;
}

const FilterModal = ({ closeSheet, initialValue, set }: Props) => {
    const navigation = useNavigation();
    const bottomSheetRef = useRef(null);
    const translateY = useRef(new Animated.Value(windowHeight)).current;
    const [priceValue, setPriceValue] = useState(1000000)
  
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

      const setCity = (value: any) => {
        console.log(value)
      };
  
    return (
      <Animated.View
        style={[
          styles.sheetContainer,
          {
            transform: [{ translateY: translateY }],
          },
        ]}
        {...panResponder.panHandlers}
      >

<View marginH-10>
            <Text style={[AppStyles.text,{marginBottom:5}]}>Filter</Text>

            <View>
        <Text style={AppStyles.labelStyle}>City</Text>
<ItemDropdown
            value={'Select city'}
            data={null}
            add={setCity}
            dropdownType="City"
          />
          </View>

            <InputField
              label={'Area'}
              title={'Enter area'}
              height={45}
              value={null}
              onChange={null}
            />

<InputField
              label={'Sub Area'}
              title={'Enter sub area'}
              height={45}
              value={null}
              onChange={null}
            />
<View>
    <Text style={AppStyles.labelStyle}>Price Range</Text>

<Slider
  value={0}
  minimumValue={0}
  maximumValue={1000000}
  minimumTrackTintColor={AppColors.lightBlue}
          thumbTintColor={AppColors.lightBlue}
  onValueChange={(value) => setPriceValue(value)}
/>
<View row style={{justifyContent:'space-between'}}>
    <Text>AED 0</Text>
    <Text>AED {Math.round(priceValue)}</Text>
</View>
</View>


<Button
        label={'Submit'}
        style={{backgroundColor: AppColors.lightBlue,width:'50%',alignSelf:'center'}}
        onPress={()=>closeSheet()}
      />
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
  
  export default FilterModal;
  