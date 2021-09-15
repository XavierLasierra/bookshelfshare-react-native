import axios from 'axios';
import notificationsActions from './notifications.actions';
import { loadUserShelves, createShelf } from './userShelves.creator';
import refreshUserToken from './tokens.creator';
import userShelvesActions from './userShelves.actions';

jest.mock('axios');
jest.mock('./tokens.creator');

describe('Given a loadUserShelves function', () => {
  describe('When it is triggered', () => {
    describe('And axios.get is resolved', () => {
      test('Then dispatch should have been called with type LOAD_CURRENT_SHELF and the data axios is resolved with', async () => {
        const dispatch = jest.fn();
        (axios.get as jest.Mock).mockResolvedValue({ data: {} });
        await loadUserShelves('1', 'token', 'refreshToken')(dispatch);

        expect(dispatch).toHaveBeenCalledWith({
          type: userShelvesActions.LOAD_USER_SHELVES,
          data: {}
        });
      });
    });
    describe('And axios.get is rejected', () => {
      describe('And the error status is 401', () => {
        let dispatch: any;
        beforeEach(() => {
          dispatch = jest.fn();
          (axios.get as jest.Mock).mockRejectedValue({ response: { status: 401 } });
        });
        describe('And refreshUserToken is resolved', () => {
          describe('And newToken is false', () => {
            test('Then dispatch should have been called with type SERVER_ERROR', async () => {
              (refreshUserToken as jest.Mock).mockResolvedValue(false);

              await loadUserShelves('1', 'token', 'refreshToken')(dispatch);

              expect(dispatch).toHaveBeenCalledWith({
                type: notificationsActions.SERVER_ERROR
              });
            });
          });

          describe('And there is a newToken', () => {
            test('Then dispatch should have been called with loadUserShelves', async () => {
              (refreshUserToken as jest.Mock).mockResolvedValue('newToken');

              await loadUserShelves('1', 'token', 'refreshToken')(dispatch);

              expect(dispatch).toHaveBeenCalled();
            });
          });
        });
        describe('And refreshUserToken is rejected', () => {
          test('Then dispatch should have been called with type SERVER_ERROR', async () => {
            (refreshUserToken as jest.Mock).mockRejectedValue(new Error());

            await loadUserShelves('1', 'token', 'refreshToken')(dispatch);

            expect(dispatch).toHaveBeenCalledWith({
              type: notificationsActions.SERVER_ERROR
            });
          });
        });
      });
      describe('And the error status is 500', () => {
        test('Then dispatch should have been called with type LOAD_USER_SHELVES_ERROR', async () => {
          const dispatch = jest.fn();
          (axios.get as jest.Mock).mockRejectedValue({ response: { status: 500 } });
          await loadUserShelves('1', 'token', 'refreshToken')(dispatch);

          expect(dispatch).toHaveBeenCalledWith({
            type: notificationsActions.LOAD_USER_SHELVES_ERROR
          });
        });
      });
      describe('And the error status is not 401 or 500', () => {
        test('Then dispatch should have been called with type SERVER_ERROR', async () => {
          const dispatch = jest.fn();
          (axios.get as jest.Mock).mockRejectedValue({ response: {} });
          await loadUserShelves('1', 'token', 'refreshToken')(dispatch);

          expect(dispatch).toHaveBeenCalledWith({ type: notificationsActions.SERVER_ERROR });
        });
      });
    });
  });
});

describe('Given a createShelf function', () => {
  describe('When it is triggered', () => {
    describe('And axios.post is resolved', () => {
      test('Then dispatch should have been called with type LOAD_CURRENT_SHELF and the data axios is resolved with', async () => {
        const dispatch = jest.fn();
        (axios.post as jest.Mock).mockResolvedValue({ data: {} });
        await createShelf({}, 'token', 'refreshToken')(dispatch);

        expect(dispatch).toHaveBeenCalledWith({
          type: userShelvesActions.ADD_NEW_SHELF,
          data: {}
        });
      });
    });
    describe('And axios.post is rejected', () => {
      describe('And the error status is 401', () => {
        let dispatch: any;
        beforeEach(() => {
          dispatch = jest.fn();
          (axios.post as jest.Mock).mockRejectedValue({ response: { status: 401 } });
        });
        describe('And refreshUserToken is resolved', () => {
          describe('And newToken is false', () => {
            test('Then dispatch should have been called with type SERVER_ERROR', async () => {
              (refreshUserToken as jest.Mock).mockResolvedValue(false);

              await createShelf({}, 'token', 'refreshToken')(dispatch);

              expect(dispatch).toHaveBeenCalledWith({
                type: notificationsActions.SERVER_ERROR
              });
            });
          });

          describe('And there is a newToken', () => {
            test('Then dispatch should have been called with createShelf', async () => {
              (refreshUserToken as jest.Mock).mockResolvedValue('newToken');

              await createShelf({}, 'token', 'refreshToken')(dispatch);

              expect(dispatch).toHaveBeenCalled();
            });
          });
        });
        describe('And refreshUserToken is rejected', () => {
          test('Then dispatch should have been called with type SERVER_ERROR', async () => {
            (refreshUserToken as jest.Mock).mockRejectedValue(new Error());

            await createShelf({}, 'token', 'refreshToken')(dispatch);

            expect(dispatch).toHaveBeenCalledWith({
              type: notificationsActions.SERVER_ERROR
            });
          });
        });
      });
      describe('And the error status is 500', () => {
        test('Then dispatch should have been called with type CREATE_SHELF_ERROR', async () => {
          const dispatch = jest.fn();
          (axios.post as jest.Mock).mockRejectedValue({ response: { status: 500 } });
          await createShelf({}, 'token', 'refreshToken')(dispatch);

          expect(dispatch).toHaveBeenCalledWith({
            type: notificationsActions.CREATE_SHELF_ERROR
          });
        });
      });
      describe('And the error status is not 401 or 500', () => {
        test('Then dispatch should have been called with type SERVER_ERROR', async () => {
          const dispatch = jest.fn();
          (axios.post as jest.Mock).mockRejectedValue({ response: {} });
          await createShelf({}, 'token', 'refreshToken')(dispatch);

          expect(dispatch).toHaveBeenCalledWith({ type: notificationsActions.SERVER_ERROR });
        });
      });
    });
  });
});
