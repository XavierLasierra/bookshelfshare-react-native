import { StyleSheet } from 'react-native';
import stylesConstants from '../../styles/styles.constants';

export default StyleSheet.create({
  notesInput: {
    backgroundColor: stylesConstants.colors.white,
    height: 100,
    textAlignVertical: 'top',
    fontSize: stylesConstants.fontSize.mid,
    padding: stylesConstants.padding.small
  }
});
