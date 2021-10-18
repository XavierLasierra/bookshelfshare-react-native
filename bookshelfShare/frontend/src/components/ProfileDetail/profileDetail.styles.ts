import {StyleSheet} from 'react-native';
import stylesConstants from '../../styles/styles.constants';

export default StyleSheet.create({
  profileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: stylesConstants.colors.secondary,
    marginBottom: 15,
    height: 50,
  },
  socialButton: {
    width: 160,
    paddingHorizontal: 10,
  },
  buttonText: {
    fontSize: stylesConstants.fontSize.mid,
    marginLeft: 15,
  },
});
