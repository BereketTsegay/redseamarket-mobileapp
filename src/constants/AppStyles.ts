import { StyleSheet } from "react-native";
import AppColors from "./AppColors";
import AppFonts from "./AppFonts";

const AppStyles = StyleSheet.create({
      dropdown1BtnStyle: {
        borderWidth:1,
        borderColor:AppColors.lightBlue,
        height:45,
        borderRadius:8,
        paddingHorizontal: 15,
        backgroundColor:'white',
        width:'100%',
        marginBottom:20
        
      },
      dropdown1BtnTxtStyle: {   fontSize:12,
        fontFamily:AppFonts.POPPINS_LIGHT,
    textAlign:'left',
    left:10 },
      dropdown1DropdownStyle: { backgroundColor: '#EFEFEF' },
      dropdown1RowStyle: {
        backgroundColor: '#EFEFEF',
        borderBottomColor: '#C5C5C5',
      },
      dropdown1RowTxtStyle: { color: '#444', textAlign: 'left' },
      fieldStyle:{
        borderWidth:1,
        borderColor:AppColors.lightBlue,
        height:45,
        borderRadius:8
      },
      fieldText:{
        fontSize:12,
        fontFamily:AppFonts.POPPINS_LIGHT
        
      },
      text:{
        fontSize:14,
        fontFamily:AppFonts.POPPINS_BOLD,
        color:'black'
      },
      text1:{
        fontSize:12,
        fontFamily:AppFonts.POPPINS_REGULAR,
        color:'black'
      },
      text2:{
        fontSize:16,
        fontFamily:AppFonts.POPPINS_BOLD,
        color:'green'
      },
      warnText:{
        color:'red',
        fontFamily:AppFonts.POPPINS_LIGHT,
        fontSize:10,
        bottom:20,
        alignSelf:'flex-end',
        width:'85%'
      }
      
  });

export default AppStyles