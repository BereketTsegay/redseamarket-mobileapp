import { Dimensions, StyleSheet } from "react-native";
import AppFonts from "../../constants/AppFonts";
import AppColors from "../../constants/AppColors";
import App from "../../../App";

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({

  /* ================= HEADER ================= */
headerContainer: {
  backgroundColor: AppColors.blue,
  paddingTop: 30,
  paddingHorizontal: 16,
  paddingBottom: 50, // more space for floating search
  borderBottomLeftRadius: 30,
  borderBottomRightRadius: 30,
  zIndex:10
},

headerTop: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},

logoRow: {
  flexDirection: 'row',
  alignItems: 'center',
},

logoCircle: {
  width: 40,
  height: 40,
  borderRadius: 20,
  // backgroundColor: '#ffffff25',
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: 10,
},

appName: {
  color: '#fff',
  fontSize: 20,
  fontFamily: AppFonts.POPPINS_BOLD,
},

bellWrapper: {
  width: 38,
  height: 38,
  borderRadius: 19,
  backgroundColor: '#ffffff25',
  justifyContent: 'center',
  alignItems: 'center',
},

bellIcon: {
  width: 25,
  height: 25,
  tintColor: '#fff',
},

/* 🔥 SELECTORS */
selectorRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 14,
},

selectorBox: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: 14,
  height: 36,
  borderRadius: 18,
  backgroundColor: '#ffffff20',
  borderWidth: 1,
  borderColor: '#ffffff30',
  marginRight: 10,
},

selectorText: {
  color: '#fff',
  fontSize: 12,
  fontFamily: AppFonts.POPPINS_MEDIUM,
},

flag: {
  width: 22,
  height: 22,
  borderRadius: 11,
  marginRight: 8,
},

/* 🔍 SEARCH */
searchBar: {
  position: 'absolute',
  bottom: -25,
  left: 16,
  right: 16,
  height: 52,
  backgroundColor: '#fff',
  borderRadius: 18,
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: 16,

  elevation: 8,
  shadowColor: '#000',
  shadowOpacity: 0.1,
  shadowRadius: 10,
},

searchIcon: {
  width: 18,
  height: 18,
  tintColor: '#999',
},

searchPlaceholder: {
  marginLeft: 10,
  color: '#888',
  fontSize: 14,
},

  /* ================= SECTION ================= */
  sectionHeader: {
    marginTop: 30,
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  sectionTitle: {
    fontSize: 18,
    fontFamily: AppFonts.POPPINS_BOLD,
  },

  /* ================= CATEGORY ================= */
  categoryCard: {
    width: 85,
    height: 90,
    backgroundColor: '#fff',
    borderRadius: 18,
    marginHorizontal: 6,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',

    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    paddingHorizontal: 3
  },

  categoryIcon: {
    width: 30,
    height: 30,
    marginBottom: 8,
  },

  categoryText: {
    fontSize: 10,
    textAlign: 'center',
    fontFamily: AppFonts.POPPINS_MEDIUM,
  },

  /* ================= BANNER ================= */
  bannerCard: {
    marginHorizontal: 16,
    marginVertical: 10,
    borderRadius: 20,
    overflow: 'hidden',
  },

  bannerImage: {
    height: 170,
    justifyContent: 'center',
    padding: 16,
  },

  bannerOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },

  bannerTag: {
    color: '#FFD54F',
    fontSize: 12,
    fontFamily: AppFonts.POPPINS_BOLD,
  },

  bannerTitle: {
    color: '#fff',
    fontSize: 18,
    fontFamily: AppFonts.POPPINS_BOLD,
    marginVertical: 6,
    textAlign:'center'
  },

  bannerBtn: {
    backgroundColor: '#D32F2F',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },

  bannerBtnText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: AppFonts.POPPINS_MEDIUM,
  },

  /* ================= PRODUCT ================= */
  productCard: {
    width: 190,
    backgroundColor: '#fff',
    borderRadius: 18,
    marginLeft: 16,
    marginVertical: 10,
    overflow: 'hidden',

    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },

  productImage: {
    width: '100%',
    height: 130,
  },

  productContent: {
    padding: 12,
  },

cardWrapper: {
  marginRight: 14,
},

card: {
  width: 170,
  backgroundColor: '#fff',
  borderRadius: 16,
  overflow: 'hidden',
  borderWidth: 1,
  borderColor: '#E8ECF4',
},

cardImage: {
  width: '100%',
  height: 110,
},

cardContent: {
  padding: 10,
},

priceText: {
  color: '#D32F2F',
  fontSize: 15,
  fontWeight: '700',
},

nameText: {
  fontSize: 13,
  fontWeight: '600',
  marginTop: 4,
},

cityText: {
  fontSize: 11,
  color: '#777',
  marginTop: 4,
},
wishlistIcon: {
  position: 'absolute',
  top: 8,
  right: 8,
  backgroundColor: '#fff',
  borderRadius: 20,
  padding: 6,

  elevation: 4,
  shadowColor: '#000',
  shadowOpacity: 0.1,
  shadowRadius: 5,
},
});

export default styles;