import { screen } from '@testing-library/react';
import { customRender } from '@shared/lib/utils.tests';
import { Footer } from '../Footer';

describe('Footer test', () => {
  test('renders elements', () => {
    customRender(<Footer />);
    screen.debug();
    const divElement = screen.getByText(/Catalog/i);
    const linkElements = screen.getAllByRole('link');
    expect(divElement).toBeInTheDocument();
    expect(linkElements).toHaveLength(4);
  });
  test('footer snapshot matches', () => {
    const { container } = customRender(<Footer />);
    expect(container).toMatchSnapshot();
  });
});
