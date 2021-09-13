import { createContext } from 'react';

/**
 * Load default state from the session storage or the local storage.
 */
const defaultState =
  sessionStorage.getItem('appState') ||
  localStorage.getItem('appState') ||
  '{}';

// create app conext.
const appContext = createContext(JSON.parse(defaultState));

export default appContext;

export function saveToAppState(data) {
  sessionStorage.setItem('appState', JSON.stringify(data));
  localStorage.setItem('appState', JSON.stringify(data));

  if (typeof data === 'object' && data.token) {
    sessionStorage.setItem('token', data.token);
    localStorage.setItem('token', data.token);
  }
}

export function getState() {
  return JSON.parse(defaultState);
}
