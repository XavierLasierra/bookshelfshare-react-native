import { StyleSheet } from 'react-native';
import stylesConstants from '../../styles/styles.constants';

export default StyleSheet.create({
  shelfContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: stylesConstants.colors.detail,
    borderRadius: 10,
    marginVertical: 10,
    paddingVertical: stylesConstants.padding.small,
    paddingHorizontal: stylesConstants.padding.mid
  },
  photoBooksContainer: {
    height: 65,
    justifyContent: 'space-between'
  },
  photosContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  sharedUserPhoto: {
    width: 30,
    height: 30,
    borderRadius: 100
  },
  sharedUserNumber: {
    fontSize: stylesConstants.fontSize.mid,
    marginRight: 5
  },
  shelfName: {
    fontSize: stylesConstants.fontSize.mid,
    letterSpacing: 1,
    width: 150,
    fontWeight: 'bold'
  },
  bookCounter: {
    fontSize: stylesConstants.fontSize.small,
    textAlign: 'right',
    fontWeight: 'bold'
  },
  addShelfCircle: {
    backgroundColor: stylesConstants.colors.secondary,
    width: 30,
    height: 30
  }
});
