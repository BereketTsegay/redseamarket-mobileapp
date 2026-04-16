import {StyleSheet} from 'react-native';
import AppFonts from '../../constants/AppFonts';
import AppColors from '../../constants/AppColors';

const styles = StyleSheet.create({
  backBtn: {
    height: 42,
    width: 42,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E6E6E6',
  },

  heading: {
    fontSize: 20,
    fontFamily: AppFonts.POPPINS_SEMIBOLD,
    color: '#111',
  },

  subHeading: {
    fontSize: 12,
    fontFamily: AppFonts.POPPINS_REGULAR,
    color: '#8A8A8A',
    marginTop: 2,
  },

  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  // 🔥 NEW TILE DESIGN (KEY UPGRADE)
  tile: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 10,
    marginBottom: 18,
    alignItems: 'center',
  },

  tileIconBg: {
    width: 58,
    height: 58,
    borderRadius: 14,
    backgroundColor: '#F0F4FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },

  tileIcon: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },

  tileText: {
    fontSize: 13,
    fontFamily: AppFonts.POPPINS_MEDIUM,
    color: '#222',
    textAlign: 'center',
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
  fieldStyle1:{
    
    backgroundColor:'#B5B5B5',
    height:45,
    borderRadius:4
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
  },
  labelStyle:{
    fontSize:12,
    fontFamily:AppFonts.POPPINS_REGULAR,
    color:'black',
    top:2,
    left:2
  },

categoryBadge: {
  alignSelf: 'flex-start',
  backgroundColor: '#E6F0FF', // light blue background
  paddingHorizontal: 12,
  paddingVertical: 6,
  borderRadius: 20,
},

categoryText: {
  fontSize: 14,
  color: '#1A73E8', // primary blue
  fontFamily: AppFonts.POPPINS_SEMIBOLD,
},
card1: {
  backgroundColor: '#FFFFFF',
  borderRadius: 16,
  paddingVertical: 16,
  paddingHorizontal: 16,
  marginBottom: 12,
},

title: {
  fontSize: 14,
  fontFamily: AppFonts.POPPINS_SEMIBOLD,
  color: '#101828',
},

subtitle: {
  fontSize: 11,
  color: '#98A2B3',
  marginTop: 4,
  fontFamily: AppFonts.POPPINS_REGULAR,
},

arrow: {
  width: 18,
  height: 18,
  tintColor: '#D0D5DD',
},
});
export default styles;
