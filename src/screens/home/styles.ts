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
        top:8,
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
      dropdown1DropdownStyle: { backgroundColor: '#EFEFEF', borderRadius:10 },
      dropdown1RowStyle: {
        backgroundColor: '#EFEFEF',
        borderBottomColor: '#C5C5C5',
        
      },
      dropdown1RowTxtStyle: { color: '#444', textAlign: 'right' },
      textFieldStyle: {
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: 'white',
        borderRadius: 40,
        paddingHorizontal:5,
        height:40,
        width:'52%',
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row'
      },
      categoryText:{
        fontSize:14,
        fontFamily:AppFonts.POPPINS_SEMIBOLD,
        color:'black',
        textAlign:'left'
      },
      priceText:{
        fontSize:12,
        color:AppColors.darkBlue,
        fontFamily:AppFonts.POPPINS_SEMIBOLD
      },
      nameText:{
        fontSize:12,
        color:'#000000',
        fontFamily:AppFonts.POPPINS_REGULAR
      },
      cityText:{
        fontSize:10,
        color:'#000000',
        fontFamily:AppFonts.POPPINS_LIGHT
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
      },
      smallDropdown: {
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: 'white',
        borderRadius: 40,
        paddingHorizontal:5,
        elevation:20,
        width:85,
        height:40,
        alignItems:'center',
        justifyContent:'center'
      },
  });

export default styles