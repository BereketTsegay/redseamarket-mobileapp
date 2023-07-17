import { StyleSheet } from "react-native";
import AppFonts from "../../constants/AppFonts";
import AppColors from "../../constants/AppColors";

const styles = StyleSheet.create({
    circle:{
        height:25,
        width:25,
        borderRadius:20,
        backgroundColor:'#FFFFFF',
        alignItems:'center',
        justifyContent:'center',
        elevation:3
    },
    text:{
        fontSize:12,
        color:'black',
        fontFamily:AppFonts.POPPINS_LIGHT
    },
    row:{
        justifyContent:'space-between',
        borderTopColor:'#707070',
        borderTopWidth:1,
        borderBottomColor:'#707070',
        borderBottomWidth:1,
        paddingHorizontal:20,
        marginVertical:20,
        paddingVertical:10
    },
    view:{
        borderRadius:20,
        borderColor:'#707070',
        borderWidth:1,
        marginBottom:20,
        paddingBottom:20,
    },
    priceText:{
        fontSize:20,
        color:AppColors.darkBlue,
        fontFamily:AppFonts.POPPINS_SEMIBOLD
    },
    titleText:{
        fontSize:12,
        color:'black',
        fontFamily:AppFonts.POPPINS_REGULAR,
        opacity:0.5
    },
    locationText:{
        fontSize:10,
        color:'black',
        fontFamily:AppFonts.POPPINS_REGULAR,
    }
})

export default styles;