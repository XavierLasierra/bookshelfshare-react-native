import React from 'react';
import Register from './Register';
import { render, fireEvent } from '../../utils/test.utils';
import { registerUser } from '../../redux/actions/loggedUser.creator';

jest.mock('../../redux/actions/loggedUser.creator', () => ({
  registerUser: jest.fn()
}));

const navigation = {
  pop: jest.fn()
};

describe('Given a Register component', () => {
  describe('When it is rendered', () => {
    let screen: any;
    beforeEach(() => {
      screen = render(<Register navigation={navigation} />);
    });
    test('Then screen should match the snapshot', () => {
      expect(screen).toMatchSnapshot();
    });

    describe('And you click on loginPageButton', () => {
      test('Then navigation.pop should have been called', () => {
        const loginPageButton = screen.getByTestId('loginPageButton');
        fireEvent.press(loginPageButton);
        expect(navigation.pop).toHaveBeenCalled();
      });
    });

    describe('And usernameInput is empty', () => {
      describe('And you click registerButton', () => {
        beforeEach(() => {
          const registerButton = screen.getByTestId('registerButton');
          fireEvent.press(registerButton);
        });

        test('Then should render a Text with testId invalidUsername', () => {
          expect(screen.queryByTestId('invalidUsername')).not.toBe(null);
        });

        describe('And you focus on emailInput', () => {
          test('Then should not render a Text with testId invalidUsername', () => {
            const usernameInput = screen.getByTestId('usernameInput');
            fireEvent(usernameInput, 'focus');
            expect(screen.queryByTestId('invalidUsername')).toBe(null);
          });
        });
      });
    });

    describe('And username is valid but email is not', () => {
      describe('And you click registerButton', () => {
        beforeEach(() => {
          const usernameInput = screen.getByTestId('usernameInput');
          fireEvent(usernameInput, 'focus');
          fireEvent.changeText(usernameInput, 'Juan');
          const registerButton = screen.getByTestId('registerButton');
          fireEvent.press(registerButton);
        });

        test('Then should render a Text with testId invalidEmail', () => {
          expect(screen.queryByTestId('invalidEmail')).not.toBe(null);
        });

        describe('And you focus on emailInput', () => {
          test('Then should not render a Text with testId invalidEmail', () => {
            const emailInput = screen.getByTestId('emailInput');
            fireEvent(emailInput, 'focus');
            expect(screen.queryByTestId('invalidEmail')).toBe(null);
          });
        });
      });
    });

    describe('And username, email are valid but email is not', () => {
      describe('And you click registerButton', () => {
        beforeEach(() => {
          const usernameInput = screen.getByTestId('usernameInput');
          const emailInput = screen.getByTestId('emailInput');
          fireEvent.changeText(usernameInput, 'Juan');
          fireEvent(emailInput, 'focus');
          fireEvent.changeText(emailInput, 'juan@email.com');
          const registerButton = screen.getByTestId('registerButton');
          fireEvent.press(registerButton);
        });

        test('Then should render a Text with testId invalidPassword', () => {
          expect(screen.queryByTestId('invalidPassword')).not.toBe(null);
        });

        describe('And you focus on passwordInput', () => {
          test('Then should not render a Text with testId invalidPassword', () => {
            const passwordInput = screen.getByTestId('passwordInput');
            fireEvent(passwordInput, 'focus');
            expect(screen.queryByTestId('invalidPassword')).toBe(null);
          });
        });
      });
    });

    describe('And username, email, password are valid but passwordRepeat is not', () => {
      describe('And you click registerButton', () => {
        beforeEach(() => {
          const usernameInput = screen.getByTestId('usernameInput');
          const emailInput = screen.getByTestId('emailInput');
          const passwordInput = screen.getByTestId('passwordInput');
          fireEvent.changeText(usernameInput, 'Juan');
          fireEvent.changeText(emailInput, 'juan@email.com');
          fireEvent(passwordInput, 'focus');
          fireEvent.changeText(passwordInput, 'Aa111111');
          const registerButton = screen.getByTestId('registerButton');
          fireEvent.press(registerButton);
        });

        test('Then should render a Text with testId invalidPasswordRepeat', () => {
          expect(screen.queryByTestId('invalidPasswordRepeat')).not.toBe(null);
        });

        describe('And you focus on passwordRepeatInput', () => {
          test('Then should not render a Text with testId invalidPasswordRepeat', () => {
            const passwordRepeatInput = screen.getByTestId('passwordRepeatInput');
            fireEvent(passwordRepeatInput, 'focus');
            expect(screen.queryByTestId('invalidPasswordRepeat')).toBe(null);
          });
        });
      });
    });

    describe('And username, email, password, repeatPassword are valid', () => {
      describe('And you click registerButton', () => {
        const username = 'Juan';
        const email = 'juan@email.com';
        const password = 'Aa111111';
        beforeEach(() => {
          (registerUser as jest.Mock).mockReturnValue({ type: '' });

          const usernameInput = screen.getByTestId('usernameInput');
          const emailInput = screen.getByTestId('emailInput');
          const passwordInput = screen.getByTestId('passwordInput');
          const passwordRepeatInput = screen.getByTestId('passwordRepeatInput');
          fireEvent.changeText(usernameInput, username);
          fireEvent.changeText(emailInput, email);
          fireEvent.changeText(passwordInput, password);
          fireEvent(passwordRepeatInput, 'focus');
          fireEvent.changeText(passwordRepeatInput, password);
          const registerButton = screen.getByTestId('registerButton');
          fireEvent.press(registerButton);
        });

        test('Then should call registerUser with the username, email and password typed', () => {
          expect(registerUser).toHaveBeenCalledWith({ username, email, password });
        });

        test('Then should call navigation.pop', () => {
          expect(navigation.pop).toHaveBeenCalled();
        });
      });
    });
  });
});
