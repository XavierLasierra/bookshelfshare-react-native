import {StyleSheet} from 'react-native';
import stylesConstants from '../../styles/styles.constants';

export default StyleSheet.create({
  topContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
  },
  loginContainer: {
    backgroundColor: stylesConstants.colors.light,
    borderTopRightRadius: 40,
    padding: stylesConstants.padding.normal,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 600,
  },
  signUpTextContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  loginButton: {
    marginTop: 20,
  },
  signUpText: {
    fontSize: stylesConstants.fontSize.big,
  },
  signUpButton: {
    fontSize: stylesConstants.fontSize.big,
    fontWeight: 'bold',
  },
});
