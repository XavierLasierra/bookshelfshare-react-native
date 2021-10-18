import {StyleSheet} from 'react-native';
import stylesConstants from '../../styles/styles.constants';

export default StyleSheet.create({
  userShelfListContainer: {
    paddingHorizontal: stylesConstants.padding.normal,
  },
  marginBottom: {
    width: '100%',
    height: 130,
  },
  addShelfButton: {
    padding: stylesConstants.padding.normal,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 450,
  },
  addShelfCircle: {
    backgroundColor: stylesConstants.colors.secondary,
    width: 40,
    height: 40,
    marginRight: 20,
  },
  addShelfCircleText: {
    fontSize: stylesConstants.fontSize.big,
  },
  addShelfButtonText: {
    color: stylesConstants.colors.mainText,
    fontSize: stylesConstants.fontSize.mid,
  },
});
