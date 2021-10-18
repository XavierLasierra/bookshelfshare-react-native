import React from 'react';
import UserElement from './UserElement';
import {render, fireEvent} from '../../utils/test.utils';
import userSocialsMock from '../../mocks/userSocials.mock';
import {
  addUserFollowing,
  deleteUserFollowing,
} from '../../redux/actions/loggedUser.creator';
import {loadCurrentUser} from '../../redux/actions/currentUser.creator';

jest.mock('../../redux/actions/loggedUser.creator');
jest.mock('../../redux/actions/currentUser.creator');

const navigation = {
  push: jest.fn(),
};

describe('Given a UserElement component', () => {
  describe('When it is rendered', () => {
    describe('And the current user is in following', () => {
      let screen: any;
      beforeEach(() => {
        (deleteUserFollowing as jest.Mock).mockReturnValue({type: ''});
        (loadCurrentUser as jest.Mock).mockReturnValue({type: ''});
        screen = render(
          <UserElement
            navigation={navigation}
            following={userSocialsMock.following}
            user={userSocialsMock.following[0]}
          />,
        );
      });
      test('Then should match the snapshot', () => {
        expect(screen).toMatchSnapshot();
      });

      describe('And deleteFollowingButton is clicked', () => {
        test('Then deleteUserFollowing should be called', () => {
          const deleteFollowingButton = screen.getByTestId(
            'deleteFollowingButton',
          );
          fireEvent.press(deleteFollowingButton);
          expect(deleteUserFollowing).toHaveBeenCalled();
        });
      });

      describe('And userDetailButton is clicked', () => {
        beforeEach(() => {
          const userDetailButton = screen.getByTestId('userDetailButton');
          fireEvent.press(userDetailButton);
        });
        test('Then loadCurrentUser should be called', () => {
          expect(loadCurrentUser).toHaveBeenCalled();
        });
        test('Then navigation.push should be called', () => {
          expect(navigation.push).toHaveBeenCalled();
        });
      });
    });

    describe('And the current user is not in following', () => {
      let screen: any;
      beforeEach(() => {
        (addUserFollowing as jest.Mock).mockReturnValue({type: ''});
        screen = render(
          <UserElement
            navigation={navigation}
            following={[]}
            user={userSocialsMock.following[0]}
          />,
        );
      });
      test('Then should match the snapshot', () => {
        expect(screen).toMatchSnapshot();
      });

      describe('And addFollowingButton is clicked', () => {
        test('Then addUserFollowing should be called', () => {
          const addFollowingButton = screen.getByTestId('addFollowingButton');
          fireEvent.press(addFollowingButton);
          expect(addUserFollowing).toHaveBeenCalled();
        });
      });
    });
  });
});
