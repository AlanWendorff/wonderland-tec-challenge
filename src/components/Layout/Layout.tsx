import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { MINT, ROOT, TRANSFER } from '@constants/routes';
import { FC } from 'react';
import PrivateRoute from '@components/PrivateRoute';
import useNetwork from '@hooks/useNetwork';
import NotFound from '@pages/NotFound';
import Transfer from '@pages/Transfer';
import Header from '../Header';
import Root from '@pages/Root';
import Mint from '@pages/Mint';

const Layout: FC = () => {
  useNetwork();

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={ROOT} element={<Root />} />

        <Route element={<PrivateRoute />}>
          <Route path={MINT} element={<Mint />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path={TRANSFER} element={<Transfer />} />
        </Route>

        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Layout;
