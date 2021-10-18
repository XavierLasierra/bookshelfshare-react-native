import React from 'react';
import Profile from './Profile';
import {render, fireEvent} from '../../utils/test.utils';
import loggedUserMock from '../../mocks/loggedUser.mock';
import userBooksMock from '../../mocks/userBooks.mock';
import userSocialsMock from '../../mocks/userSocials.mock';
import {logoutUser} from '../../redux/actions/loggedUser.creator';
import {getBooksData} from '../../redux/actions/books.creator';
import navigationMock from '../../mocks/navigation.mock';

jest.mock('../../redux/actions/loggedUser.creator');
jest.mock('../../redux/actions/books.creator');

describe('Given a Profile component', () => {
  describe('When it is rendered', () => {
    describe('And the user has no followers', () => {
      test('Then should match the snapshot', () => {
        const initialState = {
          loggedUser: {userData: loggedUserMock.user},
          userBooks: userBooksMock,
        };
        const screen = render(
          <Profile navigation={navigationMock} />,
          initialState,
        );
        expect(screen).toMatchSnapshot();
      });
    });

    describe('And the user has exactly 1 follower', () => {
      let screen: any;
      let navigation: any;
      beforeEach(() => {
        (logoutUser as jest.Mock).mockReturnValue({type: ''});
        (getBooksData as jest.Mock).mockReturnValue({type: ''});

        const initialState = {
          loggedUser: {userData: loggedUserMock.user},
          userBooks: userBooksMock,
          userSocials: userSocialsMock,
        };
        navigation = {
          ...navigationMock,
          push: jest.fn(),
        };
        screen = render(<Profile navigation={navigation} />, initialState);
      });
      test('Then should match the snapshot', () => {
        expect(screen).toMatchSnapshot();
      });

      describe('And you press followersButton', () => {
        test('Then navigation.push should have been called', () => {
          const followersButton = screen.getByTestId('followersButton');
          fireEvent.press(followersButton);

          expect(navigation.push).toHaveBeenCalled();
        });
      });

      describe('And you press followingButton', () => {
        test('Then navigation.push should have been called', () => {
          const followingButton = screen.getByTestId('followingButton');
          fireEvent.press(followingButton);

          expect(navigation.push).toHaveBeenCalled();
        });
      });

      describe('And you press logoutButton', () => {
        test('Then logoutUser function should have been called', () => {
          const logoutButton = screen.getByTestId('logoutButton');
          fireEvent.press(logoutButton);

          expect(logoutUser).toHaveBeenCalled();
        });
      });

      describe('And you click in one of the books lists', () => {
        beforeEach(() => {
          const bookListButton = screen.getByTestId('readButton');
          fireEvent.press(bookListButton);
        });
        test('Then getBooksData should have been called', () => {
          expect(getBooksData).toHaveBeenCalled();
        });
        test('Then navigation.push should have been called', () => {
          expect(navigation.push).toHaveBeenCalled();
        });
      });
    });
  });
});
