import React from 'react';
import Following from './Following';
import {render, fireEvent} from '../../utils/test.utils';
import navigationMock from '../../mocks/navigation.mock';

describe('Given a Following component', () => {
  describe('When it is rendered', () => {
    let screen: any;
    let navigation: any;
    beforeEach(() => {
      navigation = {
        ...navigationMock,
        push: jest.fn(),
      };
      screen = render(<Following navigation={navigation} />);
    });

    test('Then should match the snapshot', () => {
      expect(screen).toMatchSnapshot();
    });

    describe('And you click followingUsersPageButton', () => {
      test('Then should call navigation.push with UsersList and parameters', () => {
        const followingUsersPageButton = screen.getByTestId(
          'followingUsersPageButton',
        );
        fireEvent.press(followingUsersPageButton);

        expect(navigation.push).toHaveBeenCalledWith('UsersList', {
          logo: 'FollowingIcon',
          followingPage: true,
        });
      });
    });
  });
});
