import { StyleSheet } from 'react-native';
import stylesConstants from '../../styles/styles.constants';

export default StyleSheet.create({
  popUpContainer: {
    alignItems: 'center',
    height: 200
  },
  popUp: {
    backgroundColor: stylesConstants.colors.white,
    height: 190,
    width: 250,
    padding: 20,
    borderRadius: 20,
    justifyContent: 'space-between'
  },
  popUpButton: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 20
  },
  popUpIcon: {
    marginRight: 20,
    position: 'absolute',
    left: 20
  }
});
