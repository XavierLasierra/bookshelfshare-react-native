import React from 'react';
import OtherUserProfile from './OtherUserProfile';
import {render, fireEvent} from '../../utils/test.utils';
import loggedUserMock from '../../mocks/loggedUser.mock';
import userSocialsMock from '../../mocks/userSocials.mock';
import currentUserMock from '../../mocks/currentUser.mock';
import {
  addUserFollowing,
  deleteUserFollowing,
} from '../../redux/actions/loggedUser.creator';
import {getBooksData} from '../../redux/actions/books.creator';
import loggedUserActions from '../../redux/actions/loggedUser.actions';
import navigationMock from '../../mocks/navigation.mock';

jest.mock('../../redux/actions/loggedUser.creator');
jest.mock('../../redux/actions/books.creator');

describe('Given a OtherUserProfile component', () => {
  describe('When it is rendered', () => {
    const route = {
      params: {
        logo: '',
      },
    };
    describe('And currentUser is loading', () => {
      test('Then should match the snapshot', () => {
        const initialState = {
          loggedUser: {userData: loggedUserMock.user},
        };
        const screen = render(
          <OtherUserProfile navigation={navigationMock} route={route} />,
          initialState,
        );
        expect(screen).toMatchSnapshot();
      });
    });

    describe('And currentUser is not followed / following you', () => {
      let screen: any;
      let navigation: any;
      beforeEach(() => {
        (addUserFollowing as jest.Mock).mockReturnValue({
          type: loggedUserActions.UPDATE_USER_FOLLOWING,
          data: [...userSocialsMock.following, {_id: '2'}],
        });
        (getBooksData as jest.Mock).mockReturnValue({type: ''});
        navigation = {
          ...navigationMock,
          push: jest.fn(),
        };

        const initialState = {
          loggedUser: {userData: loggedUserMock.user},
          userSocials: userSocialsMock,
          currentUser: currentUserMock[0],
        };
        screen = render(
          <OtherUserProfile navigation={navigation} route={route} />,
          initialState,
        );
      });
      test('Then should match the snapshot', () => {
        expect(screen).toMatchSnapshot();
      });
      describe('And you click on addFollowingButton', () => {
        beforeEach(() => {
          const addFollowingButton = screen.getByTestId('addFollowingButton');
          fireEvent.press(addFollowingButton);
        });

        test('Then addUserFollowing should have been called', () => {
          expect(addUserFollowing).toHaveBeenCalled();
        });

        test('Then a button with testId deleteFollowingButton should be rendered', () => {
          expect(screen.queryByTestId('deleteFollowingButton')).not.toBe(null);
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

    describe('And currentUser is followed / following you', () => {
      let screen: any;
      beforeEach(() => {
        (deleteUserFollowing as jest.Mock).mockReturnValue({
          type: loggedUserActions.UPDATE_USER_FOLLOWING,
          data: userSocialsMock.following.filter(({_id}) => _id === '3'),
        });
        const initialState = {
          loggedUser: {userData: loggedUserMock.user},
          userSocials: userSocialsMock,
          currentUser: currentUserMock[1],
        };
        screen = render(
          <OtherUserProfile navigation={navigationMock} route={route} />,
          initialState,
        );
      });
      test('Then should match the snapshot', () => {
        expect(screen).toMatchSnapshot();
      });
      describe('And you click on deleteFollowingButton', () => {
        test('Then deleteUserFollowing should have been called', () => {
          const deleteFollowingButton = screen.getByTestId(
            'deleteFollowingButton',
          );
          fireEvent.press(deleteFollowingButton);

          expect(deleteUserFollowing).toHaveBeenCalled();
        });
      });
    });
  });
});
