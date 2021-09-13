import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Switch, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './css/style.scss';

import { focusHandling } from 'cruip-js-toolkit';
import './charts/ChartjsConfig';

// Import pages
import Dashboard from './pages/Dashboard';
import Login from './pages/login';

const queryClient = new QueryClient();

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto';
    window.scroll({ top: 0 });
    document.querySelector('html').style.scrollBehavior = '';
    focusHandling('outline');
  }, [location.pathname]); // triggered on route change

  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <Switch>
        <Route exact path='/'>
          <Login />
        </Route>
        <Route exact path='/dashboard'>
          <Dashboard />
        </Route>
      </Switch>
    </QueryClientProvider>
  );
}

export default App;
