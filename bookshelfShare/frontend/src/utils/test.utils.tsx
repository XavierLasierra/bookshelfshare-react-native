import React from 'react';
import { render as rtlRender } from '@testing-library/react-native';
import { Provider } from 'react-redux';

import configureStore from '../redux/store';

function render(
  component: any,
  initialState: any
) {
  const store = configureStore(initialState);

  function Wrapper({ children }: any) {
    return (
      <Provider store={store}>
        {children}
      </Provider>
    );
  }
  return rtlRender(component, { wrapper: Wrapper });
}

// re-export everything
export * from '@testing-library/react-native';
// override render method
export { render };
