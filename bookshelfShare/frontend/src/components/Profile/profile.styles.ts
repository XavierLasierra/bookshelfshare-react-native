import { StyleSheet } from 'react-native';
import stylesConstants from '../../styles/styles.constants';

export default StyleSheet.create({
  profileContainer: {
    paddingHorizontal: stylesConstants.padding.normal
  },
  topContainer: {
    paddingVertical: stylesConstants.padding.small,
    flexDirection: 'row',
    alignItems: 'center'
  },
  userPhoto: {
    width: 125,
    height: 125,
    borderRadius: 100,
    marginRight: 30
  },
  userInformationContainer: {
    maxWidth: 200
  },
  userUsername: {
    fontSize: stylesConstants.fontSize.big,
    fontWeight: 'bold',
    marginBottom: 15
  },
  userEmail: {
    fontSize: stylesConstants.fontSize.mid
  },
  actionsContainer: {
    marginTop: 20
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  profileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: stylesConstants.colors.secondary,
    marginBottom: 15,
    height: 50
  },
  socialButton: {
    width: 160,
    paddingHorizontal: 10
  },
  booksButton: {

  },
  buttonText: {
    fontSize: stylesConstants.fontSize.mid,
    marginLeft: 15
  },
  logoutButton: {
    marginTop: 30
  }
});
