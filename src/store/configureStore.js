import { initStore } from './store';

const configureStore = () => {
  const actions = {
    //shouldRender
    SHOULD_RENDER: (curState) => {
      return { shouldRender: curState.shouldRender + 1 };
    },
    // items
    TOGGLE_USUAL_ITEM: (curState, clickedItem) => {
      let selectedItem = clickedItem;
      const ratedItems = [];
      curState.ratedItems.forEach((item) => {
        if (item.item._id.toString() !== clickedItem._id.toString()) {
          ratedItems.push(item);
        }
      });
      if (selectedItem.prevRating) {
        delete selectedItem.prevRating;
      } else {
        selectedItem['prevRating'] = selectedItem.rating;
        selectedItem.rating = 5;
      }
      ratedItems.push(selectedItem);
      return { ratedItems: ratedItems };
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
      return { token: false, user: null };
    },
    // token
    REMOVE_TOKEN: (curState) => {
      return { token: false };
    },
    USER_LOGGED_IN: (curState, user) => {
      return { user: user };
    },
  };

  initStore(actions, {
    shouldRender: 0,
    error: null,
    isLoading: false,
    token: localStorage.getItem('tokenId') !== null,
  });
};

export const actions = {
  SHOULD_RENDER: 'SHOULD_RENDER',
  TOGGLE_USUAL_ITEM: 'TOGGLE_USUAL_ITEM',
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
};

export default configureStore;
