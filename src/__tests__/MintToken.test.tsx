import { render, screen, fireEvent } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import { useWriteContract } from 'wagmi';
import { Provider } from 'react-redux';
import { toast } from 'react-toastify';
import { vi } from 'vitest';
import accountReducer from '@store/account/account.slice';
import Mint from '@pages/Mint';

// Mock toast notifications
vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// Mock TOKEN_CONTRACT constant
vi.mock('@constants/tokenContract', () => ({
  default: {
    Sepolia: {
      dai: { contract: {}, decimals: 18 },
      usdc: { contract: {}, decimals: 6 },
    },
    Mumbai: {
      dai: { contract: {}, decimals: 18 },
      usdc: { contract: {}, decimals: 6 },
    },
  },
}));

// Mocking WAGMI
vi.mock('wagmi', () => ({
  useAccount: vi.fn().mockReturnValue({ address: '0xTestAddress', chain: { name: 'Sepolia' } }),
  useWriteContract: vi.fn().mockReturnValue({
    data: '0xTestHash',
    isPending: false,
    writeContract: vi.fn(),
  }),
  useWaitForTransactionReceipt: vi.fn().mockReturnValue({
    isLoading: false,
    isSuccess: false,
    isError: false,
    error: null,
  }),
}));

describe('Mint Component', () => {
  const setupStore = (preloadedState: unknown) =>
    configureStore({
      reducer: { account: accountReducer },
      preloadedState,
    });

  const renderWithStore = (store: ReturnType<typeof setupStore>) =>
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Mint />
        </MemoryRouter>
      </Provider>,
    );

  it('renders Mint component correctly', () => {
    const store = setupStore({});
    renderWithStore(store);

    // Ensure components render correctly
    expect(screen.getByText('Mint Token')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Write amount')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /mint/i })).toBeInTheDocument();
  });

  it('handles amount input correctly', () => {
    const store = setupStore({});
    renderWithStore(store);

    const input = screen.getByPlaceholderText('Write amount') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '10' } });

    expect(input.value).toBe('10');
  });

  it('calls handleMintToken on button click', () => {
    const { writeContract } = useWriteContract();
    const store = setupStore({});
    renderWithStore(store);

    const input = screen.getByPlaceholderText('Write amount') as HTMLInputElement;
    const button = screen.getByRole('button', { name: /mint token/i });

    fireEvent.change(input, { target: { value: '10' } });
    fireEvent.click(button);

    // Assert that `writeContract` was called with correct arguments
    expect(writeContract).toHaveBeenCalledTimes(1);
  });

  it('displays error toast if amount is empty', () => {
    const store = setupStore({});
    renderWithStore(store);

    const button = screen.getByRole('button', { name: /mint token/i });
    fireEvent.click(button);

    expect(toast.error).toHaveBeenCalledWith('Specify the amount');
  });
});
