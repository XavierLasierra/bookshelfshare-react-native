import { StyleSheet } from 'react-native';
import stylesConstants from '../../styles/styles.constants';

export default StyleSheet.create({
  addBookToUserContainer: {
    paddingHorizontal: stylesConstants.padding.small,
    paddingBottom: stylesConstants.padding.mid,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  markButtonContainer: {
    width: 200
  },
  markButton: {
    backgroundColor: stylesConstants.colors.white,
    height: 40,
    width: 150,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: stylesConstants.colors.secondary,
    textAlign: 'center',
    lineHeight: 40
  },
  menuOption: {
    minHeight: 40,
    width: 150,
    justifyContent: 'center',
    paddingHorizontal: stylesConstants.padding.mid
  }
});
