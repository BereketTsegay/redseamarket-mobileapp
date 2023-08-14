import { Dimensions, StyleSheet } from "react-native";
import AppFonts from "../../constants/AppFonts";
import AppColors from "../../constants/AppColors";
const screenWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  topBackground:{
    justifyContent:'space-between',
    paddingHorizontal:10,
    paddingTop:20,
    width: screenWidth,
    height:270,
  },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width:'100%',
        top:8
      },
      dropdown1BtnStyle: {
        backgroundColor: 'white',
        borderRadius: 40,
        borderWidth: 1,
        borderColor: 'white',
        height: 40,
        width:'25%',
        
      },
      dropdown1BtnTxtStyle: { color: '#444', textAlign: 'right' },
      dropdown1DropdownStyle: { backgroundColor: '#EFEFEF' },
      dropdown1RowStyle: {
        backgroundColor: '#EFEFEF',
        borderBottomColor: '#C5C5C5',
        
      },
      dropdown1RowTxtStyle: { color: '#444', textAlign: 'right' },
      textFieldStyle: {
        flex:1,
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: 'white',
        borderRadius: 40,
        paddingHorizontal:10,
        marginHorizontal:3
      },
      categoryText:{
        fontSize:14,
        fontFamily:AppFonts.POPPINS_SEMIBOLD,
        color:'black',
        textAlign:'left'
      },
      priceText:{
        fontSize:10,
        color:AppColors.darkBlue,
        fontFamily:AppFonts.POPPINS_SEMIBOLD
      },
      nameText:{
        fontSize:10,
        color:'#000000',
        fontFamily:AppFonts.POPPINS_LIGHT
      },
      cityText:{
        fontSize:10,
        color:'#000000',
        fontFamily:AppFonts.POPPINS_EXTRA_LIGHT
      },
      text:{
        fontSize:12,
        fontFamily:AppFonts.POPPINS_EXTRA_LIGHT,
        color:AppColors.darkBlue
      },
      categoryTitle:{
        fontSize:12,
        color:'#000000',
        fontFamily:AppFonts.POPPINS_REGULAR
      }
  });

export default styles