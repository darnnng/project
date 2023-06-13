import { screen, waitFor } from '@testing-library/react';
import { customRender } from '@shared/lib/utils.tests';
import { Footer } from '../ui/Footer';

describe('Footer test', () => {
  test('renders elements', async () => {
    customRender(<Footer />);
    screen.debug();
    await waitFor(() => {
      expect(screen.getByText(/Catalog/i)).toBeInTheDocument();
    });
    const linkElements = screen.getAllByRole('link');
    expect(linkElements).toHaveLength(4);
  });

  test('footer snapshot matches', async () => {
    await waitFor(() => {
      const { container } = customRender(<Footer />);
      expect(container).toMatchSnapshot();
    });
  });
});
