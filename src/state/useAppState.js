import { useContext } from 'react';
import appState from 'State/app';

export default function useAppState() {
  // wire into app global state.
  const state = useContext(appState);

  return state;
}
