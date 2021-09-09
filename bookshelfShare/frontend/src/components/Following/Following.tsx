import React from 'react';
import {
  SafeAreaView, View, Text, TouchableOpacity
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../Header/Header';

import FollowingIcon from '../../assets/followingIcon.svg';
import globalStyles from '../../styles/global.styles';
import styles from './following.styles';
import { loadLocalUsers } from '../../redux/actions/usersList.creator';

export default function Following({ navigation }: any) {
  const dispatch = useDispatch();
  const { following } = useSelector((store: any) => store.userSocials);

  function handleFollowingUsersPage() {
    dispatch(loadLocalUsers(following));
    navigation.push('UsersList',
      {
        logo: 'FollowingIcon'
      });
  }

  return (
    <SafeAreaView style={globalStyles.mainContainer}>
      <Header Logo={FollowingIcon} />
      <View style={styles.followingContainer}>
        <View style={styles.topContainer}>
          <Text>Users activity under construction</Text>
          <TouchableOpacity
            style={[globalStyles.circularButton]}
            onPress={handleFollowingUsersPage}
          >
            <FollowingIcon width={40} height={40} />
          </TouchableOpacity>
        </View>
      </View>

    </SafeAreaView>
  );
}
