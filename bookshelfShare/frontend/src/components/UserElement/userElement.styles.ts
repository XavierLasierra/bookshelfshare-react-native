import { StyleSheet } from 'react-native';
import stylesConstants from '../../styles/styles.constants';

export default StyleSheet.create({
  userElementContainer: {
    backgroundColor: stylesConstants.colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: stylesConstants.padding.small,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: stylesConstants.colors.secondary,
    marginVertical: 10
  },
  userElementFollowedContainer: {
    backgroundColor: stylesConstants.colors.follow
  },
  userPhoto: {
    width: 75,
    height: 75,
    borderRadius: 100
  },
  userInformationContainer: {
    width: 150
  },
  userName: {
    fontSize: stylesConstants.fontSize.mid,
    fontWeight: 'bold'
  },
  userEmail: {
    fontSize: stylesConstants.fontSize.mid
  }
});
