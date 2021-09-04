import { StyleSheet } from 'react-native';
import stylesConstants from '../../styles/styles.constants';

export default StyleSheet.create({
  headerContainer: {
    backgroundColor: stylesConstants.colors.light,
    alignItems: 'flex-end'
  },
  header: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: stylesConstants.colors.main,
    padding: 10,
    borderBottomLeftRadius: 25
  },
  tailContainer: {
    height: 0
  },
  tailBack: {
    backgroundColor: stylesConstants.colors.main,
    width: 20,
    height: 20
  },
  tailFront: {
    backgroundColor: stylesConstants.colors.light,
    width: 20,
    height: 20,
    borderTopRightRadius: 25
  }
});
