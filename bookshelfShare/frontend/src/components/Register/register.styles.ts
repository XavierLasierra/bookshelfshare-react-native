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
    height: 100,
    paddingHorizontal: 30
  },
  backButton: {
    position: 'absolute',
    top: 35,
    left: 20
  },
  backButtonIcon: {
    transform: [{ rotateZ: '180deg' }]
  },
  registerContainer: {
    backgroundColor: stylesConstants.colors.light,
    borderTopRightRadius: 40,
    padding: 30,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 600
  },
  registerButton: {
    marginTop: 20
  }
});
