import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import BarCodeIcon from '../../assets/barCodeIcon.svg';
import SearchIcon from '../../assets/whiteSearchIcon.svg';
import styles from './addPopUp.styles';
import globalStyles from '../../styles/global.styles';

export default function AddPopUp() {
  return (
    <View style={styles.popUpContainer}>
      <View style={styles.popUp}>
        <TouchableOpacity
          style={globalStyles.button}
        >
          <BarCodeIcon style={styles.popUpIcon} width={30} height={30} />
          <Text style={globalStyles.buttonText}>Scan</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={globalStyles.button}
        >
          <SearchIcon style={styles.popUpIcon} width={30} height={30} />
          <Text style={globalStyles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>
    </View>

  );
}
