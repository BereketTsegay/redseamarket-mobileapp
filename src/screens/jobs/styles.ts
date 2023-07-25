import { StyleSheet } from "react-native";
import AppFonts from "../../constants/AppFonts";
import AppColors from "../../constants/AppColors";

const styles =StyleSheet .create({
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
      fieldStyle:{
        borderWidth:1,
        borderColor:AppColors.lightBlue,
        height:45,
        borderRadius:8
      },
})

export default styles;