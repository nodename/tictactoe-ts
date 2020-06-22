import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { current_db } from './hooks';

test('renders learn react link', () => {
  const { getByText } = render(<App db={current_db} />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
