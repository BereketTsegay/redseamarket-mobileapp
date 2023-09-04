import React, {useState, useEffect} from 'react';
import {Button, Image, Text, View} from 'react-native-ui-lib';
import {RootStackParams, RouteNames} from '../../navigation';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import AppColors from '../../constants/AppColors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppStrings from '../../constants/AppStrings';
import {Linking, Modal, TouchableOpacity} from 'react-native';
import Header from '../../components/Header';
import styles from './styles';
import AppImages from '../../constants/AppImages';
import {AnyAction, ThunkDispatch} from '@reduxjs/toolkit';
import {RootState} from '../../../store';
import {useDispatch, useSelector} from 'react-redux';
import {fetchJobProfileList} from '../../api/jobs/JobProfileListSlice';
export type ProfileScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'ProfileScreen'
>;

export type ProfileScreenRouteProps = RouteProp<
  RootStackParams,
  'ProfileScreen'
>;

interface Props {
  image: any;
  name: any;
  onPress?: any;
  number?: any;
}

const ProfileScreen: React.FC<Props> = () => {
  const navigation = useNavigation<ProfileScreenNavigationProps>();
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const [exitModal, setExitModal] = useState(false);
  const {jobProfileList} = useSelector(
    (state: RootState) => state.JobProfileList,
  );
  const {profileDetails} = useSelector(
    (state: RootState) => state.ProfileDetails,
  );
  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage,
  );
  const strings = useSelector(
    (state: RootState) => state.language.resources[currentLanguage],
  );

  useEffect(() => {
    dispatch(fetchJobProfileList({requestBody: ''}));
  }, []);

  const openCall = number => {
    Linking.openURL(`tel:${number}`);
  };

  const Logout = async () => {
    setExitModal(false)
    await AsyncStorage.removeItem(AppStrings.ACCESS_TOKEN);
    await AsyncStorage.removeItem(AppStrings.COUNTRY);
    navigation.replace(RouteNames.LoginScreen);
  };

  const List = ({image, name, onPress, number}: Props) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <View row paddingV-8 centerV style={{justifyContent: 'space-between'}}>
          <Image source={image} style={{width: 25, height: 27}} />
          <View flex left marginL-20>
            <Text style={styles.title}>{name}</Text>
          </View>
          <View row centerV>
            {number ? (
              <View
                paddingH-10
                center
                marginR-10
                backgroundColor={AppColors.lightBlue}>
                <Text style={[styles.title, {color: AppColors.white}]}>
                  {number && number}
                </Text>
              </View>
            ) : (
              <View />
            )}
            <Image source={AppImages.RIGHT_ARROW} />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View flex backgroundColor="#FFFFFF">
      <Header />

      <Modal
        visible={exitModal}
        animationType="none"
        transparent={true}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View
            paddingH-20
            paddingV-15
            style={{
              backgroundColor: 'white',
              width: '80%',
              borderRadius: 10,
            }}>
            <Text style={styles.title}>Do you want to exit?</Text>
            <View row marginT-20 style={{justifyContent: 'space-between'}}>
              <Button
                label={'No'}
                backgroundColor={AppColors.white}
                style={{borderWidth: 1, borderColor: AppColors.lightBlue}}
                labelStyle={styles.title}
                onPress={()=>setExitModal(false)}
              />
              <Button
                label={'Yes'}
                backgroundColor={AppColors.lightBlue}
                labelStyle={[styles.title, {color: 'white'}]}
                onPress={Logout}
              />
            </View>
          </View>
        </View>
      </Modal>
      <View flex>
        <View margin-20>
          <Text style={styles.subHeading}>{strings.myAccount}</Text>
          <List
            image={AppImages.PROFILE}
            name={strings.profile}
            onPress={() => navigation.navigate(RouteNames.EditProfile)}
          />

          <List
            image={AppImages.MYADS}
            name={strings.myAds}
            onPress={() => navigation.navigate(RouteNames.AdsScreen)}
            number={profileDetails?.data.myads}
          />

          <List
            image={AppImages.BRIEF}
            name={strings.myJobProfile}
            onPress={() => {
              jobProfileList?.data
                ? navigation.navigate('JobProfile', {
                    screen: RouteNames.MyJobDetails,
                  })
                : navigation.navigate('JobProfile', {
                    screen: RouteNames.MyJobProfile,
                  });
            }}
          />

          <List
            image={AppImages.HEART}
            name={strings.favorites}
            onPress={() => navigation.navigate(RouteNames.FavoritesScreen)}
            number={profileDetails?.data.myfavourite}
          />

          <View
            row
            paddingV-5
            centerV
            style={{justifyContent: 'space-between'}}>
            <Image source={AppImages.WALLET} style={{width: 25, height: 27}} />
            <View flex left marginL-20>
              <Text style={styles.title}>{strings.wallet}</Text>
            </View>
            <View paddingH-10 center backgroundColor={AppColors.lightBlue}>
              <Text style={[styles.title, {color: AppColors.white}]}>
                {profileDetails?.data.user.wallet
                  ? profileDetails?.data.user.wallet
                  : 0}{' '}
                USD
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        {/* <View margin-20>
          <Text style={styles.subHeading}>Settings</Text>
          <List image={AppImages.CITY} name={'City'}/>

          <List image={AppImages.LANG} name={'Language'}/>
        </View>


        <View style={styles.divider} /> */}

        <View margin-20>
          <Text style={styles.subHeading}>{strings.others}</Text>
          <List
            image={AppImages.SUPPORT}
            name={strings.policy}
            onPress={() =>
              Linking.openURL(
                'https://jamal.prompttechdemohosting.com/#/privacy/policy',
              )
            }
          />

          <List
            image={AppImages.TERMS}
            name={strings.terms}
            onPress={() => navigation.navigate(RouteNames.TermsAndConditions)}
          />

          {profileDetails?.data.user.phone && (
            <List
              image={AppImages.CALL}
              name={strings.callUs}
              onPress={() => openCall(profileDetails?.data.user.phone)}
            />
          )}

          <List
            image={AppImages.LOGOUT}
            name={strings.logout}
            onPress={() => setExitModal(true)}
          />
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;
