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
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20
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
  buttonText: {
    fontSize: stylesConstants.fontSize.mid,
    marginLeft: 15
  },
  follower: {
    fontSize: stylesConstants.fontSize.small,
    color: stylesConstants.colors.followDark,
    marginTop: 5
  },
  activityIndicator: {
    marginTop: 50
  }
});
