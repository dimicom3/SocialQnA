import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
//gray box testiranje; white->za svaku naredbu test; blackbox: client brute force testing;
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
