import React from 'react';
import { render } from '@testing-library/react-native';
import { Provider } from 'react-redux';

import configureStore from '../redux/store';

const AllTheProviders = ({ children }: any) => (
  <Provider store={configureStore()}>
    { children }
  </Provider>
);

const customRender = (ui: any, options?: any) => render(ui, {
  wrapper: AllTheProviders,
  ...options
});

// re-export everything
export * from '@testing-library/react-native';

// override render method
export { customRender as render };
