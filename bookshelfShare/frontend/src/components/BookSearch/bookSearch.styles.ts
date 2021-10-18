import {StyleSheet} from 'react-native';
import stylesConstants from '../../styles/styles.constants';

export default StyleSheet.create({
  searchContainer: {
    padding: stylesConstants.padding.normal,
    alignItems: 'center',
  },
  formContainer: {
    width: '100%',
    height: 400,
    justifyContent: 'space-between',
  },
  searchButton: {
    marginTop: 20,
  },
});
