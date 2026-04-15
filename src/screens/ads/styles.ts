import { StyleSheet } from 'react-native';
import AppColors from '../../constants/AppColors';

export const styles = StyleSheet.create({

 card: {
  flex: 1,
  backgroundColor: '#fff',
  borderRadius: 18,
  margin: 8,
  overflow: 'hidden',

  elevation: 5,
  shadowColor: '#000',
  shadowOpacity: 0.08,
  shadowRadius: 10,
},

image: {
  height: 130,
  width: '100%',
},

statusBadge: {
  position: 'absolute',
  top: 10,
  right: 10,
  paddingHorizontal: 10,
  paddingVertical: 5,
  borderRadius: 20,
},

content: {
  flex: 1, // 🔥 IMPORTANT
  padding: 12,
  justifyContent: 'space-between', // 🔥 pushes buttons to bottom
},

title: {
  fontSize: 14,
  fontWeight: '700',
  color: '#101828'
},

desc: {
  fontSize: 12,
  color: '#444',
},

date: {
  fontSize: 11,
  color: '#98A2B3',
},

actionRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
},

viewBtn: {
  flex: 1,
  borderWidth: 1,
  borderColor: AppColors.blue,
  paddingVertical: 8,
  borderRadius: 10,
  alignItems: 'center',
  marginRight: 6,
  marginTop: 10,
},

viewText: {
  color: AppColors.blue,
  fontSize: 12,
  fontWeight: '600',
},

stopBtn: {
  flex: 1,
  backgroundColor: '#FFE8CC',
  paddingVertical: 8,
  borderRadius: 10,
  alignItems: 'center',
  marginTop:10
},

stopText: {
  color: '#B54708',
  fontSize: 12,
  fontWeight: '600',
},
  tab: {
  paddingHorizontal: 14,
  paddingVertical: 6,
  borderRadius: 20,
  backgroundColor: '#F2F2F2',
  marginRight: 8,
},

activeTab: {
  backgroundColor: AppColors.blue,
},

tabText: {
  fontSize: 12,
  color: '#666',
},

activeTabText: {
  color: '#fff',
  fontWeight: '600',
},
meta: {
  fontSize: 12,
  color: '#666',
},

});