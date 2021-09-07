import React from 'react';
import { render } from '@testing-library/react-native';
import { Provider } from 'react-redux';

import configureStore from '../redux/store';

const customRender = (ui: any, initialState?: any, options?: any) => {
  const AllTheProviders = ({ children }: any) => (
    <Provider store={configureStore(initialState)}>
      { children }
    </Provider>
  );

  return render(ui, {
    wrapper: AllTheProviders,
    ...options
  });
};

// re-export everything
export * from '@testing-library/react-native';

// override render method
export { customRender as render };
