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
    // timer id
    SET_TIMER_ID: (curState, timerId) => {
      return { timerId };
    },
    // logout
    LOGOUT: (curState) => {
      clearInterval(curState.timerId);
      return { token: false, user: null, restaurants: [], timerId: null };
    },
    // user
    SET_USER: (curState, user) => {
      return { user: user };
    },
    // user restaurants
    UPDATE_USER_RESTAURANTS: (curState, restaurants) => {
      return { user: { ...curState.user, restaurants: restaurants } };
    },
  };

  initStore(actions, {
    shouldRender: 0,
    token: localStorage.getItem('tokenId') !== null,
    timerId: null,
    recommendedItems: null,
    user: null,
  });
};

export const actions = {
  SET_RECOMMENDED_ITEMS: 'SET_RECOMMENDED_ITEMS',
  UPDATE_RESTAURANTS: 'UPDATE_RESTAURANTS',
  JOINED_SUCCESSFULLY: 'JOINED_SUCCESSFULLY',
  SET_TIMER_ID: 'SET_TIMER_ID',
  LOGOUT: 'LOGOUT',
  SET_USER: 'SET_USER',
  UPDATE_USER_RESTAURANTS: 'UPDATE_USER_RESTAURANTS',
};

export default configureStore;
