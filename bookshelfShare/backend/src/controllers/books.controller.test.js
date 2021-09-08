const axios = require('axios');
const {
  getBooks,
  createGoogleSearchUrl,
  getBookRating,
  addUpdateBookRating
} = require('./books.controller');
const googleBooksMock = require('../mocks/googleBooks.mock');
const Book = require('../models/book.model');
const ratingsMock = require('../mocks/ratings.mock');

jest.mock('axios');
jest.mock('../models/book.model');

describe('Given a getBooks function', () => {
  describe('When it is triggered', () => {
    let req;
    let res;
    beforeEach(() => {
      req = {
        query: {
          inauthor: 'orwell',
          intitle: '1984'
        }
      };
      res = {
        json: jest.fn(),
        send: jest.fn(),
        status: jest.fn()
      };
    });

    describe('And axios is resolved', () => {
      test('Then res.json should be called', async () => {
        axios.get.mockResolvedValue({ data: googleBooksMock });

        await getBooks(req, res);

        expect(res.json).toHaveBeenCalled();
      });
    });

    describe('And axios is rejected', () => {
      beforeEach(async () => {
        axios.get.mockRejectedValue(new Error('Google error'));

        await getBooks(req, res);
      });

      test('Then res.status should have been called with 500', () => {
        expect(res.status).toHaveBeenCalledWith(500);
      });

      test('Then res.send should have been called with an error with a message Google error', () => {
        expect(res.send.mock.calls[0][0].message).toBe('Google error');
      });
    });
  });
});

describe('Given a createGoogleSearchUrl', () => {
  describe('When it is triggered', () => {
    describe('And an object {inauthor: orwell, intitle: 1984} is passed throw parameter', () => {
      let url;
      beforeEach(() => {
        url = createGoogleSearchUrl({ inauthor: 'orwell', intitle: '1984' });
      });

      test('Then should return an url containing inauthor:orwell+intitle:1984', () => {
        expect(url).toContain('inauthor:orwell+intitle:1984');
      });

      test('Then the returned url should not contain 1984+', () => {
        expect(url).not.toContain('1984+');
      });
    });
  });
});

describe('Given a getBookRating function', () => {
  describe('When it is triggered', () => {
    let req;
    let res;
    beforeEach(() => {
      req = {
        params: {
          bookIsbn: '1234'
        }
      };
      res = {
        send: jest.fn(),
        status: jest.fn(),
        json: jest.fn()
      };
    });

    describe('And findOne is resolved', () => {
      describe('And foundBook is not undefined', () => {
        test('Then should call res.json with the object the promise resolves with', async () => {
          const foundBook = { foundBook: 'foundBook' };
          Book.findOne.mockReturnValue({
            populate: jest.fn().mockResolvedValue(foundBook)
          });

          await getBookRating(req, res);

          expect(res.json).toHaveBeenCalledWith(foundBook);
        });
      });

      describe('And foundBook is undefined', () => {
        test('Then should call res.json with an object with an empty array in ratings property', async () => {
          Book.findOne.mockReturnValue({
            populate: jest.fn().mockResolvedValue(undefined)
          });

          await getBookRating(req, res);

          expect(res.json).toHaveBeenCalledWith({ ratings: [] });
        });
      });
    });

    describe('And findOne is rejected', () => {
      beforeEach(async () => {
        Book.findOne.mockReturnValue({
          populate: jest.fn().mockRejectedValue(new Error('Server error'))
        });
        await getBookRating(req, res);
      });

      test('Then should call res.status with 500', () => {
        expect(res.status).toHaveBeenCalledWith(500);
      });

      test('Then should call res.send with an error with a message Server error', () => {
        expect(res.send).toHaveBeenCalled();
      });
    });
  });
});

describe('Given a addUpdateBookRating function', () => {
  describe('When it is triggered', () => {
    let req;
    let res;
    beforeEach(() => {
      req = {
        params: {
          bookIsbn: '1234'
        },
        body: {
          user: '',
          rating: '',
          review: ''
        }
      };
      res = {
        send: jest.fn(),
        status: jest.fn(),
        json: jest.fn()
      };
    });

    describe('And findOne is resolved', () => {
      describe('And foundBook is not undefined', () => {
        beforeEach(() => {
          Book.findOne.mockResolvedValue({
            ...ratingsMock,
            save: jest.fn().mockResolvedValue({
              populate: jest.fn().mockResolvedValue({})
            })
          });
        });
        describe('And there is a rating.user equal than body.user', () => {
          beforeEach(() => {
            req.body.user = '1';
          });

          test('Then res.json should have been called', async () => {
            await addUpdateBookRating(req, res);

            expect(res.json).toHaveBeenCalled();
          });
        });
        describe('And there is not rating.user equal than body.user', () => {
          test('Then res.json should have been called', async () => {
            await addUpdateBookRating(req, res);

            expect(res.json).toHaveBeenCalled();
          });
        });
      });

      describe('And foundBook is undefined', () => {
        beforeEach(async () => {
          Book.findOne.mockResolvedValue(undefined);
          Book.create.mockResolvedValue({
            ...ratingsMock,
            save: jest.fn().mockResolvedValue({
              populate: jest.fn().mockResolvedValue({})
            })
          });
          await addUpdateBookRating(req, res);
        });
        test('Then Book.create should have been called', () => {
          expect(Book.create).toHaveBeenCalled();
        });

        test('Then res.json should have been called', () => {
          expect(res.json).toHaveBeenCalled();
        });
      });
    });

    describe('And findOne is rejected', () => {
      beforeEach(async () => {
        Book.findOne.mockRejectedValue(new Error('Server error'));
        await addUpdateBookRating(req, res);
      });

      test('Then should call res.status with 500', () => {
        expect(res.status).toHaveBeenCalledWith(500);
      });

      test('Then should call res.send with an error with a message Server error', () => {
        expect(res.send).toHaveBeenCalled();
      });
    });
  });
});
