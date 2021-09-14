import React, { useEffect, useState } from 'react';
import {
  SafeAreaView, TouchableOpacity, FlatList, Text, View, ActivityIndicator, TextInput
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../Header/Header';
import UserElement from '../UserElement/UserElement';

import { clearUsersList, getUsers, loadLocalUsers } from '../../redux/actions/usersList.creator';
import logoSelector from '../../utils/logoSelector';

import SearchIcon from '../../assets/searchIcon.svg';
import stylesConstants from '../../styles/styles.constants';
import styles from './usersList.styles';
import globalStyles from '../../styles/global.styles';

export default function UsersList({ navigation, route: { params: { logo, followingPage } } }: any) {
  const dispatch = useDispatch();
  const { userData: { _id: loggedUserId } } = useSelector((store: any) => store.loggedUser);
  const { users, results } = useSelector((store: any) => store.usersList);
  const { following } = useSelector((store: any) => store.userSocials);
  const { token, refreshToken } = useSelector((store: any) => store.tokens);
  const [emailSearch, setEmailSearch] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => () => {
    dispatch(clearUsersList());
  }, []);

  function renderUser({ item }: any) {
    return (
      <UserElement
        navigation={navigation}
        user={item}
        following={following}
        loggedUserId={loggedUserId}
        token={token}
        refreshToken={refreshToken}
        logo={logo}
      />
    );
  }

  function handleEmailInputChange(text: string) {
    setEmailSearch(text);
  }

  function handleClearSearch() {
    setEmailSearch('');
    setIsSearching(false);
    dispatch(loadLocalUsers(following));
  }

  function handleUserSearch() {
    if (emailSearch) {
      setIsSearching(true);
      dispatch(clearUsersList());
      dispatch(getUsers(emailSearch, token, refreshToken));
    } else {
      setIsSearching(false);
      dispatch(loadLocalUsers(following));
    }
  }

  const usersResults = users.length > 0
    ? (
      <>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={users}
          renderItem={renderUser}
          keyExtractor={(item, index) => `user-${index}`}
          ListFooterComponent={() => <View style={styles.marginBottom} />}
        />

      </>
    )
    : <Text>0 users</Text>;

  return (
    <SafeAreaView>
      <Header Logo={logoSelector(logo)} BackButton navigation={navigation} />
      <View style={styles.usersListContainer}>
        {followingPage && (
        <View>
          <View style={globalStyles.thinInputContainer}>
            <TextInput
              style={globalStyles.thinInput}
              placeholder="Search new users by email/name"
              value={emailSearch}
              onChangeText={handleEmailInputChange}
              maxLength={25}
              testID="searchInput"
            />
            <TouchableOpacity
              onPress={handleUserSearch}
              testID="searchButton"
            >
              <SearchIcon width={35} height={35} />
            </TouchableOpacity>
          </View>
          {(isSearching && results)
          && (
          <TouchableOpacity
            onPress={handleClearSearch}
            style={styles.clearSearchButton}
            testID="clearSearchButton"
          >
            <Text style={styles.clearSearchButtonText}>Clear search</Text>
          </TouchableOpacity>
          )}
        </View>
        )}
        <View style={styles.resultsContainer}>
          {results
            ? usersResults
            : <ActivityIndicator testID="activityIndicator" size="large" color={stylesConstants.colors.dark} />}
        </View>
      </View>
    </SafeAreaView>
  );
}
