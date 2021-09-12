import { StyleSheet } from 'react-native';
import stylesConstants from '../../styles/styles.constants';

export default StyleSheet.create({
  shelfFlexContainer: {
    height: 450,
    justifyContent: 'center'
  },
  rowContainer: {
    flexDirection: 'row'
  },
  shelfOutsideOutline: {
    borderWidth: 6,
    borderColor: stylesConstants.colors.shelfOutline,
    elevation: 10
  }
});
