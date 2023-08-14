import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import { Image, Text, View } from 'react-native-ui-lib';
import FavoriteComponent from './FavoriteComponent';
import styles from '../screens/category/styles';
import { useNavigation } from '@react-navigation/native';
import AppImages from '../constants/AppImages';
import { RouteNames } from '../navigation';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface props {
  data : any;
  countryId? : any;
  onPress? : any;
  categoryName? : any
}

const CategoryListComponent = ({data, countryId, onPress, categoryName} : props) => {
  
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
                   });
                 }}>
                <View style={styles.view1}>
                  <View style={styles.rowView}>
                    <View>
                    {item.featured_flag == 1 &&
                    <View center style={styles.featuredView}>
                      <Text style={styles.featuredText}>Featured</Text>
                    </View>}
                    </View>
                    <FavoriteComponent
                      id={item.id}
                      status={item.isFavourite}
                      done={onPress}
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
                        {item.title}
                      </Text>
                      <Text style={styles.jobText1}>
                       {(categoryName || item.category.name) == 'Jobs' ? 'Salary -' : 'Price -'} {currencyLists?.currency.currency_code}{' '}
                        {(currencyLists?.currency.value * item.price)
                          .toFixed()
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      </Text>
                    </View>
                  </View>

                  <View marginV-10>
                    <Text style={styles.text}>Description</Text>
                    <Text numberOfLines={1} ellipsizeMode='tail' style={[styles.text, {opacity: 0.75}]}>
                      {item.description}
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
