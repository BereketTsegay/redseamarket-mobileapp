import React, {useState, useEffect} from 'react';
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
  const {cat_id, sub_id} = route.params;
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
  useEffect(() => {}, []);

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

      <Text style={styles.AdTitle}>Tell us about your car</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View marginV-20>
          <InputField
            title={'Size'}
            multiline={false}
            height={45}
            type={'numeric'}
          />

          <InputField
            title={'Room'}
            multiline={false}
            height={45}
            type={'numeric'}
          />

          <Text style={[styles.title, {fontSize: 14, marginBottom: 20}]}>
            Furnished
          </Text>
          <RadioGroup
          // initialValue={}
          // onValueChange={(value: any) =>}
          >
            {renderRadioButton(1, 'Yes')}
            {renderRadioButton(2, 'No')}
          </RadioGroup>

          <ItemDropdown value={'Building Type'} data={data} />

          <Checkbox
            label={'Parking'}
            labelStyle={styles.fieldText}
            value={false}
            color={'grey'}
            containerStyle={{marginBottom: 20}}
          />

          <Button
            label={'Next'}
            style={{backgroundColor: AppColors.lightBlue}}
            onPress={() => navigation.navigate(RouteNames.SellerInformation)}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default SaleRentPlaceAd;
