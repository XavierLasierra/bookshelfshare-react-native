import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  View, Text, TextInput, TouchableOpacity, SafeAreaView
} from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';

import { validateEmail } from '../../utils/validation.utils';
import { loginUser } from '../../redux/actions/loggedUser.creator';

import BookIcon from '../../assets/bookIcon.svg';
import globalStyles from '../../styles/global.styles';
import styles from './login.styles';

export default function Login({ navigation: { push } } : any) {
  const dispatch = useDispatch();
  const [userEmail, setUserEmail] = useState('');
  const [isValidEmail, setValidEmail] = useState(true);
  const [userPassword, setUserPassword] = useState('');
  const [isValidPassword, setValidPassword] = useState(true);

  function handleEmailChange(text: string) {
    setUserEmail(text);
  }

  function handleEmailFocus() {
    if (!isValidEmail) {
      setValidEmail(true);
    }
  }

  function handlePasswordChange(text: string) {
    setUserPassword(text);
  }

  function handlePasswordFocus() {
    if (!isValidPassword) {
      setValidPassword(true);
    }
  }

  function handleLogin() {
    if (validateEmail(userEmail)) {
      if (userPassword) {
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
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.topContainer}>
        <SharedElement id="mainIcon">
          <BookIcon
            width={50}
            height={50}
          />
        </SharedElement>
      </View>
      <View style={styles.loginContainer}>
        <Text style={globalStyles.title}>Log in</Text>
        <View style={globalStyles.inputContainer}>
          <Text style={globalStyles.inputLabel}>email</Text>
          <TextInput
            style={globalStyles.input}
            value={userEmail}
            onFocus={handleEmailFocus}
            onChangeText={handleEmailChange}
          />
          {!isValidEmail && <Text style={globalStyles.invalid}>Invalid email</Text>}
        </View>
        <View style={globalStyles.inputContainer}>
          <Text style={globalStyles.inputLabel}>password</Text>
          <TextInput
            secureTextEntry
            style={globalStyles.input}
            value={userPassword}
            onFocus={handlePasswordFocus}
            onChangeText={handlePasswordChange}
          />
          {!isValidPassword && <Text style={globalStyles.invalid}>Type your password</Text>}
        </View>
        <TouchableOpacity
          style={[globalStyles.button, styles.loginButton]}
          onPress={handleLogin}
        >
          <Text style={globalStyles.buttonText}>Log in</Text>
        </TouchableOpacity>
        <View style={styles.signUpTextContainer}>
          <Text style={styles.signUpText}>Don&quot;t have an account?</Text>
          <Text
            style={styles.signUpButton}
            onPress={handleRegisterNavigation}
          >
            Sign up
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
