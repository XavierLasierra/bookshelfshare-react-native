/* eslint-disable no-underscore-dangle */
import React from 'react';
import { View, Text } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import globalStyles from '../../styles/global.styles';

import styles from './ratingElement.styles';

export default function RatingElement({ rating, yours }: any) {
  return (
    <View style={styles.ratingContainer} key={`userRating-${rating.user._id}`}>
      <View style={styles.nameRatingContainer}>
        <Text style={globalStyles.titleText}>
          {rating.user.username}
          {' '}
          {yours && '(you)'}
        </Text>
        <AirbnbRating
          showRating={false}
          count={5}
          defaultRating={rating.rating}
          size={15}
          isDisabled
        />
      </View>
      <View style={styles.reviewContainer}>
        <Text style={styles.rating}>{rating.review}</Text>
      </View>
    </View>
  );
}
