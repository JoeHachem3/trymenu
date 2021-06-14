import axios from 'axios';
import { apiEndPoint } from './common';

const authorization = {
  headers: {
    Authorization: 'bearer ' + localStorage.getItem('tokenId'),
  },
};
// dev
export const addItemsDev = (items) =>
  axios.post(`${apiEndPoint}/items/dev`, items);

export const getRestaurantsByCuisine = () =>
  axios.get(apiEndPoint + '/restaurants/cuisine', authorization);

export const getUser = (userId) =>
  axios.get(`${apiEndPoint}/users/${userId}`, authorization);

export const getRecommendedItems = () =>
  axios.post(
    `${apiEndPoint}/users/cf-items`,
    { restaurantId: null },
    authorization,
  );

export const addItem = (form) =>
  axios.post(`${apiEndPoint}/items`, form, authorization);

export const updateUser = (userId, changes) =>
  axios.patch(`${apiEndPoint}/users/${userId}`, changes, authorization);

export const addRestaurant = (form) =>
  axios.post(`${apiEndPoint}/restaurants`, form, authorization);

export const authenticate = (type, form) =>
  axios.post(`${apiEndPoint}/users/${type}`, form);

export const getRestaurantItems = (restaurantId) =>
  axios.get(`${apiEndPoint}/items/${restaurantId}`, authorization);

export const updateRatings = (restaurantId, ratedItems) =>
  axios.patch(
    `${apiEndPoint}/users/rating`,
    {
      _id: restaurantId,
      ratedItems: ratedItems,
    },
    authorization,
  );

export const getRestaurantsByOwner = () =>
  axios.get(`${apiEndPoint}/restaurants/owner`, authorization);

export const deleteItem = (itemId) =>
  axios.delete(`${apiEndPoint}/items/${itemId}`, authorization);

export const getCuisines = () => axios.get(`${apiEndPoint}/cuisines`);
