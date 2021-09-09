import { StyleSheet } from 'react-native';
import stylesConstants from '../../styles/styles.constants';

export default StyleSheet.create({
  bookDetailContainer: {
    padding: stylesConstants.padding.normal,
    paddingBottom: 100
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
  },
  description: {
    marginTop: 10,
    fontSize: stylesConstants.fontSize.mid,
    textAlign: 'justify',
    lineHeight: 25
  }
});
