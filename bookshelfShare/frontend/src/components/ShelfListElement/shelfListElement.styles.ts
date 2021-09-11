import { StyleSheet } from 'react-native';
import stylesConstants from '../../styles/styles.constants';

export default StyleSheet.create({
  shelfContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: stylesConstants.colors.detail,
    height: 85,
    borderRadius: 10,
    marginVertical: 10,
    paddingVertical: stylesConstants.padding.small,
    paddingHorizontal: stylesConstants.padding.mid
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
    width: 70
  },
  photoCounterContainer: {
    flexDirection: 'column-reverse',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  }
});
