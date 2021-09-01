import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  View, Text, TextInput, TouchableOpacity, SafeAreaView
} from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';

import validateEmail from '../../utils/validation.utils';
import loginUser from '../../redux/actions/loggedUser.creator';

import BookIcon from '../../assets/bookIcon.svg';
import globalStyles from '../../styles/global.styles';
import styles from './login.styles';

export default function Login({ navigation } : any) {
  const dispatch = useDispatch();
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  function handleLogin() {
    if (validateEmail(userEmail)) {
      dispatch(loginUser({
        email: userEmail,
        password: userPassword
      }));
    }
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
        <Text style={globalStyles.title}>Login</Text>
        <View style={globalStyles.inputContainer}>
          <Text style={globalStyles.inputLabel}>email</Text>
          <TextInput
            style={globalStyles.input}
            value={userEmail}
            onChangeText={(text) => setUserEmail(text)}
          />
        </View>
        <View style={globalStyles.inputContainer}>
          <Text style={globalStyles.inputLabel}>password</Text>
          <TextInput
            secureTextEntry
            style={globalStyles.input}
            value={userPassword}
            onChangeText={(text) => setUserPassword(text)}
          />
        </View>
        <TouchableOpacity
          style={[globalStyles.button, styles.loginButton]}
          onPress={handleLogin}
        >
          <Text style={globalStyles.buttonText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.signUpTextContainer}>
          <Text style={styles.signUpText}>Don&quot;t have an account?</Text>
          <Text
            style={styles.signUpButton}
            onPress={() => navigation.push('Register')}
          >
            Signup
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
