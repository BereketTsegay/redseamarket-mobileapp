import { StyleSheet } from "react-native";
import AppFonts from "../../constants/AppFonts";
import AppColors from "../../constants/AppColors";

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F1F5F9',
  },

header: {
  backgroundColor: AppColors.darkBlue,
  paddingTop: 10,
  paddingBottom: 20,
  borderBottomLeftRadius: 35,
  borderBottomRightRadius: 35,
  position: 'relative',
  alignItems: 'center',
},

headerContent: {
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 10,
},

backBtn: {
  position: 'absolute',
  left: 16,
  top: 20,

  width: 38,
  height: 38,
  borderRadius: 19,
  backgroundColor: '#FFFFFF',

  justifyContent: 'center',
  alignItems: 'center',
},
avatarEditBadge: {
  position: 'absolute',
  bottom: 5,
  right: 0,
  backgroundColor: '#2563EB',
  width: 22,
  height: 22,
  borderRadius: 11,
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: 2,
  borderColor: '#fff',
},

avatarEditText: {
  color: '#fff',
  fontSize: 12,
  fontWeight: 'bold',
},
avatar: {
  width: 60,
  height: 60,
  borderRadius: 30,
  borderWidth: 3,
  borderColor: '#fff',
  marginBottom: 10,
},

name: {
  fontSize: 18,
  fontFamily: AppFonts.POPPINS_SEMIBOLD,
  color: '#fff',
},

avail: {
  fontSize: 13,
  color: '#E0E7FF',
  marginTop: 2,
},

  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 18,
    padding: 16,

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },

  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },

  sectionTitle: {
    fontSize: 15,
    fontFamily: AppFonts.POPPINS_SEMIBOLD,
    color: '#101828',
  },

  sectionDesc: {
    fontSize: 12,
    color: '#98A2B3',
    marginBottom: 10,
    fontFamily: AppFonts.POPPINS_REGULAR,
  },

  add: {
    color: AppColors.blue,
    fontSize: 12,
    fontFamily: AppFonts.POPPINS_MEDIUM,
  },

  delete: {
    color: '#F04438',
    marginLeft: 10,
    fontSize: 12,
  },

  action: {
    color: AppColors.blue,
    fontSize: 12,
    marginRight: 10,
  },

  description: {
    fontSize: 12,
    color: '#667085',
    marginTop: 6,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  infoIcon: {
    fontSize: 16,
    marginRight: 8,
    color: '#2563EB',
  },

  infoLabel: {
    color: '#667085',
    fontSize: 11,
  },

  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  infoBox: {
    width: '48%',
    backgroundColor: '#F9FAFB',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#EEF2F6',
  },

  infoValue: {
    color: '#101828',
    fontSize: 12,
    fontFamily: AppFonts.POPPINS_MEDIUM,
  },

  detailCard: {
    backgroundColor: '#F1F5F9',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#2563EB',
  },

  detailTitle: {
    fontSize: 13,
    fontFamily: AppFonts.POPPINS_SEMIBOLD,
    color: '#101828',
  },

  detailSub: {
    fontSize: 11,
    color: '#667085',
    marginTop: 2,
  },

  detailDate: {
    fontSize: 11,
    color: '#98A2B3',
    marginTop: 2,
  },

  descText: {
    fontSize: 11,
    color: '#475467',
    marginTop: 6,
  },

 skillWrap: {
  flexDirection: "row",
  flexWrap: "wrap",
},

skillChip: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#EEF4FF",
  paddingHorizontal: 10,
  paddingVertical: 6,
  borderRadius: 20,
  marginRight: 8,
  marginBottom: 8,
},

skillText: {
  fontSize: 12,
  color: "#2563EB",
  marginRight: 6,
},

skillRemove: {
  fontSize: 12,
  color: "#2563EB",
  fontWeight: "bold",
},

  resumeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 12,
  },

  fileIconBox: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  fileName: {
    fontSize: 12,
    fontFamily: AppFonts.POPPINS_MEDIUM,
    color: '#101828',
  },

  fileMeta: {
    fontSize: 10,
    color: '#98A2B3',
  },

  modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.6)',
  justifyContent: 'center',
  padding: 20,
},

modalBox: {
  backgroundColor: '#fff',
  borderRadius: 16,
  padding: 16,
  maxHeight: '85%',
},

modalTitle: {
  fontSize: 16,
  fontWeight: '700',
  marginBottom: 10,
},

imageSection: {
  alignItems: 'center',
  marginBottom: 20,
},

profileImage: {
  width: 90,
  height: 90,
  borderRadius: 45,
  marginBottom: 10,
},

uploadBtn: {
  backgroundColor: '#EEF4FF',
  paddingHorizontal: 12,
  paddingVertical: 6,
  borderRadius: 20,
},

uploadText: {
  color: '#2563EB',
  fontSize: 12,
  fontWeight: '600',
},

fieldBox: {
  marginBottom: 10,
},

label: {
  fontSize:12,
        fontFamily:AppFonts.POPPINS_REGULAR,
        color:'black',
        top:2,
        left:2
},

input: {
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 10,
  paddingHorizontal: 12,
  height: 50,
  fontSize: 13,
  backgroundColor: '#fff',
},

radioRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 5,
},

radioBox: {
  flex: 1,
  padding: 10,
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 10,
  marginRight: 8,
  alignItems: 'center',
  height: 50,
  justifyContent: 'center',
},

radioActive: {
  borderColor: '#2563EB',
  backgroundColor: '#EFF6FF',
},

radioText: {
  fontSize: 12,
  color: '#667085',
},

radioTextActive: {
  color: '#2563EB',
  fontWeight: '600',
},

actionRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 10,
},

clearBtn: {
  flex: 1,
  marginRight: 10,
  padding: 12,
  borderRadius: 10,
  borderWidth: 1,
  borderColor: '#F04438',
  alignItems: 'center',
},

clearText: {
  color: '#F04438',
  fontWeight: '600',
},

saveBtn: {
  flex: 1,
  padding: 12,
  borderRadius: 10,
  backgroundColor: '#2563EB',
  alignItems: 'center',
},

saveText: {
  color: '#fff',
  fontWeight: '600',
},

option: {
  padding: 10,
  borderWidth: 1,
  borderColor: '#E5E7EB',
  borderRadius: 10,
  marginBottom: 8,
},

optionActive: {
  backgroundColor: '#DBEAFE',
  borderColor: '#2563EB',
},
uploadBox: {
  borderWidth: 1,
  borderColor: '#D0D5DD',
  borderStyle: 'dashed',
  borderRadius: 12,
  padding: 25,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#F9FAFB',
  marginVertical:10
},

uploadIcon: {
  fontSize: 28,
  marginBottom: 10,
},

uploadTitle: {
  fontSize: 13,
  color: '#101828',
  textAlign: 'center',
},

uploadSub: {
  fontSize: 11,
  color: '#667085',
  marginTop: 6,
},

fileCard: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#F9FAFB',
  padding: 12,
  borderRadius: 12,
  marginVertical: 10,
},

fileIconBox1: {
  width: 32,
  height: 32,
  borderRadius: 8,
  backgroundColor: '#2563EB',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: 10,
},

});

export default styles;