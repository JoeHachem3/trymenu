import { initStore } from './store';

const configureStore = () => {
  const actions = {
    // recommendedItems
    SET_RECOMMENDED_ITEMS: (curState, recommendedItems) => {
      return { recommendedItems: recommendedItems };
    },
    // restaurants
    UPDATE_RESTAURANTS: (curState, restaurants) => {
      return { restaurants: restaurants };
    },
    // loading
    IS_LOADING: (curState) => {
      return { isLoading: true };
    },
    IS_NOT_LOADING: (curState) => {
      return { isLoading: false };
    },
    // error
    IS_ERROR: (curState, error) => {
      return { error: error, isLoading: false };
    },
    IS_NOT_ERROR: (curState, error) => {
      return { error: null };
    },
    // joined
    JOINED_SUCCESSFULLY: (curState, user) => {
      return { isLoading: false, error: false, token: true, user: user };
    },
    NOT_JOINED_SUCCESSFULLY: (curState, error) => {
      return { isLoading: false, error: error };
    },
    // logout
    LOGOUT: (curState) => {
      const restaurants = [];
      curState.restaurants.forEach((resto) => {
        if (resto.menu) delete resto.menu;
        restaurants.push(resto);
      });
      return { token: false, user: null, restaurants: restaurants };
    },
    // token
    REMOVE_TOKEN: (curState) => {
      return { token: false };
    },
    USER_LOGGED_IN: (curState, user) => {
      return { user: user };
    },
    UPDATE_USER_RESTAURANTS: (curState, restaurants) => {
      return { user: { ...curState.user, restaurants: restaurants } };
    },
  };

  initStore(actions, {
    shouldRender: 0,
    error: null,
    isLoading: false,
    token: localStorage.getItem('tokenId') !== null,
    recommendedItems: null,
  });
};

export const actions = {
  SET_RECOMMENDED_ITEMS: 'SET_RECOMMENDED_ITEMS',
  UPDATE_RESTAURANTS: 'UPDATE_RESTAURANTS',
  IS_LOADING: 'IS_LOADING',
  IS_NOT_LOADING: 'IS_NOT_LOADING',
  IS_ERROR: 'IS_ERROR',
  IS_NOT_ERROR: 'IS_NOT_ERROR',
  JOINED_SUCCESSFULLY: 'JOINED_SUCCESSFULLY',
  NOT_JOINED_SUCCESSFULLY: 'NOT_JOINED_SUCCESSFULLY',
  LOGOUT: 'LOGOUT',
  REMOVE_TOKEN: 'REMOVE_TOKEN',
  USER_LOGGED_IN: 'USER_LOGGED_IN',
  UPDATE_USER_RESTAURANTS: 'UPDATE_USER_RESTAURANTS',
};

export default configureStore;
