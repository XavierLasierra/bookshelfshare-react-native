import React from 'react';
import Login from './Login';
import { render, fireEvent } from '../../utils/test.utils';
import { loginUser } from '../../redux/actions/loggedUser.creator';
import notificationsActions from '../../redux/actions/notifications.actions';

const navigation = {
  push: jest.fn()
};

jest.mock('../../redux/actions/loggedUser.creator', () => ({
  loginUser: jest.fn()
}));

describe('Given a Login component', () => {
  describe('When it is rendered', () => {
    let screen: any;
    beforeEach(() => {
      screen = render(<Login navigation={navigation} />);
    });
    test('Then should match the snapshot', () => {
      const login = render(<Login navigation={navigation} />);
      expect(login).toMatchSnapshot();
    });

    describe('And email input text is changed', () => {
      test('Then the text typed should be rendered', () => {
        const emailInput = screen.getByTestId('emailInput');
        fireEvent(emailInput, 'focus');
        fireEvent.changeText(emailInput, 'email@email.com');
        expect(screen.queryByDisplayValue(/email@email.com/i)).not.toBe(null);
      });
    });

    describe('And password input text is changed', () => {
      test('Then the password typed should be rendered', () => {
        const passwordInput = screen.getByTestId('passwordInput');
        fireEvent(passwordInput, 'focus');
        fireEvent.changeText(passwordInput, 'mypassword');
        expect(screen.queryByDisplayValue(/mypassword/i)).not.toBe(null);
      });
    });

    describe('And login button is clicked', () => {
      describe('And the email is invalid', () => {
        beforeEach(() => {
          const loginButton = screen.getByTestId('loginButton');
          fireEvent.press(loginButton);
        });
        test('Then should render a Text with testID invalidEmail', () => {
          expect(screen.queryByTestId('invalidEmail')).not.toBe(null);
        });

        describe('And if after rendering invalidEmail you focus on email input', () => {
          test('Then should not render a Text with testId invalidEmail', () => {
            const emailInput = screen.getByTestId('emailInput');
            fireEvent(emailInput, 'focus');
            expect(screen.queryAllByTestId('invalidEmail').length).toBe(0);
          });
        });
      });

      describe('And the email is valid but the password is not', () => {
        beforeEach(() => {
          const emailInput = screen.getByTestId('emailInput');
          const loginButton = screen.getByTestId('loginButton');
          fireEvent.changeText(emailInput, 'email@email.com');
          fireEvent.press(loginButton);
        });

        test('Then should render a Text with testID invalidPassword', () => {
          expect(screen.queryByTestId('invalidPassword')).not.toBe(null);
        });

        describe('And if after rendering invalidPassword you focus on password input', () => {
          test('Then should not render a Text with testId invalidPassword', () => {
            const passwordInput = screen.getByTestId('passwordInput');
            fireEvent(passwordInput, 'focus');
            expect(screen.queryAllByTestId('invalidPassword').length).toBe(0);
          });
        });
      });

      describe('And the email and the password are valid', () => {
        describe('And the request isLoading', () => {
          beforeEach(() => {
            (loginUser as jest.Mock).mockReturnValue({
              type: ''
            });

            const emailInput = screen.getByTestId('emailInput');
            const passwordInput = screen.getByTestId('passwordInput');
            const loginButton = screen.getByTestId('loginButton');
            fireEvent.changeText(emailInput, 'email@email.com');
            fireEvent.changeText(passwordInput, 'myPassword');
            fireEvent.press(loginButton);
          });

          test('Then loginUser function should have been called', () => {
            expect((loginUser as jest.Mock)).toHaveBeenCalled();
          });

          test('Then loadingIndicator should be rendered', () => {
            expect(screen.queryByTestId('loadingIndicator')).not.toBe(null);
          });

          describe('And you click again while is loading', () => {
            test('Then loginUser should have not been called', () => {
              (loginUser as jest.Mock).mockClear();
              (loginUser as jest.Mock).mockReturnValue({
                type: ''
              });

              const loginButton = screen.getByTestId('loginButton');
              fireEvent.press(loginButton);
              expect((loginUser as jest.Mock).mock.calls.length).toBe(0);
            });
          });
        });

        describe('And the request is resolved (notification is sent)', () => {
          test('Then loadingIndicator should not be rendered', () => {
            (loginUser as jest.Mock).mockReturnValue({
              type: notificationsActions.LOGIN_ERROR
            });

            const emailInput = screen.getByTestId('emailInput');
            const passwordInput = screen.getByTestId('passwordInput');
            const loginButton = screen.getByTestId('loginButton');
            fireEvent.changeText(emailInput, 'email@email.com');
            fireEvent.changeText(passwordInput, 'myPassword');
            fireEvent.press(loginButton);

            expect(screen.queryByTestId('loadingIndicator')).toBe(null);
          });
        });
      });
    });

    describe('And sign up button is clicked', () => {
      test('Then navigation.push should have been called with Register', () => {
        const signUpButton = screen.getByTestId('signUpButton');
        fireEvent.press(signUpButton);
        expect(navigation.push).toHaveBeenCalledWith('Register');
      });
    });
  });
});
