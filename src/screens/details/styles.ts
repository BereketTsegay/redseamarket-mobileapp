import { StyleSheet } from "react-native";
import AppColors from "../../constants/AppColors";
import AppFonts from "../../constants/AppFonts";

const styles = StyleSheet.create({
    circle:{
        height:25,
        width:25,
        borderRadius:20,
        backgroundColor:'#FFFFFF',
        alignItems:'center',
        justifyContent:'center'
    },
    priceText:{
        fontSize:21,
        color:AppColors.darkBlue,
        fontFamily:AppFonts.POPPINS_SEMIBOLD
    },
    titleText:{
        fontSize:21,
        color:'black',
        fontFamily:AppFonts.POPPINS_REGULAR
    },
    subHeading:{
        fontSize:12,
        fontFamily:AppFonts.POPPINS_SEMIBOLD,
        color:'black'
    },
    buttonView:{
        backgroundColor: 'white',
                position: 'absolute',
                bottom: 0,
                width: '100%',
                flexDirection:'row',
                justifyContent:'space-between',
                paddingVertical:20,
                paddingHorizontal:20
    },
    callButton:{
        backgroundColor:AppColors.lightBlue,
        width:'40%',
        borderRadius:15
    },
    mailButton:{
        borderWidth:1,
        borderColor:AppColors.darkBlue,
        backgroundColor:'white',
        width:'40%',
        borderRadius:15
    },
    row:{
        flexDirection:'row',
        justifyContent:'space-between',
        borderBottomColor:'#707070',
        borderBottomWidth:0.5,
        paddingVertical:10
    },
    motorText:{
        fontSize:14,
        color:'black',
        fontFamily:AppFonts.POPPINS_MEDIUM
    },
    motorText1:{
        fontSize:14,
        color:'black',
        fontFamily:AppFonts.POPPINS_REGULAR
    },
    featureText:{
        color:'#00000075',
        fontFamily:AppFonts.POPPINS_REGULAR,
        fontSize:8

    }
})

export default styles;