import React from 'react';
import { SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import logoSelector from '../../utils/logoSelector';
import Header from '../Header/Header';

export default function UsersList({ navigation, route: { params: { logo } } }: any) {
  const { users, results } = useSelector((store: any) => store.usersList);
  console.log(users, results);
  return (
    <SafeAreaView>
      <Header Logo={logoSelector(logo)} BackButton navigation={navigation} />
    </SafeAreaView>
  );
}
