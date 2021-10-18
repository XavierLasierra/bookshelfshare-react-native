import {StyleSheet} from 'react-native';
import stylesConstants from '../../styles/styles.constants';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
  },
  bookImage: {
    width: 125,
    height: 200,
    overflow: 'hidden',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  informationContainer: {
    backgroundColor: stylesConstants.colors.white,
    width: 210,
    height: 175,
    padding: stylesConstants.padding.small,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'space-between',
  },
  titleLanguageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxHeight: 75,
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
});
