import React from 'react';
import { SafeAreaView } from 'react-native';
import Header from '../Header/Header';

import ShelfIcon from '../../assets/shelfIcon.svg';

export default function Shelf() {
  return (
    <SafeAreaView>
      <Header Logo={ShelfIcon} />
    </SafeAreaView>
  );
}
