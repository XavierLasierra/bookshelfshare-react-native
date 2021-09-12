import { StyleSheet } from 'react-native';
import stylesConstants from '../../styles/styles.constants';

export default StyleSheet.create({
  currentShelfContainer: {
    paddingHorizontal: stylesConstants.padding.normal,
    alignItems: 'center'
  },
  shelfName: {
    fontSize: stylesConstants.fontSize.big,
    fontWeight: 'bold',
    color: stylesConstants.colors.mainText,
    paddingTop: 10
  },
  activityIndicator: {
    marginTop: 40
  }
});
