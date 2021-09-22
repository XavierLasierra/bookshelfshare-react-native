import React, { useEffect } from 'react';
import { SafeAreaView, View } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import { useDispatch, useSelector } from 'react-redux';
import { IInitialLoadingProps, IStore } from '../../types/interfaces';

import { automaticLogin } from '../../redux/actions/loggedUser.creator';

import BookIcon from '../../assets/bookIcon.svg';
import styles from './initialLoading.styles';

export default function InitialLoading({ navigation }: IInitialLoadingProps) {
  const dispatch = useDispatch();
  const { needsLogin } = useSelector((store: IStore) => store.loggedUser);

  function handlePageChange() {
    navigation.push('Login');
  }

  useEffect(() => {
    if (!needsLogin) {
      dispatch(automaticLogin());
    }
  }, []);

  useEffect(() => {
    if (needsLogin) {
      setTimeout(handlePageChange, 100);
    }
  }, [needsLogin]);

  return (
    <SafeAreaView
      style={styles.initialPage}
    >
      <View
        style={styles.titleContainer}
      >
        <SharedElement id="mainIcon">
          <BookIcon
            width={60}
            height={60}
          />
        </SharedElement>
      </View>
    </SafeAreaView>
  );
}
