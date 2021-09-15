import axios from 'axios';
import notificationsActions from './notifications.actions';
import {
  loginUser, registerUser, automaticLogin, logoutUser,
  updateUserBooks, addUserFollowing, deleteUserFollowing
} from './loggedUser.creator';
import refreshUserToken from './tokens.creator';
import loggedUserActions from './loggedUser.actions';
import { loadUserShelves } from './userShelves.creator';
import { storeToken, getSavedData, clearStorage } from '../../services/asyncStorage';
import tokenActions from './token.actions';
import userBooksActions from './userBooks.actions';

jest.mock('axios');
jest.mock('../../services/asyncStorage', () => ({
  storeToken: jest.fn(),
  getSavedData: jest.fn(),
  clearStorage: jest.fn()
}));
jest.mock('./userShelves.creator', () => ({
  loadUserShelves: jest.fn()
}));
jest.mock('./tokens.creator');

describe('Given a loginUser function', () => {
  describe('When it is triggered', () => {
    describe('And axios.post is resolved', () => {
      let dispatch: any;
      beforeEach(async () => {
        dispatch = jest.fn();
        (axios.post as jest.Mock).mockResolvedValue({ data: { user: { _id: '1' }, token: 'token', refreshToken: 'refreshToken' } });
        await loginUser({ email: 'email', password: 'password' })(dispatch);
      });
      test('Then dispatch should have been called with type LOG_USER and the data axios is resolved with', async () => {
        expect(dispatch.mock.calls[0][0]).toEqual({
          type: loggedUserActions.LOG_USER,
          data: { user: { _id: '1' }, token: 'token', refreshToken: 'refreshToken' }
        });
      });
      test('Then loadUserShelves should have been called', async () => {
        expect(loadUserShelves).toHaveBeenCalled();
      });
      test('Then storeToken should have been called', async () => {
        expect(storeToken).toHaveBeenCalled();
      });
    });
    describe('And axios.post is rejected', () => {
      describe('And the error status is 401', () => {
        test('Then dispatch should have been called with type LOGIN_ERROR', async () => {
          const dispatch = jest.fn();
          (axios.post as jest.Mock).mockRejectedValue({ response: { status: 401 } });
          await loginUser({ email: 'email', password: 'password' })(dispatch);

          expect(dispatch).toHaveBeenCalledWith({
            type: notificationsActions.LOGIN_ERROR
          });
        });
      });
      describe('And the error status is not 401', () => {
        test('Then dispatch should have been called with type SERVER_ERROR', async () => {
          const dispatch = jest.fn();
          (axios.post as jest.Mock).mockRejectedValue({ response: {} });
          await loginUser({ email: 'email', password: 'password' })(dispatch);

          expect(dispatch).toHaveBeenCalledWith({ type: notificationsActions.SERVER_ERROR });
        });
      });
    });
  });
});

describe('Given a registerUser function', () => {
  describe('When it is triggered', () => {
    describe('And axios.post is resolved', () => {
      test('Then dispatch should have been called with type REGISTER_USER and the data axios is resolved with', async () => {
        const dispatch = jest.fn();
        (axios.post as jest.Mock).mockResolvedValue({ data: true });
        await registerUser({ username: 'username', email: 'email', password: 'password' })(dispatch);

        expect(dispatch).toHaveBeenCalledWith({
          type: notificationsActions.REGISTER_USER
        });
      });
    });
    describe('And axios.post is rejected', () => {
      describe('And the error status is 401', () => {
        test('Then dispatch should have been called with type REGISTER_ERROR', async () => {
          const dispatch = jest.fn();
          (axios.post as jest.Mock).mockRejectedValue({ response: { status: 401 } });
          await registerUser({ username: 'username', email: 'email', password: 'password' })(dispatch);

          expect(dispatch).toHaveBeenCalledWith({
            type: notificationsActions.REGISTER_ERROR
          });
        });
      });
      describe('And the error status is not 401', () => {
        test('Then dispatch should have been called with type SERVER_ERROR', async () => {
          const dispatch = jest.fn();
          (axios.post as jest.Mock).mockRejectedValue({ response: {} });
          await registerUser({ username: 'username', email: 'email', password: 'password' })(dispatch);

          expect(dispatch).toHaveBeenCalledWith({ type: notificationsActions.SERVER_ERROR });
        });
      });
    });
  });
});

