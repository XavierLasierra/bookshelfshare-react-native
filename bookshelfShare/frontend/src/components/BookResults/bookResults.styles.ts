import { StyleSheet } from 'react-native';
import stylesConstants from '../../styles/styles.constants';

export default StyleSheet.create({
  searchParameters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingVertical: 10
  },
  parameter: {
    fontSize: stylesConstants.fontSize.small,
    color: stylesConstants.colors.mainText,
    paddingHorizontal: 5
  },
  bookResultsContainer: {
    backgroundColor: stylesConstants.colors.light
  },
  resultsContainer: {
    alignItems: 'center',
    height: '100%'
  },
  marginBottom: {
    width: '100%',
    height: 130
  }
});
