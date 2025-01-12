import { FC } from 'react';
import { ROOT } from '@constants/routes';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Header from '../Header';
import Root from '@pages/Root';
import NotFound from '@pages/NotFound';

const Layout: FC = () => (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path={ROOT} element={<Root />} />

      <Route path='*' element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default Layout;
