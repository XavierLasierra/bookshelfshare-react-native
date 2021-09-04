// test-utils.js
import { render } from '@testing-library/react-native';

const AllTheProviders = ({ children }: any) => (
  { children }
);

const customRender = (ui: any, options?: any) => render(ui, {
  wrapper: AllTheProviders,
  ...options
});

// re-export everything
export * from '@testing-library/react-native';

// override render method
export { customRender as render };
