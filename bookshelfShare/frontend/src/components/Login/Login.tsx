import React from 'react';
import {
  View, Text, TextInput, TouchableOpacity, SafeAreaView
} from 'react-native';
import {
  SharedElement
} from 'react-navigation-shared-element';

import BookIcon from '../../assets/bookIcon.svg';

import globalStyles from '../../styles/global.styles';
import styles from './login.styles';

export default function Login({ navigation } : any) {
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
          <TextInput style={globalStyles.input} />
        </View>
        <View style={globalStyles.inputContainer}>
          <Text style={globalStyles.inputLabel}>password</Text>
          <TextInput secureTextEntry style={globalStyles.input} />
        </View>
        <TouchableOpacity style={[globalStyles.button, styles.loginButton]}>
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
