import { StyleSheet } from 'react-native';
import stylesConstants from '../../styles/styles.constants';

export default StyleSheet.create({
  bookDetailPageContainer: {
    backgroundColor: stylesConstants.colors.light
  },
  bookDetailContainer: {
    padding: stylesConstants.padding.normal
  },
  topContainer: {
    flexDirection: 'row'
  },
  bookImage: {
    width: 150,
    height: 225,
    overflow: 'hidden',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10
  },
  mainInformation: {
    paddingHorizontal: stylesConstants.padding.mid,
    justifyContent: 'space-between'
  },
  title: {
    fontWeight: 'bold',
    maxWidth: 200,
    fontSize: stylesConstants.fontSize.mid
  },
  smallText: {
    maxWidth: 200,
    fontSize: stylesConstants.fontSize.small
  },
  text: {
    fontSize: stylesConstants.fontSize.mid
  },
  titleText: {
    fontSize: stylesConstants.fontSize.mid,
    fontWeight: 'bold'
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  ratingCount: {
    fontSize: stylesConstants.fontSize.mid,
    marginLeft: 10
  },
  secondaryInformation: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  textContainer: {
    width: '45%'
  }
});
