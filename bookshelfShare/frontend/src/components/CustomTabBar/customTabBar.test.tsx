import React from 'react';
import {MenuProvider} from 'react-native-popup-menu';
import CustomTabBar from './CustomTabBar';
import {render, fireEvent} from '../../utils/test.utils';
import navigationMock from '../../mocks/navigation.mock';

describe('Given a CustomTabBar component', () => {
  describe('When it is rendered', () => {
    [0, 1, 2, 3].forEach(index => {
      describe(`And state.index is ${index}`, () => {
        const state = {
          routes: [{key: 0}, {key: 1}, {key: 2}, {key: 3}],
          index,
        };
        test('Then should match the snapshot', () => {
          const screen = render(
            <MenuProvider>
              <CustomTabBar state={state} navigation={navigationMock} />
            </MenuProvider>,
          );
          expect(screen).toMatchSnapshot();
        });
      });
    });

    describe('And you press on homeButton which is currently focused', () => {
      const state = {
        routes: [{key: 0}, {key: 1}, {key: 2}, {key: 3}],
        index: 0,
      };
      let screen;
      let navigation: any;
      beforeEach(() => {
        navigation = {
          ...navigationMock,
          emit: jest.fn().mockReturnValue({defaultPrevented: false}),
          navigate: jest.fn(),
        };
        screen = render(
          <MenuProvider>
            <CustomTabBar state={state} navigation={navigation} />
          </MenuProvider>,
        );
        const button = screen.getByTestId('homeButton');
        fireEvent.press(button);
      });

      test('Then should call navigation.emit', () => {
        expect(navigation.emit).toHaveBeenCalled();
      });

      test('Then should not call navigation.navigate', () => {
        expect(navigation.navigate).not.toHaveBeenCalled();
      });
    });

    ['followingButton', 'shelfButton', 'profileButton'].forEach(buttonName => {
      describe(`And you press on ${buttonName}`, () => {
        const state = {
          routes: [{key: 0}, {key: 1}, {key: 2}, {key: 3}],
          index: 0,
        };
        let screen;
        let navigation: any;
        beforeEach(() => {
          navigation = {
            ...navigationMock,
            emit: jest.fn().mockReturnValue({defaultPrevented: false}),
            navigate: jest.fn(),
          };
          screen = render(
            <MenuProvider>
              <CustomTabBar state={state} navigation={navigation} />
            </MenuProvider>,
          );
          const button = screen.getByTestId(buttonName);
          fireEvent.press(button);
        });

        test('Then should call navigation.emit', () => {
          expect(navigation.emit).toHaveBeenCalled();
        });

        test('Then should call navigation.navigate', () => {
          expect(navigation.navigate).toHaveBeenCalled();
        });
      });
    });

    ['homeButton', 'followingButton', 'shelfButton', 'profileButton'].forEach(
      buttonName => {
        describe(`And you long press on ${buttonName}`, () => {
          const state = {
            routes: [{key: 0}, {key: 1}, {key: 2}, {key: 3}],
            index: 0,
          };

          test('Then should call navigation.emit', () => {
            const navigation = {
              ...navigationMock,
              emit: jest.fn().mockReturnValue({defaultPrevented: false}),
              navigate: jest.fn(),
            };
            const screen = render(
              <MenuProvider>
                <CustomTabBar state={state} navigation={navigation} />
              </MenuProvider>,
            );
            const button = screen.getByTestId(buttonName);
            fireEvent(button, 'longPress');
            expect(navigation.emit).toHaveBeenCalled();
          });
        });
      },
    );
  });
});
