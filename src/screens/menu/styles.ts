import { StyleSheet } from "react-native";
import AppFonts from "../../constants/AppFonts";

const styles = StyleSheet.create({
divider:{
    borderBottomColor:'#707070',
    borderBottomWidth:1,
},
subHeading:{
    color:'grey',
    fontFamily:AppFonts.POPPINS_SEMIBOLD,
    fontSize:14
},
title:{
    color:'black',
    fontFamily:AppFonts.POPPINS_MEDIUM,
    fontSize:16
},
circle: {
    height: 25,
    width: 25,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  AdTitle: {
    fontSize: 18,
    fontFamily: AppFonts.POPPINS_SEMIBOLD,
    color: 'black',
    alignSelf:'center',
    marginVertical:10
  },
  imageView:{
    alignSelf:'center',
    marginBottom:20
  }
})

export default styles;