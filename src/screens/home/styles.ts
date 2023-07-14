import { StyleSheet } from "react-native";
import AppFonts from "../../constants/AppFonts";
import AppColors from "../../constants/AppColors";

const styles = StyleSheet.create({
  topBackground:{
    backgroundColor:AppColors.darkBlue,
    height:200,
    justifyContent:'space-between',
    paddingHorizontal:10,
    paddingTop:20
  },
    rowContainer: {
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // alignItems: 'center',
        // width:'100%',
      },
      dropdown1BtnStyle: {
        backgroundColor: 'white',
        borderRadius: 40,
        borderWidth: 1,
        borderColor: 'white',
        paddingHorizontal: 15,
        height: 40,
        width:'40%',
        
      },
      dropdown1BtnTxtStyle: { color: '#444', textAlign: 'left' },
      dropdown1DropdownStyle: { backgroundColor: '#EFEFEF' },
      dropdown1RowStyle: {
        backgroundColor: '#EFEFEF',
        borderBottomColor: '#C5C5C5',
      },
      dropdown1RowTxtStyle: { color: '#444', textAlign: 'left' },
      textFieldStyle: {
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: 'white',
        borderRadius: 40,
        marginHorizontal: 10,
      },
      categoryText:{
        fontSize:14,
        fontFamily:AppFonts.POPPINS_SEMIBOLD,
        color:'black',
        textAlign:'left'
      },
      priceText:{
        fontSize:8,
        color:AppColors.darkBlue,
        fontFamily:AppFonts.POPPINS_SEMIBOLD
      },
      nameText:{
        fontSize:8,
        color:'#000000',
        fontFamily:AppFonts.POPPINS_LIGHT
      },
      cityText:{
        fontSize:8,
        color:'#000000',
        fontFamily:AppFonts.POPPINS_EXTRA_LIGHT
      }
  });

export default styles