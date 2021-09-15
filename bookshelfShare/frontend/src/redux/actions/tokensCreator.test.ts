import axios from 'axios';
import refreshUserToken from './tokens.creator';
import tokenActions from './token.actions';

jest.mock('axios');

describe('Given a refreshUserToken function', () => {
  describe('When it is triggered', () => {
    describe('And axios.post is resolved', () => {
      let resolvedData: any;
      let dispatch: any;
      let result: any;
      beforeEach(async () => {
        resolvedData = { token: 'token' };
        dispatch = jest.fn();
        (axios.post as jest.Mock).mockResolvedValue({ data: resolvedData });
        result = await refreshUserToken('refreshToken', dispatch);
      });
      test('Then dispatch should have been called with type REFRESH_TOKEN and the data axios is resolved with', () => {
        expect(dispatch).toHaveBeenCalledWith({
          type: tokenActions.REFRESH_TOKEN,
          data: resolvedData
        });
      });
      test('Then should return the token axios is resolved with', () => {
        expect(result).toBe(resolvedData.token);
      });
    });
    describe('And axios.post is rejected', () => {
      test('Then should return false', async () => {
        (axios.post as jest.Mock).mockRejectedValue(new Error());
        const result = await refreshUserToken('refreshToken', jest.fn());

        expect(result).toBe(false);
      });
    });
  });
});
