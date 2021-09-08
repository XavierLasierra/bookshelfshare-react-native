/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ActivityIndicator
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AirbnbRating } from 'react-native-ratings';

import EditIcon from '../../assets/editIcon.svg';
import SaveIcon from '../../assets/saveIcon.svg';
import styles from './rating.styles';
import globalStyles from '../../styles/global.styles';
import { saveRating } from '../../redux/actions/books.creator';
import stylesConstants from '../../styles/styles.constants';
import UsersRatings from '../UsersRatings/UsersRatings';

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
  }, [ratings]);

  function handleEditButton() {
    setCanEdit(true);
  }

  function handleSaveButton() {
    if (userRating > 0) {
      setIsSaving(true);
      return dispatch(saveRating(isbn, {
        user: userData._id,
        rating: userRating,
        review: userReview
      }, token, refreshToken));
    }
    return setCanSave(false);
  }

  function handleRatingFocus(rating: number) {
    setUserRating(rating);
    return !canSave && setCanSave(true);
  }

  function handleInputChange(text: string) {
    setUserReview(text);
  }

  const saveButton = isSaving
    ? (
      <TouchableOpacity disabled>
        <ActivityIndicator testID="savingIndicator" style={styles.activityIndicator} size="small" color={stylesConstants.colors.mainText} />
      </TouchableOpacity>
    )
    : (
      <TouchableOpacity onPress={handleSaveButton} testID="saveButton">
        <SaveIcon width={30} height={30} />
      </TouchableOpacity>
    );

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
                testID="editButton"
              >
                <EditIcon width={30} height={30} />
              </TouchableOpacity>
            )
            : saveButton}
        </View>
        <TextInput
          style={styles.ratingInput}
          multiline
          maxLength={200}
          value={userReview}
          editable={canEdit}
          onChangeText={handleInputChange}
          testID="ratingInput"
        />
        {!canSave && <Text style={globalStyles.invalid} testID="canNotSave">Minimum 1 star to rate</Text>}
      </View>
      <UsersRatings ratings={ratings} userData={userData} />
    </View>
  );
}
