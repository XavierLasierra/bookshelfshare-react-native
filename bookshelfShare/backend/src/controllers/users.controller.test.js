const {
  getUsers,
  getOneUserById,
  deleteOneUserById,
  updateOneUserById,
  updateUserBooks,
  addUserFollowing,
  deleteUserFollowing
} = require('./users.controller');
const User = require('../models/user.model');
const userMock = require('../mocks/user.mock');

jest.mock('../models/user.model');

describe('Given a getUsers function', () => {
  describe('When it is triggered', () => {
    let req;
    let res;
    beforeEach(() => {
      req = {
        query: {}
      };
      res = {
        json: jest.fn(),
        send: jest.fn(),
        status: jest.fn()
      };
    });

    describe('And find is resolved', () => {
      test('Then should call res.json', async () => {
        User.find.mockReturnValue({
          limit: jest.fn().mockReturnValue({
            select: jest.fn().mockResolvedValue([])
          })
        });

        await getUsers(req, res);

        expect(res.json).toHaveBeenCalled();
      });
    });
    describe('And find is rejected', () => {
      beforeEach(async () => {
        User.find.mockReturnValue({
          limit: jest.fn().mockReturnValue({
            select: jest.fn().mockRejectedValue(new Error('Server error'))
          })
        });

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
  describe('When it is triggered', () => {
    let req;
    let res;
    beforeEach(() => {
      req = {
        params: {
          userId: '1'
        }
      };
      res = {
        json: jest.fn(),
        send: jest.fn(),
        status: jest.fn(),
        sendStatus: jest.fn()
      };
    });

    describe('And findById is resolved', () => {
      describe('And the user exists', () => {
        test('Then should call res.send', async () => {
          User.findById.mockReturnValue({
            select: jest.fn().mockReturnValue({
              populate: jest.fn().mockResolvedValue(userMock)
            })
          });

          await getOneUserById(req, res);
          expect(res.json).toHaveBeenCalled();
        });
      });

      describe('And the user is undefined', () => {
        test('Then should call res.sendStatus with 404', async () => {
          User.findById.mockReturnValue({
            select: jest.fn().mockReturnValue({
              populate: jest.fn().mockResolvedValue(undefined)
            })
          });

          await getOneUserById(req, res);
          expect(res.sendStatus).toHaveBeenCalledWith(404);
        });
      });
    });
    describe('And findById is rejected', () => {
      beforeEach(async () => {
        User.findById.mockReturnValue({
          select: jest.fn().mockReturnValue({
            populate: jest.fn().mockRejectedValue(new Error('Server error'))
          })
        });

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
  describe('When it is triggered', () => {
    let req;
    let res;
    beforeEach(() => {
      req = {
        params: {
          userId: '1'
        }
      };
      res = {
        send: jest.fn(),
        status: jest.fn(),
        sendStatus: jest.fn()
      };
    });

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
  describe('When it is triggered', () => {
    let req;
    let res;
    beforeEach(() => {
      req = {
        params: {
          userId: '1'
        },
        body: {}
      };
      res = {
        send: jest.fn(),
        status: jest.fn(),
        sendStatus: jest.fn(),
        json: jest.fn()
      };
    });

    describe('And findByIdAndUpdate is resolved', () => {
      describe('And updatedUser exists', () => {
        test('Then should call res.json', async () => {
          User.findByIdAndUpdate.mockReturnValue({ select: jest.fn().mockResolvedValue(userMock) });

          await updateOneUserById(req, res);

          expect(res.json).toHaveBeenCalled();
        });
      });

      describe('And updatedUser is undefined', () => {
        test('Then should call res.sendStatus with 404', async () => {
          User.findByIdAndUpdate.mockReturnValue({
            select: jest.fn().mockResolvedValue(undefined)
          });

          await updateOneUserById(req, res);

          expect(res.sendStatus).toHaveBeenCalledWith(404);
        });
      });
    });

    describe('And findByIdAndUpdate is rejected', () => {
      beforeEach(async () => {
        User.findByIdAndUpdate.mockReturnValue({
          select: jest.fn().mockRejectedValue(new Error('Server error'))
        });
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

describe('Given an updateUserBooks function', () => {
  describe('When it is triggered', () => {
    let req;
    let res;
    beforeEach(() => {
      req = {
        params: {
          userId: '1'
        },
        body: {
          bookIsbn: '1'
        }
      };
      res = {
        send: jest.fn(),
        status: jest.fn(),
        sendStatus: jest.fn(),
        json: jest.fn()
      };
    });
    describe('And User.findById is resolved', () => {
      describe('And found user is undefined', () => {
        test('Then res.sendStatus should have been called with 404', async () => {
          User.findById.mockReturnValue({
            select: jest.fn().mockResolvedValue(undefined)
          });
          await updateUserBooks(req, res);

          expect(res.sendStatus).toHaveBeenCalledWith(404);
        });
      });

      describe('And found user is not undefined', () => {
        let foundUser;
        beforeEach(() => {
          foundUser = userMock;
          User.findById.mockReturnValue({
            select: jest.fn().mockResolvedValue({
              ...foundUser,
              save: jest.fn()
            })
          });
        });
        describe('And req.body has not addTo and deleteFrom properties', () => {
          ['read', 'toRead', 'reading', 'wishlist'].forEach((list) => {
            test(`Then foundUser.${list}.length should have not change`, async () => {
              const initialLength = foundUser.books[list].length;

              await updateUserBooks(req, res);

              expect(foundUser.books[list].length - initialLength).toBe(0);
            });
          });
          test('Then res.json should have been called', async () => {
            await updateUserBooks(req, res);

            expect(res.json).toHaveBeenCalled();
          });
        });

        describe('And req.body has addTo read and deleteFrom reading and bookIsbn is in reading list', () => {
          beforeEach(() => {
            req.body.addTo = 'read';
            req.body.deleteFrom = 'reading';
          });

          test('Then foundUser.read.length should have increased 1', async () => {
            const initialLength = foundUser.books.read.length;

            await updateUserBooks(req, res);

            expect(foundUser.books.read.length - initialLength).toBe(1);
          });

          test('Then res.json should have been called', async () => {
            await updateUserBooks(req, res);

            expect(res.json).toHaveBeenCalled();
          });
        });
      });
    });
    describe('And User.findById is rejected', () => {
      beforeEach(async () => {
        User.findById.mockReturnValue({
          select: jest.fn().mockRejectedValue(new Error('Server error'))
        });
        await updateUserBooks(req, res);
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

describe('Given a addUserFollowing function', () => {
  describe('When it is triggered', () => {
    let req;
    let res;
    beforeEach(() => {
      req = {
        params: {
          userId: '3'
        },
        body: {
          followingId: '2'
        }
      };
      res = {
        json: jest.fn(),
        send: jest.fn(),
        status: jest.fn(),
        sendStatus: jest.fn()
      };
    });

    describe('And foundUser findById is resolved', () => {
      describe('And the user exists', () => {
        beforeEach(() => {
          User.findById.mockReturnValueOnce({
            select: jest.fn().mockResolvedValue({
              ...userMock,
              save: jest.fn(),
              populate: jest.fn()
            })
          });
        });
        describe('And followingUser findById is resolved', () => {
          describe('And followingUser exists', () => {
            describe('And foundUser.following does not include body.followingId', () => {
              test('Then res.json should have been called', async () => {
                User.findById.mockResolvedValueOnce({
                  ...userMock,
                  save: jest.fn()
                });

                await addUserFollowing(req, res);
                expect(res.json).toHaveBeenCalled();
              });
            });
            describe('And foundUser.following does include body.followingId', () => {
              test('Then res.sendStatus should have been called with 409', async () => {
                req.body.followingId = '1';
                User.findById.mockResolvedValueOnce({
                  ...userMock,
                  save: jest.fn()
                });

                await addUserFollowing(req, res);
                expect(res.sendStatus).toHaveBeenCalledWith(409);
              });
            });
          });

          describe('And followingUser is undefined', () => {
            test('Then res.sendStatus should have been called with 409', async () => {
              req.body.followingId = '1';
              User.findById.mockResolvedValueOnce(undefined);

              await addUserFollowing(req, res);
              expect(res.sendStatus).toHaveBeenCalledWith(404);
            });
          });
        });
        describe('And followingUser findById is rejected', () => {
          beforeEach(async () => {
            User.findById.mockRejectedValue(new Error('Server error'));

            await addUserFollowing(req, res);
          });

          test('Then should call res.send with 500', () => {
            expect(res.status).toHaveBeenCalledWith(500);
          });

          test('Then should call res.send with an error with a message Server error', async () => {
            expect(res.send.mock.calls[0][0].message).toBe('Server error');
          });
        });
      });

      describe('And the user is undefined', () => {
        test('Then should call res.sendStatus with 404', async () => {
          User.findById.mockReturnValueOnce({
            select: jest.fn().mockResolvedValue(undefined)
          });

          await addUserFollowing(req, res);
          expect(res.sendStatus).toHaveBeenCalledWith(404);
        });
      });
    });
    describe('And findById is rejected', () => {
      beforeEach(async () => {
        User.findById.mockReturnValueOnce({
          select: jest.fn().mockRejectedValue(new Error('Server error'))
        });

        await addUserFollowing(req, res);
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

//

describe('Given a deleteUserFollowing function', () => {
  describe('When it is triggered', () => {
    let req;
    let res;
    beforeEach(() => {
      req = {
        params: {
          userId: '3'
        },
        body: {
          followingId: '2'
        }
      };
      res = {
        json: jest.fn(),
        send: jest.fn(),
        status: jest.fn(),
        sendStatus: jest.fn()
      };
    });

    describe('And foundUser findById is resolved', () => {
      describe('And the user exists', () => {
        beforeEach(() => {
          User.findById.mockReturnValueOnce({
            select: jest.fn().mockResolvedValue({
              ...userMock,
              save: jest.fn(),
              populate: jest.fn()
            })
          });
        });
        describe('And followingUser findById is resolved', () => {
          describe('And followingUser exists', () => {
            test('Then res.json should have been called', async () => {
              User.findById.mockResolvedValueOnce({
                ...userMock,
                save: jest.fn()
              });

              await deleteUserFollowing(req, res);
              expect(res.json).toHaveBeenCalled();
            });
          });

          describe('And followingUser is undefined', () => {
            test('Then res.sendStatus should have been called with 409', async () => {
              req.body.followingId = '1';
              User.findById.mockResolvedValueOnce(undefined);

              await deleteUserFollowing(req, res);
              expect(res.sendStatus).toHaveBeenCalledWith(404);
            });
          });
        });
        describe('And followingUser findById is rejected', () => {
          beforeEach(async () => {
            User.findById.mockRejectedValue(new Error('Server error'));

            await deleteUserFollowing(req, res);
          });

          test('Then should call res.send with 500', () => {
            expect(res.status).toHaveBeenCalledWith(500);
          });

          test('Then should call res.send with an error with a message Server error', async () => {
            expect(res.send.mock.calls[0][0].message).toBe('Server error');
          });
        });
      });

      describe('And the user is undefined', () => {
        test('Then should call res.sendStatus with 404', async () => {
          User.findById.mockReturnValueOnce({
            select: jest.fn().mockResolvedValue(undefined)
          });

          await deleteUserFollowing(req, res);
          expect(res.sendStatus).toHaveBeenCalledWith(404);
        });
      });
    });
    describe('And findById is rejected', () => {
      beforeEach(async () => {
        User.findById.mockReturnValueOnce({
          select: jest.fn().mockRejectedValue(new Error('Server error'))
        });

        await deleteUserFollowing(req, res);
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
