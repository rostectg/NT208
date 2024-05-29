import React from 'react';
import { Navigate } from 'react-router';
import { useSelector } from 'react-redux';

function PrivateRoute({ children }) {
  const auth = useSelector((state) => state.user.auth)
  return auth ? children : <Navigate to="/login" />;
}

export default PrivateRoute;