import { StyleSheet } from 'react-native';
import stylesConstants from '../../styles/styles.constants';

export default StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: stylesConstants.colors.white,
    height: 60
  },
  tabOption: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 57,
    width: 57
  },
  tabOptionFocused: {
    backgroundColor: stylesConstants.colors.light,
    borderRadius: 50
  },
  tabText: {
    fontSize: 12,
    color: stylesConstants.colors.mainText
  },
  addButton: {
    position: 'relative',
    top: -25,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    borderRadius: 50,
    backgroundColor: stylesConstants.colors.white
  },
  addButtonText: {
    fontSize: 30,
    color: stylesConstants.colors.mainText
  }
});
