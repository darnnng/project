import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Footer } from '../Footer';
import { customRender } from './utils.tests';

test('renders title', () => {
  customRender(<Footer />);
  const divElement = screen.getByText(/Catalog/i);
  const linkElements = screen.getAllByRole('link');
  expect(divElement).toBeInTheDocument();
  expect(linkElements).toHaveLength(4);
});
