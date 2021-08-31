const {
  getLists,
  createList,
  getListById,
  deleteListById,
  updateListById,
  updateUsersList,
  updateBooksFromList
} = require('./lists.controller');
const List = require('../models/list.model');

jest.mock('../models/list.model');

describe('Given a getLists function', () => {
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
        List.find.mockResolvedValue([]);

        await getLists(req, res);

        expect(res.json).toHaveBeenCalled();
      });
    });
    describe('And find is rejected', () => {
      beforeEach(async () => {
        List.find.mockRejectedValue(new Error('Server error'));

        await getLists(req, res);
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

describe('Given a createList function', () => {
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
        status: jest.fn(),
        sendStatus: jest.fn()
      };
    });

    describe('And List.findOne is resolved', () => {
      describe('And there is already a List with the same List and name', () => {
        test('Then should call res.sendStatus with 409', async () => {
          List.findOne.mockResolvedValue({});

          await createList(req, res);

          expect(res.sendStatus).toHaveBeenCalledWith(409);
        });
      });

      describe('And there is not already a List with the same List and name', () => {
        beforeEach(() => {
          List.findOne.mockResolvedValue(undefined);
        });
        describe('And List.create is resolved', () => {
          test('Then should call res.json', async () => {
            List.create.mockResolvedValue({});

            await createList(req, res);

            expect(res.json).toHaveBeenCalled();
          });
        });
        describe('And List.create is resolved', () => {
          beforeEach(async () => {
            List.create.mockRejectedValue(new Error('Server error'));

            await createList(req, res);
          });

          test('Then should call res.status with 500', () => {
            expect(res.status).toHaveBeenCalledWith(500);
          });

          test('Then should call res.send with an error with a message Server error', () => {
            expect(res.send.mock.calls[0][0].message).toBe('Server error');
          });
        });
      });
    });
    describe('And List.findOne is rejected', () => {
      beforeEach(async () => {
        List.findOne.mockRejectedValue(new Error('Server error'));

        await createList(req, res);
      });

      test('Then should call res.status with 500', () => {
        expect(res.status).toHaveBeenCalledWith(500);
      });

      test('Then should call res.send with an error with a message Server error', () => {
        expect(res.send.mock.calls[0][0].message).toBe('Server error');
      });
    });
  });
});

