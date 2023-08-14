import React, {useState, useEffect, useContext} from 'react';
import {Button, Image, Incubator, Text, View} from 'react-native-ui-lib';
import {RootStackParams, RouteNames} from '../../navigation';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
import AppImages from '../../constants/AppImages';
import styles from './styles';
import {CommonContext} from '../../api/commonContext';
import {apiClient} from '../../api/apiClient';
import CategoryListComponent from '../../components/CategoryListComponent';

const {TextField} = Incubator;
export type SearchListScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'SearchListScreen'
>;

export type SearchListScreenRouteProps = RouteProp<
  RootStackParams,
  'SearchListScreen'
>;

interface Props {}

const SearchListScreen: React.FC<Props> = () => {
  const navigation = useNavigation<SearchListScreenNavigationProps>();
  const [searchKey, setSearchKey] = useState('');
  const {commonInput, setCommonInput} = useContext(CommonContext);
  const [searchData, setSearchData] = useState([]);

  useEffect(()=>{
    list('')
  },[])

  const list = (searchValue) => {
    let request = JSON.stringify({
      search_key: searchValue,
      country: commonInput.common_country_id,
    });
    apiClient('app/customer/search/ads', 'POST', request).then(response => {
      setSearchData(response.data.ads);
    });
  };

  const favDone = () => {
    list(searchKey);
  };

  return (
    <View flex backgroundColor="#FFFFFF" padding-20>
      <TextField
        fieldStyle={styles.fieldStyle}
        style={styles.fieldText}
        padding-10
        placeholder={'Search'}
        value={searchKey}
        onChangeText={text =>{setSearchKey(text)
        list(text)}}
        // onSubmitEditing={list}
        trailingAccessory={
          <TouchableOpacity onPress={()=>list(searchKey)}>
            <Image
              source={AppImages.SEARCH}
              style={{width: 18, height: 18, right: 5}}
            />
          </TouchableOpacity>
        }
        leadingAccessory={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={styles.circle}>
              <Image
                source={AppImages.ARROW_LEFT}
                style={{width: 25, height: 25}}
              />
            </View>
          </TouchableOpacity>
        }
      />
      {searchData.length == 0 ? (
        <View flex center>
          <Text>Nothing in Search</Text>
        </View>
      ) : (
        <View marginV-20>
          <CategoryListComponent
            data={searchData}
            countryId={commonInput.common_country_id}
            onPress={favDone}
          />
        </View>
      )}
    </View>
  );
};

export default SearchListScreen;
