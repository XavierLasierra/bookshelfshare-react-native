import {StyleSheet} from 'react-native';
import stylesConstants from '../../styles/styles.constants';

export default StyleSheet.create({
  shelfBoxOutline: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: stylesConstants.colors.shelfOutline,
    height: '100%',
  },
  shelfInside: {
    width: '90%',
    height: '90%',
    backgroundColor: stylesConstants.colors.shelfBackground,
    borderColor: stylesConstants.colors.shelfShadow,
    borderBottomWidth: 5,
    borderRightWidth: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeShelf: {
    backgroundColor: stylesConstants.colors.activeShelf,
  },
  numberOfBooksText: {
    color: stylesConstants.colors.white,
    fontWeight: 'bold',
    fontSize: stylesConstants.fontSize.mid,
  },
});
