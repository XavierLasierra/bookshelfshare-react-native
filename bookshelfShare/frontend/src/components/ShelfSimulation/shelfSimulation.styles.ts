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
  },
  shadowTop: {
    borderTopWidth: 10,
    borderColor: stylesConstants.colors.shelfShadow,
    borderRadius: 15,
    backgroundColor: stylesConstants.colors.shelfOutline
  }
});
