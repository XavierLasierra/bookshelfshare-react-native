import {StyleSheet} from 'react-native';
import stylesConstants from '../../styles/styles.constants';

export default StyleSheet.create({
  usersReviewsContainer: {
    marginTop: 20,
  },
  ratingTitle: {
    marginBottom: 10,
  },
  ratingFilterContainer: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: stylesConstants.colors.dark,
    marginBottom: 20,
  },
  ratingFilterOption: {
    width: 225,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: stylesConstants.colors.secondary,
  },
  reviewNumberText: {
    fontSize: stylesConstants.fontSize.mid,
  },
  allReviewsText: {
    width: '100%',
    textAlign: 'center',
    fontSize: stylesConstants.fontSize.mid,
    paddingVertical: 5,
  },
});
