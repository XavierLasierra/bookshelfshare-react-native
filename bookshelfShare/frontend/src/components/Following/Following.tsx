import React from 'react';
import {SafeAreaView, View, Text, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {IFollowingProps, IStore} from '../../types/interfaces';

import Header from '../Header/Header';

import {loadLocalUsers} from '../../redux/actions/usersList.creator';

import FollowingIcon from '../../assets/followingIcon.svg';
import globalStyles from '../../styles/global.styles';
import styles from './following.styles';

export default function Following({navigation}: IFollowingProps) {
  const dispatch = useDispatch();
  const {following} = useSelector((store: IStore) => store.userSocials);

  function handleFollowingUsersPage() {
    dispatch(loadLocalUsers(following));
    navigation.push('UsersList', {
      logo: 'FollowingIcon',
      followingPage: true,
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
            testID="followingUsersPageButton">
            <FollowingIcon width={40} height={40} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
