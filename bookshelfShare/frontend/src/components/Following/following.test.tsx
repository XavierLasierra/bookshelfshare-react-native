import React from 'react';
import Following from './Following';
import { render, fireEvent } from '../../utils/test.utils';

const navigation = {
  push: jest.fn()
};

describe('Given a Following component', () => {
  describe('When it is rendered', () => {
    let screen: any;
    beforeEach(() => {
      screen = render(<Following navigation={navigation} />);
    });

    test('Then should match the snapshot', () => {
      expect(screen).toMatchSnapshot();
    });

    describe('And you click followingUsersPageButton', () => {
      test('Then should call navigation.push with UsersList and parameters', () => {
        const followingUsersPageButton = screen.getByTestId('followingUsersPageButton');
        fireEvent.press(followingUsersPageButton);

        expect(navigation.push).toHaveBeenCalledWith('UsersList', { logo: 'FollowingIcon', followingPage: true });
      });
    });
  });
});
