import { initStore } from './store';

const configureStore = () => {
  const actions = {
    //items
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
  };
  initStore(actions, { error: false, loading: false, token: null });
};

export default configureStore;
