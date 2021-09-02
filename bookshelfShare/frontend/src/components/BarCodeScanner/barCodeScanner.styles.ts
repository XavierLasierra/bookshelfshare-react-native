import { StyleSheet } from 'react-native';
import stylesConstants from '../../styles/styles.constants';

export default StyleSheet.create({
  container: {
    flex: 1
  },
  camera: {
    height: '100%'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    width: '100%'
  },
  overlayTop: {
    zIndex: 2,
    height: 40,
    backgroundColor: stylesConstants.colors.light
  },
  overlayMiddle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  overlaySide: {
    width: 20,
    height: 350,
    backgroundColor: stylesConstants.colors.light
  },
  overlayBottom: {
    height: '100%',
    backgroundColor: stylesConstants.colors.light,
    alignItems: 'center',
    padding: 30
  },
  overlayText: {
    fontSize: 20,
    marginBottom: 30
  }
});
