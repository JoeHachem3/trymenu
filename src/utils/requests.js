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
      'Content-Type': 'multipart/form-data',
      Authorization: 'bearer ' + localStorage.getItem('tokenId'),
    },
  });

export const updateUser = (userId, selectedCuisine) => {
  axios.patch(
    `${apiEndPoint}/users/${userId}`,
    { cuisine: selectedCuisine },
    {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('tokenId'),
      },
    },
  );
};

export const addRestaurant = (form) =>
  axios.post(`${apiEndPoint}/restaurants`, form, {
    headers: {
      'Content-Type': 'multipart/form-data',
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
