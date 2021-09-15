import React, { useEffect, useState } from 'react';
import {
  SafeAreaView, Text, ActivityIndicator, FlatList, View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../Header/Header';
import BookElementSearch from '../BookElementSearch/BookElementSearch';

import { clearBooks } from '../../redux/actions/books.creator';
import stylesConstants from '../../styles/styles.constants';
import styles from './bookResults.styles';
import logoSelector from '../../utils/logoSelector';
import globalStyles from '../../styles/global.styles';
import BookListFilter from '../BookListFilter/BookListFilter';

interface Props {
  route: Route,
  navigation: any,
}
interface Route {
  params: Params
}
interface Params {
  searchInformation?: SearchInformation,
  listName?: string,
  logo: string
}
interface SearchInformation {
  isbn: string,
  inauthor: string,
  intitle: string,
  inpublisher: string,
}

export default function BookResults(
  {
    navigation, route: {
      params: {
        searchInformation,
        listName,
        logo
      }
    }
  }: Props
) {
  const dispatch = useDispatch();
  const { books, results } = useSelector((store: any) => store.books);
  const [filteredBooks, setFilterdBooks] = useState([]);

  useEffect(() => () => {
    dispatch(clearBooks());
  }, []);

  useEffect(() => {
    setFilterdBooks(books);
  }, [books]);

  function renderBook({ item }: any) {
    return <BookElementSearch bookData={item} navigation={navigation} logo={logo} />;
  }

  const bookResults = books.length > 0
    ? (
      <FlatList
        showsVerticalScrollIndicator={false}
        data={filteredBooks}
        renderItem={renderBook}
        keyExtractor={(item, index) => `book-${index}`}
      />
    )
    : <Text>0 books</Text>;

  return (
    <SafeAreaView style={globalStyles.mainContainer}>
      <Header Logo={logoSelector(logo)} BackButton navigation={navigation} />
      <View style={styles.resultsContainer}>
        {listName
          ? <BookListFilter listName={listName} books={books} setFilteredBooks={setFilterdBooks} />
          : (
            <View style={styles.searchParameters}>
              <Text style={styles.parameter}>{searchInformation?.isbn && `ISBN: ${searchInformation?.isbn.toUpperCase()}`}</Text>
              <Text style={styles.parameter}>{searchInformation?.intitle && `Title: ${searchInformation?.intitle.toUpperCase()}`}</Text>
              <Text style={styles.parameter}>{searchInformation?.inauthor && `Author: ${searchInformation?.inauthor.toUpperCase()}`}</Text>
              <Text style={styles.parameter}>{searchInformation?.inpublisher && `Publisher: ${searchInformation?.inpublisher.toUpperCase()}`}</Text>
            </View>
          )}
        {results
          ? bookResults
          : <ActivityIndicator size="large" color={stylesConstants.colors.dark} />}
        <View style={styles.marginBottom} />
      </View>
    </SafeAreaView>
  );
}
