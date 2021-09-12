import { StyleSheet } from 'react-native';
import stylesConstants from '../../styles/styles.constants';

export default StyleSheet.create({
  createShelfContainer: {
    padding: stylesConstants.padding.normal,
    alignItems: 'center'
  },
  formContainer: {
    width: '100%',
    height: 300,
    justifyContent: 'space-between'
  },
  createButton: {
    marginTop: 20
  },
  shelfSizeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  smallInputContainer: {
    width: '45%'
  }
});
