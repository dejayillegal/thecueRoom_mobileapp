import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App';

describe('App', () => {
  it('renders the NavigationContainer', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('nav-root')).toBeTruthy();
  });
});
