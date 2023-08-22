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
      paddingVertical:30
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
      marginVertical:10
    },
    inputLayout:{
        borderBottomWidth:1,
        borderBottomColor:'black',
        paddingBottom:5,
        marginVertical:10
    },
    floatStyle:{
        fontSize:12,
        fontFamily:AppFonts.POPPINS_LIGHT,
        color:'black'
    },
    heading:{
        color:AppColors.primaryBlue,
        fontSize:22,
        fontFamily:AppFonts.POPPINS_MEDIUM,
        alignSelf:'center'
    },
    bottomText:{
        color:AppColors.primaryBlue,
        fontSize:12,
        fontFamily:AppFonts.POPPINS_REGULAR,
        alignSelf:'center'
    },
    forgotText:{
      color:AppColors.primaryBlue,
      fontSize:12,
      fontFamily:AppFonts.POPPINS_MEDIUM,
  }
  });

  export default styles;