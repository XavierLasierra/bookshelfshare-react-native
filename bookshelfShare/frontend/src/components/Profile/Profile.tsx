import React from 'react';
import { SafeAreaView } from 'react-native';
import Header from '../Header/Header';

import ProfileIcon from '../../assets/profileIcon.svg';

export default function Profile() {
  return (
    <SafeAreaView>
      <Header Logo={ProfileIcon} />
    </SafeAreaView>
  );
}
