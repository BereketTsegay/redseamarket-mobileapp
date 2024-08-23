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
import { PlaceAdContext } from '../../api/placeAd/PlaceAdContext';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
const {TextField} = Incubator;
export type SaleRentPlaceAdNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'SaleRentPlaceAd'
>;

export type SaleRentPlaceAdRouteProps = RouteProp<
  RootStackParams,
  'SaleRentPlaceAd'
>;

interface Props {}

const SaleRentPlaceAd: React.FC<Props> = ({route}) => {
  const navigation = useNavigation<SaleRentPlaceAdNavigationProps>();
  const {name} = route.params;
  const {placeAdInput, setPlaceAdInput} = useContext(PlaceAdContext)
  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage,
  );
  const strings = useSelector(
    (state: RootState) => state.language.resources[currentLanguage],
  );


  const [data, setData] = useState([
    {
      id: 'Apartment',
      name: 'Apartment',
    },
    {
      id: 'House',
      name: 'House',
    },
    {
      id: 'Store',
      name: 'Store',
    },
    {
      id: 'Office',
      name: 'Office',
    },
    {
      id: 'Plot of land',
      name: 'Plot of land',
    },
  ]);
  const [errors, setErrors] = useState({
    size: false,
    room: false,
    furnished: false,
    building: false,
  });

  useEffect(() => {}, []);

  const setBuilding = (value) => {
    setPlaceAdInput({...placeAdInput, building:value})
    setErrors({...errors, building: false});
  }

  const nextScreen = () => {
    const hasErrors = !placeAdInput.size || !placeAdInput.room || !placeAdInput.furnished || !placeAdInput.building;

    if (hasErrors) {
      setErrors({
        size: !placeAdInput.size,
        room: !placeAdInput.room,
        furnished: !placeAdInput.furnished,
        building: !placeAdInput.building
      });
      return;
    }
    else{
  navigation.navigate(RouteNames.SellerInformation)
  }
  };


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

      <Text style={styles.AdTitle}>{strings.tellUs} {name}</Text>

      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled'>
        <View marginV-20>
          <InputField
          label={strings.size}
            title={strings.enterSize}
            multiline={false}
            height={45}
            type={'numeric'}
            value={String(placeAdInput.size)}
            onChange={(text)=>{setPlaceAdInput({...placeAdInput, size:text})
            setErrors({...errors, size: false});
            }}
            trailing={
              errors.size &&
              <Text color={'red'}>{strings.requiredField}</Text>
            }
            editable={true}
          />

          <InputField
          label={strings.rooms}
          title={strings.enterRoom}
            multiline={false}
            height={45}
            type={'numeric'}
            value={String(placeAdInput.room)}
            onChange={(text)=>{setPlaceAdInput({...placeAdInput, room:text})
            setErrors({...errors, room: false});
            }}
            trailing={
              errors.room &&
              <Text color={'red'}>{strings.requiredField}</Text>
            }
            editable={true}
          />

<View row marginB-20>
<Text style={[styles.title,{fontSize:14}]}>{strings.furnished}</Text>
{  errors.furnished &&
              <Text color={'red'}>{strings.requiredField}</Text>}
</View>
          <RadioGroup
          initialValue={placeAdInput.furnished}
          onValueChange={(value: any) =>{setPlaceAdInput({...placeAdInput, furnished:value})
          setErrors({...errors, furnished: false});}}
          >
            {renderRadioButton(1, strings.yes)}
            {renderRadioButton(2, strings.no)}
          </RadioGroup>
         
          <View>
          {  errors.building &&
              <Text color={'red'} style={{alignSelf:'flex-end'}}>{strings.requiredField}</Text>}
                <Text style={styles.labelStyle}>{strings.building}</Text>
          <ItemDropdown value={placeAdInput.building} data={data} add={setBuilding} dropdownType={strings.building}/>
          </View>

          <Checkbox
            label={strings.parking}
            labelStyle={styles.fieldText}
            value={placeAdInput.parking}
            onValueChange={(value: any) =>setPlaceAdInput({...placeAdInput, parking:value})}
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

export default SaleRentPlaceAd;
