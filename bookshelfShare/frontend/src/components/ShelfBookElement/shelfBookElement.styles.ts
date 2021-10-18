import {StyleSheet} from 'react-native';
import stylesConstants from '../../styles/styles.constants';

export default StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  bookImage: {
    width: 100,
    height: 150,
    overflow: 'hidden',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  informationContainer: {
    backgroundColor: stylesConstants.colors.white,
    width: 210,
    height: 150,
    padding: stylesConstants.padding.small,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'space-between',
  },
  bookTitle: {
    width: 175,
    fontWeight: 'bold',
    fontSize: stylesConstants.fontSize.mid,
  },
  bookAuthor: {
    fontSize: stylesConstants.fontSize.small,
  },
  bookPublisher: {
    fontSize: stylesConstants.fontSize.small,
    color: stylesConstants.colors.mainText,
  },
  bookIsbn: {
    fontSize: stylesConstants.fontSize.small,
    color: stylesConstants.colors.mainText,
  },
  shelfLocation: {
    fontWeight: 'bold',
    fontSize: stylesConstants.fontSize.mid,
  },
});
