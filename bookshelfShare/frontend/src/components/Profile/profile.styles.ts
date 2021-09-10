import { StyleSheet } from 'react-native';
import stylesConstants from '../../styles/styles.constants';

export default StyleSheet.create({
  actionsContainer: {
    marginTop: 20
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: stylesConstants.colors.secondary,
    marginBottom: 15,
    height: 50,
    width: 160,
    paddingHorizontal: 10
  },
  buttonText: {
    fontSize: stylesConstants.fontSize.mid,
    marginLeft: 15
  },
  logoutButton: {
    marginTop: 50
  },
  marginBottom: {
    width: '100%',
    height: 130
  }
});
