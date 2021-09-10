const jwt = require('jsonwebtoken');
const userMock = require('../mocks/user.mock');
const { verifyToken } = require('./verifyToken');

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn()
}));

describe('Given a verifyToken function', () => {
  describe('When it is triggered', () => {
    const user = userMock;
    let res;
    beforeEach(() => {
      res = {
        sendStatus: jest.fn(),
        json: jest.fn()
      };
    });

    describe('And there is an error', () => {
      test('Then res.sendStatus should have been called with 403', () => {
        verifyToken(true, user, res);

        expect(res.sendStatus).toHaveBeenCalledWith(403);
      });
    });

    describe('And there is no error', () => {
      test('Then res.json should have been called', () => {
        jwt.sign = jest.fn()
          .mockReturnValue('token');

        verifyToken(false, user, res);

        expect(res.json).toHaveBeenCalled();
      });
    });
  });
});
