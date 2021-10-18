import {StyleSheet} from 'react-native';
import stylesConstants from '../../styles/styles.constants';

export default StyleSheet.create({
  addButton: {
    position: 'relative',
    top: -10,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    borderRadius: 50,
    backgroundColor: stylesConstants.colors.white,
  },
  addButtonText: {
    fontSize: 30,
    color: stylesConstants.colors.mainText,
    width: 60,
    lineHeight: 60,
    height: 60,
    textAlign: 'center',
  },
  popUp: {
    backgroundColor: stylesConstants.colors.white,
    height: 220,
    width: 250,
    padding: 20,
    borderRadius: 20,
    justifyContent: 'space-between',
  },
  popUpButton: {
    marginVertical: 10,
  },
  popUpIcon: {
    marginRight: 20,
    position: 'absolute',
    left: 20,
  },
});
