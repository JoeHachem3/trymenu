import React, { useEffect } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Landing from './routes/Landing/Landing';
import Main from './routes/Main/Main';
import axios from 'axios';
import { apiEndPoint } from './utils/common';
import { useStore } from './store/store';

const App = () => {
  const dispatch = useStore()[1];
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId)
      axios
        .get(`${apiEndPoint}/users/${userId}`, {
          headers: {
            Authorization: 'bearer ' + localStorage.getItem('tokenId'),
          },
        })
        .then((res) => {
          dispatch('USER_LOGGED_IN', res.data);
        })
        .catch((err) => console.log(err));
  }, [dispatch]);

  return (
    <Switch>
      <Route path='/' exact component={Landing} />
      <Route path='/main' exact component={Main} />
    </Switch>
  );
};

export default withRouter(App);
