import { render, screen } from '@testing-library/react';
import App from './App';

test('renders "This is"', () => {
  render(<App />);
  const text = screen.getByText(/This is/i);
  expect(text).toBeInTheDocument();
});
