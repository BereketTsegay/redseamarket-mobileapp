import React, {useEffect, useState} from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  Modal,
} from 'react-native-ui-lib';
import {RootStackParams, RouteNames} from '../../navigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import AppColors from '../../constants/AppColors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppStrings from '../../constants/AppStrings';
import {Linking, ScrollView} from 'react-native';
import styles from './styles';
import {AnyAction, ThunkDispatch} from '@reduxjs/toolkit';
import {RootState} from '../../../store';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProfileDetails} from '../../api/profile/ProfileDetailsSlice';

export type ProfileScreenNavigationProps =
  NativeStackNavigationProp<RootStackParams, 'ProfileScreen'>;

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<ProfileScreenNavigationProps>();
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();

  const [exitModal, setExitModal] = useState(false);

  const {profileDetails} = useSelector(
    (state: RootState) => state.ProfileDetails,
  );

  const strings = useSelector(
    (state: RootState) =>
      state.language.resources[state.language.currentLanguage],
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(fetchProfileDetails({requestBody: ''}));
    });
    return unsubscribe;
  }, [navigation]);

  const Logout = async () => {
    setExitModal(false);
    await AsyncStorage.removeItem(AppStrings.ACCESS_TOKEN);
    navigation.replace(RouteNames.LoginScreen);
  };

  // ================= MENU ITEM =================
  const MenuItem = ({icon, label, onPress, number}: any) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.menuItem}>
        <View row centerV spread>
          
          {/* LEFT SIDE */}
          <View row centerV>
            <Text style={styles.iconText}>{icon}</Text>

            <Text style={styles.menuText}>{label}</Text>
          </View>

          {/* RIGHT SIDE */}
          <View row centerV>
            {number ? (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{number}</Text>
              </View>
            ) : null}

            <Text style={styles.arrow}>›</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View flex style={{backgroundColor: AppColors.white}}>

      {/* ================= HEADER ================= */}
      <View style={styles.profileCard}>
        <View row centerV>
          {profileDetails?.data.profile_picture ? (
            <Image
              source={{uri: profileDetails.data.profile_picture}}
              style={styles.avatar}
            />
          ) : (
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {profileDetails?.data?.name?.charAt(0) || 'U'}
              </Text>
            </View>
          )}

          <View marginL-12>
            <Text style={styles.name}>
              {profileDetails?.data?.name || 'User'}
            </Text>
            <Text style={styles.email}>
              {profileDetails?.data?.email || ''}
            </Text>
          </View>
        </View>

        <View row spread marginT-15>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>
              {profileDetails?.data.myads || 0}
            </Text>
            <Text style={styles.statLabel}>Ads</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statNumber}>
              {profileDetails?.data.myfavourite || 0}
            </Text>
            <Text style={styles.statLabel}>Favorites</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statNumber}>
              {profileDetails?.data.wallet_balance?.amount || 0}
            </Text>
            <Text style={styles.statLabel}>Wallet</Text>
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{paddingHorizontal: 16, paddingBottom:10}}>

          {/* ================= ALL MENU ITEMS ================= */}

          <Text style={styles.sectionTitle}>Account</Text>

          <MenuItem
            icon="👤"
            label={strings.profile}
            onPress={() => navigation.navigate(RouteNames.EditProfile)}
          />

          <MenuItem
            icon="📢"
            label={strings.myAds}
            number={profileDetails?.data.myads}
            onPress={() => navigation.navigate(RouteNames.AdsScreen)}
          />

            <MenuItem
            icon="❤️"
            label={strings.favorites}
            number={profileDetails?.data.myfavourite}
            onPress={() => navigation.navigate(RouteNames.FavoritesScreen)}
          />

          <Text style={styles.sectionTitle}>Jobs</Text>

          <MenuItem
            icon="💼"
            label={strings.myJobProfile}
            onPress={() =>
              navigation.navigate('JobProfile')}
          />

          <MenuItem
            icon="📊"
            label={strings.myJobDashboard}
            onPress={() =>
              navigation.navigate('JobProfile', {
                screen: jobProfileList?.data
                  ? RouteNames.MyJobDetails
                  : RouteNames.MyJobProfile,
              })
            }
          />

          <MenuItem
            icon="🔍"
            label={strings.candidateSearch}
            onPress={() => {}}
          />

          <MenuItem
            icon="🏢"
            label={strings.myRecruiterProfile}
            onPress={() => {}}
          />

          <Text style={styles.sectionTitle}>Others</Text>

          <MenuItem
            icon="📄"
            label={strings.policy}
            onPress={() =>
              Linking.openURL(
                'https://demo.redsea-market.com/page/privacy-policy',
              )
            }
          />

          <MenuItem
            icon="📑"
            label={strings.terms}
            onPress={() => navigation.navigate(RouteNames.TermsAndConditions)}
          />

          {profileDetails?.data.phone_number && (
            <MenuItem
              icon="📞"
              label={strings.callUs}
              onPress={() =>
                Linking.openURL(`tel:${profileDetails?.data.phone_number}`)
              }
            />
          )}

          <MenuItem
            icon="↪️"
            label={strings.logout}
            onPress={() => setExitModal(true)}
          />
        </View>
      </ScrollView>

      {/* ================= LOGOUT MODAL ================= */}
      <Modal visible={exitModal} transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.title}>Do you want to logout?</Text>

            <View row spread marginT-20>
              <TouchableOpacity onPress={() => setExitModal(false)}>
                <Text>No</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={Logout}>
                <Text style={{color: 'red'}}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ProfileScreen;