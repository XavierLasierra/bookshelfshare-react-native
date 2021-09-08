import React, { useEffect } from 'react';
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

interface Props {
  route: Route,
  navigation: any,
}
interface Route {
  params: Params
}
interface Params {
  searchInformation: SearchInformation,
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
        logo
      }
    }
  }: Props
) {
  const dispatch = useDispatch();
  const { books, results } = useSelector((store: any) => store.books);
  const {
    isbn, inauthor, intitle, inpublisher
  } = searchInformation;

  useEffect(() => () => {
    dispatch(clearBooks());
  }, []);

  function renderBook({ item }: any) {
    return <BookElementSearch bookData={item} navigation={navigation} logo={logo} />;
  }

  const bookResults = books.length > 0
    ? (
      <FlatList
        showsVerticalScrollIndicator={false}
        data={books}
        renderItem={renderBook}
        keyExtractor={(item, index) => `book-${index}`}
      />
    )
    : <Text>0 results</Text>;

  return (
    <SafeAreaView style={styles.bookResultsContainer}>
      <Header Logo={logoSelector(logo)} BackButton navigation={navigation} />
      <View style={styles.resultsContainer}>
        <View style={styles.searchParameters}>
          <Text style={styles.parameter}>{isbn && `ISBN: ${isbn.toUpperCase()}`}</Text>
          <Text style={styles.parameter}>{intitle && `Title: ${intitle.toUpperCase()}`}</Text>
          <Text style={styles.parameter}>{inauthor && `Author: ${inauthor.toUpperCase()}`}</Text>
          <Text style={styles.parameter}>{inpublisher && `Publisher: ${inpublisher.toUpperCase()}`}</Text>
        </View>
        {results
          ? bookResults
          : <ActivityIndicator size="large" color={stylesConstants.colors.dark} />}
        <View style={styles.marginBottom} />
      </View>
    </SafeAreaView>
  );
}
