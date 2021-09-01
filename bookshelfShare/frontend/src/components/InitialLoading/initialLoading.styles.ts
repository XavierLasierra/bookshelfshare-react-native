import { StyleSheet } from 'react-native';
import stylesConstants from '../../styles/styles.constants';

export default StyleSheet.create({
  titleContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: stylesConstants.colors.main
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: stylesConstants.colors.mainText
  }
});
