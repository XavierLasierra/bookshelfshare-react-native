import { StyleSheet } from 'react-native';
import stylesConstants from '../../styles/styles.constants';

export default StyleSheet.create({
  bookDetailPageContainer: {
    backgroundColor: stylesConstants.colors.light
  },
  bookDetailContainer: {
    padding: stylesConstants.padding.normal
  },
  bookImage: {
    width: 150,
    height: 225,
    overflow: 'hidden',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10
  }
});
