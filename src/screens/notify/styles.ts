import { StyleSheet } from 'react-native';
import AppColors from '../../constants/AppColors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6F8',
    padding: 16,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    alignItems: 'center'
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
  },

  markAll: {
    color: AppColors.blue,
    fontWeight: '600',
  },

  filterRow: {
    flexDirection: 'row',
    zIndex: 100,
  },

  dropdown: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 20,
    marginRight: 10,
    elevation: 2,
  },

  card: {
    flexDirection: 'row',
    backgroundColor: '#EEF3FA',
    padding: 14,
    borderRadius: 14,
    marginBottom: 12,
    alignItems: 'center',
  },

  readCard: {
    backgroundColor: '#fff',
  },

  iconBox: {
    width: 45,
    height: 45,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  title: {
    fontSize: 16,
    fontWeight: '700',
  },

  desc: {
    fontSize: 13,
    color: '#666',
    marginTop: 3,
  },

  time: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },

  rightActions: {
    alignItems: 'flex-end',
  },

  markRead: {
    color: AppColors.blue,
    fontSize: 12,
    marginBottom: 10,
  },

  delete: {
    fontSize: 16,
    color: 'red',
  },
  dropdownMenu: {
    position: 'absolute',
    top: 55,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
    width: '100%',
    zIndex: 999,
  },

  dropdownItem: {
    padding: 12,
    borderBottomWidth: 0.5,
    borderColor: '#eee',
  },
});