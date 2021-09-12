import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import Header from '../Header/Header';

import logoSelector from '../../utils/logoSelector';
import { clearCurrentShelf } from '../../redux/actions/currentShelf.creator';

interface Props {
    route: Route,
    navigation: any,
  }
  interface Route {
    params: Params
  }
  interface Params {
    logo: string
  }

export default function ShelfDetail(
  {
    navigation, route: {
      params: {
        logo
      }
    }
  }: Props
) {
  const dispatch = useDispatch();
  const { results, shelf } = useSelector((store: any) => store.currentShelf);
  console.log(results, shelf);

  useEffect(() => () => {
    dispatch(clearCurrentShelf());
  });

  return (
    <SafeAreaView>
      <Header Logo={logoSelector(logo)} BackButton navigation={navigation} />
    </SafeAreaView>
  );
}
