import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator, SafeAreaView, Text, TextInput, View, TouchableOpacity
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../Header/Header';

import { clearCurrentShelf } from '../../redux/actions/currentShelf.creator';
import logoSelector from '../../utils/logoSelector';

import SearchIcon from '../../assets/searchIcon.svg';
import stylesConstants from '../../styles/styles.constants';
import styles from './shelfDetail.styles';
import globalStyles from '../../styles/global.styles';
import ShelfSimulation from '../ShelfSimulation/ShelfSimulation';
import ShelfBooksList from '../ShelfBooksList/ShelfBooksList';
import sortShelfData from '../../utils/sortShelfData';

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
  const [isShelf, setIsShelf] = useState(true);
  const [shelfData, setShelfData] = useState([]);

  useEffect(() => {
    setShelfData(sortShelfData(shelf));
  }, [shelf]);

  useEffect(() => () => {
    dispatch(clearCurrentShelf());
  }, []);

  function handleShelfPage() {
    if (!isShelf) {
      setIsShelf(true);
    }
  }

  function handleListPage() {
    if (isShelf) {
      setIsShelf(false);
    }
  }

  function handleShelfClick(location: number[]) {
    console.log(location);
  }

  const bookShelf = (
    <>
      <Text style={styles.shelfName}>{shelf.name}</Text>
      <View style={globalStyles.thinInputContainer}>
        <TextInput
          style={globalStyles.thinInput}
          placeholder={`Search in ${shelf.name}`}
          maxLength={25}
        />
        <TouchableOpacity>
          <SearchIcon width={35} height={35} />
        </TouchableOpacity>
      </View>
      <View style={globalStyles.toggleContainer}>
        <TouchableOpacity
          style={[globalStyles.toggle, isShelf && globalStyles.toggleActive]}
          onPress={handleShelfPage}
        >
          <Text style={globalStyles.toggleText}>Shelf</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[globalStyles.toggle, !isShelf && globalStyles.toggleActive]}
          onPress={handleListPage}
        >
          <Text style={globalStyles.toggleText}>List</Text>
        </TouchableOpacity>
      </View>
      <View>
        {isShelf
          ? (
            <ShelfSimulation
              shelfSize={shelf.shelf}
              shelfData={shelfData}
              clickCallback={handleShelfClick}
            />
          )
          : <ShelfBooksList shelfData={shelf} logo={logo} navigation={navigation} />}

      </View>
    </>
  );

  return (
    <SafeAreaView>
      <Header Logo={logoSelector(logo)} BackButton navigation={navigation} />
      <View style={styles.currentShelfContainer}>
        {results
          ? bookShelf
          : <ActivityIndicator style={styles.activityIndicator} size="large" color={stylesConstants.colors.mainText} />}
      </View>
    </SafeAreaView>
  );
}
