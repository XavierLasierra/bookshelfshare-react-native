import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  View, Text, TextInput, TouchableOpacity, SafeAreaView, ActivityIndicator
} from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';

import { validateEmail } from '../../utils/validation.utils';
import { loginUser } from '../../redux/actions/loggedUser.creator';

import BookIcon from '../../assets/bookIcon.svg';
import globalStyles from '../../styles/global.styles';
import styles from './login.styles';
import stylesConstants from '../../styles/styles.constants';

export default function Login({ navigation: { push } } : any) {
  const dispatch = useDispatch();
  const notification = useSelector((store: any) => store.notifications);
  const [userEmail, setUserEmail] = useState('');
  const [isValidEmail, setValidEmail] = useState(true);
  const [userPassword, setUserPassword] = useState('');
  const [isValidPassword, setValidPassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, [notification]);

  function handleEmailChange(text: string) {
    setUserEmail(text);
  }

  function handleEmailFocus() {
    return !isValidEmail && setValidEmail(true);
  }

  function handlePasswordChange(text: string) {
    setUserPassword(text);
  }

  function handlePasswordFocus() {
    return !isValidPassword && setValidPassword(true);
  }

  function handleLogin() {
    if (validateEmail(userEmail)) {
      if (userPassword) {
        setIsLoading(true);
        dispatch(loginUser({
          email: userEmail,
          password: userPassword
        }));
      } else {
        setValidPassword(false);
      }
    } else {
      setValidEmail(false);
    }
  }

  function handleRegisterNavigation() {
    push('Register');
  }

  return (
    <SafeAreaView style={globalStyles.authenticationContainer}>
      <View style={styles.topContainer}>
        <SharedElement id="mainIcon">
          <BookIcon
            width={50}
            height={50}
          />
        </SharedElement>
      </View>
      <View style={styles.loginContainer}>
        <Text testID="loginTitle" style={globalStyles.title}>Log in</Text>
        <View style={globalStyles.inputContainer}>
          <Text style={globalStyles.inputLabel}>email</Text>
          <TextInput
            testID="emailInput"
            style={globalStyles.input}
            value={userEmail}
            onFocus={handleEmailFocus}
            onChangeText={handleEmailChange}
          />
          {!isValidEmail && <Text testID="invalidEmail" style={globalStyles.invalid}>Invalid email</Text>}
        </View>
        <View style={globalStyles.inputContainer}>
          <Text style={globalStyles.inputLabel}>password</Text>
          <TextInput
            testID="passwordInput"
            secureTextEntry
            style={globalStyles.input}
            value={userPassword}
            onFocus={handlePasswordFocus}
            onChangeText={handlePasswordChange}
          />
          {!isValidPassword && <Text testID="invalidPassword" style={globalStyles.invalid}>Type your password</Text>}
        </View>
        {!isLoading
          ? (
            <TouchableOpacity
              style={[globalStyles.button, styles.loginButton]}
              onPress={handleLogin}
              testID="loginButton"
            >
              <Text style={globalStyles.buttonText}>Log in</Text>
            </TouchableOpacity>
          )
          : (
            <TouchableOpacity
              style={[globalStyles.button, styles.loginButton]}
              testID="loginButton"
              disabled
            >
              <ActivityIndicator testID="loadingIndicator" size="large" color={stylesConstants.colors.white} />
            </TouchableOpacity>
          )}

        <View style={styles.signUpTextContainer}>
          <Text style={styles.signUpText}>Don&quot;t have an account?</Text>
          <Text
            style={styles.signUpButton}
            onPress={handleRegisterNavigation}
            testID="signUpButton"
          >
            Sign up
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
