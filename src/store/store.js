import { useState, useEffect, useCallback } from 'react';

let globalState = {};
let actions = {};
let listeners = [];

export const useStore = () => {
  const setState = useState(globalState)[1];

  const dispatch = useCallback((action, payload = null) => {
    const newState = actions[action](globalState, payload);
    globalState = { ...globalState, ...newState };

    for (const listener of listeners) {
      listener(globalState);
    }
  }, []);

  useEffect(() => {
    listeners.push(setState);

    return () => {
      listeners = listeners.filter((li) => li !== setState);
    };
  }, [setState]);

  return [globalState, dispatch];
};

export const initStore = (userActions, initialState) => {
  if (initialState) {
    globalState = { ...globalState, ...initialState };
  }
  actions = { ...actions, ...userActions };
};
