import { StyleSheet } from 'react-native';
import stylesConstants from '../../styles/styles.constants';

export default StyleSheet.create({
  ratingContainer: {
    backgroundColor: stylesConstants.colors.white,
    borderRadius: 5,
    marginVertical: 5,
    padding: stylesConstants.padding.small
  },
  nameRatingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: stylesConstants.colors.secondary
  },
  reviewContainer: {
    paddingVertical: stylesConstants.padding.small
  },
  rating: {
    color: stylesConstants.colors.mainText,
    fontSize: stylesConstants.fontSize.mid
  }
});
