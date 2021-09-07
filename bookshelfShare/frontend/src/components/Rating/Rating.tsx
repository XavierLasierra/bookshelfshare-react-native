/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ActivityIndicator
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AirbnbRating } from 'react-native-ratings';

import RatingElement from '../RatingElement/RatingElement';

import EditIcon from '../../assets/editIcon.svg';
import SaveIcon from '../../assets/saveIcon.svg';
import styles from './rating.styles';
import globalStyles from '../../styles/global.styles';
import { saveRating } from '../../redux/actions/books.creator';
import stylesConstants from '../../styles/styles.constants';

export default function Rating({
  ratings, isbn, token, refreshToken
}:any) {
  const dispatch = useDispatch();
  const { userData } = useSelector((store: any) => store.loggedUser);
  const [userRating, setUserRating] = useState(0);
  const [userReview, setUserReview] = useState('');
  const [canEdit, setCanEdit] = useState(false);
  const [canSave, setCanSave] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [filteredRatings, setFilteredRatings] = useState(ratings);
  const ratingTypes = [5, 4, 3, 2, 1];

  useEffect(() => {
    const existingUserRating = ratings.find(({ user }: any) => user?._id === userData?._id);
    if (existingUserRating) {
      setUserRating(existingUserRating.rating);
      setUserReview(existingUserRating.review);
      setCanEdit(false);
    } else {
      setCanEdit(true);
    }

    if (isSaving) {
      setIsSaving(false);
    }

    setFilteredRatings(ratings);
  }, [ratings]);

  function handleEditButton() {
    setCanEdit(true);
  }

  function handleSaveButton() {
    if (isSaving) return;
    if (userRating > 0) {
      setIsSaving(true);
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
    <View>
      <View>
        <View style={styles.topContainer}>
          <Text style={globalStyles.titleText}>Rate:</Text>
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
                {isSaving
                  ? <ActivityIndicator style={styles.activityIndicator} size="small" color={stylesConstants.colors.mainText} />
                  : <SaveIcon width={30} height={30} />}

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
      <View style={styles.usersReviewsContainer}>
        <Text style={[globalStyles.titleText, styles.ratingTitle]}>Users reviews:</Text>
        <View style={styles.ratingFilterContainer}>
          {ratingTypes.map((ratingNumber) => (
            <TouchableOpacity
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
          >
            <Text style={styles.allReviewsText}>
              See all reviews
            </Text>
          </TouchableOpacity>
        </View>
        {filteredRatings.length > 0
          ? filteredRatings.map((rating: any) => (rating.user._id !== userData._id
            ? <RatingElement rating={rating} />
            : <RatingElement rating={rating} yours />))
          : <Text style={styles.allReviewsText}>0 reviews</Text>}
      </View>
    </View>
  );
}
