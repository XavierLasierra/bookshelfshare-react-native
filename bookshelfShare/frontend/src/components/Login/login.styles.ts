import { StyleSheet } from 'react-native';
import stylesConstants from '../../styles/styles.constants';

export default StyleSheet.create({
  mainContainer: {
    backgroundColor: stylesConstants.colors.main
  },
  topContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100
  },
  loginContainer: {
    backgroundColor: stylesConstants.colors.light,
    borderTopRightRadius: 40,
    padding: 30,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 600
  },
  signUpTextContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  loginButton: {
    marginTop: 20
  },
  signUpText: {
    fontSize: 20
  },
  signUpButton: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});
