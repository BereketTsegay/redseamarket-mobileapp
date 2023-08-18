import React, {useRef, useState, useEffect, useContext} from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { CommonContext } from '../api/commonContext';
import { fetchStateList } from '../api/country/StateListSlice';
import { fetchCityList } from '../api/country/CityListSlice';

const {height: windowHeight} = Dimensions.get('window');

type Props = {
  closeSheet : any;
  initialValue?: any;
  set: any;
}

const FilterModal = ({ closeSheet, initialValue, set }: Props) => {
    const navigation = useNavigation();
    const currentLanguage = useSelector(
      (state: RootState) => state.language.currentLanguage,
    );
    const strings = useSelector(
      (state: RootState) => state.language.resources[currentLanguage],
    );
    const bottomSheetRef = useRef(null);
    const translateY = useRef(new Animated.Value(windowHeight)).current;
    const [priceValue, setPriceValue] = useState(1000000)
    const { stateLists } = useSelector((state: RootState) => state.StateList);
    const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
    const { commonInput, setCommonInput } = useContext(CommonContext)
    const { cityLists } = useSelector((state: RootState) => state.CityList);
    const [state_id, setStateId] = useState(null)
    const [city_id, setCityId] = useState(null)
    const [area, setArea] = useState('')
    const [subArea, setSubArea] = useState('')
  
    useEffect(() => {
        openBottomSheet();
      }, []);

      useEffect(() => {
        let request = JSON.stringify({
          country: commonInput.common_country_id,
        });
        dispatch(fetchStateList({ requestBody: request }));
      }, [commonInput.common_country_id]);
    
      useEffect(() => {
        let request = JSON.stringify({
          state: state_id,
        });
        dispatch(fetchCityList({ requestBody: request }));
      }, [state_id]);
    
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

      const setSate = (value: any) => {
        setStateId(value)
      };

      const setCity = (value: any) => {
        setCityId(value)
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
            <Text style={[AppStyles.text,{marginBottom:5}]}>{strings.filter}</Text>

            <View>
        <Text style={AppStyles.labelStyle}>{strings.state}</Text>
<ItemDropdown
            value={strings.selectState}
            data={stateLists?.state}
            add={setSate}
            dropdownType="State"
          />
          </View>

            <View>
        <Text style={AppStyles.labelStyle}>{strings.city}</Text>
<ItemDropdown
            value={strings.selectCity}
            data={cityLists?.city}
            add={setCity}
            dropdownType="City"
          />
          </View>

            <InputField
              label={strings.area}
              title={strings.enterArea}
              height={45}
              value={area}
              onChange={(text)=>setArea(text)}
            />

<InputField
              label={strings.subArea}
              title={strings.enterSubArea}
              height={45}
              value={subArea}
              onChange={(text)=>setSubArea(text)}
            />
<View>
    <Text style={AppStyles.labelStyle}>{strings.priceRange}</Text>

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
        label={strings.submit}
        style={{backgroundColor: AppColors.lightBlue,width:'50%',alignSelf:'center'}}
        onPress={()=>set(state_id,city_id,area,subArea,0,Math.round(priceValue))}
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
  