import { StyleSheet } from 'react-native';
import stylesConstants from '../../styles/styles.constants';

export default StyleSheet.create({
  searchContainer: {
    padding: stylesConstants.padding.normal,
    alignItems: 'center'
  },
  toggleContainer: {
    flexDirection: 'row',
    marginTop: 10
  },
  toggle: {
    alignItems: 'center',
    paddingVertical: 15,
    width: 150,
    backgroundColor: stylesConstants.colors.white
  },
  toggleActive: {
    backgroundColor: stylesConstants.colors.secondary
  },
  toggleText: {
    fontSize: stylesConstants.fontSize.big
  },
  formContainer: {
    width: '100%',
    height: 400,
    justifyContent: 'space-between'
  },
  searchButton: {
    marginTop: 20
  }
});
