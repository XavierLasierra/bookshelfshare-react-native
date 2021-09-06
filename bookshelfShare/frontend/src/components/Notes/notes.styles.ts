import { StyleSheet } from 'react-native';
import stylesConstants from '../../styles/styles.constants';

export default StyleSheet.create({
  notesInput: {
    backgroundColor: stylesConstants.colors.white,
    height: 100,
    textAlignVertical: 'top'
  },
  text: {
    fontSize: stylesConstants.fontSize.mid
  },
  titleText: {
    fontSize: stylesConstants.fontSize.mid,
    fontWeight: 'bold',
    marginTop: 5
  }
});
