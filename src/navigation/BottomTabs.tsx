import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  BackHandler,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image, Text } from 'react-native-ui-lib';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { RootState } from '../../store';
import { fetchProfileDetails } from '../api/profile/ProfileDetailsSlice';
import AppColors from '../constants/AppColors';
import AppFonts from '../constants/AppFonts';
import AppImages from '../constants/AppImages';
import AdsScreen from '../screens/ads/AdsScreen';
import FavoritesScreen from '../screens/fav/FavoritesScreen';
import HomeScreen from '../screens/home/HomeScreen';
import ProfileScreen from '../screens/menu/ProfileScreen';

type TabName = 'Home' | 'Favorites' | 'MY Ads' | 'Menu';

type TabItem = {
  name: TabName;
  icon: any;
};

const TAB_BAR_HEIGHT = 70;
const CENTER_ACTION_SIZE = 48;

const TABS: TabItem[] = [
  { name: 'Home', icon: AppImages.HOME },
  { name: 'Favorites', icon: AppImages.HEART_FILL },
  { name: 'MY Ads', icon: AppImages.AD },
  { name: 'Menu', icon: AppImages.MENU },
];

const TabButton = ({
  item,
  isActive,
  onPress,
}: {
  item: TabItem;
  isActive: boolean;
  onPress: () => void;
}) => {
  const lift = useRef(new Animated.Value(isActive ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(lift, {
      toValue: isActive ? 1 : 0,
      friction: 7,
      tension: 90,
      useNativeDriver: true,
    }).start();
  }, [isActive, lift]);

  const iconScale = lift.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.08],
  });

  const translateY = lift.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -2],
  });

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={styles.tabTouchArea}
    >
      <Animated.View
        style={[
          styles.tabItem,
          isActive && styles.activeTabItem,
          { transform: [{ translateY }] },
        ]}
      >
        <Animated.View
          style={[
            styles.iconWrap,
            isActive && styles.activeIconWrap,
            { transform: [{ scale: iconScale }] },
          ]}
        >
          <Image
            source={item.icon}
            style={[
              styles.icon,
              {
                tintColor: isActive ? AppColors.darkBlue : AppColors.primaryBlue,
              },
            ]}
          />
        </Animated.View>

        <Text style={[styles.label, isActive && styles.activeLabel]}>
          {item.name}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const CenterActionButton = ({ onPress }: { onPress: () => void }) => {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.96,
      friction: 7,
      tension: 120,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 7,
      tension: 120,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.92}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={styles.centerActionTouch}
    >
      <Animated.View style={[styles.centerActionButton, { transform: [{ scale }] }]}>
        <Image source={AppImages.ADD} style={styles.centerActionIcon} />
      </Animated.View>
    </TouchableOpacity>
  );
};

const BottomTabs: React.FC = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const [activeTab, setActiveTab] = useState<TabName>('Home');
  const bottomInset = Math.max(insets.bottom, 12);
  const reservedTabSpace = TAB_BAR_HEIGHT + bottomInset;

  useEffect(() => {
    dispatch(fetchProfileDetails({ requestBody: '' }));
  }, [dispatch]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (activeTab !== 'Home') {
          setActiveTab('Home');
          return true;
        }

        return false;
      },
    );

    return () => backHandler.remove();
  }, [activeTab]);

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
    <View style={styles.screen}>
      <View style={[styles.content, { paddingBottom: reservedTabSpace }]}>
        {renderScreen()}
      </View>

      <View
        style={[
          styles.bottomShell,
          { paddingBottom: bottomInset },
        ]}
      >
        <View style={styles.tabBar}>
          <TabButton
            item={TABS[0]}
            isActive={activeTab === TABS[0].name}
            onPress={() => setActiveTab(TABS[0].name)}
          />
          <TabButton
            item={TABS[1]}
            isActive={activeTab === TABS[1].name}
            onPress={() => setActiveTab(TABS[1].name)}
          />
          <CenterActionButton
            onPress={() => navigation.navigate('PostScreen', { editData: null })}
          />
          <TabButton
            item={TABS[2]}
            isActive={activeTab === TABS[2].name}
            onPress={() => setActiveTab(TABS[2].name)}
          />
          <TabButton
            item={TABS[3]}
            isActive={activeTab === TABS[3].name}
            onPress={() => setActiveTab(TABS[3].name)}
          />
        </View>
      </View>
    </View>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: AppColors.white
  },
  content: {
    flex: 1,
  },
  bottomShell: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: AppColors.white,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 43, 183, 0.08)',
    shadowColor: '#0B1F4D',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: -3 },
    elevation: 8,
  },
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: TAB_BAR_HEIGHT,
    paddingHorizontal: 6,
    paddingVertical: 8,
    backgroundColor: AppColors.white,
  },
  tabTouchArea: {
    flex: 1,
    alignItems: 'center',
  },
  centerActionTouch: {
    width: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabItem: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderRadius: 16,
  },
  activeTabItem: {
    backgroundColor: 'rgba(67, 148, 255, 0.12)',
  },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  activeIconWrap: {
    backgroundColor: 'rgba(0, 82, 190, 0.14)',
  },
  icon: {
    width: 20,
    height: 20,
  },
  label: {
    fontFamily: AppFonts.POPPINS_MEDIUM,
    fontSize: 11,
    color: 'rgba(0, 37, 157, 0.72)',
  },
  activeLabel: {
    color: AppColors.darkBlue,
  },
  centerActionButton: {
    width: CENTER_ACTION_SIZE,
    height: CENTER_ACTION_SIZE,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.darkBlue,
    shadowColor: '#0B1F4D',
    shadowOpacity: 0.14,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  centerActionIcon: {
    width: 18,
    height: 18,
    tintColor: '#FFFFFF',
  },
});