describe('Given an automaticLogin function', () => {
  describe('When it is triggered', () => {
    describe('And getSavedData resolves', () => {
      describe('And there is userData', () => {
        beforeEach(() => {
          (getSavedData as jest.Mock).mockResolvedValue({ refreshToken: 'savedToken' });
        });
        describe('And refreshUserToken resolves', () => {
          describe('And there is newToken', () => {
            beforeEach(() => {
              (refreshUserToken as jest.Mock).mockResolvedValue('refreshToken');
              (axios.get as jest.Mock).mockResolvedValue({ data: {} });
            });
            test('Then dispatch should have been called with type SAVE_REFRESH_TOKEN and refreshToken from getSavedData', async () => {
              const dispatch = jest.fn();
              await automaticLogin()(dispatch);

              expect(dispatch.mock.calls[0][0]).toEqual({
                type: tokenActions.SAVE_REFRESH_TOKEN,
                data: 'savedToken'
              });
            });

            describe('And axios.get resolves', () => {
              let dispatch: any;
              beforeEach(async () => {
                dispatch = jest.fn();
                await automaticLogin()(dispatch);
              });
              test('Then dispatch should have been called with type LOAD_CURRENT_USER and data axios is resolved with', async () => {
                expect(dispatch).toHaveBeenCalledWith({
                  type: loggedUserActions.LOAD_CURRENT_USER,
                  data: { user: {} }
                });
              });
              test('Then loadUserShelves should have been called', () => {
                expect(loadUserShelves).toHaveBeenCalled();
              });
            });
            describe('And axios.get rejects', () => {
              test('Then dispatch should have been called with type USER_NOT_LOGGED', async () => {
                const dispatch = jest.fn();
                (axios.get as jest.Mock).mockRejectedValue(new Error());
                await automaticLogin()(dispatch);

                expect(dispatch).toHaveBeenCalledWith({
                  type: loggedUserActions.USER_NOT_LOGGED
                });
              });
            });
          });
          describe('And newToken is undefined', () => {
            test('Then dispatch should have been called with type USER_NOT_LOGGED', async () => {
              (refreshUserToken as jest.Mock).mockResolvedValue(undefined);
              const dispatch = jest.fn();
              await automaticLogin()(dispatch);

              expect(dispatch).toHaveBeenCalledWith({
                type: loggedUserActions.USER_NOT_LOGGED
              });
            });
          });
        });
        describe('And refreshUserToken rejects', () => {
          test('Then dispatch should have been called with type USER_NOT_LOGGED', async () => {
            (refreshUserToken as jest.Mock).mockRejectedValue(new Error());

            const dispatch = jest.fn();
            await automaticLogin()(dispatch);

            expect(dispatch).toHaveBeenCalledWith({
              type: loggedUserActions.USER_NOT_LOGGED
            });
          });
        });
      });
      describe('And userData is undefined', () => {
        test('Then dispatch should have been called with type USER_NOT_LOGGED', async () => {
          (getSavedData as jest.Mock).mockResolvedValue(undefined);
          const dispatch = jest.fn();
          await automaticLogin()(dispatch);

          expect(dispatch).toHaveBeenCalledWith({
            type: loggedUserActions.USER_NOT_LOGGED
          });
        });
      });
    });
    describe('And getSavedData rejects', () => {
      test('Then dispatch should have been called with type USER_NOT_LOGGED', async () => {
        (getSavedData as jest.Mock).mockRejectedValue(new Error());

        const dispatch = jest.fn();
        await automaticLogin()(dispatch);

        expect(dispatch).toHaveBeenCalledWith({
          type: loggedUserActions.USER_NOT_LOGGED
        });
      });
    });
  });
});

describe('Given a logoutUser function', () => {
  describe('When it is triggered', () => {
    describe('And axios.post is resolved', () => {
      beforeEach(() => {
        (axios.post as jest.Mock).mockResolvedValue({ data: true });
      });
      describe('And clearStorage is Resolved', () => {
        test('Then dispatch should have been called with type USER_NOT_LOGGED and the data axios is resolved with', async () => {
          const dispatch = jest.fn();
          (clearStorage as jest.Mock).mockResolvedValue({});

          await logoutUser('refreshToken')(dispatch);

          expect(dispatch).toHaveBeenCalledWith({
            type: loggedUserActions.USER_NOT_LOGGED
          });
        });
      });
      describe('And clearStorage is rejected', () => {
        test('Then dispatch should have been called with type SERVER_ERROR', async () => {
          const dispatch = jest.fn();
          (clearStorage as jest.Mock).mockRejectedValue({});

          await logoutUser('refreshToken')(dispatch);

          expect(dispatch).toHaveBeenCalledWith({ type: notificationsActions.SERVER_ERROR });
        });
      });
    });
    describe('And axios.post is rejected', () => {
      test('Then dispatch should have been called with type SERVER_ERROR', async () => {
        const dispatch = jest.fn();
        (axios.post as jest.Mock).mockRejectedValue({});
        await logoutUser('refreshToken')(dispatch);

        expect(dispatch).toHaveBeenCalledWith({ type: notificationsActions.SERVER_ERROR });
      });
    });
  });
});

