import {StyleSheet} from 'react-native';
import stylesConstants from '../../styles/styles.constants';

export default StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: stylesConstants.colors.white,
    height: 60,
  },
  tabOption: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 57,
    width: 57,
  },
  tabOptionFocused: {
    backgroundColor: stylesConstants.colors.light,
    borderRadius: 50,
  },
  tabText: {
    fontSize: 12,
    color: stylesConstants.colors.mainText,
  },
});
