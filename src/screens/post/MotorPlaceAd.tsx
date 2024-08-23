import React, {useState, useEffect, useContext} from 'react';
import {
  Button,
  Checkbox,
  Image,
  Incubator,
  RadioButton,
  RadioGroup,
  Text,
  View,
} from 'react-native-ui-lib';
import {RootStackParams, RouteNames} from '../../navigation';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {FlatList, ScrollView, TouchableOpacity} from 'react-native';
import AppImages from '../../constants/AppImages';
import styles from './styles';
import AppColors from '../../constants/AppColors';
import InputField from '../../components/InputField';
import ItemDropdown from '../../components/ItemDropdown';
import AppFonts from '../../constants/AppFonts';
import {AnyAction, ThunkDispatch} from '@reduxjs/toolkit';
import {RootState} from '../../../store';
import {useDispatch, useSelector} from 'react-redux';
import {fetchMakeList} from '../../api/motor/MakeListSlice';
import {fetchModelList} from '../../api/motor/ModelListSlice';
import {fetchVariantList} from '../../api/motor/VariantListSlice';
import {PlaceAdContext} from '../../api/placeAd/PlaceAdContext';
const {TextField} = Incubator;
export type MotorPlaceAdNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'MotorPlaceAd'
>;

export type MotorPlaceAdRouteProps = RouteProp<RootStackParams, 'MotorPlaceAd'>;

interface Props {}

