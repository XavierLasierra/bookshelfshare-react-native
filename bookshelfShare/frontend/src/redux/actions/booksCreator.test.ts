import axios from 'axios';
import notificationsActions from './notifications.actions';
import {
  searchBooks, getRatings, saveRating, getBooksData
} from './books.creator';
import refreshUserToken from './tokens.creator';
import booksActions from './books.actions';

jest.mock('axios');
jest.mock('./tokens.creator');

describe('Given a searchBooks function', () => {
  describe('When it is triggered', () => {
    describe('And axios.get is resolved', () => {
      test('Then dispatch should have been called with type LOAD_BOOKS and the data axios is resolved with', async () => {
        const dispatch = jest.fn();
        (axios.get as jest.Mock).mockResolvedValue({ data: {} });
        await searchBooks({ isbn: '', inauthor: 'author' }, 'token', 'refreshToken')(dispatch);

        expect(dispatch).toHaveBeenCalledWith({
          type: booksActions.LOAD_BOOKS,
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

              await searchBooks({}, 'token', 'refreshToken')(dispatch);

              expect(dispatch).toHaveBeenCalledWith({
                type: notificationsActions.SERVER_ERROR
              });
            });
          });

          describe('And there is a newToken', () => {
            test('Then dispatch should have been called with searchBooks', async () => {
              (refreshUserToken as jest.Mock).mockResolvedValue('newToken');

              await searchBooks({}, 'token', 'refreshToken')(dispatch);

              expect(dispatch).toHaveBeenCalled();
            });
          });
        });
        describe('And refreshUserToken is rejected', () => {
          test('Then dispatch should have been called with type SERVER_ERROR', async () => {
            (refreshUserToken as jest.Mock).mockRejectedValue(new Error());

            await searchBooks({}, 'token', 'refreshToken')(dispatch);

            expect(dispatch).toHaveBeenCalledWith({
              type: notificationsActions.SERVER_ERROR
            });
          });
        });
      });
      describe('And the error status is 500', () => {
        test('Then dispatch should have been called with type ISBN_ERROR', async () => {
          const dispatch = jest.fn();
          (axios.get as jest.Mock).mockRejectedValue({ response: { status: 500 } });
          await searchBooks({}, 'token', 'refreshToken')(dispatch);

          expect(dispatch).toHaveBeenCalledWith({
            type: notificationsActions.ISBN_ERROR
          });
        });
      });
      describe('And the error status is not 401 or 500', () => {
        test('Then dispatch should have been called with type SERVER_ERROR', async () => {
          const dispatch = jest.fn();
          (axios.get as jest.Mock).mockRejectedValue({ response: {} });
          await searchBooks({}, 'token', 'refreshToken')(dispatch);

          expect(dispatch).toHaveBeenCalledWith({ type: notificationsActions.SERVER_ERROR });
        });
      });
    });
  });
});

describe('Given a getRatings function', () => {
  describe('When it is triggered', () => {
    describe('And axios.get is resolved', () => {
      test('Then dispatch should have been called with type LOAD_RATINGS and the data axios is resolved with', async () => {
        const dispatch = jest.fn();
        (axios.get as jest.Mock).mockResolvedValue({ data: {} });
        await getRatings('isbn', 'token', 'refreshToken')(dispatch);

        expect(dispatch).toHaveBeenCalledWith({
          type: booksActions.LOAD_RATINGS,
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

              await getRatings('isbn', 'token', 'refreshToken')(dispatch);

              expect(dispatch).toHaveBeenCalledWith({
                type: notificationsActions.SERVER_ERROR
              });
            });
          });

          describe('And there is a newToken', () => {
            test('Then dispatch should have been called with getRatings', async () => {
              (refreshUserToken as jest.Mock).mockResolvedValue('newToken');

              await getRatings('isbn', 'token', 'refreshToken')(dispatch);

              expect(dispatch).toHaveBeenCalled();
            });
          });
        });
        describe('And refreshUserToken is rejected', () => {
          test('Then dispatch should have been called with type SERVER_ERROR', async () => {
            (refreshUserToken as jest.Mock).mockRejectedValue(new Error());

            await getRatings('isbn', 'token', 'refreshToken')(dispatch);

            expect(dispatch).toHaveBeenCalledWith({
              type: notificationsActions.SERVER_ERROR
            });
          });
        });
      });
      describe('And the error status is 500', () => {
        test('Then dispatch should have been called with type LOAD_RATINGS_ERROR', async () => {
          const dispatch = jest.fn();
          (axios.get as jest.Mock).mockRejectedValue({ response: { status: 500 } });
          await getRatings('isbn', 'token', 'refreshToken')(dispatch);

          expect(dispatch).toHaveBeenCalledWith({
            type: notificationsActions.LOAD_RATINGS_ERROR
          });
        });
      });
      describe('And the error status is not 401 or 500', () => {
        test('Then dispatch should have been called with type SERVER_ERROR', async () => {
          const dispatch = jest.fn();
          (axios.get as jest.Mock).mockRejectedValue({ response: {} });
          await getRatings('isbn', 'token', 'refreshToken')(dispatch);

          expect(dispatch).toHaveBeenCalledWith({ type: notificationsActions.SERVER_ERROR });
        });
      });
    });
  });
});

