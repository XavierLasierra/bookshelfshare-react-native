import React from 'react';
import { RNCamera } from 'react-native-camera';
import { SafeAreaView } from 'react-native-safe-area-context';

const styles = {
  container: {
    flex: 1
  },
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center'
  },
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  bottomOverlay: {
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  enterBarcodeManualButton: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 40
  },
  scanScreenMessage: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  }
};

export default function ProductScanRNCamera() {
  interface BarCode {
    type: string,
    data: string
  }

  function onBarCodeRead(scanResult: BarCode) {
    console.warn(scanResult.type);
    console.warn(scanResult.data);
  }

  return (
    <SafeAreaView style={styles.container}>
      <RNCamera
        flashMode={RNCamera.Constants.FlashMode.auto}
        onBarCodeRead={(scanResult) => onBarCodeRead(scanResult)}
        captureAudio={false}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel'
        }}
        type={RNCamera.Constants.Type.back}
        style={{ height: '100%', width: '100%' }}
      />
    </SafeAreaView>
  );
}
