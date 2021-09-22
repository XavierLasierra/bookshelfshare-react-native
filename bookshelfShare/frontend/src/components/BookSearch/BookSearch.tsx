import React, { useState, useEffect } from 'react';
import {
  Text, TouchableOpacity, View, TextInput
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { IBookSearchProps, IStore } from '../../types/interfaces';

import Header from '../Header/Header';

import { searchBooks } from '../../redux/actions/books.creator';

import SearchIcon from '../../assets/searchIcon.svg';
import styles from './bookSearch.styles';
import globalStyles from '../../styles/global.styles';

export default function BookSearch({ navigation, isbnFromCamera }: IBookSearchProps) {
  const dispatch = useDispatch();
  const { token, refreshToken } = useSelector((store: IStore) => store.tokens);
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
        },
        logo: 'SearchIcon'
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
    <SafeAreaView style={globalStyles.mainContainer}>
      <Header Logo={SearchIcon} />
      <View style={styles.searchContainer}>
        <Text style={globalStyles.title}>
          Book Search
        </Text>
        <View style={globalStyles.toggleContainer}>
          <TouchableOpacity
            style={[globalStyles.toggle, isISBN && globalStyles.toggleActive]}
            onPress={handleISBNPage}
            testID="isbnPageButton"
          >
            <Text style={globalStyles.toggleText}>ISBN</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[globalStyles.toggle, !isISBN && globalStyles.toggleActive]}
            onPress={handleOtherPage}
            testID="otherPageButton"
          >
            <Text style={globalStyles.toggleText}>Other</Text>
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
                  keyboardType="number-pad"
                  maxLength={13}
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
                    maxLength={25}
                  />
                </View>
                <View style={globalStyles.inputContainer}>
                  <Text style={globalStyles.inputLabel}>title</Text>
                  <TextInput
                    style={globalStyles.input}
                    onChangeText={handleIntitleChange}
                    value={intitle}
                    testID="titleInput"
                    maxLength={25}
                  />
                </View>
                <View style={globalStyles.inputContainer}>
                  <Text style={globalStyles.inputLabel}>publisher</Text>
                  <TextInput
                    style={globalStyles.input}
                    onChangeText={handleInpublisherChange}
                    value={inpublisher}
                    testID="publisherInput"
                    maxLength={25}
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