describe('Given a saveRating function', () => {
  describe('When it is triggered', () => {
    describe('And isbn is Not found', () => {
      test('Then dispatch should have been called with type REVIEW_ISBN_NOT_FOUND', async () => {
        const dispatch = jest.fn();
        (axios.post as jest.Mock).mockResolvedValue({ data: {} });
        await saveRating('Not found', {}, 'token', 'refreshToken')(dispatch);

        expect(dispatch).toHaveBeenCalledWith({
          type: notificationsActions.REVIEW_ISBN_NOT_FOUND
        });
      });
    });
    describe('And isbn is different from Not found', () => {
      describe('And axios.post is resolved', () => {
        test('Then dispatch should have been called with type UPDATE_RATINGS and the data axios is resolved with', async () => {
          const dispatch = jest.fn();
          (axios.post as jest.Mock).mockResolvedValue({ data: {} });
          await saveRating('isbn', {}, 'token', 'refreshToken')(dispatch);

          expect(dispatch).toHaveBeenCalledWith({
            type: booksActions.UPDATE_RATINGS,
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

                await saveRating('isbn', {}, 'token', 'refreshToken')(dispatch);

                expect(dispatch).toHaveBeenCalledWith({
                  type: notificationsActions.SERVER_ERROR
                });
              });
            });

            describe('And there is a newToken', () => {
              test('Then dispatch should have been called with saveRating', async () => {
                (refreshUserToken as jest.Mock).mockResolvedValue('newToken');

                await saveRating('isbn', {}, 'token', 'refreshToken')(dispatch);

                expect(dispatch).toHaveBeenCalled();
              });
            });
          });
          describe('And refreshUserToken is rejected', () => {
            test('Then dispatch should have been called with type SERVER_ERROR', async () => {
              (refreshUserToken as jest.Mock).mockRejectedValue(new Error());

              await saveRating('isbn', {}, 'token', 'refreshToken')(dispatch);

              expect(dispatch).toHaveBeenCalledWith({
                type: notificationsActions.SERVER_ERROR
              });
            });
          });
        });
        describe('And the error status is 500', () => {
          test('Then dispatch should have been called with type SAVE_RATING_ERROR', async () => {
            const dispatch = jest.fn();
            (axios.post as jest.Mock).mockRejectedValue({ response: { status: 500 } });
            await saveRating('isbn', {}, 'token', 'refreshToken')(dispatch);

            expect(dispatch).toHaveBeenCalledWith({
              type: notificationsActions.SAVE_RATING_ERROR
            });
          });
        });
        describe('And the error status is not 401 or 500', () => {
          test('Then dispatch should have been called with type SERVER_ERROR', async () => {
            const dispatch = jest.fn();
            (axios.post as jest.Mock).mockRejectedValue({ response: {} });
            await saveRating('isbn', {}, 'token', 'refreshToken')(dispatch);

            expect(dispatch).toHaveBeenCalledWith({ type: notificationsActions.SERVER_ERROR });
          });
        });
      });
    });
  });
});

describe('Given a getBooksData function', () => {
  describe('When it is triggered', () => {
    describe('And axios.post is resolved', () => {
      test('Then dispatch should have been called with type LOAD_BOOKS and the data axios is resolved with', async () => {
        const dispatch = jest.fn();
        (axios.post as jest.Mock).mockResolvedValue({ data: {} });
        await getBooksData(['isbn'], 'token', 'refreshToken')(dispatch);

        expect(dispatch).toHaveBeenCalledWith({
          type: booksActions.LOAD_BOOKS,
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

              await getBooksData(['isbn'], 'token', 'refreshToken')(dispatch);

              expect(dispatch).toHaveBeenCalledWith({
                type: notificationsActions.SERVER_ERROR
              });
            });
          });

          describe('And there is a newToken', () => {
            test('Then dispatch should have been called with getBooksData', async () => {
              (refreshUserToken as jest.Mock).mockResolvedValue('newToken');

              await getBooksData(['isbn'], 'token', 'refreshToken')(dispatch);

              expect(dispatch).toHaveBeenCalled();
            });
          });
        });
        describe('And refreshUserToken is rejected', () => {
          test('Then dispatch should have been called with type SERVER_ERROR', async () => {
            (refreshUserToken as jest.Mock).mockRejectedValue(new Error());

            await getBooksData(['isbn'], 'token', 'refreshToken')(dispatch);

            expect(dispatch).toHaveBeenCalledWith({
              type: notificationsActions.SERVER_ERROR
            });
          });
        });
      });
      describe('And the error status is 500', () => {
        test('Then dispatch should have been called with type LOAD_BOOKS_ERROR', async () => {
          const dispatch = jest.fn();
          (axios.post as jest.Mock).mockRejectedValue({ response: { status: 500 } });
          await getBooksData(['isbn'], 'token', 'refreshToken')(dispatch);

          expect(dispatch).toHaveBeenCalledWith({
            type: notificationsActions.LOAD_BOOKS_ERROR
          });
        });
      });
      describe('And the error status is not 401 or 500', () => {
        test('Then dispatch should have been called with type SERVER_ERROR', async () => {
          const dispatch = jest.fn();
          (axios.post as jest.Mock).mockRejectedValue({ response: {} });
          await getBooksData(['isbn'], 'token', 'refreshToken')(dispatch);

          expect(dispatch).toHaveBeenCalledWith({ type: notificationsActions.SERVER_ERROR });
        });
      });
    });
  });
});
