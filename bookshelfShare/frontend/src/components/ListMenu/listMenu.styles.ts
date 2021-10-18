import {StyleSheet} from 'react-native';
import stylesConstants from '../../styles/styles.constants';

export default StyleSheet.create({
  activityIndicatorContainer: {
    backgroundColor: stylesConstants.colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: stylesConstants.colors.secondary,
    height: 40,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
