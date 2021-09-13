import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import useAppState from '../state/useAppState';
import PageLoader from '../components/PageLoader';

export default function Logout() {
  const [shouldRedirect, setShouldRedirect] = useState(true);
  const { setToken, setUser } = useAppState();

  useEffect(() => {
    setToken(null);
    setUser(null);
    setTimeout(() => setShouldRedirect(true), 5000);
  }, []);

  if (shouldRedirect) return <Redirect to='/' />;

  return <PageLoader />;
}
