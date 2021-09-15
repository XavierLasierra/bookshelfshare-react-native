import { StyleSheet } from 'react-native';
import stylesConstants from '../../styles/styles.constants';

export default StyleSheet.create({
  addBookToUserContainer: {
    paddingHorizontal: stylesConstants.padding.small,
    paddingBottom: stylesConstants.padding.mid,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  canNotSaveText: {
    textAlign: 'center',
    fontSize: stylesConstants.fontSize.small,
    width: '100%'
  }
});
