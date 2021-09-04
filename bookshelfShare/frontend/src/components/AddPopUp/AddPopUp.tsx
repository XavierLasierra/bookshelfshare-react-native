import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuTrigger,
  renderers
} from 'react-native-popup-menu';

import BarCodeIcon from '../../assets/barCodeIcon.svg';
import SearchIcon from '../../assets/whiteSearchIcon.svg';
import styles from './addPopUp.styles';
import globalStyles from '../../styles/global.styles';

export default function AddPopUp({ navigation }: any) {
  function handleClickScan() {
    navigation.navigate({
      name: 'BarCodeScanner',
      merge: true
    });
  }

  function handleClickSearch() {
    navigation.navigate({
      name: 'BookSearchNavigator',
      merge: true
    });
  }

  return (
    <Menu style={styles.addButton} renderer={renderers.Popover}>
      <MenuTrigger>
        <Text style={styles.addButtonText}>+</Text>
      </MenuTrigger>
      <MenuOptions
        optionsContainerStyle={styles.popUp}
      >
        <TouchableOpacity
          style={[globalStyles.button, styles.popUpButton]}
          onPress={handleClickScan}
        >
          <BarCodeIcon style={styles.popUpIcon} width={30} height={30} />
          <Text style={globalStyles.buttonText}>Scan</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[globalStyles.button, styles.popUpButton]}
          onPress={handleClickSearch}
        >
          <SearchIcon style={styles.popUpIcon} width={30} height={30} />
          <Text style={globalStyles.buttonText}>Search</Text>
        </TouchableOpacity>
      </MenuOptions>
    </Menu>
  );
}
