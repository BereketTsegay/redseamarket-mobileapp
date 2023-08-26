import React, { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import { Image, Text, View } from 'react-native-ui-lib';
import FavoriteComponent from './FavoriteComponent';
import styles from '../screens/category/styles';
import { useNavigation } from '@react-navigation/native';
import AppImages from '../constants/AppImages';
import { RouteNames } from '../navigation';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { CommonContext } from '../api/commonContext';

interface props {
  data : any;
  countryId? : any;
  categoryName? : any;
  close?  : any
}

const CategoryListComponent = ({data, countryId, categoryName, close} : props) => {
  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage,
  );
  const strings = useSelector(
    (state: RootState) => state.language.resources[currentLanguage],
  );
  const {commonInput, setCommonInput} = useContext(CommonContext);
    const navigation = useNavigation();
    const {currencyLists} = useSelector((state: RootState) => state.CurrencyList);
   
    return (
        <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => {
          return (
                 <TouchableOpacity
                 onPress={() => {
                   navigation.navigate(RouteNames.DetailsScreen, {
                     adId: item.id,
                     countryId: countryId,
                     edit:false
                   });
                 close();
                 }}>
                <View style={styles.view1}>
                  <View style={styles.rowView}>
                    <View>
                    {item.featured_flag == 1 &&
                    <View center style={styles.featuredView}>
                      <Text style={styles.featuredText}>{strings.featured}</Text>
                    </View>}
                    </View>
                    <FavoriteComponent
                      id={item.id}
                      status={item.isFavourite}
                    />
                  </View>

                  <View style={styles.rowView}>
                    <Image
                      source={
                        item.image == null ||
                        item.image.length == 0 ||
                        item.image[0].image == null
                          ? AppImages.PLACEHOLDER
                          : {
                              uri:
                                'https://admin-jamal.prompttechdemohosting.com/' +
                                item.image[0].image,
                            }
                      }
                      style={{width: 70, height: 70, borderRadius:40}}
                    />
                    <View flex left marginH-20>
                      {/* <Text style={styles.jobText}>TCS Solutions</Text> */}
                      <Text style={[styles.jobText, {color: 'black'}]}>
                      {commonInput.language == 'ar' ? item.title_arabic ? item.title_arabic : item.title : item.title}
                      </Text>
                      <Text style={styles.jobText1}>
                       {(categoryName || item.category.name) == 'Jobs' ? strings.salary + ' -' : strings.price + ' -'} {currencyLists?.currency.currency_code}{' '}
                        {(currencyLists?.currency.value * item.price)
                          .toFixed()
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      </Text>
                    </View>
                  </View>

                  <View marginV-10>
                    <Text style={styles.text}>{strings.description}</Text>
                    <Text numberOfLines={1} ellipsizeMode='tail' style={[styles.text, {opacity: 0.75}]}>
                    {commonInput.language == 'ar' ? item.description_arabic ? item.description_arabic : item.description : item.description}
                    </Text>
                  </View>

                  <View marginB-10 style={styles.rowView}>
                    <View row center>
                      <Image source={AppImages.LOCATION} style={{height:15,width:15}}/>
                    <Text>{item.state_name + ',' + item.country_name}</Text>
                    </View>
                    <Text>{item.created_on}</Text>
                  </View>
                </View>
                </TouchableOpacity>
             
          );
        }}
      />
    );
  };

export default CategoryListComponent;
