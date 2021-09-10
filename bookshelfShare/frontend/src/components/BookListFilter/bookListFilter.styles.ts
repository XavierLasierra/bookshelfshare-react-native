import { StyleSheet } from 'react-native';
import stylesConstants from '../../styles/styles.constants';

export default StyleSheet.create({
  listTitle: {
    fontSize: stylesConstants.fontSize.big,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  inputContainer: {
    width: 300,
    height: 50
  },
  bookListFilterContainer: {
    alignItems: 'center',
    paddingVertical: stylesConstants.padding.small

  },
  input: {
    height: '100%',
    paddingHorizontal: 20,
    fontSize: stylesConstants.fontSize.mid,
    backgroundColor: stylesConstants.colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: stylesConstants.colors.secondary
  }
});
