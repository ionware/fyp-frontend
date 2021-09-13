import React, { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Switch, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AppState, { getState, saveToAppState } from './state/app';
/**
 * Import styles.
 */
import 'react-toastify/dist/ReactToastify.css';
import './css/style.scss';
/**
 * Import charts.
 */
import { focusHandling } from 'cruip-js-toolkit';
import './charts/ChartjsConfig';
// Import pages.
import Dashboard from './pages/Dashboard';
import Login from './pages/login';
import Logout from './pages/Logout';

const queryClient = new QueryClient();

function App() {
  const location = useLocation();
  const savedState = getState();
  const [token, setToken] = useState(savedState?.token || null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto';
    window.scroll({ top: 0 });
    document.querySelector('html').style.scrollBehavior = '';
    focusHandling('outline');
  }, [location.pathname]); // triggered on route change

  useEffect(() => {
    saveToAppState({ user, token });
  }, [user, token]);

  return (
    <AppState.Provider value={{ token, setToken, user, setUser }}>
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        <Switch>
          <Route exact path='/'>
            <Login />
          </Route>
          <Route exact path='/dashboard'>
            <Dashboard />
          </Route>
          <Route exact path='/logout'>
            <Logout />
          </Route>
        </Switch>
      </QueryClientProvider>
    </AppState.Provider>
  );
}

export default App;
