const jwt = require('jsonwebtoken');
const {
  registerUser,
  loginUser,
  refreshUserToken,
  logoutUser,
  verifyToken
} = require('./auth.controller');
const User = require('../models/user.model');
const userMock = require('../mocks/user.mock');

jest.mock('../models/user.model');
jest.mock('jsonwebtoken');

describe('Given a registerUser function', () => {
  describe('When it is triggered', () => {
    let req;
    let res;
    beforeEach(() => {
      req = {
        user: {
          email: userMock.email,
          password: userMock.password
        },
        body: { ...userMock }
      };
      res = {
        status: jest.fn(),
        send: jest.fn(),
        json: jest.fn()
      };
    });

    describe('And User.create is resolved', () => {
      beforeEach(async () => {
        User.create.mockResolvedValue({});

        await registerUser(req, res);
      });

      test('Then res.status should have been called with 201', () => {
        expect(res.status).toHaveBeenCalledWith(201);
      });

      test('Then res.json should have been called', () => {
        expect(res.json).toHaveBeenCalled();
      });
    });

    describe('And User.create is rejected', () => {
      beforeEach(async () => {
        User.create.mockRejectedValue(new Error('Server error'));

        await registerUser(req, res);
      });

      test('Then res.status should have been called with 500', () => {
        expect(res.status).toHaveBeenCalledWith(500);
      });

      test('Then res.send should have been called with and error with a message Server error', () => {
        expect(res.send.mock.calls[0][0].message).toBe('Server error');
      });
    });
  });
});

describe('Given a loginUser function', () => {
  describe('When it is triggered', () => {
    let req;
    let res;
    beforeEach(() => {
      req = {
        user: {
          email: userMock.email,
          password: userMock.password
        }
      };
      res = {
        status: jest.fn(),
        send: jest.fn(),
        json: jest.fn()
      };
    });

    test('Then res.json should have been called with an object containing user data, a token and a refreshToken', () => {
      jwt.sign = jest.fn()
        .mockReturnValueOnce('token')
        .mockReturnValueOnce('refreshToken');

      loginUser(req, res);

      expect(res.json.mock.calls[0][0]).toEqual({
        user: {
          email: userMock.email,
          password: userMock.password
        },
        token: 'token',
        refreshToken: 'refreshToken'
      });
    });
  });
});

describe('Given a refreshUserToken function', () => {
  describe('When it is triggered', () => {
    describe('And refreshToken is undefined', () => {
      let req;
      let res;
      beforeEach(() => {
        req = {
          body: {
          }
        };
        res = {
          sendStatus: jest.fn()
        };
      });

      test('Then res.sendStatus should have been called with 401', () => {
        refreshUserToken(req, res);

        expect(res.sendStatus).toHaveBeenCalledWith(401);
      });
    });

    describe('And refreshTokens does not contain refreshToken', () => {
      let req;
      let res;
      beforeEach(() => {
        req = {
          body: {
            refreshToken: 'myRefreshToken'
          }
        };
        res = {
          sendStatus: jest.fn()
        };
      });

      test('Then res.sendStatus should have been called with 403', () => {
        refreshUserToken(req, res);

        expect(res.sendStatus).toHaveBeenCalledWith(403);
      });
    });

    describe('And refreshTokens contains refreshToken', () => {
      let req;
      let res;
      beforeEach(() => {
        req = {
          body: {
            refreshToken: 'myRefreshToken'
          },
          user: {
            email: userMock.email,
            password: userMock.password
          }
        };
        res = {
          json: jest.fn()
        };
      });

      test('Then jwt.verify should have been called', () => {
        jwt.sign = jest.fn()
          .mockReturnValueOnce('token')
          .mockReturnValueOnce('myRefreshToken');
        jwt.verify = jest.fn();

        loginUser(req, res);
        refreshUserToken(req, res);

        expect(jwt.verify).toHaveBeenCalled();
      });
    });
  });
});

describe('Given a logoutUser function', () => {
  describe('When it is triggered', () => {
    describe('And refreshToken is undefined', () => {
      let req;
      let res;
      beforeEach(() => {
        req = {
          body: {
          }
        };
        res = {
          sendStatus: jest.fn()
        };
      });

      test('Then res.sendStatus should have been called with 401', () => {
        logoutUser(req, res);

        expect(res.sendStatus).toHaveBeenCalledWith(401);
      });
    });

    describe('And refreshToken is defined', () => {
      let req;
      let res;
      beforeEach(() => {
        req = {
          body: {
            refreshToken: 'logoutThisRefreshToken'
          }
        };
        res = {
          send: jest.fn()
        };
      });

      test('Then res.send should have been called with Logout successful', () => {
        logoutUser(req, res);

        expect(res.send).toHaveBeenCalledWith('Logout successful');
      });
    });
  });
});

describe('Given a verify token function', () => {
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
