import { StyleSheet } from "react-native";
import AppColors from "../../constants/AppColors";
import AppFonts from "../../constants/AppFonts";

const styles = StyleSheet.create({
    circle:{
        height:25,
        width:25,
        borderRadius:20,
        backgroundColor:'#FFFFFF',
        alignItems:'center',
        justifyContent:'center'
    },
    priceText:{
        fontSize:21,
        color:AppColors.darkBlue,
        fontFamily:AppFonts.POPPINS_SEMIBOLD
    },
    titleText:{
        fontSize:21,
        color:'black',
        fontFamily:AppFonts.POPPINS_REGULAR
    },
    subHeading:{
        fontSize:12,
        fontFamily:AppFonts.POPPINS_SEMIBOLD,
        color:'black'
    }
})

export default styles;