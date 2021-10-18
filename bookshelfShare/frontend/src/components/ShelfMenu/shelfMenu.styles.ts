import {StyleSheet} from 'react-native';
import stylesConstants from '../../styles/styles.constants';

export default StyleSheet.create({
  shelfLocationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  shelfLocationText: {
    fontSize: stylesConstants.fontSize.mid,
    fontWeight: '500',
  },
});
