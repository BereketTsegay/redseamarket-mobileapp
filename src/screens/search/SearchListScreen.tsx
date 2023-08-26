import React, {useState, useEffect, useContext, useRef} from 'react';
import {Button, Image, Incubator, Text, View} from 'react-native-ui-lib';
import {RootStackParams, RouteNames} from '../../navigation';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, TouchableOpacity} from 'react-native';
import AppImages from '../../constants/AppImages';
import styles from './styles';
import {CommonContext} from '../../api/commonContext';
import {apiClient} from '../../api/apiClient';
import CategoryListComponent from '../../components/CategoryListComponent';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

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

const SearchListScreen: React.FC<Props> = ({route}) => {
  const textFieldRef = useRef();
  const navigation = useNavigation<SearchListScreenNavigationProps>();
  const {alert} = route.params;
  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage,
  );
  const strings = useSelector(
    (state: RootState) => state.language.resources[currentLanguage],
  );
  const [searchKey, setSearchKey] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const {commonInput, setCommonInput} = useContext(CommonContext);
  const [searchData, setSearchData] = useState([]);
  const [alertData, setAlertData] = useState([]);

  useEffect(()=>{
    list('')
  },[])

  useEffect(()=>{
    if (alert == true){
    alertList()
    }
    else{
      null;
    }
  },[])

  const list = (searchValue) => {
    textFieldRef.current.blur();
    if(alert == true){
      setModalVisible(false)
    }
    let request = JSON.stringify({
      search_key: searchValue,
      country: commonInput.common_country_id,
    });
    apiClient('app/customer/search/ads', 'POST', request).then(response => {
      setSearchData(response.data.ads);
    });
  };

  const alertList = () => {
    
    let request = JSON.stringify({
      country: commonInput.common_country_id,
    });
    apiClient('app/customer/search/alert', 'POST', request).then(response => {
      setAlertData(response.data.data);
      setModalVisible(true)
    });
  };

  const handleFocus = () => {
    if (alert) {
      alertList();
      
    }
  };

  return (
    <View flex backgroundColor="#FFFFFF" padding-20>
      <View style={inlineStyles.frontView}>
      <TextField
       ref={textFieldRef}
        fieldStyle={styles.fieldStyle}
        style={styles.fieldText}
        padding-10
        placeholder={strings.search}
        value={searchKey}
        onChangeText={text =>{setSearchKey(text)}}
        onFocus={handleFocus}
        onSubmitEditing={()=>list(searchKey)}
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
      {modalVisible &&
      <View style={{backgroundColor:'white',paddingVertical:10}} marginT-4>
        {alertData.map((item, index)=>(
          <TouchableOpacity key={index} onPress={()=>{setSearchKey(item.search_key)
            list(item.search_key)
                                            setModalVisible(false)}}>
          <View row style={{justifyContent:'space-between'}} marginV-8 centerV>
            <Image source={AppImages.HISTORY} tintColor={'grey'} style={{width:25,height:25}}/>
            <View flex left marginL-10>
        <Text >{item.search_key}</Text>
        <Text style={styles.countText}>{item.ads_count} alert</Text>
        </View>
        <Image source={AppImages.UP_ARROW} tintColor={'grey'} style={{width:25,height:25}}/>
        
        </View>
        </TouchableOpacity>
        ))}
      </View>}
      </View>

      <View style={inlineStyles.backView}>
      {searchData.length == 0 ? (
        <View flex center>
          <Text>{strings.searchNothing}</Text>
        </View>
      ) : (
        <View marginV-20>
          <CategoryListComponent
            data={searchData}
            countryId={commonInput.common_country_id}
            close={()=>{
              null
            }}
          />
        </View>
      )}
      </View>
    </View>
  );
};

export default SearchListScreen;

const inlineStyles = StyleSheet.create({
  backView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    paddingHorizontal:20,
    paddingTop:'16%'
  },
  frontView: {
    position: 'relative',
    zIndex: 2,
  },
});
