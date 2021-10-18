import {StyleSheet} from 'react-native';
import stylesConstants from '../../styles/styles.constants';

export default StyleSheet.create({
  ratingInput: {
    backgroundColor: stylesConstants.colors.white,
    height: 100,
    textAlignVertical: 'top',
    fontSize: stylesConstants.fontSize.mid,
    padding: stylesConstants.padding.small,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  activityIndicator: {
    height: 30,
    width: 30,
  },
});
