import React, { useEffect, useState } from 'react';
import {
  Text, TouchableOpacity, View, TextInput
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../Header/Header';

import ShelfIcon from '../../assets/shelfIcon.svg';
import styles from './newShelf.styles';
import globalStyles from '../../styles/global.styles';
import { createShelf } from '../../redux/actions/userShelves.creator';

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

  useEffect(() => {
    if (isCreating) {
      navigation.pop();
    }
  }, [shelves]);

  function handleShelfCreation() {
    setIsCreating(true);
    const shelvesInformation = {
      name,
      users: [loggedUserId],
      shelf: new Array(+rows).fill(+columns)
    };
    dispatch(createShelf(shelvesInformation, token, refreshToken));
  }

  function handleNameChange(text: string) {
    setName(text);
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
            />
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
                maxLength={2}
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
                maxLength={2}
              />
            </View>
          </View>
          <TouchableOpacity
            style={[globalStyles.button, styles.createButton]}
            onPress={handleShelfCreation}
            testID="createButton"
          >
            <Text style={globalStyles.buttonText}>Create</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
