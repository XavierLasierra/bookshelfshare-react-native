import AsyncStorage from '@react-native-community/async-storage';

export async function storeToken(refreshToken: string, userId: string) {
  try {
    await AsyncStorage.setItem('userData', JSON.stringify({ refreshToken, userId }));
    return true;
  } catch (error) {
    return error;
  }
}

export async function getSavedData() {
  try {
    const userData: any = await AsyncStorage.getItem('userData');
    if (!userData) throw new Error('User not logged');

    return JSON.parse(userData);
  } catch (error) {
    return '';
  }
}

export async function clearStorage() {
  try {
    await AsyncStorage.clear();
    return true;
  } catch (error) {
    return error;
  }
}
