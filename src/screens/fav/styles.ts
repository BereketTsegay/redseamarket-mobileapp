import { StyleSheet } from "react-native";
import AppColors from "../../constants/AppColors";
import AppFonts from "../../constants/AppFonts";

const styles = StyleSheet.create({
    container:{
  borderBottomColor:AppColors.lightBlue,
  borderBottomWidth:4
    },
 image:{
    height:50,
    width:50,
    borderRadius:25,
    borderWidth:2,
    borderColor:AppColors.lightBlue
 },
 nameText:{
    fontSize:14,
    fontFamily:AppFonts.POPPINS_MEDIUM,
    color:'black'
 },
 emailText:{
    fontSize:10,
    fontFamily:AppFonts.POPPINS_LIGHT,
    color:'black'
 },
 text:{
    color:AppColors.darkBlue,
    fontSize:22,
    fontFamily:AppFonts.POPPINS_SEMIBOLD,
    alignSelf:'center'
 },
 priceText:{
    color:AppColors.darkBlue,
    fontSize:8,
    fontFamily:AppFonts.POPPINS_SEMIBOLD,
 },
 titleText:{
    color:'black',
    fontSize:8,
    fontFamily:AppFonts.POPPINS_LIGHT,
 },
 cityText:{
    color:'black',
    fontSize:8,
    fontFamily:AppFonts.POPPINS_EXTRA_LIGHT
 },
 view:{
    borderRadius:4,
    elevation:4,
    width:105,
    margin:5,
    backgroundColor:'white'
 }
})
export default styles;