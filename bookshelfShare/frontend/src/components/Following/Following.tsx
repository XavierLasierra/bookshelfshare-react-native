import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import Header from '../Header/Header';

import FollowingIcon from '../../assets/followingIcon.svg';
import globalStyles from '../../styles/global.styles';

export default function Following() {
  return (
    <SafeAreaView style={globalStyles.mainContainer}>
      <Header Logo={FollowingIcon} />
      <View>
        <Text>Hieiei</Text>
      </View>
    </SafeAreaView>
  );
}
