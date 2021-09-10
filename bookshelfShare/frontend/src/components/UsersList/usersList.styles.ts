import { StyleSheet } from 'react-native';
import stylesConstants from '../../styles/styles.constants';

export default StyleSheet.create({
  marginBottom: {
    width: '100%',
    height: 130
  },
  usersListContainer: {
    paddingHorizontal: stylesConstants.padding.normal
  },
  clearSearchButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: stylesConstants.colors.secondary,
    height: 40,
    width: 100,
    alignSelf: 'center',
    marginBottom: 10
  },
  clearSearchButtonText: {
    fontSize: stylesConstants.fontSize.mid
  },
  resultsContainer: {
    alignItems: 'center'
  }
});
