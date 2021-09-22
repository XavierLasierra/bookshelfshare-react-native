import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, SafeAreaView
} from 'react-native';
import {
  SharedElement
} from 'react-navigation-shared-element';
import { useDispatch } from 'react-redux';
import { IRegisterProps } from '../../types/interfaces';

import { validateEmail, validatePassword } from '../../utils/validation.utils';
import { registerUser } from '../../redux/actions/loggedUser.creator';

import BookIcon from '../../assets/bookIcon.svg';
import ArrowIcon from '../../assets/arrowIcon.svg';
import globalStyles from '../../styles/global.styles';
import styles from './register.styles';

export default function Register({ navigation: { pop } }: IRegisterProps) {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [isValidUsername, setValidUsername] = useState(true);
  const [email, setEmail] = useState('');
  const [isValidEmail, setValidEmail] = useState(true);
  const [password, setPassword] = useState('');
  const [isValidPassword, setValidPassword] = useState(true);
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [isValidPasswordRepeat, setValidPasswordRepeat] = useState(true);

  function handleLoginNavigation() {
    pop();
  }

  function handleUsernameChange(text: string) {
    setUsername(text);
  }

  function handleUsernameFocus() {
    if (!isValidUsername) {
      setValidUsername(true);
    }
  }

  function handleEmailChange(text: string) {
    setEmail(text);
  }

  function handleEmailFocus() {
    if (!isValidEmail) {
      setValidEmail(true);
    }
  }

  function handlePasswordChange(text: string) {
    setPassword(text);
  }

  function handlePasswordFocus() {
    if (!isValidPassword) {
      setValidPassword(true);
    }
  }

  function handlePasswordRepeatChange(text: string) {
    setPasswordRepeat(text);
  }

  function handlePasswordRepeatFocus() {
    if (!isValidPasswordRepeat) {
      setValidPasswordRepeat(true);
    }
  }

  function handleRegister() {
    if (!username) {
      return setValidUsername(false);
    }
    if (!validateEmail(email)) {
      return setValidEmail(false);
    }
    if (!validatePassword(password)) {
      return setValidPassword(false);
    }
    if (passwordRepeat !== password) {
      return setValidPasswordRepeat(false);
    }
    dispatch(registerUser({ username, email, password }));
    return pop();
  }

  return (
    <SafeAreaView style={globalStyles.authenticationContainer}>
      <TouchableOpacity
        style={globalStyles.backButton}
        onPress={handleLoginNavigation}
        testID="loginPageButton"
      >
        <ArrowIcon width={30} height={30} style={globalStyles.backButtonIcon} />
      </TouchableOpacity>
      <View style={styles.topContainer}>
        <SharedElement id="mainIcon">
          <BookIcon
            width={50}
            height={50}
          />
        </SharedElement>
      </View>
      <View style={styles.registerContainer}>
        <Text style={globalStyles.title}>Sign up</Text>
        <View style={globalStyles.inputContainer}>
          <Text style={globalStyles.inputLabel}>username</Text>
          <TextInput
            style={globalStyles.input}
            value={username}
            onChangeText={handleUsernameChange}
            onFocus={handleUsernameFocus}
            testID="usernameInput"
            maxLength={25}
          />
          {!isValidUsername && <Text testID="invalidUsername" style={globalStyles.invalid}>Type your username</Text>}
        </View>
        <View style={globalStyles.inputContainer}>
          <Text style={globalStyles.inputLabel}>email</Text>
          <TextInput
            style={globalStyles.input}
            value={email}
            onChangeText={handleEmailChange}
            onFocus={handleEmailFocus}
            testID="emailInput"
            maxLength={25}
          />
          {!isValidEmail && <Text testID="invalidEmail" style={globalStyles.invalid}>Invalid email</Text>}
        </View>
        <View style={globalStyles.inputContainer}>
          <Text style={globalStyles.inputLabel}>password</Text>
          <TextInput
            secureTextEntry
            style={globalStyles.input}
            value={password}
            onChangeText={handlePasswordChange}
            onFocus={handlePasswordFocus}
            testID="passwordInput"
            maxLength={25}
          />
          {!isValidPassword && (
          <Text testID="invalidPassword" style={[globalStyles.invalid, styles.invalidPasswordText]}>
            Minimum: 8 characters, 1 uppercase,
            1 lowercase and 1 number
          </Text>
          )}
        </View>
        <View style={globalStyles.inputContainer}>
          <Text style={globalStyles.inputLabel}>repeat password</Text>
          <TextInput
            secureTextEntry
            style={globalStyles.input}
            value={passwordRepeat}
            onChangeText={handlePasswordRepeatChange}
            onFocus={handlePasswordRepeatFocus}
            testID="passwordRepeatInput"
            maxLength={25}
          />
          {!isValidPasswordRepeat
          && <Text testID="invalidPasswordRepeat" style={globalStyles.invalid}>Passwords don&quot;t match</Text>}
        </View>
        <TouchableOpacity
          style={[globalStyles.button, styles.registerButton]}
          onPress={handleRegister}
          testID="registerButton"
        >
          <Text style={globalStyles.buttonText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
