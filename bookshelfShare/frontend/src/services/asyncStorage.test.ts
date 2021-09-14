import AsyncStorage from '@react-native-community/async-storage';
import { storeToken, getSavedData, clearStorage } from './asyncStorage';

jest.mock('@react-native-community/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  clear: jest.fn()
}));

describe('Given a storeToken function', () => {
  describe('When it is triggered with refreshToken and userId', () => {
    const refreshToken = 'refreshToken';
    const userId = 'userId';
    test('Then AsyncStorage.setItem should have been called with userData and [refreshToken,userId] stringified', async () => {
      (AsyncStorage.setItem as jest.Mock).mockResolvedValue({});
      await storeToken(refreshToken, userId);

      expect(AsyncStorage.setItem).toHaveBeenCalledWith('userData', JSON.stringify({ refreshToken, userId }));
    });
    describe('And AsyncStorage.setItem is resolved', () => {
      test('Then should return true', async () => {
        (AsyncStorage.setItem as jest.Mock).mockResolvedValue({});
        const result = await storeToken(refreshToken, userId);

        expect(result).toBe(true);
      });
    });
    describe('And AsyncStorage.setItem is resolved', () => {
      test('Then should return and error with a message Async Storage Error', async () => {
        (AsyncStorage.setItem as jest.Mock).mockRejectedValue(new Error('Async Storage Error'));
        const result: any = await storeToken(refreshToken, userId);

        expect(result.message).toBe('Async Storage Error');
      });
    });
  });
});

describe('Given a getSaveData function', () => {
  describe('When it is triggered', () => {
    describe('And AsyncStorage.getItem is resolved', () => {
      describe('And there is userData', () => {
        test('Then should return the userData found parsed', async () => {
          const expectedValue = { refreshToken: 'refreshToken' };
          (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify(expectedValue));
          const result: any = await getSavedData();

          expect(result).toEqual(expectedValue);
        });
      });

      describe('And there is not userData', () => {
        test('Then should return User not logged', async () => {
          (AsyncStorage.getItem as jest.Mock).mockResolvedValue(undefined);
          const result: any = await getSavedData();

          expect(result).toEqual('User not logged');
        });
      });
    });

    describe('And AsyncStorage.getItem is rejected', () => {
      test('Then should return Async Storage Error', async () => {
        (AsyncStorage.getItem as jest.Mock).mockRejectedValue(new Error('Async Storage Error'));
        const result: any = await getSavedData();

        expect(result).toBe('Async Storage Error');
      });
    });
  });
});

describe('Given a clearStorage function', () => {
  describe('When it is triggered', () => {
    describe('And AsyncStorage.clear is resolved', () => {
      test('Then should return true', async () => {
        (AsyncStorage.clear as jest.Mock).mockReturnValue({});
        const result: any = await clearStorage();

        expect(result).toBe(true);
      });
    });
    describe('And AsyncStorage.clear is rejected', () => {
      test('Then should return an error with a message Async Storage Error', async () => {
        (AsyncStorage.clear as jest.Mock).mockRejectedValue(new Error('Async Storage Error'));
        const result: any = await clearStorage();

        expect(result.message).toBe('Async Storage Error');
      });
    });
  });
});
