import { StyleSheet } from "react-native";
import AppFonts from "../../constants/AppFonts";

const styles = StyleSheet.create({
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
  },
  labelStyle:{
    fontSize:12,
    fontFamily:AppFonts.POPPINS_REGULAR,
    color:'black',
    top:2,
    left:2
  },
  sectionHeader: {
  backgroundColor: '#fff',
  padding: 14,
  borderRadius: 14,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 10,

  shadowColor: '#000',
  shadowOpacity: 0.04,
  shadowRadius: 10,
  elevation: 2,
},

sectionIcon: {
  width: 18,
  height: 18,
  tintColor: '#1E88E5',
},

modalOverlay: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0,0,0,0.5)',
},

modalBox: {
  width: '80%',
  backgroundColor: '#fff',
  padding: 20,
  borderRadius: 14,
},
profileCard: {
    marginHorizontal: 16,
    marginTop:20,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,

    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 4,
  },

  avatar: {
    width: 54,
    height: 54,
    borderRadius: 18,
    backgroundColor: '#1E88E5',
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },

  name: {
    fontSize: 16,
    fontFamily: AppFonts.POPPINS_SEMIBOLD,
    color: '#111',
  },

  email: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },

  statBox: {
    alignItems: 'center',
    flex: 1,
  },

  statNumber: {
    fontSize: 16,
    fontFamily: AppFonts.POPPINS_SEMIBOLD,
    color: '#1E88E5',
  },

  statLabel: {
    fontSize: 11,
    color: '#777',
    marginTop: 2,
  },

  subHeading: {
    fontSize: 13,
    fontFamily: AppFonts.POPPINS_SEMIBOLD,
    color: '#444',
    marginTop: 10,
  },

  menuItem: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 14,
    marginTop: 10,

    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },

  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#F3F6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  icon: {
    width: 18,
    height: 18,
    tintColor: '#1E88E5',
  },

  menuText: {
    fontSize: 14,
    color: '#222',
    fontFamily: AppFonts.POPPINS_MEDIUM,
  },

  badge: {
    backgroundColor: '#E8F1FF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginRight: 10,
  },

  badgeText: {
    color: '#1E88E5',
    fontSize: 11,
    fontWeight: '600',
  },

  divider: {
    height: 1,
    backgroundColor: '#EEE',
    marginVertical: 10,
    marginHorizontal: 16,
  },
  iconText: {
  fontSize: 16,
  marginRight: 10,
},

arrow: {
  fontSize: 22,
  color: '#999',
  marginLeft: 8,
},

sectionTitle: {
  fontSize: 13,
  fontWeight: '600',
  color: '#777',
  marginTop: 20,
},
})

export default styles;