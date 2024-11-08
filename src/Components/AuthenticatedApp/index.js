import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Routez from '../../Routes/routez';
import { setAuth } from '../../Redux/Actions/authActions';

const AuthenticatedApp = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated') === 'true';
    dispatch(setAuth(storedAuth));
  }, [dispatch]);

  return (
    <Routez isAuthenticated={isAuthenticated} />
  );
};

export default AuthenticatedApp;