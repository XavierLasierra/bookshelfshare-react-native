import React from 'react';
import UsersList from './UsersList';
import {render, fireEvent} from '../../utils/test.utils';
import loggedUserMock from '../../mocks/loggedUser.mock';
import userListMock from '../../mocks/userList.mock';
import userSocialsMock from '../../mocks/userSocials.mock';
import {getUsers} from '../../redux/actions/usersList.creator';
import usersListActions from '../../redux/actions/usersList.actions';

jest.mock('../../redux/actions/usersList.creator', () => ({
  ...jest.requireActual('../../redux/actions/usersList.creator'),
  getUsers: jest.fn(),
}));

const navigation = {};

const route = {
  params: {
    logo: '',
    followingPage: true,
  },
};

describe('Given a UsersList component', () => {
  describe('When it is rendered', () => {
    describe('And userList results is false', () => {
      test('Then should match the snapshot', () => {
        const initialState = {
          loggedUser: {userData: loggedUserMock.user},
          usersList: {users: userListMock, results: false},
          userSocials: userSocialsMock,
        };
        const screen = render(
          <UsersList navigation={navigation} route={route} />,
          initialState,
        );
        expect(screen).toMatchSnapshot();
      });
    });

    describe('And userList results is true', () => {
      describe('And there are no users', () => {
        test('Then should match the snapshot', () => {
          const initialState = {
            loggedUser: {userData: loggedUserMock.user},
            usersList: {users: [], results: true},
            userSocials: userSocialsMock,
          };
          const screen = render(
            <UsersList navigation={navigation} route={route} />,
            initialState,
          );
          expect(screen).toMatchSnapshot();
        });
      });

      describe('And there are users', () => {
        let screen: any;
        beforeEach(() => {
          (getUsers as jest.Mock).mockReturnValue({type: ''});
          const initialState = {
            loggedUser: {userData: loggedUserMock.user},
            usersList: {users: userListMock, results: true},
            userSocials: userSocialsMock,
          };
          screen = render(
            <UsersList navigation={navigation} route={route} />,
            initialState,
          );
        });
        test('Then should match the snapshot', () => {
          expect(screen).toMatchSnapshot();
        });

        describe('And you type on searchInput', () => {
          const typedValue = 'searchThis';
          beforeEach(() => {
            const searchInput = screen.getByTestId('searchInput');
            fireEvent.changeText(searchInput, typedValue);
          });
          test('Then the value typed should be rendered', () => {
            expect(screen.queryByDisplayValue(typedValue)).not.toBe(null);
          });

          describe('And you press searchButton', () => {
            beforeEach(() => {
              const searchButton = screen.getByTestId('searchButton');
              fireEvent.press(searchButton);
            });
            test('Then getUsers should have been called', () => {
              expect(getUsers).toHaveBeenCalled();
            });

            describe('And searchResults are loading', () => {
              test('Then should render an Activity indicator with testID activityIndicator', () => {
                expect(screen.queryByTestId('activityIndicator')).not.toBe(
                  null,
                );
              });
            });

            describe('And searchResults are loaded', () => {
              beforeEach(() => {
                (getUsers as jest.Mock).mockReturnValue({
                  type: usersListActions.LOAD_USERS_LIST,
                  data: userListMock.splice(0, 1),
                });
                const initialState = {
                  loggedUser: {userData: loggedUserMock.user},
                  usersList: {users: userListMock, results: true},
                  userSocials: userSocialsMock,
                };
                screen = render(
                  <UsersList navigation={navigation} route={route} />,
                  initialState,
                );

                const searchInput = screen.getByTestId('searchInput');
                fireEvent.changeText(searchInput, typedValue);
                const searchButton = screen.getByTestId('searchButton');
                fireEvent.press(searchButton);
              });
              test('Then should render a button with testID clearSearchButton', () => {
                expect(screen.queryByTestId('clearSearchButton')).not.toBe(
                  null,
                );
              });

              describe('And you press searchButton with searchInput empty', () => {
                test('Then should match the snapshot', () => {
                  const searchInput = screen.getByTestId('searchInput');
                  fireEvent.changeText(searchInput, '');
                  const searchButton = screen.getByTestId('searchButton');
                  fireEvent.press(searchButton);

                  expect(screen).toMatchSnapshot();
                });
              });

              describe('And you press clearSearchButton', () => {
                test('Then should match the snapshot', () => {
                  const clearSearchButton =
                    screen.getByTestId('clearSearchButton');
                  fireEvent.press(clearSearchButton);

                  expect(screen).toMatchSnapshot();
                });
              });
            });
          });
        });
      });
    });
  });
});
