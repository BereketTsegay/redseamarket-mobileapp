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
      fieldText:{
        fontSize:12,
        fontFamily:AppFonts.POPPINS_LIGHT
        
      },
      smallButton:{
        backgroundColor:'white',
        paddingHorizontal:30,
        paddingVertical:5,
        borderRadius:20
      },
      heading:{
        fontSize:20, 
        fontFamily:AppFonts.POPPINS_SEMIBOLD,
        color:'white'
      },
      buttonText:{
        color:AppColors.darkBlue,
        fontSize:13,
        fontFamily:AppFonts.POPPINS_MEDIUM
      },
      insideView:{
        backgroundColor:'white',
        marginHorizontal:20,
        marginVertical:10,
        elevation:10,
        borderRadius:15,
        padding:15
      }
})

export default styles;