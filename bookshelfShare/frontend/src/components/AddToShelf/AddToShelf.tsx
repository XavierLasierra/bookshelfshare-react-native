import React, { useEffect, useState } from 'react';
import {
  View, SafeAreaView, Text, TouchableOpacity, ActivityIndicator
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import Header from '../Header/Header';
import ShelfSimulation from '../ShelfSimulation/ShelfSimulation';

import logoSelector from '../../utils/logoSelector';

import styles from './addToShelf.styles';
import globalStyles from '../../styles/global.styles';
import stylesConstants from '../../styles/styles.constants';
import { addToShelf } from '../../redux/actions/userShelves.creator';
import sortShelfData from '../../utils/sortShelfData';

export default function AddToShelf({
  navigation,
  route: {
    params: {
      shelf,
      logo,
      deleteFromShelf,
      notes,
      bookIsbn
    }
  }
}: any) {
  const dispatch = useDispatch();
  const { token, refreshToken } = useSelector((store: any) => store.tokens);
  const shelves = useSelector((store: any) => store.userShelves);
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState([NaN, NaN]);
  const [invalidShelf, setInvalidShelf] = useState(false);

  function clickCallback(newLocation: number[]) {
    setInvalidShelf(false);
    setLocation(newLocation);
  }

  useEffect(() => {
    if (isLoading) {
      setIsLoading(false);
      navigation.pop();
    }
  }, [shelves]);

  function handleAddToShelf() {
    if (Number.isNaN(location[0]) || Number.isNaN(location[1])) {
      setInvalidShelf(true);
    } else {
      setIsLoading(true);
      dispatch(addToShelf(
        deleteFromShelf,
        // eslint-disable-next-line no-underscore-dangle
        shelf._id,
        bookIsbn, {
          notes,
          location
        },
        token,
        refreshToken
      ));
    }
  }

  return (
    <SafeAreaView>
      <Header Logo={logoSelector(logo)} BackButton navigation={navigation} />
      <View style={styles.addToShelfContainer}>
        <Text style={styles.addToShelfTitle}>Choose where to add it</Text>
        <View style={styles.currentShelfContainer}>
          <ShelfSimulation
            shelfSize={shelf.shelf}
            clickCallback={clickCallback}
            activeShelf={location}
            shelfData={sortShelfData(shelf)}
          />
        </View>
        {!isLoading
          ? (
            <TouchableOpacity
              style={[globalStyles.button, styles.addToShelfButton]}
              testID="addButton"
              onPress={handleAddToShelf}
            >
              <Text style={globalStyles.buttonText}>Add to shelf</Text>
            </TouchableOpacity>
          )
          : (
            <TouchableOpacity
              style={[globalStyles.button, styles.addToShelfButton]}
              testID="addButton"
              disabled
            >
              <ActivityIndicator testID="loadingIndicator" size="large" color={stylesConstants.colors.white} />
            </TouchableOpacity>
          )}
        {invalidShelf && <Text style={globalStyles.invalid}>Select a shelf to add it</Text>}
      </View>
    </SafeAreaView>
  );
}
