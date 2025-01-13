import { setAddress, setIsWalletConnected } from '@store/account/account.slice';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { CONFIG } from '../../config/rainbowkit.config';
import { MINT, ROOT } from '@constants/routes';
import { watchAccount } from 'wagmi/actions';
import { useDispatch } from 'react-redux';
import { FC, useEffect } from 'react';
import { Address } from 'viem';
import NotFound from '@pages/NotFound';
import Header from '../Header';
import Root from '@pages/Root';
import Mint from '@pages/Mint';
import PrivateRoute from '@components/PrivateRoute';

const Layout: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const watch = watchAccount(CONFIG, {
      onChange(data) {
        const { address } = data;

        dispatch(setAddress(address as Address));
        dispatch(setIsWalletConnected(address ? true : false));
      },
    });

    return () => watch();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={ROOT} element={<Root />} />

        <Route element={<PrivateRoute />}>
          <Route path={MINT} element={<Mint />} />
        </Route>

        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Layout;
