import { fireEvent, render, screen } from '@testing-library/react';
import { Toast, type ToastProps } from '../components/toast/toast';

describe('Toast component', () => {
  const defaultProps: ToastProps = {
    message: 'Test toast message',
    severity: 'error'
  };

  it('renders the toast with correct message and severity', async () => {
    render(<Toast {...defaultProps} />);

    const alert = await screen.findByText(/Test toast message/i);
    expect(alert).toBeInTheDocument();

    const alertRole = screen.getByRole('alert');
    expect(alertRole).toHaveTextContent('Test toast message');
  });

  it('calls onClose when close button is clicked', async () => {
    const onCloseMock = vi.fn();

    render(<Toast {...defaultProps} onClose={onCloseMock} />);

    const closeButton = await screen.findByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
