/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AirbnbRating } from 'react-native-ratings';

import EditIcon from '../../assets/editIcon.svg';
import SaveIcon from '../../assets/saveIcon.svg';
import styles from './rating.styles';
import globalStyles from '../../styles/global.styles';
import { saveRating } from '../../redux/actions/books.creator';

export default function Rating({
  ratings, isbn, token, refreshToken
}:any) {
  const dispatch = useDispatch();
  const { userData } = useSelector((store: any) => store.loggedUser);
  const [userRating, setUserRating] = useState(0);
  const [userReview, setUserReview] = useState('');
  const [canEdit, setCanEdit] = useState(false);
  const [canSave, setCanSave] = useState(true);

  useEffect(() => {
    const existingUserRating = ratings.find(({ user }: any) => user === userData?._id);
    if (existingUserRating) {
      setUserRating(existingUserRating.rating);
      setUserReview(existingUserRating.review);
      setCanEdit(false);
    } else {
      setCanEdit(true);
    }
  }, [ratings]);

  function handleEditButton() {
    setCanEdit(true);
  }

  function handleSaveButton() {
    if (userRating > 0) {
      dispatch(saveRating(isbn, {
        user: userData._id,
        rating: userRating,
        review: userReview
      }, token, refreshToken));
    } else {
      setCanSave(false);
    }
  }

  function handleRatingFocus(rating: number) {
    if (!canSave) {
      setCanSave(true);
    }
    setUserRating(rating);
  }

  function handleInputChange(text: string) {
    setUserReview(text);
  }

  return (
    <View>
      <View style={styles.topContainer}>
        <Text style={styles.titleText}>Rate:</Text>
        <AirbnbRating
          showRating={false}
          count={5}
          defaultRating={userRating}
          size={20}
          isDisabled={!canEdit}
          onFinishRating={handleRatingFocus}
        />
        {!canEdit
          ? (
            <TouchableOpacity
              onPress={handleEditButton}
            >
              <EditIcon width={30} height={30} />
            </TouchableOpacity>
          )
          : (
            <TouchableOpacity
              onPress={handleSaveButton}
            >
              <SaveIcon width={30} height={30} />
            </TouchableOpacity>
          )}
      </View>
      <TextInput
        style={styles.ratingInput}
        multiline
        maxLength={200}
        value={userReview}
        editable={canEdit}
        onChangeText={handleInputChange}
      />
      {!canSave && <Text style={globalStyles.invalid}>Minimum 1 star to rate</Text>}
    </View>
  );
}
