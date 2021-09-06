/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { useSelector } from 'react-redux';
import { AirbnbRating } from 'react-native-ratings';

import styles from './rating.styles';

export default function Rating({ ratings }:any) {
  const { userData } = useSelector((store: any) => store.loggedUser);
  const [userRating, setUserRating] = useState(0);
  const [userReview, setUserReview] = useState('');
  const [canEdit, setCanEdit] = useState(false);

  useEffect(() => {
    const existingUserRating = ratings.find(({ user }: any) => user === userData?._id);
    if (existingUserRating) {
      setUserRating(existingUserRating.rating);
      setUserReview(existingUserRating.review);
    } else {
      setCanEdit(true);
    }
  }, [ratings]);

  return (
    <View>
      <View>
        <Text style={styles.titleText}>Rate:</Text>
        <AirbnbRating
          showRating={false}
          count={5}
          defaultRating={userRating}
          size={20}
          isDisabled={!canEdit}
        />
      </View>
      <TextInput
        style={styles.ratingInput}
        multiline
        maxLength={200}
        value={userReview}
        editable={!canEdit}
      />
    </View>
  );
}
