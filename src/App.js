import React, { useEffect, useState } from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import Landing from './routes/Landing/Landing';
import Main from './routes/Main/Main';
import axios from 'axios';
import { apiEndPoint } from './utils/common';
import { useStore } from './store/store';
import { actions } from './store/configureStore';
import Restaurant from './routes/Restaurant/Restaurant';
import Account from './routes/Account/Account';
import Admin from './routes/Admin/Admin';

const App = () => {
  const [{ token, user }, dispatch] = useStore();

  const [error, setError] = useState(null);

  useEffect(() => {
    if (token) {
      const time = localStorage.getItem('expiresIn') - new Date().getTime();
      if (time < 0) {
        dispatch(actions.LOGOUT);
        localStorage.removeItem('tokenId');
        localStorage.removeItem('userId');
        localStorage.removeItem('expiresIn');
        localStorage.removeItem('userType');
      } else {
        const timerId = setTimeout(() => {
          dispatch(actions.LOGOUT);
          localStorage.removeItem('tokenId');
          localStorage.removeItem('userId');
          localStorage.removeItem('expiresIn');
          localStorage.removeItem('userType');
        }, time);
        dispatch(actions.SET_TIMER_ID, timerId);
        if (localStorage.getItem('userType') === 'customer') {
          axios
            .get(apiEndPoint + '/restaurants/cuisine', {
              headers: {
                Authorization: 'bearer ' + localStorage.getItem('tokenId'),
              },
            })
            .then((res) => {
              console.log(res);
              const restaurants = res.data.restaurants;
              dispatch(actions.UPDATE_RESTAURANTS, restaurants);
            })
            .catch((err) => {
              console.log(err);
              setError(err);
            });

          const userId = localStorage.getItem('userId');
          if (userId && !user) {
            axios
              .get(`${apiEndPoint}/users/${userId}`, {
                headers: {
                  Authorization: 'bearer ' + localStorage.getItem('tokenId'),
                },
              })
              .then((res) => {
                dispatch(actions.SET_USER, res.data.user);
              })
              .catch((err) => {
                console.log(err);
                setError(err);
              });

            axios
              .post(
                `${apiEndPoint}/users/cf-items`,
                { restaurantId: null },
                {
                  headers: {
                    Authorization: 'bearer ' + localStorage.getItem('tokenId'),
                  },
                },
              )
              .then((res) => {
                // console.log(res);
                dispatch(
                  actions.SET_RECOMMENDED_ITEMS,
                  res.data.recommendedItems[0],
                );
              })
              .catch((err) => {
                console.log(err);
                setError(err);
              });
          }
        }
      }
    }
  }, [dispatch, token, user]);

  let routes = null;
  if (token && localStorage.getItem('userType')) {
    routes =
      localStorage.getItem('userType') === 'customer' ? (
        <Route path='/main' exact component={Main} />
      ) : (
        <Route path='/admin' exact component={Admin} />
      );
  }

  return (
    <>
      <Switch>
        <Route path='/' exact component={Landing} />
        {routes}
        <Route path='/account' exact component={Account} />
        <Route path='/restaurants/:restaurantId' exact component={Restaurant} />
        <Route path='/' render={() => <Redirect to='/' />} />
      </Switch>
      {token ? null : <Redirect to='/' />}
    </>
  );
};

export default withRouter(App);
