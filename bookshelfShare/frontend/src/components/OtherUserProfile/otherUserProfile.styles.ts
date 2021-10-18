import {StyleSheet} from 'react-native';
import stylesConstants from '../../styles/styles.constants';

export default StyleSheet.create({
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  follower: {
    fontSize: stylesConstants.fontSize.small,
    color: stylesConstants.colors.followDark,
    marginTop: 5,
  },
  activityIndicator: {
    marginTop: 50,
  },
});
