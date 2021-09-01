import React from 'react';
import {
  View, Text, TextInput, TouchableOpacity, SafeAreaView
} from 'react-native';
import {
  SharedElement
} from 'react-navigation-shared-element';

import BookIcon from '../../assets/bookIcon.svg';
import ArrowIcon from '../../assets/arrowIcon.svg';

import globalStyles from '../../styles/global.styles';
import styles from './register.styles';

export default function Register({ navigation: { pop } }:any) {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => pop()}
      >
        <ArrowIcon width={30} height={30} style={styles.backButtonIcon} />
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
        <Text style={globalStyles.title}>Signup</Text>
        <View style={globalStyles.inputContainer}>
          <Text style={globalStyles.inputLabel}>username</Text>
          <TextInput style={globalStyles.input} />
        </View>
        <View style={globalStyles.inputContainer}>
          <Text style={globalStyles.inputLabel}>email</Text>
          <TextInput style={globalStyles.input} />
        </View>
        <View style={globalStyles.inputContainer}>
          <Text style={globalStyles.inputLabel}>password</Text>
          <TextInput secureTextEntry style={globalStyles.input} />
        </View>
        <View style={globalStyles.inputContainer}>
          <Text style={globalStyles.inputLabel}>repeat password</Text>
          <TextInput secureTextEntry style={globalStyles.input} />
        </View>
        <TouchableOpacity style={[globalStyles.button, styles.registerButton]}>
          <Text style={globalStyles.buttonText}>Signup</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
