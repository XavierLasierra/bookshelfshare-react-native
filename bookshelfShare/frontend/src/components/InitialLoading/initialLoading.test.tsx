import React from 'react';
import InitialLoading from './InitialLoading';
import { render } from '../../utils/test.utils';

import { automaticLogin } from '../../redux/actions/loggedUser.creator';
import loggedUserActions from '../../redux/actions/loggedUser.actions';

jest.mock('../../redux/actions/loggedUser.creator', () => ({
  automaticLogin: jest.fn()
}));

const navigation = {
  push: jest.fn()
};

jest.useFakeTimers();

describe('Given a InitialLoading component', () => {
  describe('When it is rendered', () => {
    test('Then should match the snapshot', () => {
      (automaticLogin as jest.Mock).mockReturnValue({
        type: ''
      });
      const screen = render(<InitialLoading navigation={navigation} />);
      expect(screen).toMatchSnapshot();
    });

    describe('And user needs login', () => {
      test('Then navigation.push should have been called with Login', () => {
        (automaticLogin as jest.Mock).mockReturnValue({
          type: loggedUserActions.USER_NOT_LOGGED
        });
        render(<InitialLoading navigation={navigation} />);
        jest.runOnlyPendingTimers();

        expect(navigation.push).toHaveBeenCalledWith('Login');
      });
    });

    describe('And user needs Login when rendering the screen', () => {
      test('Then automaticLogin should not be called', () => {
        (automaticLogin as jest.Mock).mockClear();
        const initialState = { loggedUser: { needsLogin: true } };
        render(<InitialLoading navigation={navigation} />, initialState);

        expect(automaticLogin).not.toHaveBeenCalled();
      });
    });
  });
});
