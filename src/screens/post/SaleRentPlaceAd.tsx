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
          <Text style={styles.heading}>Place an Ad</Text>
        </View>
      </View>

      <Text style={styles.AdTitle}>Tell us about your {name}</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View marginV-20>
          <InputField
            title={'Size'}
            multiline={false}
            height={45}
            type={'numeric'}
            value={placeAdInput.size}
            onChange={(text)=>{setPlaceAdInput({...placeAdInput, size:text})
            setErrors({...errors, size: false});
            }}
            trailing={
              errors.size &&
              <Text color={'red'}>required field</Text>
            }
          />

          <InputField
            title={'Room'}
            multiline={false}
            height={45}
            type={'numeric'}
            value={placeAdInput.room}
            onChange={(text)=>{setPlaceAdInput({...placeAdInput, room:text})
            setErrors({...errors, room: false});
            }}
            trailing={
              errors.room &&
              <Text color={'red'}>required field</Text>
            }
          />

<View row marginB-20>
<Text style={[styles.title,{fontSize:14}]}>Furnished</Text>
{  errors.furnished &&
              <Text color={'red'}>required field</Text>}
</View>
          <RadioGroup
          initialValue={placeAdInput.furnished}
          onValueChange={(value: any) =>{setPlaceAdInput({...placeAdInput, furnished:value})
          setErrors({...errors, furnished: false});}}
          >
            {renderRadioButton(1, 'Yes')}
            {renderRadioButton(2, 'No')}
          </RadioGroup>
         
          <View>
          {  errors.building &&
              <Text color={'red'} style={{alignSelf:'flex-end'}}>required field</Text>}
          <ItemDropdown value={'Building Type'} data={data} add={setBuilding}/>
          </View>

          <Checkbox
            label={'Parking'}
            labelStyle={styles.fieldText}
            value={placeAdInput.parking}
            onValueChange={(value: any) =>setPlaceAdInput({...placeAdInput, parking:value})}
            color={'grey'}
            containerStyle={{marginBottom: 20}}
          />

          <Button
            label={'Next'}
            style={{backgroundColor: AppColors.lightBlue}}
            onPress={nextScreen}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default SaleRentPlaceAd;
