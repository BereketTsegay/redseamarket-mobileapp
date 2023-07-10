import React, {useState, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Image, Text, TouchableOpacity, View} from 'react-native-ui-lib';
import {NavigationContainer, RouteProp} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParams } from './RoutesParams';
import { RouteNames } from './Routes';
import AppImages from '../constants/AppImages';
import AppColors from '../constants/AppColors';
import ProfileScreen from '../screens/menu/ProfileScreen';
import AdsScreen from '../screens/ads/AdsScreen';
import FavoritesScreen from '../screens/fav/FavoritesScreen';
import HomeScreen from '../screens/home/HomeScreen';
import PostListScreen from '../screens/post/PostListScreen';
import { Animated, StyleSheet } from 'react-native';
import { CurvedBottomBar } from 'react-native-curved-bottom-bar';


export type BottomTabsNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'BottomTabs'
>;

export type BottomTabsRouteProps = RouteProp<RootStackParams, 'BottomTabs'>;

interface Props {}

const BottomTabs: React.FC<Props> = () => {
  const navigation = useNavigation<BottomTabsNavigationProps>();
  
  const _renderIcon = (routeName, selectedTab) => {
    let icon = '';

    switch (routeName) {
      case 'title1':
        icon = AppImages.HOME;
        break;
      case 'title2':
        icon = AppImages.GOOGLE;
        break;
    }

    return (
      <Image
        source={icon}
        tintColor={routeName === selectedTab ? 'black' : 'gray'}
      />
    );
  };
  const renderTabBar = ({ routeName, selectedTab, navigate }) => {
    return (
      <TouchableOpacity
        onPress={() => navigate(routeName)}
        style={styles.tabbarItem}
      >
        {_renderIcon(routeName, selectedTab)}
      </TouchableOpacity>
    );
  };
  
  return (
    
   <CurvedBottomBar.Navigator
        type="DOWN"
        style={styles.bottomBar}
        shadowStyle={styles.shawdow}
        height={55}
        circleWidth={50}
        bgColor="white"
        initialRouteName="title1"
        borderTopLeftRight
        renderCircle={({ selectedTab, navigate }) => (
          <Animated.View style={styles.btnCircleUp}>
            <TouchableOpacity
              style={styles.button}
            >
              <Image source={AppImages.HOME}/>
            </TouchableOpacity>
          </Animated.View>
        )}
        tabBar={renderTabBar}
      >
        <CurvedBottomBar.Screen
          name="title1"
          position="LEFT"
          component={HomeScreen}
        />
        <CurvedBottomBar.Screen
          name="title2"
          component={ProfileScreen}
          position="RIGHT"
        />
      </CurvedBottomBar.Navigator>
  );

  

};

export default BottomTabs;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    shawdow: {
      shadowColor: '#DDDDDD',
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 1,
      shadowRadius: 5,
    },
    button: {
      flex: 1,
      justifyContent: 'center',
    },
    bottomBar: {},
    btnCircleUp: {
      width: 60,
      height: 60,
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#E8E8E8',
      bottom: 30,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 1,
    },
    imgCircle: {
      width: 30,
      height: 30,
      tintColor: 'gray',
    },
    tabbarItem: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    img: {
      width: 30,
      height: 30,
    },
    screen1: {
      flex: 1,
      backgroundColor: '#BFEFFF',
    },
    screen2: {
      flex: 1,
      backgroundColor: '#FFEBCD',
    },
  });




