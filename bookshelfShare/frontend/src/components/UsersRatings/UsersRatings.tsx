/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';

import RatingElement from '../RatingElement/RatingElement';

import globalStyles from '../../styles/global.styles';
import styles from './usersRatings.styles';

export default function UsersRatings({ ratings, userData }: any) {
  const ratingTypes = [5, 4, 3, 2, 1];
  const [filteredRatings, setFilteredRatings] = useState(ratings);

  useEffect(() => {
    setFilteredRatings(ratings);
  }, [ratings]);

  function countNumberOfRatings(rating: number) {
    return ratings
      .reduce((acc: number, { rating: currentRating }: any) => (currentRating === rating
        ? acc + 1 : acc), 0);
  }

  function handleFilter(rating: number) {
    const newFilteredRatings = ratings
      .filter(({ rating: currentRating }: any) => currentRating === rating);
    setFilteredRatings(newFilteredRatings);
  }

  function handleClearFilter() {
    setFilteredRatings(ratings);
  }

  return (
    <View style={styles.usersReviewsContainer}>
      <Text style={[globalStyles.titleText, styles.ratingTitle]}>Users reviews:</Text>
      <View style={styles.ratingFilterContainer}>
        {ratingTypes.map((ratingNumber) => (
          <TouchableOpacity
            testID={`${ratingNumber}ratingButton`}
            key={`${ratingNumber}star`}
            style={styles.ratingFilterOption}
            onPress={() => handleFilter(ratingNumber)}
          >
            <AirbnbRating
              showRating={false}
              count={5}
              defaultRating={ratingNumber}
              size={20}
              isDisabled
            />
            <Text style={styles.reviewNumberText}>
              {countNumberOfRatings(ratingNumber)}
              {' '}
              reviews
            </Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={styles.ratingFilterOption}
          onPress={handleClearFilter}
          testID="seeAllReviewsButton"
        >
          <Text style={styles.allReviewsText}>
            See all reviews
          </Text>
        </TouchableOpacity>
      </View>
      {filteredRatings.length > 0
        ? filteredRatings.map((rating: any) => (rating.user._id !== userData?._id
          ? <RatingElement key={`ratingNumber-${rating.user._id}`} rating={rating} />
          : <RatingElement key={`ratingNumber-${rating.user._id}`} rating={rating} yours />))
        : <Text testID="noRatings" style={styles.allReviewsText}>0 reviews</Text>}
    </View>
  );
}
