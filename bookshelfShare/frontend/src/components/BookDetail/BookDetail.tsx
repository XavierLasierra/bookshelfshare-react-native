import React, { useEffect, useState } from 'react';
import {
  View, Text, Image, SafeAreaView, ActivityIndicator, ScrollView
} from 'react-native';
import { AirbnbRating } from 'react-native-ratings';

import { useDispatch, useSelector } from 'react-redux';
import { getRatings, clearBook } from '../../redux/actions/books.creator';

import Header from '../Header/Header';
import BookIcon from '../../assets/bookIcon.svg';
import styles from './bookDetail.styles';
import stylesConstants from '../../styles/styles.constants';

export default function BookDetail({
  navigation,
  route: {
    params: {
      bookData
    }
  }
}: any) {
  const dispatch = useDispatch();
  const { token, refreshToken } = useSelector((store: any) => store.tokens);
  const customBookData = useSelector((store: any) => store.customBookData);
  const [rating, setRating] = useState(0);
  const [ratingNumber, setRatingNumber] = useState(0);
  useEffect(() => {
    if (bookData?.isbn?.ISBN13) {
      dispatch(getRatings(bookData.isbn.ISBN13, token, refreshToken));
    }
    return () => {
      dispatch(clearBook());
    };
  }, []);

  useEffect(() => {
    if (customBookData.ratings.length > 0) {
      const numberUsersRating = customBookData.ratings.length;
      const usersRating = customBookData.ratings
        .reduce((acc: Number, review: any) => acc + review.rating, 0) / numberUsersRating;
      setRating(usersRating);
      setRatingNumber(numberUsersRating);
    }
  }, [customBookData]);
  return (
    <SafeAreaView style={styles.bookDetailPageContainer}>
      <Header Logo={BookIcon} BackButton navigation={navigation} />
      <ScrollView>
        <View style={styles.bookDetailContainer}>
          <View style={styles.topContainer}>
            <Image
              source={{ uri: bookData?.images?.thumbnail || bookData?.images?.smallThumbnail }}
              style={styles.bookImage}
            />
            <View style={styles.mainInformation}>
              <View>
                <Text style={styles.title}>{bookData.title}</Text>
                <Text style={styles.smallText}>{bookData.subtitle && bookData.subtitle}</Text>
                {bookData.authors.map((author: string, index: number) => (index < 2
            && <Text style={styles.text} key={author}>{author}</Text>))}
                {bookData.authors.length >= 3 && <Text style={styles.text}>...</Text>}
                <Text style={styles.titleText}>Publisher:</Text>
                <Text style={styles.text}>{bookData.publisher}</Text>
                <Text style={styles.text}>{bookData.publishedDate}</Text>
              </View>
              <View style={styles.ratingContainer}>
                <AirbnbRating
                  showRating={false}
                  count={5}
                  defaultRating={rating}
                  size={20}
                  isDisabled
                />
                { customBookData.isLoaded
                  ? <Text style={styles.ratingCount}>{ratingNumber}</Text>
                  : <ActivityIndicator size="small" color={stylesConstants.colors.dark} />}
              </View>
            </View>
          </View>
          <View style={styles.secondaryInformation}>
            <View style={styles.textContainer}>
              <Text style={styles.titleText}>ISBN10:</Text>
              <Text style={styles.text}>{bookData.isbn.ISBN10}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.titleText}>ISBN13:</Text>
              <Text style={styles.text}>{bookData.isbn.ISBN13}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text>Categories:</Text>
              {bookData.categories.map((categorie: string, index: number) => (index < 2
            && <Text key={categorie}>{categorie}</Text>))}
              {bookData.categories.length >= 3 && <Text>...</Text>}
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.titleText}>Page count:</Text>
              <Text style={styles.text}>{bookData.pageCount}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.titleText}>Language:</Text>
              <Text style={styles.text}>{bookData.language.toUpperCase()}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.titleText}>Format:</Text>
              <Text style={styles.text}>{bookData.format}</Text>
            </View>
          </View>
          <View>
            <Text>{bookData.description}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
