import React from 'react';
import UserShelfList from './UserShelfList';
import {render, fireEvent} from '../../utils/test.utils';
import loggedUserMock from '../../mocks/loggedUser.mock';
import shelfMock from '../../mocks/shelf.mock';

const navigation = {
  push: jest.fn(),
};

describe('Given a UserShelfList component', () => {
  describe('When it is rendered', () => {
    let screen: any;
    beforeEach(() => {
      const initialState = {
        loggedUser: {userData: loggedUserMock.user},
        userShelves: [shelfMock],
      };
      screen = render(<UserShelfList navigation={navigation} />, initialState);
    });
    test('Then should match the snapshot', () => {
      expect(screen).toMatchSnapshot();
    });

    describe('And newShelfButton is pressed', () => {
      test('Then navigation.push should have been called', () => {
        const newShelfButton = screen.getByTestId('newShelfButton');
        fireEvent.press(newShelfButton);

        expect(navigation.push).toHaveBeenCalled();
      });
    });
  });
});
