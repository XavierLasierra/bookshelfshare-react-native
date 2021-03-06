import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {IAddToShelfProps, IStore} from '../../types/interfaces';

import Header from '../Header/Header';
import ShelfSimulation from '../ShelfSimulation/ShelfSimulation';

import logoSelector from '../../utils/logoSelector';
import {addToShelf} from '../../redux/actions/userShelves.creator';
import sortShelfData from '../../utils/sortShelfData';

import styles from './addToShelf.styles';
import globalStyles from '../../styles/global.styles';
import stylesConstants from '../../styles/styles.constants';

export default function AddToShelf({
  navigation,
  route: {
    params: {shelf, logo, deleteFromShelf, bookIsbn},
  },
}: IAddToShelfProps) {
  const dispatch = useDispatch();
  const {token, refreshToken} = useSelector((store: IStore) => store.tokens);
  const shelves = useSelector((store: IStore) => store.userShelves);
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
    if (Number.isNaN(location[0])) {
      setInvalidShelf(true);
    } else {
      setIsLoading(true);
      dispatch(
        addToShelf(
          deleteFromShelf,
          // eslint-disable-next-line no-underscore-dangle
          shelf._id,
          bookIsbn,
          {
            location,
          },
          token,
          refreshToken,
        ),
      );
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
        {!isLoading ? (
          <TouchableOpacity
            style={[globalStyles.button, styles.addToShelfButton]}
            testID="addButton"
            onPress={handleAddToShelf}>
            <Text style={globalStyles.buttonText}>Add to shelf</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[globalStyles.button, styles.addToShelfButton]}
            testID="addButton"
            disabled>
            <ActivityIndicator
              testID="loadingIndicator"
              size="large"
              color={stylesConstants.colors.white}
            />
          </TouchableOpacity>
        )}
        {invalidShelf && (
          <Text testID="invalidShelf" style={globalStyles.invalid}>
            Select a shelf to add it
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
}
