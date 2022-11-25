import { Navigate, RouteProps } from 'react-router-dom';

interface PropsChild {
  children?: any
  // any props that come into the component
}

export const PrivateRoute = ({children } : PropsChild) => {
  return false ? children : <Navigate to='/login'/>;
};
