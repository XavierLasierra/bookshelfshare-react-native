import React, { useState, useEffect } from 'react';
import {
  Text, TouchableOpacity, View, TextInput
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../Header/Header';

import SearchIcon from '../../assets/searchIcon.svg';
import styles from './bookSearch.styles';
import globalStyles from '../../styles/global.styles';
import searchBooks from '../../redux/actions/books.creator';

interface Props {
    isbn: string
}

export default function BookSearch({ isbn }: Props) {
  const dispatch = useDispatch();
  const [isISBN, setISBN] = useState(true);
  const { token, refreshToken } = useSelector((store: any) => store.loggedUser);

  useEffect(() => {
    if (isbn) {
      dispatch(searchBooks({ isbn }, token, refreshToken));
    }
  }, []);

  function handleISBNPage() {
    if (!isISBN) {
      setISBN(true);
    }
  }

  function handleOtherPage() {
    if (isISBN) {
      setISBN(false);
    }
  }

  return (
    <SafeAreaView>
      <Header Logo={SearchIcon} />
      <View style={styles.searchContainer}>
        <Text style={globalStyles.title}>
          Book Search
        </Text>
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[styles.toggle, isISBN && styles.toggleActive]}
            onPress={handleISBNPage}
          >
            <Text style={styles.toggleText}>ISBN</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggle, !isISBN && styles.toggleActive]}
            onPress={handleOtherPage}
          >
            <Text style={styles.toggleText}>Other</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.formContainer}>
          {isISBN
            ? (
              <>
                <View style={globalStyles.inputContainer}>
                  <Text style={globalStyles.inputLabel}>ISBN</Text>
                  <TextInput
                    style={globalStyles.input}
                  />
                </View>
                <TouchableOpacity
                  style={[globalStyles.button, styles.searchButton]}
                >
                  <Text style={globalStyles.buttonText}>Search</Text>
                </TouchableOpacity>
              </>
            )
            : (
              <>
                <View style={globalStyles.inputContainer}>
                  <Text style={globalStyles.inputLabel}>author</Text>
                  <TextInput
                    style={globalStyles.input}
                  />
                </View>
                <View style={globalStyles.inputContainer}>
                  <Text style={globalStyles.inputLabel}>title</Text>
                  <TextInput
                    style={globalStyles.input}
                  />
                </View>
                <View style={globalStyles.inputContainer}>
                  <Text style={globalStyles.inputLabel}>publisher</Text>
                  <TextInput
                    style={globalStyles.input}
                  />
                </View>
                <TouchableOpacity
                  style={[globalStyles.button, styles.searchButton]}
                >
                  <Text style={globalStyles.buttonText}>Search</Text>
                </TouchableOpacity>
              </>
            )}
        </View>
      </View>

    </SafeAreaView>
  );
}
