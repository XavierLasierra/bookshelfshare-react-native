import React from 'react';
import { View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { SafeAreaView } from 'react-native-safe-area-context';

import CameraOverlay from '../../assets/cameraOverlay.svg';
import styles from './barCodeScanner.styles';

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
        style={styles.camera}
      />
      <View style={styles.overlay}>
        <View style={styles.overlayTop} />
        <View style={styles.overlayMiddle}>
          <View style={styles.overlaySide} />
          <CameraOverlay width={300} height={250} />
          <View style={styles.overlaySide} />
        </View>
        <View style={styles.overlayBottom} />
      </View>
    </SafeAreaView>
  );
}
