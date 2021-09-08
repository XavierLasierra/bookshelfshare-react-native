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
import { searchBooks } from '../../redux/actions/books.creator';

interface Props {
  navigation: any,
  isbnFromCamera: string
}

export default function BookSearch({ navigation, isbnFromCamera }: Props) {
  const dispatch = useDispatch();
  const { token, refreshToken } = useSelector((store: any) => store.tokens);
  const [isISBN, setIsIsbn] = useState(true);
  const [isbn, setIsbn] = useState(isbnFromCamera);
  const [inauthor, setInauthor] = useState('');
  const [intitle, setIntitle] = useState('');
  const [inpublisher, setInpublisher] = useState('');

  function handleBookResultPage() {
    navigation.push('BookResults',
      {
        searchInformation: {
          isbn, inauthor, intitle, inpublisher
        }
      });
  }

  useEffect(() => {
    if (isbnFromCamera) {
      dispatch(searchBooks({ isbn: isbnFromCamera }, token, refreshToken));
      handleBookResultPage();
    }
  }, [isbnFromCamera]);

  function handleISBNPage() {
    if (!isISBN) {
      setIsIsbn(true);
      setInauthor('');
      setIntitle('');
      setInpublisher('');
    }
  }

  function handleOtherPage() {
    if (isISBN) {
      setIsIsbn(false);
      setIsbn('');
    }
  }

  function handleIsbnChange(text: string) {
    setIsbn(text);
  }

  function handleInauthorChange(text: string) {
    setInauthor(text);
  }

  function handleIntitleChange(text: string) {
    setIntitle(text);
  }

  function handleInpublisherChange(text: string) {
    setInpublisher(text);
  }

  function handleSearch() {
    if (isbn.trim() || inauthor.trim() || intitle.trim() || inpublisher.trim()) {
      dispatch(searchBooks({
        isbn: isbn.trim(),
        inauthor: inauthor.trim(),
        intitle: intitle.trim(),
        inpublisher: inpublisher.trim()
      }, token, refreshToken));
      handleBookResultPage();
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
            testID="isbnPageButton"
          >
            <Text style={styles.toggleText}>ISBN</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggle, !isISBN && styles.toggleActive]}
            onPress={handleOtherPage}
            testID="otherPageButton"
          >
            <Text style={styles.toggleText}>Other</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.formContainer}>
          {isISBN
            ? (
              <View style={globalStyles.inputContainer}>
                <Text style={globalStyles.inputLabel}>ISBN</Text>
                <TextInput
                  style={globalStyles.input}
                  onChangeText={handleIsbnChange}
                  value={isbn}
                  testID="isbnInput"

                />
              </View>
            )
            : (
              <>
                <View style={globalStyles.inputContainer}>
                  <Text style={globalStyles.inputLabel}>author</Text>
                  <TextInput
                    style={globalStyles.input}
                    onChangeText={handleInauthorChange}
                    value={inauthor}
                    testID="authorInput"

                  />
                </View>
                <View style={globalStyles.inputContainer}>
                  <Text style={globalStyles.inputLabel}>title</Text>
                  <TextInput
                    style={globalStyles.input}
                    onChangeText={handleIntitleChange}
                    value={intitle}
                    testID="titleInput"
                  />
                </View>
                <View style={globalStyles.inputContainer}>
                  <Text style={globalStyles.inputLabel}>publisher</Text>
                  <TextInput
                    style={globalStyles.input}
                    onChangeText={handleInpublisherChange}
                    value={inpublisher}
                    testID="publisherInput"
                  />
                </View>
              </>
            )}
          <TouchableOpacity
            style={[globalStyles.button, styles.searchButton]}
            onPress={handleSearch}
            testID="searchButton"
          >
            <Text style={globalStyles.buttonText}>Search</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
