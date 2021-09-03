import React from 'react';

import {
  View, SafeAreaView, Text, TouchableOpacity
} from 'react-native';
import { RNCamera } from 'react-native-camera';

import CameraOverlay from '../../assets/cameraOverlay.svg';
import SearchIcon from '../../assets/searchIcon.svg';
import Header from '../Header/Header';

import globalStyles from '../../styles/global.styles';
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
        <Header Logo={SearchIcon} />
        <View style={styles.overlayTop} />
        <View style={styles.overlayMiddle}>
          <View style={styles.overlaySide} />
          <CameraOverlay width={300} height={250} />
          <View style={styles.overlaySide} />
        </View>
        <View style={styles.overlayBottom}>
          <Text style={styles.overlayText}>
            Scan book barcode
          </Text>
          <TouchableOpacity
            style={globalStyles.button}
          >
            <Text style={globalStyles.buttonText}>
              Add ISBN manually

            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
