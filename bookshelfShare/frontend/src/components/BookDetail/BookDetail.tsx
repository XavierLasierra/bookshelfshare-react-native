import React, { useEffect, useState } from 'react';
import {
  View, Text, Image, SafeAreaView, ActivityIndicator, ScrollView
} from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../Header/Header';
import Notes from '../Notes/Notes';
import Rating from '../Rating/Rating';

import { getRatings, clearBook } from '../../redux/actions/books.creator';

import styles from './bookDetail.styles';
import stylesConstants from '../../styles/styles.constants';
import globalStyles from '../../styles/global.styles';
import logoSelector from '../../utils/logoSelector';

export default function BookDetail({
  navigation,
  route: {
    params: {
      bookData,
      logo
    }
  }
}: any) {
  const dispatch = useDispatch();
  const { token, refreshToken } = useSelector((store: any) => store.tokens);
  const { ratings, list, isLoaded } = useSelector((store: any) => store.customBookData);
  const [rating, setRating] = useState(0);
  const [ratingNumber, setRatingNumber] = useState(0);

  useEffect(() => {
    dispatch(getRatings(bookData.isbn.ISBN13, token, refreshToken));
    return () => {
      dispatch(clearBook());
    };
  }, []);

  useEffect(() => {
    if (ratings.length > 0) {
      const numberUsersRating = ratings.length;
      const usersRating = ratings
        .reduce((acc: number, review: any) => acc + review.rating, 0) / numberUsersRating;
      setRating(Math.round(usersRating));
      setRatingNumber(numberUsersRating);
    }
  }, [ratings]);

  return (
    <SafeAreaView style={styles.bookDetailPageContainer}>
      <Header Logo={logoSelector(logo)} BackButton navigation={navigation} />
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
                {!!bookData.subtitle && <Text style={styles.smallText}>{bookData.subtitle}</Text>}
                {bookData.authors.map((author: string, index: number) => (index < 2
            && <Text style={globalStyles.text} key={author}>{author}</Text>))}
                {bookData.authors.length >= 3 && <Text style={globalStyles.text}>...</Text>}
                <Text style={globalStyles.titleText}>Publisher:</Text>
                <Text style={globalStyles.text}>{bookData.publisher}</Text>
                <Text style={globalStyles.text}>{bookData.publishedDate}</Text>
              </View>
              <View style={styles.ratingContainer}>
                <AirbnbRating
                  showRating={false}
                  count={5}
                  defaultRating={rating}
                  size={20}
                  isDisabled
                />
                { isLoaded
                  ? <Text testID="numberOfRatings" style={styles.ratingCount}>{ratingNumber}</Text>
                  : <ActivityIndicator size="small" color={stylesConstants.colors.dark} />}
              </View>
            </View>
          </View>
          <View style={styles.secondaryInformation}>
            <View style={styles.textContainer}>
              <Text style={globalStyles.titleText}>ISBN10:</Text>
              <Text style={globalStyles.text}>{bookData.isbn.ISBN10}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={globalStyles.titleText}>ISBN13:</Text>
              <Text style={globalStyles.text}>{bookData.isbn.ISBN13}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={globalStyles.titleText}>Categories:</Text>
              {bookData.categories.map((categorie: string, index: number) => (index < 2
            && <Text key={categorie} style={globalStyles.text}>{categorie}</Text>))}
              {bookData.categories.length >= 3 && <Text style={globalStyles.text}>...</Text>}
            </View>
            <View style={styles.textContainer}>
              <Text style={globalStyles.titleText}>Page count:</Text>
              <Text style={globalStyles.text}>{bookData.pageCount}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={globalStyles.titleText}>Language:</Text>
              <Text style={globalStyles.text}>{bookData.language.toUpperCase()}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={globalStyles.titleText}>Format:</Text>
              <Text style={globalStyles.text}>{bookData.format}</Text>
            </View>
          </View>
          <View>
            <Text style={styles.description}>{bookData.description}</Text>
          </View>
          {isLoaded
            ? (
              <>
                <Notes list={list} />
                <Rating
                  ratings={ratings}
                  isbn={bookData.isbn.ISBN13}
                  token={token}
                  refreshToken={refreshToken}
                />
              </>
            )
            : <ActivityIndicator size="large" color={stylesConstants.colors.dark} />}

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
