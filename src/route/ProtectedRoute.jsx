import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isUserLoggedIn = () => {
    return false;
  };

  return isUserLoggedIn() ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;