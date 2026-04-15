import React from "react";
import { Image, Text, View } from "react-native-ui-lib";
import AppImages from "../constants/AppImages";
import styles from "../screens/fav/styles";
import { useSelector } from "react-redux";
import { RootState } from "../../store";


const Header = () => {
    const {profileDetails} = useSelector(
        (state: RootState) => state.ProfileDetails,
      );
    return(
        <View row paddingH-20 paddingV-10 centerV style={styles.container}>
        <Image source={profileDetails?.data.profile_picture ? {uri:profileDetails?.data.profile_picture} : AppImages.PLACEHOLDER} style={styles.image}/>
      <View paddingL-20>
        <Text style={styles.nameText}>{profileDetails?.data.full_name}</Text>
        <Text style={styles.emailText}>{profileDetails?.data.email}</Text>
      </View>
    </View>
    )
}
export default Header;