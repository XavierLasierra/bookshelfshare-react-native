import React from 'react';
import BookResults from './BookResults';
import {render} from '../../utils/test.utils';
import bookDetailsMock from '../../mocks/bookDetails.mock';
import navigationMock from '../../mocks/navigation.mock';

describe('Given a BookResults component', () => {
  describe('When it is rendered', () => {
    describe('And book results are loading searching by isbn', () => {
      const route = {
        params: {
          searchInformation: {
            isbn: '1',
            inauthor: '',
            intitle: '',
            inpublisher: '',
          },
          logo: 'logo',
        },
      };
      test('Then should match the snapshot', () => {
        const screen = render(
          <BookResults navigation={navigationMock} route={route} />,
        );
        expect(screen).toMatchSnapshot();
      });
    });
    describe('And there are no book results searching by author and publisher', () => {
      const route = {
        params: {
          searchInformation: {
            isbn: '',
            inauthor: 'author',
            intitle: '',
            inpublisher: 'publisher',
          },
          logo: 'logo',
        },
      };
      test('Then should match the snapshot', () => {
        const initialState = {
          books: {
            books: [],
            results: true,
          },
        };
        const screen = render(
          <BookResults navigation={navigationMock} route={route} />,
          initialState,
        );
        expect(screen).toMatchSnapshot();
      });
    });

    describe('And there are book results searching by author, title and publisher', () => {
      const route = {
        params: {
          searchInformation: {
            isbn: '',
            inauthor: 'author',
            intitle: 'title',
            inpublisher: 'publisher',
          },
          logo: 'logo',
        },
      };
      test('Then should match the snapshot', () => {
        const initialState = {
          books: {
            books: bookDetailsMock,
            results: true,
          },
        };
        const screen = render(
          <BookResults navigation={navigationMock} route={route} />,
          initialState,
        );
        expect(screen).toMatchSnapshot();
      });
    });

    describe('And listName is not undefined', () => {
      const route = {
        params: {
          searchInformation: {
            isbn: '',
            inauthor: 'author',
            intitle: 'title',
            inpublisher: 'publisher',
          },
          logo: 'logo',
          listName: 'my list',
        },
      };
      test('Then should match the snapshot', () => {
        const initialState = {
          books: {
            books: bookDetailsMock,
            results: true,
          },
        };
        const screen = render(
          <BookResults navigation={navigationMock} route={route} />,
          initialState,
        );
        expect(screen).toMatchSnapshot();
      });
    });
  });
});