describe('Given a getListById function', () => {
  describe('When it is triggered', () => {
    let req;
    let res;
    beforeEach(() => {
      req = {
        params: {
          listId: '1'
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
      describe('And the list exists', () => {
        test('Then should call res.send', async () => {
          List.findById.mockResolvedValue({});

          await getListById(req, res);
          expect(res.json).toHaveBeenCalled();
        });
      });

      describe('And the list is undefined', () => {
        test('Then should call res.sendStatus with 404', async () => {
          List.findById.mockResolvedValue(undefined);

          await getListById(req, res);
          expect(res.sendStatus).toHaveBeenCalledWith(404);
        });
      });
    });
    describe('And findById is rejected', () => {
      beforeEach(async () => {
        List.findById.mockRejectedValue(new Error('Server error'));

        await getListById(req, res);
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

describe('Given a deleteListById function', () => {
  describe('When it is triggered', () => {
    let req;
    let res;
    beforeEach(() => {
      req = {
        params: {
          listId: '1'
        },
        body: {
          List: '1'
        }
      };
      res = {
        sendStatus: jest.fn(),
        status: jest.fn(),
        send: jest.fn()
      };
    });
    describe('And List.findById is resolved', () => {
      describe('And listToDelete exists', () => {
        describe('And listToDelete has only 1 List', () => {
          beforeEach(async () => {
            List.findById.mockResolvedValue({
              users: ['1'],
              delete: jest.fn()
            });

            await deleteListById(req, res);
          });
          test('Then listToDelete.delete should have been called', async () => {
            const listToDelete = await List.findById();
            expect(listToDelete.delete).toHaveBeenCalled();
          });

          test('Then res.sendStatus should have been called with 200', () => {
            expect(res.sendStatus).toHaveBeenCalledWith(200);
          });
        });

        describe('And listToDelete has more than 1 List', () => {
          beforeEach(async () => {
            List.findById.mockResolvedValue({
              users: ['1', '2'],
              save: jest.fn()
            });

            await deleteListById(req, res);
          });
          test('Then listToDelete.delete should have been called', async () => {
            const listToDelete = await List.findById();
            expect(listToDelete.save).toHaveBeenCalled();
          });

          test('Then res.sendStatus should have been called with 200', () => {
            expect(res.sendStatus).toHaveBeenCalledWith(200);
          });
        });
      });
      describe('And listToDelete does not exist', () => {
        test('Then should call res.sendStatus with 404', async () => {
          List.findById.mockResolvedValue(undefined);

          await deleteListById(req, res);

          expect(res.sendStatus).toHaveBeenCalledWith(404);
        });
      });
    });
    describe('And List.findById is rejected', () => {
      beforeEach(async () => {
        List.findById.mockRejectedValue(new Error('Server error'));

        await deleteListById(req, res);
      });

      test('Then should call res.status with 500', () => {
        expect(res.status).toHaveBeenCalledWith(500);
      });

      test('Then should call res.send with an error with a message Server error', () => {
        expect(res.send.mock.calls[0][0].message).toBe('Server error');
      });
    });
  });
});

describe('Given an updateListById function', () => {
  describe('When it is triggered', () => {
    let req;
    let res;
    beforeEach(() => {
      req = {
        params: {
          listId: '1'
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
      describe('And updatedList exists', () => {
        test('Then should call res.json', async () => {
          List.findByIdAndUpdate.mockResolvedValue({});

          await updateListById(req, res);

          expect(res.json).toHaveBeenCalled();
        });
      });

      describe('And updatedList is undefined', () => {
        test('Then should call res.sendStatus with 404', async () => {
          List.findByIdAndUpdate.mockResolvedValue(undefined);

          await updateListById(req, res);

          expect(res.sendStatus).toHaveBeenCalledWith(404);
        });
      });
    });

    describe('And findByIdAndUpdate is rejected', () => {
      beforeEach(async () => {
        List.findByIdAndUpdate.mockRejectedValue(new Error('Server error'));

        await updateListById(req, res);
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

describe('Given a updateUsersList function', () => {
  describe('When it is triggered', () => {
    let req;
    let res;
    beforeEach(() => {
      req = {
        params: {
          listId: '1'
        },
        body: {
          user: '1'
        }
      };
      res = {
        send: jest.fn(),
        status: jest.fn(),
        sendStatus: jest.fn(),
        json: jest.fn()
      };
    });

    describe('And findById is resolved', () => {
      describe('And foundList exists', () => {
        describe('And foundList has already the same user', () => {
          test('Then should call res.sendStatus with 409', async () => {
            List.findById.mockResolvedValue({
              users: ['1']
            });

            await updateUsersList(req, res);

            expect(res.sendStatus).toHaveBeenCalledWith(409);
          });
        });

        describe('And foundList does not already have the same user', () => {
          beforeEach(() => {
            List.findById.mockResolvedValue({
              users: ['2'],
              save: jest.fn()
            });
          });
          test('Then res.json should have been called', async () => {
            await updateUsersList(req, res);

            expect(res.json).toHaveBeenCalled();
          });

          test('Then foundList.users length should have been increased 1', async () => {
            const foundList = await List.findById();
            const initialLength = foundList.users.length;

            await updateUsersList(req, res);

            expect(foundList.users.length - initialLength).toBe(1);
          });
        });
      });

      describe('And foundList is undefined', () => {
        test('Then should call res.sendStatus with 404', async () => {
          List.findById.mockResolvedValue(undefined);

          await updateUsersList(req, res);

          expect(res.sendStatus).toHaveBeenCalledWith(404);
        });
      });
    });

    describe('And findById is rejected', () => {
      beforeEach(async () => {
        List.findById.mockRejectedValue(new Error('Server error'));

        await updateUsersList(req, res);
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

describe('Given a updateBooksFromList function', () => {
  describe('When it is triggered', () => {
    let req;
    let res;
    beforeEach(() => {
      req = {
        params: {
          listId: '1'
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
    describe('And List.findById is resolved', () => {
      describe('And listToUpdate exists', () => {
        describe('And body.actionType is ADD', () => {
          describe('And listToUpdate contains the bookISBN to include', () => {
            beforeEach(() => {
              req.body = {
                actionType: 'ADD',
                bookISBN: '5',
                customInformation: { notes: 'no' }
              };
              List.findById.mockResolvedValue({
                books: [
                  {
                    bookISBN: '5',
                    customInformation: { notes: 'yes' }
                  }
                ],
                save: jest.fn()
              });
            });

            test('Then listToUpdate.books length should not change', async () => {
              const listToUpdate = await List.findById();
              const initialLength = listToUpdate.books.length;

              await updateBooksFromList(req, res);

              expect(listToUpdate.books.length - initialLength).toBe(0);
            });

            test('Then the listToUpdate book should change its custom information', async () => {
              const listToUpdate = await List.findById();
              const initialCustomInformation = listToUpdate.books
                .find(({ bookISBN }) => bookISBN === req.body.bookISBN).customInformation;

              await updateBooksFromList(req, res);

              const finalCustomInformation = listToUpdate.books
                .find(({ bookISBN }) => bookISBN === req.body.bookISBN).customInformation;

              expect(finalCustomInformation).not.toEqual(initialCustomInformation);
            });

            test('Then res.json should have been called', async () => {
              await updateBooksFromList(req, res);

              expect(res.json).toHaveBeenCalled();
            });
          });
          describe('And listToUpdate does not contain the bookISBN to include', () => {
            beforeEach(() => {
              req.body = {
                actionType: 'ADD',
                bookISBN: '5'
              };
              List.findById.mockResolvedValue({
                books: [],
                save: jest.fn()
              });
            });

            test('Then listToUpdate.books length should increase one', async () => {
              const listToUpdate = await List.findById();
              const initialLength = listToUpdate.books.length;

              await updateBooksFromList(req, res);

              expect(listToUpdate.books.length - initialLength).toBe(1);
            });

            test('Then res.json should have been called', async () => {
              await updateBooksFromList(req, res);

              expect(res.json).toHaveBeenCalled();
            });
          });
        });
        describe('And body.actionType is DELETE', () => {
          describe('And body.bookISBN is in listToUpdate.books', () => {
            beforeEach(() => {
              req.body = {
                actionType: 'DELETE',
                bookISBN: '1'
              };
              List.findById.mockResolvedValue({
                books: [
                  { bookISBN: '1' },
                  { bookISBN: '2' }
                ],
                save: jest.fn()
              });
            });

            test('Then listToUpdate.books length should have decreased 1', async () => {
              const listToUpdate = await List.findById();
              const initialLength = listToUpdate.books.length;

              await updateBooksFromList(req, res);

              expect(listToUpdate.books.length - initialLength).toBe(-1);
            });

            test('Then res.json should have been called', async () => {
              await updateBooksFromList(req, res);

              expect(res.json).toHaveBeenCalled();
            });
          });
        });
        describe('And actionType is different from ADD and DELETE', () => {
          test('Then should call res.sendStatus with 400', async () => {
            req.body = {
              actionType: ''
            };
            List.findById.mockResolvedValue({});

            await updateBooksFromList(req, res);

            expect(res.sendStatus).toHaveBeenCalledWith(400);
          });
        });
      });
      describe('And listToUpdate is undefined', () => {
        test('Then should call res.sendStatus with 404', async () => {
          List.findById.mockResolvedValue(undefined);

          await updateBooksFromList(req, res);

          expect(res.sendStatus).toHaveBeenCalledWith(404);
        });
      });
    });
    describe('And List.findById is rejected', () => {
      beforeEach(async () => {
        List.findById.mockRejectedValue(new Error('Server error'));

        await updateBooksFromList(req, res);
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
