import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App';

test('boots', () => {
  const { getByText } = render(<App />);
  expect(getByText(/Mobile \(Safe Boot\)/i)).toBeTruthy();
});
