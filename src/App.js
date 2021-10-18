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
import ApiKey from './pages/ApiKey';
import Settings from './pages/Settings';
import Session from './pages/Session';
import Faculty from './pages/Faculty';
import Students from './pages/Students';
import Users from './pages/Users';
import Logout from './pages/Logout';

const queryClient = new QueryClient();

function App() {
  const location = useLocation();
  const savedState = getState();
  const [token, setToken] = useState(savedState?.token || null);
  const [user, setUser] = useState(savedState?.user || null);

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
          <Route exact path='/' component={Login} />
          <Route exact path='/dashboard' component={Dashboard} />
          <Route exact path='/students' component={Students} />
          <Route exact path='/users' component={Users} />
          <Route exact path='/sessions' component={Session} />
          <Route exact path='/faculties' component={Faculty} />
          <Route exact path='/settings' component={Settings} />
          <Route exact path='/keys' component={ApiKey} />
          <Route exact path='/logout'>
            <Logout />
          </Route>
        </Switch>
      </QueryClientProvider>
    </AppState.Provider>
  );
}

export default App;
