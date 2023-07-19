import {StyleSheet} from 'react-native';
import AppFonts from '../../constants/AppFonts';
import AppColors from '../../constants/AppColors';

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
  heading: {
    fontSize: 20,
    fontFamily: AppFonts.POPPINS_SEMIBOLD,
    color: 'black',
  },
  subHeading: {
    fontSize: 10,
    fontFamily: AppFonts.POPPINS_LIGHT,
    color: 'black',
  },
  AdTitle: {
    fontSize: 18,
    fontFamily: AppFonts.POPPINS_SEMIBOLD,
    color: 'black',
    alignSelf:'center',
    marginVertical:10
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex:1,
    marginVertical:30
  },
  itemContainer: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title:{
    fontSize: 12,
    fontFamily: AppFonts.POPPINS_REGULAR,
    color: 'black',
  },
  fieldStyle:{
    borderWidth:1,
    borderColor:AppColors.lightBlue,
    height:45,
    borderRadius:8
  },
  fieldStyle1:{
    
    backgroundColor:'#B5B5B5',
    height:45,
    borderRadius:8
  },
  fieldText:{
    fontSize:12,
    fontFamily:AppFonts.POPPINS_LIGHT
    
  },
  buttonLabelStyle:{
fontSize:14,
fontFamily:AppFonts.POPPINS_MEDIUM,
color:'black'
  },
  bottomView:{
    position:'absolute',
    bottom:0,
    backgroundColor:'white',
    width:'100%',
    paddingVertical:20,
    paddingHorizontal:30,
    elevation:10,
    borderTopRightRadius:40,
    borderTopLeftRadius:40
  },
  card:{
    height:40,
    borderWidth:1,
    borderColor:'#BBBBBB7A',
    borderRadius:6,
    marginBottom:20,
    flexDirection:'row',
    justifyContent:"space-between",
    alignItems:'center',
    paddingHorizontal:15
  }
});
export default styles;
