import React, { useEffect } from 'react';
import {
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import {
  SharedElement
} from 'react-navigation-shared-element';
import { useDispatch, useSelector } from 'react-redux';

import { automaticLogin } from '../../redux/actions/loggedUser.creator';

import BookIcon from '../../assets/bookIcon.svg';
import styles from './initialLoading.styles';

export default function InitialLoading({ navigation }: any) {
  const dispatch = useDispatch();
  const { needsLogin, isAuthenticated } = useSelector((store: any) => store.loggedUser);

  function handlePageChange() {
    navigation.push('Login');
  }

  useEffect(() => {
    if (!needsLogin && !isAuthenticated) {
      dispatch(automaticLogin());
    } else if (needsLogin) {
      setTimeout(handlePageChange, 0);
    }
  }, [needsLogin]);

  return (
    <SafeAreaView
      style={styles.initialPage}
    >
      <TouchableOpacity
        onPress={() => handlePageChange()}
        style={styles.titleContainer}
        activeOpacity={1}
      >
        <SharedElement id="mainIcon">
          <BookIcon
            width={60}
            height={60}
          />
        </SharedElement>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
