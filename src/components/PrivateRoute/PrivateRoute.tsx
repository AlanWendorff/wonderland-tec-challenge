import {
  selectIsCorrectNetwork,
  selectIsWalletConnected,
} from '../../store/account/account.selectors';
import { Navigate, Outlet, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ROOT } from '../../constants/routes';
import { FC } from 'react';

const PrivateRoute: FC<RouteProps> = () => {
  const isWalletConnected = useSelector(selectIsWalletConnected);
  const isCorrectNetwork = useSelector(selectIsCorrectNetwork);

  if (!isWalletConnected || !isCorrectNetwork) {
    return <Navigate to={ROOT} replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
