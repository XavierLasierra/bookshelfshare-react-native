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
  profileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1
  }
});
