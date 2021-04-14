import { initStore } from './store';

const configureStore = () => {
  const actions = {
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
    // joined
    JOINED_SUCCESSFULLY: (curState) => {
      return { isLoading: false, error: false, token: true };
    },
    NOT_JOINED_SUCCESSFULLY: (curState, error) => {
      return { isLoading: false, error: error };
    },
    // token
    TOKEN_COUNTDOWN: (curState, expiresIn) => {
      setTimeout(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('expiration');
        return { token: false };
      }, expiresIn - new Date().getTime());
    },
  };
  initStore(actions, {
    error: false,
    isLoading: false,
    token: localStorage.getItem('token') !== null,
  });
};

export default configureStore;
