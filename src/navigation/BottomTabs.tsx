import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
  Animated,
} from 'react-native';
import { Image, Text } from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';

import ProfileScreen from '../screens/menu/ProfileScreen';
import AdsScreen from '../screens/ads/AdsScreen';
import FavoritesScreen from '../screens/fav/FavoritesScreen';
import HomeScreen from '../screens/home/HomeScreen';

import AppImages from '../constants/AppImages';
import AppFonts from '../constants/AppFonts';
import AppColors from '../constants/AppColors';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { fetchProfileDetails } from '../api/profile/ProfileDetailsSlice';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';

const BottomTabs: React.FC = () => {
  const navigation = useNavigation();
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();

  const [activeTab, setActiveTab] = useState('Home');
  const [replace, setReplace] = useState(false); // ✅ FIX

  const strings = useSelector(
    (state: RootState) =>
      state.language.resources[state.language.currentLanguage],
  );

  useEffect(() => {
    dispatch(fetchProfileDetails({ requestBody: '' }));
  }, []);

  /* 🔥 BACK HANDLER FIX */
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (activeTab !== 'Home' && !replace) {
          setActiveTab('Home');
          return true;
        } else if (replace) {
          setActiveTab('Menu');
          return true;
        }
        return false;
      },
    );
    return () => backHandler.remove();
  }, [activeTab, replace]);

  /* 🔥 TAB RENDER */
const renderTab = (tabName: string, iconName: any) => {
  const isActive = activeTab === tabName;

  const scale = useRef(new Animated.Value(1)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: isActive ? 1.15 : 1,
        friction: 5,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: isActive ? -4 : 0, // 🔥 slight lift
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isActive]);

  return (
    <TouchableOpacity
      key={tabName}
      style={styles.tabWrapper}
      onPress={() => setActiveTab(tabName)}
      activeOpacity={0.8}
    >
      <Animated.View
        style={[
          styles.tabItem,
          isActive && styles.activeTab,
          {
            transform: [{ scale }, { translateY }],
          },
        ]}
      >
        <Image
          source={iconName}
          style={{
            width: 24,
            height: 24,
            tintColor: isActive ? AppColors.blue : '#aaa',
          }}
        />

        <Text
          style={[
            styles.text,
            {
              color: isActive ? AppColors.blue : '#aaa',
            },
          ]}
        >
          {tabName}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

  /* 🔥 SCREEN SWITCH */
  const renderScreen = () => {
    switch (activeTab) {
      case 'Favorites':
        return <FavoritesScreen />;
      case 'MY Ads':
        return <AdsScreen />;
      case 'Menu':
        return <ProfileScreen />;
      case 'Home':
      default:
        return <HomeScreen />;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: AppColors.white}}>
      
      {/* 🔥 SCREEN */}
      {renderScreen()}

      {/* 🔥 BOTTOM BAR */}
      <View style={styles.container}>
        <View style={styles.tabBar}>

          {renderTab('Home', AppImages.HOME)}
          {renderTab('Favorites', AppImages.HEART_FILL)}

          {/* 🔥 SPACE FOR CENTER BUTTON */}
          <View style={{ width: 60 }} />

          {renderTab('MY Ads', AppImages.AD)}
          {renderTab('Menu', AppImages.MENU)}

        </View>

        {/* 🔥 CENTER BUTTON (FIXED) */}
        <TouchableOpacity
          style={styles.centerButton}
          activeOpacity={0.9}
          onPress={() =>
            navigation.navigate('PostScreen', { editData: null })
          }
        >
          <Image
            source={AppImages.ADD}
            style={{ width: 28, height: 28, tintColor: '#fff' }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },

  tabBar: {
    flexDirection: 'row',
    width: '100%',
    height: 70,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderColor: '#eee',

    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 10,
  },

  tabWrapper: {
    flex: 1,
    alignItems: 'center',
  },

tabItem: {
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 6,
  paddingHorizontal: 10,
  borderRadius: 16,
},

  activeTab: {
    backgroundColor: 'rgba(241, 200, 155, 0.15)',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 16,
  },

  text: {
    fontFamily: AppFonts.POPPINS_MEDIUM,
    fontSize: 11,
  },

  /* 🔥 CENTER BUTTON */
  centerButton: {
    position: 'absolute',
    top: -25,
    alignSelf: 'center',

    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: AppColors.darkBlue,

    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: AppColors.darkBlue,
    shadowOpacity: 0.4,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 12,
  },
});