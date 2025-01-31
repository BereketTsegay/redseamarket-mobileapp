import { StyleSheet } from "react-native";
import AppFonts from "../../constants/AppFonts";
import AppColors from "../../constants/AppColors";

const styles = StyleSheet.create({
    circle: {
        height: 25,
        width: 25,
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
      },
      fieldStyle:{
        backgroundColor:'white',
        elevation:10,
        borderRadius:20
      },
      fieldText:{
        fontSize:16,
        fontFamily:AppFonts.POPPINS_MEDIUM,
        left:10
      },
      countText:{
fontSize:10,
fontFamily:AppFonts.POPPINS_LIGHT,
color:AppColors.darkBlue
      }
})

export default styles;