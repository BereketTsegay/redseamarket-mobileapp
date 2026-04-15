import { Dimensions, StyleSheet } from "react-native";
import AppColors from "../../constants/AppColors";
import AppFonts from "../../constants/AppFonts";

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container:{
  borderBottomColor:AppColors.lightBlue,
  borderBottomWidth:4
    },
 image:{
    height:40,
    width:40,
    borderRadius:20,
 },
 nameText:{
    fontSize:13,
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
    fontSize:10,
    fontFamily:AppFonts.POPPINS_SEMIBOLD,
 },
 titleText:{
    color:'black',
    fontSize:10,
    fontFamily:AppFonts.POPPINS_REGULAR,
 },
 cityText:{
    color:'black',
    fontSize:10,
    fontFamily:AppFonts.POPPINS_LIGHT
 },
 view:{
   borderRadius: 4,
   elevation: 4,
   width: screenWidth / 3 - 20,
   margin: 5,
   backgroundColor: 'white',
   height: 140,
 }
})
export default styles;