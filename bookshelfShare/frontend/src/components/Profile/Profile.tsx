import React from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {IProfileProps, IStore, IUser} from '../../types/interfaces';

import Header from '../Header/Header';
import ProfileDetail from '../ProfileDetail/ProfileDetail';

import {logoutUser} from '../../redux/actions/loggedUser.creator';
import {getBooksData} from '../../redux/actions/books.creator';
import {loadLocalUsers} from '../../redux/actions/usersList.creator';

import ProfileIcon from '../../assets/profileIcon.svg';
import styles from './profile.styles';
import globalStyles from '../../styles/global.styles';

export default function Profile({navigation}: IProfileProps) {
  const dispatch = useDispatch();
  const {userData} = useSelector((store: IStore) => store.loggedUser);
  const userBooks = useSelector((store: IStore) => store.userBooks);
  const {followers, following} = useSelector(
    (store: IStore) => store.userSocials,
  );
  const {token, refreshToken} = useSelector((store: IStore) => store.tokens);
  const shelves = useSelector((store: IStore) => store.userShelves);

  function handleLogout() {
    dispatch(logoutUser(refreshToken));
  }

  function handleBookResultsPage(listName: string, bookArray: string[]) {
    dispatch(getBooksData(bookArray, token, refreshToken));
    navigation.push('BookResults', {
      listName,
      logo: 'ProfileIcon',
    });
  }

  function handleUserListPage(users: IUser[]) {
    dispatch(loadLocalUsers(users));
    navigation.push('UsersList', {
      logo: 'ProfileIcon',
    });
  }

  return (
    <SafeAreaView style={globalStyles.mainContainer}>
      <Header Logo={ProfileIcon} />
      <ScrollView>
        <View style={globalStyles.profileContainer}>
          <View style={globalStyles.topContainer}>
            <Image
              source={{uri: userData.photo}}
              style={globalStyles.userPhoto}
            />
            <View style={globalStyles.userInformationContainer}>
              <Text style={globalStyles.userUsername}>{userData.username}</Text>
              <Text style={globalStyles.userEmail}>{userData.email}</Text>
            </View>
          </View>
          <View style={styles.actionsContainer}>
            <View style={styles.socialContainer}>
              <TouchableOpacity
                style={styles.socialButton}
                onPress={() => handleUserListPage(followers)}
                testID="followersButton">
                <ProfileIcon width={25} height={25} />
                <Text style={styles.buttonText}>
                  {followers.length}{' '}
                  {followers.length === 1 ? 'follower' : 'followers'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.socialButton}
                onPress={() => handleUserListPage(following)}
                testID="followingButton">
                <ProfileIcon width={25} height={25} />
                <Text style={styles.buttonText}>
                  {following.length} following
                </Text>
              </TouchableOpacity>
            </View>
            <ProfileDetail
              handleBookResultsPage={handleBookResultsPage}
              userBooks={userBooks}
              shelves={shelves}
            />
          </View>
          <TouchableOpacity
            style={[globalStyles.button, styles.logoutButton]}
            onPress={handleLogout}
            testID="logoutButton">
            <Text style={globalStyles.buttonText}>Log out</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.marginBottom} />
      </ScrollView>
    </SafeAreaView>
  );
}
