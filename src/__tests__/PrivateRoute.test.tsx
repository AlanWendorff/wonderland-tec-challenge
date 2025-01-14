import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { ROOT } from '@constants/routes';
import { Provider } from 'react-redux';
import accountReducer from '@store/account/account.slice';
import PrivateRoute from '@components/PrivateRoute';

describe('PrivateRoute', () => {
  const setupStore = (preloadedState: unknown) =>
    configureStore({
      reducer: { account: accountReducer },
      preloadedState,
    });

  const renderWithRouterAndStore = (store: EnhancedStore, initialEntries: string[]) =>
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={initialEntries}>
          <Routes>
            <Route path={ROOT} element={<div>Root Page</div>} />
            <Route element={<PrivateRoute />}>
              <Route path='/protected-content' element={<div>Protected Content</div>} />
            </Route>
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

  it('redirects to the root route if the wallet is not connected', () => {
    const store = setupStore({
      account: {
        isWalletConnected: false,
        isCorrectNetwork: true,
      },
    });

    const { getByText } = renderWithRouterAndStore(store, ['/protected-content']);
    expect(getByText('Root Page')).toBeInTheDocument();
  });

  it('redirects to the root route if the network is incorrect', () => {
    const store = setupStore({
      account: {
        isWalletConnected: true,
        isCorrectNetwork: false,
      },
    });

    const { getByText } = renderWithRouterAndStore(store, ['/protected-content']);
    expect(getByText('Root Page')).toBeInTheDocument();
  });

  it('renders the content if the wallet is connected and the network is correct', () => {
    const store = setupStore({
      account: {
        isWalletConnected: true,
        isCorrectNetwork: true,
      },
    });

    const { getByText } = renderWithRouterAndStore(store, ['/protected-content']);
    expect(getByText('Protected Content')).toBeInTheDocument();
  });
});
