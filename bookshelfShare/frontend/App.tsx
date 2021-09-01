import React from 'react';
import { Provider } from 'react-redux';

import AuthenticationPage from './src/pages/AuthenticationPage/AuthenticationPage';

import configureStore from './src/redux/store';

export default function App() {
  return (
    <Provider store={configureStore()}>
      <AuthenticationPage />
    </Provider>
  );
}
