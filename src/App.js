import React, { useEffect } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Landing from './routes/Landing/Landing';
import Main from './routes/Main/Main';
import axios from 'axios';
import { apiEndPoint } from './utils/common';
import { useStore } from './store/store';
import { actions } from './store/configureStore';
import Restaurant from './routes/Restaurant/Restaurant';
import Account from './routes/Account/Account';
import Admin from './routes/Admin/Admin';
import PageNotFound from './routes/PageNotFound/PageNotFound';

const App = () => {
  const [{ token }, dispatch] = useStore();

  if (token) {
    const time = localStorage.getItem('expiresIn') - new Date().getTime();
    if (time < 0) {
      dispatch(actions.REMOVE_TOKEN);
      localStorage.removeItem('tokenId');
      localStorage.removeItem('userId');
      localStorage.removeItem('expiresIn');
    } else {
      setTimeout(() => {
        dispatch(actions.REMOVE_TOKEN);
        localStorage.removeItem('tokenId');
        localStorage.removeItem('userId');
        localStorage.removeItem('expiresIn');
      }, time);
    }
  }

  useEffect(() => {
    axios
      .get(apiEndPoint + '/restaurants')
      .then((res) => {
        // console.log(res);
        const restaurants = res.data.restaurants;
        dispatch(actions.UPDATE_RESTAURANTS, restaurants);
      })
      .catch((err) => console.log(err));

    const userId = localStorage.getItem('userId');
    if (userId != null) {
      axios
        .get(`${apiEndPoint}/users/${userId}`, {
          headers: {
            Authorization: 'bearer ' + localStorage.getItem('tokenId'),
          },
        })
        .then((res) => {
          dispatch(actions.USER_LOGGED_IN, res.data.user);
        })
        .catch((err) => console.log(err));

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
          dispatch(actions.SET_RECOMMENDED_ITEMS, res.data.recommendedItems[0]);
        })
        .catch((err) => console.log(err));
    }
  }, [dispatch]);

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
    <Switch>
      <Route path='/' exact component={Landing} />
      {routes}
      <Route path='/account' exact component={Account} />
      <Route path='/restaurants/:restaurantId' exact component={Restaurant} />
      <Route path='/' component={PageNotFound} />
    </Switch>
  );
};

export default withRouter(App);
