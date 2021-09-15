import axios from 'axios';
import notificationsActions from './notifications.actions';
import { loadUserShelves, createShelf, addToShelf } from './userShelves.creator';
import refreshUserToken from './tokens.creator';
import userShelvesActions from './userShelves.actions';

jest.mock('axios');
jest.mock('./tokens.creator');

describe('Given a loadUserShelves function', () => {
  describe('When it is triggered', () => {
    describe('And axios.get is resolved', () => {
      test('Then dispatch should have been called with type LOAD_USER_SHELVES and the data axios is resolved with', async () => {
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
      test('Then dispatch should have been called with type ADD_NEW_SHELF and the data axios is resolved with', async () => {
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

describe('Given a addToShelf function', () => {
  describe('When it is triggered', () => {
    describe('And deleteFrom and addTo is undefined', () => {
      test('Then dispatch should have not been called', async () => {
        const dispatch = jest.fn();
        await addToShelf('', '', 'bookIsbn', {}, 'token', 'refreshToken')(dispatch);

        expect(dispatch).not.toHaveBeenCalled();
      });
    });
    describe('And deleteFrom and addTo is defined', () => {
      describe('And axios.put is resolved', () => {
        let dispatch: any;
        beforeEach(async () => {
          dispatch = jest.fn();
          (axios.put as jest.Mock).mockResolvedValue({ data: {} });
          await addToShelf('deleteFrom', 'addTo', 'bookIsbn', {}, 'token', 'refreshToken')(dispatch);
        });
        test('Then dispatch should have been called once with type DELETE_BOOK_FROM_SHELF and the data axios is resolved with', async () => {
          expect(dispatch.mock.calls[0][0]).toEqual({
            type: userShelvesActions.DELETE_BOOK_FROM_SHELF,
            data: {}
          });
        });

        test('Then dispatch should have been called once with type ADD_BOOK_TO_SHELF and the data axios is resolved with', async () => {
          expect(dispatch.mock.calls[1][0]).toEqual({
            type: userShelvesActions.ADD_BOOK_TO_SHELF,
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

                await addToShelf('deleteFrom', 'addTo', 'bookIsbn', {}, 'token', 'refreshToken')(dispatch);

                expect(dispatch).toHaveBeenCalledWith({
                  type: notificationsActions.SERVER_ERROR
                });
              });
            });

            describe('And there is a newToken', () => {
              test('Then dispatch should have been called with addToShelf', async () => {
                (refreshUserToken as jest.Mock).mockResolvedValue('newToken');

                await addToShelf('deleteFrom', 'addTo', 'bookIsbn', {}, 'token', 'refreshToken')(dispatch);

                expect(dispatch).toHaveBeenCalled();
              });
            });
          });
          describe('And refreshUserToken is rejected', () => {
            test('Then dispatch should have been called with type SERVER_ERROR', async () => {
              (refreshUserToken as jest.Mock).mockRejectedValue(new Error());

              await addToShelf('deleteFrom', 'addTo', 'bookIsbn', {}, 'token', 'refreshToken')(dispatch);

              expect(dispatch).toHaveBeenCalledWith({
                type: notificationsActions.SERVER_ERROR
              });
            });
          });
        });
        describe('And the error status is 500', () => {
          test('Then dispatch should have been called with type ADD_TO_SHELF_ERROR', async () => {
            const dispatch = jest.fn();
            (axios.put as jest.Mock).mockRejectedValue({ response: { status: 500 } });
            await addToShelf('deleteFrom', 'addTo', 'bookIsbn', {}, 'token', 'refreshToken')(dispatch);

            expect(dispatch).toHaveBeenCalledWith({
              type: notificationsActions.ADD_TO_SHELF_ERROR
            });
          });
        });
        describe('And the error status is not 401 or 500', () => {
          test('Then dispatch should have been called with type SERVER_ERROR', async () => {
            const dispatch = jest.fn();
            (axios.put as jest.Mock).mockRejectedValue({ response: {} });
            await addToShelf('deleteFrom', 'addTo', 'bookIsbn', {}, 'token', 'refreshToken')(dispatch);

            expect(dispatch).toHaveBeenCalledWith({ type: notificationsActions.SERVER_ERROR });
          });
        });
      });
    });
  });
});
