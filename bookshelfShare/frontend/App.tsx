import React from 'react';
import { Provider } from 'react-redux';

import WelcomePage from './src/pages/WelcomePage/WelcomePage';

import configureStore from './src/redux/store';

export default function App() {
  return (
    <Provider store={configureStore()}>
      <WelcomePage />
    </Provider>
  );
}
