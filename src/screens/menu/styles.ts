import { StyleSheet } from "react-native";
import AppFonts from "../../constants/AppFonts";

const styles = StyleSheet.create({
divider:{
    borderBottomColor:'#707070',
    borderBottomWidth:1,
},
subHeading:{
    color:'grey',
    fontFamily:AppFonts.POPPINS_SEMIBOLD,
    fontSize:14
},
title:{
    color:'black',
    fontFamily:AppFonts.POPPINS_MEDIUM,
    fontSize:16
}
})

export default styles;