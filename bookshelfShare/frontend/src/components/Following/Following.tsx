import React from 'react';
import { SafeAreaView } from 'react-native';
import Header from '../Header/Header';

import FollowingIcon from '../../assets/followingIcon.svg';

export default function Following() {
  return (
    <SafeAreaView>
      <Header Logo={FollowingIcon} />
    </SafeAreaView>
  );
}
