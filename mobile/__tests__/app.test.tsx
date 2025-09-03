import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App';

it('renders NavigationContainer and root screen', () => {
  const { getByTestId } = render(<App />);
  expect(getByTestId('nav-root')).toBeTruthy();
  expect(getByTestId('hello')).toBeTruthy();
});

