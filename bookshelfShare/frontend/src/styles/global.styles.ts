import {StyleSheet} from 'react-native';
import stylesConstants from './styles.constants';

export default StyleSheet.create({
  inputContainer: {
    width: '100%',
    height: 70,
  },
  inputLabel: {
    transform: [{translateX: 5}, {translateY: 20}],
    zIndex: 1,
    fontWeight: 'bold',
    fontSize: stylesConstants.fontSize.small,
  },
  input: {
    height: '100%',
    paddingHorizontal: 30,
    paddingTop: 30,
    fontSize: stylesConstants.fontSize.big,
    backgroundColor: stylesConstants.colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: stylesConstants.colors.secondary,
  },
  title: {
    color: stylesConstants.colors.mainText,
    fontSize: stylesConstants.fontSize.title,
    fontWeight: '500',
  },
  button: {
    backgroundColor: stylesConstants.colors.dark,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    height: 70,
    width: '100%',
  },
  buttonText: {
    color: stylesConstants.colors.white,
    fontSize: stylesConstants.fontSize.big,
    fontWeight: '500',
  },
  invalid: {
    color: stylesConstants.colors.error,
    fontSize: stylesConstants.fontSize.small,
    paddingHorizontal: 10,
  },
  backButton: {
    position: 'absolute',
    top: 35,
    left: 20,
    zIndex: 1,
  },
  backButtonTop: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  backButtonIcon: {
    transform: [{rotateZ: '180deg'}],
  },
  text: {
    fontSize: stylesConstants.fontSize.mid,
  },
  titleText: {
    fontSize: stylesConstants.fontSize.mid,
    fontWeight: 'bold',
    marginTop: 5,
  },
  mainContainer: {
    backgroundColor: stylesConstants.colors.light,
    minHeight: '100%',
  },
  authenticationContainer: {
    backgroundColor: stylesConstants.colors.main,
  },
  circularButton: {
    backgroundColor: stylesConstants.colors.white,
    width: 60,
    height: 60,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  profileContainer: {
    paddingHorizontal: stylesConstants.padding.normal,
  },
  topContainer: {
    paddingVertical: stylesConstants.padding.small,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userPhoto: {
    width: 125,
    height: 125,
    borderRadius: 100,
    marginRight: 30,
  },
  userInformationContainer: {
    maxWidth: 200,
  },
  userUsername: {
    fontSize: stylesConstants.fontSize.big,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  userEmail: {
    fontSize: stylesConstants.fontSize.mid,
  },
  thinInputContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  thinInput: {
    height: '100%',
    width: '85%',
    paddingHorizontal: 20,
    fontSize: stylesConstants.fontSize.mid,
    backgroundColor: stylesConstants.colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: stylesConstants.colors.secondary,
  },
  toggleContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  toggle: {
    alignItems: 'center',
    paddingVertical: 10,
    width: 150,
    backgroundColor: stylesConstants.colors.white,
  },
  toggleActive: {
    backgroundColor: stylesConstants.colors.secondary,
  },
  toggleText: {
    fontSize: stylesConstants.fontSize.big,
  },
  markButton: {
    height: 40,
    width: 150,
    backgroundColor: stylesConstants.colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: stylesConstants.colors.secondary,
    textAlign: 'center',
    lineHeight: 40,
  },
  menuOption: {
    minHeight: 40,
    justifyContent: 'center',
  },
});
