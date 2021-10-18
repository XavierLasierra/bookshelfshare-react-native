import axios from 'axios';
import notificationsActions from './notifications.actions';
import usersListActions from './usersList.actions';
import {getUsers} from './usersList.creator';
import refreshUserToken from './tokens.creator';

jest.mock('axios');
jest.mock('./tokens.creator');

describe('Given a getUsers function', () => {
  describe('When it is triggered', () => {
    describe('And axios.get is resolved', () => {
      test('Then dispatch should have been called with type LOAD_USERS_LIST and the data axios is resolved with', async () => {
        const dispatch = jest.fn();
        (axios.get as jest.Mock).mockResolvedValue({data: {}});
        await getUsers('a', 'token', 'refreshToken')(dispatch);

        expect(dispatch).toHaveBeenCalledWith({
          type: usersListActions.LOAD_USERS_LIST,
          data: {},
        });
      });
    });
    describe('And axios.get is rejected', () => {
      describe('And the error status is 401', () => {
        let dispatch: any;
        beforeEach(() => {
          dispatch = jest.fn();
          (axios.get as jest.Mock).mockRejectedValue({response: {status: 401}});
        });
        describe('And refreshUserToken is resolved', () => {
          describe('And newToken is false', () => {
            test('Then dispatch should have been called with type SERVER_ERROR', async () => {
              (refreshUserToken as jest.Mock).mockResolvedValue(false);

              await getUsers('a', 'token', 'refreshToken')(dispatch);

              expect(dispatch).toHaveBeenCalledWith({
                type: notificationsActions.SERVER_ERROR,
              });
            });
          });

          describe('And there is a newToken', () => {
            test('Then dispatch should have been called with getUsers', async () => {
              (refreshUserToken as jest.Mock).mockResolvedValue('newToken');

              await getUsers('a', 'token', 'refreshToken')(dispatch);

              expect(dispatch).toHaveBeenCalled();
            });
          });
        });
        describe('And refreshUserToken is rejected', () => {
          test('Then dispatch should have been called with type SERVER_ERROR', async () => {
            (refreshUserToken as jest.Mock).mockRejectedValue(new Error());

            await getUsers('a', 'token', 'refreshToken')(dispatch);

            expect(dispatch).toHaveBeenCalledWith({
              type: notificationsActions.SERVER_ERROR,
            });
          });
        });
      });
      describe('And the error status is 500', () => {
        test('Then dispatch should have been called with type LOAD_USER_LIST_ERROR', async () => {
          const dispatch = jest.fn();
          (axios.get as jest.Mock).mockRejectedValue({response: {status: 500}});
          await getUsers('a', 'token', 'refreshToken')(dispatch);

          expect(dispatch).toHaveBeenCalledWith({
            type: notificationsActions.LOAD_USER_LIST_ERROR,
          });
        });
      });
      describe('And the error status is not 401 or 500', () => {
        test('Then dispatch should have been called with type SERVER_ERROR', async () => {
          const dispatch = jest.fn();
          (axios.get as jest.Mock).mockRejectedValue({response: {}});
          await getUsers('a', 'token', 'refreshToken')(dispatch);

          expect(dispatch).toHaveBeenCalledWith({
            type: notificationsActions.SERVER_ERROR,
          });
        });
      });
    });
  });
});
