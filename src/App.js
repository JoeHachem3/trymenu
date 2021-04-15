import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Landing from './routes/Landing/Landing';
import Main from './routes/Main/Main';

const App = () => {
  return (
    <Switch>
      <Route path='/' exact component={Landing} />
      <Route path='/main' exact component={Main} />
    </Switch>
  );
};

export default withRouter(App);
