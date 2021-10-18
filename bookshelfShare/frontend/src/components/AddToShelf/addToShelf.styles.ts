import {StyleSheet} from 'react-native';
import stylesConstants from '../../styles/styles.constants';

export default StyleSheet.create({
  addToShelfTitle: {
    fontSize: stylesConstants.fontSize.big,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 10,
  },
  currentShelfContainer: {
    alignItems: 'center',
  },
  addToShelfContainer: {
    paddingHorizontal: stylesConstants.padding.normal,
  },
  addToShelfButton: {
    marginTop: 10,
  },
});
