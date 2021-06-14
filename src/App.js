import React, { useEffect, useState } from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import Landing from './routes/Landing/Landing';
import Main from './routes/Main/Main';
import * as requests from './utils/requests';
import { useStore } from './store/store';
import { actions } from './store/configureStore';
import Restaurant from './routes/Restaurant/Restaurant';
import Account from './routes/Account/Account';
import Admin from './routes/Admin/Admin';
import AdminRestaurant from './routes/Admin/AdminRestaurant/AdminRestaurant';

const App = () => {
  const [{ token, user, cuisines }, dispatch] = useStore();

  const [error, setError] = useState(null);

  useEffect(() => {
    if (!cuisines) {
      requests
        .getCuisines()
        .then((res) => dispatch(actions.SET_CUISINES, res.data))
        .catch((err) => console.log(err));
    }
    if (token) {
      const userId = localStorage.getItem('userId');
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
          requests
            .getRestaurantsByCuisine()
            .then((res) => {
              console.log(res.data.restaurants);
              dispatch(actions.UPDATE_RESTAURANTS, res.data.restaurants);
            })
            .catch((err) => {
              console.log(err);
              setError(err);
            });
          if (userId && !user) {
            requests
              .getUser(userId)
              .then((res) => {
                dispatch(actions.SET_USER, res.data.user);
              })
              .catch((err) => {
                console.log(err);
                setError(err);
              });

            requests
              .getRecommendedItems()
              .then((res) => {
                // alert(JSON.stringify(res));
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
        } else {
          if (!user) {
            requests
              .getUser(userId)
              .then((res) => {
                dispatch(actions.SET_USER, res.data.user);
              })
              .catch((err) => {
                console.log(err);
                setError(err);
              });
            requests
              .getRestaurantsByOwner()
              .then((res) => {
                console.log(res.data);
                dispatch(actions.UPDATE_RESTAURANTS, res.data.restaurants);
              })
              .catch((err) => {
                console.log(err);
                setError(err);
              });
          }
        }
      }
    }
  }, [dispatch, token, user, cuisines]);

  let routes = [];
  if (token && localStorage.getItem('userType')) {
    if (localStorage.getItem('userType') === 'customer') {
      routes.push(<Route key={'main'} path='/main' exact component={Main} />);
    } else {
      routes.push(
        <Route key={'admin'} path='/admin' exact component={Admin} />,
      );
      routes.push(
        <Route
          key={'adminRestaurant'}
          path='/admin/:restaurantId'
          exact
          component={AdminRestaurant}
        />,
      );
    }
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
