import React from 'react';
import {SafeAreaView} from 'react-native';
import Header from '../Header/Header';

import BookIcon from '../../assets/bookIcon.svg';

export default function Main() {
  return (
    <SafeAreaView>
      <Header Logo={BookIcon} />
    </SafeAreaView>
  );
}
