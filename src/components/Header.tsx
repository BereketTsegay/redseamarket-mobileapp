import React from "react";
import { Image, Text, View } from "react-native-ui-lib";
import AppImages from "../constants/AppImages";
import styles from "../screens/fav/styles";
import AppFonts from "../constants/AppFonts";


const Header = ({ title }: { title: string }) => {
    return(
        <View row paddingH-20 paddingV-10 centerV style={styles.container}>
            <Text style={{ fontSize: 18, fontFamily: AppFonts.POPPINS_BOLD, color: '#333' }}>{title}</Text>
        </View>
    )
}
export default Header;