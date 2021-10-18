import {StyleSheet} from 'react-native';
import stylesConstants from '../../styles/styles.constants';

export default StyleSheet.create({
  topContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    paddingHorizontal: 30,
  },
  registerContainer: {
    backgroundColor: stylesConstants.colors.light,
    borderTopRightRadius: 40,
    padding: stylesConstants.padding.normal,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 600,
  },
  registerButton: {
    marginTop: 20,
  },
  invalidPasswordText: {
    paddingHorizontal: 5,
  },
});
