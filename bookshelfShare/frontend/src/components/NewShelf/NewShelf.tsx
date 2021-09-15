import React, { useEffect, useState } from 'react';
import {
  Text, TouchableOpacity, View, TextInput, ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../Header/Header';

import ShelfIcon from '../../assets/shelfIcon.svg';
import styles from './newShelf.styles';
import globalStyles from '../../styles/global.styles';
import { createShelf } from '../../redux/actions/userShelves.creator';
import stylesConstants from '../../styles/styles.constants';

interface Props {
  navigation: any,
  route: any
}

export default function NewShelf({ navigation, route: { params: { loggedUserId } } }: Props) {
  const dispatch = useDispatch();
  const { token, refreshToken } = useSelector((store: any) => store.tokens);
  const shelves = useSelector((store: any) => store.userShelves);
  const [name, setName] = useState('');
  const [rows, setRows] = useState('');
  const [columns, setColumns] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [invalidShelf, setInvalidShelf] = useState(false);
  const [invalidShelfName, setInvalidShelfName] = useState(false);

  useEffect(() => {
    if (isCreating) {
      navigation.pop();
    }
  }, [shelves]);

  function handleShelfCreation() {
    if (!name) {
      setInvalidShelfName(true);
    } else if (+rows > 6 || +columns > 6 || +rows <= 0 || +columns <= 0) {
      setInvalidShelf(true);
    } else {
      setIsCreating(true);
      const shelvesInformation = {
        name,
        users: [loggedUserId],
        shelf: new Array(+rows).fill(+columns)
      };
      dispatch(createShelf(shelvesInformation, token, refreshToken));
    }
  }

  function handleNameChange(text: string) {
    setName(text);
  }

  function handleNameFocus() {
    if (invalidShelfName) {
      setInvalidShelfName(false);
    }
  }

  function handleRowColumnFocus() {
    if (invalidShelf) {
      setInvalidShelf(false);
    }
  }

  function handleRowsChange(text: string) {
    setRows(text);
  }

  function handleColumnsChange(text: string) {
    setColumns(text);
  }

  return (
    <SafeAreaView style={globalStyles.mainContainer}>
      <Header Logo={ShelfIcon} BackButton navigation={navigation} />
      <View style={styles.createShelfContainer}>
        <Text style={globalStyles.title}>
          New shelf
        </Text>
        <View style={styles.formContainer}>
          <View style={globalStyles.inputContainer}>
            <Text style={globalStyles.inputLabel}>name</Text>
            <TextInput
              style={globalStyles.input}
              onChangeText={handleNameChange}
              value={name}
              testID="nameInput"
              maxLength={25}
              onFocus={handleNameFocus}
            />
            {invalidShelfName && (
            <Text
              style={globalStyles.invalid}
              testID="invalidShelfName"
            >
              Select a name for your shelf
            </Text>
            )}
          </View>
          <View style={styles.shelfSizeContainer}>
            <View style={[globalStyles.inputContainer, styles.smallInputContainer]}>
              <Text style={globalStyles.inputLabel}>rows</Text>
              <TextInput
                style={globalStyles.input}
                onChangeText={handleRowsChange}
                value={rows}
                testID="rowsInput"
                keyboardType="number-pad"
                maxLength={1}
                onFocus={handleRowColumnFocus}
              />
            </View>
            <View style={[globalStyles.inputContainer, styles.smallInputContainer]}>
              <Text style={globalStyles.inputLabel}>columns</Text>
              <TextInput
                style={globalStyles.input}
                onChangeText={handleColumnsChange}
                value={columns}
                testID="columnsInput"
                keyboardType="number-pad"
                maxLength={1}
                onFocus={handleRowColumnFocus}
              />
            </View>
          </View>
          {invalidShelf && (
          <Text
            style={globalStyles.invalid}
            testID="invalidShelfSize"
          >
            Shelfs must have at least 1 and no more than 6 columns/rows
          </Text>
          )}
          <TouchableOpacity
            style={[globalStyles.button, styles.createButton]}
            onPress={handleShelfCreation}
            testID="createButton"
          >
            {isCreating
              ? <ActivityIndicator testID="activityIndicator" size="small" color={stylesConstants.colors.white} />
              : <Text style={globalStyles.buttonText}>Create</Text>}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
