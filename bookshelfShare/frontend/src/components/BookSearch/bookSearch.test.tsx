import React from 'react';
import BookSearch from './BookSearch';
import { render, fireEvent } from '../../utils/test.utils';

import { searchBooks } from '../../redux/actions/books.creator';
import booksActions from '../../redux/actions/books.actions';
import bookDetailsMock from '../../mocks/bookDetails.mock';

jest.mock('../../redux/actions/books.creator', () => ({
  searchBooks: jest.fn()
}));

const navigation = {
  push: jest.fn()
};

describe('Given a BookSearch component', () => {
  describe('When it is rendered', () => {
    describe('And isbnFromCamera is empty', () => {
      let screen: any;
      beforeEach(() => {
        (searchBooks as jest.Mock).mockReturnValue({
          type: booksActions.LOAD_BOOKS,
          data: bookDetailsMock
        });
        screen = render(<BookSearch navigation={navigation} isbnFromCamera="" />);
      });
      describe('And you stay on ISBN page', () => {
        test('Then should match the snapshot', () => {
          expect(screen).toMatchSnapshot();
        });

        describe('And you type on isbnInput', () => {
          test('Then the text typed should be rendered', () => {
            const isbnChange = '12345';
            const isbnInput = screen.getByTestId('isbnInput');
            fireEvent.changeText(isbnInput, isbnChange);

            expect(screen.queryByDisplayValue(isbnChange)).not.toBe(null);
          });
        });

        describe('And you click on serchButton', () => {
          describe('And isbn is not empty', () => {
            const isbnChange = '12345';
            beforeEach(() => {
              const isbnInput = screen.getByTestId('isbnInput');
              const searchButton = screen.getByTestId('searchButton');
              fireEvent.changeText(isbnInput, isbnChange);
              fireEvent.press(searchButton);
            });

            test('Then searchBooks should be called', () => {
              expect(searchBooks).toHaveBeenCalled();
            });

            test('Then navigation.push should have been called with BookResults and an object containing the isbn changed', () => {
              expect(navigation.push).toHaveBeenCalledWith('BookResults', {
                searchInformation: {
                  isbn: isbnChange,
                  inauthor: '',
                  intitle: '',
                  inpublisher: ''
                }
              });
            });
          });
          describe('And isbn is empty', () => {
            beforeEach(() => {
              const searchButton = screen.getByTestId('searchButton');
              fireEvent.press(searchButton);
            });

            test('Then searchBooks should have not been called', () => {
              expect(searchBooks).toHaveBeenCalled();
            });
          });
        });

        describe('And you click on isbnPageButton', () => {
          test('Then screen should not have changed', () => {
            const isbnPageButton = screen.getByTestId('isbnPageButton');
            fireEvent.press(isbnPageButton);
            expect(screen).toMatchSnapshot();
          });
        });
      });

      describe('And you change to Other page clicking otherPageButton', () => {
        beforeEach(() => {
          const otherPageButton = screen.getByTestId('otherPageButton');
          fireEvent.press(otherPageButton);
        });

        test('Then should match the snapshot', () => {
          expect(screen).toMatchSnapshot();
        });

        describe('And you type on authorInput', () => {
          test('Then the text typed should be rendered', () => {
            const authorChange = 'author';
            const authorInput = screen.getByTestId('authorInput');
            fireEvent.changeText(authorInput, authorChange);

            expect(screen.queryByDisplayValue(authorChange)).not.toBe(null);
          });
        });

        describe('And you type on titleInput', () => {
          test('Then the text typed should be rendered', () => {
            const titleChange = 'title';
            const titleInput = screen.getByTestId('titleInput');
            fireEvent.changeText(titleInput, titleChange);

            expect(screen.queryByDisplayValue(titleChange)).not.toBe(null);
          });
        });

        describe('And you type on publisherInput', () => {
          test('Then the text typed should be rendered', () => {
            const publisherChange = 'publisher';
            const publisherInput = screen.getByTestId('publisherInput');
            fireEvent.changeText(publisherInput, publisherChange);

            expect(screen.queryByDisplayValue(publisherChange)).not.toBe(null);
          });
        });

        describe('And you click on serchButton', () => {
          describe('And publisher is not empty', () => {
            const publisherChange = 'publisher';
            beforeEach(() => {
              const publisherInput = screen.getByTestId('publisherInput');
              const searchButton = screen.getByTestId('searchButton');
              fireEvent.changeText(publisherInput, publisherChange);
              fireEvent.press(searchButton);
            });

            test('Then searchBooks should be called', () => {
              expect(searchBooks).toHaveBeenCalled();
            });

            test('Then navigation.push should have been called with BookResults and an object containing the publisher typed', () => {
              expect(navigation.push).toHaveBeenCalledWith('BookResults', {
                searchInformation: {
                  isbn: '',
                  inauthor: '',
                  intitle: '',
                  inpublisher: publisherChange
                }
              });
            });
          });
        });

        describe('And you click on otherPageButton', () => {
          test('Then screen should not have changed', () => {
            const otherPageButton = screen.getByTestId('otherPageButton');
            fireEvent.press(otherPageButton);
            expect(screen).toMatchSnapshot();
          });
        });

        describe('And you click IsbnPageButton', () => {
          test('Then should match the snapshot', () => {
            const isbnPageButton = screen.getByTestId('isbnPageButton');
            fireEvent.press(isbnPageButton);
            expect(screen).toMatchSnapshot();
          });
        });
      });
    });

    describe('And isbnFromCamera has an isbn', () => {
      const isbnFromCamera = '1234';
      beforeEach(() => {
        (searchBooks as jest.Mock).mockReturnValue({
          type: booksActions.LOAD_BOOKS,
          data: bookDetailsMock
        });
        render(<BookSearch navigation={navigation} isbnFromCamera={isbnFromCamera} />);
      });
      test('Then searchBooks should be called', () => {
        expect(searchBooks).toHaveBeenCalled();
      });

      test('Then navigation.push should have been called with BookResults and an object containing the isbnFromCamera', () => {
        expect(navigation.push).toHaveBeenCalledWith('BookResults', {
          searchInformation: {
            isbn: isbnFromCamera,
            inauthor: '',
            intitle: '',
            inpublisher: ''
          }
        });
      });
    });
  });
});