const MotorPlaceAd: React.FC<Props> = ({route}) => {
  const navigation = useNavigation<MotorPlaceAdNavigationProps>();
  const {name} = route.params;
  const {placeAdInput, setPlaceAdInput} = useContext(PlaceAdContext);
  const [variantDropdownTouched, setVariantDropdownTouched] = useState(false);
  const [modelDropdownTouched, setModelDropdownTouched] = useState(false);
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const {makeList} = useSelector((state: RootState) => state.MakeList);
  const {modelList} = useSelector((state: RootState) => state.ModelList);
  const {variantList} = useSelector((state: RootState) => state.VariantList);
  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage,
  );
  const strings = useSelector(
    (state: RootState) => state.language.resources[currentLanguage],
  );
  const [fuelOption, setFuelOption] = useState([
    {
      id: 'petrol',
      name: 'Petrol',
    },
    {
      id: 'Diesel',
      name: 'Diesel',
    },
    {
      id: 'LPG Gas',
      name: 'LPG Gas',
    },
    {
      id: 'Electric',
      name: 'Electric',
    },
  ]);
  const [errors, setErrors] = useState({
    make_id: false,
    model_id: false,
    registration_year: false,
    fuel: false,
    transmission: false,
    condition: false,
    mileage: false,
  });
  useEffect(() => {
    dispatch(fetchMakeList({requestBody: ''}));
  }, []);

  useEffect(() => {
    let request = JSON.stringify({
      make_id: placeAdInput.make_id,
    });
    dispatch(fetchModelList({requestBody: request}));
  }, [placeAdInput.make_id]);

  useEffect(() => {
    let request = JSON.stringify({
      model_id: placeAdInput.model_id,
    });
    dispatch(fetchVariantList({requestBody: request}));
  }, [placeAdInput.model_id]);

  const renderRadioButton = (value, name) => {
    return (
      <View marginB-20>
        <RadioButton
          value={value}
          label={name}
          color={'grey'}
          labelStyle={styles.fieldText}
        />
      </View>
    );
  };

  const setMake = value => {
    setPlaceAdInput({...placeAdInput, make_id: value});
    setErrors({...errors, make_id: false});
  };

  const setModel = value => {
    setPlaceAdInput({...placeAdInput, model_id: value});
    setErrors({...errors, model_id: false});
  };

  const setVariant = value => {
    setPlaceAdInput({...placeAdInput, variant_id: value});
  };

  const setFuel = value => {
    setPlaceAdInput({...placeAdInput, fuel: value});
    setErrors({...errors, fuel: false});
  };

  const nextScreen = () => {
    const hasErrors =
      !placeAdInput.make_id ||
      !placeAdInput.model_id ||
      !placeAdInput.registration_year ||
      !placeAdInput.fuel ||
      !placeAdInput.transmission ||
      !placeAdInput.condition ||
      !placeAdInput.mileage;

    if (hasErrors) {
      setErrors({
        make_id: !placeAdInput.make_id,
        model_id: !placeAdInput.model_id,
        registration_year: !placeAdInput.registration_year,
        fuel: !placeAdInput.fuel,
        transmission: !placeAdInput.transmission,
        condition: !placeAdInput.condition,
        mileage: !placeAdInput.mileage,
      });
      return;
    } else {
      navigation.navigate(RouteNames.SellerInformation);
    }
  };

  return (
    <View flex backgroundColor="white" padding-20>
      <View row centerV>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.circle}>
            <Image
              source={AppImages.ARROW_LEFT}
              style={{width: 25, height: 25}}
            />
          </View>
        </TouchableOpacity>
        <View flex center>
          <Text style={styles.heading}>{strings.placeAd}</Text>
        </View>
      </View>

      <Text style={styles.AdTitle}>
        {strings.tellUs} {name}
      </Text>

      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled'>
        <View marginV-20>
          <View>
            {errors.make_id && (
              <Text color={'red'} style={{alignSelf: 'flex-end'}}>
                {strings.requiredField}
              </Text>
            )}
            <Text style={styles.labelStyle}>
              {strings.make} {strings.id}
            </Text>
            <ItemDropdown
              value={placeAdInput.make_id}
              data={makeList?.make}
              add={setMake}
              dropdownType={strings.make}
              error={modelDropdownTouched && !placeAdInput.make_id}
            />
          </View>

          <View>
            {errors.model_id && (
              <Text color={'red'} style={{alignSelf: 'flex-end'}}>
                {strings.requiredField}
              </Text>
            )}
            <Text style={styles.labelStyle}>
              {strings.model} {strings.id}
            </Text>
            <ItemDropdown
              value={placeAdInput.model_id}
              data={modelList?.model}
              add={setModel}
              dropdownType={strings.model}
              onBlur={() => setModelDropdownTouched(true)}
              error={variantDropdownTouched && !placeAdInput.model_id}
            />
          </View>

          <Text style={styles.labelStyle}>
            {strings.variant} {strings.id}
          </Text>
          <ItemDropdown
            value={placeAdInput.variant_id}
            data={variantList?.variant}
            add={setVariant}
            dropdownType={strings.variant}
            onBlur={() => setVariantDropdownTouched(true)}
          />

          <InputField
            label={strings.registration}
            title={strings.enterRegisteredYear}
            multiline={false}
            height={45}
            type={'numeric'}
            value={placeAdInput.registration_year}
            onChange={text => {
              setPlaceAdInput({...placeAdInput, registration_year: text});
              setErrors({...errors, registration_year: false});
            }}
            trailing={
              errors.registration_year && (
                <Text color={'red'}>{strings.requiredField}</Text>
              )
            }
            editable={true}
          />

          <View>
            {errors.fuel && (
              <Text color={'red'} style={{alignSelf: 'flex-end'}}>
                {strings.requiredField}
              </Text>
            )}
            <Text style={styles.labelStyle}>{strings.FuelType}</Text>
            <ItemDropdown
              value={placeAdInput.fuel}
              data={fuelOption}
              add={setFuel}
              dropdownType={strings.FuelType}
            />
          </View>

          <View row marginB-20>
            <Text style={[styles.title, {fontSize: 14}]}>
              {strings.transmission}
            </Text>
            {errors.transmission && (
              <Text color={'red'}>{strings.requiredField}</Text>
            )}
          </View>
          <RadioGroup
            initialValue={placeAdInput.transmission}
            onValueChange={(value: any) => {
              setPlaceAdInput({...placeAdInput, transmission: value});
              setErrors({...errors, transmission: false});
            }}>
            {renderRadioButton(1, strings.manual)}
            {renderRadioButton(2, strings.automatic)}
          </RadioGroup>

          <View row marginB-20>
            <Text style={[styles.title, {fontSize: 14}]}>
              {strings.condition}
            </Text>
            {errors.condition && (
              <Text color={'red'}>{strings.requiredField}</Text>
            )}
          </View>
          <RadioGroup
            initialValue={placeAdInput.condition}
            onValueChange={(value: any) => {
              setPlaceAdInput({...placeAdInput, condition: value});
              setErrors({...errors, condition: false});
            }}>
            {renderRadioButton(1, strings.new)}
            {renderRadioButton(2, strings.used)}
          </RadioGroup>

          <InputField
            label={strings.mileage}
            title={strings.enterMileage}
            multiline={false}
            height={45}
            type={'numeric'}
            value={String(placeAdInput.mileage)}
            onChange={text => {
              setPlaceAdInput({...placeAdInput, mileage: text});
              setErrors({...errors, mileage: false});
            }}
            trailing={
              errors.mileage && (
                <Text color={'red'}>{strings.requiredField}</Text>
              )
            }
            editable={true}
          />

          <Text style={[styles.title, {fontSize: 14, marginBottom: 20}]}>
            {strings.features}
          </Text>

          <Checkbox
            label={strings.airCondition}
            labelStyle={styles.fieldText}
            value={placeAdInput.aircondition}
            onValueChange={(value: any) =>
              setPlaceAdInput({...placeAdInput, aircondition: value})
            }
            color={'grey'}
            containerStyle={{marginBottom: 20}}
          />

          <Checkbox
            label={strings.gps}
            labelStyle={styles.fieldText}
            value={placeAdInput.gps}
            onValueChange={(value: any) =>
              setPlaceAdInput({...placeAdInput, gps: value})
            }
            color={'grey'}
            containerStyle={{marginBottom: 20}}
          />

          <Checkbox
            label={strings.security}
            labelStyle={styles.fieldText}
            value={placeAdInput.security}
            onValueChange={(value: any) =>
              setPlaceAdInput({...placeAdInput, security: value})
            }
            color={'grey'}
            containerStyle={{marginBottom: 20}}
          />

          <Checkbox
            label={strings.spare}
            labelStyle={styles.fieldText}
            value={placeAdInput.tire}
            onValueChange={(value: any) =>
              setPlaceAdInput({...placeAdInput, tire: value})
            }
            color={'grey'}
            containerStyle={{marginBottom: 20}}
          />

          <Button
            label={strings.next}
            style={{backgroundColor: AppColors.lightBlue}}
            onPress={nextScreen}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default MotorPlaceAd;
