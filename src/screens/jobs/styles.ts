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
      },
      title:{
          fontSize:16, 
          fontFamily:AppFonts.POPPINS_SEMIBOLD,
          color:AppColors.lightBlue
      },
      text:{
        color:'#4E4F50',
        fontSize:15,
        fontFamily:AppFonts.POPPINS_REGULAR
      },
      subHeading:{
        fontSize:15, 
        fontFamily:AppFonts.POPPINS_SEMIBOLD,
        color:'black'
      },
      divider:{
        borderBottomColor:'#D4CFCF',
        borderBottomWidth:1,
        marginVertical:5
      },
      box:{
        backgroundColor:'#DAE6F5',
        paddingHorizontal:20,
        paddingVertical:5,
        margin:5,
        borderRadius:20
      },
      boxText:{
        fontFamily:AppFonts.POPPINS_REGULAR,
        color:'black',
        fontSize:12
      },
      overView:{
        borderWidth:1,
        borderColor:'#7070705C',
        borderRadius:10,
        padding:10
      },
      cvView:{
        borderStyle:'dashed',
        borderWidth:1,
        borderColor:'#707070',
        borderRadius:10,
        padding:10
      },
      button:{
        backgroundColor:AppColors.lightBlue,
        width:'30%',
        position:'absolute',
        bottom:20,
        marginHorizontal:20
      }
})

export default styles;