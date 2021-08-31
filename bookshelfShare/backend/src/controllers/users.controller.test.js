const {
  getUsers,
  getOneUserById,
  deleteOneUserById,
  updateOneUserById
} = require('./users.controller');
const User = require('../models/user.model');
const userMock = require('../mocks/user.mock');

jest.mock('../models/user.model');

describe('Given a getUsers function', () => {
  describe('When it is invoked', () => {
    const req = {
      query: {}
    };
    const res = {
      json: jest.fn(),
      send: jest.fn(),
      status: jest.fn()
    };

    describe('And find is resolved', () => {
      test('Then should call res.json', async () => {
        User.find.mockResolvedValue([]);

        await getUsers(req, res);

        expect(res.json).toHaveBeenCalled();
      });
    });
    describe('And find is rejected', () => {
      beforeEach(async () => {
        User.find.mockRejectedValue(new Error('Server error'));

        await getUsers(req, res);
      });

      test('Then should call res.send with an error with a message Server error', () => {
        expect(res.send.mock.calls[0][0].message).toBe('Server error');
      });

      test('Then should call res.status with 500', () => {
        expect(res.status).toHaveBeenCalledWith(500);
      });
    });
  });
});

describe('Given a getOneUserById function', () => {
  describe('When it is invoked', () => {
    const req = {
      params: {
        userId: '1'
      }
    };
    const res = {
      json: jest.fn(),
      send: jest.fn(),
      status: jest.fn(),
      sendStatus: jest.fn()
    };
    describe('And findById is resolved', () => {
      describe('And the user exists', () => {
        test('Then should call res.send', async () => {
          User.findById.mockResolvedValue(userMock);

          await getOneUserById(req, res);
          expect(res.json).toHaveBeenCalled();
        });
      });

      describe('And the user is undefined', () => {
        test('Then should call res.sendStatus with 404', async () => {
          User.findById.mockResolvedValue(undefined);

          await getOneUserById(req, res);
          expect(res.sendStatus).toHaveBeenCalledWith(404);
        });
      });
    });
    describe('And findById is rejected', () => {
      beforeEach(async () => {
        User.findById.mockRejectedValue(new Error('Server error'));

        await getOneUserById(req, res);
      });

      test('Then should call res.send with 500', () => {
        expect(res.status).toHaveBeenCalledWith(500);
      });

      test('Then should call res.send with an error with a message Server error', async () => {
        expect(res.send.mock.calls[0][0].message).toBe('Server error');
      });
    });
  });
});

describe('Given a deleteOneUserById function', () => {
  describe('When it is invoked', () => {
    const req = {
      params: {
        userId: '1'
      }
    };
    const res = {
      send: jest.fn(),
      status: jest.fn(),
      sendStatus: jest.fn()
    };
    describe('And findByIdAndDelete is resolved', () => {
      test('Then should call res.sendStatus with an argument 204', async () => {
        User.findByIdAndDelete.mockResolvedValue({});

        await deleteOneUserById(req, res);

        expect(res.sendStatus).toHaveBeenCalledWith(204);
      });
    });

    describe('And findByIdAndDelete is rejected', () => {
      beforeEach(async () => {
        User.findByIdAndDelete.mockRejectedValue(new Error('Server error'));

        await deleteOneUserById(req, res);
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

describe('Given an updateOneUserById function', () => {
  describe('When it is invoked', () => {
    const req = {
      params: {
        userId: '1'
      },
      body: {}
    };
    const res = {
      send: jest.fn(),
      status: jest.fn(),
      sendStatus: jest.fn(),
      json: jest.fn()
    };

    describe('And findByIdAndUpdate is resolved', () => {
      describe('And updatedUser exists', () => {
        test('Then should call res.json', async () => {
          User.findByIdAndUpdate.mockResolvedValue(userMock);

          await updateOneUserById(req, res);

          expect(res.json).toHaveBeenCalled();
        });
      });

      describe('And updatedUser is undefined', () => {
        test('Then should call res.sendStatus with 404', async () => {
          User.findByIdAndUpdate.mockResolvedValue(undefined);

          await updateOneUserById(req, res);

          expect(res.sendStatus).toHaveBeenCalledWith(404);
        });
      });
    });

    describe('And findByIdAndUpdate is rejected', () => {
      beforeEach(async () => {
        User.findByIdAndUpdate.mockRejectedValue(new Error('Server error'));

        await updateOneUserById(req, res);
      });

      test('Then should call res.status with 500', async () => {
        expect(res.status).toHaveBeenCalledWith(500);
      });
      test('Then should call res.send with an error with a message Server error', async () => {
        expect(res.send.mock.calls[0][0].message).toBe('Server error');
      });
    });
  });
});
