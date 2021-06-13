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
    // joined
    JOINED_SUCCESSFULLY: (curState, user) => {
      return { token: true, user: user };
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
    token: localStorage.getItem('tokenId') !== null,
    recommendedItems: null,
    user: null,
  });
};

export const actions = {
  SET_RECOMMENDED_ITEMS: 'SET_RECOMMENDED_ITEMS',
  UPDATE_RESTAURANTS: 'UPDATE_RESTAURANTS',
  JOINED_SUCCESSFULLY: 'JOINED_SUCCESSFULLY',
  NOT_JOINED_SUCCESSFULLY: 'NOT_JOINED_SUCCESSFULLY',
  LOGOUT: 'LOGOUT',
  REMOVE_TOKEN: 'REMOVE_TOKEN',
  USER_LOGGED_IN: 'USER_LOGGED_IN',
  UPDATE_USER_RESTAURANTS: 'UPDATE_USER_RESTAURANTS',
};

export default configureStore;
