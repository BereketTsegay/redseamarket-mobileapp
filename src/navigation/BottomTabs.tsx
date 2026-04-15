import React, { useEffect, useRef } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native-ui-lib';
import { StyleSheet, Animated } from 'react-native';
import { CurvedBottomBar } from 'react-native-curved-bottom-bar';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from './RoutesParams';
import { RouteNames } from './Routes';
import AppImages from '../constants/AppImages';
import AppFonts from '../constants/AppFonts';
import ProfileScreen from '../screens/menu/ProfileScreen';
import AdsScreen from '../screens/ads/AdsScreen';
import FavoritesScreen from '../screens/fav/FavoritesScreen';
import HomeScreen from '../screens/home/HomeScreen';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { fetchProfileDetails } from '../api/profile/ProfileDetailsSlice';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';

export type BottomTabsNavigationProps =
  NativeStackNavigationProp<RootStackParams, 'BottomTabs'>;

const BottomTabs: React.FC = () => {
  const navigation = useNavigation<BottomTabsNavigationProps>();
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();

  const strings = useSelector(
    (state: RootState) =>
      state.language.resources[state.language.currentLanguage],
  );

  useEffect(() => {
    dispatch(fetchProfileDetails({ requestBody: '' }));
  }, []);

  const handleCenterClick = () => {
    navigation.navigate('PostScreen', { editData: null });
  };

  // 🔥 ANIMATED TAB ICON
  const AnimatedTab = ({ isActive, icon, label }) => {
    const scale = useRef(new Animated.Value(1)).current;

    useEffect(() => {
      Animated.spring(scale, {
        toValue: isActive ? 1.15 : 1,
        useNativeDriver: true,
      }).start();
    }, [isActive]);

    return (
      <Animated.View
        style={[
          styles.tabItem,
          isActive && styles.activeTab,
          { transform: [{ scale }] },
        ]}
      >
        <Image
          source={icon}
          style={[
            styles.icon,
            { tintColor: isActive ? '#1E88E5' : '#9AA0A6' },
          ]}
        />

        <Text
          style={[
            styles.label,
            { color: isActive ? '#1E88E5' : '#9AA0A6' },
          ]}
        >
          {label}
        </Text>
      </Animated.View>
    );
  };

  const renderIcon = (routeName, selectedTab) => {
    let icon, label;

    switch (routeName) {
      case RouteNames.HomeScreen:
        icon = AppImages.HOME;
        label = strings.home;
        break;
      case RouteNames.FavoritesScreen:
        icon = AppImages.HEART_FILL;
        label = strings.favorites;
        break;
      case RouteNames.AdsScreen:
        icon = AppImages.AD;
        label = strings.myAds;
        break;
      case RouteNames.ProfileScreen:
        icon = AppImages.MENU;
        label = strings.menu;
        break;
    }

    return (
      <AnimatedTab
        isActive={routeName === selectedTab}
        icon={icon}
        label={label}
      />
    );
  };

  const renderTabBar = ({ routeName, selectedTab, navigate }) => (
    <TouchableOpacity
      onPress={() => navigate(routeName)}
      style={styles.tabWrapper}
      activeOpacity={0.7}
    >
      {renderIcon(routeName, selectedTab)}
    </TouchableOpacity>
  );

  return (
    <CurvedBottomBar.Navigator
      type="DOWN"
      height={60}
      circleWidth={60}
      bgColor="#FFFFFF"  
      screenOptions={{ headerShown: false }}
      initialRouteName={RouteNames.HomeScreen}

      // 🔥 FLOATING CENTER BUTTON
      renderCircle={() => (
        <TouchableOpacity
          onPress={handleCenterClick}
          activeOpacity={0.9}
          style={styles.centerWrapper}>
          <View style={styles.centerButton}>
            <Image
              source={AppImages.ADD}
              style={{ width: 28, height: 28, tintColor: '#fff' }}
            />
          </View>
        </TouchableOpacity>
      )}

      tabBar={renderTabBar}
    >
      <CurvedBottomBar.Screen
        name={RouteNames.HomeScreen}
        position="LEFT"
        component={HomeScreen}
      />
      <CurvedBottomBar.Screen
        name={RouteNames.FavoritesScreen}
        position="LEFT"
        component={FavoritesScreen}
      />
      <CurvedBottomBar.Screen
        name={RouteNames.AdsScreen}
        position="RIGHT"
        component={AdsScreen}
      />
      <CurvedBottomBar.Screen
        name={RouteNames.ProfileScreen}
        position="RIGHT"
        component={ProfileScreen}
      />
    </CurvedBottomBar.Navigator>
  );
};

export default BottomTabs;

/* ================= 🔥 NEXT LEVEL STYLES ================= */

const styles = StyleSheet.create({
  tabWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },

  activeTab: {
    backgroundColor: '#E3F2FD',
  },

  icon: {
    width: 22,
    height: 22,
  },

  label: {
    fontSize: 10,
    fontFamily: AppFonts.POPPINS_MEDIUM,
    marginTop: 3,
  },

  // 🔥 FLOATING CENTER BUTTON
  centerWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  centerButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#1E88E5',

    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -50,
  },

  // 🔴 BADGE
  badge: {
    position: 'absolute',
    top: -4,
    right: -10,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },

  badgeText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: '600',
  },
});