import { StyleSheet } from 'react-native';
import stylesConstants from '../../styles/styles.constants';

export default StyleSheet.create({
  text: {
    fontSize: stylesConstants.fontSize.mid
  },
  titleText: {
    fontSize: stylesConstants.fontSize.mid,
    fontWeight: 'bold',
    marginTop: 5
  },
  ratingInput: {
    backgroundColor: stylesConstants.colors.white,
    height: 100,
    textAlignVertical: 'top'
  }
});
