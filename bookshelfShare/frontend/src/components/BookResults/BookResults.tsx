import React, { useEffect } from 'react';
import {
  SafeAreaView, ScrollView, Text, ActivityIndicator, FlatList
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import Header from '../Header/Header';

import SearchIcon from '../../assets/searchIcon.svg';
import { clearBooks } from '../../redux/actions/books.creator';
import stylesConstants from '../../styles/styles.constants';
import BookElementSearch from '../BookElementSearch/BookElementSearch';

interface Props {
  route: Route,
  navigation: any
}
interface Route {
  params: Params

}
interface Params {
  searchInformation: SearchInformation
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
        searchInformation
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
    return <BookElementSearch bookData={item} />;
  }
  return (
    <SafeAreaView>
      <Header Logo={SearchIcon} BackButton navigation={navigation} />
      <ScrollView>
        <Text>
          {isbn && `ISBN: ${isbn}`}
          {inauthor && `Author: ${inauthor}`}
          {intitle && `Title: ${intitle}`}
          {inpublisher && `Publisher: ${inpublisher}`}
        </Text>
        {results
          ? (
            <>
              {books.length > 0
                ? (
                  <FlatList
                    data={books}
                    renderItem={renderBook}
                    keyExtractor={(book) => book?.isbn[0]?.identifier}
                  />
                )
                : <Text>0 results</Text>}
            </>
          )
          : <ActivityIndicator size="large" color={stylesConstants.colors.dark} />}
      </ScrollView>
    </SafeAreaView>
  );
}