describe('Given a updateUserBooks function', () => {
  describe('When it is triggered', () => {
    describe('And axios.put is resolved', () => {
      test('Then dispatch should have been called once with type LOAD_USER_BOOKS and the data axios is resolved with', async () => {
        const dispatch = jest.fn();
        (axios.put as jest.Mock).mockResolvedValue({ data: { books: {} } });
        await updateUserBooks('1del{}eFbookIsbn', {}, 'token', 'refreshToken')(dispatch);

        expect(dispatch.mock.calls[0][0]).toEqual({
          type: userBooksActions.LOAD_USER_BOOKS,
          data: {}
        });
      });
    });
    describe('And axios.put is rejected', () => {
      describe('And the error status is 401', () => {
        let dispatch: any;
        beforeEach(() => {
          dispatch = jest.fn();
          (axios.put as jest.Mock).mockRejectedValue({ response: { status: 401 } });
        });
        describe('And refreshUserToken is resolved', () => {
          describe('And newToken is false', () => {
            test('Then dispatch should have been called with type SERVER_ERROR', async () => {
              (refreshUserToken as jest.Mock).mockResolvedValue(false);

              await updateUserBooks('1del{}eFbookIsbn', {}, 'token', 'refreshToken')(dispatch);

              expect(dispatch).toHaveBeenCalledWith({
                type: notificationsActions.SERVER_ERROR
              });
            });
          });

          describe('And there is a newToken', () => {
            test('Then dispatch should have been called with updateUserBooks', async () => {
              (refreshUserToken as jest.Mock).mockResolvedValue('newToken');

              await updateUserBooks('1del{}eFbookIsbn', {}, 'token', 'refreshToken')(dispatch);

              expect(dispatch).toHaveBeenCalled();
            });
          });
        });
        describe('And refreshUserToken is rejected', () => {
          test('Then dispatch should have been called with type SERVER_ERROR', async () => {
            (refreshUserToken as jest.Mock).mockRejectedValue(new Error());

            await updateUserBooks('1del{}eFbookIsbn', {}, 'token', 'refreshToken')(dispatch);

            expect(dispatch).toHaveBeenCalledWith({
              type: notificationsActions.SERVER_ERROR
            });
          });
        });
      });
      describe('And the error status is 500', () => {
        test('Then dispatch should have been called with type SAVE_ERROR', async () => {
          const dispatch = jest.fn();
          (axios.put as jest.Mock).mockRejectedValue({ response: { status: 500 } });
          await updateUserBooks('1del{}eFbookIsbn', {}, 'token', 'refreshToken')(dispatch);

          expect(dispatch).toHaveBeenCalledWith({
            type: notificationsActions.SAVE_ERROR
          });
        });
      });
      describe('And the error status is not 401 or 500', () => {
        test('Then dispatch should have been called with type SERVER_ERROR', async () => {
          const dispatch = jest.fn();
          (axios.put as jest.Mock).mockRejectedValue({ response: {} });
          await updateUserBooks('1del{}eFbookIsbn', {}, 'token', 'refreshToken')(dispatch);

          expect(dispatch).toHaveBeenCalledWith({ type: notificationsActions.SERVER_ERROR });
        });
      });
    });
  });
});

