import { StyleSheet } from "react-native";
import AppColors from "../../constants/AppColors";
import AppFonts from "../../constants/AppFonts";

const styles = StyleSheet.create({
    container:{
    flex:1,
    justifyContent:'flex-end',
    paddingTop:20
    },
    view:{
      backgroundColor:AppColors.white,
      borderTopStartRadius:44,
      borderTopEndRadius:44,
      paddingHorizontal:50,
      paddingVertical:40
    },
    text:{
      fontSize:24,
      color:AppColors.white,
      fontFamily:AppFonts.POPPINS_REGULAR
    },
    text1:{
      fontSize:24,
      color:AppColors.white,
      fontFamily:AppFonts.POPPINS_SEMIBOLD,
    },
    text2:{
      fontFamily:AppFonts.POPPINS_MEDIUM,
      color:AppColors.darkBlue,
      fontSize:15
    },
    button:{
      borderColor:AppColors.blue,
      borderWidth:1,
      paddingVertical:5,
      borderRadius:8,
      alignItems:'center',
      justifyContent:'center',
      width:'100%',
      marginTop:50
    },
    
    heading:{
        color:AppColors.primaryBlue,
        fontSize:22,
        fontFamily:AppFonts.POPPINS_MEDIUM,
    },
    subTitle:{
        color:AppColors.darkishBlue,
        fontSize:10,
        fontFamily:AppFonts.POPPINS_MEDIUM,
        textAlign:'center',
        width:'70%'
    },
    numberText:{
      fontSize:17,
      color:AppColors.darkBlue,
      fontFamily:AppFonts.POPPINS_BOLD
    },
    textInputContainer: {
      marginVertical: 20,
    },
    roundedTextInput: {
      borderWidth: 1,
      borderColor:'#707070'
    },
  });

  export default styles;