const axios = require('axios');
const {
  getBooks,
  createGoogleSearchUrl
} = require('./books.controller');
const googleBooksMock = require('../mocks/googleBooks.mock');

jest.mock('axios');

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