describe('Given a addUserFollowing function', () => {
  describe('When it is triggered', () => {
    describe('And axios.post is resolved', () => {
      test('Then dispatch should have been called with type UPDATE_USER_FOLLOWING and the data axios is resolved with', async () => {
        const dispatch = jest.fn();
        (axios.post as jest.Mock).mockResolvedValue({ data: { following: [] } });
        await addUserFollowing('1', '2', 'token', 'refreshToken')(dispatch);

        expect(dispatch).toHaveBeenCalledWith({
          type: loggedUserActions.UPDATE_USER_FOLLOWING,
          data: []
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

              await addUserFollowing('1', '2', 'token', 'refreshToken')(dispatch);

              expect(dispatch).toHaveBeenCalledWith({
                type: notificationsActions.SERVER_ERROR
              });
            });
          });

          describe('And there is a newToken', () => {
            test('Then dispatch should have been called with addUserFollowing', async () => {
              (refreshUserToken as jest.Mock).mockResolvedValue('newToken');

              await addUserFollowing('1', '2', 'token', 'refreshToken')(dispatch);

              expect(dispatch).toHaveBeenCalled();
            });
          });
        });
        describe('And refreshUserToken is rejected', () => {
          test('Then dispatch should have been called with type SERVER_ERROR', async () => {
            (refreshUserToken as jest.Mock).mockRejectedValue(new Error());

            await addUserFollowing('1', '2', 'token', 'refreshToken')(dispatch);

            expect(dispatch).toHaveBeenCalledWith({
              type: notificationsActions.SERVER_ERROR
            });
          });
        });
      });
      describe('And the error status is 500', () => {
        test('Then dispatch should have been called with type ADD_DELETE_FOLLOWING_ERROR', async () => {
          const dispatch = jest.fn();
          (axios.post as jest.Mock).mockRejectedValue({ response: { status: 500 } });
          await addUserFollowing('1', '2', 'token', 'refreshToken')(dispatch);

          expect(dispatch).toHaveBeenCalledWith({
            type: notificationsActions.ADD_DELETE_FOLLOWING_ERROR
          });
        });
      });
      describe('And the error status is not 401 or 500', () => {
        test('Then dispatch should have been called with type SERVER_ERROR', async () => {
          const dispatch = jest.fn();
          (axios.post as jest.Mock).mockRejectedValue({ response: {} });
          await addUserFollowing('1', '2', 'token', 'refreshToken')(dispatch);

          expect(dispatch).toHaveBeenCalledWith({ type: notificationsActions.SERVER_ERROR });
        });
      });
    });
  });
});

describe('Given a deleteUserFollowing function', () => {
  describe('When it is triggered', () => {
    describe('And axios.put is resolved', () => {
      test('Then dispatch should have been called with type UPDATE_USER_FOLLOWING and the data axios is resolved with', async () => {
        const dispatch = jest.fn();
        (axios.put as jest.Mock).mockResolvedValue({ data: { following: [] } });
        await deleteUserFollowing('1', '2', 'token', 'refreshToken')(dispatch);

        expect(dispatch).toHaveBeenCalledWith({
          type: loggedUserActions.UPDATE_USER_FOLLOWING,
          data: []
        });
      });
    });
    describe('And axios.put is rejected', () => {
      describe('And the error status is 401', () => {
        let dispatch: any;
        beforeEach(() => {
          dispatch = jest.fn();
          (axios.put as jest.Mock).mockRejectedValue({ response: { status: 401 } });
        });
        describe('And refreshUserToken is resolved', () => {
          describe('And newToken is false', () => {
            test('Then dispatch should have been called with type SERVER_ERROR', async () => {
              (refreshUserToken as jest.Mock).mockResolvedValue(false);

              await deleteUserFollowing('1', '2', 'token', 'refreshToken')(dispatch);

              expect(dispatch).toHaveBeenCalledWith({
                type: notificationsActions.SERVER_ERROR
              });
            });
          });

          describe('And there is a newToken', () => {
            test('Then dispatch should have been called with deleteUserFollowing', async () => {
              (refreshUserToken as jest.Mock).mockResolvedValue('newToken');

              await deleteUserFollowing('1', '2', 'token', 'refreshToken')(dispatch);

              expect(dispatch).toHaveBeenCalled();
            });
          });
        });
        describe('And refreshUserToken is rejected', () => {
          test('Then dispatch should have been called with type SERVER_ERROR', async () => {
            (refreshUserToken as jest.Mock).mockRejectedValue(new Error());

            await deleteUserFollowing('1', '2', 'token', 'refreshToken')(dispatch);

            expect(dispatch).toHaveBeenCalledWith({
              type: notificationsActions.SERVER_ERROR
            });
          });
        });
      });
      describe('And the error status is 500', () => {
        test('Then dispatch should have been called with type ADD_DELETE_FOLLOWING_ERROR', async () => {
          const dispatch = jest.fn();
          (axios.put as jest.Mock).mockRejectedValue({ response: { status: 500 } });
          await deleteUserFollowing('1', '2', 'token', 'refreshToken')(dispatch);

          expect(dispatch).toHaveBeenCalledWith({
            type: notificationsActions.ADD_DELETE_FOLLOWING_ERROR
          });
        });
      });
      describe('And the error status is not 401 or 500', () => {
        test('Then dispatch should have been called with type SERVER_ERROR', async () => {
          const dispatch = jest.fn();
          (axios.put as jest.Mock).mockRejectedValue({ response: {} });
          await deleteUserFollowing('1', '2', 'token', 'refreshToken')(dispatch);

          expect(dispatch).toHaveBeenCalledWith({ type: notificationsActions.SERVER_ERROR });
        });
      });
    });
  });
});
