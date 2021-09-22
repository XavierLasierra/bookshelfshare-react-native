import React from 'react';
import { Text } from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuTrigger,
  renderers,
  MenuOption
} from 'react-native-popup-menu';
import { IAddPopUpProps } from '../../types/interfaces';

import BarCodeIcon from '../../assets/barCodeIcon.svg';
import SearchIcon from '../../assets/whiteSearchIcon.svg';
import styles from './addPopUp.styles';
import globalStyles from '../../styles/global.styles';

export default function AddPopUp({ navigation }: IAddPopUpProps) {
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
    <Menu
      style={styles.addButton}
      renderer={renderers.Popover}
    >
      <MenuTrigger>
        <Text style={styles.addButtonText}>+</Text>
      </MenuTrigger>
      <MenuOptions
        optionsContainerStyle={styles.popUp}
        testID="menuOptions"
      >
        <MenuOption
          key="scanPage"
          style={[globalStyles.button, styles.popUpButton]}
          onSelect={handleClickScan}
        >
          <BarCodeIcon style={styles.popUpIcon} width={30} height={30} />
          <Text style={globalStyles.buttonText}>Scan</Text>
        </MenuOption>
        <MenuOption
          key="searchPage"
          style={[globalStyles.button, styles.popUpButton]}
          onSelect={handleClickSearch}
        >
          <SearchIcon style={styles.popUpIcon} width={30} height={30} />
          <Text style={globalStyles.buttonText}>Search</Text>
        </MenuOption>
      </MenuOptions>
    </Menu>
  );
}
