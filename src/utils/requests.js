import axios from 'axios';
import { apiEndPoint } from './common';

export const getRestaurantsByCuisine = () =>
  axios.get(apiEndPoint + '/restaurants/cuisine', {
    headers: {
      Authorization: 'bearer ' + localStorage.getItem('tokenId'),
    },
  });

export const getUser = (userId) =>
  axios.get(`${apiEndPoint}/users/${userId}`, {
    headers: {
      Authorization: 'bearer ' + localStorage.getItem('tokenId'),
    },
  });

export const getRecommendedItems = () =>
  axios.post(
    `${apiEndPoint}/users/cf-items`,
    { restaurantId: null },
    {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('tokenId'),
      },
    },
  );

export const addItem = (form) =>
  axios.post(`${apiEndPoint}/items`, form, {
    headers: {
      Authorization: 'bearer ' + localStorage.getItem('tokenId'),
    },
  });

export const updateUser = (userId, changes) =>
  axios.patch(`${apiEndPoint}/users/${userId}`, changes, {
    headers: {
      Authorization: 'bearer ' + localStorage.getItem('tokenId'),
    },
  });

export const addRestaurant = (form) =>
  axios.post(`${apiEndPoint}/restaurants`, form, {
    headers: {
      Authorization: 'bearer ' + localStorage.getItem('tokenId'),
    },
  });

export const authenticate = (type, form) =>
  axios.post(`${apiEndPoint}/users/${type}`, form);

export const getRestaurantItems = (restaurantId) =>
  axios.get(`${apiEndPoint}/items/${restaurantId}`, {
    headers: {
      Authorization: 'bearer ' + localStorage.getItem('tokenId'),
    },
  });

export const updateRatings = (restaurantId, ratedItems) =>
  axios.patch(
    `${apiEndPoint}/users/rating`,
    {
      _id: restaurantId,
      ratedItems: ratedItems,
    },
    {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('tokenId'),
      },
    },
  );

export const getRestaurantsByOwner = () =>
  axios.get(`${apiEndPoint}/restaurants/owner`, {
    headers: {
      Authorization: 'bearer ' + localStorage.getItem('tokenId'),
    },
  });

export const deleteItem = (itemId) =>
  axios.delete(`${apiEndPoint}/items/${itemId}`, {
    headers: {
      Authorization: 'bearer ' + localStorage.getItem('tokenId'),
    },
  });

export const getCuisines = () => axios.get(`${apiEndPoint}/cuisines`);
