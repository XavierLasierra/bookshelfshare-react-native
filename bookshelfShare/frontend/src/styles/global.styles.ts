import { StyleSheet } from 'react-native';
import stylesConstants from './styles.constants';

export default StyleSheet.create({
  inputContainer: {
    width: '100%',
    height: 70
  },
  inputLabel: {
    transform: [
      { translateX: 5 },
      { translateY: 20 }
    ],
    zIndex: 1,
    fontWeight: 'bold',
    fontSize: stylesConstants.fontSize.small
  },
  input: {
    height: '100%',
    paddingHorizontal: 30,
    paddingTop: 30,
    fontSize: stylesConstants.fontSize.big,
    backgroundColor: stylesConstants.colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: stylesConstants.colors.secondary
  },
  title: {
    color: stylesConstants.colors.mainText,
    fontSize: stylesConstants.fontSize.title,
    fontWeight: '500'
  },
  button: {
    backgroundColor: stylesConstants.colors.dark,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    height: 70,
    width: '100%'
  },
  buttonText: {
    color: stylesConstants.colors.white,
    fontSize: stylesConstants.fontSize.big,
    fontWeight: '500'
  },
  invalid: {
    color: stylesConstants.colors.error,
    fontSize: stylesConstants.fontSize.small,
    paddingHorizontal: 10
  }
});
