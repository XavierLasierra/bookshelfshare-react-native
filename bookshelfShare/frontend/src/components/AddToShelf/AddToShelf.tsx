import React, { useState } from 'react';
import {
  View, SafeAreaView, Text, TouchableOpacity, ActivityIndicator
} from 'react-native';

import Header from '../Header/Header';
import ShelfSimulation from '../ShelfSimulation/ShelfSimulation';

import logoSelector from '../../utils/logoSelector';

import styles from './addToShelf.styles';
import globalStyles from '../../styles/global.styles';

export default function AddToShelf({
  navigation,
  route: {
    params: {
      shelf,
      logo
    }
  }
}: any) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <SafeAreaView>
      <Header Logo={logoSelector(logo)} BackButton navigation={navigation} />
      <View style={styles.addToShelfContainer}>
        <Text style={styles.addToShelfTitle}>Choose where to add it</Text>
        <View style={styles.currentShelfContainer}>
          <ShelfSimulation shelfSize={shelf.shelf} />
        </View>
        {!isLoading
          ? (
            <TouchableOpacity
              style={[globalStyles.button, styles.addToShelfButton]}
              testID="loginButton"
            >
              <Text style={globalStyles.buttonText}>Add to shelf</Text>
            </TouchableOpacity>
          )
          : (
            <TouchableOpacity
              style={[globalStyles.button, styles.addToShelfButton]}
              testID="loginButton"
              disabled
            >
              <ActivityIndicator testID="loadingIndicator" size="large" color={stylesConstants.colors.white} />
            </TouchableOpacity>
          )}
      </View>
    </SafeAreaView>
  );
}
