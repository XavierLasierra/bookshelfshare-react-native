import AsyncStorage from '@react-native-community/async-storage';

export async function storeToken(refreshToken: string, userId: string) {
  try {
    await AsyncStorage.clear();
    await AsyncStorage.setItem('userData', JSON.stringify({ refreshToken, userId }));
  } catch (error) {
    // TODO could not save userData
  }
}

export async function getSavedData() {
  try {
    const userData: any = await AsyncStorage.getItem('userData');

    if (!userData) throw new Error('User not logged');

    const data = JSON.parse(userData);
    return data;
  } catch (error) {
    return '';
  }
}
