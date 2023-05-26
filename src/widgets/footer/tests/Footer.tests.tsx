import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { customRender } from '@shared/lib/utils.tests';
import { Footer } from '../Footer';

test('renders title', () => {
  customRender(<Footer />);
  const divElement = screen.getByText(/Catalog/i);
  const linkElements = screen.getAllByRole('link');
  expect(divElement).toBeInTheDocument();
  expect(linkElements).toHaveLength(4);
  const { container } = customRender(<Footer />);
  expect(container).toMatchSnapshot();
});
